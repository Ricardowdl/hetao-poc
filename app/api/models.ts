export type ApiType = 'openai' | 'gemini' | 'custom';

const normalizeBase = (base: string) => base.replace(/\/$/, '');

export const fetchOpenAIModels = async (
  baseEndpoint: string,
  apiKey: string
): Promise<string[]> => {
  const base = normalizeBase(baseEndpoint);
  const url = base.endsWith('/v1') ? `${base}/models` : `${base}/v1/models`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `HTTP ${res.status}`);
  }
  const json = await res.json();
  const list = Array.isArray(json?.data) ? json.data : [];
  return list.map((m: any) => m.id).filter(Boolean);
};

export const fetchGeminiModels = async (
  baseEndpoint: string,
  apiKey: string
): Promise<string[]> => {
  const base = normalizeBase(baseEndpoint);
  const url = `${base}/v1/models?key=${encodeURIComponent(apiKey)}`;
  const res = await fetch(url, { method: 'GET' });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `HTTP ${res.status}`);
  }
  const json = await res.json();
  const list = Array.isArray(json?.models) ? json.models : [];
  return list.map((m: any) => m.name).filter(Boolean);
};

export const fetchModels = async (
  apiType: ApiType,
  baseEndpoint: string,
  apiKey: string
): Promise<string[]> => {
  if (apiType === 'gemini') {
    return fetchGeminiModels(baseEndpoint, apiKey);
  }
  return fetchOpenAIModels(baseEndpoint, apiKey);
};

