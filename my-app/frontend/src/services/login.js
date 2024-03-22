import axios from 'axios'

const baseUrl = '/api/login'

export const loginReq = async (loginObj) => {
  const response = await axios.post(baseUrl, loginObj)
  return response.data
}