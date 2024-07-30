import { useEffect, useState } from 'react'

interface ParsedMessage {
  message?: {
    content?: string
  }
  stopReason?: string
}

function DynamicTalkBox() {
  const [message, setMessage] = useState<string>('')
  const [allMessagesReceived, setAllMessagesReceived] = useState<boolean>(false)

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

        setMessage((prev) => prev + content)

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
  }, [])

  useEffect(() => {
    if (allMessagesReceived) {
      speak(message)
    }
  }, [allMessagesReceived, message])

  // TTS 기능
  const speak = (text: string) => {
    const synth = window.speechSynthesis
    const utterThis = new SpeechSynthesisUtterance(text)
    utterThis.onend = () => {
      console.log('SpeechSynthesisUtterance.onend')
    }
    utterThis.onerror = (event) => {
      console.error('SpeechSynthesisUtterance.onerror', event)
    }

    synth.speak(utterThis)
  }

  return (
    <div className="flex relative rounded-2xl justify-center text-center w-[90%] max-w-[300px] h-[150px]">
      <div className="absolute inset-0 bg-[#FA8D43] blur-xl rounded-lg"></div>
      <div className="flex relative items-center justify-center bg-white p-4 pt-4 rounded-3xl w-full h-full overflow-y-auto text-xl text-[#8F8F8F]">
        {message}
      </div>
      <div className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[30px] border-t-white"></div>
    </div>
  )
}

export default DynamicTalkBox
