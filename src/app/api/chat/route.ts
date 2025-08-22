import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const genAI = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY! });

// Simple RAG implementation
function getRelevantContext(query: string, documentContent: string): string {
  const lines = documentContent.split('\n');
  const relevantLines: string[] = [];
  
  // Simple keyword matching - in production you'd want more sophisticated semantic search
  const queryLower = query.toLowerCase();
  
  for (const line of lines) {
    if (line.toLowerCase().includes(queryLower) || 
        queryLower.includes(line.toLowerCase().split(' ')[0])) {
      relevantLines.push(line);
    }
  }
  
  return relevantLines.slice(0, 10).join('\n'); // Return top 10 relevant lines
}

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();
    
    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Read the document.txt file for RAG
    const documentPath = path.join(process.cwd(), 'data', 'document.txt');
    const documentContent = fs.readFileSync(documentPath, 'utf-8');
    
    // Get relevant context from the document
    const relevantContext = getRelevantContext(message, documentContent);
    
                // Create the prompt with context
            const prompt = `You are Anish, a Computer Science and Business student at UT Austin. You are speaking directly to someone who is asking you questions about yourself. 

        Use the following information about yourself to answer questions:

        ${relevantContext}

        User Question: ${message}

        IMPORTANT: Respond as if YOU are Anish speaking directly to the person. Use "I" statements, be conversational and friendly, and share your personal experiences and thoughts. 

        Examples of how to respond:
        - "I'm currently studying Computer Science and Business at UT Austin..."
        - "In my experience, I've found that..."
        - "One of my favorite projects was..."
        - "I'm passionate about AI/ML and agentic AI..."
        - "When I'm not coding, I enjoy..."

        Keep responses conversational, engaging, and authentic to who you are. If someone asks about something not in your background, politely redirect to what you do know about yourself.`;

    const result = await genAI.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }]
        }
      ]
    });
    
    const text = result.text || '';
    
    return NextResponse.json({ response: text });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}
