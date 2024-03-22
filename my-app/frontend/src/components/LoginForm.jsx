import { PropTypes } from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, FormControl, FormLabel, Input, Stack } from '@chakra-ui/react'
import { setMessage } from '../reducers/notificationReducer'

const Login = ({ buttonColor, buttonText, hoverColor, hoverText }) => {

  const notification = useSelector(state => state.notification.message)
  const dispatch = useDispatch()

  const loginHandler = async (event) => {
    event.preventDefault()
    const loginObj = {
      username: event.target.username.value.toLowerCase().trim(),
      password: event.target.password.value,
    }
    try{
      await dispatch(loginUser(loginObj))
    }
    catch(error){
      dispatch(setMessage({ message: error.response.data.error, isError: true }))
      setTimeout(() => {
        dispatch(setMessage(''))
      }, 2000)
    }
  }



  return(
    <Box pb={5}>
      {notification
        ?
        <Alert  borderRadius={'5%'}>
          <Stack>
            <AlertIcon />
            <AlertTitle>Could not log in:</AlertTitle>
            <AlertDescription> <em><b>{notification} </b></em> </AlertDescription>
            <AlertDescription>Please try again</AlertDescription>
          </Stack>
        </Alert>
        :
        <form onSubmit={loginHandler}>
          <FormControl isRequired>
            <FormLabel >Username</FormLabel>
            <Input p={5} mb={5} _focus={{ borderColor: buttonColor, boxShadow: '0 0 0 black' }} name="username" placeholder='Username'  />
          </FormControl>
          <FormControl isRequired>
            <FormLabel >Password</FormLabel>
            <Input p={5} mb={5} _focus={{ borderColor: buttonColor, boxShadow: '0 0 0 black' }}  type="password" name="password" placeholder='Password'  />
          </FormControl>
          <Button
            p={5}
            bg={buttonColor}
            color={buttonText}
            _hover={{ bg: hoverColor, color: hoverText  }}
            type='submit'
          >
          Login
          </Button>
        </form>
      }
    </Box>
  )
}

export default Login

Login.propTypes = {
  buttonColor: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  hoverColor: PropTypes.string.isRequired,
  hoverText: PropTypes.string.isRequired,
}
