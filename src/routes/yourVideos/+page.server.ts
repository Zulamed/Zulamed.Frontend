import { getVideosOfUser } from "$backend/video/getVideosOfUser"
import { match } from "ts-pattern";
import { error } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "../$types"
import { deleteVideo } from "$backend/video/deleteVideo";


export const load = (async ({fetch}) => {
    const response = await getVideosOfUser(fetch);
    const data = match(response)
        .with({tag: "success"}, ({data}) => data)
        .with({tag: "error"}, ({error: err}) => {throw error(500, err)})
        .exhaustive();


    return {videoInfos: data}
}) satisfies PageServerLoad


export const actions = {
    delete: async ({fetch, request, locals}) => {
        if (!locals.user){
            return;
        }
        const data = await request.formData();
        const response = await deleteVideo(fetch, data.get("videoId") as string);
        const actionResponse = match(response)
            .with({tag: "success"}, () => ({status: 200}))
            .with({tag: "error"}, ({error: err}) => ({status: 500, body: err}))
            .exhaustive();

        return actionResponse;
    }

} satisfies Actions
