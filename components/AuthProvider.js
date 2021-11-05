import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react";
import firebase from 'firebase/app'
import initFirebase from "../firebase/initFirebase";

const AuthContext = createContext()
initFirebase()

export function AuthProvider({children}) {
    const [user, setUser] = useState(null)

    useEffect(() => {
        return firebase.auth().onIdTokenChanged(async (user) => {
            if(!user){
                setUser(null)
                Cookies.set('auth3', '')
            }else{
                const token = await user.getIdToken()
                setUser(user)
                Cookies.set('auth3', token)
            }
        })
    },[])

    useEffect(() => {
        const handle = setInterval(async () => {
            const user = firebase.auth().currentUser;
            if(user){
                await user.getIdToken(true)
            }
        }, 10 * 60 * 1000)

        return () => clearInterval(handle)
    }, [])

    return <AuthContext.Provider value={{user}}>{children}</AuthContext.Provider>
}