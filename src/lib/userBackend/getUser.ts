import { PUBLIC_BACKEND_URL } from "$env/static/public";

type UserResponse = {
    user: User;
}

export type User = {
    userId: string;
    email: string;
    name: string;
    surname: string;
};

type UserNotFoundError = {
    error: string;
};

type UserRetrievalResult = UserResponse | UserNotFoundError | never;

export async function getUser(userId: string): Promise<UserRetrievalResult> {
    try {
        const response = await fetch(`${PUBLIC_BACKEND_URL}/user/${userId}`);
        if (!response.ok) {
            return {error: "User not found"} satisfies UserNotFoundError;
        }

        const user = await response.json() as UserResponse;
        return user;
    } catch (error) {
        console.error(error);
        return error as never;
    }
}
