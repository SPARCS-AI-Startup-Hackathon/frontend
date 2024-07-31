/* eslint-disable @typescript-eslint/no-explicit-any */
import { getChatRecordAPI } from '@apis/chat'
import { recommendJobAPI } from '@apis/job'
import bgTalk from '@assets/images/bgTalk.png'
import bitnarae_default from '@assets/images/bitnarae_default.png'
import bitnarae_talk from '@assets/images/bitnarea_talk.png'
import recording_img from '@assets/images/recording.png'
import DynamicTalkBox from '@components/talk/DynamicTalkBox'
import { useEffect, useState } from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import { useAudioStore, useConnectionStore, useLoadingStore } from 'store/store'
import useTranscriptHandler from '../hooks/useTranscriptHandler'
import '../styles/talk.css'

declare global {
  interface Window {
    SpeechRecognition: any
    webkitSpeechRecognition: any
  }
}

interface Record {
  sender: string
  content: string
}

interface ChatRecord {
  chatResponses: Record[]
}

function TalkStartPage() {
  const navigate = useNavigate()
  const { isPlaying } = useAudioStore()
  const [currentImage, setCurrentImage] = useState<string>(bitnarae_default)
  const [isRecording, setIsRecording] = useState<boolean>(false)
  const [blurStep, setBlurStep] = useState<number>(0)
  const [transcript, setTranscript] = useState<string>('')
  const [isChatLogVisible, setIsChatLogVisible] = useState<boolean>(false)
  const [chatRecords, setChatRecords] = useState<ChatRecord | null>(null)
  const { connectionCount } = useConnectionStore()
  const { loading, setLoading } = useLoadingStore()

  useTranscriptHandler(transcript)

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentImage((prevImage) =>
          prevImage === bitnarae_default ? bitnarae_talk : bitnarae_default,
        )
      }, 500)
    } else {
      setCurrentImage(bitnarae_default)
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [isPlaying])

  useEffect(() => {
    let blurInterval: NodeJS.Timeout

    if (isRecording) {
      blurInterval = setInterval(() => {
        setBlurStep((prevStep) => (prevStep < 3 ? prevStep + 1 : 0))
      }, 300)
    } else {
      setBlurStep(0)
    }

    return () => {
      if (blurInterval) {
        clearInterval(blurInterval)
      }
    }
  }, [isRecording])

  useEffect(() => {
    if (isChatLogVisible) {
      const fetchChatRecords = async () => {
        const token = localStorage.getItem('accessToken')
        if (token) {
          const data = await getChatRecordAPI({ token })
          if (data && typeof data !== 'boolean') {
            setChatRecords(data)
          }
        }
      }
      fetchChatRecords()
    }
  }, [isChatLogVisible])

  const getBlurClass = (): string => {
    switch (blurStep) {
      case 1:
        return 'blur-md'
      case 2:
        return 'blur-lg'
      case 3:
        return 'blur-xl'
      default:
        return 'invisible'
    }
  }

  const handleRecordingClick = (): void => {
    setIsRecording(!isRecording)
    if (!isRecording) {
      startRecognition()
    }
  }

  const startRecognition = (): void => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      alert('이 브라우저는 음성 인식을 지원하지 않습니다.')
      return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = 'ko-KR'
    recognition.interimResults = false
    recognition.maxAlternatives = 1

    recognition.start()

    recognition.onresult = (event: any) => {
      const transcriptResult = event.results[0][0].transcript
      setTranscript(transcriptResult)
    }

    recognition.onspeechend = () => {
      recognition.stop()
      setIsRecording(false)
    }

    recognition.onerror = (event: any) => {
      console.error('음성 인식 오류:', event.error)
      setIsRecording(false)
    }
  }

  const handleChatLogClick = (): void => {
    setIsChatLogVisible(true)
  }

  const handleCloseChatLog = (): void => {
    setIsChatLogVisible(false)
  }

  const handleRecommendClick = async (): Promise<void> => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      try {
        setLoading(true)
        const res = await recommendJobAPI({ token })
        if (res && typeof res !== 'boolean') {
          sessionStorage.setItem('job', res.recommendJob)
          navigate('/talk_recommend')
        } else {
          console.error('Failed to fetch recommended job')
        }
      } catch (error) {
        console.error('Error fetching recommended job:', error)
      } finally {
        setLoading(false)
      }
    } else {
      console.error('No access token found')
    }
  }

  const name = localStorage.getItem('name')

  return (
    <div
      className="w-dvw max-w-[375px] h-dvh m-auto bg-cover bg-center flex flex-col items-center justify-between shadow-md relative"
      style={{ backgroundImage: `url(${bgTalk})` }}>
      <div
        className={`w-full h-full absolute top-0 left-0 ${
          isChatLogVisible ? 'bg-black bg-opacity-50' : 'bg-transparent'
        } transition-opacity duration-300`}
      />
      <div className="w-full flex justify-start p-4 py-5 z-10 relative">
        <FaArrowLeftLong
          size="28"
          className="cursor-pointer text-customOrange"
          onClick={() => navigate('/talk')}
        />
      </div>
      <div className="relative flex flex-col items-center z-10">
        <DynamicTalkBox isChatLogVisible={isChatLogVisible} />
        <img src={currentImage} className="mt-8 -mb-2" />
        <div className="relative mt-4">
          {isRecording && (
            <div className={`absolute inset-0 flex items-center justify-center ${getBlurClass()}`}>
              <div className="w-36 h-20 rounded-full bg-orange-500 opacity-50"></div>
            </div>
          )}
          {connectionCount < 3 ? (
            <img
              src={recording_img}
              className="cursor-pointer relative z-10 hover:scale-110 transition-transform duration-300"
              onClick={handleRecordingClick}
            />
          ) : (
            <div className="flex space-x-4">
              <button
                className="bg-orange-500 text-white py-4 px-8 rounded-3xl text-lg font-semibold hover:scale-105 transition-transform duration-300"
                onClick={handleRecommendClick}
                disabled={loading}>
                {loading ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  '직업 추천을 받을래요!'
                )}
              </button>
            </div>
          )}
        </div>
      </div>
      <button
        className="w-full text-[#FF8E4E] text-lg font-semibold bg-white p-2.5 px-10 z-10 relative active:bg-orange-50"
        onClick={handleChatLogClick}>
        대화 기록 보기
      </button>
      <div
        className={`fixed bottom-0 left-0 right-0 w-dvw max-w-[375px] m-auto h-2/3 bg-white shadow-lg border transition-transform duration-500 ${
          isChatLogVisible ? 'translate-y-0' : 'translate-y-full'
        } z-20`}>
        <div className="flex justify-between p-4 border-b border-gray-300">
          <h2 className="text-xl font-semibold">대화 기록</h2>
          <button onClick={handleCloseChatLog}>닫기</button>
        </div>
        <div className="p-6 pb-16 h-full overflow-y-auto">
          {chatRecords ? (
            chatRecords.chatResponses.map((record, index) => (
              <div
                key={index}
                className={`mb-4 p-4 rounded-lg max-w-[70%] ${
                  record.sender === name ? 'bg-[#FFEAC1] ml-auto' : 'bg-gray-200 mr-auto'
                }`}>
                <p className="font-bold">{record.sender}</p>
                <p>{record.content}</p>
              </div>
            ))
          ) : (
            <p></p>
          )}
        </div>
      </div>
    </div>
  )
}

export default TalkStartPage
