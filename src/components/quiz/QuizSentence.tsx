import React from 'react';

interface QuizSentenceProps {
  sentence: string;
  selectedWords: string[];
  setSelectedWords: (words: string[]) => void;
}

const QuizSentence = ({ sentence, selectedWords, setSelectedWords }: QuizSentenceProps) => {
  const sentenceParts = sentence.split('___');
  
  return (
    <div className="text-lg text-center mb-8">
      {sentenceParts.map((part, index) => (
        <React.Fragment key={index}>
          {part}
          {index < sentenceParts.length - 1 && (
            <span 
              className="inline-block mx-1 px-3 py-1 border-b-2 border-gray-400 min-w-20 text-center"
              onClick={() => {
                if (selectedWords[index]) {
                  // Remove word if clicked
                  setSelectedWords(selectedWords.filter((_, i) => i !== index));
                }
              }}
            >
              {selectedWords[index] || ''}
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default QuizSentence;