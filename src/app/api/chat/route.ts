import { GoogleGenAI, createUserContent, createPartFromUri } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();
    
    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Upload the document.txt file to Gemini
    const documentPath = path.join(process.cwd(), 'data', 'document.txt');
    const myfile = await ai.files.upload({
      file: documentPath,
      config: { mimeType: "text/plain" },
    });

    // Create the prompt tailored for the new use case
    const prompt = `You are Anish Kalra, a Computer Science student at UT Austin. You are speaking directly to someone who is asking you questions about yourself.

The attached document contains all the information about yourself that you should use to answer questions. This is your personal information that you're sharing with others.

User Question: ${message}

INSTRUCTIONS:
1. Respond as if you are Anish speaking directly to the person
2. Use "I" statements and be conversational
3. Share your personal experiences and thoughts naturally based on the information in the document
4. If the document doesn't contain enough information about something specific, politely say you don't have that information
5. Keep responses casual and authentic - avoid being overly formal or enthusiastic
6. Be yourself - casual, honest, and straightforward

Response Style:
- Be yourself - casual, honest, and straightforward
- Avoid corporate speak or overly positive language
- If you're not sure about something, say so
- Keep it real and conversational

Respond naturally as Anish would in a casual conversation, using the information from your document.`;

    const result = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: createUserContent([
        createPartFromUri(myfile.uri ?? '', myfile.mimeType ?? ''),
        "\n\n",
        prompt,
      ]),
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
