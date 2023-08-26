import type { PageServerLoad, Actions } from './$types';
import { getVideoById } from '$backend/video/getById/endpoint';
import { error as err } from '@sveltejs/kit';
import { match } from 'ts-pattern';
import { likeVideo } from '$backend/video/like/like';
import type { FetchCallbackType } from '$backend/fetchCallbackType';
import { PUBLIC_BACKEND_URL } from '$env/static/public';
import { dislikeVideo } from '$backend/video/dislike/dislike';
import { createComment } from '$backend/video/createComment/endpoint';
import { getComments } from '$backend/video/getCommentsForAVideo/endpoint';
import { hasSubscribedTo } from '$backend/user/hasSubscribed';
import { subscribe } from '$backend/user/subscribe';
import { unsubscribe } from '$backend/user/unsubscribe';

export const load = (async ({ params, fetch }) => {
    const videoResult = await getVideoById(params.videoId, fetch);
    const commentResult = await getComments(params.videoId, fetch);
    const video = match(videoResult)
        .with({ tag: "success" }, ({ response }) => response)
        .with({ tag: "failure" }, ({ error }) => { throw err(500, error) })
        .with({ tag: "not-found" }, () => { throw err(404, "Video not found") })
        .exhaustive();
    const comments = match(commentResult)
        .with({ status: "ok" }, ({ data }) => data.comments)
        .with({ status: "not-found" }, () => [])
        .with({ status: "error" }, ({ error }) => { throw err(500, error) })
        .exhaustive();
    const videoInfo = { ...video, comments };
    const userLiked = await hasLiked(params.videoId, fetch);
    const isFollowing = await hasSubscribedTo(videoInfo.user.id, fetch);
    const userFollowed = match(isFollowing)
        .with({ status: "ok" }, () => true)
        .with({ status: "not-found" }, () => false)
        .with({ status: "error" }, ({ message }) => { throw err(500, message) })
        .exhaustive();

    let userDisliked = false;
    if (!userLiked) {
        userDisliked = await hasDisliked(params.videoId, fetch);
    }
    return { videoInfo, userLiked, userDisliked, userFollowed};
}) satisfies PageServerLoad;

export const actions = {
    like: async ({ fetch, request, locals }) => {
        if (!locals.user)
            return;
        const data = await request.formData();
        const videoId = data.get("videoId") as string;
        const userLiked = await hasLiked(videoId, fetch);
        const userDisliked = await hasDisliked(videoId, fetch);
        if (userDisliked) {
            await dislikeVideo(videoId, true, fetch);
        }
        await likeVideo(videoId, userLiked, fetch);
    },
    dislike: async ({ fetch, request, locals }) => {
        if (!locals.user)
            return;
        const data = await request.formData();
        const videoId = data.get("videoId") as string;
        const userLiked = await hasLiked(videoId, fetch);
        const userDisliked = await hasDisliked(videoId, fetch);
        if (userLiked) {
            await likeVideo(videoId, true, fetch);
        }
        await dislikeVideo(videoId, userDisliked, fetch);
    },
    comment: async ({ fetch, request, locals }) => {
        if (!locals.user)
            return;
        const data = await request.formData();
        const videoId = data.get("videoId") as string;
        const comment = data.get("comment-input") as string;
        return await createComment(videoId, comment, fetch);
    },
    followToggle: async ({ fetch, request, locals }) => {
        if (!locals.user) {
            return;
        }
        const data = await request.formData();
        const userId = data.get("userId") as string;
        console.log(userId);
        const result = await hasSubscribedTo(userId, fetch);
        const isSubscribed = match(result)
            .with({ status: "ok" }, () => true)
            .with({ status: "not-found" }, () => false)
            .with({ status: "error" }, ({ message }) => { throw err(500, message) })
            .exhaustive();
        if (!isSubscribed) {
            await subscribe(userId, fetch);
            return;
        }
        await unsubscribe(userId, fetch);
        return { isSubscribed: !isSubscribed };
    },
} satisfies Actions;


async function hasLiked(id: string, fetch: FetchCallbackType): Promise<boolean> {
    try {
        const result = await fetch(`${PUBLIC_BACKEND_URL}/video/${id}/like`);
        return result.status === 200;
    } catch (error) {
        return false;
    }
}

async function hasDisliked(id: string, fetch: FetchCallbackType): Promise<boolean> {
    try {
        const result = await fetch(`${PUBLIC_BACKEND_URL}/video/${id}/dislike`);
        return result.status === 200;
    } catch (error) {
        return false;
    }
}

