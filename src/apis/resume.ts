import { AxiosResponse } from 'axios'
import { client } from './client'

interface GetData {
  token: string
  resume_id?: number
}

interface ApiResponse {
  id: number
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

export const getResumeListAPI = async ({ token }: GetData): Promise<ApiResponse | boolean> => {
  try {
    if (!token) {
      throw new Error('Access token not found')
    }
    const response: AxiosResponse<ApiResponse> = await client.get('/get-ps', {
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

export const getResumeDetailAPI = async ({
  token,
  resume_id,
}: GetData): Promise<ApiResponse | boolean> => {
  try {
    if (!token) {
      throw new Error('Access token not found')
    }
    const response: AxiosResponse<ApiResponse> = await client.get(`/get-ps/${resume_id}`, {
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
