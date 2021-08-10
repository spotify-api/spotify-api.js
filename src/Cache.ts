import type { PublicUser, PrivateUser, Artist, SimplifiedArtist } from "api-types";

/** Cache of users with raw api data. */
export const users = new Map<string, PublicUser | PrivateUser>();

/** Cache of artists with raw api data. */
export const artists = new Map<string, SimplifiedArtist | Artist>();