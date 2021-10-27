import firebase from 'firebase/app'
import 'firebase/auth'

const clientCredentials = {
    apiKey: "AIzaSyDR2b5mnsDLsDfQi3HyuAXcO7y1t3As9_g",
    authDomain: "pribados-19d8d.firebaseapp.com",
    projectId: "pribados-19d8d",
    storageBucket: "pribados-19d8d.appspot.com",
    messagingSenderId: "974430113457",
    appId: "1:974430113457:web:91a1e38ad8f19dc5f8dc90",
    measurementId: "G-T8YFJSX6BD"
}

export default function initFirebase() {
    if(!firebase.apps.length){
        firebase.initializeApp(clientCredentials)
    }
}