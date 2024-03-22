import { createSlice } from '@reduxjs/toolkit'
import functions from '../utilities/functions'

const match5Slice = createSlice({
  name: 'match5',
  initialState: {
    en: [],
    bg: [],
    matched: [],
  },
  reducers: {
    set5(state, action){
      // add disabled attribute to all cards
      const updatedSelected = action.payload.map((c) => {
        const cardUpdated = { ...c, disabled: false }
        return cardUpdated
      })
      return{
        en: functions.shuffle([...updatedSelected]),
        bg: functions.shuffle([...updatedSelected]),
        matched: state.matched
      }
    },
    //Set the active card in Match5 (disabling all others)
    setActive(state, action){
      // check which side was clicked by looking for cyrillic (having one cyrillic char will trigger this)
      const cyrillicPattern = /[\u0400-\u04FF]+/
      if (cyrillicPattern.test(action.payload)){
        const allBg = state.bg
        //takes name from the clicked card and sets all other disableds to true
        const updatedCards = allBg.map((c) => {
          return c.bg !== action.payload
            ? { ...c, disabled: true }
            : c
        })
        return {
          en: state.en,
          bg: updatedCards,
          matched: state.matched
        }
      }
      // else if EN side is clicked first, same as above.
      const allEn = state.en
      const updatedCards = allEn.map((c) => {
        return c.en !== action.payload
          ? { ...c, disabled: true }
          : c
      })
      return {
        en: updatedCards,
        bg: state.bg,
        matched: state.matched
      }
    },
    resetActive(state, action){
      // this can be refactored but for now it breaks when it's touched.
      // checks each card to see if it has already been matched
      return{
        en: state.en.map(c => {
          const alreadyMatched = state.matched.find(obj => obj.id === c.id)
          if (c.en === action.payload.en || alreadyMatched) {
            return { ...c, disabled: true, matched: true }
          }
          return { ...c, disabled: false, matched: false } }),

        bg: state.bg.map(c => {
          const alreadyMatched = state.matched.find(obj => obj.id === c.id)
          if (c.bg === action.payload.bg || alreadyMatched){
            return { ...c, disabled: true, matched: true }
          }
          return { ...c, disabled: false, matched: false }}),

        matched: state.matched
      }
    },
    undoActive(state, action) {
      const cyrillicPattern = /[\u0400-\u04FF]+/
      if (cyrillicPattern.test(action.payload)){
        const cardToUndo = state.bg.find(c => c.bg === action.payload) // only txt name sent as payload
        return{
          en: state.en,
          bg: state.bg.map(c => {
            if(c.id === cardToUndo.id){
              return c
            }
            else if(c.matched) {
              return { ...c, disabled: true, matched: true }
            }
            return { ...c, disabled: false, matched: false }
          }),
          matched: state.matched
        }
      }
      const cardToUndo = state.en.find(c => c.en === action.payload) // only txt name sent as payload
      return{
        en: state.en.map(c => {
          if(c.id === cardToUndo.id){
            return c
          }
          else if(c.matched) {
            return { ...c, disabled: true, matched: true }
          }
          return { ...c, disabled: false, matched: false }
        }),
        bg: state.bg,
        matched: state.matched
      }
    },
    setDisabled(state, action){
      //to disable already completed matches
      const enToUpdate = state.en.find((c) => c.id === action.payload.id)
      const bgToUpdate = state.bg.find((c) => c.id === action.payload.id)
      const updatedEn = { ...enToUpdate, disabled: true }
      const updatedBg = { ...bgToUpdate, disabled: true }
      return{
        en: state.en.map(c => c.id === updatedEn.id ? updatedEn : c),
        bg: state.bg.map(c => c.id === updatedBg.id ? updatedBg : c),
        matched: state.matched
      }
    },
    addToMatched(state, action){
      const cardToBeAdded = state.en.find(c => c.id === action.payload.id)
      const matched = state.matched.concat(cardToBeAdded)
      return{
        en: state.en,
        bg: state.bg,
        matched: matched
      }
    },
    resetGame(){
      return {
        en: [],
        bg: [],
        matched: [],
      }
    }
  }
})

export const { set5, setActive, resetActive, undoActive, setDisabled, addToMatched, resetGame } = match5Slice.actions

export default match5Slice.reducer