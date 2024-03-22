import { useEffect, useState } from 'react'
import { get1User, updatePassword } from '../reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import Loading from './Loading'
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Center, Flex, FormControl, FormLabel, Heading, Input, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import functions from '../utilities/functions'
import { setMessage } from '../reducers/notificationReducer'


const Account = ({ login }) => {
  const user = useSelector(state => state.user)
  const notification = useSelector(state => state.notification)
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()

  const headingColor = useColorModeValue('red.400', 'yellow.400')
  const textShadowColor = useColorModeValue('1px 1px 1px gray', '1px 1px 3px black')
  const buttonColor = useColorModeValue('white', 'gray.800')
  const buttonText = useColorModeValue('red.400', 'yellow.400')

  const hoverColor = useColorModeValue('red.400', 'yellow.400')
  const hoverText = useColorModeValue('white', 'gray.800')

  const hiddenWhileTrue = { display: visible ? 'none' : '' }
  const shownWhileTrue = { display: visible ? '' : 'none' }

  const toggleVisible = () => {
    setVisible(!visible)
  }

  useEffect(() => {
    if(login.id) dispatch(get1User(login.id))
  },[dispatch, login.id])

  const pwHandler = (event) => {
    event.preventDefault()
    if(event.target.password.value === event.target.newPassword.value){
      dispatch(setMessage({ message: 'Passwords can not be the same', isError: true }))
      setTimeout(() => {
        dispatch(setMessage(''))
      }, 2000)
    }
    if(event.target.newPassword.value !== event.target.confPassword.value){
      dispatch(setMessage({ message: 'Passwords do not match', isError: true }))
      setTimeout(() => {
        dispatch(setMessage(''))
      }, 2000)
      return
    }
    const pwRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*].{8,16}$/
    if(!pwRegex.test(event.target.newPassword.value)){
      dispatch(setMessage({
        message: 'Password must be 8-16 characters, with one number and special character',
        isError: true
      }))
      setTimeout(() => {
        dispatch(setMessage(''))
      }, 3000)
    }
    const pwObj = {
      username: user.username,
      id: user.id,
      password: event.target.password.value,
      newPassword: event.target.newPassword.value
    }
    dispatch(updatePassword(pwObj))

  }
  // check for user pre date load
  if(!user.createdAt) return <Loading />

  const date = String(functions.getDate(user.createdAt)).substring(0, 25)

  return(
    <Box>
      <Flex flexDirection={'row'} wrap={'wrap'} justifyContent={'space-around'}>
        <Stack m={10}>
          <Flex flexDirection={'row'} mt={5} wrap={'wrap'}>
            <Heading
              as={'h1'}
              size={'2xl'}
              pb={5}
              pr={5}
              sx={{ textShadow: textShadowColor }}
            >
                  Welcome
            </Heading>
            <Heading
              as={'h1'}
              size={'2xl'}
              color={headingColor}
              sx={{ textShadow: textShadowColor }}
            >
              {login.username}
            </Heading>
          </Flex>
          <Text fontSize={'xl'}>Your account was created: </Text>
          <Text color={headingColor} sx={{ textShadow: textShadowColor }} >{date}</Text>
          <Text fontSize={'xl'}>You currently have a score of: </Text>
          <Text color={headingColor} sx={{ textShadow: textShadowColor }} >{user.score}</Text>
          <Text fontSize={'xl'}>You currently have rated a total of:</Text>
          <Text color={headingColor} sx={{ textShadow: textShadowColor }} >{user.ratedCards.length} cards</Text>
          <Button
            p={5}
            bg={buttonColor}
            color={buttonText}
            _hover={{ bg: hoverColor, color: hoverText  }}
            style={hiddenWhileTrue}
            onClick={toggleVisible}
          >
              Change Password?
          </Button>

        </Stack>

        <Center m={10} style={shownWhileTrue}>
          <Center mt={5}>
            {notification.message
              ?
              notification.isError
                ?
                <Alert  borderRadius={'5%'}>
                  <Stack>
                    <AlertIcon />
                    <AlertTitle>Could not process request:</AlertTitle>
                    <AlertDescription> <em><b>{notification.message} </b></em> </AlertDescription>
                    <AlertDescription>Please try again</AlertDescription>
                  </Stack>
                </Alert>
                :
                <Alert  borderRadius={'5%'} status='success'>
                  <Stack>
                    <AlertIcon />
                    <AlertTitle>Request Successful:</AlertTitle>
                    <AlertDescription> <em><b>{notification.message} </b></em> </AlertDescription>
                  </Stack>
                </Alert>
              :
              <form onSubmit={pwHandler}>
                <FormControl isRequired>
                  <FormLabel >Current Password</FormLabel>
                  <Input p={5} mb={5} _focus={{ borderColor: buttonColor, boxShadow: '0 0 0 black' }}  type="password" name="password"  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel >New Password</FormLabel>
                  <Input p={5} mb={5} _focus={{ borderColor: buttonColor, boxShadow: '0 0 0 black' }}  type="password" name="newPassword"  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel >Confirm New Password</FormLabel>
                  <Input p={5} mb={5} _focus={{ borderColor: buttonColor, boxShadow: '0 0 0 black' }}  type="password" name="confPassword"  />
                </FormControl>
                <Button
                  p={5}
                  bg={buttonColor}
                  color={buttonText}
                  _hover={{ bg: hoverColor, color: hoverText  }}
                  type='submit'
                >
              Submit
                </Button>
                <Button
                  p={5}
                  bg={buttonColor}
                  color={buttonText}
                  _hover={{ bg: hoverColor, color: hoverText  }}
                  onClick={toggleVisible}
                >
              Cancel
                </Button>

              </form>
            }
          </Center>

        </Center>
      </Flex>
    </Box>
  )
}

Account.propTypes = {
  login: PropTypes.object.isRequired
}

export default Account