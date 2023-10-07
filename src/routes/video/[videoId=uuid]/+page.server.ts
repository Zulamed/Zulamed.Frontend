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
import { deleteComment } from '$backend/video/deleteComment';
import { editComment } from '$backend/video/editComment';
import { getAllVideos } from '$backend/video/getAll/endpoint';

export const load = (async ({ params, fetch, locals }) => {
    const videoResult = await getVideoById(params.videoId, fetch);
    // let videos = match(allVideos)
    //     .with({ tag: "success" }, ({ data }) => data.videos)
    //     .with({ tag: "error" }, ({ error }) => { throw err(500, error) })
    //     .exhaustive();
    const video = match(videoResult)
        .with({ tag: "success" }, ({ response }) => response)
        .with({ tag: "failure" }, ({ error }) => { throw err(500, error) })
        .with({ tag: "not-found" }, () => { throw err(404, "Video not found") })
        .exhaustive();
    const videoInfo = { ...video };
    let userLiked: boolean | undefined = undefined;
    let userDisliked: boolean | undefined = undefined;
    let userFollowed: boolean | undefined = undefined;
    if (locals.user) {
        userLiked = await hasLiked(params.videoId, fetch);
        const isFollowing = await hasSubscribedTo(videoInfo.user.id, fetch);
        userFollowed = match(isFollowing)
            .with({ status: "ok" }, () => true)
            .with({ status: "not-found" }, () => false)
            .with({ status: "error" }, ({ message }) => { throw err(500, message) })
            .exhaustive();
        userDisliked = false;
        if (!userLiked) {
            userDisliked = await hasDisliked(params.videoId, fetch);
        }
    }

    return {
        videoInfo, userLiked, userDisliked, userFollowed, streamed: {
            comments: getComments(params.videoId, fetch),
            sideVideos: getAllVideos(fetch)
        }
    };
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
    deleteComment: async ({ fetch, request, locals }) => {
        if (!locals.user)
            return;
        const data = await request.formData();
        const videoId = data.get("videoId") as string;
        const commentId = data.get("commentId") as string;
        return deleteComment(commentId, videoId, fetch);
    },
    followToggle: async ({ fetch, request, locals }) => {
        if (!locals.user) {
            return;
        }
        const data = await request.formData();
        const userId = data.get("userId") as string;
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
    editComment: async ({ fetch, request, locals }) => {
        if (!locals.user)
            return;
        const data = await request.formData();
        const videoId = data.get("videoId") as string;
        const commentId = data.get("commentId") as string;
        const editedText = data.get("comment-input") as string;
        const result = await editComment(videoId, commentId, editedText, fetch);
        const editResult = match(result)
            .with({ status: "ok" }, (data) => data)
            .with({ status: "not-found" }, () => { throw err(404, "Comment not found") })
            .with({ status: "error" }, ({ message }) => { throw err(500, message) })
            .exhaustive();

        return { editedText: editResult.editedComment };
    }
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

