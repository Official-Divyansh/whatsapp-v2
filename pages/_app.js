import '../styles/globals.css'
import {useAuthState } from 'react-firebase-hooks/auth'
import {auth,db} from '../firebase'
import Login from '../components/Login'
import Loading from '../components/Loading'
import { useEffect, useState, useMemo } from 'react'
import firebase from 'firebase'
function MyApp({ Component, pageProps }) {
   const [loading, setLoading] = useState(true)
    const {user} = useAuthState(auth)
   useEffect(()=>{
       setTimeout(()=>{
          setLoading(false)
       },2000)
   },[])  

   useMemo(() => {
       if(user){
        db.collection("users").doc(user.uid).set({
        email: user.email,
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
        photoURl: user.photoURL
        },
        {merge: true})
       }
   },[user])

    if(loading) return <Loading />
    if(!user) return <Login />

  return <Component {...pageProps} />
}

export default MyApp
