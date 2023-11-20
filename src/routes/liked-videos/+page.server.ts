import { getLikedVideos } from "$backend/video/getLikedVideosOfAUser";
import { match } from "ts-pattern";
import type {PageServerLoad} from "./$types"
import { error } from "@sveltejs/kit";


export const load = (async ({locals, fetch}) => {
    const result = await getLikedVideos(true, fetch);
    const data = match(result)
        .with({status: 'ok'}, ({data}) => data)
        .with({status: 'error'}, ({message}) => {throw error(500,message)})
        .exhaustive();
    return {videoData: data}
}) satisfies PageServerLoad;







