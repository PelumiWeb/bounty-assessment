const BASE_URL = 'https://fakestoreapi.com';

/** Normalised error so the UI never has to inspect raw fetch/network failures. */
export class ApiError extends Error {
  constructor(
    message: string,
    readonly status?: number,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function apiGet<T>(path: string, signal?: AbortSignal): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${BASE_URL}${path}`, { signal });
  } catch {
    throw new ApiError('Network request failed. Check your connection and try again.');
  }

  if (!response.ok) {
    throw new ApiError(`Request failed (HTTP ${response.status}).`, response.status);
  }

  return (await response.json()) as T;
}
