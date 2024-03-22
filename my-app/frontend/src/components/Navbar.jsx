import {
  Box,
  Avatar as BlankAvatar,
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Stack,
  Link,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  Divider,
} from '@chakra-ui/react'
import Avatar from './Avatar'
import { logoutUser } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import { Link as RouterLink, useNavigate } from 'react-router-dom'

import { ChevronDownIcon, MoonIcon, SunIcon, HamburgerIcon } from '@chakra-ui/icons'


const NavBar = () => {
  const login = JSON.parse(window.localStorage.getItem('loggedInUser'))
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode()

  const menuColor = useColorModeValue('grey.100', 'gray.800')
  const menuTextColor  = useColorModeValue('red.400', 'yellow.400')

  const buttonColor = useColorModeValue('white', 'gray.800')
  const buttonText = useColorModeValue('red.400', 'yellow.400')

  const hoverColor = useColorModeValue('red.400', 'yellow.400')
  const hoverText = useColorModeValue('white', 'gray.800')

  const logoutHandler = () => {
    dispatch(logoutUser())
    navigate('/')
  }



  return (
    <>
      <Box color={useColorModeValue('white', 'gray.800')} boxShadow={useColorModeValue('0em .01em .3em gray','0em .01em .3em black' )}>
        <Flex h={20} alignItems={'center'} justifyContent={'space-between'}>
          {/* Mobile Menu */}
          <Flex
            display={{ base: 'flex', md: 'none' }}
          >
            <Button
              onClick={onOpen}
              ml={4}
              bg={buttonColor}
              color={buttonText}
              _hover={{ bg: hoverColor, color: hoverText  }}
            >
              <HamburgerIcon />
            </Button>
            <Drawer
              placement='left'
              onClose={onClose}
              isOpen={isOpen}
            >
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader as={'h1'}>
                  Navigation
                </DrawerHeader>
                <DrawerBody>
                  {login
                    ?
                    <Stack spacing={4}>
                      <Link as={RouterLink} onClick={onClose} color={menuTextColor} variant={'link'} to='/'><b>Home</b></Link>
                      <Divider />
                      <Text><b>Jump To Game:</b></Text>
                      <Link as={RouterLink} onClick={onClose} color={menuTextColor} variant={'link'} to='/Random10'><b>Random 10</b></Link>
                      <Link as={RouterLink} onClick={onClose} color={menuTextColor} variant={'link'} to='/match5'><b>Match 5</b></Link>
                      <Link as={RouterLink} onClick={onClose} color={menuTextColor} variant={'link'} to='/hangman'><b>Hangman</b></Link>
                      <Divider />
                      <Link as={RouterLink} onClick={onClose} color={menuTextColor} variant={'link'} to='/leaderboards'><b>Leaderboards</b></Link>
                      <Divider />
                      <Text><b>User Settings:</b></Text>
                      <Link as={RouterLink} onClick={onClose} color={menuTextColor} variant={'link'} to={`/user/${login.id}`}><b>Account Settings</b></Link>
                      <Link as={RouterLink} onClick={onClose} color={menuTextColor} variant={'link'} to={`/user/${login.id}/avatar`}><b>Avatar Settings</b></Link>
                    </Stack>
                    :
                    <Text> Please Log in</Text>
                  }
                </DrawerBody>
                <DrawerFooter borderTopWidth='1px'>
                  <Button
                    bg={buttonColor}
                    color={buttonText}
                    _hover={{ bg: hoverColor, color: hoverText  }}
                    variant='outline'
                    mr={3}
                    onClick={onClose}>
                    Cancel
                  </Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </Flex>
          {/* Desktop Links */}
          <Flex
            w={250}
            ml={10}
            direction={'row'}
            justifyContent={'space-between'}
            color='red.400'
            display={{ base: 'none', md: 'flex' }}
          >
            <Box >
              <Link as={RouterLink} color={menuTextColor} variant={'link'} to='/'><b>Home</b></Link>
            </Box>
            {login
              ?
              <Flex>
                <Box pl={5}>
                  <Menu>
                    <MenuButton
                      as={Button}
                      rightIcon={<ChevronDownIcon />}
                      variant={'link'}
                      cursor={'pointer'}
                      color={menuTextColor}
                      _active={{
                        color: 'red.300',
                      }}
                    >
                        Jump to Game
                    </MenuButton>
                    <MenuList
                      alignItems={'center'}
                      boxShadow={'1px 1px .5em black'}
                      color={menuTextColor}
                      p={0}
                    >
                      <MenuItem
                        as={RouterLink}
                        to='/random10'
                        p={3}
                        bg={menuColor}
                        borderTopRadius='inherit'
                        fontWeight='600'
                        _hover={{
                          fontWeight: '900'
                        }}
                        _focus={{
                          bg: menuColor,
                          color: menuTextColor,
                        }}
                      >
                        Random 10
                      </MenuItem>
                      <MenuDivider borderColor={'gray.600'} m={0} p={0}/>
                      <MenuItem
                        as={RouterLink}
                        to='/match5'
                        p={3}
                        bg={menuColor}
                        fontWeight='600'
                        _hover={{
                          fontWeight: '900'
                        }}
                        _focus={{
                          bg: menuColor,
                          color: menuTextColor,
                        }}
                      >
                        Match 5
                      </MenuItem>
                      <MenuDivider borderColor={'gray.600'} m={0} p={0}/>
                      <MenuItem
                        as={RouterLink}
                        to='/hangman'
                        p={3}
                        bg={menuColor}
                        borderBottomRadius='inherit'
                        fontWeight='600'
                        _hover={{
                          fontWeight: '900'
                        }}
                        _focus={{
                          bg: menuColor,
                          color: menuTextColor,
                        }}
                      >
                        Hangman
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Box>
                <Box pl={4}>
                  <Link
                    variant={'link'}
                    as={RouterLink}
                    color={menuTextColor}
                    fontWeight={'600'} to='/leaderboards'
                  >
                      Leaderboards
                  </Link>
                </Box>
                <Box pl={5}>
                  <Link
                    variant={'link'}
                    as={RouterLink}
                    color={menuTextColor}
                    fontWeight={'600'} to={`/user/${login.id}/avatar`}
                  >
                      Avatar
                  </Link>
                </Box>
              </Flex>
              : null
            }
          </Flex>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>

              <Menu>
                {login
                  ?
                  <Box pr={3}
                    display='flex'
                    dir='row'
                    alignItems={'center'}
                  >
                    <Button mr={5} onClick={toggleColorMode}>
                      {colorMode === 'light'
                        ?
                        <MoonIcon  />
                        :
                        <SunIcon />
                      }
                    </Button>
                    <MenuButton
                      as={Button}
                      variant={'link'}
                      cursor={'pointer'}
                      minW={0}
                      // color='red.400'
                      // bg={'yellow.200'}
                      _active={{
                        color: 'red.300',
                      }}
                    >
                      <Avatar
                        mr={'10'}
                        size={50}
                      />
                    </MenuButton>
                    <MenuList
                      alignItems={'center'}
                      boxShadow={'1px 1px .5em black'}
                      bg={menuColor}
                      color={menuTextColor}
                      p={0}
                      border={'1px solid'}
                      borderColor={'gray.600'}
                      borderRadius='0.305rem'
                      fontWeight={'600'}
                    >
                      <Center p={5} >
                        <Avatar
                          size={100}
                        />
                      </Center>
                      <Center >
                        <Text>Hey {login.username}!</Text>
                      </Center>
                      <Center pb={5}>
                        <Text>Current Score: {login.score}</Text>
                      </Center>
                      <MenuDivider borderColor={'gray.600'} m={0} p={0}/>
                      <MenuItem
                        as={RouterLink}
                        to={`/user/${login.id}`}
                        bg={menuColor}
                        color={menuTextColor}
                        fontWeight='600'
                        _hover={{
                          fontWeight: '900'
                        }}
                        _focus={{
                          bg: menuColor,
                          color: menuTextColor,
                        }}
                      >
                        Account Settings
                      </MenuItem>
                      <MenuItem
                        as={RouterLink}
                        to={`/user/${login.id}/avatar`}
                        bg={menuColor}
                        color={menuTextColor}
                        fontWeight='600'
                        _hover={{
                          fontWeight: '900'
                        }}
                        _focus={{
                          bg: menuColor,
                          color: menuTextColor,
                        }}
                      >
                        Avatar Settings
                      </MenuItem>
                      <MenuDivider borderColor={'gray.600'} m={0} p={0}/>
                      <MenuItem
                        onClick={logoutHandler}
                        pb={2}
                        bg={menuColor}
                        color={menuTextColor}
                        borderBottomRadius='inherit'
                        fontWeight='600'
                        _hover={{
                          fontWeight: '900'
                        }}
                        _focus={{
                          bg: menuColor,
                          color: menuTextColor,
                        }}
                      >
                        Logout
                      </MenuItem>
                    </MenuList>
                  </Box>
                  :
                  <Flex dir='row'>
                    <Center>
                      <Button mr={5} onClick={toggleColorMode}>
                        {colorMode === 'light'
                          ?
                          <MoonIcon  />
                          :
                          <SunIcon />
                        }
                      </Button>
                      <BlankAvatar
                        mr={'10'}
                        size={'sm'}
                        src={'https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg'}
                      />
                    </Center>
                  </Flex>
                }
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}

export default NavBar