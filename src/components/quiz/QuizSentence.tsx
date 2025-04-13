import React from 'react';

interface QuizSentenceProps {
  sentence: string;
  selectedWords: string[];
  setSelectedWords: (words: string[]) => void;
}

const QuizSentence = ({ sentence, selectedWords, setSelectedWords }: QuizSentenceProps) => {
  const sentenceParts = sentence.split('___');

  return (
    <div className="text-lg leading-8 text-center mb-8 px-4">
      <div className="inline-block max-w-full text-left">
        {sentenceParts.map((part, index) => (
          <span key={index} className="inline">
            <span>{part}</span>
            {index < sentenceParts.length - 1 && (
              <span
                onClick={() => {
                  const updated = [...selectedWords];
                  updated.splice(index, 1);
                  setSelectedWords(updated);
                }}
                className={`inline-block mx-1 px-2 py-0.5 min-w-[90px] text-indigo-600 font-medium text-center border-b-2 border-indigo-400 cursor-pointer ${
                  selectedWords[index] ? 'hover:opacity-70' : 'opacity-50'
                }`}
              >
                {selectedWords[index] || '_______'}
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
};

export default QuizSentence;
