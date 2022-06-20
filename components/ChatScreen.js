import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import styled from 'styled-components'
import { auth, db } from '../firebase'
import {Avatar, IconButton, stepButtonClasses} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import getRecipientEmail from '../utils/getRecipientEmail'
import { useCollection } from 'react-firebase-hooks/firestore'
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import Message from './Message'
import MicIcon from '@mui/icons-material/Mic';
import firebase from 'firebase'
import TimeAgo from 'timeago-react'

function ChatScreen({chat, messages}) {
  console.log(messages, 'ChatScreen')
    const {user} = useAuthState(auth)
    const router = useRouter()
    const [input, setInput] = useState('')
    const {value} = useCollection(db.collection('chats').doc(router.query.id).collection('messages').orderBy("timestamp", "asc")
    );

    
    const a = useCollection(db.collection('users').where('email', '==', getRecipientEmail(chat.users, user)))
    // console.log(a.value.docs , "chatS")

    

    const showMessage = ()=>{
      if(value){
        return value.docs.map((message) => (
          <Message
          key={message.id}
          user={message.data().user}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime()
          }}
          />
        ))
      }else{
        return JSON.parse(messages).map((message)=>(

          <Message
            key={message.id}
            userD={message}
            message={message}
            />
        ))
      }
    }

    const sendMessage = (e)=>{
      e.preventDefault()

      db.collection("users").doc(user.uid).set({
        lastSeen: firebase.firestore.FieldValue.serverTimestamp()
      },
      {
        merge: true
      }
      )
      db.collection('chats').doc(router.query.id).collection('messages').add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: input,
        user: user.email,
        photoURL: user.photoURL
      })
      setInput("")
    }
    const snapShot = a.value?.docs?.[0]?.data()
  return (
    <Container>
        <Header>
            <Avatar src={user.photoURL} />
            <HeaderInfo>

             <h3>{getRecipientEmail(chat.users, user)}</h3>
             {a.value? (
               <p>last active: {''}
               {snapShot?.lastSeen?.toDate() ?(
                <TimeAgo datetime={snapShot?.lastSeen?.toDate()} />
               ) : "unavailable"}
               </p>
             ): (
              <p>Loading...</p>
             )}
            </HeaderInfo>
            <HeaderIcon >
               <IconButton>
                <AttachFileIcon />
               </IconButton>
               <IconButton>
                <MoreVertIcon />
               </IconButton>
            </HeaderIcon>
        </Header>
        <MessageContainer>
          {showMessage()}
            <EndOfMessages />
        </MessageContainer>
        <InputContainer>
          <InsertEmoticonIcon />
          <Input value={input} onChange={(e)=> setInput(e.target.value)} />
          <button hidden disabled={!input} type="submit" onClick={sendMessage}></button>
          <MicIcon />
        </InputContainer>
    </Container>
  )
}

export default ChatScreen

const Container = styled.div``
const Input = styled.input`
flex: 1;
outline: 0;
border: none;
border-radius: 10px;
padding: 20px;
position: sticky;
bottom: 0;
background-color: gainsboro;
margin-left: 15px;
margin-right: 15px;
`
const InputContainer = styled.form`
display: flex;
align-items: center;
padding: 10px;
position: sticky;
bottom: 0;
background-color: white;
z-index: 100;
`


const Header = styled.div`
position: sticky;
background-color: white;
z-index: 100;
top: 0;
display: flex;
padding: 11px;
height: 80px;
align-items: center;
border-bottom: 1px solid whitesmoke;
`


const HeaderIcon = styled.div`

`
const HeaderInfo = styled.div`
margin-left: 15px;
flex: 1;
  > h3{
    margin-bottom: 5px;
}
 > p{
    font-size:14px;
    color: gray;
}`
const EndOfMessages = styled.div``
const MessageContainer = styled.div`
padding: 30px;
background-color: '#e5ded8';
min-height: 90vh;
`