'use client';
import { useState } from 'react';
import { apiFetch } from '@/lib/apiClient';
import { useRouter } from 'next/navigation';

interface VerifyResponse {
  success: boolean;
  message: string;
}

interface VerifyPageProps {
  searchParams?: { email?: string };
}

export default function VerifyPage({ searchParams }: VerifyPageProps) {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const router = useRouter();
  const email = searchParams?.email || '';

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg(null);

    try {
      // ✅ type-safe API call
      const res = await apiFetch<VerifyResponse>('/verify', {
        method: 'POST',
        body: JSON.stringify({ email, code }),
      });

      if (res.ok) {
        router.push('/dashboard'); // assume backend sets HTTPOnly cookie or token
      } else {
        setMsg(res.error?.message || 'Verification failed');
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unexpected error';
      setMsg(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Verify account</h2>
      <form onSubmit={submit} className="space-y-4">
        <input
          placeholder="Enter verification code"
          value={code}
          onChange={e => setCode(e.target.value)}
          className="w-full p-3 border rounded"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full p-3 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          {loading ? 'Verifying...' : 'Verify'}
        </button>
        {msg && <p className="text-sm mt-2 text-red-600">{msg}</p>}
      </form>
    </div>
  );
}
