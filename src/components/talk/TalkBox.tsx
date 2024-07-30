import { useEffect, useState } from 'react'

function TalkBox() {
  const [visible, setVisible] = useState(false)
  const [messageStep, setMessageStep] = useState(0)

  const steps = [
    {
      message: (
        <p className="text-xl py-2 break-words text-[#8F8F8F]">
          저랑 대화하면
          <br />
          <span className="text-[#FA8D43] font-bold">적성에 맞는 직업</span>을 추천하고,
          <br />
          <span className="text-[#FA8D43] font-bold">자기소개서</span>도 작성해 드려요!
        </p>
      ),
      delay: 3000,
    },
    {
      message: (
        <p className="text-xl py-2 break-words text-[#8F8F8F]">
          안녕!
          <br />
          <span className="text-[#FA8D43] font-bold">마이크 버튼을 누르고 </span>말을 하면
          <br />
          제가 알아들을게요!
        </p>
      ),
      delay: 3000,
    },
    {
      message: (
        <p className="text-xl py-2 break-words text-[#8F8F8F]">
          마이크버튼을
          <br />
          <span className="text-[#FA8D43] font-bold">한번 더 누르면</span>
          <br />
          녹음이 중지되요!
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
        }, 100) // 작은 지연 시간을 주어 애니메이션이 다시 시작되도록 함
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

export default TalkBox
