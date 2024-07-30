import bgTalk from '@assets/images/bgTalk.png'
import bitnarae_default from '@assets/images/bitnarae_default.png'
import DynamicTalkBox from '@components/talk/DynamicTalkBox'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import '../styles/talk.css'

function TalkStartPage() {
  const navigate = useNavigate()

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
        <DynamicTalkBox />
        <img src={bitnarae_default} className="mt-8" />
      </div>
      <button className="w-[90%] text-white text-xl font-bold bg-[#FA8D43] p-2.5 px-10 rounded-3xl mb-10 active:bg-orange-500">
        시작하기
      </button>
    </div>
  )
}

export default TalkStartPage
