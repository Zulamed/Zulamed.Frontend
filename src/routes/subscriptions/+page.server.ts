import { match } from "ts-pattern";
import type {PageServerLoad} from "./$types"
import { error } from "@sveltejs/kit";
import {getVideosBySubscriptions} from "$backend/video/subscriptions/endpoint";

export const load = (async ({fetch}) => {
    const result = await getVideosBySubscriptions(true, fetch);
    const data = match(result)
        .with({status: 'ok'}, ({data}) => data)
        .with({status: 'error'}, ({message}) => {throw error(500,message)})
        .exhaustive();
    return {videoData: data}
}) satisfies PageServerLoad;



