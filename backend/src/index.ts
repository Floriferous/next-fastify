import { openai } from '@ai-sdk/openai'
import { generateObject, streamObject } from 'ai'
import Fastify, { FastifyReply } from 'fastify'
import { z } from 'zod'
import dotenv from 'dotenv'

dotenv.config()

const fastify = Fastify({
  logger: {
    level: 'info',
    transport: {
      options: { ignore: 'pid,hostname', translateTime: 'HH:MM:ss Z' },
      target: 'pino-pretty',
    }
  },
})

// Declare a route
fastify.get('/api/v1/ping', async function handler (request, reply) {
  return { hello: 'world' }
});

const schema = z.object({
  name: z.string(),
  description: z.string(),
  traditions: z.array(z.string()),
});

const generate = async () => {
  const result = await generateObject({
    model: openai('gpt-4o-mini'),
    prompt: 'Invent a new holiday and describe 10 of its traditions.',
    schema,
  });
  return result.object;
}

const stream = async (reply: FastifyReply) => {
  const result = streamObject({
    model: openai('gpt-4o-mini'),
    prompt: 'Invent a new holiday and describe 10 of its traditions.',
    schema,
  });

  reply.header('X-Vercel-AI-Data-Stream', 'v1');
  reply.header("Content-Type", "text/event-stream");
  return reply.send(result.textStream)
}

fastify.post('/api/v1/stream-object', async function handler (request, reply) {
  return stream(reply);
})

fastify.post('/api/v1/generate-object', async function handler (request, reply) {
  return generate();
})

// Run the server!
const start = async () => {
  try {
    await fastify.listen({ port: 3001 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
