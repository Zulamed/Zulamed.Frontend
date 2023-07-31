import cookie from 'cookie'
import { browser } from '$app/environment';
import { auth } from '$lib/firebase/client';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { writable } from 'svelte/store';
import type { User } from '$backend/user/get/types';
import { getUser } from '$backend/user/get/getUser';
import { match } from 'ts-pattern';

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
        if (!newUser) {
            user.set(null);
            return;
        }
        const jwtToken = await newUser?.getIdTokenResult();
        const id = jwtToken?.claims['UserId'] as string | undefined;
        if (!id)
            return;
        const backendUser = await getUser(id);
        match(backendUser)
            .with({ tag: "success" }, ({ user: response }) => {
                user.set(response.user);
            });
    });
}

