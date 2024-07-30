import { registerAPI } from '@apis/register'
import ProgressBar from '@components/common/ProgressBar'
import { useState } from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import { RegisterFormData } from '../../types'

interface RegisterProps {
  goToPrevious: () => void
  formData: RegisterFormData
  updateFormData: (key: keyof RegisterFormData, value: string) => void
}

function SixthRegister({ goToPrevious, formData, updateFormData }: RegisterProps) {
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData('password', e.target.value)
  }
  const [password2, setPassword2] = useState('')

  const navigate = useNavigate()

  const checkPassword = () => {
    return formData.password === password2
  }

  const handleSubmit = async () => {
    if (checkPassword()) {
      const res = await registerAPI(formData)
      console.log('formData : ', formData)
      if (res) {
        alert('회원가입 되었습니다.')
        navigate('/login')
      } else {
        console.log('회원가입 실패')
        alert('회원가입에 실패했습니다. 다시 시도해주세요.')
      }
    } else {
      alert('비밀번호가 일치하지 않습니다.')
      updateFormData('password', '')
      setPassword2('')
    }
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-between">
      <div className="w-full flex flex-col items-center px-4">
        <div className="relative w-full flex items-center justify-center border-b border-[#EDEDED] py-4 ">
          <FaArrowLeftLong size="20" className="absolute left-0" onClick={goToPrevious} />
          <p className="text-xl font-semibold">회원가입</p>
        </div>
        <ProgressBar progress={100} />
        <div className="w-full">
          <label className="text-xl font-semibold">비밀번호를 입력해주세요.</label>
          <input
            className="h-8 rounded-2xl w-full text-lg px-3 py-6 bg-[#F5F5F5] focus:outline-customOrange mt-4 text-[#5E5E5E]"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={formData.password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="w-full mt-10">
          <label className="text-xl font-semibold">비밀번호를 확인해주세요</label>
          <input
            className="h-8 rounded-2xl w-full text-lg px-3 py-6 bg-[#F5F5F5] focus:outline-customOrange mt-4 text-[#5E5E5E]"
            type="password"
            placeholder="비밀번호를 한번 더 입력해주세요"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
        </div>
      </div>
      <button
        className={`w-[90%] text-white text-xl font-bold p-2.5 px-10 rounded-3xl mb-8 ${
          formData.password && password2 ? 'bg-customOrange active:bg-orange-400' : 'bg-[#D9D9D9]'
        }`}
        onClick={handleSubmit}
        disabled={!formData.password || !password2}>
        완료
      </button>
    </div>
  )
}

export default SixthRegister
