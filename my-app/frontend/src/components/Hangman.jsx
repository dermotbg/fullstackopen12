import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import functions from '../utilities/functions'
import { useDispatch, useSelector } from 'react-redux'
import { setGuessed, setHangmanWord } from '../reducers/hangmanReducer'
// import hangman1 from '../assets/hangman_images/hangman_1.png'
// import hangman2 from '../assets/hangman_images/hangman_2.png'
// import hangman3 from '../assets/hangman_images/hangman_3.png'
// import hangman4 from '../assets/hangman_images/hangman_4.png'
// import hangman5 from '../assets/hangman_images/hangman_5.png'
// import hangman6 from '../assets/hangman_images/hangman_6.png'
// import hangman7 from '../assets/hangman_images/hangman_7.png'
// import hangman8 from '../assets/hangman_images/hangman_8.png'
import { updateScore } from '../reducers/userReducer'

import { Box, Button, Flex, Heading, Image, useColorModeValue } from '@chakra-ui/react'
import Loading from './Loading'

const keyboardStyle = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center',
  // border: 'solid red',
  width: '69%'
}
const centerFlex = {
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  alignItems: 'center'
}




const Hangman = ({ cards }) => {
  const mainCard = useSelector(state => state.hangman.card)
  const guessed = useSelector(state => state.hangman.guessed)
  const user = useSelector((state) => state.user) //need user for addScore func
  const dispatch = useDispatch()
  const keyboardRows = [
    ['Я','В','Е','Р','Т','Ъ','У','И','О','П','Ш','Щ'],
    ['А','С','Д','Ф','Г','Х','Й','К','Л','Ю'],
    ['Ч','З','Ь','Ц','Ж','Б','Н','М']
  ]
  const hangman1 = 'https://s3.eu-north-1.amazonaws.com/flsh.buck/assets/hangman_images/hangman_1.png'
  const hangman2 = 'https://s3.eu-north-1.amazonaws.com/flsh.buck/assets/hangman_images/hangman_2.png'
  const hangman3 = 'https://s3.eu-north-1.amazonaws.com/flsh.buck/assets/hangman_images/hangman_3.png'
  const hangman4 = 'https://s3.eu-north-1.amazonaws.com/flsh.buck/assets/hangman_images/hangman_4.png'
  const hangman5 = 'https://s3.eu-north-1.amazonaws.com/flsh.buck/assets/hangman_images/hangman_5.png'
  const hangman6 = 'https://s3.eu-north-1.amazonaws.com/flsh.buck/assets/hangman_images/hangman_6.png'
  const hangman7 = 'https://s3.eu-north-1.amazonaws.com/flsh.buck/assets/hangman_images/hangman_7.png'
  const hangman8 = 'https://s3.eu-north-1.amazonaws.com/flsh.buck/assets/hangman_images/hangman_8.png'
  const images = [hangman1, hangman2, hangman3, hangman4, hangman5, hangman6, hangman7, hangman8]
  const [img, setImg] = useState(images[0])

  const buttonColor = useColorModeValue('white', 'gray.800')
  const buttonText = useColorModeValue('red.400', 'yellow.400')

  const hoverColor = useColorModeValue('red.400', 'yellow.400')
  const hoverText = useColorModeValue('white', 'gray.800')

  useEffect(() => {
    const cardDealt = functions.getRandomCards(cards.all, 1)
    dispatch(setHangmanWord(cardDealt[0]))
  },[dispatch, cards])

  useEffect(() => {
    if(mainCard && mainCard.bg){
      const wordArray = mainCard.bg.split('')
      console.log(wordArray)
      let guessedArray = []
      for (let char of wordArray){
        if (char === ' '){
          guessedArray.push('\xa0'.repeat(5)) //blank space between words
        }
        else{
          guessedArray.push('_')
        }
      }
      dispatch(setGuessed(guessedArray))
    }
  },[dispatch, mainCard])

  const guessHandler = (event) => {
    event.target.disabled = true
    const wordArray = mainCard.bg.toUpperCase().split('')
    if(wordArray.indexOf(event.target.value) === -1){
      setImg(images[images.indexOf(img) + 1])
      //load hangman image
    }
    const indices = []
    let index = wordArray.indexOf(event.target.value)
    while (index !== -1){
      indices.push(index)
      index = wordArray.indexOf(event.target.value, index + 1)
    }
    const updatedGuessed = [...guessed]
    for (let i of indices){
      updatedGuessed[i] = event.target.value
    }
    dispatch(setGuessed(updatedGuessed))
    // win state / add points
    if (!updatedGuessed.includes('_')){
      // calc players new score
      let updatedUser = functions.addScore(user, mainCard, true) //truthy val is hangman exception
      dispatch(updateScore(updatedUser))
    }
  }

  //handle game over reset
  const resetHandler = () => {
    const cardDealt = functions.getRandomCards(cards.all, 1)
    dispatch(setHangmanWord(cardDealt[0]))
    setImg(images[0])
  }

  if(!mainCard && guessed.length === 0) return <Loading/>
  // lose condition
  if(img === hangman8) return (
    <Flex style={centerFlex}>
      <Image src={img} maxH={{ base: '80%', md: '50%' }} maxW={{ base: '80%', md: '40%' }} alt="hangman-image" />
      <Button
        m={8}
        bg={buttonColor}
        color={buttonText}
        _hover={{ bg: hoverColor, color: hoverText  }}
        onClick={resetHandler}
      >
        Oops! Try again
      </Button>
    </Flex>
  )
  // win condition
  if (!guessed.includes('_')) return (
    <Box style={centerFlex}>
      <Image src={hangman1} maxH={{ base: '80%', md: '50%' }} maxW={{ base: '80%', md: '40%' }} alt="hangman-image" />
      <Button
        m={8}
        bg={buttonColor}
        color={buttonText}
        _hover={{ bg: hoverColor, color: hoverText  }}
        onClick={resetHandler}
      >
        Congrats! Start Again?
      </Button>
      <Heading as={'h1'}>{mainCard.en} / {mainCard.bg}</Heading>
    </Box>)

  return(
    <Box style={centerFlex} >
      <Image src={img} maxH={{ base: '80%', md: '50%' }} maxW={{ base: '80%', md: '40%' }} alt="hangman-image" />
      <Box style={centerFlex}>
        <Heading as={'h1'}>{mainCard.en}</Heading>
        <Heading as={'h2'} className='hangman-font' pb={8}>{guessed.map(c => {
          return c !== '_'
            ? c
            :` ${c}   `
        }
        )}</Heading>
      </Box>
      <Box style={keyboardStyle} maxWidth={'580'}>
        {keyboardRows.map((row, rowIndex) => (
          <Flex maxW={'100vw'} key={rowIndex}>
            {row.map((c) => {
              return <Button
                size={{ base: 'xs', sm: 'md' }}
                border='1px'
                borderColor='black.500'
                color={buttonText}
                p={0}
                margin='1px'
                onClick={guessHandler}
                key={c}
                value={c}
                disabled={false}
              >
                {c}
              </Button>
            })}
          </Flex>
        ))}
      </Box>
    </Box>
  )
}

Hangman.propTypes = {
  cards: PropTypes.object.isRequired,
}

export default Hangman