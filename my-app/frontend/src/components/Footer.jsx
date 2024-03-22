import {
  Box,
  chakra,
  Container,
  Flex,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react'
import { PropTypes } from 'prop-types'
import { FaGithub, FaLinkedin } from 'react-icons/fa6'

const SocialButton = ({
  children,
  label,
  href,
}) => {
  const hoverColor = useColorModeValue('yellow.400', 'red.400')
  return (
    <chakra.button
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'color 0.3s ease'}
      _hover={{
        bg: !hoverColor,
        color: hoverColor
      }}>
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  )
}

const Footer = () =>  {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.800')}
      color={useColorModeValue('red.400', 'yellow.200')}
      mt={8}
      boxShadow={useColorModeValue('0em .01em .3em gray','0em .01em .3em black' )}
    >
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction='row'
        spacing={4}
        justify={{ base: 'space-between', md: 'space-between' }}
        align={'start'}>
        <Stack direction={'column'}>
          <Text
            color='brand.orange'
            fontWeight={900}
            size={'md'}
          > 2023 dermotbg</Text>
        </Stack>

        <Stack direction={'column'}>
          <Text
            color='brand.orange'
            fontWeight={900}
            size={'md'}
          >Jump To:</Text>
          <Text as={'a'} _hover={{ textDecoration: 'underline' }} href='/'>Home</Text>
          <Text as={'a'} _hover={{ textDecoration: 'underline' }} href='/leaderboards'>Leaderboards</Text>
        </Stack>

        <Stack direction={'column'} alignItems={'end'} spacing={1}>
          <Text
            color='brand.orange'
            fontWeight={900}
            as={'h6'}
            size={'md'}
          >Reach out:</Text>
          <Flex direction={'row'} alignItems={'center'} justifyContent={'end'}>
            <Text>Github</Text>
            <SocialButton label={'Github'} href={'https://www.github.com/dermotbg'}>
              <FaGithub />
            </SocialButton>
          </Flex>
          <Flex direction={'row'} alignItems={'center'} justifyContent={'end'}>
            <Text>LinkedIn</Text>
            <SocialButton label={'LinkedIn'} href={'https://www.linkedin.com/in/dermot-bateman-7139971a2'}>
              <FaLinkedin />
            </SocialButton>
          </Flex>
        </Stack>
      </Container>
    </Box>
  )
}

SocialButton.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired
}

export default Footer