import { NextResponse } from 'next/server';
import { createOAuthClient } from '@/lib/googleTokens';

const SCOPES = [
  'https://www.googleapis.com/auth/calendar.readonly',
  'https://www.googleapis.com/auth/calendar.events',
];

export async function GET() {
  const oauth2Client = createOAuthClient();

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    prompt: 'consent',
  });

  return NextResponse.redirect(authUrl);
}
