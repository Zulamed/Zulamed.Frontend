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
            const userResponse = await getUser(user['UserId']);
            match(userResponse)
                .with({ tag: "success" }, ({ user: response }) => {
                    event.locals.user = response.user
                })
                .with({ tag: "not found" }, () => { throw redirect(307, '/') })
                .with({ tag: "error" }, () => { throw redirect(307, '/') })
        }
        if (path === '/protected' && !user) {
            return new Response('Redirect', {status: 303, headers: { Location: '/login' }})
        }
        // prevent logged in users from accessing login page
        if ((path === '/login' || path === '/register') && user) {
            return new Response('Redirect', { status: 307, headers: { Location: '/' } })
        }
    } catch (error) {
        // if token is invalid, remove it from cookies
        event.cookies.set('token', '', { maxAge: -1 });
        return new Response('Redirect', {status: 307, headers: { Location: '/' }})
    }
    return await resolve(event);
}) satisfies Handle;
