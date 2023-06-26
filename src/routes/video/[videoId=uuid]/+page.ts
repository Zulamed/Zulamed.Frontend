import { PUBLIC_BACKEND_URL } from '$env/static/public';
import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import type { Video } from '$lib/models/video';

export const load = (async ({ fetch, params }) => {
	const response = await fetch(`${PUBLIC_BACKEND_URL}/video/${params.videoId}`);
	if (response.ok) {
		const video = (await response.json()) as Video;
		return {
			video
		};
	}
	throw error(404, 'Video not found');
}) satisfies PageLoad;
