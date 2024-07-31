import { AxiosResponse } from 'axios'
import { client } from './client'

interface GetData {
  token: string
}

interface ApiResponse {
  recommendJob: string
}

export const recommendJobAPI = async ({ token }: GetData): Promise<ApiResponse | boolean> => {
  try {
    if (!token) {
      throw new Error('Access token not found')
    }
    const response: AxiosResponse<ApiResponse> = await client.get('/recommend', {
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

export const reRecommendJobAPI = async ({ token }: GetData): Promise<ApiResponse | boolean> => {
  try {
    if (!token) {
      throw new Error('Access token not found')
    }
    const response: AxiosResponse<ApiResponse> = await client.get('/re-recommend', {
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
