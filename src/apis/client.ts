import axios from 'axios'

export const client = axios.create({
  baseURL: 'http://223.130.132.133:8080/api',
})
