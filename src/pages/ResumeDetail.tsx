import { getResumeDetailAPI } from '@apis/resume'
import NavBar from '@components/common/NavBar'
import { useEffect, useState } from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { useNavigate, useParams } from 'react-router-dom'
import TurndownService from 'turndown'

interface ResumeItem {
  id: number
  name: string
  job: string
  content: string
}

function ResumeDetailPage() {
  const navigate = useNavigate()
  const { resume_id } = useParams<{ resume_id: string }>()
  const [resume, setResume] = useState<ResumeItem | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(true)
  const [markdownContent, setMarkdownContent] = useState<string>('')

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('accessToken')
      if (token && resume_id) {
        const numericResumeId = parseInt(resume_id, 10)
        const data = await getResumeDetailAPI({ token, resume_id: numericResumeId })
        if (data && typeof data !== 'boolean') {
          setResume(data)

          // HTML content를 마크다운으로 변환
          const turndownService = new TurndownService()
          const markdown = turndownService.turndown(data.content)
          setMarkdownContent(markdown)
        } else {
          console.error('Failed to fetch resume item')
        }
        setLoading(false)
      }
    }
    fetchData()
  }, [resume_id])

  return (
    <>
      <main className="bg-gray-100 overflow-y-auto">
        <div className="bg-white relative w-full flex items-center justify-center border-b border-[#EDEDED] py-4 px-4">
          <FaArrowLeftLong
            size="20"
            className="absolute left-4 cursor-pointer"
            onClick={() => navigate('/main')}
          />
          <p className="text-xl font-semibold">AI 자기소개서 결과지</p>
        </div>
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
          resume && (
            <div className="w-full p-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-2xl font-bold mb-2">{resume.name}</h2>
                <h3 className="text-xl text-customOrange font-semibold mb-4">{resume.job}</h3>
                <pre className="whitespace-pre-wrap">{markdownContent}</pre>
              </div>
            </div>
          )
        )}
      </main>
      <NavBar />
    </>
  )
}

export default ResumeDetailPage
