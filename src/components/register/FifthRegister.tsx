import ProgressBar from '@components/common/ProgressBar'
import { useState } from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'

interface RegisterProps {
  goToNext: () => void
  goToPrevious: () => void
}

function FifthRegister({ goToPrevious, goToNext }: RegisterProps) {
  const [pr, setPr] = useState('')

  return (
    <div className="w-full h-full flex flex-col items-center justify-between">
      <div className="w-full flex flex-col items-center px-4">
        <div className="relative w-full flex items-center justify-center border-b border-[#EDEDED] py-4 ">
          <FaArrowLeftLong size="20" className="absolute left-0" onClick={goToPrevious} />
          <p className="text-xl font-semibold">회원가입</p>
        </div>
        <ProgressBar progress={90} />
        <div className="w-full">
          <label className="text-xl font-semibold">내가 생각하는 나의 주요 특징은?</label>
          <input
            className="h-8 rounded-2xl w-full text-lg px-3 py-6 bg-[#F5F5F5] focus:outline-customOrange mt-4 text-[#5E5E5E]"
            type="text"
            placeholder="예) 저는 조용한 성격이에요."
            value={pr}
            onChange={(e) => setPr(e.target.value)}
          />
        </div>
      </div>
      <button
        className={`w-[80%] text-white text-xl font-bold p-2.5 px-10 rounded-3xl mb-8 ${
          pr ? 'bg-customOrange active:bg-orange-400' : 'bg-[#D9D9D9]'
        }`}
        onClick={pr ? goToNext : undefined}
        disabled={!pr}>
        다음
      </button>
    </div>
  )
}

export default FifthRegister
