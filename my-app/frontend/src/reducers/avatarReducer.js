import { createSlice } from '@reduxjs/toolkit'
import functions from '../utilities/functions'
import { reqAllAvatars, setAvatar, userAvatar } from '../services/avatars'

const avatarSlice = createSlice({
  name: 'avatar',
  initialState: {
    seed: '',
    rotate: 0,
    scale: 100,
    flip: false,
    backgroundColor: [''],
    translateX: 0,
    translateY: 0,
    beard: [''],
    beardProbability: 100,
    eyes: [''],
    mouth: [''],
    mustache: [''],
    mustacheProbability: 100,
    nose: [''],
    top: [''],
    topColor: [''],
  },
  reducers: {
    setSomething(state, action){
      const key = Object.keys(action.payload)[0]
      const value = Object.values(action.payload)[0]
      return {  ...state, [key]: value }
    },
    loadAvatar(state, action){
      return action.payload
    },
  }
})

export const { setSomething, loadAvatar, } = avatarSlice.actions

export const saveAvatar = (avatarObj) => {
  return async () => {
    await setAvatar(avatarObj)
  }
}

export const getAvatar = (id) => {
  return async dispatch => {
    const response = await userAvatar(id)
    await dispatch(loadAvatar(response))
  }
}

export const getRandomAvatars = async () => {
  const response = await reqAllAvatars()
  const randoms = functions.getRandomCards(response, 3)
  return randoms
}

export default avatarSlice.reducer