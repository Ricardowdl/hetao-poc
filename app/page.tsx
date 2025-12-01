"use client"

import React, { useState } from 'react';
import { UserOutlined, RobotOutlined, ArrowLeftOutlined, HomeOutlined, MessageOutlined } from '@ant-design/icons';
import { Input, Button } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

const swiperModules = [Pagination, Autoplay];

interface Script {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

interface Message {
  id: number;
  content: string;
  sender: 'ai' | 'user';
}

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'scripts' | 'chat'>('scripts');
  const [selectedScript, setSelectedScript] = useState<Script | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, content: '欢迎来到剧本世界！请选择一个剧本开始你的冒险。', sender: 'ai' },
    { id: 2, content: '我选择神秘古堡探险！', sender: 'user' },
    { id: 3, content: '你站在一座古老的城堡前，月光洒在斑驳的石墙上。厚重的橡木门半掩着，发出吱呀声。你决定...', sender: 'ai' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  const scripts: Script[] = [
    {
      id: 1,
      title: '神秘古堡探险',
      description: '在一个月黑风高的夜晚，你意外发现了一座被遗忘的古老城堡。传说这里隐藏着失落的宝藏，但也充满了未知的危险。',
      imageUrl: 'https://ai-public.mastergo.com/ai/img_res/8c864fc37aada609877fd37e416f0b55.jpg'
    },
    {
      id: 2,
      title: '未来都市谍战',
      description: '2087年的新东京，霓虹灯下的阴谋正在酝酿。作为一名特工，你需要在高科技与人性的较量中完成不可能的任务。',
      imageUrl: 'https://ai-public.mastergo.com/ai/img_res/2e8bce8f9ccb6673418704311b3ab86f.jpg'
    },
    {
      id: 3,
      title: '深海遗迹探秘',
      description: '乘坐深海潜水器探索马里亚纳海沟的未知区域，发现一座失落的海底文明遗迹，但这里似乎还有其他生物的存在...',
      imageUrl: 'https://ai-public.mastergo.com/ai/img_res/c184fdbabb72de9a22374a185476e3e7.jpg'
    },
    {
      id: 4,
      title: '荒野西部对决',
      description: '在美国西部的尘土飞扬小镇上，正义与邪恶即将展开终极对决。你是那个能够改变一切的枪手吗？',
      imageUrl: 'https://ai-public.mastergo.com/ai/img_res/2d0bc32b143c4d7de95c8680fae4d91c.jpg'
    },
    {
      id: 5,
      title: '魔法学院奇遇',
      description: '作为一名新生进入霍格沃茨般的魔法学院，你很快发现自己卷入了一场古老的魔法纷争之中。',
      imageUrl: 'https://ai-public.mastergo.com/ai/img_res/dca7e26412c83902f7ce5a0cbea74133.jpg'
    }
  ];

  const handleSelectScript = (script: Script) => {
    setSelectedScript(script);
    setCurrentPage('chat');
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    const newUserMessage: Message = {
      id: messages.length + 1,
      content: inputValue,
      sender: 'user'
    };

    setMessages([...messages, newUserMessage]);
    setInputValue('');

    // 模拟AI回复
    setTimeout(() => {
      const aiResponses = [
        `你决定${inputValue}。突然间，周围的环境开始发生变化...`,
        `你${inputValue}了。一个神秘的声音在你耳边响起："勇敢的冒险者，你的选择将决定故事的走向..."`,
        `${inputValue}之后，你发现前方出现了新的道路。你会如何选择？`,
        `随着你的行动"${inputValue}"，剧情发生了意想不到的转折...`
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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleBackToScripts = () => {
    setCurrentPage('scripts');
    setMessages([
      { id: 1, content: '欢迎回到剧本选择页面！请选择一个新的剧本开始冒险。', sender: 'ai' }
    ]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm py-4 px-6 flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xl mr-3">
            S
          </div>
          <h1 className="text-2xl font-bold text-gray-800">剧本互动平台</h1>
        </div>
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="text-gray-600 hover:text-blue-500 transition-colors">首页</a>
          <a href="#" className="text-gray-600 hover:text-blue-500 transition-colors">剧本库</a>
          <a href="#" className="text-gray-600 hover:text-blue-500 transition-colors">创作中心</a>
          <a href="#" className="text-gray-600 hover:text-blue-500 transition-colors">个人中心</a>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        {currentPage === 'scripts' ? (
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">选择你的冒险剧本</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                探索丰富多彩的故事世界，每一个剧本都将带你进入独特的冒险旅程。选择一个开始你的故事吧！
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {scripts.map((script) => (
                <div
                  key={script.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={script.imageUrl}
                      alt={script.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{script.title}</h3>
                    <p className="text-gray-600 mb-4">{script.description}</p>
                    <Button
                      type="primary"
                      className="!rounded-button whitespace-nowrap w-full"
                      onClick={() => handleSelectScript(script)}
                    >
                      选择剧本
                    </Button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        ) : (
          <div className="max-w-4xl mx-auto h-full flex flex-col">
            <div className="flex items-center mb-6">
              <Button
                icon={<ArrowLeftOutlined />}
                onClick={handleBackToScripts}
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
        )}
      </main>

      {/* Footer Navigation */}
      <footer className="bg-white border-t py-4 px-6">
        <div className="max-w-6xl mx-auto flex justify-around">
          <Button
            icon={<HomeOutlined />}
            onClick={() => setCurrentPage('scripts')}
            className={`!rounded-button whitespace-nowrap flex flex-col items-center ${currentPage === 'scripts' ? 'text-blue-500' : 'text-gray-500'
              }`}
            type="text"
          >
            <span className="mt-1 text-xs">剧本选择</span>
          </Button>
          <Button
            icon={<MessageOutlined />}
            onClick={() => setCurrentPage('chat')}
            className={`!rounded-button whitespace-nowrap flex flex-col items-center ${currentPage === 'chat' ? 'text-blue-500' : 'text-gray-500'
              }`}
            type="text"
          >
            <span className="mt-1 text-xs">剧本对话</span>
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default App;

