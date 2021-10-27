import React, { useState } from 'react'
import firebase from 'firebase/app'
import initFirebase from '../firebase/initFirebase'
import { useRouter } from 'next/router'
import Axios from 'axios'

initFirebase()

const SignUp = () => {
    const router = useRouter()
    const [inputValue, setInputValue] = useState({
        email : '',
        password : ''
    })
    const firebaseAuth = firebase.auth()
    const handleSumbitRegis = async () => {
        try {
            const result = await firebaseAuth.createUserWithEmailAndPassword(inputValue.email, inputValue.password)
            Axios.post('http://localhost:8000/api/v1/auth/register', {
                uid : result.user.uid,
                email : result.user.email,
                providerId : result.additionalUserInfo.providerId
            })
            firebaseAuth.currentUser.sendEmailVerification()
            alert('mohon verifikasi email anda')
            router.push('/sign-in')

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div style={{display : 'flex', flexDirection : 'column', width : '300px'}}>
            <h1 style={{marginBottom : '20px'}}>Halaman Registrasi</h1>
            <input 
                style={{marginBottom : '10px'}} 
                onChange={(e) => setInputValue({...inputValue, email : e.target.value})} 
                placeholder='email' value={inputValue.email} 
            />
            <input 
                style={{marginBottom : '10px'}} 
                placeholder='passoword' 
                onChange={(e) => setInputValue({...inputValue, password : e.target.value})} 
                value={inputValue.password} 
            />
            <button onClick={handleSumbitRegis}>Registrasi</button>
        </div>
    )
}

export default SignUp
