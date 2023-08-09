import type { PageLoad } from './$types';
import { error as err } from '@sveltejs/kit';
import { getAllVideos } from '$backend/video/getAll/endpoint';
import { match } from 'ts-pattern';


export const load = (async ({fetch}) => {
    // const response = await fetch(`${PUBLIC_BACKEND_URL}/video`);
    // if (response.ok) {
    // 	const videoResponse = (await response.json()) as VideoAllResponse;
    // 	for (let i = 0; i < 5; i++) {
    // 		videoResponse.videos.push(videoResponse.videos[0])
    // 	}
    // 	return {
    // 		videoResponse
    // 	};
    // }
    const response = await getAllVideos(fetch);
    const videosResponse = match(response)
        .with({ tag: "success" }, ({ data }) => data)
        .with({ tag: "error" }, ({ error }) => {throw err(500, error)})
        .exhaustive();
    const videos = videosResponse.videos;
    for (let i = 0; i < 5; i++) {
        videos.push(videos[0]);
    }
    return {
        videoResponse: videos
    }
}) satisfies PageLoad;
