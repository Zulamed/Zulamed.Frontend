import cookie from 'cookie'
import { browser } from '$app/environment';
import { auth } from '$lib/firebase/client';
import { signInWithEmailAndPassword, type IdTokenResult } from 'firebase/auth';
import { get, writable } from 'svelte/store';
import type { User } from '$backend/user/get/types';
import { getUser } from '$backend/user/get/getUser';
import { match } from 'ts-pattern';

export const user = writable<User | undefined>(undefined);

async function fetchUser(jwtToken: IdTokenResult) {
    const id = jwtToken?.claims['UserId'] as string | undefined;
    if (!id)
        return;
    const backendUser = await getUser(id);
    match(backendUser)
        .with({ tag: "success" }, ({ user: response }) => {
            user.set(response.user);
        });

}


export async function login(email: string, password: string) {
    const { user: newUser } = await signInWithEmailAndPassword(auth, email, password);
    const jwtToken = await newUser?.getIdTokenResult();
    fetchUser(jwtToken);
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
        if (!get(user)) {
            const jwtToken = await newUser?.getIdTokenResult();
            if (!jwtToken)
                return;
            fetchUser(jwtToken);
        }
    });
}

