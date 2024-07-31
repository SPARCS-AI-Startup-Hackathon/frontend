import bitnarae from '@assets/images/bitnarae_default.png'
import logo from '@assets/images/logo.png'
import { useNavigate } from 'react-router-dom'

function WelcomePage() {
  const navigate = useNavigate()

  return (
    <div className="w-dvw max-w-[375px] h-dvh m-auto flex flex-col items-center justify-center shadow-md">
      <p className="font-bold text-[#F4BE15] text-xl p-4 ">당신만의 빛나는 시니어 라이프</p>
      <img src={logo} className="" />
      <img src={bitnarae} className="" />
      <button
        className="w-[90%] text-white text-xl font-bold p-2.5 px-10 rounded-3xl my-2 bg-customOrange active:bg-orange-400"
        onClick={() => navigate('/login')}>
        로그인
      </button>
      <button
        className="w-[90%] text-customOrange text-xl font-bold p-2.5 px-10 rounded-3xl my-2 bg-white active:bg-orange-50 border border-customOrange"
        onClick={() => navigate('/register')}>
        회원가입
      </button>
    </div>
  )
}

export default WelcomePage
