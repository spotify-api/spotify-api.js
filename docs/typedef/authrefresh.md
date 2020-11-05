# AuthRefresh
Object structure returned by Auth.refresh.
> | PARAMETER   | TYPE    | DESCRIPTION    |
> |--------|---------|----------------|
> | access_token | <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string">string</a> | User access token |
> | token_type | <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string">string</a> | Type of the token |
> | expires_in | <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/number">number</a> | Time in which the access_token expires |
> | refresh_token | <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string">string</a> | Token which you can use to refresh in options.code and get a new token using Auth.refresh method |
> | scope | <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string">string</a> | Authorization scopes you have requested |