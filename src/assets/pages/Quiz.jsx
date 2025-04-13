import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedWords, setSelectedWords] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [timer, setTimer] = useState(30);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3001/data")
      .then((res) => res.json())
      .then((data) => setQuestions(data.questions))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  useEffect(() => {
    if (timer === 0) {
      handleNext(); // auto next
      return;
    }
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer]);

  const handleSelect = (word) => {
    if (selectedWords.includes(word)) return; // prevent duplicates
    if (selectedWords.length < 4) {
      setSelectedWords([...selectedWords, word]);
    }
  };

  const handleUnselect = (index) => {
    const newSelected = [...selectedWords];
    newSelected.splice(index, 1);
    setSelectedWords(newSelected);
  };

  const handleNext = () => {
    const updatedAnswers = [...userAnswers, selectedWords];
    setUserAnswers(updatedAnswers);
    setSelectedWords([]);
    setTimer(30);

    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(currentIdx + 1);
    } else {
      navigate("/result", {
        state: {
          questions,
          userAnswers: updatedAnswers,
        },
      });
    }
  };

  const currentQuestion = questions[currentIdx];

  return (
    <div className="max-w-4xl mx-auto p-6">
      {currentQuestion ? (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Question {currentIdx + 1}</h2>
            <p className="text-right text-sm text-gray-600">Time Left: {timer}s</p>
          </div>

          <p className="mb-6">{currentQuestion.question}</p>

          {/* Selected Words (blanks) */}
          <div className="flex gap-2 flex-wrap mb-4">
            {Array(4)
              .fill("")
              .map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleUnselect(idx)}
                  className="px-3 py-2 border rounded bg-gray-100 min-w-[100px] text-center"
                >
                  {selectedWords[idx] || "..."}
                </button>
              ))}
          </div>

          {/* Options */}
          <div className="flex gap-2 flex-wrap mb-6">
            {currentQuestion.options.map((word, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(word)}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                {word}
              </button>
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={selectedWords.length < 4}
            className={`px-4 py-2 rounded ${
              selectedWords.length < 4
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Next
          </button>
        </>
      ) : (
        <p className="text-center mt-10">Loading questions...</p>
      )}
    </div>
  );
};

export default Quiz;
