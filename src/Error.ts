import { AxiosError, AxiosResponse } from "axios";

/**
 * This error mostly occurs when the spotify api responses an invalid json format!
 * You can view up all the spotify web api responses, request types, etc [here](https://developer.spotify.com/documentation/web-api/)
 */
export class SpotifyAPIError extends Error {
	/**
	 * The response from the axios if the error is based on the failiure of request.
	 */
	public response?: AxiosResponse;

	/**
	 * This error mostly occurs when the spotify api responses an invalid json format!
	 * You can view up all the spotify web api responses, request types, etc [here](https://developer.spotify.com/documentation/web-api/)
	 *
	 * @param message Error message or axios response.
	 */
	public constructor(response: AxiosError | string) {
		if (typeof response == "string") super(response);
		else {
			super(JSON.stringify(response.response?.data));
			this.response = response.response;
		}

		this.name = "SpotifyAPIError";
	}
}
