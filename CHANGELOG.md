# Spotify-api.js Changelog

Version history of spotify-api.js since v4.0.5. Only major releases are presented here.

---

## v8.0.0

- refactor(*): rewrote the whole package code. ([reference](https://github.com/spotify-api/spotify-api.js/wiki/Migration-guide-for-v8)).

**Released:** 24th March 2021<br/>
**Status:** Good for use.

---

## v7.0.0

- docs(*): rewrote docs.
- fix(typings): rewrote typings.
- feat(deprecate): deprecated unwanted functions.

**Released:** 18th February 2021<br/>
**Status:** Not recommended for use but can work.

---

## v6.0.0

- feat(cache): added flexible cache manager.
- fix(uri): fixed encoded uri errors [#5](https://github.com/spotify-api/spotify-api.js/issues/10).
- fix(bugs): v5 bug fixes.
- fix(security): axios security fix update.

**Released:** 28th January 2021<br/>
**Status:** Not recommended for use.

---

## v5.0.0

- feat(managers): added Browse, Episode, Search and Show methods to the client and default exports
- fix(contribution): updated `contributing.md`.
- perf(libs): removed unwanted `Client.libs` property.
- feat(user): added user and player api with `UserClient` and `UserPlayer` class.
- perf(token): no need of `Auth.build` to generate token, it can be built directly from `Client` constructor.
- perf(options): `Auth.refresh` token parameter needs to be used in options in the name of code `options.code`.

**Released:** 6th November 2020<br/>
**Status:** Not good for use as it has major bugs.

---

## v4.1.0

- style(unwantedCode): removed unwanted code from `v4.0.5`.
- feat(exports): exports library files directly.
- feat(options): "NO TOKEN" (default token option) which is no more required.
- Default export will be a object containing all exports rather than Client!
- docs(readme): Readme has es6 example.
- feat(contributingGuide): added `contributing.md`.

**Released:** 31st August 2020<br/>
**Status:** Not good for use.

---

## v4.0.5

- style(indents): changed code indents from 2 indents to 4 indents.
- docs(*): recreated documentation.
- fix(bugs): fixed major bugs.

**Released:** 30th August 2020<br/>
**Status:** Not good for use.