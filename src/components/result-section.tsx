export default function ResultSection({ score }: { score: number }) {
  return (
    <section className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center px-4">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg text-center space-y-6 max-w-md w-full">
        <h1 className="text-4xl font-bold text-green-400">Quiz Completed 🎉</h1>
        <p className="text-lg sm:text-xl text-gray-300">Game Over!</p>
        <div className="text-2xl sm:text-3xl font-semibold">
          You Scored:
          <span className="text-blue-400 ml-2">{score}</span>
        </div>

        <button
          onClick={() => window.location.reload()}
          className="mt-6 bg-blue-600 hover:bg-blue-700 transition-colors px-6 py-3 rounded-md text-white font-medium"
        >
          Restart Quiz
        </button>
      </div>
    </section>
  );
}
