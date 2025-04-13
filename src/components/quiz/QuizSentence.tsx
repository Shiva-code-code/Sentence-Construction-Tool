import React from "react";

interface Props {
  sentence: string;
  selectedWords: string[];
}

const QuizSentence: React.FC<Props> = ({ sentence, selectedWords }) => {
  const parts = sentence.split("___");

  // Split the sentence by line breaks to preserve new lines
  const lines = sentence.split(/\n|(?<=\.)\s/g); // Handles newline or ". "

  let wordIndex = 0;

  return (
    <div className="space-y-4">
      {lines.map((line, lineIndex) => {
        const lineParts = line.split("___");
        return (
          <div
            key={lineIndex}
            className="text-lg text-center leading-8 flex flex-wrap justify-center gap-1 px-4"
          >
            {lineParts.map((part, i) => (
              <React.Fragment key={i}>
                <span>{part}</span>
                {i < lineParts.length - 1 && (
                  <span className="underline min-w-[80px] inline-block text-indigo-600 font-semibold">
                    {selectedWords[wordIndex++] || "_______"}
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default QuizSentence;
