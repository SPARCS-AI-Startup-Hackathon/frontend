import { AxiosResponse } from 'axios'
import { RegisterFormData } from '../types'
import { client } from './client'

interface ApiResponse {
  id: number
}

export const registerAPI = async (formData: RegisterFormData): Promise<ApiResponse | boolean> => {
  try {
    const response: AxiosResponse<ApiResponse> = await client.post('/sign-in', formData)
    return response.data
  } catch (error) {
    console.error(error)
    return false
  }
}
