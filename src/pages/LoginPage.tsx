import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  return (
    <div className="w-dvw max-w-[375px] h-dvh m-auto flex flex-col items-center justify-center shadow-md">
      <input
        className="h-8 rounded-2xl w-[90%] text-lg px-3 py-6 bg-[#F5F5F5] focus:outline-customOrange mt-4 text-[#5E5E5E]"
        type="text"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="h-8 rounded-2xl w-[90%] text-lg px-3 py-6 bg-[#F5F5F5] focus:outline-customOrange mt-4 text-[#5E5E5E]"
        type="text"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className={`w-[90%] text-white text-xl font-bold p-2.5 px-10 rounded-3xl my-4 mt-8 ${
          !email || !password ? 'bg-customOrange active:bg-orange-400' : 'bg-[#D9D9D9]'
        }`}
        onClick={() => console.log('로그인 요청')}
        disabled={!email || !password}>
        다음
      </button>
      <div className="flex">
        <p className="mx-2">혹시 서비스가 처음이신가요?</p>
        <p className="mx-2 font-bold cursor-pointer" onClick={() => navigate('/register')}>
          회원가입
        </p>
      </div>
    </div>
  )
}

export default LoginPage
