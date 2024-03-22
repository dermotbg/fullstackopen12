import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { checkLogin } from './reducers/userReducer'
import Random10 from './components/Random10'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Home from './components/Home'
import Account from './components/Account'

import './components/Gen.css'
import { getAvatar } from './reducers/avatarReducer'
import Match5 from './components/Match5'
import { getCards } from './reducers/cardReducer'
import Hangman from './components/Hangman'

import NavBar from './components/Navbar'
import Footer from './components/Footer'
import Leaderboards from './components/Leaderboards'
import AvatarRoute from './components/AvatarRoute'

const App = () => {
  const user = useSelector((state) => state.user)
  const cards = useSelector((state) => state.flashcards)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const login = window.localStorage.getItem('loggedInUser')

  useEffect(() => {
    if(login){
      dispatch(checkLogin())
      setInterval(() => {
        dispatch(checkLogin())
      }, (6000 * 61))
    }
    if(!login){navigate('/')}
    // need to force logout on expired token!!
  }, [dispatch, login])


  useEffect(() => {
    if (user && user.avatar){
      dispatch(getAvatar(user.avatar))
    }
  }, [user])

  // fetch cards when app accessed. Possibly need to refactor into when there's an active login
  useEffect(() => {
    dispatch(getCards())
  }, [dispatch])

  return(
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home login={JSON.parse(login)} />} />
        <Route path='/random10' element={<Random10 cards={cards} />} />
        {user ? <Route path='/user/:id' element={<Account login={user} />} /> : null }
        <Route path='/match5' element={<Match5 cards={cards} />} />
        <Route path='/hangman' element={<Hangman cards={cards} />} />
        <Route path='/leaderboards' element={<Leaderboards />} />
        <Route path='/user/:id/avatar' element={<AvatarRoute />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App