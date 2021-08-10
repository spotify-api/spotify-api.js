import type { PublicUser, PrivateUser } from "api-types";

/** Cache of users with raw api data. */
export const users = new Map<string, PublicUser | PrivateUser>();