import { getUser } from "$backend/user/get/getUser"
import { match } from "ts-pattern";
import type { RequestHandler } from "./$types"
import { json } from "@sveltejs/kit";

export const GET: RequestHandler = async ({fetch, params}) => {
    const response = await getUser(params.userId, fetch);
    return match(response)
        .with({tag: "success"}, ({user}) => json(user))
        .with({tag: "error"}, ({error}) => new Response(error, {status: 400}))
        .with({tag: "not found"}, () => new Response("User not found", {status: 404}))
        .exhaustive();
}
