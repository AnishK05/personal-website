import { NextRequest } from 'next/server';
import { createOAuthClient, TokenData } from '@/lib/googleTokens';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  if (error || !code) {
    return new Response(errorPage('Google denied access or an error occurred. Please try again.'), {
      headers: { 'Content-Type': 'text/html' },
    });
  }

  try {
    const oauth2Client = createOAuthClient();
    const { tokens } = await oauth2Client.getToken(code);

    if (!tokens.access_token || !tokens.refresh_token) {
      return new Response(errorPage('OAuth succeeded but no tokens were returned. Try again with prompt=consent.'), {
        headers: { 'Content-Type': 'text/html' },
      });
    }

    const tokenData: TokenData = {
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      expiry_date: tokens.expiry_date ?? Date.now() + 3600 * 1000,
      token_type: tokens.token_type ?? 'Bearer',
      scope: tokens.scope ?? '',
    };

    const json = JSON.stringify(tokenData);

    return new Response(successPage(json), {
      headers: { 'Content-Type': 'text/html' },
    });
  } catch (err) {
    console.error('OAuth callback error:', err);
    return new Response(errorPage('Something went wrong during token exchange. Check server logs.'), {
      headers: { 'Content-Type': 'text/html' },
    });
  }
}

function successPage(json: string): string {
  const escaped = json.replace(/</g, '\\u003c').replace(/>/g, '\\u003e');
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>OAuth Complete</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #030712; color: #f3f4f6; font-family: ui-monospace, monospace; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }
    .card { background: #111827; border: 1px solid #374151; border-radius: 16px; padding: 32px; max-width: 560px; width: 100%; }
    .badge { display: inline-flex; align-items: center; gap: 8px; background: #052e16; border: 1px solid #166534; color: #4ade80; border-radius: 8px; padding: 6px 12px; font-size: 13px; margin-bottom: 20px; }
    h1 { font-size: 18px; font-weight: 600; color: #f9fafb; margin-bottom: 8px; }
    p { font-size: 13px; color: #9ca3af; line-height: 1.6; margin-bottom: 16px; }
    code { background: #1f2937; padding: 1px 5px; border-radius: 4px; font-size: 12px; color: #e5e7eb; }
    .token-box { position: relative; }
    textarea { width: 100%; background: #1f2937; border: 1px solid #374151; border-radius: 8px; padding: 12px; color: #d1d5db; font-size: 11px; font-family: ui-monospace, monospace; resize: none; height: 120px; outline: none; }
    .copy-btn { position: absolute; top: 8px; right: 8px; background: #374151; border: none; color: #d1d5db; padding: 4px 10px; border-radius: 6px; font-size: 11px; cursor: pointer; transition: background 0.15s; }
    .copy-btn:hover { background: #4b5563; }
    .steps { margin-top: 20px; border-top: 1px solid #1f2937; padding-top: 20px; }
    .step { display: flex; gap: 12px; margin-bottom: 12px; }
    .step-num { background: #1f2937; border: 1px solid #374151; color: #9ca3af; border-radius: 50%; width: 22px; height: 22px; display: flex; align-items: center; justify-content: center; font-size: 11px; flex-shrink: 0; margin-top: 1px; }
    .step p { margin: 0; }
    .back { display: block; text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px; text-decoration: none; }
    .back:hover { color: #9ca3af; }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge">
      <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
      OAuth successful
    </div>
    <h1>Copy your tokens</h1>
    <p>Google Calendar access granted. Copy the JSON below and add it as an environment variable named <code>GOOGLE_TOKENS_JSON</code> in both places:</p>
    <div class="token-box">
      <textarea id="tj" readonly>${escaped}</textarea>
      <button class="copy-btn" onclick="copy()">Copy</button>
    </div>
    <div class="steps">
      <div class="step">
        <div class="step-num">1</div>
        <p><strong style="color:#e5e7eb">Local dev:</strong> add <code>GOOGLE_TOKENS_JSON=&lt;paste&gt;</code> to <code>.env.local</code>, then restart the dev server.</p>
      </div>
      <div class="step">
        <div class="step-num">2</div>
        <p><strong style="color:#e5e7eb">Production:</strong> go to Vercel → Project Settings → Environment Variables → add <code>GOOGLE_TOKENS_JSON</code> → redeploy.</p>
      </div>
      <div class="step">
        <div class="step-num">3</div>
        <p>Visit <code>/private</code> to confirm the green checkmark.</p>
      </div>
    </div>
    <a href="/private" class="back">← Back to admin panel</a>
  </div>
  <script>
    function copy() {
      navigator.clipboard.writeText(document.getElementById('tj').value);
      document.querySelector('.copy-btn').textContent = 'Copied!';
      setTimeout(() => document.querySelector('.copy-btn').textContent = 'Copy', 2000);
    }
  </script>
</body>
</html>`;
}

function errorPage(message: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>OAuth Error</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #030712; color: #f3f4f6; font-family: ui-sans-serif, sans-serif; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }
    .card { background: #111827; border: 1px solid #374151; border-radius: 16px; padding: 32px; max-width: 400px; width: 100%; text-align: center; }
    .badge { display: inline-flex; align-items: center; gap: 8px; background: #450a0a; border: 1px solid #991b1b; color: #f87171; border-radius: 8px; padding: 6px 12px; font-size: 13px; margin-bottom: 20px; }
    p { font-size: 13px; color: #9ca3af; line-height: 1.6; margin-bottom: 20px; }
    a { color: #6b7280; font-size: 12px; text-decoration: none; }
    a:hover { color: #9ca3af; }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge">
      <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
      OAuth failed
    </div>
    <p>${message}</p>
    <a href="/private">← Back to admin panel</a>
  </div>
</body>
</html>`;
}
