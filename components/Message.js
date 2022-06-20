import { style } from "@mui/system"
import { useAuthState } from "react-firebase-hooks/auth"
import styled from "styled-components"
import { auth } from "../firebase"

function Message({userD, message}) {
  const {user} = useAuthState(auth)
  console.log(message.user, "messages")
   
  const TypeOfMessage = message.user === user.email ? Sender : Reciever
  return (
    <div>
        <TypeOfMessage>{message.message}</TypeOfMessage>
    </div>
  )
}

export default Message

const MessageElement = styled.p`
width: fit-content;
padding: 15px;
border-radius: 8px;
margin: 10px;
min-width: 60px;
padding-bottom: 26px;
position: relative;
text-align: right;
`

const Sender = styled(MessageElement)`
margin-left: auto;
background-color: '#dcf8c6';

`

const Reciever = styled(MessageElement)`
text-align: left;
background-color: whitesmoke;

`