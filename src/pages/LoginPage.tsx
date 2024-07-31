import { loginAPI } from '@apis/login'
import logo from '@assets/images/logo.png'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async () => {
    const res = await loginAPI({ email, password })
    if (res && typeof res !== 'boolean') {
      localStorage.setItem('name', res.name)
      localStorage.setItem('accessToken', res.accessToken)
      localStorage.setItem('refreshToken', res.refreshToken)
      alert('로그인 되었습니다.')
      navigate('/main')
    } else {
      alert('로그인에 실패하였습니다.')
      console.error('로그인 실패:', res)
      setEmail('')
      setPassword('')
    }
  }

  return (
    <div className="w-dvw max-w-[375px] h-dvh m-auto flex flex-col items-center justify-center shadow-md">
      <p className="font-bold text-[#F4BE15] text-xl p-4 ">당신만의 빛나는 시니어 라이프</p>
      <img src={logo} className="mb-12" />
      <input
        className="h-8 rounded-2xl w-[90%] text-lg px-3 py-6 bg-[#F5F5F5] focus:outline-customOrange mt-4 text-[#5E5E5E]"
        type="text"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="h-8 rounded-2xl w-[90%] text-lg px-3 py-6 bg-[#F5F5F5] focus:outline-customOrange mt-4 text-[#5E5E5E]"
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className={`w-[90%] text-white text-xl font-bold p-2.5 px-10 rounded-3xl my-4 mt-8 ${
          !email || !password ? 'bg-[#D9D9D9]' : 'bg-customOrange active:bg-orange-400'
        }`}
        onClick={handleSubmit}
        disabled={!email || !password}>
        로그인
      </button>
      <div className="flex">
        <p className="mx-2">혹시 서비스가 처음이신가요?</p>
        <p
          className="mx-2 font-bold cursor-pointer hover:scale-110 transition-transform duration-300"
          onClick={() => navigate('/register')}>
          회원가입
        </p>
      </div>
    </div>
  )
}

export default LoginPage
