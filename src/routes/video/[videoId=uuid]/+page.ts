import { env } from '$env/dynamic/public';
import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

type Video = {
	id: string;
	videoTitle: string;
	videoUrl: string;
	videoThumbnail: string;
	videoDescription: string;
	videoPublishedDate: string;
};

export const load = (async ({ fetch, params }) => {
	const response = await fetch(`${env.PUBLIC_BACKEND_URL}/video/${params.videoId}`);
	if (response.ok) {
		const video = (await response.json()) as Video;
		return {
			video
		};
	}
	throw error(404, 'Video not found');
}) satisfies PageLoad;
