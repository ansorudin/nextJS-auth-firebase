import React, { useEffect, useState } from "react"
import initFirebase from "../firebase/initFirebase"
import firebase from 'firebase/app'
import { useRouter } from 'next/router'
import mapUserData from '../firebase/mapUserData'
import { setUserCookie, getUserFromCookie, removeUserCookie } from '../firebase/userCookies'
import Axios from 'axios'
import cookie from 'js-cookie'

initFirebase()

export default function Home() {
  const router = useRouter()
  const [user, setUser] = useState({})

  // const cookies = cookie.get('auth2')
  // console.log(JSON.stringify(cookies))
  // const checkCookie = async () => {
  //    try {
  //     const result = await Axios.post('http://localhost:8000/api/v1/auth/verifyToken', {sessionCookie : JSON.stringify(cookies)})
  //     if(!result.data){
  //       router.push('/sign-in')
  //       firebase.auth().signOut()
  //     }else{
  //       console.log(result.data)
  //       const {name, role, email} = result.data
  //       setUser({name, role, email})
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  // useEffect(() => {
  //   checkCookie()
  // },[])
  
  useEffect(() => {
    // Firebase updates the id token every hour, this
    // makes sure the react state and the cookie are
    // both kept up to date
    const cancelAuthListener = firebase.auth().onIdTokenChanged((user) => {
        if (user) {
          const userData = {
            uid : user.uid,
            email: user.email, 
          }
            setUserCookie(JSON.stringify(userData))
            setUser(userData)
        } else {
            removeUserCookie()
            setUser()
        }
    })

    const userFromCookie = getUserFromCookie()
    if (!userFromCookie) {
        router.push('/sign-in')
        return
    }
    console.log(userFromCookie)
    // setUser(JSON.parse(userFromCookie))

    return () => {
        cancelAuthListener()
    }
  }, [])

  const handleEditProfile = () => {
    firebase.auth().currentUser.updateProfile({
      displayName : userData.displayName
    })
    .then((res) => {
      alert('Sukses update profile')
    })
    .catch((error) => {
      console.log(error)
    })
  }
  console.log(user)
  return (
    <div>
      <h1>Halo Selamat Datang</h1>
      <div style={{width : '300px', display : 'flex', flexDirection : 'column'}}>
        <div style={{marginBottom : '10px'}}>
          <input 
            style={{marginRight : '5px'}}  
            placeholder='Nama' 
            value={user?.name} 
            // onChange={(e) => setUser({...user, displayName : e.target.value})} 
          />
          <input 
            style={{marginRight : '5px'}}  
            placeholder='Nama' 
            value={user?.email} 
            // onChange={(e) => setUser({...user, displayName : e.target.value})} 
          />
          <input 
            style={{marginRight : '5px'}}  
            placeholder='Nama' 
            value={user?.role} 
            // onChange={(e) => setUser({...user, displayName : e.target.value})} 
          />
          <button onClick={handleEditProfile}>Edit Profile</button>
        </div>
        <input style={{marginBottom : '10px'}} placeholder='Email' value={user?.email} />
        <button onClick={() => firebase.auth().signOut()}>Log Out</button>
      </div>
    </div>
  )
}

// import React from 'react'
// import { getSession } from 'next-auth/client'

// const Home = ({ data }) => {
//   if(data){
//     return (
//       <div>
//         ini home
//       </div>
//     )
//   }
//   return <div>login first</div>
// }

// export default Home

// export async function getServerSideProps(context){
//   const session = await getSession(context)
//   return {
//     props : {
//       data: session
//     }
//   }
// }
