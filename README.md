# Personal Website with AI Chatbot

A modern personal website built with Next.js, featuring an AI chatbot powered by Google Gemini that can answer questions about your background, skills, experience, and projects using RAG (Retrieval-Augmented Generation).

## Features

- 🤖 **AI Chatbot Interface**: ChatGPT-like interface powered by Google Gemini
- 🎨 **Dark Theme**: Beautiful dark theme with orange and blue accent colors
- 📱 **Responsive Design**: Works perfectly on all devices
- 🚀 **Quick Actions**: Pre-built buttons for common questions
- 📄 **RAG Implementation**: Simple document-based retrieval system
- ⚡ **Next.js 15**: Built with the latest Next.js features
- 🎯 **Vercel Ready**: Optimized for Vercel deployment

## Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui
- **AI**: Google Gemini API
- **Styling**: Tailwind CSS with custom color scheme
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd personal-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` and add your Google Gemini API key:
   ```env
   GOOGLE_API_KEY=your_actual_api_key_here
   ```

4. **Customize your information**
   - Edit `data/document.txt` with your personal information
   - Update the content to include your background, skills, experience, and projects

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Configuration

### Google Gemini API

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add it to your `.env.local` file

### Personal Information

Edit `data/document.txt` to include:
- About me section
- Skills and technologies
- Work experience
- Projects
- Education
- Interests

The AI will use this information to answer questions about you.

## Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Connect your GitHub repository to Vercel
   - Add environment variable: `GOOGLE_API_KEY`
   - Deploy!

### Environment Variables for Production

Make sure to set these in your Vercel dashboard:
- `GOOGLE_API_KEY`: Your Google Gemini API key

## Customization

### Colors

The theme uses a dark color scheme with orange and blue accents. You can customize these in:
- `src/app/globals.css` - CSS variables
- Component files - Tailwind classes

### Styling

- **Primary Colors**: Orange (`orange-400`, `orange-500`, `orange-600`)
- **Secondary Colors**: Blue (`blue-400`, `blue-500`, `blue-600`)
- **Background**: Dark grays (`gray-900`, `gray-950`)
- **Text**: Light grays (`gray-100`, `gray-200`, `gray-400`)

## Project Structure

```
personal-website/
├── src/
│   ├── app/
│   │   ├── api/chat/          # Chat API endpoint
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/
│   │   ├── ui/                # shadcn/ui components
│   │   └── ChatInterface.tsx  # Main chat component
│   └── lib/
│       └── utils.ts           # Utility functions
├── data/
│   └── document.txt           # Your personal information
├── public/                    # Static assets
└── package.json
```

## Features in Detail

### Chat Interface
- Real-time chat with AI
- Message history
- Loading states
- Error handling
- Responsive design

### Quick Actions
- Pre-built buttons for common questions
- Instant access to key information
- Customizable actions

### RAG System
- Simple document retrieval
- Context-aware responses
- Keyword-based matching
- Easy to extend

## Troubleshooting

### Common Issues

1. **API Key Error**
   - Ensure `GOOGLE_API_KEY` is set in `.env.local`
   - Check API key validity in Google AI Studio

2. **Build Errors**
   - Clear `.next` folder: `rm -rf .next`
   - Reinstall dependencies: `npm install`

3. **Styling Issues**
   - Ensure Tailwind CSS is properly configured
   - Check for CSS conflicts

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you encounter any issues or have questions:
1. Check the troubleshooting section
2. Review the Google Gemini API documentation
3. Open an issue on GitHub

---

Built with ❤️ using Next.js and Google Gemini AI
