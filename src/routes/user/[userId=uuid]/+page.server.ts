import { match } from "ts-pattern";
import type { PageServerLoad, Actions } from "./$types";
import { error } from "@sveltejs/kit";
import { getUserDetailed } from "$backend/user/get/getUserDetailed";
import { getSubscriptions } from "$backend/user/getSubscriptions";
import { hasSubscribedTo } from '$backend/user/hasSubscribed';
import { subscribe } from '$backend/user/subscribe';
import { unsubscribe } from '$backend/user/unsubscribe';

export const actions = ({
    followToggle: async ({ fetch, request, locals }) => {
        if (!locals.user) {
            return;
        }
        const data = await request.formData();
        const userId = data.get("userId") as string;
        const result = await hasSubscribedTo(userId, fetch);
        const isSubscribed = match(result)
            .with({ status: "ok" }, () => true)
            .with({ status: "not-found" }, () => false)
            .with({ status: "error" }, ({ message }) => { throw error(500, message) })
            .exhaustive();
        if (!isSubscribed) {
            await subscribe(userId, fetch);
            return;
        }
        await unsubscribe(userId, fetch);
        return { isSubscribed: !isSubscribed };
    },
}) satisfies Actions;

export const load = (async ({ fetch, params, locals }) => {
    const { userId } = params;
    const response = await getUserDetailed(userId, fetch);
    const user = match(response)
        .with({ tag: "success" }, ({ user }) => user)
        .with({ tag: "not found" }, () => { throw error(404, "User not found") })
        .with({ tag: "error" }, ({ error: err }) => { throw error(500, err) })
        .exhaustive();

    const subscriptionsResult = await getSubscriptions(userId, fetch);
    const subscriptions = match(subscriptionsResult)
        .with({ tag: "success" }, ({ subscriptions }) => subscriptions)
        .with({ tag: "not found" }, () => { return [] })
        .with({ tag: "error" }, ({ error: err }) => { throw error(500, err) })
        .exhaustive();

    const userFollowed: boolean | undefined = undefined;

    if (locals.user && locals.user.id === userId) {
        const isFollowing = await hasSubscribedTo(userId, fetch);
        userFollowed = match(isFollowing)
            .with({ status: "ok" }, () => true)
            .with({ status: "not-found" }, () => false)
            .with({ status: "error" }, ({ message }) => { throw error(500, message) })
            .exhaustive();
    }

    return { user: user.user, videos: user.videos, numberOfFollowers: user.numberOfFollowers, subscriptions, userFollowed }
}) satisfies PageServerLoad;
