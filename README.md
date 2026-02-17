# LLM Training Visualization for Medical Students

An interactive web application that visualizes how Large Language Models work, specifically designed for medical education. Compare foundation models, fine-tuned medical models, and RAG-based systems.

## Features

- **Three Model Types**:
  - **Foundation Model**: Standard GPT-4 with general knowledge
  - **Fine-tuned Medical Model**: Simulated Med-PaLM with specialized medical knowledge
  - **RAG Model**: Retrieval-Augmented Generation using a medical corpus

- **Interactive Learning**:
  - Real-time LLM inference with OpenAI API
  - Medical corpus with 10+ pre-loaded documents
  - Detailed response metadata (latency, tokens, cost)
  - Document retrieval visualization for RAG

- **Educational Focus**:
  - Clear explanations of each model type
  - Example medical prompts
  - Corpus statistics and insights

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- An OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to the URL shown (typically http://localhost:5173)

4. Click "Set API Key" in the header and enter your OpenAI API key

### Usage

1. **Set your API key**: Click the "Set API Key" button and enter your OpenAI API key (stored locally in browser)

2. **Select a model type**: Choose between Foundation, Fine-tuned, or RAG model

3. **Ask a question**: Enter a medical question or select an example prompt

4. **View the response**: See the LLM's response with metadata

5. **For RAG**: View which documents were retrieved to answer your question

## Technology Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **State**: Zustand + React Query
- **LLM**: OpenAI API (GPT-4, embeddings)

## API Costs

- GPT-4: ~$0.01-0.03 per request
- Embeddings: ~$0.00002 per document
- Typical session: $0.10-0.50

Response caching minimizes redundant API calls.

## Project Structure

```
src/
├── components/       # React components
├── hooks/           # Custom React hooks
├── stores/          # Zustand state management
├── services/        # API, embeddings, RAG
├── types/           # TypeScript definitions
└── data/            # Medical corpus samples
```

## License

Educational project. Use responsibly.
