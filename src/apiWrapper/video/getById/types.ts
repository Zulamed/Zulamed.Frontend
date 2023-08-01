import type { Video } from "$lib/models/video";

export type User = {
    id: string;
    username: string;
    profilePictureUrl?: string;
    subscribers : number;
}

export type VideoResponse =
    | {tag: 'success', response: {video: Video, user: User}}
    | {tag: 'failure', error: string}
    | {tag: 'not-found'}
