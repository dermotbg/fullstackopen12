import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Center,
  Image,
  Select,
  Stack,
  Box,
} from '@chakra-ui/react'

import { createAvatar } from '@dicebear/core'
import { croodles as style } from '@dicebear/collection'

import { useEffect } from 'react'
import Loading from './Loading'
import { useDispatch, useSelector } from 'react-redux'
import { getAllAvatars, getAllUsers, sortUsers } from '../reducers/leaderboardReducer'
import functions from '../utilities/functions'


const Leaderboards = () => {

  const users = useSelector((state) => state.leaderboard.users)
  const avatars = useSelector((state) => state.leaderboard.avatars)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllUsers())
    dispatch(getAllAvatars())
    setTimeout(() => {
      dispatch(sortUsers('score'))
    },600)
  },[dispatch])

  const sortHandler = (event) => {
    dispatch(sortUsers(event.target.value))
  }

  if(!users[0] || !avatars[0]?.face[0]) return <Loading />

  return(
    <Center>
      <Stack  alignItems={'center'}>
        <Select mt={3} defaultValue={'default'} onChange={(e) => sortHandler(e)} maxW={'40%'} alignSelf={'center'}>
          <option hidden disabled value={'default'} >Sort By:</option>
          <option value={'score'}>Score</option>
          <option value={'ratedCards'}>Rated Cards</option>
          <option value={'createdAt'}>Date Created</option>
        </Select>
        <Box overflowX={{ base: 'scroll', md: 'hidden' }} maxW={{ base: '50%', md: '100%' }}>
          <TableContainer >
            <Table variant={'simple'} >
              <TableCaption>Leaderboards</TableCaption>
              <Thead>
                <Tr>
                  <Th></Th>
                  <Th>Username</Th>
                  <Th>Score</Th>
                  <Th>Rated Cards</Th>
                  <Th>Date Joined</Th>
                </Tr>
              </Thead>
              <Tbody>
                {users.map(user => {
                  const date = String(functions.getDate(user.createdAt)).substring(0, 15)
                  const avatar = avatars.find(a => a.id === user.avatar.id)
                  const newAvatar = createAvatar(style, avatar).toDataUriSync()
                  return (
                    <Tr key={user.username}>
                      <Td>
                        {avatar.face[0] !== ''
                          ? <Image borderRadius={'full'} boxSize={10} src={newAvatar} />
                          : <Image src={'https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg'} alt='Avatar' maxW={'40px'} borderRadius={'full'} />}
                      </Td>
                      <Td>
                        {user.username}
                      </Td>
                      <Td>
                        {user.score}
                      </Td>
                      <Td>
                        {user.ratedCards.length}
                      </Td>
                      <Td>
                        {date}
                      </Td>
                    </Tr>
                  )
                })
                }
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Stack>
    </Center>
  )
}

export default Leaderboards