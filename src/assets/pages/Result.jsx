import { useLocation, useNavigate } from "react-router-dom";

const Result = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const questions = state?.questions || [];
  const userAnswers = state?.userAnswers || [];

  if (!questions.length) {
    return <div className="text-center mt-10 text-red-600">No data found. Please try again.</div>;
  }

  const getScore = () =>
    userAnswers.reduce((score, ans, idx) => {
      const correct = questions[idx].correctAnswer;
      const isCorrect = JSON.stringify(ans) === JSON.stringify(correct);
      return score + (isCorrect ? 1 : 0);
    }, 0);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Your Score: {getScore()} / {questions.length}</h2>

      <div className="space-y-6">
        {questions.map((q, idx) => {
          const isCorrect = JSON.stringify(userAnswers[idx]) === JSON.stringify(q.correctAnswer);
          return (
            <div key={idx} className="border p-4 rounded shadow">
              <p className="font-medium mb-2">{q.question}</p>
              <p className={isCorrect ? "text-green-600" : "text-red-600"}>
                Your answer: {userAnswers[idx]?.join(", ") || "Not answered"}
              </p>
              {!isCorrect && (
                <p className="text-gray-600">
                  Correct answer: {q.correctAnswer.join(", ")}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="text-center mt-8">
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default Result;
