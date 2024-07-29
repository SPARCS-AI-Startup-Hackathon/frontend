import homeIcon from '@assets/homeIcon.png'
import personIcon from '@assets/personIcon.png'
import resumeIcon from '@assets/resumeIcon.png'
import { useNavigate } from 'react-router-dom'

function NavBar() {
  const navigate = useNavigate()

  return (
    <footer className="shadow-md flex">
      <button className="flex-1 flex flex-col justify-center items-center active:bg-gray-200 p-4">
        <img src={resumeIcon} className="p-1" />
        <p className="text-[#B7B7B7] font-bold text-xs">이력서 공유</p>
      </button>
      <button
        className="flex-1 flex flex-col justify-center items-center active:bg-gray-200 p-4"
        onClick={() => navigate('/main')}>
        <img src={homeIcon} className="p-1" />
        <p className="text-[#FE654F] font-bold text-xs">홈</p>
      </button>
      <button className="flex-1 flex flex-col justify-center items-center active:bg-gray-200 p-4">
        <img src={personIcon} className="p-1" />
        <p className="text-[#B7B7B7] font-bold text-xs">마이페이지</p>
      </button>
    </footer>
  )
}

export default NavBar
