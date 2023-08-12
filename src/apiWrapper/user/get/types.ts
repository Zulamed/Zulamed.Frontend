export type UserResponse = {
    user: User;
}

export type User = {
    id: string;
    email: string;
    name: string;
    surname: string;
};


export type UserRetrievalResult =
    | { tag: "success", user: UserResponse }
    | { tag: "not found" }
    | { tag: "error", error: string };
