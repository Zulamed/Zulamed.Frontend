export type UserResponse = {
    user: User;
}

export type User = {
    userId: string;
    email: string;
    name: string;
    surname: string;
};

export type UserNotFoundError = {
    error: string;
};

export type UserRetrievalResult = UserResponse | UserNotFoundError | never;
