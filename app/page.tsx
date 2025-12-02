"use client"

import React from 'react';
import ScriptsPage from './components/ScriptsPage';
import { scripts } from './scripts-data';
import { useRouter } from 'next/navigation';

const HomePage: React.FC = () => {
  const router = useRouter();

  const handleSelectScript = (scriptId: number) => {
    router.push(`/chat?scriptId=${scriptId}`);
  };

  return (
    <main className="flex-grow container mx-auto px-4 py-8">
      <ScriptsPage scripts={scripts} onSelectScript={handleSelectScript} />
    </main>
  );
};

export default HomePage;

