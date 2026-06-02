import { google } from 'googleapis';

export interface TokenData {
  access_token?: string;
  refresh_token: string;
  expiry_date?: number;
  token_type?: string;
  scope?: string;
}

const REFRESH_SKEW_MS = 5 * 60 * 1000;

interface GoogleTokenError {
  message?: string;
  response?: {
    data?: {
      error?: string;
      error_description?: string;
      message?: string;
    };
  };
}

export function createOAuthClient() {
  const redirectUri =
    process.env.GOOGLE_REDIRECT_URI ??
    (process.env.NODE_ENV === 'production'
      ? 'https://anishkalra.com/api/google/callback'
      : 'http://localhost:3000/api/google/callback');

  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID!,
    process.env.GOOGLE_CLIENT_SECRET!,
    redirectUri
  );
}

export function tokensExist(): boolean {
  return !!readTokens();
}

export function readTokens(): TokenData | null {
  if (process.env.GOOGLE_REFRESH_TOKEN) {
    return { refresh_token: process.env.GOOGLE_REFRESH_TOKEN };
  }

  if (!process.env.GOOGLE_TOKENS_JSON) return null;
  try {
    const tokens = JSON.parse(process.env.GOOGLE_TOKENS_JSON) as TokenData;
    return tokens.refresh_token ? tokens : null;
  } catch {
    return null;
  }
}

export async function getAuthenticatedClient() {
  const tokens = readTokens();
  if (!tokens) throw new Error('No tokens found. Please authenticate via /private.');

  const oauth2Client = createOAuthClient();
  oauth2Client.setCredentials(tokens);

  // Use the refresh token as the durable secret. Access tokens are short-lived
  // and Vercel env vars cannot be updated at runtime.
  if (!tokens.access_token || !tokens.expiry_date || tokens.expiry_date < Date.now() + REFRESH_SKEW_MS) {
    const { token } = await oauth2Client.getAccessToken();
    if (!token) {
      throw new Error('Unable to refresh Google Calendar access token.');
    }
  }

  return oauth2Client;
}

export function isRefreshTokenError(error: unknown): boolean {
  const googleError = error as GoogleTokenError;
  const responseError = googleError.response?.data?.error ?? '';
  const description = googleError.response?.data?.error_description ?? '';
  const message = `${googleError.message ?? ''} ${description}`.toLowerCase();

  return (
    responseError === 'invalid_grant' ||
    message.includes('invalid_grant') ||
    message.includes('expired') ||
    message.includes('revoked')
  );
}

export async function getGoogleCalendarConnectionStatus(): Promise<{
  connected: boolean;
  message?: string;
}> {
  if (!tokensExist()) {
    return {
      connected: false,
      message: 'No Google refresh token is configured.',
    };
  }

  try {
    const auth = await getAuthenticatedClient();
    const calendar = google.calendar({ version: 'v3', auth });
    await calendar.calendarList.list({ maxResults: 1 });

    return { connected: true };
  } catch (error) {
    console.error('Google Calendar connection check failed:', error);

    if (isRefreshTokenError(error)) {
      return {
        connected: false,
        message:
          'Google rejected the refresh token. If this happens every 7 days, publish the OAuth consent screen to In production and re-authenticate once.',
      };
    }

    return {
      connected: false,
      message: 'Google Calendar credentials are configured, but the Calendar API check failed.',
    };
  }
}
