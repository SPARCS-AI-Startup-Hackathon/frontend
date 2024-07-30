import bgOnBoard_5 from '@assets/images/bgOnBoard_5.png'
import { useNavigate } from 'react-router-dom'

function FifthOnBoard() {
  const navigate = useNavigate()

  return (
    <div
      className="w-full h-full bg-cover bg-center flex flex-col items-center justify-between"
      style={{ backgroundImage: `url(${bgOnBoard_5})` }}>
      <div className="text-[#FEAA61] text-2xl font-[cafe24] text-left self-start ml-8 mt-16">
        저희가 앞으로 당신의 인생도
        <br />
        계속 빛날 수 있게,
        <br />그 길을 함께할게요.
      </div>
      <button
        className="w-[90%] text-white text-xl font-bold bg-[#FA8D43] p-2.5 px-10 rounded-3xl mb-6 active:bg-orange-500"
        onClick={() => navigate('/main')}>
        시작하기
      </button>
    </div>
  )
}

export default FifthOnBoard
