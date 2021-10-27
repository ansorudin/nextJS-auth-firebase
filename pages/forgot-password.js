import React, { useState } from 'react'
import firebase from 'firebase/app'
import initFirebase from '../firebase/initFirebase'
import { useRouter } from 'next/router'

initFirebase()

const ForgotPassoword = () => {
    const router = useRouter()
    const [inputValue, setInputValue] = useState({
        email : '',
    })
    const firebaseAuth = firebase.auth()
    const handleSumbitSendEmail = () => {
       firebaseAuth.sendPasswordResetEmail(inputValue.email)
       .then(() => {
           alert('Silahkan periksa email anda untuk mengubah password')
           router.push('/sign-in')
       })
       .catch((error) => {
           alert(error.message)
       })
    }
    return (
        <div style={{display : 'flex', flexDirection : 'column', width : '400px'}}>
            <h1 style={{marginBottom : '20px'}}>Halaman Forgot Password</h1>
            <p>Silahkan isi email anda</p>
            <input 
                style={{marginBottom : '10px'}} 
                onChange={(e) => setInputValue({...inputValue, email : e.target.value})} 
                placeholder='email' value={inputValue.email} 
                type='email'
            />
            <button onClick={handleSumbitSendEmail}>Kirim Email</button>
        </div>
    )
}

export default ForgotPassoword
