import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } from "$env/static/private"
import { PUBLIC_FIREBASE_PROJECT_ID } from "$env/static/public";

function createApp() {
    const apps = getApps();
    if (apps.length > 0)
        return apps[0];
    return initializeApp({
        credential: cert({
            projectId: PUBLIC_FIREBASE_PROJECT_ID,
            clientEmail: FIREBASE_CLIENT_EMAIL,
            privateKey: FIREBASE_PRIVATE_KEY
        })
    })
}

export const app = createApp();
export const auth = getAuth(app);
