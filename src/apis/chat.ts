import { AxiosResponse } from 'axios'
import { client } from './client'

interface GetData {
  token: string
}

interface ChatResponse {
  sender: string
  content: string
}

interface ApiResponse {
  chatResponses: ChatResponse[]
}

export const getChatRecordAPI = async ({ token }: GetData): Promise<ApiResponse | boolean> => {
  try {
    if (!token) {
      throw new Error('Access token not found')
    }
    const response: AxiosResponse<ApiResponse> = await client.get('/get-chat', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    console.error(error)
    return false
  }
}
