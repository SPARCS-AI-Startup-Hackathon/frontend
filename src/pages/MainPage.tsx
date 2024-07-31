import bgStartJob from '@assets/images/bgStartJob.png'
import bgStartResume from '@assets/images/bgStartResume.png'
import NavBar from '@components/common/NavBar'
import { useNavigate } from 'react-router-dom'

function MainPage() {
  const navigate = useNavigate()

  return (
    <>
      <main className="p-6 shadow-md">
        <div
          className="h-[70%] w-[90%] relative hover:scale-105 transition-transform duration-300"
          onClick={() => navigate('/talk')}>
          <img src={bgStartJob} className="w-full h-full absolute" />
          <p className="absolute text-[#FEAA61] text-lg font-bold top-8 left-5">
            빛나래와의 대화를 통해
          </p>
          <p className="absolute text-2xl font-bold top-16 left-5">나만의 새로운 진로를</p>
          <p className="absolute text-2xl font-bold top-24 left-5">찾아 볼까요?</p>
          <button className="absolute p-2 px-6 font-bold text-white text-2xl flex justify-center items-center bottom-5 left-5 bg-[#FEAA61] rounded-3xl">
            시작하기
          </button>
        </div>
        <div
          className="h-[30%] mt-4 w-[90%] relative hover:scale-105 transition-transform duration-300"
          onClick={() => navigate('/resume')}>
          <img src={bgStartResume} className="w-full h-full" />
          <p className="absolute text-white text-2xl font-bold top-8 left-5">Ai로 자기소개서를</p>
          <p className="absolute text-white text-2xl font-bold top-16 left-5">생성해 보세요!</p>
        </div>
      </main>
      <NavBar />
    </>
  )
}

export default MainPage
