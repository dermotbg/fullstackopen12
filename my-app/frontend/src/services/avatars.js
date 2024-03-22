import axios from 'axios'

const baseUrl = '/api/avatars'

export const setAvatar = async (avatarObj) => {
  const response = await axios.put(baseUrl, avatarObj)
  return response.data
}

export const userAvatar = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

export const reqAllAvatars = async () => {
  const response = await axios.get(`${baseUrl}`)
  return response.data
}