import React from 'react';

const QuizSection = () => {
  const handleGenerateQuiz = () => {
    // In a real application, this would trigger an API call
    // to your backend or AI agent to generate quiz questions
    console.log("Generating quiz based on video content...");
    alert("Quiz generation initiated! (Functionality to be implemented with AI/API)");
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="text-center p-4">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Generate a quiz</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Test your understanding of the video content with AI-generated questions
        </p>
        <button
          onClick={handleGenerateQuiz}
          className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-colors"
        >
          Generate Quiz
        </button>
      </div>
    </div>
  );
};

export default QuizSection;