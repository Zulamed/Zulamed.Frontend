export type UserResponse = {
    user: User;
}

export type User = {
    userId: string;
    email: string;
    name: string;
    surname: string;
};


export type UserRetrievalResult =
    | { tag: "success", user: UserResponse }
    | { tag: "not found" }
    | { tag: "error", error: string };
