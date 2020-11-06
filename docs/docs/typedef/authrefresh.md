# AuthRefresh
> Object structure returned by Auth.refresh.<br>
> 
> | PARAMETER   | TYPE    | DESCRIPTION    |
> |--------|---------|----------------|
> | access_token | [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string) | User access token |
> | token_type | [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string) | Type of the token |
> | expires_in | [number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/number) | Time in which the access_token expires |
> | refresh_token | [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string) | Token which you can use to refresh in options.code and get a new token using Auth.refresh method |
> | scope | [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/string) | Authorization scopes you have requested |