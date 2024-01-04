export type UserResponse = {
    user: User;
}

export type VideoMinimal = {
    id: string;
    title: string;
    views: string;
    createdAt: Date;
    thumbnailUrl: string;
    description: string;
}

export type UserDetailedResponse = {
    user: User;
    videos: VideoMinimal[];
    numberOfFollowers: number;
}


export type User = {
    id: string;
    email: string;
    name: string;
    surname: string;
    profilePictureUrl: string;
    login: string;
    historyPaused: boolean;
    description: string | null;
    isVerified: boolean;
    bannerUrl: string | null;
};


export type UserRetrievalResult =
    | { tag: "success", user: UserResponse }
    | { tag: "not found" }
    | { tag: "error", error: string };

export type UserRetrievalResultDetailed =
    | { tag: "success", user: UserDetailedResponse }
    | { tag: "not found" }
    | { tag: "error", error: string };
