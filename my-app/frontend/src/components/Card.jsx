import { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import './Card.css'
import { useDispatch, useSelector } from 'react-redux'
import { updateScore } from '../reducers/userReducer'
import { rateCard } from '../reducers/cardReducer'

import { Card as CardUI, CardBody, Heading, Text, Button, Input, FormLabel, Box, Center, Stack, Divider, Flex, useColorModeValue } from '@chakra-ui/react'
import { FaThumbsDown, FaThumbsUp, FaUndo } from 'react-icons/fa'
import functions from '../utilities/functions'

const Card = ({ card, active, colorDecoration }) => {

  const [correct, setCorrect] = useState('')
  const [answerChecked, setAnswerChecked] = useState(false)

  // const user = JSON.parse(window.localStorage.getItem('loggedInUser'))
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const correctColor = useColorModeValue('#1ec918', 'green.900')
  const inCorrectColor = useColorModeValue('#d13932', 'red.400')

  useEffect(() => {
    setAnswerChecked(false)
  },[card.bg])

  const checkAnswer = useCallback((event) => {
    event.preventDefault()
    console.log(card)
    const answer = card.bg.localeCompare(event.target.bg.value.trim(), 'bg', { sensitivity: 'base' })
    if(!answer){
      setCorrect(correctColor)
      const updatedUser = functions.addScore(user, card)
      dispatch(updateScore(updatedUser))
      setAnswerChecked(true)
    }

    else {setCorrect(inCorrectColor)}
    setTimeout(() => {
      setCorrect('')
    }, 300)
  }, [card, dispatch, user, inCorrectColor, correctColor])

  const showAnswer = () => {
    setAnswerChecked(true)
  }

  const undoRatingHandler = () => {
    const cardObj = { ...card }
    const index = card.ratedBy.findIndex(i => i.user === user.id)
    const rating = cardObj.ratedBy[index].rating
    cardObj.rating = rating === '+'
      ? card.rating - 1
      : card.rating + 1
    cardObj.ratedBy = card.ratedBy.filter((_, i) => i !== index) //reminder: 1st arg element, 2nd index.
    dispatch(rateCard(cardObj))
  }

  const ratingHandler = (rated) => {
    const cardObj = { ...card, user: user.id }
    const rating = rated === 'plus' ? '+' : '-'
    cardObj.rating = rating === '+'
      ? card.rating + 1
      : card.rating - 1
    cardObj.ratedBy = [...card.ratedBy, { user: user.id, rating: rating }]
    dispatch(rateCard(cardObj))
  }

  return(
    <Center style={active}>
      <form onSubmit={checkAnswer}>
        <CardUI
          className='answer'
          minW={'100%'}
          border={'solid 1px black'}
          boxShadow={'1px 1px .5em black'}
          bg={ correct }
          mb={6}
        >
          <Heading
            size='4xl'
            minW={'100%'}
            color={colorDecoration.primaryColor}
            sx={{ textShadow: colorDecoration.textShadowColor }}
          >
            {card.en}
          </Heading>
          <CardBody>
            <Stack dir='row' >
              <Text><em>In the context of {card.cat}</em></Text>
              <Divider borderColor={'black'}/>
              <Text pb={2} textAlign={'center'}>Card User Rating: {card.rating}</Text>
              {Array.isArray(card.ratedBy) && card.ratedBy.find(u  => u.user === user.id)
                ?
                <Flex dir='row' justifyContent={'center'}>
                  <Button
                    type='button'
                    color={'white'}
                    size='sm'
                    name='undo'
                    _hover={{
                      bg: colorDecoration.primaryColor,
                      color: colorDecoration.buttonColor
                    }}
                    onClick={() => undoRatingHandler()}
                  >
                    <FaUndo />
                  </Button>

                </Flex>
                :
                <Flex dir='row' justifyContent={'center'}>

                  <Button
                    mr={3}
                    _hover={{
                      bg: colorDecoration.primaryColor,
                      color: colorDecoration.buttonColor
                    }}
                    size='sm'
                    type='button'
                    name='plus'
                    onClick={() => ratingHandler('plus')}
                  >
                    <FaThumbsUp />
                  </Button>


                  <Button
                    _hover={{
                      bg: colorDecoration.primaryColor,
                      color: colorDecoration.buttonColor
                    }}
                    size='sm'
                    type='button'
                    name='minus'
                    onClick={() => ratingHandler('minus')}
                  >
                    <FaThumbsDown />
                  </Button>

                </Flex>
              }
              <Divider borderColor={'black'} />
              {answerChecked
                ?
                <Center>
                  <Heading
                    color={ correct === '#69de31' ? 'black' : colorDecoration.primaryColor}
                    sx={{ textShadow: correct === '#69de31' ? '' : colorDecoration.textShadowColor }}
                  > {card.en} / {card.bg}
                  </Heading>
                </Center>
                :
                <Box>
                  <Center className='answer-container'>
                    <FormLabel>Your Answer:</FormLabel>
                    <Input
                      _focus={{ borderColor: colorDecoration.buttonText, boxShadow: '0 0 0 black' }}
                      mb={2}
                      style={{ alignSelf: 'center' }}
                      width='100%'
                      size='md'
                      type="text"
                      name="bg"
                    />
                  </Center>
                  <Center>
                    <Flex justifyContent={'space-apart'}>
                      <Button
                        mr={3} _hover={{
                          bg: colorDecoration.primaryColor,
                          color: colorDecoration.buttonColor
                        }}
                        style={{ alignSelf: 'flex-end' }}
                        type="submit"
                      >
                          Check answer
                      </Button>
                      <Button
                        _hover={{
                          bg: colorDecoration.primaryColor,
                          color: colorDecoration.buttonColor
                        }}
                        onClick={showAnswer}
                      >
                      Show answer
                      </Button>
                    </Flex>
                  </Center>
                </Box>
              }
            </Stack>
          </CardBody>
        </CardUI>
      </form>
    </Center>
  )
}

Card.propTypes = {
  card: PropTypes.object.isRequired,
  active: PropTypes.object.isRequired,
  colorDecoration: PropTypes.object.isRequired
}

export default Card