import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '@/context/QuizContext';

const Result = () => {
  const navigate = useNavigate();
  const { score, questions, userAnswers } = useQuiz();
  
  const percentScore = Math.round((score / questions.length) * 100);
  
  const handleGoToDashboard = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-[975px] mx-auto p-4">
        <Card className="w-full shadow-md">
          <CardHeader className="text-center">
            <CardTitle>Sentence Construction</CardTitle>
          </CardHeader>
          
          <CardContent className="flex flex-col items-center">
            {/* Score Circle */}
            <div className="relative w-36 h-36 mb-6">
              <div className="absolute inset-0 rounded-full border-8 border-gray-200"></div>
              <div 
                className="absolute inset-0 rounded-full border-8 border-green-500" 
                style={{ 
                  clipPath: `polygon(50% 50%, 50% 0%, ${percentScore >= 25 ? '100% 0%' : `${50 + 50 * Math.sin(percentScore / 100 * Math.PI * 2)}% ${50 - 50 * Math.cos(percentScore / 100 * Math.PI * 2)}%`}, ${
                    percentScore >= 50 ? '100% 100%' : `${50 + 50 * Math.sin(percentScore / 100 * Math.PI * 2)}% ${50 - 50 * Math.cos(percentScore / 100 * Math.PI * 2)}%`}, ${
                    percentScore >= 75 ? '0% 100%' : `${50 + 50 * Math.sin(percentScore / 100 * Math.PI * 2)}% ${50 - 50 * Math.cos(percentScore / 100 * Math.PI * 2)}%`}, ${
                    percentScore >= 100 ? '0% 0%' : `${50 + 50 * Math.sin(percentScore / 100 * Math.PI * 2)}% ${50 - 50 * Math.cos(percentScore / 100 * Math.PI * 2)}%`})` 
                }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-500">{percentScore}</div>
                  <div className="text-xs text-gray-500">Overall Score</div>
                </div>
              </div>
            </div>
            
            <CardDescription className="text-center max-w-lg mb-8">
              {percentScore > 80 ? (
                "Excellent work! You have a strong grasp of sentence structure and word placement."
              ) : percentScore > 60 ? (
                "While you correctly formed several sentences, there are a couple of areas where improvement is needed. Pay close attention to sentence structure and word placement to ensure clarity and correctness."
              ) : (
                "You're making progress, but more practice is needed with sentence construction. Focus on understanding how different words function within a sentence."
              )}
            </CardDescription>
            
            <Button className="mb-8" onClick={handleGoToDashboard}>
              Go to Dashboard
            </Button>
            
            {/* Divider with down arrow */}
            <div className="w-full flex justify-center mb-8">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M19 12l-7 7-7-7"/>
              </svg>
            </div>
            
            {/* Question results */}
            <div className="w-full space-y-6">
              {questions.map((question, index) => (
                <Card key={index} className="w-full">
                  <CardContent className="pt-6">
                    <div className="bg-pink-100 text-pink-800 text-xs font-medium px-2 py-1 rounded inline-block mb-2">
                      Prompt
                    </div>
                    <div className="text-sm text-right text-gray-500 mb-2">
                      {index + 1}/{questions.length}
                    </div>
                    
                    <p className="mb-4">{question.sentence.replace(/___/g, '______')}</p>
                    
                    <div className="mt-6">
                      <div className="flex items-start mb-2">
                        <span className="text-sm font-medium mr-2">Your response:</span>
                        <span className={`text-sm ${
                          JSON.stringify(userAnswers[index]) === JSON.stringify(question.correctAnswer) 
                            ? 'text-green-600 font-medium' 
                            : 'text-red-600 font-medium'
                        }`}>
                          {JSON.stringify(userAnswers[index]) === JSON.stringify(question.correctAnswer) 
                            ? 'Correct' 
                            : 'Incorrect'}
                        </span>
                      </div>
                      
                      <p>
                        {question.sentence.split('___').reduce((acc, part, i, arr) => {
                          if (i === arr.length - 1) return acc + part;
                          const word = userAnswers[index]?.[i] || "____";
                          return acc + part + word;
                        }, '')}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-center">
            <Button variant="outline" onClick={handleGoToDashboard}>
              Back to Home
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Result;
