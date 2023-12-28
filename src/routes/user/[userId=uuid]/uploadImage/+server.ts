import { uploadPhoto } from "$backend/user/uploadPhoto";
import { match } from "ts-pattern";
import type {RequestHandler} from "./$types"
import { json } from "@sveltejs/kit";


export const POST : RequestHandler = async ({fetch, params, locals, request}) => {
    if (!locals.user) {
        return new Response("Unauthorized", {status: 401});
    }

    const data = await request.formData();
    const file = data.get("Photo") as File;
    const response = await uploadPhoto(locals.user.id, file, fetch);

    return match(response)
        .with({ status: "ok" }, (res) => json(res.response))
        .with({ status: "not-found" }, () => new Response("not-found", {status: 404}))
        .with({ status: "error" }, ({ message }) => new Response(message, {status: 500}))
        .exhaustive();
}

