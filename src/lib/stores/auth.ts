import cookie from 'cookie'
import { browser } from '$app/environment';
import { auth } from '$lib/firebase/client';
import { signInWithEmailAndPassword, type User} from 'firebase/auth';
import { writable } from 'svelte/store';

export const user = writable<User | null>(null);


export async function login(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password);
}


export async function logout() {
    await auth.signOut();
}


if (browser) {
    auth.onAuthStateChanged(async (newUser) => {
        const token = await newUser?.getIdToken();
        document.cookie = cookie.serialize('token', token ?? "", {
            path: '/',
            maxAge: token ? undefined : 0,
        })
        user.set(newUser);
    });
}

