import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const genAI = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY! });

// Improved RAG implementation with better chunking and semantic search
function getRelevantContext(query: string, documentContent: string): string {
  // Split document into meaningful chunks
  const sections = documentContent.split('\n## ');
  const chunks: string[] = [];
  
  // Create chunks from each section
  for (const section of sections) {
    if (section.trim()) {
      const lines = section.split('\n').filter(line => line.trim());
      if (lines.length > 0) {
        // Create chunks of 3-5 lines for better context
        for (let i = 0; i < lines.length; i += 4) {
          const chunk = lines.slice(i, i + 4).join('\n');
          if (chunk.trim()) {
            chunks.push(chunk);
          }
        }
      }
    }
  }

  // Enhanced relevance scoring
  const queryLower = query.toLowerCase();
  const queryWords = queryLower.split(/\s+/).filter(word => word.length > 2);
  
  const scoredChunks = chunks.map(chunk => {
    let score = 0;
    const chunkLower = chunk.toLowerCase();
    
    // Exact phrase matching (highest priority)
    if (chunkLower.includes(queryLower)) {
      score += 100;
    }
    
    // Word matching with proximity bonus
    queryWords.forEach(word => {
      if (chunkLower.includes(word)) {
        score += 10;
        
        // Bonus for multiple word matches
        const wordCount = (chunkLower.match(new RegExp(word, 'g')) || []).length;
        score += wordCount * 2;
      }
    });
    
    // Section header matching (bonus for relevant sections)
    const sectionHeaders = ['education', 'experience', 'skills', 'projects', 'leadership', 'awards'];
    sectionHeaders.forEach(header => {
      if (chunkLower.includes(header) && queryWords.some(word => header.includes(word))) {
        score += 15;
      }
    });
    
    // Technical term matching
    const techTerms = ['python', 'react', 'ai', 'ml', 'machine learning', 'fastapi', 'aws', 'docker'];
    techTerms.forEach(term => {
      if (chunkLower.includes(term) && queryWords.some(word => term.includes(word))) {
        score += 8;
      }
    });
    
    return { chunk, score };
  });
  
  // Sort by score and return top relevant chunks
  scoredChunks.sort((a, b) => b.score - a.score);
  const relevantChunks = scoredChunks
    .filter(item => item.score > 0)
    .slice(0, 6) // Return top 6 most relevant chunks
    .map(item => item.chunk);
  
  return relevantChunks.join('\n\n');
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
    
    // Create the prompt with improved context and instructions
    const prompt = `You are Anish Kalra, a Computer Science student at UT Austin. You are speaking directly to someone who is asking you questions about yourself.

Use the following relevant information about yourself to answer questions:

${relevantContext}

User Question: ${message}

IMPORTANT INSTRUCTIONS:
1. Respond as if YOU are Anish speaking directly to the person
2. Use "I" statements and be conversational and friendly
3. Share your personal experiences and thoughts authentically
4. If the context doesn't contain enough information, draw from your general knowledge about being a CS student
5. Keep responses engaging but not overly formal
6. If asked about something not in your background, politely redirect to what you do know about yourself

Response Style Examples:
- "I'm currently studying Computer Science at UT Austin..."
- "In my experience working at Anvil Labs, I..."
- "One of my favorite projects was EcoReviveTX where I..."
- "I'm passionate about AI/ML and building agentic AI tools..."
- "When I'm not coding, I enjoy playing basketball and doing improv..."

Keep your response conversational, authentic, and true to who you are as Anish.`;

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
