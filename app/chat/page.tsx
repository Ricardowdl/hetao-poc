"use client"

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ChatPage from '../components/ChatPage';
import { scripts } from '../scripts-data';
import type { Script, Message } from '../types';

const ChatRoute: React.FC = () => {
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

        // 模拟AI回复
        setTimeout(() => {
            const aiResponses = [
                `你决定${content}。突然间，周围的环境开始发生变化...`,
                `你${content}了。一个神秘的声音在你耳边响起："勇敢的冒险者，你的选择将决定故事的走向..."`,
                `${content}之后，你发现前方出现了新的道路。你会如何选择？`,
                `随着你的行动"${content}"，剧情发生了意想不到的转折...`
            ];

            const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];

            const newAiMessage: Message = {
                id: messages.length + 2,
                content: randomResponse,
                sender: 'ai'
            };

            setMessages(prev => [...prev, newAiMessage]);
        }, 1000);
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
            />
        </main>
    );
};

export default ChatRoute;

