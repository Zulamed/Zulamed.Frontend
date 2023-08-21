import { getUser } from "$backend/user/get/getUser";
import { match } from "ts-pattern";
import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";

export const load = (async ({ fetch, params }) => {
    const { userId } = params;
    const response = await getUser(userId, fetch);
    const user = match(response)
        .with({ tag: "success" }, ({ user }) => user)
        .with({ tag: "not found" }, () => { throw error(404, "User not found") })
        .with({ tag: "error" }, ({ error: err }) => { throw error(500, err) })
        .exhaustive();
    return { user }
}) satisfies PageServerLoad;
