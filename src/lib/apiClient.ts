export async function apiPost<T, B>(endpoint: string, body: B): Promise<T> {
  const res = await fetch("/api/proxy", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ endpoint, body }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API Error: ${res.status} - ${text}`);
  }

  return (await res.json()) as T;
}