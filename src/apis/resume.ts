import { AxiosResponse } from 'axios'
import { client } from './client'

interface GetData {
  token: string
}

interface ApiResponse {
  name: string
  job: string
  content: string
}

export const getResumeAPI = async ({ token }: GetData): Promise<ApiResponse | boolean> => {
  try {
    if (!token) {
      throw new Error('Access token not found')
    }
    const response: AxiosResponse<ApiResponse> = await client.get('/personal-statement', {
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
