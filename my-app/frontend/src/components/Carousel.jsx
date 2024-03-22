import { Box, IconButton, useBreakpointValue } from '@chakra-ui/react'
import { useState } from 'react'
import { PropTypes } from 'prop-types'
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi'
// And react-slick as our Carousel Lib
import Slider from 'react-slick'
import Card from './Card'


const Carousel = ({ cards, gameActive, colorDecoration }) => {
  // As we have used custom buttons, we need a reference variable to
  // change the state
  const [slider, setSlider] = useState(null)
  const [activeIndex, setActiveIndex] = useState(0)

  // Settings for the slider
  const settings = {
    dots: true,
    infinite: true,
    autoplay: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current, next) => {
      setActiveIndex(next)
    }
  }


  // These are the breakpoints which changes the position of the
  // buttons as the screen size changes
  const top = useBreakpointValue({ base: '80%', md: '50%' })
  const side = useBreakpointValue({ base: '30%', md: '10px' })

  if(!gameActive) return null

  return (
    <Box position={'relative'} height={'80vh'} width={'full'} overflow={'hidden'}>
      {/* CSS files for react-slick */}
      <Box display={'none'}>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
      </Box>
      {/* Left Icon */}
      <IconButton
        aria-label="left-arrow"
        bg={colorDecoration.buttonColor}
        color={colorDecoration.buttonText}
        _hover={{ bg: colorDecoration.hoverColor, color: colorDecoration.hoverText }}
        borderRadius="full"
        position="absolute"
        left={side}
        top={top}
        transform={'translate(0%, -50%)'}
        zIndex={2}
        onClick={() => slider?.slickPrev()}>
        <BiLeftArrowAlt />
      </IconButton>
      {/* Right Icon */}
      <IconButton
        aria-label="right-arrow"
        bg={colorDecoration.buttonColor}
        color={colorDecoration.buttonText}
        _hover={{ bg: colorDecoration.hoverColor, color: colorDecoration.hoverText }}
        borderRadius="full"
        position="absolute"
        right={side}
        top={top}
        transform={'translate(0%, -50%)'}
        zIndex={2}
        onClick={() => slider?.slickNext()}>
        <BiRightArrowAlt />
      </IconButton>
      {/* Slider */}
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {cards.map((c, index) => (
          <Card
            key={c.id}
            card={c}
            active={{ display: index === activeIndex ? 'flex' : 'none' }}
            colorDecoration={colorDecoration}
          />
        ))}
      </Slider>
    </Box>
  )
}

Carousel.propTypes = {
  cards: PropTypes.array.isRequired,
  gameActive: PropTypes.bool.isRequired,
  colorDecoration: PropTypes.object.isRequired
}

export default Carousel