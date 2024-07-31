import bgTalk from '@assets/images/bgTalk.png'
import bitnarae_default from '@assets/images/bitnarae_default.png'
import bitnarae_talk from '@assets/images/bitnarea_talk.png'
import recording_img from '@assets/images/recording.png'
import DynamicTalkBox from '@components/talk/DynamicTalkBox'
import { useEffect, useState } from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import useAudioStore from 'store/store'
import '../styles/talk.css'

function TalkStartPage() {
  const navigate = useNavigate()
  const { isPlaying } = useAudioStore()
  const [currentImage, setCurrentImage] = useState<string>(bitnarae_default)
  const [isRecording, setIsRecording] = useState<boolean>(false)
  const [blurStep, setBlurStep] = useState<number>(0)

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentImage((prevImage) =>
          prevImage === bitnarae_default ? bitnarae_talk : bitnarae_default,
        )
      }, 500)
    } else {
      setCurrentImage(bitnarae_default)
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [isPlaying])

  useEffect(() => {
    let blurInterval: NodeJS.Timeout

    if (isRecording) {
      blurInterval = setInterval(() => {
        setBlurStep((prevStep) => (prevStep < 3 ? prevStep + 1 : 0))
      }, 300)
    } else {
      setBlurStep(0)
    }

    return () => {
      if (blurInterval) {
        clearInterval(blurInterval)
      }
    }
  }, [isRecording])

  const getBlurClass = () => {
    switch (blurStep) {
      case 1:
        return 'blur-md'
      case 2:
        return 'blur-lg'
      case 3:
        return 'blur-xl'
      default:
        return 'invisible'
    }
  }

  return (
    <div
      className="w-dvw max-w-[375px] h-dvh m-auto bg-cover bg-center flex flex-col items-center justify-between shadow-md"
      style={{ backgroundImage: `url(${bgTalk})` }}>
      <div className="w-full flex justify-start p-4 py-5">
        <FaArrowLeftLong
          size="28"
          className="cursor-pointer text-customOrange"
          onClick={() => navigate('/talk')}
        />
      </div>
      <div className="relative flex flex-col items-center">
        <DynamicTalkBox />
        <img src={currentImage} className="mt-8 -mb-2" />
        <div className="relative mt-4">
          {isRecording && (
            <div className={`absolute inset-0 flex items-center justify-center ${getBlurClass()}`}>
              <div className="w-36 h-20 rounded-full bg-orange-500 opacity-50"></div>
            </div>
          )}
          <img
            src={recording_img}
            className="cursor-pointer relative z-10"
            onClick={() => setIsRecording(!isRecording)}
          />
        </div>
      </div>
      <button
        className="w-full text-[#FF8E4E] text-lg font-semibold bg-white p-2.5 px-10"
        onClick={() => navigate('/talk_start')}>
        대화 기록 보기
      </button>
    </div>
  )
}

export default TalkStartPage
