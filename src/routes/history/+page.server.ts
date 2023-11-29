import { match } from "ts-pattern";
import type {PageServerLoad} from "./$types"
import { error } from "@sveltejs/kit";
import {type Data, getVideosByHistory} from "$backend/video/history/getVideosByHistory";
import {hasSubscribedTo} from "$backend/user/hasSubscribed";
import {subscribe} from "$backend/user/subscribe";
import {unsubscribe} from "$backend/user/unsubscribe";
import type {Actions} from "./$types"
import {deleteComment} from "$backend/video/deleteComment";
import {clearHistory} from "$backend/video/history/clearHistory";
import {toggleHistory} from "$backend/video/history/toggleHistory";
export const actions = ({
    clearHistory: async ({fetch, request, locals}) =>
    {
        if (!locals.user) {
            return;
        }
        return clearHistory(fetch);
    },
    toggleHistory: async ({fetch, request, locals}) =>
    {
        if (!locals.user) {
            return;
        }
        return toggleHistory(fetch);
    }
}) satisfies Actions;

export const load = (async ({fetch}) => {
    const result = await getVideosByHistory(fetch);
    const data : Data = match(result)
        .with({status: 'ok'}, ({data}) => data)
        .with({status: 'error'}, ({message}) => {throw error(500,message)})
        .exhaustive();
    return {videoData: data}
}) satisfies PageServerLoad;


