function TalkBox() {
  return (
    <div className="flex relative rounded-2xl justify-center text-center w-[90%] max-w-[300px] h-[150px]">
      <div className="absolute inset-0 bg-[#FA8D43] blur-xl rounded-lg"></div>
      <div className="flex relative items-center bg-white p-6 pt-4 rounded-3xl w-full h-full overflow-y-auto">
        <p className="text-xl py-2 break-words text-[#8F8F8F]">
          저랑 대화하면 <br />
          <span className="text-[#FA8D43] font-bold">적성에 맞는 직업</span>을 추천하고,
          <br />
          <span className="text-[#FA8D43] font-bold">자기소개서</span>도 작성해 드려요!
        </p>
      </div>
      <div className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[30px] border-t-white"></div>
    </div>
  )
}

export default TalkBox
