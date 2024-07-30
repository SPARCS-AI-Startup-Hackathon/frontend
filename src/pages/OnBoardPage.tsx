/* eslint-disable react-hooks/rules-of-hooks */
import FifthOnBoard from '@components/onBoarding/FifthOnBoard'
import FirstOnBoard from '@components/onBoarding/FirstOnBoard'
import FourthOnBoard from '@components/onBoarding/FourthOnBoard'
import SecondOnBoard from '@components/onBoarding/SecondOnBoard'
import ThirdOnBoard from '@components/onBoarding/ThirdOnBoard'
import { useState } from 'react'
import { animated, useSpring } from 'react-spring'

function OnBoardPage() {
  const [index, setIndex] = useState(0)
  const pages = [FirstOnBoard, SecondOnBoard, ThirdOnBoard, FourthOnBoard, FifthOnBoard]

  const transitions = pages.map((_, i) =>
    useSpring({
      opacity: index === i ? 1 : 0,
      transform:
        index === i
          ? 'translate3d(0%,0,0)'
          : i < index
          ? 'translate3d(-100%,0,0)'
          : 'translate3d(100%,0,0)',
      config: { mass: 1, tension: 210, friction: 30 },
    }),
  )

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % pages.length)
  }

  const handlePrevious = () => {
    setIndex((prevIndex) => (prevIndex - 1 + pages.length) % pages.length)
  }

  return (
    <div className="w-dvw max-w-[375px] h-dvh m-auto flex overflow-hidden relative">
      {pages.map((Page, i) => (
        <animated.div
          key={i}
          style={{
            ...transitions[i],
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}>
          <Page
            index={index}
            totalPages={pages.length}
            goToNext={handleNext}
            goToPrevious={handlePrevious}
          />
        </animated.div>
      ))}
    </div>
  )
}

export default OnBoardPage
