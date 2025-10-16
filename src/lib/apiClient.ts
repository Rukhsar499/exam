// lib/apiClient.ts

export const API_BASE = process.env.NEXT_PUBLIC_API_BASE as string;

/**
 * Generic type for successful or failed API responses
 */
export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; status: number; error: { message: string; details?: unknown } };

/**
 * Safe fetch wrapper with built-in JSON parsing and error handling
 */
export async function apiFetch<T>(
  path: string,
  opts: RequestInit = {}
): Promise<ApiResult<T>> {
  const url = `${API_BASE}${path}`;
  const fetchOpts: RequestInit = {
    credentials: "include", // Include cookies (important for auth)
    headers: {
      "Content-Type": "application/json",
      ...(opts.headers || {}),
    },
    ...opts,
  };

  try {
    const res = await fetch(url, fetchOpts);
    const text = await res.text();

    // Try parsing JSON safely
    let data: unknown = null;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = text;
    }

    if (res.ok) {
      return { ok: true, data: data as T };
    }

    // Infer error message type safely
    const errorMessage =
      typeof data === "object" && data && "message" in data
        ? (data as { message: string }).message
        : res.statusText;

    return {
      ok: false,
      status: res.status,
      error: { message: errorMessage, details: data },
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown network error";
    return { ok: false, status: 0, error: { message } };
  }
}
