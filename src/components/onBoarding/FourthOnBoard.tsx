import bgOnBoard_4 from '@assets/images/bgOnBoard_4.png'
import { GiPlainCircle } from 'react-icons/gi'
import { GrFormNext, GrFormPrevious } from 'react-icons/gr'

interface OnBoardProps {
  index: number
  totalPages: number
  goToNext: () => void
  goToPrevious: () => void
}

function FourthOnBoard({ index, totalPages, goToNext, goToPrevious }: OnBoardProps) {
  return (
    <div
      className="w-full h-full bg-cover bg-center flex flex-col items-center justify-between"
      style={{ backgroundImage: `url(${bgOnBoard_4})` }}>
      <div className="text-[#FEAA61] text-2xl font-[cafe24] text-left self-start ml-8 mt-16">
        당신은
        <br />
        하고싶은 일을 찾고
        <br />
        하고싶은 일을 하기에
        <br />
        충분히 젊습니다.
      </div>
      <div className="w-full flex justify-between items-center mb-6">
        <GrFormPrevious
          size="40"
          className="ml-8 text-customOrange"
          onClick={goToPrevious}
          style={{ visibility: index === 0 ? 'hidden' : 'visible' }}
        />
        <div className="flex">
          {[...Array(totalPages)].map((_, i) => (
            <GiPlainCircle
              key={i}
              size="12"
              className={`mx-1 ${index === i ? 'text-customOrange' : 'text-white'}`}
            />
          ))}
        </div>
        <GrFormNext
          size="40"
          className="mr-8 text-customOrange"
          onClick={goToNext}
          style={{ visibility: index === totalPages - 1 ? 'hidden' : 'visible' }}
        />
      </div>
    </div>
  )
}

export default FourthOnBoard
