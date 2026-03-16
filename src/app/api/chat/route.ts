import { GoogleGenAI, createUserContent, createPartFromUri } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

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

    // Upload the document.txt file to Gemini
    const documentPath = path.join(process.cwd(), 'data', 'document.txt');
    const myfile = await ai.files.upload({
      file: documentPath,
      config: { mimeType: 'text/plain' },
    });

    // Inject today's date in CT so the LLM can resolve relative dates
    const todayLabel = new Date().toLocaleDateString('en-US', {
      timeZone: 'America/Chicago',
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const systemPrompt = `You are Anish Kalra, a Computer Science student at UT Austin. You are speaking directly to someone who is asking you questions about yourself.

The attached document contains all the information about yourself that you should use to answer questions. This is your personal information that you're sharing with others.

Today's date (Central Time): ${todayLabel}

INSTRUCTIONS:
1. Respond as if you are Anish speaking directly to the person
2. Use "I" statements and be conversational
3. Share your personal experiences and thoughts naturally based on the information in the document
4. If the document doesn't contain enough information about something specific, politely say you don't have that information
5. Keep responses casual and authentic - avoid being overly formal or enthusiastic
6. Be yourself - casual, honest, and straightforward
7. Don't just dump all the information in the document, use it to craft a response that is natural and conversational and answers the user's question

Response Style:
- Be yourself - casual, honest, and straightforward
- Avoid corporate speak or overly positive language
- If you're not sure about something, say so
- Keep it real and conversational

SCHEDULING INSTRUCTIONS:
- If the user expresses any intent to meet, schedule a call, set up a meeting, grab coffee, chat in person, or similar — and has NOT already been shown available times — respond naturally and warmly agreeing to help set something up, then append the exact token [SCHEDULE_MEETING] on its own at the very end of your response with nothing after it.
- Do not include [SCHEDULE_MEETING] in any other context — only for initial meeting intent before times have been shown.
- Do not mention the token in your spoken response; it is invisible to the user.

AVAILABILITY CHECK INSTRUCTIONS:
- If the user asks about availability on specific or relative dates (e.g., "are you free Friday?", "how about March 24?", "what about next Tuesday?", "none of these work, how about the 28th?"), resolve those dates to YYYY-MM-DD format using today's date as reference. Then append the exact token [CHECK_AVAILABILITY:YYYY-MM-DD] at the very end of your response. For multiple dates, use a comma-separated list: [CHECK_AVAILABILITY:YYYY-MM-DD,YYYY-MM-DD].
- Only use [CHECK_AVAILABILITY] when you can confidently resolve the user's mentioned date(s) to specific calendar dates.
- If the user says "none of these times work" or similar but does NOT mention specific alternative dates, respond by asking them which dates or times would work better — do not append either token.
- Never use both [SCHEDULE_MEETING] and [CHECK_AVAILABILITY] in the same response.
- Do not mention these tokens in your spoken response; they are invisible to the user.

Respond naturally as Anish would in a casual conversation, using the information from your document.`;

    // Build a multi-turn contents array so the LLM has conversation context.
    // Structure:
    //   turn 0 (user):  document file + system prompt
    //   turn 1 (model): brief acknowledgement to anchor the context
    //   turns 2..N:     alternating user/model from the conversation history
    //   final (user):   the current message
    const contents = [
      createUserContent([
        createPartFromUri(myfile.uri ?? '', myfile.mimeType ?? ''),
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
      model: 'gemini-2.5-flash',
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
