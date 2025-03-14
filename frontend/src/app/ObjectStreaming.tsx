import { experimental_useObject as useObject } from '@ai-sdk/react';
import { z } from 'zod';

const schema = z.object({
  name: z.string(),
  description: z.string(),
  traditions: z.array(z.string()),
});

function ObjectStreaming() {
  const {
    object: streamedObject,
    error: streamError,
    isLoading: isStreaming,
    submit: submitStream
  } = useObject({
    api: '/api/v1/stream-object',
    schema,
  });

  const {
    object: generatedObject,
    error: generateError,
    isLoading: isGenerating,
    submit: submitGenerate
  } = useObject({
    api: '/api/v1/generate-object',
    schema,
  });

  const object = streamedObject || generatedObject;
  const error = streamError || generateError;
  const isLoading = isStreaming || isGenerating;

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="flex gap-4">
        <button
          onClick={() => submitGenerate({})}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed flex-1"
        >
          {isGenerating ? 'Generating...' : 'Generate Holiday'}
        </button>
        <button
          onClick={() => submitStream({})}
          disabled={isLoading}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-green-300 disabled:cursor-not-allowed flex-1"
        >
          {isStreaming ? 'Streaming...' : 'Stream Holiday'}
        </button>
      </div>

      {isLoading && !object && (
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-24 bg-gray-200 rounded"></div>
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-6 bg-gray-200 rounded w-5/6"></div>
            ))}
          </div>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          <p>Sorry, something went wrong while generating the holiday.</p>
          <p className="text-sm mt-1 text-red-600">{error.message}</p>
        </div>
      )}

      {object && (
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            {object.name}
          </h1>
          
          <p className="text-lg text-gray-700 leading-relaxed">
            {object.description}
          </p>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Traditions</h2>
            <ul className="space-y-3">
              {object.traditions?.map((tradition, index) => (
                <li key={index} className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mr-3 mt-1">
                    {index + 1}
                  </span>
                  <span className="text-gray-700">{tradition}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default ObjectStreaming;
