import NavBar from '@components/common/NavBar'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'

function ResumePage() {
  const navigate = useNavigate()

  const resumeItems = [
    { id: 1, name: '글쓰기 방과후학교 강사', job: '강사', content: '2024. 8. 1' },
    { id: 2, name: '유아 그림 과외', job: '과외', content: '2024. 7. 10' },
    { id: 3, name: '베이킹 클래스', job: '강사', content: '2024. 6. 29' },
    { id: 4, name: '급식 도우미', job: '도우미', content: '2024. 6. 29' },
    { id: 3, name: '베이킹 클래스', job: '강사', content: '2024. 6. 29' },
    { id: 4, name: '급식 도우미', job: '도우미', content: '2024. 6. 29' },
    { id: 3, name: '베이킹 클래스', job: '강사', content: '2024. 6. 29' },
    { id: 4, name: '급식 도우미', job: '도우미', content: '2024. 6. 29' },
  ]

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
        <div className="w-full p-4 space-y-4">
          {resumeItems.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg">{item.name}</h2>
              <h3 className="text-gray-600">{item.job}</h3>
            </div>
          ))}
        </div>
      </main>
      <NavBar />
    </>
  )
}

export default ResumePage
