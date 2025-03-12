import { openai } from '@ai-sdk/openai'
import { createDataStream, streamObject, streamText } from 'ai'
import Fastify from 'fastify'
import { z } from 'zod'

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
})

fastify.post('/api/v1/stream-object', async function handler (request, reply) {
  try {

  //  const dataStream = createDataStream({
  //   execute: async dataStreamWriter => {
  //     dataStreamWriter.writeData('initialized call');

  //     const result = await streamObject({
  //       model: openai('gpt-4o-mini'),
  //       prompt: 'Invent a new holiday and describe its traditions.',
  //       // schema: z.object({
  //       //   name: z.string(),
  //       //   description: z.string(),
  //       //   traditions: z.array(z.string()),
  //       // }),
  //       output: 'no-schema',
  //     });

  //     result.pipeTextStreamToResponse();

  //     // result.mergeIntoDataStream(dataStreamWriter);
  //   },
  //   onError: error => {
  //     // Error messages are masked by default for security reasons.
  //     // If you want to expose the error message to the client, you can do so here:
  //     return error instanceof Error ? error.message : String(error);
  //   },
  //  })

    const result = await streamObject({
      model: openai('gpt-4o-mini'),
      prompt: 'Invent a new holiday and describe its traditions.',
      schema: z.object({
        name: z.string(),
        description: z.string(),
        traditions: z.array(z.string()),
      }),
    });
    
    reply.header('X-Vercel-AI-Data-Stream', 'v1');
    reply.header('Content-Type', 'text/plain; charset=utf-8');
    return reply.send(result.toTextStreamResponse())
  } catch (error) {
    console.error('Error:', error);
    return reply.status(500).send({ error: 'Internal server error' });
  }
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
