import React from 'react';
import { Clock } from 'lucide-react';

interface TimerProps {
  time: number;
}

function formatTime(time: number): string {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function Timer({ time }: TimerProps) {
  return (
    <div className="fixed top-20 right-4 z-50 animate-fade-in">
      <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-3 flex items-center gap-2 border border-blue-100">
        <Clock className="w-5 h-5 text-blue-500 animate-pulse" />
        <span className="font-mono font-bold text-blue-900">{formatTime(time)}</span>
      </div>
    </div>
  );
}

export default Timer;