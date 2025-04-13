import React from 'react';
import { Button } from '@/components/ui/button';

interface WordOptionsProps {
  options: string[];
  selectedWords: string[];
  handleWordSelection: (word: string) => void;
}

const WordOptions = ({ options, selectedWords, handleWordSelection }: WordOptionsProps) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center mb-8">
      {options.map((word, index) => (
        <Button
          key={index}
          variant={selectedWords.includes(word) ? "default" : "outline"}
          className={`${selectedWords.includes(word) ? 'bg-indigo-600' : ''}`}
          onClick={() => handleWordSelection(word)}
          disabled={selectedWords.includes(word)}
        >
          {word}
        </Button>
      ))}
    </div>
  );
};

export default WordOptions;