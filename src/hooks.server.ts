import { auth } from '$lib/firebase/admin';
import { getUser } from '$backend/user/get/getUser';
import { redirect, type Handle } from '@sveltejs/kit';
import { match } from 'ts-pattern';

export const handle = (async ({ event, resolve }) => {
    const token = event.cookies.get('token');
    const path = event.url.pathname;
    try {
        const user = token ? await auth.verifyIdToken(token) : undefined;
        if (user) {
            // event.locals.userId = user['UserId']
            const userResponse = await getUser(user['UserId']);
            match(userResponse)
                .with({ tag: "success" }, ({ user: response }) => {
                    event.locals.user = response.user
                })
                .with({ tag: "not found" }, () => { throw redirect(307, '/') })
                .with({ tag: "error" }, () => { throw redirect(307, '/') })
        }
        if (path === '/protected' && !user) {
            throw redirect(307, '/')
        }
        // prevent logged in users from accessing login page
        if ((path === '/login' || path === '/register') && user) {
            throw redirect(307, '/')
        }
    } catch (error) {
        // if token is invalid, remove it from cookies
        event.cookies.set('token', '', { maxAge: -1 });
        throw redirect(307, '/')
    }
    return await resolve(event);
}) satisfies Handle;
