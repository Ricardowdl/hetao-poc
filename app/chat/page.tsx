"use client"

import React, { Suspense, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ChatPage from '../components/ChatPage';
import { scripts } from '../scripts-data';
import type { Script, Message } from '../types';

const ChatContent: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const scriptId = searchParams.get('scriptId');

    const [selectedScript, setSelectedScript] = useState<Script | null>(null);
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, content: '欢迎来到剧本世界！请选择一个剧本开始你的冒险。', sender: 'ai' }
    ]);

    useEffect(() => {
        if (scriptId) {
            const script = scripts.find(s => s.id === parseInt(scriptId));
            if (script) {
                setSelectedScript(script);
                setMessages([
                    { id: 1, content: `欢迎来到${script.title}！故事即将开始...`, sender: 'ai' }
                ]);
            } else {
                // 如果找不到剧本，返回首页
                router.push('/');
            }
        } else {
            // 如果没有 scriptId，返回首页
            router.push('/');
        }
    }, [scriptId, router]);

    const handleSendMessage = (content: string) => {
        if (content.trim() === '') return;

        const newUserMessage: Message = {
            id: messages.length + 1,
            content: content,
            sender: 'user'
        };

        setMessages([...messages, newUserMessage]);
    };

    const handleReceiveAi = (content: string) => {
        setMessages(prev => [
            ...prev,
            { id: prev.length + 1, content, sender: 'ai' }
        ]);
    };

    if (!selectedScript) {
        return (
            <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
                <div className="text-gray-600">加载中...</div>
            </main>
        );
    }

    return (
        <main className="flex-grow container mx-auto px-4 py-8">
            <ChatPage
                selectedScript={selectedScript}
                messages={messages}
                onSendMessage={handleSendMessage}
                onReceiveAi={handleReceiveAi}
            />
        </main>
    );
};

const ChatRoute: React.FC = () => (
    <Suspense
        fallback={
            <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
                <div className="text-gray-600">加载中...</div>
            </main>
        }
    >
        <ChatContent />
    </Suspense>
);

export default ChatRoute;

