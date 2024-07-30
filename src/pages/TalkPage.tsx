import bgTalk from '@assets/images/bgTalk.png'

function TalkPage() {
  return (
    <div
      className="w-dvw max-w-[375px] h-dvh m-auto bg-cover bg-center flex flex-col items-center justify-between shadow-md"
      style={{ backgroundImage: `url(${bgTalk})` }}>
      <div></div>
      <button className="w-[90%] text-white text-xl bg-[#FA8D43] p-2.5 px-10 rounded-3xl mb-10 active:bg-orange-500">
        시작하기
      </button>
    </div>
  )
}

export default TalkPage
