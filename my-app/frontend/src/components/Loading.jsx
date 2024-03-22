import { Center, Spinner } from '@chakra-ui/react'

const Loading = () => {
  return(
    <Center>
      <Spinner
        mt={10}
        mb={10}
        minWidth={'40vw'}
        minHeight={'40vw'}
        color={'brand.mainBlue'}
      />
    </Center>
  )
}

export default Loading