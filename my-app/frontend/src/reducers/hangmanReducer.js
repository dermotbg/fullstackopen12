import { createSlice } from '@reduxjs/toolkit'


const HangmanSlice = createSlice({
  name: 'hangman',
  initialState: {
    card: {},
    guessed: []
  },
  reducers: {
    setHangmanWord(state, action){
      return{
        card: action.payload,
        guessed: state.guessed
      }
    },
    setGuessed(state, action){
      return{
        card: state.card,
        guessed: action.payload
      }
    }
  }
})

export const { setHangmanWord, setGuessed } = HangmanSlice.actions

export default HangmanSlice.reducer