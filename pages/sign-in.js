import React, { useState } from 'react'
import firebase from 'firebase/app'
import initFirebase from '../firebase/initFirebase'
import 'firebase/auth'
import { useRouter } from 'next/router'
import Axios from 'axios'
import Cookies from 'js-cookie'
import { mapUserData } from '../firebase/mapUserData'
import { setUserCookie } from '../firebase/userCookies'
import moment from 'moment'
import * as gtag from '../lib/gtag'

initFirebase()

const SignIn = () => {
    const router = useRouter()
    const [inputValue, setInputValue] = useState({
        email : '',
        password : ''
    })
    const firebaseAuth = firebase.auth()
    
    const handleSumbitLogin = () => {
        firebaseAuth.signInWithEmailAndPassword(inputValue.email, inputValue.password)
        .then(({user}) => {
            if(user.emailVerified){
                const userData = {
                    uid : user.uid,
                    email: user.email, 
                  }
                setUserCookie(JSON.stringify(userData))
                router.push('/')
                gtag.event({
                    action : 'submit_form',
                    category: 'login with email',
                    label : user.email
                })
                
                // return user.getIdToken().then((idToken) => {
                //     Axios.post('http://localhost:8000/api/v1/auth/createSession', { tokenId :idToken })
                //     .then((result) => {
                //         console.log(moment(new Date(Date.now() + (result.data.options.maxAge))).format())
                //         Cookies.set('auth2', result.data.cookie || '', { expires : new Date(Date.now() + (result.data.options.maxAge)) })
                //     })
                // router.push('/')
                // })
            }else{
                alert('verifikasi email anda terlebih dahulu')
                firebaseAuth.signOut()
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const handleLoginWithGoogle = async () => {
        const goggleProvider = new firebase.auth.GoogleAuthProvider()

        try {
            const result = await firebaseAuth.signInWithPopup(goggleProvider)
            Axios.post('http://localhost:8000/api/v1/auth/register', {
                uid : result.user.uid,
                email : result.user.email,
                providerId : result.additionalUserInfo.providerId
            })
            router.push('/')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div style={{display : 'flex', flexDirection : 'column', width : '300px'}}>
            <h1 style={{marginBottom : '20px'}}>Halaman Login</h1>
            <input 
                style={{marginBottom : '10px'}} 
                type='email'
                onChange={(e) => setInputValue({...inputValue, email : e.target.value})} 
                placeholder='email' value={inputValue.email} 
            />
            <input 
                style={{marginBottom : '10px'}} 
                placeholder='passoword' 
                type='password'
                onChange={(e) => setInputValue({...inputValue, password : e.target.value})} 
                value={inputValue.password} 
            />
            <button onClick={handleSumbitLogin}>Log In</button>
            <button onClick={() => handleLoginWithGoogle()} style={{marginTop : '10px'}}>Login with google</button>
        </div>
    )
}

export default SignIn
