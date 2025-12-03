'use client'

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type ApiType = 'openai' | 'gemini' | 'custom';

export interface ApiSettings {
    apiType: ApiType;
    apiEndpoint: string;
    apiKey: string;
    model?: string;
}

interface ApiSettingsStore {
    settings: ApiSettings;
    update: (partial: Partial<ApiSettings>) => void;
    reset: () => void;
}

const defaultSettings: ApiSettings = {
    apiType: 'openai',
    apiEndpoint: '',
    apiKey: '',
    model: undefined,
};

export const useApiSettingsStore = create<ApiSettingsStore>()(
    persist(
        (set, get) => ({
            settings: defaultSettings,
            update: (partial) => set({ settings: { ...get().settings, ...partial } }),
            reset: () => set({ settings: defaultSettings }),
        }),
        {
            name: 'api-settings',
            storage: createJSONStorage(() => localStorage),
            version: 1,
        }
    )
);

