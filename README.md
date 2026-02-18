# Image Content Analyzer

A full-stack web application that analyzes image content using OpenAI's Vision API. Users can upload images and receive descriptive tags with confidence scores, displayed in a catalog-style interface.

## Technologies

- **Backend**: Node.js 20, Express 4, Multer, OpenAI SDK
- **Frontend**: React 18, TypeScript, Vite
- **Testing**: Jest, Supertest
- **Containerization**: Docker, docker-compose

## Project Structure

```
├── backend/
│   ├── src/
│   │   ├── index.js                  # Express server entry point
│   │   ├── routes/analyze.js         # POST /api/analyze endpoint
│   │   ├── middleware/
│   │   │   ├── uploadValidator.js    # Multer config with file validation
│   │   │   └── errorHandler.js       # Centralized error handling
│   │   └── services/
│   │       └── openaiService.js      # OpenAI Vision API integration
│   └── tests/
│       └── analyze.test.js           # Integration tests
├── frontend/
│   └── src/
│       ├── App.tsx                   # Main application component
│       ├── components/               # UI components (Navbar, ImageGrid, etc.)
│       ├── services/api.ts           # API client
│       └── types/index.ts            # TypeScript interfaces
├── docker-compose.yml
└── README.md
```

## Prerequisites

- Node.js 20+
- An OpenAI API key with access to GPT-4o

## Getting Started

### 1. Clone the repository

```bash
git clone <repo-url>
cd kushki
```

### 2. Backend setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` and add your OpenAI API key:

```
OPENAI_API_KEY=sk-your-key-here
PORT=3001
FRONTEND_URL=http://localhost:5173
```

Start the backend:

```bash
npm run dev
```

The server will start on `http://localhost:3001`.

### 3. Frontend setup

In a separate terminal:

```bash
cd frontend
npm install
npm run dev
```

The app will open at `http://localhost:5173`. The Vite dev server proxies `/api` requests to the backend automatically.

### 4. Running with Docker

If you prefer Docker:

```bash
OPENAI_API_KEY=sk-your-key-here docker-compose up --build
```

The application will be available at `http://localhost`.

## Running Tests

```bash
cd backend
npm test
```

Tests cover:
- Health check endpoint
- File validation (missing file, wrong type, file too large)
- Successful analysis with mocked OpenAI service

## API Reference

### POST /api/analyze

Analyzes an uploaded image and returns descriptive tags.

**Request**: `multipart/form-data` with an `image` field.

Supported formats: JPEG, PNG, GIF, WebP (max 10MB).

**Response**:

```json
{
  "tags": [
    { "label": "Dog", "confidence": 0.98 },
    { "label": "Golden Retriever", "confidence": 0.95 },
    { "label": "Park", "confidence": 0.91 }
  ]
}
```

### GET /api/health

Returns `{ "status": "ok" }`.

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| `OPENAI_API_KEY` | OpenAI API key (required) | - |
| `PORT` | Backend port | `3001` |
| `FRONTEND_URL` | Allowed CORS origin | `http://localhost:5173` |
| `VITE_API_URL` | Frontend API base URL | `/api` (proxied) |
