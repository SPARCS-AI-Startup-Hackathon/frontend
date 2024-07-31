import { getResumeListAPI } from '@apis/resume' // 경로는 프로젝트 구조에 맞게 수정해주세요
import NavBar from '@components/common/NavBar'
import { useEffect, useState } from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'

interface ResumeItem {
  id: number
  name: string
  job: string
  content: string
}

function ResumePage() {
  const navigate = useNavigate()
  const [resumeItems, setResumeItems] = useState<ResumeItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('accessToken')
      if (token) {
        const data = await getResumeListAPI({ token })
        if (data && Array.isArray(data)) {
          setResumeItems(data)
        } else {
          console.error('Failed to fetch resume items')
        }
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleItemClick = (id: number) => {
    navigate(`/resume/${id}`)
  }

  return (
    <>
      <main className="bg-gray-100 overflow-y-auto">
        <div className="bg-white relative w-full flex items-center justify-center border-b border-[#EDEDED] py-4 px-4">
          <FaArrowLeftLong
            size="20"
            className="absolute left-4 cursor-pointer"
            onClick={() => navigate('/main')}
          />
          <p className="text-xl font-semibold">AI 자기소개서 리스트</p>
        </div>
        <div className="w-full p-4 flex flex-col space-y-4">
          {loading ? (
            <svg
              className="mx-auto mt-20 animate-spin h-16 w-16 text-black"
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
            resumeItems.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-lg shadow cursor-pointer"
                onClick={() => handleItemClick(item.id)}>
                <h2 className="text-lg text-customOrange font-bold">{item.job}</h2>
              </div>
            ))
          )}
        </div>
      </main>
      <NavBar />
    </>
  )
}

export default ResumePage
