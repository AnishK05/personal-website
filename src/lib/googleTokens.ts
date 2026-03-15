import { google } from 'googleapis';

export interface TokenData {
  access_token: string;
  refresh_token: string;
  expiry_date: number;
  token_type?: string;
  scope?: string;
}

export function createOAuthClient() {
  const redirectUri =
    process.env.NODE_ENV === 'production'
      ? 'https://anishkalra.com/api/google/callback'
      : 'http://localhost:3000/api/google/callback';

  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID!,
    process.env.GOOGLE_CLIENT_SECRET!,
    redirectUri
  );
}

export function tokensExist(): boolean {
  return !!process.env.GOOGLE_TOKENS_JSON;
}

export function readTokens(): TokenData | null {
  if (!process.env.GOOGLE_TOKENS_JSON) return null;
  try {
    return JSON.parse(process.env.GOOGLE_TOKENS_JSON) as TokenData;
  } catch {
    return null;
  }
}

export async function getAuthenticatedClient() {
  const tokens = readTokens();
  if (!tokens) throw new Error('No tokens found. Please authenticate via /private.');

  const oauth2Client = createOAuthClient();
  oauth2Client.setCredentials(tokens);

  // Refresh if expired or within 5 minutes of expiry
  if (tokens.expiry_date && tokens.expiry_date < Date.now() + 5 * 60 * 1000) {
    const { credentials } = await oauth2Client.refreshAccessToken();
    oauth2Client.setCredentials({
      access_token: credentials.access_token!,
      refresh_token: credentials.refresh_token ?? tokens.refresh_token,
      expiry_date: credentials.expiry_date!,
    });
  }

  return oauth2Client;
}
