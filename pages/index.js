import React, { useEffect, useState } from "react"
import initFirebase from "../firebase/initFirebase"
import firebase from 'firebase/app'
import {useRouter} from 'next/router'

initFirebase()

export default function Home() {
  const router = useRouter()
  const [userData, setUserData] = useState({})
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if(!user){
        router.push('/sign-in')
      }else {
        setUserData(user)
      }
    })
  },[])

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
  
  return (
    <div>
      <h1>Halo Selamat Datang</h1>
      <div style={{width : '300px', display : 'flex', flexDirection : 'column'}}>
        <div style={{marginBottom : '10px'}}>
          <input 
            style={{marginRight : '5px'}}  
            placeholder='Nama' 
            value={userData.displayName} 
            onChange={(e) => setUserData({...userData, displayName : e.target.value})} 
          />
          <button onClick={handleEditProfile}>Edit Profile</button>
        </div>
        <input style={{marginBottom : '10px'}} placeholder='Email' value={userData.email} />
        <button onClick={() => firebase.auth().signOut()}>Log Out</button>
      </div>
    </div>
  )
}
