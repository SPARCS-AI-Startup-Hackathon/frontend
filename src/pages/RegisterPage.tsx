/* eslint-disable react-hooks/rules-of-hooks */
import FifthRegister from '@components/register/FifthRegister'
import FirstSignUp from '@components/register/FirstRegister'
import FourthRegister from '@components/register/FourthRegister'
import SecondRegister from '@components/register/SecondRegiser'
import SixthRegister from '@components/register/SixthRegister'
import ThirdRegister from '@components/register/ThirdRegister'

import { useState } from 'react'
import { animated, useSpring } from 'react-spring'

import { RegisterFormData } from '../types'

function RegisterPage() {
  const [index, setIndex] = useState(0)
  const [formData, setFormData] = useState<RegisterFormData>({
    email: '',
    password: '',
    name: '',
    age: null,
    tel: '',
    introduction: '',
  })

  const pages = [
    FirstSignUp,
    SecondRegister,
    ThirdRegister,
    FourthRegister,
    FifthRegister,
    SixthRegister,
  ]

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

  const updateFormData = (key: keyof RegisterFormData, value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: value,
    }))
  }

  return (
    <div className="w-dvw max-w-[375px] h-dvh m-auto flex overflow-hidden relative shadow-md">
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
            goToPrevious={handlePrevious}
            goToNext={handleNext}
            formData={formData}
            updateFormData={updateFormData}
          />
        </animated.div>
      ))}
    </div>
  )
}

export default RegisterPage
