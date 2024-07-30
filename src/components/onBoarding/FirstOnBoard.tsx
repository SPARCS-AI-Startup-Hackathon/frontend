import bgOnBoard_1 from '@assets/images/bgOnBoard_1.png'
import { GiPlainCircle } from 'react-icons/gi'
import { GrFormNext, GrFormPrevious } from 'react-icons/gr'

function FirstOnBoard() {
  return (
    <div
      className="w-screen h-screen bg-cover bg-center flex flex-col items-center justify-between"
      style={{ backgroundImage: `url(${bgOnBoard_1})` }}>
      <div className="text-[#FEAA61] text-2xl font-[cafe24] text-left self-start ml-8 mt-16">
        내 나이가 몇인데..
        <br />
        적당히 할 일 찾거나
        <br />
        쉬어야지..
        <br />
        이런 생각때문에
        <br />
        우울하신 적 있나요?
      </div>
      <div className="w-full flex justify-between items-center mb-6">
        <GrFormPrevious size="40" className="ml-8 text-customOrange" />
        <div className="flex">
          <GiPlainCircle size="12" className="mx-1 text-customOrange" />
          <GiPlainCircle size="12" className="mx-1 text-white" />
          <GiPlainCircle size="12" className="mx-1 text-white" />
          <GiPlainCircle size="12" className="mx-1 text-white" />
          <GiPlainCircle size="12" className="mx-1 text-white" />
        </div>
        <GrFormNext size="40" className="mr-8 text-customOrange" />
      </div>
    </div>
  )
}

export default FirstOnBoard
