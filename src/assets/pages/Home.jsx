import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6 text-center">
      <h1 className="text-4xl font-bold mb-4">Sentence Construction</h1>
      <p className="text-gray-600 max-w-lg">
        User has to construct a sentence with random words by placing them in the correct order.
      </p>
      <div className="mt-8 space-x-4">
        <button
          onClick={() => navigate("/quiz")}
          className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default Home;
