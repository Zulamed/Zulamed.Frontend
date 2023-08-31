import { match } from "ts-pattern";
import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";
import { getUserDetailed } from "$backend/user/get/getUserDetailed";
import { getSubscriptions } from "$backend/user/getSubscriptions";

export const load = (async ({ fetch, params }) => {
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
        .with({ tag: "not found" }, () => { throw error(404, "User not found") })
        .with({ tag: "error" }, ({ error: err }) => { throw error(500, err) })

    return { user: user.user, videos: user.videos, numberOfFollowers: user.numberOfFollowers, subscriptions }
}) satisfies PageServerLoad;
