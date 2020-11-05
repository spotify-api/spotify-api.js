# AuthRefreshOptions
Auth.refresh options object structure.
> | PARAMETER   | TYPE    | DESCRIPTION    |
> |--------|---------|----------------|
> | client_id | <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string">string</a> | Your spotify app client id |
> | client_secret | <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string">string</a> | Your spotify app client secret |
> | code | <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string">string</a> | Code query sent by the spotify authorization. You can use the refresh_token also to get a new access_token. |
> | redirect_uri | <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string">string</a> | This redirect uri would not actually redirect you. This is only for validation. You need to enter the same uri/url used in the authorization link or Auth.build |