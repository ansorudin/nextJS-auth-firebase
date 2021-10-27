import * as firebaseAdmin from 'firebase-admin'
import serviceAccountKey from './serviceAccountKey.json'

if (!firebaseAdmin.apps.length) {
    firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert({
            privateKey : serviceAccountKey.private_key,
            clientEmail : serviceAccountKey.client_email,
            projectId : serviceAccountKey.project_id
        }),
        databaseURL: 'https://pribados-19d8d.firebaseio.com',
    })
}

export { firebaseAdmin }