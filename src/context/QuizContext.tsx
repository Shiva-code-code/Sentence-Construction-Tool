import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define types for our quiz data
export interface Question {
  id: number;
  sentence: string;
  options: string[];
  correctAnswer: string[];
}

interface QuizContextType {
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (index: number) => void;
  score: number;
  setScore: (score: number) => void;
  selectedWords: string[];
  setSelectedWords: (words: string[]) => void;
  userAnswers: Record<number, string[]>;
  setUserAnswers: (answers: Record<number, string[]>) => void;
  timeLeft: number;
  setTimeLeft: (time: number) => void;
  questions: Question[];
  setQuestions: (questions: Question[]) => void;
  isQuizStarted: boolean;
  setIsQuizStarted: (isStarted: boolean) => void;
  isQuizFinished: boolean;
  setIsQuizFinished: (isFinished: boolean) => void;
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

  const value = {
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
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};