import React from 'react';
import { Button } from '@/components/ui/button';

interface QuizTimerProps {
  timeLeft: number;
  progressValue: number;
  handleQuit: () => void;
}

const QuizTimer = ({ timeLeft, progressValue, handleQuit }: QuizTimerProps) => {
  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-md mb-6">
      <div className="flex justify-between items-center mb-1">
        <div className="text-lg font-medium">{formatTime(timeLeft)}</div>
        <Button variant="outline" size="sm" onClick={handleQuit}>Quit</Button>
      </div>
      <div className="w-full bg-gray-200 h-2 rounded-full">
        <div 
          className={`h-full rounded-full transition-all duration-1000 ${
            timeLeft > 10 ? 'bg-orange-400' : 'bg-red-500'
          }`} 
          style={{ width: `${progressValue}%` }}
        ></div>
      </div>
    </div>
  );
};

export default QuizTimer;
