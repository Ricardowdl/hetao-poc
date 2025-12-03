"use client"

import React, { useEffect, useState } from 'react';
import { UserOutlined, RobotOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Input, Button } from 'antd';
import { useRouter } from 'next/navigation';
import type { Script, Message } from '../types';
import { useApiSettingsStore } from '../store/apiSettings';
import { sendChat } from '../api/chat';

interface ChatPageProps {
  selectedScript: Script | null;
  messages: Message[];
  onSendMessage: (content: string) => void;
  onReceiveAi: (content: string) => void;
}

const ChatPage: React.FC<ChatPageProps> = ({
  selectedScript,
  messages,
  onSendMessage,
  onReceiveAi
}) => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState('');
  const apiSettings = useApiSettingsStore((s) => s.settings);

  useEffect(() => {
    console.log('API设置', apiSettings);
  }, [apiSettings]);

  const handleBack = () => {
    router.push('/');
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() === '') return;
    const userText = inputValue;
    onSendMessage(userText);
    setInputValue('');

    try {
      const conversation: Message[] = [
        ...messages,
        { id: messages.length + 1, sender: 'user', content: userText },
      ];
      const reply = await sendChat(apiSettings, conversation);
      onReceiveAi(reply);
    } catch (error: any) {
      const msg = String(error?.message || 'AI调用失败');
      console.error('AI调用失败:', error);
      alert(msg);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-full flex flex-col">
      <div className="flex items-center mb-6">
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={handleBack}
          className="!rounded-button whitespace-nowrap mr-4"
        >
          返回剧本选择
        </Button>
        <h2 className="text-2xl font-bold text-gray-800">
          {selectedScript?.title || '剧本对话'}
        </h2>
      </div>

      <div className="flex-grow bg-white rounded-2xl shadow-lg p-6 mb-6 overflow-hidden flex flex-col">
        <div className="flex-grow overflow-y-auto mb-6 space-y-6 max-h-[calc(100vh-300px)] pr-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'ai' ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-4 ${message.sender === 'ai'
                  ? 'bg-gray-100 text-gray-800 rounded-tl-none'
                  : 'bg-blue-500 text-white rounded-tr-none'
                  }`}
              >
                <div className="flex items-start mb-1">
                  {message.sender === 'ai' ? (
                    <RobotOutlined className="mr-2 mt-1 text-blue-500" />
                  ) : (
                    <UserOutlined className="mr-2 mt-1 text-white" />
                  )}
                  <span className="font-medium">
                    {message.sender === 'ai' ? '剧本助手' : '你'}
                  </span>
                </div>
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t pt-4">
          <div className="flex">
            <Input.TextArea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onPressEnter={handleKeyPress}
              placeholder="输入你的行动指令，例如：推开门 / 向左走 / 询问老人..."
              autoSize={{ minRows: 2, maxRows: 4 }}
              className="flex-grow mr-4"
            />
            <Button
              type="primary"
              onClick={handleSendMessage}
              className="!rounded-button whitespace-nowrap self-end h-auto py-2"
            >
              发送
            </Button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="text-sm text-gray-500">快速指令：</span>
            {['查看周围', '与NPC对话', '检查物品', '向北前进'].map((action) => (
              <Button
                key={action}
                size="small"
                className="!rounded-button whitespace-nowrap"
                onClick={() => setInputValue(action)}
              >
                {action}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
