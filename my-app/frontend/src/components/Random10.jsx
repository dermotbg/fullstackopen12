import { setSelected } from '../reducers/cardReducer'
import { useDispatch } from 'react-redux'
import { PropTypes } from 'prop-types'
import functions from '../utilities/functions'

import { Box, Center, Button, useColorModeValue } from '@chakra-ui/react'
import Carousel from './Carousel'
import Loading from './Loading'
import InactiveScreen from './InactiveScreen'
import { useState } from 'react'

const Random10 = ({ cards }) => {

  const [gameActive, setGameActive] = useState(false)

  const dispatch = useDispatch()

  const colorDecoration = {
    buttonColor: useColorModeValue('white', 'gray.800'),
    buttonText: useColorModeValue('red.400', 'yellow.400'),
    hoverColor: useColorModeValue('red.400', 'yellow.400'),
    hoverText: useColorModeValue('white', 'gray.800'),
    primaryColor: useColorModeValue('red.400', 'yellow.400'),
    textShadowColor: useColorModeValue('1px 1px 1px brown', '1px 1px 3px black'),
    boxShad: useColorModeValue('1px 1px .5em black','3px 3px .2em 1px black')
  }

  const triggerStart = () => {
    setGameActive(true)
    dispatch(setSelected(functions.getRandomCards([...cards.all], 10)))
  }

  return(
    <Box flex={1}>
      {cards.all[0]
        ?
        <InactiveScreen startHandler={triggerStart} gameActive={gameActive} mainText={'Are you ready?'} buttonText={'Start!'}/>
        :
        <Loading />
      }
      {gameActive
        ?
        <Center>
          <Button
            mt={10}
            mb={10}
            minWidth={'10vw'}
            borderRadius={'full'}
            bg={colorDecoration.buttonColor}
            color={colorDecoration.buttonText}
            border={'solid 1px black'}
            boxShadow={colorDecoration.boxShad}
            _hover={{
              bg: colorDecoration.primaryColor,
              color: colorDecoration.buttonColor
            }}
            onClick={() => triggerStart()} >Reset Cards!
          </Button>
        </Center>
        : null
      }
      <Box>
        <Carousel cards={cards.selected} gameActive={gameActive} colorDecoration={colorDecoration} />
      </Box>
    </Box>
  )
}

Random10.propTypes = {
  cards: PropTypes.object.isRequired
}

export default Random10