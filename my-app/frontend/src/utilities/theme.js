import { extendTheme } from '@chakra-ui/react'

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}


const theme = extendTheme({
  config,
  colors: {
    black: '#001f2b',
    orange: {
      300: '#B84900',
      200: '#F56300',
      100: '#FF9147'
    },
    red: {
      400: '#6A1511',
      300: '#A8201A',
      200: '#D42A21',
      100: '#E3564F'
    },
    yellow:{
      400: '#ECC94B',
      300: '#F1A204',
      200: '#FCBF49',
      100: '#FDC85E'
    },
    grey:{
      400: '#93A8AC',
      300: '#BAC7CA',
      200: '#E8ECED',
      100: '#F4F6F6'
    }
  } })

export default theme