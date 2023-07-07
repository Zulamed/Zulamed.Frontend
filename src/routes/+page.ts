import type { PageLoad } from './$types';
import { PUBLIC_BACKEND_URL } from '$env/static/public';
import type { Video } from '$lib/models/video';
import { error } from '@sveltejs/kit';

type VideoAllResponse = {
	videos: Video[];
};

export const load = (async ({ fetch }) => {
	const response = await fetch(`${PUBLIC_BACKEND_URL}/video`);
	if (response.ok) {
		const videoResponse = (await response.json()) as VideoAllResponse;
		for (let i = 0; i < 5; i++) {
			videoResponse.videos.push(videoResponse.videos[0])
		}
		return {
			videoResponse
		};
	}
	throw error(500, "Couldn't load videos");
}) satisfies PageLoad;
