import axios from 'axios'
import { useEffect, useRef } from 'react'
import loading from '../../assets/gif/loading.gif'
import { useAudioStore, useMessageStore } from '../../store/store'

interface ParsedMessage {
  message?: {
    content?: string
  }
  stopReason?: string
}

interface TalkBoxProps {
  isChatLogVisible: boolean
}

function DynamicTalkBox({ isChatLogVisible }: TalkBoxProps) {
  const { message, setMessage, allMessagesReceived, setAllMessagesReceived } = useMessageStore()
  const audioRef = useRef<HTMLAudioElement>(null)
  const { setPlaying } = useAudioStore()

  const parseContent = (response: string): string => {
    try {
      const parsed: ParsedMessage = JSON.parse(response)
      if (parsed.message && parsed.message.content) {
        return parsed.message.content
      }
    } catch (e) {
      console.error('Failed to parse JSON:', e)
    }
    return ''
  }

  const parseData = (response: string): string => {
    try {
      const parsed: ParsedMessage = JSON.parse(response)
      if (parsed.stopReason) {
        return parsed.stopReason
      }
    } catch (e) {
      console.error('Failed to parse JSON:', e)
    }
    return ''
  }

  useEffect(() => {
    const token = localStorage.getItem('accessToken')

    if (token) {
      const eventSource = new EventSource(`http://223.130.132.133:8080/api/first-question/${token}`)

      eventSource.onopen = () => {
        console.log('연결됨')
      }

      eventSource.onmessage = (event: MessageEvent) => {
        const content = parseContent(event.data)

        setMessage((prev: string) => prev + content)

        const data = parseData(event.data)
        console.log('New message:', data)

        if (data === 'stop_before') {
          console.log('All messages received. Closing connection.')
          eventSource.close()
          setAllMessagesReceived(true)
        }
      }

      eventSource.onerror = (event) => {
        console.error('Error:', event)
      }

      return () => {
        eventSource.close()
      }
    }
  }, [setMessage, setAllMessagesReceived])

  useEffect(() => {
    if (allMessagesReceived) {
      fetchTTS(message)
    }
  }, [allMessagesReceived, message])

  const fetchTTS = async (text: string) => {
    try {
      const response = await axios.post(
        '/clova/tts-premium/v1/tts',
        new URLSearchParams({
          speaker: 'nshasha',
          text,
          volume: '0',
          speed: '0',
          pitch: '0',
          format: 'mp3',
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-NCP-APIGW-API-KEY-ID': import.meta.env.VITE_CLOVA_CLIENT_ID!,
            'X-NCP-APIGW-API-KEY': import.meta.env.VITE_CLOVA_CLIENT_SECRET!,
          },
          responseType: 'blob',
        },
      )

      const audioUrl = URL.createObjectURL(response.data)
      if (audioRef.current) {
        audioRef.current.src = audioUrl
      }
    } catch (error) {
      console.error('Failed to fetch TTS audio:', error)
    }
  }

  const handleUserInteraction = () => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          setPlaying(true)
        })
        .catch((error) => {
          console.error('Audio play failed:', error)
        })
    }
  }

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.onended = () => {
        setPlaying(false)
      }
    }
  }, [setPlaying])

  return (
    <div
      className="flex relative rounded-2xl justify-center text-center w-[90%] max-w-[300px] h-[150px] hover:scale-105 transition-transform duration-300"
      onClick={handleUserInteraction}>
      <div className="absolute inset-0 bg-[#FA8D43] blur-xl rounded-lg"></div>
      <div
        className={`flex relative items-center justify-center bg-white p-4 pt-4 rounded-3xl w-full h-full overflow-y-auto text-xl text-[#8F8F8F] ${
          isChatLogVisible ? 'bg-opacity-15' : ''
        } }`}>
        {message ? (
          message
        ) : (
          <img src={loading} alt="Loading" className="w-20 h-10 object-contain" />
        )}
        <audio ref={audioRef} />
      </div>
      <div
        className={`absolute -bottom-7 left-1/2 transform -translate-x-1/2 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[30px] border-t-white  ${
          isChatLogVisible ? 'border-opacity-15' : ''
        } `}></div>
    </div>
  )
}

export default DynamicTalkBox
