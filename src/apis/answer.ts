import { client } from './client'

interface PostData {
  message: string
  token: string
}

export const answerAPI = async ({ message, token }: PostData) => {
  try {
    if (!token) {
      throw new Error('Access token not found')
    }
    const response = await client.post(
      '/answer',
      { message },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return response.data
  } catch (error) {
    console.error(error)
    return false
  }
}
