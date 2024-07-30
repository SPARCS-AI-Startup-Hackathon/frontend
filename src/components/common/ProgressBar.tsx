interface ProgressProps {
  progress: number
}

const ProgressBar = ({ progress }: ProgressProps) => {
  return (
    <div className="flex w-full items-center my-8">
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div className="bg-orange-400 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
      </div>
      <p className="text-orange-400 font-semibold mx-3">{progress}%</p>
    </div>
  )
}

export default ProgressBar
