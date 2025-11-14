import React from 'react';
import { MessageSquare, Book, HelpCircle, FileText } from 'lucide-react';

// Mock History Data
const mockHistory = [
  { id: 1, type: 'Note', description: 'Added note on **Qubit Entanglement**', timestamp: '2 minutes ago', icon: Book, color: 'text-blue-500' },
  { id: 2, type: 'Quiz', description: 'Generated a **5-question quiz** on Quantum Basics', timestamp: '1 hour ago', icon: HelpCircle, color: 'text-yellow-500' },
  { id: 3, type: 'Chat', description: 'Asked: **"What is a superconducting loop?"**', timestamp: '3 hours ago', icon: MessageSquare, color: 'text-green-500' },
  { id: 4, type: 'Summary', description: 'Generated **Summary Until Now** (0:00 - 3:45)', timestamp: '1 day ago', icon: FileText, color: 'text-purple-500' },
];

const HistorySection = () => {
  return (
    <div className="h-full flex flex-col">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">Activity History</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Your recent notes, questions, and summaries
      </p>

      <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
        {mockHistory.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40">
            <p className="text-gray-500 dark:text-gray-400 text-lg italic">No History</p>
          </div>
        ) : (
          mockHistory.map((item) => (
            <div
              key={item.id}
              className="flex items-start p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 transition-shadow hover:shadow-md"
            >
              <item.icon className={`w-5 h-5 mr-3 ${item.color} flex-shrink-0`} />
              <div className="flex-1">
                <p className="text-gray-800 dark:text-white font-medium text-sm" dangerouslySetInnerHTML={{ __html: item.description }} />
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">{item.timestamp}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HistorySection;