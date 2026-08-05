const HEADERS = { "Content-Type": "application/json" };

function resolveUrl(url: string): string {
  if (typeof window === "undefined" || /^https?:\/\//i.test(url)) {
    return url;
  }
  return new URL(url, window.location.origin).toString();
}

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(resolveUrl(url), {
    ...init,
    credentials: "include",
    headers: { ...HEADERS, ...init?.headers },
  });

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;
    try {
      const body = (await response.json()) as { error?: string };
      if (body.error) {
        message = body.error;
      }
    } catch {
      // ignore malformed error bodies
    }
    throw new ApiError(response.status, message);
  }

  return (await response.json()) as T;
}

export const api = {
  get: <T>(url: string) => request<T>(url),
  post: <T>(url: string, body?: unknown) =>
    request<T>(url, { method: "POST", body: body === undefined ? undefined : JSON.stringify(body) }),
};
