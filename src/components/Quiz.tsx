import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useQuiz } from '@/context/QuizContext';
import { toast } from '@/hooks/use-toast';
import QuizTimer from './quiz/QuizTimer';
import QuizSentence from './quiz/QuizSentence';
import WordOptions from './quiz/WordOptions';

const Quiz = () => {
  const navigate = useNavigate();
  const {
    currentQuestionIndex,
    setCurrentQuestionIndex,
    score,
    setScore,
    selectedWords,
    setSelectedWords,
    userAnswers,
    setUserAnswers,
    timeLeft,
    setTimeLeft,
    questions,
    setQuestions,
    isQuizFinished,
    setIsQuizFinished
  } = useQuiz();

  const [blanks, setBlanks] = useState<string[]>([]);
  const [isAnswerComplete, setIsAnswerComplete] = useState(false);
  const [progressValue, setProgressValue] = useState(100);

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    setSelectedWords([]);

    if (currentQuestion) {
      const sentenceParts = currentQuestion.sentence.split('___');
      const blankCount = sentenceParts.length - 1;
      setBlanks(Array(blankCount).fill(''));
    }

    setTimeLeft(30);
    setProgressValue(100);
  }, [currentQuestionIndex, currentQuestion]);

  useEffect(() => {
    const timer = setInterval(() => {
      const newTime = timeLeft <= 1 ? 0 : timeLeft - 1;
      setTimeLeft(newTime);

      if (newTime <= 0) {
        clearInterval(timer);
        handleTimeUp();
      }

      setProgressValue((newTime / 30) * 100);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    if (currentQuestion && selectedWords.length === currentQuestion.correctAnswer.length) {
      setIsAnswerComplete(true);
    } else {
      setIsAnswerComplete(false);
    }
  }, [selectedWords, currentQuestion]);

  const handleWordSelection = (word: string) => {
    if (selectedWords.includes(word)) {
      setSelectedWords(selectedWords.filter(w => w !== word));
    } else if (selectedWords.length < blanks.length) {
      setSelectedWords([...selectedWords, word]);
    }
  };

  const handleTimeUp = () => {
    const updatedAnswers = {
      ...userAnswers,
      [currentQuestionIndex]: [...selectedWords]
    };
    setUserAnswers(updatedAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      finishQuiz();
    }
  };

  const handleNext = () => {
    const isCorrect = areAnswersCorrect();

    const updatedAnswers = {
      ...userAnswers,
      [currentQuestionIndex]: [...selectedWords]
    };
    setUserAnswers(updatedAnswers);

    if (isCorrect) {
      const newScore = score + 1;
      setScore(newScore);
      toast({
        title: "Correct!",
        description: "Good job! Moving to next question.",
        variant: "default",
      });
    } else {
      toast({
        title: "Incorrect",
        description: "Keep trying!",
        variant: "destructive",
      });
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    setIsQuizFinished(true);
    navigate('/result');
  };

  const handleQuit = () => {
    if (confirm("Are you sure you want to quit? Your progress will be lost.")) {
      navigate('/');
    }
  };

  const areAnswersCorrect = () => {
    if (!currentQuestion) return false;
    if (selectedWords.length !== currentQuestion.correctAnswer.length) return false;

    for (let i = 0; i < selectedWords.length; i++) {
      if (selectedWords[i] !== currentQuestion.correctAnswer[i]) return false;
    }
    return true;
  };

  if (!currentQuestion) {
    return <div>Loading questions...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-[975px] mx-auto p-4">
        <QuizTimer 
          timeLeft={timeLeft}
          progressValue={progressValue}
          handleQuit={handleQuit}
        />

        <div className="bg-white rounded-lg p-6 shadow-md">
          <h2 className="text-xl text-center mb-6">
            Select the missing words in the correct order
          </h2>

          <QuizSentence 
            sentence={currentQuestion.sentence}
            selectedWords={selectedWords}
            setSelectedWords={setSelectedWords}
          />

          <WordOptions 
            options={currentQuestion.options}
            selectedWords={selectedWords}
            handleWordSelection={handleWordSelection}
          />

          <div className="flex justify-end mt-4">
            <Button 
              onClick={handleNext} 
              disabled={!isAnswerComplete}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              Next
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </div>
        </div>

        <div className="text-right mt-2">
          <span className="text-sm text-gray-500">
            {currentQuestionIndex + 1}/{questions.length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
