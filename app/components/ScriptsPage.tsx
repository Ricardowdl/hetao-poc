"use client"

import React from 'react';
import { Button } from 'antd';
import type { Script } from '../types';

interface ScriptsPageProps {
  scripts: Script[];
  onSelectScript: (scriptId: number) => void;
}

const ScriptsPage: React.FC<ScriptsPageProps> = ({ scripts, onSelectScript }) => {
  return (
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
                onClick={() => onSelectScript(script.id)}
              >
                选择剧本
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScriptsPage;

