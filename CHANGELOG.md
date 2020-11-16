# Spotify-api.js Changelog

Version history of spotify-api.js since v4.0.5

---

## v5.0.0

- Better documentation and updated readme
- Added Browse, Episode, Search and Show methods to the client and default exports
- Added the way of documentation contribution in contributing.md
- Removed Client.libs
- UserClient class added
- Auth.build no more needs options.client_secret to generate auth string
- Auth.refresh token parameter needs to be used in options in the name of code (options.code)
- Added UserPlayer class
- Updated Playlist and User class

**Status:** Published | **Released:** Released

---

## v4.1.0

- Cleaned the waste codes from v4.0.5
- Exports lib files directly
- No need of using 'NO TOKEN'. The class will use it when if you didnt provide a token!
- Default export will be a object containing all exports rather than Client!
- Readme.md has es6 imports example
- Added contributing.md so the people can know about repo before contributing

**Status:** Published | **Released:** 31st August 2020

---

## v4.0.5

- Made codes to 4 indents from 2 indents so that the code looks pretty
- More brief typedoc
- Fixed small bugs

**Status:** Published | **Released:** 30th August 2020
