import axios from 'axios'

const baseUrl = '/api/users'

export const createUser = async (userObj) => {
  const response = await axios.post(baseUrl, userObj)
  return response.data
}

export const addScore = async (userObj) => {
  const response = await axios.put(`${baseUrl}/${userObj.id}/score`, userObj)
  return response.data
}

export const getUser = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

export const getAllUser = async () => {
  const response = await axios.get(`${baseUrl}`)
  return response.data
}

export const updatePw = async (pwObj) => {
  const response = await axios.put(`${baseUrl}/${pwObj.id}/password`, pwObj)
  return response.data
}