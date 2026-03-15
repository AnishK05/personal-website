import { NextRequest, NextResponse } from 'next/server';
import { tokensExist } from '@/lib/googleTokens';

export async function GET(request: NextRequest) {
  const password = request.headers.get('x-private-password');

  if (password !== process.env.PRIVATE_ROUTE_PASSWORD) {
    return NextResponse.json({ authorized: false, connected: false }, { status: 401 });
  }

  return NextResponse.json({ authorized: true, connected: tokensExist() });
}
