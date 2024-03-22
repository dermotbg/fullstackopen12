import { createSlice } from '@reduxjs/toolkit'


const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: null,
    isError: null
  },
  reducers: {
    setMessage(state, action){
      return {
        message: action.payload.message,
        isError: action.payload.isError
      }
    },
    resetMessage(){
      return {
        message: null,
        isError: null
      }
    },
  }
})

export const { setMessage, resetMessage } = notificationSlice.actions

export default notificationSlice.reducer