import { auth } from '$lib/firebase/admin';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle = (async ({ event, resolve }) => {
    const token = event.cookies.get('token');
    const path = event.url.pathname;
    try {
        const user = token ? await auth.verifyIdToken(token) : undefined;
        if (user) {
            event.locals.userId = user['UserId']
        }
        if (path === '/protected' && !user) {
            throw redirect(307, '/')
        }
    } catch (error) {
        // if token is invalid, remove it from cookies
        event.cookies.set('token', '', { maxAge: -1 });
        throw redirect(307, '/')
    }
    return await resolve(event);
}) satisfies Handle;
