import type { PageServerLoad } from './$types';
import { error as err } from '@sveltejs/kit';
import { getAllVideos } from '$backend/video/getAll/endpoint';
import { match } from 'ts-pattern';


export const load = (async ({ fetch }) => {
    const response = await getAllVideos(fetch);
    const videosResponse = match(response)
        .with({ tag: "success" }, ({ data }) => data)
        .with({ tag: "error" }, ({ error }) => { throw err(500, error) })
        .exhaustive();
    const videos = videosResponse.videos;
    for (let i = 0; i < 5; i++) {
        videos.push(videos[0]);
    }
    return {
        videoResponse: videos
    }
}) satisfies PageServerLoad;
