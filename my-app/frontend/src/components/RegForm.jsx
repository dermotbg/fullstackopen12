import { PropTypes } from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { createUser } from '../services/users'
import { setMessage } from '../reducers/notificationReducer'
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, FormControl, FormLabel, Input, Stack } from '@chakra-ui/react'
import { loginUser } from '../reducers/userReducer'

const RegForm = ({ buttonColor, buttonText, hoverColor, hoverText }) => {
  const dispatch = useDispatch()
  const notification = useSelector((state) => state.notification.message)

  const regHandler = async (event) => {
    event.preventDefault()
    const pwRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*].{8,16}$/
    const whspRegex = /\s/
    if(!pwRegex.test(event.target.password.value)){
      dispatch(setMessage({
        message: 'Password must be between 8-16 characters, contain at least one number and special character',
        isError: true
      }))
      setTimeout(() => {
        dispatch(setMessage(''))
      }, 3000)
      return
    }
    else if (whspRegex.test(event.target.username.value)){
      dispatch(setMessage({
        message: 'Please refrain from using spaces in your username',
        isError: true
      }))
      setTimeout(() => {
        dispatch(setMessage(''))
      }, 3000)
      return
    }
    const userObj = {
      username: event.target.username.value.trim(),
      password: event.target.password.value.trim()
    }
    try{
      await createUser(userObj)
    }
    catch(error){
      dispatch(setMessage({
        message: error.response.data.error,
        isError: true
      }))
      setTimeout(() => {
        dispatch(setMessage(''))
      }, 3000)
      return
    }
    dispatch(loginUser(userObj))
    event.target.username.value = '',
    event.target.password.value = ''
  }
  return(
    <Box pb={5}>
      {notification
        ?
        <Alert  borderRadius={'5%'}>
          <Stack>
            <AlertIcon />
            <AlertTitle>Could not process request:</AlertTitle>
            <AlertDescription> <em><b>{notification} </b></em> </AlertDescription>
            <AlertDescription>Please try again</AlertDescription>
          </Stack>
        </Alert>
        :

        <form onSubmit={regHandler}>
          <FormControl isRequired>
            <FormLabel>Username</FormLabel>
            <Input _focus={{ borderColor: buttonColor, boxShadow: '0 0 0 black' }} name="username" placeholder='Username' p={5} mb={5}  />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input _focus={{ borderColor: buttonColor, boxShadow: '0 0 0 black' }} type="password" name="password" placeholder='Password' p={5} mb={5}  />
          </FormControl>
          <Button
            p={5}
            bg={buttonColor}
            color={buttonText}
            _hover={{ bg: hoverColor, color: hoverText  }}
            type='submit'
          >
          Register
          </Button>
        </form>
      }
    </Box>
  )
}

export default RegForm

RegForm.propTypes = {
  buttonColor: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  hoverColor: PropTypes.string.isRequired,
  hoverText: PropTypes.string.isRequired,
}