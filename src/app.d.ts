// See https://kit.svelte.dev/docs/types#app
import type { User } from "$backend/user/get/types"

// for information about these interfaces
declare global {
    namespace App {
        // interface Error {}
        interface Locals {
            user: User | undefined;
        }
        // interface PageData {}
        // interface Platform {}
    }
}

export { };
