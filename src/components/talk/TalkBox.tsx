/* eslint-disable react-hooks/exhaustive-deps */
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
          <span className="text-[#FA8D43] font-bold">마이크 버튼을 누르고 </span>말을 하면
          <br />
          제가 듣고 답변 해드릴게요!
        </p>
      ),
      delay: 3000,
    },
    {
      message: (
        <p className="text-xl py-2 break-words text-[#8F8F8F]">
          <span className="text-[#FA8D43] font-bold">말풍선을 클릭</span>하면
          <br />제 대답을 읽어드려요!
        </p>
      ),
      delay: 3000,
    },
    {
      message: (
        <p className="text-xl py-2 break-words text-[#8F8F8F]">
          하단에 <span className="text-[#FA8D43] font-bold">대화 기록</span> 버튼을 눌러
          <br />
          진행중인 대화 내용을 <br />볼 수 있어요!
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

export default TalkBox
