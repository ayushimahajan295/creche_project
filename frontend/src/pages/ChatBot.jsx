import React, { useState } from "react";
import axios from "axios";

const ChatBot = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function generateAnswer() {
    if (!question.trim()) return;  // Prevent empty submissions
    setAnswer("Loading...");
    setLoading(true);
    try {
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyA961mUiK07jV8Bz6Ta9V0DH6tD531Mwe0",
        method: "post",
        data: {
          contents: [
            {
              parts: [{ text: question }],
            },
          ],
        },
      });
      setAnswer(response.data.candidates[0].content.parts[0].text);
    } catch (error) {
      setAnswer("Sorry, something went wrong. Please try again.");
    }
    setLoading(false);
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="w-full max-w-2xl p-6 space-y-6">
        <h1 className="text-center text-4xl font-bold text-gray-800 mb-4">Chatbot</h1>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <span className="text-blue-500">💡</span> General knowledge
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <span className="text-blue-500">🔧</span> Technical questions
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <span className="text-blue-500">📝</span> Writing assistance
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <span className="text-blue-500">🤔</span> Problem solving
          </div>
        </div>

        {/* Display question and answer */}
        <div className="space-y-4">
          <div>
            <p className="text-lg font-semibold text-gray-700">Your Question:</p>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Type your question..."
              rows="3"
              className="p-4 w-full text-lg rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            />
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-700">Answer:</p>
            <div className="bg-gray-200 p-4 rounded-lg max-h-72 overflow-y-auto">
              {loading ? (
                <p className="text-gray-500">Generating...</p>
              ) : (
                <p>{answer || "Ask a question to get an answer!"}</p>
              )}
            </div>
          </div>
        </div>

        {/* Send button */}
        <div>
          <button
            onClick={generateAnswer}
            disabled={loading}
            className={`w-full py-3 text-lg font-semibold rounded-lg ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"} text-white transition-all`}
          >
            {loading ? "Generating..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
