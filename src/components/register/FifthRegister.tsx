import ProgressBar from '@components/common/ProgressBar'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { RegisterFormData } from '../../types'

interface RegisterProps {
  goToPrevious: () => void
  goToNext: () => void
  formData: RegisterFormData
  updateFormData: (key: keyof RegisterFormData, value: string) => void
}

function FirstRegister({ goToPrevious, goToNext, formData, updateFormData }: RegisterProps) {
  const handleIntroductionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData('introduction', e.target.value)
  }

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
            placeholder="예) 저는 조용한 성격이에요"
            value={formData.introduction}
            onChange={handleIntroductionChange}
          />
        </div>
      </div>
      <button
        className={`w-[90%] text-white text-xl font-bold p-2.5 px-10 rounded-3xl mb-8 ${
          formData.introduction ? 'bg-customOrange active:bg-orange-400' : 'bg-[#D9D9D9]'
        }`}
        onClick={formData.introduction ? goToNext : undefined}
        disabled={!formData.introduction}>
        다음
      </button>
    </div>
  )
}

export default FirstRegister
