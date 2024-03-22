import { Box,
  Button,
  Center,
  Flex,
  Image,
  Radio,
  RadioGroup,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import { useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { createAvatar } from '@dicebear/core'
import { croodles as style } from '@dicebear/collection'
import { useDispatch, useSelector } from 'react-redux'
import { getAvatar, saveAvatar, setSomething } from '../reducers/avatarReducer'
import { HexColorPicker } from 'react-colorful'


const Avatar = ({ size }) => {

  const avatar = useSelector(state => state.avatar)
  const user = useSelector(state => state.user)

  const dispatch = useDispatch()

  const buttonColor = useColorModeValue('white', 'gray.800')
  const buttonText = useColorModeValue('red.400', 'yellow.400')
  const hoverColor = useColorModeValue('red.400', 'yellow.400')
  const hoverText = useColorModeValue('white', 'gray.800')
  const radioColor = useColorModeValue('red', 'yellow')

  const [visible, setVisible] = useState(false)

  const hiddenWhileTrue = { display: visible ? 'none' : '' }
  const shownWhileTrue = { display: visible ? '' : 'none' }

  const toggleVisible = () => {
    setVisible(!visible)
  }

  // define array of all availble variants of possible choices. Can be sliced later for limiting.
  const variants = Array.from({ length: 30 }, (_element, index) => `variant${String(index).padStart(2, '0')}`)


  const newAvatar = useMemo(() => {
    return createAvatar(style, {
      size: size ? size : 128,
      flip: avatar.flip,
      face: avatar.face,
      translateX: avatar.xAxis,
      translateY: avatar.yAxis,
      beard: avatar.beard,
      beardProbability:100,
      eyes: avatar.eyes,
      mouth: avatar.mouth,
      mustache: avatar.mustache,
      mustacheProbability: 100,
      nose: avatar.nose,
      top: avatar.top,
      topColor: avatar.topColor,
      backgroundColor: avatar.backgroundColor
    }).toDataUriSync()
  }, [avatar, size])


  const changeHandler = (event) => {
    const key = event.target.name
    // route for boolean values
    if (key === 'flip'){
      const value = !avatar.flip
      dispatch(setSomething({ [key]: value }))
      return
    }
    // route for integer values
    if (key === 'xAxis' || key === 'yAxis'){
      const value = event.target.value
      dispatch(setSomething({ [key]: value }))
      return
    }
    //remaining array values
    const value = [event.target.value]
    dispatch(setSomething({ [key]: value }))
  }

  const submitHandler = () => {
    // send newAvatar to db
    const avatarObj = {
      flip: avatar.flip,
      face: avatar.face,
      translateX: avatar.xAxis,
      translateY: avatar.yAxis,
      beard: avatar.beard,
      beardProbability: 100,
      eyes: avatar.eyes,
      mouth: avatar.mouth,
      mustache: avatar.mustache,
      mustacheProbability: 100,
      nose: avatar.nose,
      top: avatar.top,
      topColor: avatar.topColor,
      backgroundColor: avatar.backgroundColor,
      user: user.id
    }
    dispatch(saveAvatar(avatarObj))
    toggleVisible()
  }

  const cancelHandler = () => {
    dispatch(getAvatar(user.avatar))
    toggleVisible()
  }

  const topColorHandler = (event) => {
    const hex = [event.replace('#','')]
    dispatch(setSomething({ topColor: hex }))
  }

  const bgColorHandler = (event) => {
    const hex = [event.replace('#','')]
    dispatch(setSomething({ backgroundColor: hex }))
  }

  if (!avatar.face) return null
  return(
    <Stack alignItems={'center'}>
      {avatar.face[0] !== ''
        ? <Image src={newAvatar} alt='Avatar' borderRadius={'full'} />
        : <Image src={'https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg'} alt='Avatar' maxW={'40px'} borderRadius={'full'} />
      }
      {size ? null :
        <Flex id='avatar-container' flexDirection='row' flexWrap='wrap' >
          <Box>
            <Button
              onClick={toggleVisible}
              style={hiddenWhileTrue}
              bg={buttonColor}
              color={buttonText}
              _hover={{ bg: hoverColor, color: hoverText }}
            >
          Get Started
            </Button>
            <Stack id='edit-container' alignItems={'center'} style={shownWhileTrue}>
              <Tabs alignItems={'center'} maxW={{ base: '100%', md: '73%' }} >
                <TabList flexWrap={'wrap'} p={3}>
                  <Tab _selected={{ borderColor: buttonText }}>
                    Face
                  </Tab>
                  <Tab _selected={{ borderColor: buttonText }}>
                    Eyes
                  </Tab>
                  <Tab _selected={{ borderColor: buttonText }}>
                    Nose
                  </Tab>
                  <Tab _selected={{ borderColor: buttonText }}>
                    Mouth
                  </Tab>
                  <Tab _selected={{ borderColor: buttonText }}>
                    Top
                  </Tab>
                  <Tab _selected={{ borderColor: buttonText }}>
                    Beard
                  </Tab>
                  <Tab _selected={{ borderColor: buttonText }}>
                    Moustache
                  </Tab>
                  <Tab _selected={{ borderColor: buttonText }}>
                    Background Color
                  </Tab>
                  <Tab _selected={{ borderColor: buttonText }}>
                    Flip
                  </Tab>
                  <Tab  _selected={{ borderColor: buttonText }}>
                    Axis
                  </Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <RadioGroup>
                      <Flex flexDirection={'row'} justifyContent={'space-evenly'} wrap={'wrap'}>
                        {variants.slice(1, 9).map((face, index) => (
                          <Box key={face}>
                            <Radio
                              id={`face-${face}`}
                              name='face'
                              value={face}
                              onChange={changeHandler}
                              colorScheme={radioColor}
                            >
                              {`#${index+1}`}
                            </Radio>
                          </Box>
                        )
                        )}
                      </Flex>
                    </RadioGroup>
                  </TabPanel>
                  <TabPanel>
                    <RadioGroup>
                      <Flex flexDirection={'row'} justifyContent={'space-evenly'} wrap={'wrap'}>
                        {variants.slice(1, 17).map((e, index) => (
                          <Box key={e} pr={3}>
                            <Radio
                              id={`eyes-${e}`}
                              name='eyes'
                              value={e}
                              colorScheme={radioColor}
                              onChange={changeHandler}
                            >
                              {`#${index+1}`}
                            </Radio>
                          </Box>
                        )
                        )}
                      </Flex>
                    </RadioGroup>
                  </TabPanel>
                  <TabPanel>
                    <RadioGroup>
                      <Flex flexDirection={'row'} justifyContent={'space-evenly'} wrap={'wrap'}>
                        {variants.slice(1, 10).map((nose, index) => (
                          <Box key={nose} pr={3}>
                            <Radio
                              id={`nose-${nose}`}
                              name='nose'
                              value={nose}
                              onChange={changeHandler}
                              colorScheme={radioColor}
                            >
                              {`#${index+1}`}
                            </Radio>
                          </Box>
                        )
                        )}
                      </Flex>
                    </RadioGroup>
                  </TabPanel>
                  <TabPanel>
                    <RadioGroup>
                      <Flex flexDirection={'row'} justifyContent={'space-evenly'} wrap={'wrap'}>
                        {variants.slice(1, 19).map((mouth, index) => (
                          <Box key={mouth} pr={3}>
                            <Radio
                              id={`mouth-${mouth}`}
                              name='mouth'
                              value={mouth}
                              onChange={changeHandler}
                              colorScheme={radioColor}
                            >
                              {`#${index+1}`}
                            </Radio>
                          </Box>
                        )
                        )}
                      </Flex>
                    </RadioGroup>
                  </TabPanel>
                  <TabPanel>
                    <RadioGroup>
                      <Stack alignItems={'center'}>
                        <Box>
                          <HexColorPicker onChange={topColorHandler}/>
                        </Box>
                        <Flex flexDirection={'row'} justifyContent={'start'} alignItems={'start'} wrap={'wrap'}>
                          {variants.slice(1, 30).map((top, index) => (
                            <Box key={top} pr={3} >
                              <Radio
                                id={`top-${top}`}
                                name='top'
                                value={top}
                                onChange={changeHandler}
                                colorScheme={radioColor}
                              >
                                {`#${index+1}`}
                              </Radio>
                            </Box>
                          )
                          )}
                        </Flex>
                      </Stack>
                    </RadioGroup>
                  </TabPanel>
                  <TabPanel>
                    <RadioGroup>
                      <Flex flexDirection={'row'} justifyContent={'space-evenly'} wrap={'wrap'}>
                        <Radio
                          id={'no-beard'}
                          name='beard'
                          value={''}
                          onChange={changeHandler}
                          colorScheme={radioColor}
                        >
                          {'None'}
                        </Radio>
                        {variants.slice(1, 6).map((beard, index) => (
                          <Stack key={beard}>
                            <Radio
                              id={`beard-${beard}`}
                              name='beard'
                              value={beard}
                              onChange={changeHandler}
                              colorScheme={radioColor}
                            >
                              {`#${index+1}`}
                            </Radio>
                          </Stack>
                        )
                        )}
                      </Flex>
                    </RadioGroup>
                  </TabPanel>
                  <TabPanel>
                    <RadioGroup>
                      <Flex flexDirection={'row'} alignItems={'start'} justifyContent={'space-evenly'} wrap={'wrap'}>
                        <Radio
                          id={'no-mustache'}
                          name='mustache'
                          value={''}
                          onChange={changeHandler}
                          colorScheme={radioColor}
                        >
                          {'None'}
                        </Radio>
                        {variants.slice(1, 5).map((mustache, index) => (
                          <Stack key={mustache}>
                            <Radio
                              id={`mustache-${mustache}`}
                              name='mustache'
                              value={mustache}
                              onChange={changeHandler}
                              colorScheme={radioColor}
                            >
                              {`#${index+1}`}
                            </Radio>
                          </Stack>
                        )
                        )}
                      </Flex>
                    </RadioGroup>
                  </TabPanel>
                  {/* BG color goes in here */}
                  <TabPanel>
                    <Center>
                      <HexColorPicker onChange={bgColorHandler}/>
                    </Center>
                  </TabPanel>
                  <TabPanel>
                    <Flex flexDirection={'row'} justifyContent={'space-evenly'} wrap={'wrap'}>
                      <Button
                        id='flip'
                        name='flip'
                        value={true}
                        onClick={changeHandler}
                        bg={buttonColor}
                        color={buttonText}
                        _hover={{ bg: hoverColor, color: hoverText }}
                      >
                      Flip
                      </Button>
                    </Flex>
                  </TabPanel>
                  <TabPanel>
                    <Flex flexDirection={'row'} justifyContent={'space-evenly'} wrap={'wrap'}>
                      <Stack>
                        <Text>X axis</Text>
                        <input type="range" name='xAxis' min={-50} max={50} defaultValue={0} onMouseUp={changeHandler} />
                        <Text>Y axis</Text>
                        <input type="range" name='yAxis' min={-50} max={50} defaultValue={0} onMouseUp={changeHandler} />
                      </Stack>
                    </Flex>
                  </TabPanel>
                </TabPanels>
              </Tabs>
              <Flex>
                <Button
                  onClick={submitHandler}
                  mx={3}
                  bg={buttonColor}
                  color={buttonText}
                  _hover={{ bg: hoverColor, color: hoverText }}
                >
                  Save
                </Button>
                <Button
                  onClick={cancelHandler}
                  mx={3}
                  bg={buttonColor}
                  color={buttonText}
                  _hover={{ bg: hoverColor, color: hoverText }}
                >
                  Cancel
                </Button>
              </Flex>
            </Stack>
          </Box>
        </Flex>
      }
    </Stack>
  )
}

Avatar.propTypes = {
  size: PropTypes.number
}

export default Avatar