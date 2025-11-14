import React from 'react';
import { FileText, DollarSign } from 'lucide-react';

const ChatSection = () => {
  const handleSummary = (type) => {
    console.log(`Generating ${type} summary...`);
    alert(`Generating ${type} summary initiated!`);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Summary Buttons */}
      <div className="space-y-3 mb-6">
        <button
          onClick={() => handleSummary('full')}
          className="w-full py-2 flex items-center justify-center bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-green-100 dark:hover:bg-green-800 transition-colors"
        >
          <FileText className="w-5 h-5 mr-2 text-green-600" />
          Generate full summary
        </button>
        <button
          onClick={() => handleSummary('until now')}
          className="w-full py-2 flex items-center justify-center bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-green-100 dark:hover:bg-green-800 transition-colors"
        >
          <DollarSign className="w-5 h-5 mr-2 text-green-600" /> {/* DollarSign is a stand-in for the coin icon */}
          Summary Until Now
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col justify-center items-center mb-4">
        <div className="text-gray-400 dark:text-gray-500 mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" /></svg>
        </div>
        <p className="text-lg text-gray-500 dark:text-gray-400 italic">No Chat</p>
      </div>

      {/* Chat Input */}
      <div className="mt-auto">
        <div className="flex">
          <input
            type="text"
            placeholder="Ask anything..."
            className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-l-lg dark:bg-gray-700 dark:text-white focus:outline-none"
          />
          <button className="p-3 bg-green-600 text-white rounded-r-lg hover:bg-green-700 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatSection;