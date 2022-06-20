import {useRouter} from 'next/router'
import { Avatar } from '@mui/material'
import { useAuthState } from 'react-firebase-hooks/auth'
import styled from 'styled-components'
import { auth } from '../firebase'
import getRecipientEmail from '../utils/getRecipientEmail'

function Chat({id, users}) {
     const router = useRouter()


     const entrChat = ()=>{
          router.push(`/chat/${id}`)
     }

    console.log(users)
    const {user} = useAuthState(auth)
    console.log(user.email)
    const recipientEmail = getRecipientEmail(users, user)
  return (
   <Container onClick={entrChat } >
    <UserAvatar />
      <p>{recipientEmail}</p>
   </Container>
  )
}

export default Chat

const Container = styled.div`
display: flex;
cursor: pointer;
align-items: center;
word-break: break-word;
padding: 15px;

:hover{
    background-color: '#e9eaeb';
}
`

const UserAvatar =styled(Avatar)`
margin-right: 15px;
margin: 5px;
`