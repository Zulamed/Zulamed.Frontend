import type {RequestHandler} from "./$types"
import { PUBLIC_BACKEND_URL } from "$env/static/public"
import { json } from "@sveltejs/kit"

export type CreateUploadUrlResponse = {
    videoId : string,
    uploadUrl: string
}


export const POST : RequestHandler = async ({fetch, params, locals}) => {
    if (params.userId != locals.user?.id){
        return new Response("Unauthorized", {status: 401});
    }
    const response = await fetch(`${PUBLIC_BACKEND_URL}/video`, {
        method: "POST"
    })


    if (!response.ok){
        const text = await response.text();
        return new Response(text, {status: 400});
    }

    const body = await response.json() as CreateUploadUrlResponse;

    return json(body);
}
