# Next.js + Fastify AI Streaming Demo

This project demonstrates AI streaming capabilities using a modern stack with Next.js for the frontend and Fastify for the backend. It showcases the implementation of AI streaming with object-structured responses using OpenAI's models.

## Project Structure

The project is organized into two main directories:

- `frontend/`: A Next.js application that provides the user interface
- `backend/`: A Fastify server that handles AI requests and streams responses

## Features

- Server health endpoint check (/api/v1/ping)
- OpenAI integration with structured schema validation using Zod
- Real-time streaming of AI-generated content
- Object streaming with typed responses
- Modern React components with TypeScript

## Technologies Used

### Frontend
- Next.js 15.2.2
- React 19
- TypeScript
- Tailwind CSS
- AI SDK for React

### Backend
- Fastify
- TypeScript
- OpenAI SDK
- Zod for schema validation
- AI data streaming utilities

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/next-fastify.git
cd next-fastify
```

2. Install frontend dependencies
```bash
cd frontend
npm install
```

3. Install backend dependencies
```bash
cd ../backend
npm install
```

### Configuration

1. Create a `.env` file in the backend directory based on `.env.example`
```bash
cp backend/.env.example backend/.env
```

2. Add your OpenAI API key to the `.env` file

### Running the Application

1. Start the backend server
```bash
cd backend
npm start
```

2. Start the frontend development server
```bash
cd frontend
npm start
```

3. Access the application at http://localhost:3000

## Usage

The application demonstrates a simple AI-powered holiday generator. When you click the "Generate" button, it sends a request to the backend which streams a structured response containing:

- A holiday name
- A description
- A list of traditions

## License

[ISC License](LICENSE)
