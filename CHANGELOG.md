# Spotify-api.js Changelog

Version history of spotify-api.js since v4.0.5.

--

## v9.2.5

-   fix: properly reject the promise in client initialisation. [#167](https://github.com/spotify-api/spotify-api.js/pull/167)
-   fix: handle The access token expired api error and refresh token. [#189](https://github.com/spotify-api/spotify-api.js/issues/189) [#190](https://github.com/spotify-api/spotify-api.js/pull/190)
-   feat: add a parameter to getPlaylists to fetch all playlists at once. [#168](https://github.com/spotify-api/spotify-api.js/pull/168)

**Released:** 11th November 2022<br/>
**Status:** Recommended to use<br/>

---

## v9.2.3

-   fix: spelling in reorderItems for uris parameter. [#158](https://github.com/spotify-api/spotify-api.js/issues/158)
-   fix: documentation fix. [#160](https://github.com/spotify-api/spotify-api.js/pull/160)

**Released:** 31st July 2022<br/>
**Status:** Recommended to use<br/>

---

## v9.2.2

-   fix: fix several playlist create/edit API by using request body.

**Released:** 14th July 2022<br/>
**Status:** Recommended to use<br/>

---

## v9.2.1

-   fix(refreshToken): fix refresh token regeneration using only `refreshToken` field. [#83](https://github.com/spotify-api/spotify-api.js/issues/83#issuecomment-1140212527)

**Released:** 31st May 2022<br/>
**Status:** Recommended to use<br/>

---

## v9.2.0

-   fix(refreshToken): fix [Client.refreshFromMeta] error. [#83](https://github.com/spotify-api/spotify-api.js/issues/83#issuecomment-1122299829)

**Released:** 10th May 2022<br/>
**Status:** Recommended to use<br/>

---

## v9.1.0

-   feat(options): allow to input access token with refresh options in `token` field of `ClientOptions`.

**Example:**

```js
const client = await Client.create({
	userAuthorizedToken: true,
	refreshToken: true,
	token: {
		token: "access token here",
		// other details required to refresh the token...
		clientID: "client id",
		clientSecret: "client secret",
		redirectURL: "redirect url here",
	},
});
```

**Released:** 9th May 2022<br/>
**Status:** Recommended to use<br/>

---

## v9.0.3

-   fix(struct): fix undefined error while creating [CurrentlyPlaying] struct. [#107](https://github.com/spotify-api/spotify-api.js/pull/107).
-   feat(struct): [CurrentlyPlaying.context] may be null.

**Released:** 31st December 2021<br/>
**Status:** Recommended to use<br/>

---

## v9.0.2

-   fix(clientCreate): made [Client.create] function a public static function [#102](https://github.com/spotify-api/spotify-api.js/issues/102)

**Released:** 26th December 2021<br/>
**Status:** Good for use.<br/>

---

## v9.0.1

-   fix(refreshToken): fixed a security vulnerability on exposing the credentials in `Client.refreshMeta` (Especially for browser clients). [#68](https://github.com/spotify-api/spotify-api.js/issues/68#issuecomment-911526688).

**Released:** 2nd September 2021<br/>
**Status:** Good for use.<br/>

---

## v9.0.0

-   feat(compaitability): added compaitability for web and deno.
-   feat(recommendations): added `Get Recommendations` api [#58](https://github.com/spotify-api/spotify-api.js/issues/58).
-   fix(errors): made a better error handler to manage 429 requests and retry on rate limit.
-   perf(refreshToken): auto updaing refresh token feature by handelling 401 requests.
-   perf(cache): made cache global for all clients and used `Map` instead of custom instances.
-   refactor(getters): used readonly properties instead of using getters.
-   refactor(options): changed client options structure so that they can even enter clientID and clientSecret.
-   refactor(structures): made structures lightweight and removed client functions from it.
-   docs(\*): rewrote all the docs and used typedoc with custom theme.

**Released:** 26th August 2021<br/>
**Status:** Good for use. (Has a security vulnerablity for browser client)<br/>
**Root PR:** [#56](https://github.com/spotify-api/spotify-api.js/pull/56)

---

## v8.1.1

-   fix(body): fixed json body for `PlaylistManager.removeItems` method. [#38](https://github.com/spotify-api/spotify-api.js/issues/38).

**Released:** 22nd July 2021<br/>
**Status:** Good for use.

---

## v8.1.0

-   fix(refreshToken): fixed `refreshToken` field in `AuthManager` methods. [#32](https://github.com/spotify-api/spotify-api.js/issues/32).
-   fix(playlist): fixed `PlaylistManager.create` from creating the playlist public always [#35](https://github.com/spotify-api/spotify-api.js/pull/35).

**Released:** 23rd June 2021<br/>
**Status:** Good for use.

---

## v8.0.0

-   refactor(\*): rewrote the whole package code. ([reference](https://github.com/spotify-api/spotify-api.js/wiki/Migration-guide-for-v8)).

**Released:** 24th March 2021<br/>
**Status:** Good for use.

---

## v7.0.0

-   docs(\*): rewrote docs.
-   fix(typings): rewrote typings.
-   feat(deprecate): deprecated unwanted functions.

**Released:** 18th February 2021<br/>
**Status:** Not recommended for use but can work.

---

## v6.0.0

-   feat(cache): added flexible cache manager.
-   fix(uri): fixed encoded uri errors [#5](https://github.com/spotify-api/spotify-api.js/issues/10).
-   fix(bugs): v5 bug fixes.
-   fix(security): axios security fix update.

**Released:** 28th January 2021<br/>
**Status:** Not recommended for use.

---

## v5.0.0

-   feat(managers): added Browse, Episode, Search and Show methods to the client and default exports
-   fix(contribution): updated `contributing.md`.
-   perf(libs): removed unwanted `Client.libs` property.
-   feat(user): added user and player api with `UserClient` and `UserPlayer` class.
-   perf(token): no need of `Auth.build` to generate token, it can be built directly from `Client` constructor.
-   perf(options): `Auth.refresh` token parameter needs to be used in options in the name of code `options.code`.

**Released:** 6th November 2020<br/>
**Status:** Not good for use as it has major bugs.

---

## v4.1.0

-   style(unwantedCode): removed unwanted code from `v4.0.5`.
-   feat(exports): exports library files directly.
-   feat(options): "NO TOKEN" (default token option) which is no more required.
-   Default export will be a object containing all exports rather than Client!
-   docs(readme): Readme has es6 example.
-   feat(contributingGuide): added `contributing.md`.

**Released:** 31st August 2020<br/>
**Status:** Not good for use.

---

## v4.0.5

-   style(indents): changed code indents from 2 indents to 4 indents.
-   docs(\*): recreated documentation.
-   fix(bugs): fixed major bugs.

**Released:** 30th August 2020<br/>
**Status:** Not good for use.
