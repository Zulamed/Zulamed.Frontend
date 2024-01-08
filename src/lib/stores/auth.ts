import cookie from 'cookie'
import { browser } from '$app/environment';
import { auth } from '$lib/firebase/client';
import { signInWithEmailAndPassword, type IdTokenResult } from 'firebase/auth';
import { get, writable } from 'svelte/store';
import type { User } from '$backend/user/get/types';
import { invalidateAll } from '$app/navigation';

export const user = writable<User | undefined>(undefined);

async function fetchUser(jwtToken: IdTokenResult) {
    const id = jwtToken?.claims['UserId'] as string | undefined;
    if (!id)
        return;
    const response = await fetch(`/api/user/${id}`);
    if (response.ok){
        const { user: responseUser } = await response.json();
        user.set(responseUser);
    }
}


export async function login(email: string, password: string) {
    const { user: newUser } = await signInWithEmailAndPassword(auth, email, password);
    const jwtToken = await newUser?.getIdTokenResult();
    fetchUser(jwtToken);
    invalidateAll();
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
            sameSite: true,
        })
        if (!newUser) {
            user.set(undefined);
        }
        // if user store wasn't set by the backend, set it now
        if (!get(user)) {
            const jwtToken = await newUser?.getIdTokenResult();
            if (!jwtToken)
                return;
            fetchUser(jwtToken);
            invalidateAll();
        }
    });

    setInterval(async () => {
        if (auth.currentUser) {
            await auth.currentUser.getIdToken(true);
        }
    }, 15 * 60 * 1000);
}

