"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [pingResult, setPingResult] = useState<{ hello?: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPing = async () => {
      try {
        const response = await fetch('/api/v1/ping');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPingResult(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to ping the server';
        setError(errorMessage);
        console.error('Ping error:', err);
      }
    };

    fetchPing();
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">API Ping Test</h1>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : pingResult ? (
          <p className="text-green-500">Server responded with: {JSON.stringify(pingResult)}</p>
        ) : (
          <p>Pinging server...</p>
        )}
      </div>
    </div>
  );
}
