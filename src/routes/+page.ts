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
		return {
			videoResponse
		};
	}
	throw error(500, "Couldn't load videos");
}) satisfies PageLoad;
