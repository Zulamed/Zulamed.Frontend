import { auth } from '$lib/firebase/admin';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle = (async ({ event, resolve }) => {
    const token = event.cookies.get('token');
    const path = event.url.pathname;
    const user = token ? await auth.verifyIdToken(token) : undefined;
    if (user) {
        event.locals.userId = user['UserId']
    }
    if (path === '/protected' && !user) {
        throw redirect(307, '/')
    }

    return await resolve(event);
}) satisfies Handle;
