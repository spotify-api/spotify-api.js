# AuthRefreshOptions
> Auth.refresh options object structure.<br>

> | PARAMETER   | TYPE    | DESCRIPTION    |
> |--------|---------|----------------|
> | client_id | [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string) | Your spotify app client id |
> | client_secret | [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string) | Your spotify app client secret |
> | code | [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string) | Code query sent by the spotify authorization. You can use the refresh_token also to get a new access_token. |
> | redirect_uri | [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string) | This redirect uri would not actually redirect you. This is only for validation. You need to enter the same uri/url used in the authorization link or Auth.build |