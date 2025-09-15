## Mistral AI Chat — Next.js + TypeScript

This is a small chat app using Next.js (App Router) and the public Mistral API.

## Tech Stack
- Next.js 15 (App Router) + React
- TypeScript
- Chakra UI
- Vitest for tests
- Mistral SDK (`@mistralai/mistralai`)

## Requirements
- Node.js >= 18.18.0 (or >= 20.x recommended)
- npm, pnpm, or yarn
- A Mistral API key (set `MISTRAL_API_KEY`)

## Quickstart
1) Install dependencies
```bash
npm install
```

2) Configure environment
Create a `.env` at the project root with:
```bash
MISTRAL_API_KEY=your_api_key_here
```

3) Run the app
```bash
npm run dev
```
Open http://localhost:3000

4) Run tests
```bash
npm test
```

Notes:
- Ensure your Node.js version satisfies Next.js requirements (>= 18.18.0).

## Usage
- Type a message and press Enter (or click Send) to get an assistant response.
- Messages persist in memory while the page is open.

## API
The app exposes a typed server route at `POST /api/chat`.

Request body
```json
{
  "messages": [
    { "role": "user", "content": "hi" }
  ],
}
```

Response body
```json
{ "content": "...assistant reply..." }
```

Example curl
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Hello"}]}'
```

