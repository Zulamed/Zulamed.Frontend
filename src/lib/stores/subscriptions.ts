import type { Subscription } from "$backend/user/getSubscriptions";
import { writable } from "svelte/store";

export const subscriptions = writable<Subscription[]>([]);
