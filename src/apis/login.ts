import { AxiosResponse } from 'axios'
import { client } from './client'

interface PostData {
  email: string
  password: string
}

interface ApiResponse {
  accessToken: string
  refreshToken: string
  accessTokenValidationTime: number
  refreshTokenValidationTime: number
}

export const loginAPI = async ({ email, password }: PostData): Promise<ApiResponse | boolean> => {
  try {
    const response: AxiosResponse<ApiResponse> = await client.post('/login', {
      email: email,
      password: password,
    })
    return response.data
  } catch (error) {
    console.error(error)
    return false
  }
}
