import { GoogleGenAI, createUserContent } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';
import { CALENDAR_TIME_ZONE, CALENDAR_TIME_ZONE_LABEL } from '@/lib/calendarConfig';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

interface HistoryTurn {
  role: 'user' | 'assistant';
  content: string;
}

export async function POST(request: NextRequest) {
  try {
    const { message, history = [] }: { message: string; history: HistoryTurn[] } =
      await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const documentPath = path.join(process.cwd(), 'data', 'document.txt');
    const documentText = await readFile(documentPath, 'utf-8');

    // Inject today's date in the scheduling timezone so the LLM can resolve relative dates.
    const todayLabel = new Date().toLocaleDateString('en-US', {
      timeZone: CALENDAR_TIME_ZONE,
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const systemPrompt = `You are Anish Kalra, a Computer Science student at UT Austin. Speak in first person to someone asking about you.

The document in this message is the only source of facts about you. Follow it, including how to sound. Answer the question; don't dump the file. If something isn't in the document, say you don't have that information.

Today's date (${CALENDAR_TIME_ZONE_LABEL} — Austin, TX): ${todayLabel}
All meeting times you discuss are in ${CALENDAR_TIME_ZONE_LABEL}. If you mention a time, say it is CT.

SCHEDULING:
Tokens are invisible to the user. Never mention them in your spoken response. Never use both in the same response. Put the token at the very end of your response, with nothing after it.

[SCHEDULE_MEETING]
- If the user expresses any intent to meet, schedule a call, set up a meeting, grab coffee, chat in person, or similar — and has NOT already been shown available times — respond naturally and warmly agreeing to help set something up, then append the exact token [SCHEDULE_MEETING].
- Do not include [SCHEDULE_MEETING] in any other context — only for initial meeting intent before times have been shown.

[CHECK_AVAILABILITY]
- If the user asks about availability on specific or relative dates (e.g., "are you free Friday?", "how about March 24?", "what about next Tuesday?", "none of these work, how about the 28th?"), resolve those dates to YYYY-MM-DD format using today's date as reference. Then append the exact token [CHECK_AVAILABILITY:YYYY-MM-DD]. For multiple dates, use a comma-separated list: [CHECK_AVAILABILITY:YYYY-MM-DD,YYYY-MM-DD].
- Only use [CHECK_AVAILABILITY] when you can confidently resolve the user's mentioned date(s) to specific calendar dates.
- If the user says "none of these times work" or similar but does NOT mention specific alternative dates, respond by asking them which dates or times would work better — do not append either token.`;

    // Build a multi-turn contents array so the LLM has conversation context.
    // Structure:
    //   turn 0 (user):  document text + system prompt
    //   turn 1 (model): brief acknowledgement to anchor the context
    //   turns 2..N:     alternating user/model from the conversation history
    //   final (user):   the current message
    const contents = [
      createUserContent([
        documentText,
        '\n\n',
        systemPrompt,
      ]),
      {
        role: 'model' as const,
        parts: [{ text: "Got it. I'll respond as Anish based on the document and these instructions." }],
      },
      ...history.map(turn => ({
        role: turn.role === 'user' ? ('user' as const) : ('model' as const),
        parts: [{ text: turn.content }],
      })),
      createUserContent(message),
    ];

    const result = await ai.models.generateContent({
      model: 'gemini-3.5-flash-lite',
      contents,
    });

    const text = result.text;
    if (!text) {
      return NextResponse.json({ error: 'No response generated' }, { status: 500 });
    }

    return NextResponse.json({ response: text as string });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
