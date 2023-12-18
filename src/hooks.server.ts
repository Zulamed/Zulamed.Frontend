import { auth } from '$lib/firebase/admin';
import { getUser } from '$backend/user/get/getUser';
import { redirect, type Handle, type HandleFetch } from '@sveltejs/kit';
import { match } from 'ts-pattern';
import type { DecodedIdToken } from 'firebase-admin/auth';


async function verifyIdToken(token: string | undefined): Promise<DecodedIdToken | undefined> {
    if (!token) return undefined;
    try {
        const user = await auth.verifyIdToken(token);
        return user;
    } catch {
        return undefined;
    }
}



function protectRoutes(path: string, isAuthenticated: boolean, isVerified: boolean): boolean {
    // prevent logged in users from accessing login page
    if ((path === '/login' || path === '/register') && isAuthenticated) {
        return false;
    }

    if (path === '/recovery/notVerified' && isVerified) {
        return false;
    }

    const unauthenticatedRoutes = ["/settings", "/subscriptions", "/history", "/yourVideos", "/liked-videos"];

    return !(unauthenticatedRoutes.includes(path) && !isAuthenticated);
}



export const handle = (async ({ event, resolve }) => {
    const token = event.cookies.get('token');
    const path = event.url.pathname;
    const user = await verifyIdToken(token);
    if (user && !user['email_verified'] && path !== '/recovery/notVerified') {
        throw redirect(307, '/recovery/notVerified');
    }
    if (user) {
        const userResponse = await getUser(user['UserId'], event.fetch);
        match(userResponse)
            .with({ tag: "success" }, ({ user: response }) => {
                event.locals.user = response.user
            })
            .with({ tag: "not found" }, () => { event.locals.user = undefined })
            .with({ tag: "error" }, () => { event.locals.user = undefined })
    } else {
        // if token is invalid, remove it from cookies
        event.cookies.set('token', '', { maxAge: -1, sameSite: true });
    }
    const isEmailVerified = user && user["email_verified"] ? true : false;
    if (!protectRoutes(path, !!user, isEmailVerified)) {  // fucking javascript lol
        throw redirect(307, '/');
    }

    return await resolve(event);
}) satisfies Handle;

export const handleFetch = (async ({ event, request, fetch }) => {
    request.headers.set('Authorization', `Bearer ${event.cookies.get('token')}`)
    return fetch(request);
}) satisfies HandleFetch;
