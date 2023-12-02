import { updateVideo } from "$backend/video/updateVideo";
import { match } from "ts-pattern";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({fetch, request}) => {
    const {id, videoTitle, videoDescription}= await request.json() as { id: string, videoTitle: string, videoDescription: string };
    console.log({id, videoTitle, videoDescription})
    const response = await updateVideo(fetch, {id, videoTitle, videoDescription});
    return match(response)
        .with({status: "success"}, () => new Response("Success", {status: 200}))
        .with({status: "not-found"}, () => new Response("Not found", {status: 404}))
        .with({status: "error"}, ({message}) => new Response(message, {status: 500}))
        .exhaustive()
}
