import type { Video } from "$lib/models/video";


export type User = {
    id: string;
    username: string;
    profilePictureUrl: string;
}

export type VideoAllResponse =
    | { tag: "success", data: { videos: { video: Video, user: User }[] } }
    | { tag: "error", error: string };
