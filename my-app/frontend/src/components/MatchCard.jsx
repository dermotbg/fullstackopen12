import { Box, Button, Flex } from '@chakra-ui/react'
import { PropTypes } from 'prop-types'
import { FaCheckCircle, FaRegTimesCircle } from 'react-icons/fa'

const MatchCard = ({ card, en, matchHandler, disabled, matched, isIncorrect, colorDecoration }) => {

  return(
    <Box >
      <Box mt={8} mb={8} >
        {en
          ?
          <Flex
            key={`${card.en}-en`}
            justifyContent={'end'}
          >
            {disabled
              ?
              matched
                ? <FaCheckCircle size={40} color={'green'}/>
                // : <Button bg={'white'} color={'brand.lightBlue'} isDisabled>{card.en}</Button>
                : <Button
                  _disabled={{
                    textDecoration: 'line-through',
                    fontWeight: 100,
                    bg: colorDecoration.buttonColor,
                    color: colorDecoration.buttonText,
                    cursor: 'not-allowed',
                    _hover: {
                      bg: 'none'
                    }
                  }}
                  isDisabled
                >
                  {card.en}
                </Button>
              :
              isIncorrect
                ? <FaRegTimesCircle size={40} color={'red'} />
                :
                <Button
                  id={`${card.en}-en`}
                  name={'en'}
                  value={card.en}
                  isDisabled={disabled}
                  onClick={(event) => matchHandler(card, event)}
                  bg={colorDecoration.buttonColor}
                  color={colorDecoration.buttonText}
                  _hover={{
                    bg: colorDecoration.hoverColor,
                    color: colorDecoration.hoverText
                  }}
                >
                  {card.en}
                </Button>
            }
          </Flex>
          :
          <Flex
            key={`${card.bg}-bg`}
          >
            {disabled
              ?
              matched
                ? <FaCheckCircle size={40} color={'green'}/>
                : isIncorrect
                  ? <FaRegTimesCircle size={40} color={'red'} />
                  : <Button
                    _disabled={{
                      textDecoration: 'line-through',
                      fontWeight: 100,
                      bg: colorDecoration.buttonColor,
                      color: colorDecoration.buttonText,
                      cursor: 'not-allowed',
                      _hover: {
                        bg: 'none'
                      }
                    }}
                    isDisabled
                  >
                    {card.bg}
                  </Button>
              :
              <Button
                id={`${card.bg}-bg`}
                name={'bg'}
                value={card.bg}
                isDisabled={disabled}
                onClick={(event) => matchHandler(card, event)}
                bg={colorDecoration.buttonColor}
                color={colorDecoration.buttonText}
                _hover={{
                  bg: colorDecoration.hoverColor,
                  color: colorDecoration.hoverText
                }}
              >
                {card.bg}
              </Button>
            }
          </Flex>
        }
      </Box>
    </Box>
  )
}

MatchCard.propTypes = {
  card: PropTypes.object.isRequired,
  matchHandler: PropTypes.func.isRequired,
  en: PropTypes.bool, //this is just to print it in the right hand div
  disabled: PropTypes.bool,
  matched: PropTypes.bool,
  isIncorrect: PropTypes.bool,
  colorDecoration: PropTypes.object.isRequired,
}

export default MatchCard