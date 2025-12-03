"use client"

import React from 'react';
import SettingsButton from './SettingsButton';

const Header: React.FC = () => {
    return (
        <header className="bg-white shadow-sm py-4 px-6 flex items-center justify-between">
            <div className="flex items-center">
                <img src="/hetaoIcon.png" alt="盒桃" className="w-10 h-10 mr-3 rounded-full object-cover" />
                <h1 className="text-2xl font-bold text-gray-800">盒桃</h1>
            </div>
            <div className="hidden md:flex items-center space-x-6">
                <nav className="flex space-x-6">
                    <a href="#" className="text-gray-600 hover:text-blue-500 transition-colors">首页</a>
                    <a href="#" className="text-gray-600 hover:text-blue-500 transition-colors">剧本库</a>
                    <a href="#" className="text-gray-600 hover:text-blue-500 transition-colors">创作中心</a>
                    <a href="#" className="text-gray-600 hover:text-blue-500 transition-colors">个人中心</a>
                </nav>
                <SettingsButton />
            </div>
        </header>
    );
};

export default Header;

