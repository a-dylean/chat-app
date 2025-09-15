## Mistral AI Chat

A small chat application using Next.js and public Mistral API.
User experience is enhanced with predefined prompt selection. This feature allows users to quickly choose from a list of options, such as text summarization, translation, or code explanation to reduce manual input and get better response.
Deployed with Vercel [here](https://chat-app-dun-phi.vercel.app/)

## Tech Stack
- Next.js 15 + React
- TypeScript
- Chakra UI
- Vitest

## Requirements
- Node.js >= 18.18.0 (or >= 20.x recommended)
- npm, pnpm, or yarn
- A Mistral API key (set `MISTRAL_API_KEY`)

## Quickstart
1) Install dependencies
```bash
npm install
```

2) Create a `.env` file at the project root with:
```bash
MISTRAL_API_KEY=your_api_key
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

