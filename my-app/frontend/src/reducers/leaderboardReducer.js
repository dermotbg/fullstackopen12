import { createSlice } from '@reduxjs/toolkit'
import { getAllUser } from '../services/users'
import { reqAllAvatars } from '../services/avatars'


const leaderboardSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    avatars: []
  },
  reducers: {
    allUsers(state,action){
      return {
        users: action.payload,
        avatars: state.avatars
      }
    },
    allAvatars(state,action){
      return {
        users: state.users,
        avatars: action.payload
      }
    },
    sortUsers(state, action){
      if(action.payload === 'createdAt'){ //converts date string to timestamp
        const updatedUsers = state.users.map(user => {
          const convertedDate = Date.parse(user.createdAt)
          return { ...user, createdAt: convertedDate }
        })
        return{
          users: updatedUsers.toSorted((a,b) => b[action.payload] - a[action.payload]),
          avatars: state.avatars
        }
      }
      if(action.payload === 'ratedCards'){ //handles value being array.length
        return {
          users: state.users.toSorted((a,b) => b[action.payload].length - a[action.payload].length),
          avatars: state.avatars
        }
      }
      return {
        users: state.users.toSorted((a,b) => b[action.payload] - a[action.payload]),
        avatars: state.avatars
      }
    }
  }
})

export const { allUsers, allAvatars, sortUsers } = leaderboardSlice.actions

export const getAllUsers = () => {
  return async dispatch => {
    const response = await getAllUser()
    dispatch(allUsers(response))
    return response
  }
}

export const getAllAvatars = () => {
  return async dispatch => {
    const response = await reqAllAvatars()
    dispatch(allAvatars(response))
    return response
  }
}

export default leaderboardSlice.reducer