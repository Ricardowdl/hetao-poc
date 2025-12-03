import type { Message } from '../types';
import type { ApiSettings } from '../store/apiSettings';

const normalizeBase = (base: string) => base.replace(/\/$/, '');

const buildOpenAIUrl = (baseEndpoint: string) => {
  const base = normalizeBase(baseEndpoint);
  return base.endsWith('/v1') ? `${base}/chat/completions` : `${base}/v1/chat/completions`;
};

const buildGeminiUrl = (baseEndpoint: string, model: string, apiKey: string) => {
  const base = normalizeBase(baseEndpoint);
  return `${base}/v1/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;
};

const toOpenAIMessages = (messages: Message[]) =>
  messages.map((m) => ({
    role: m.sender === 'ai' ? 'assistant' : 'user',
    content: m.content,
  }));

const toGeminiContents = (messages: Message[]) =>
  messages.map((m) => ({
    role: m.sender === 'ai' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));

export const sendOpenAIChat = async (settings: ApiSettings, messages: Message[]): Promise<string> => {
  const url = buildOpenAIUrl(settings.apiEndpoint);
  const body = JSON.stringify({
    model: settings.model,
    messages: toOpenAIMessages(messages),
  });
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${settings.apiKey}`,
      'Content-Type': 'application/json',
    },
    body,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `HTTP ${res.status}`);
  }
  const json = await res.json();
  const choice = json?.choices?.[0];
  const content = choice?.message?.content ?? choice?.delta ?? '';
  if (!content) throw new Error('未获取到AI回复');
  return content;
};

export const sendGeminiChat = async (settings: ApiSettings, messages: Message[]): Promise<string> => {
  if (!settings.model) throw new Error('未选择模型');
  const url = buildGeminiUrl(settings.apiEndpoint, settings.model, settings.apiKey);
  const body = JSON.stringify({ contents: toGeminiContents(messages) });
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `HTTP ${res.status}`);
  }
  const json = await res.json();
  const candidate = json?.candidates?.[0];
  const parts = candidate?.content?.parts ?? candidate?.output_text ?? [];
  const text = Array.isArray(parts)
    ? parts.map((p: any) => p?.text).filter(Boolean).join('\n')
    : String(parts || '');
  if (!text) throw new Error('未获取到AI回复');
  return text;
};

export const sendChat = async (settings: ApiSettings, messages: Message[]): Promise<string> => {
  if (!settings.apiEndpoint || !settings.apiKey || !settings.model) {
    throw new Error('API设置不完整');
  }
  if (settings.apiType === 'gemini') return sendGeminiChat(settings, messages);
  return sendOpenAIChat(settings, messages);
};

