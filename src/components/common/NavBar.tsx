import homeIcon from '@assets/images/homeIcon.png'
import personIcon from '@assets/images/personIcon.png'
import serviceIcon from '@assets/images/serviceIcon.png'
import { useNavigate } from 'react-router-dom'

function NavBar() {
  const navigate = useNavigate()

  return (
    <footer className="shadow-md flex">
      <button className="flex-1 flex flex-col justify-center items-center active:bg-gray-200 p-4">
        <img src={personIcon} className="p-1" />
        <p className="text-[#B7B7B7] font-bold text-xs">마이페이지</p>
      </button>
      <button
        className="flex-1 flex flex-col justify-center items-center active:bg-gray-200 p-4"
        onClick={() => navigate('/main')}>
        <img src={homeIcon} className="p-1" />
        <p className="text-[#FE654F] font-bold text-xs">홈</p>
      </button>
      <button
        className="flex-1 flex flex-col justify-center items-center active:bg-gray-200 p-4"
        onClick={() => navigate('/')}>
        <img src={serviceIcon} className="p-1" />
        <p className="text-[#B7B7B7] font-bold text-xs">서비스 소개</p>
      </button>
    </footer>
  )
}

export default NavBar
