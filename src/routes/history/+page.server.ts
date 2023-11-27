import { match } from "ts-pattern";
import type {PageServerLoad} from "./$types"
import { error } from "@sveltejs/kit";
import {type Data, getVideosByHistory} from "$backend/video/history/endpoint";

export const load = (async ({fetch}) => {
    const result = await getVideosByHistory(fetch);
    const data : Data = match(result)
        .with({status: 'ok'}, ({data}) => data)
        .with({status: 'error'}, ({message}) => {throw error(500,message)})
        .exhaustive();
    console.log(data);
    return {videoData: data}
}) satisfies PageServerLoad;


