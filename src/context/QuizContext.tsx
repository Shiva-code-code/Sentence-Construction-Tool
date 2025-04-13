// QuizContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Question {
  id: number;
  sentence: string;
  options: string[];
  correctAnswer: string[];
}

interface QuizContextType {
  currentQuestionIndex: number;
  setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  selectedWords: string[];
  setSelectedWords: React.Dispatch<React.SetStateAction<string[]>>;
  userAnswers: Record<number, string[]>;
  setUserAnswers: React.Dispatch<React.SetStateAction<Record<number, string[]>>>;
  timeLeft: number;
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
  questions: Question[];
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
  isQuizStarted: boolean;
  setIsQuizStarted: React.Dispatch<React.SetStateAction<boolean>>;
  isQuizFinished: boolean;
  setIsQuizFinished: React.Dispatch<React.SetStateAction<boolean>>;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, string[]>>({});
  const [timeLeft, setTimeLeft] = useState(30);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  const value: QuizContextType = {
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
    isQuizStarted,
    setIsQuizStarted,
    isQuizFinished,
    setIsQuizFinished,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};
