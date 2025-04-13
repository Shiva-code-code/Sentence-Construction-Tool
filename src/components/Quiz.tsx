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
    isQuizFinished,
    setIsQuizFinished
  } = useQuiz();

  const [blanks, setBlanks] = useState<string[]>([]);
  const [isAnswerComplete, setIsAnswerComplete] = useState(false);
  const [progressValue, setProgressValue] = useState(100);

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    // Reset selected words when moving to a new question
    setSelectedWords([]);
    
    // Extract blanks from the sentence
    if (currentQuestion) {
      const sentenceParts = currentQuestion.sentence.split('___');
      const blankCount = sentenceParts.length - 1;
      setBlanks(Array(blankCount).fill(''));
    }
    
    // Reset timer
    setTimeLeft(30);
    
    // Reset progress bar
    setProgressValue(100);
  }, [currentQuestionIndex, currentQuestion, setSelectedWords, setTimeLeft]);

  useEffect(() => {
    // Timer logic
    const timer = setInterval(() => {
      // Here's the fix: Use a local variable to calculate the new time
      const newTime = timeLeft <= 1 ? 0 : timeLeft - 1;
      setTimeLeft(newTime);
      
      if (newTime <= 0) {
        clearInterval(timer);
        handleTimeUp();
      }
      
      // Update progress bar
      setProgressValue((timeLeft / 30) * 100);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, setTimeLeft]);

  useEffect(() => {
    // Check if answer is complete
    if (currentQuestion && selectedWords.length === currentQuestion.correctAnswer.length) {
      setIsAnswerComplete(true);
    } else {
      setIsAnswerComplete(false);
    }
  }, [selectedWords, currentQuestion]);

  const handleWordSelection = (word: string) => {
    if (selectedWords.includes(word)) {
      // If word is already selected, remove it
      setSelectedWords(selectedWords.filter(w => w !== word));
    } else if (selectedWords.length < blanks.length) {
      // Add the word if there's still room
      setSelectedWords([...selectedWords, word]);
    }
  };

  const handleTimeUp = () => {
    // Save current answer even if incomplete
    setUserAnswers({
      ...userAnswers,
      [currentQuestionIndex]: [...selectedWords]
    });

    // Move to next question or finish quiz
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      finishQuiz();
    }
  };

  const handleNext = () => {
    // Check answer correctness
    const isCorrect = areAnswersCorrect();
    
    // Save user's answer
    setUserAnswers({
      ...userAnswers,
      [currentQuestionIndex]: [...selectedWords]
    });
    
    // Update score if correct
    if (isCorrect) {
      setScore(score + 1);
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
    
    // Move to next question or finish quiz
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
    
    // If number of selected words doesn't match required answers, it's wrong
    if (selectedWords.length !== currentQuestion.correctAnswer.length) return false;
    
    // Check if all selected words match correct answers and are in the right order
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
        {/* Timer and progress bar */}
        <QuizTimer 
          timeLeft={timeLeft}
          progressValue={progressValue}
          handleQuit={handleQuit}
        />

        {/* Quiz content */}
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h2 className="text-xl text-center mb-6">
            Select the missing words in the correct order
          </h2>

          {/* Sentence with blanks */}
          <QuizSentence 
            sentence={currentQuestion.sentence}
            selectedWords={selectedWords}
            setSelectedWords={setSelectedWords}
          />

          {/* Word options */}
          <WordOptions 
            options={currentQuestion.options}
            selectedWords={selectedWords}
            handleWordSelection={handleWordSelection}
          />
          
          {/* Navigation */}
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
        
        {/* Question counter */}
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