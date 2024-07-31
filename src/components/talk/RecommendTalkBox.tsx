/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

function RecommendTalkBox() {
  const [visible, setVisible] = useState(false)
  const [messageStep, setMessageStep] = useState(0)

  const job = sessionStorage.getItem('job')

  const steps = [
    {
      message: (
        <p className="text-xl py-2 break-words text-[#8F8F8F]">
          당신의 이야기를 듣고
          <br />
          함께 고민해 본 결과
          <br />
          당신의 적성에 맞는 직업은..
        </p>
      ),
      delay: 3000,
    },
    {
      message: (
        <p className="text-xl py-2 break-words text-[#8F8F8F]">
          <span className="text-[#FA8D43] font-bold">{job} </span>을(를)
          <br />
          즐겁게 하실 것 같아요.
        </p>
      ),
      delay: 3000,
    },
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (visible && messageStep < steps.length - 1) {
      const currentStep = steps[messageStep]
      const secondTimer = setTimeout(() => {
        setVisible(false)
        setTimeout(() => {
          setMessageStep((prev) => prev + 1)
          setVisible(true)
        }, 100)
      }, currentStep.delay)

      return () => clearTimeout(secondTimer)
    }
  }, [visible, messageStep])

  const currentStep = steps[messageStep]

  return (
    <div
      className={`flex relative rounded-2xl justify-center text-center w-[90%] max-w-[300px] h-[150px] ${
        visible ? 'talkBox-animate' : 'talkBox-invisible'
      }`}>
      <div className="absolute inset-0 bg-[#FA8D43] blur-xl rounded-lg"></div>
      <div className="flex relative items-center justify-center bg-white p-4 pt-4 rounded-3xl w-full h-full overflow-y-auto">
        {currentStep?.message}
      </div>
      <div className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[30px] border-t-white"></div>
    </div>
  )
}

export default RecommendTalkBox
