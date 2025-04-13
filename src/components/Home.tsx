import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '@/context/QuizContext';

const Home = () => {
  const navigate = useNavigate();
  const { setIsQuizStarted } = useQuiz();

  const handleStartQuiz = () => {
    setIsQuizStarted(true);
    navigate('/quiz');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-[650px] shadow-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"></path>
              <path d="M7 7h.01"></path>
            </svg>
          </div>
          <CardTitle className="text-3xl font-bold">Sentence Construction</CardTitle>
          <CardDescription className="text-lg mt-2">
            Select the correct words to complete the sentence by arranging the provided options in the right order.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 my-6">
            <div className="text-center">
              <h3 className="font-medium mb-2">Time Per Question</h3>
              <p className="text-lg">30 sec</p>
            </div>
            <div className="text-center">
              <h3 className="font-medium mb-2">Total Questions</h3>
              <p className="text-lg">10</p>
            </div>
            <div className="text-center">
              <h3 className="font-medium mb-2">Coins</h3>
              <p className="text-lg flex items-center justify-center">
                <span className="inline-block w-4 h-4 bg-yellow-400 rounded-full mr-1"></span>
                0
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Button variant="outline" className="w-32">Back</Button>
          <Button className="w-32 bg-indigo-600 hover:bg-indigo-700" onClick={handleStartQuiz}>Start</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Home;