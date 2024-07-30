import axios from 'axios'
import { useState } from 'react'

function TestPage() {
  const [chat, setChat] = useState('여기에 채팅내역이 보임')

  const postChat = async () => {
    try {
      const requestBody = {
        message: '안녕하세요',
      }

      const response = await axios.post('http://223.130.132.133:8080/api/test-clova', requestBody)
      console.log(response)
      setChat(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="flex flex-col">
      <button className="bg-slate-500 p-5 rounded-lg w-44" onClick={postChat}>
        채팅 시작하기
      </button>
      <div className="border border-black w-64 h-20">{chat}</div>
    </div>
  )
}

export default TestPage
