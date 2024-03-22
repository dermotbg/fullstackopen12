import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Center,
  Flex,
  Heading,
  Image,
  Text,
  Stack,
  Box,
  useColorModeValue,
} from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { Link as RouterLink } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import LoginPage from './LoginPage'


const Home = ({ login }) => {

  const headingColor = useColorModeValue('red.400', 'yellow.400')
  const buttonColor = useColorModeValue('white', 'gray.800')
  const buttonText = useColorModeValue('red.400', 'yellow.400')

  const hoverColor = useColorModeValue('red.400', 'yellow.400')
  const hoverText = useColorModeValue('white', 'gray.800')

  const textShadowColor = useColorModeValue('1px 1px 1px gray', '1px 1px 3px black')

  const boxShad = useColorModeValue('1px 1px .5em black','3px 3px .2em 1px black') // yellow: #ecc94b80

  const hangman = 'https://s3.eu-north-1.amazonaws.com/flsh.buck/assets/hangman_images/hangman_1.png'
  const flashcardPic = 'https://s3.eu-north-1.amazonaws.com/flsh.buck/assets/misc_images/flashcard1.png'
  const match5Pic = 'https://s3.eu-north-1.amazonaws.com/flsh.buck/assets/misc_images/match5.png'


  if(!login) return <LoginPage buttonColor={buttonColor} buttonText={buttonText} hoverColor={hoverColor} hoverText={hoverText} />

  return(
    <Center flex={1}>
      <Stack alignItems={'center'}>
        <Box flexDirection={'column'} alignSelf={'start'} p={10}>
          <Heading
            as={'h1'}
            size={'2xl'}
            pb={5}
            sx={{ textShadow: textShadowColor }}
          >
              Welcome to your flashcards
          </Heading>
          <Heading
            as={'h1'}
            size={'2xl'}
            pb={10}
            color={headingColor}
            sx={{ textShadow: textShadowColor }}
          >
            {login.username}
          </Heading>
          <Heading
            as={'h2'}
            size={'md'}
            fontWeight={'400'}
          >
            Below you can choose which game you want to practice with.
          </Heading>
        </Box>
        <Flex
          wrap={'wrap'}
          maxWidth={'75%'}
          justifyContent={'center'}
          flexDirection={{ base: 'column', md: 'row' }}
        >
          <Card
            margin={'5px'}
            variant={'outline'}
            border={'1px solid black'}
            boxShadow={boxShad}
            size={{ base: 'sm', md: 'md' }}
          >
            <CardHeader>
              <Flex
                flexDirection={'row'}
                alignItems={'center'}
                justifyContent={'space-between'}
                m={4}
              >
                <Heading
                  size='lg'
                  color={headingColor}
                  sx={{ textShadow: textShadowColor }}
                >
                  Random 10
                </Heading>
                <Image
                  boxSize={'100px'}
                  borderRadius={'full'}
                  src={flashcardPic}
                />
              </Flex>
            </CardHeader>
            <CardBody>
              <Text>Generate 10 random Flashcards to play with</Text>
            </CardBody>
            <CardFooter>
              <Button
                rightIcon={<ArrowForwardIcon />}
                as={RouterLink}
                to={'/random10'}
                bg={buttonColor}
                color={buttonText}
                _hover={{ bg: hoverColor, color: hoverText  }}
              >
              Take me there!</Button>
            </CardFooter>
          </Card>
          <Card
            variant={'outline'}
            margin={'5px'}
            border={'1px solid black'}
            boxShadow={boxShad}
            size={{ base: 'sm', md: 'md' }}
          >
            <CardHeader>
              <Flex
                flexDirection={'row'}
                alignItems={'center'}
                justifyContent={'space-between'}
                m={4}
              >
                <Heading
                  size='lg'
                  color={headingColor}
                  sx={{ textShadow: textShadowColor }}
                >
                Match 5
                </Heading>
                <Image
                  boxSize={'100px'}
                  borderRadius={'full'}
                  src={match5Pic}
                />
              </Flex>
            </CardHeader>
            <CardBody>
              <Text >Match the words with their translations</Text>
            </CardBody>
            <CardFooter>
              <Button
                rightIcon={<ArrowForwardIcon />}
                as={RouterLink}
                to={'/match5'}
                bg={buttonColor}
                color={buttonText}
                _hover={{ bg: hoverColor, color: hoverText  }}
              >
                Take me there!
              </Button>
            </CardFooter>
          </Card>
          <Card
            variant={'outline'}
            margin={'5px'}
            border={'1px solid black'}
            boxShadow={boxShad}
            size={{ base: 'sm', md: 'md' }}
          >
            <CardHeader>
              <Flex
                flexDirection={'row'}
                alignItems={'center'}
                justifyContent={'space-between'}
              >
                <Heading
                  size='lg'
                  color={headingColor}
                  sx={{ textShadow: textShadowColor }}
                >
                Hangman
                </Heading>
                <Image
                  boxSize={'100px'}
                  src={hangman}
                />
              </Flex>
            </CardHeader>
            <CardBody>
              <Text>Guess the word before it&apos;s too late!</Text>
            </CardBody>
            <CardFooter>
              <Button
                rightIcon={<ArrowForwardIcon />}
                as={RouterLink}
                to={'/hangman'}
                bg={buttonColor}
                color={buttonText}
                _hover={{ bg: hoverColor, color: hoverText  }}
              >
                Take me there!
              </Button>
            </CardFooter>
          </Card>
        </Flex>
      </Stack>
    </Center>
  )
}
export default Home

Home.propTypes = {
  login: PropTypes.object
}