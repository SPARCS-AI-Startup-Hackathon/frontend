/* eslint-disable @typescript-eslint/no-explicit-any */
import { getChatRecordAPI } from '@apis/chat'
import { reRecommendJobAPI } from '@apis/job'
import bgTalk from '@assets/images/bgTalk.png'
import bitnarae_default from '@assets/images/bitnarae_default.png'
import RecommendTalkBox from '@components/talk/RecommendTalkBox'
import { useEffect, useState } from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import { useConnectionStore, useLoadingStore } from 'store/store'
import '../styles/talk.css'

interface Record {
  sender: string
  content: string
}

interface ChatRecord {
  chatResponses: Record[]
}

function TalkRecommendPage() {
  const navigate = useNavigate()
  const [isChatLogVisible, setIsChatLogVisible] = useState<boolean>(false)
  const [chatRecords, setChatRecords] = useState<ChatRecord | null>(null)
  const { loading, setLoading } = useLoadingStore()
  const { connectionCount, setConnectionCount } = useConnectionStore()

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

  const handleChatLogClick = (): void => {
    setIsChatLogVisible(true)
  }

  const handleCloseChatLog = (): void => {
    setIsChatLogVisible(false)
  }

  const name = localStorage.getItem('name')

  const handleReRecommendClick = async (): Promise<void> => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      try {
        setLoading(true)
        const res = await reRecommendJobAPI({ token })
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

  const handleReTalk = (): void => {
    setConnectionCount(0)
    console.log(connectionCount)
    navigate('/talk_start')
  }

  return (
    <div
      className="w-dvw max-w-[375px] h-dvh m-auto bg-cover bg-center flex flex-col items-center justify-between shadow-md"
      style={{ backgroundImage: `url(${bgTalk})` }}>
      <div className="w-full flex justify-start p-4 py-5">
        <FaArrowLeftLong
          size="28"
          className="cursor-pointer text-customOrange"
          onClick={() => navigate('/main')}
        />
      </div>
      <div className="relative flex flex-col items-center">
        <RecommendTalkBox />
        <img src={bitnarae_default} className="mt-8 mb-6" />
      </div>
      <div className="flex space-x-4 -mt-16">
        <button
          className="flex justify-center items-center bg-orange-500 text-white p-4 w-24 h-24 rounded-3xl text-lg font-semibold hover:scale-105 transition-transform duration-300"
          onClick={() => navigate('/talk_resume')}>
          맞는 것
          <br />
          같아!
        </button>
        <button
          className="flex justify-center items-center bg-orange-500 text-white p-4 w-24 h-24 rounded-3xl text-lg font-semibold hover:scale-105 transition-transform duration-300"
          onClick={handleReRecommendClick}
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
            <>
              다른
              <br />
              추천은?
            </>
          )}
        </button>
        <button
          className="flex justify-center items-center bg-orange-500 text-white p-4 w-24 h-24 rounded-3xl text-lg font-semibold hover:scale-105 transition-transform duration-300"
          onClick={handleReTalk}>
          다시
          <br />
          대화하자
        </button>
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

export default TalkRecommendPage
