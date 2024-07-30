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
  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData('age', e.target.value)
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-between">
      <div className="w-full flex flex-col items-center px-4">
        <div className="relative w-full flex items-center justify-center border-b border-[#EDEDED] py-4 ">
          <FaArrowLeftLong size="20" className="absolute left-0" onClick={goToPrevious} />
          <p className="text-xl font-semibold">회원가입</p>
        </div>
        <ProgressBar progress={70} />
        <div className="w-full">
          <label className="text-xl font-semibold">나이를 입력해주세요.</label>
          <input
            className="h-8 rounded-2xl w-full text-lg px-3 py-6 bg-[#F5F5F5] focus:outline-customOrange mt-4 text-[#5E5E5E]"
            type="text"
            placeholder="예) 24"
            value={formData.age !== null ? formData.age : ''}
            onChange={handleAgeChange}
          />
        </div>
      </div>
      <button
        className={`w-[90%] text-white text-xl font-bold p-2.5 px-10 rounded-3xl mb-8 ${
          formData.age ? 'bg-customOrange active:bg-orange-400' : 'bg-[#D9D9D9]'
        }`}
        onClick={formData.age ? goToNext : undefined}
        disabled={!formData.age}>
        다음
      </button>
    </div>
  )
}

export default FirstRegister
