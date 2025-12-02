"use client"

import React from 'react';

const Header: React.FC = () => {
    return (
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
    );
};

export default Header;

