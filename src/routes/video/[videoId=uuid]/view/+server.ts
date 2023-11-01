import { viewVideo } from '$backend/video/view/endpoint';
import { match } from 'ts-pattern';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({fetch, params, locals}) => {
    const result = await viewVideo(params.videoId, fetch);
    const matchResult = match(result)
        .with({status: "ok"}, () => ({status: 200}))
        .otherwise(() => ({status: 500}));

    return new Response(null, matchResult);
}
