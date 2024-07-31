import { answerAPI } from '@apis/answer'
import { useEffect } from 'react'
import { useConnectionStore, useMessageStore } from 'store/store'
import { parseContent, parseData } from '../utils/parser'

const useTranscriptHandler = (transcript: string) => {
  const { setMessage, setAllMessagesReceived } = useMessageStore()
  const { connectionCount, incrementConnectionCount } = useConnectionStore()

  useEffect(() => {
    if (transcript) {
      const token = localStorage.getItem('accessToken')
      if (token) {
        answerAPI({ message: transcript, token: token })
          .then((response) => {
            setMessage('')
            setAllMessagesReceived(false)
            console.log('Response data:', response)
            const eventSource = new EventSource(`http://223.130.132.133:8080/api/question/${token}`)

            eventSource.onopen = () => {
              console.log('새롭게 연결됨')
              incrementConnectionCount()
              console.log(connectionCount)
            }

            eventSource.onmessage = (event: MessageEvent) => {
              const content = parseContent(event.data)

              setMessage((prev: string) => prev + content)

              const data = parseData(event.data)
              console.log('New message:', data)

              if (data === 'stop_before') {
                console.log('All messages received. Closing connection.')
                eventSource.close()
                setAllMessagesReceived(true)
              }
            }

            eventSource.onerror = (event) => {
              console.error('Error:', event)
            }

            return () => {
              eventSource.close()
            }
          })
          .catch((error) => {
            console.error('API 호출 오류:', error)
          })
      }
    }
  }, [transcript, setMessage, setAllMessagesReceived, incrementConnectionCount])
}

export default useTranscriptHandler
