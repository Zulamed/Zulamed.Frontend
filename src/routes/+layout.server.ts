import { getSubscriptions, type Subscription } from '$backend/user/getSubscriptions';
import { match } from 'ts-pattern';
import type { LayoutServerLoad } from './$types';
import { error } from '@sveltejs/kit';
export const load: LayoutServerLoad = async ({ locals, fetch }) => {
    let subscriptions: Subscription[] | undefined;
    if (!locals.user) {
        subscriptions = undefined;
    } else {

        const result = await getSubscriptions(locals.user?.id, fetch)
        subscriptions = match(result)
            .with({ tag: "success" }, ({ subscriptions }) => subscriptions)
            .with({ tag: "not found" }, () => { return [] })
            .with({ tag: "error" }, ({ error: err }) => { throw error(500, err) })
            .exhaustive();
        for (let i = 0; i <= 6; i++) {
            subscriptions.push(subscriptions[0])
        }

    }
    return {
        loggedInUser: locals.user, subscriptions
    };
}
