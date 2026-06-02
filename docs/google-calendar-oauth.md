# Google Calendar OAuth setup

The AI secretary uses Google Calendar with an OAuth refresh token. Access tokens expire quickly,
but refresh tokens can mint new access tokens without user interaction.

## Fix for weekly token expiration

If Calendar access stops working about every 7 days, the Google Cloud OAuth consent screen is
most likely still in **Testing**. Google intentionally expires refresh tokens after 7 days for
external apps in Testing when Calendar scopes are requested.

To make the token durable:

1. Open Google Cloud Console for the project that owns `GOOGLE_CLIENT_ID`.
2. Go to **APIs & Services -> OAuth consent screen**.
3. Change the publishing status to **In production**.
   - Calendar scopes are sensitive, so Google may show an unverified-app warning or request
     verification for public use. For a personal, single-user site, publishing removes the
     tester refresh-token lifetime limit.
4. Re-authenticate from `/private` after publishing. Tokens created while the app was in Testing
   keep the 7-day limit.
5. Store the new refresh token in Vercel as `GOOGLE_REFRESH_TOKEN`, then redeploy once.

If a newly issued production token still expires weekly, create a new OAuth client after publishing
the consent screen, update `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`, and re-authenticate.

## Environment variables

Required:

- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GOOGLE_REFRESH_TOKEN`

Optional:

- `GOOGLE_REDIRECT_URI` - override the default callback URL.
- `GOOGLE_TOKENS_JSON` - legacy token JSON from the old callback flow. This still works, but
  `GOOGLE_REFRESH_TOKEN` is preferred because the refresh token is the only long-lived secret the
  app needs.

## How the app uses the token

`src/lib/googleTokens.ts` creates an OAuth client, loads the refresh token, and asks Google for a
fresh access token whenever the current access token is missing or near expiry. The refreshed
access token is used in memory for that request; it is not written back to Vercel because runtime
code cannot mutate deployed environment variables.

The `/private` admin panel now performs a lightweight Calendar API check. A green check means the
configured token can currently access Google Calendar; a red check means the token is missing,
revoked, expired, or rejected by Google.
