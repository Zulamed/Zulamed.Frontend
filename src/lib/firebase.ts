import { initializeApp, getApps, type FirebaseApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import {
    PUBLIC_FIREBASE_APP_ID,
    PUBLIC_FIREBASE_API_KEY,
    PUBLIC_FIREBASE_PROJECT_ID,
    PUBLIC_FIREBASE_AUTH_DOMAIN,
    PUBLIC_FIREBASE_STORAGE_BUCKET,
    PUBLIC_FIREBASE_MESSAGING_SENDER_ID
} from '$env/static/public'


let app : FirebaseApp | undefined;

const config = {
    apiKey: PUBLIC_FIREBASE_API_KEY,
    authDomain: PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: PUBLIC_FIREBASE_APP_ID
}

// is if statement necessary?
if (!getApps().length)
    app = initializeApp(config);


const auth = getAuth(app);

export { app, auth };
