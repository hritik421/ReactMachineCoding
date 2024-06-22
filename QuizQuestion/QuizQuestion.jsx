import React, { useState, useEffect } from 'react'; // Import useEffect from React
import './App.css'

const questions = [
  {
    "question": "What is the largest planet in our solar system?",
    "answerOptions": [
      {"text": "Saturn", "isCorrect": false},
      {"text": "Mars", "isCorrect": false},
      {"text": "Earth", "isCorrect": false},
      {"text": "Jupiter", "isCorrect": true}
    ]
  },
  {
    "question": "What is the tallest mountain in the world?",
    "answerOptions": [
      {"text": "Mount Everest", "isCorrect": true},
      {"text": "K2", "isCorrect": false},
      {"text": "Kangchenjunga", "isCorrect": false},
      {"text": "Lhotse", "isCorrect": false}
    ]
  },
  {
    "question": "Which country is home to the Great Wall of China?",
    "answerOptions": [
      {"text": "China", "isCorrect": true},
      {"text": "Japan", "isCorrect": false},
      {"text": "Korea", "isCorrect": false},
      {"text": "India", "isCorrect": false}
    ]
  },
  {
    "question": "What is the capital of France?",
    "answerOptions": [
      {"text": "London", "isCorrect": false},
      {"text": "Berlin", "isCorrect": false},
      {"text": "Paris", "isCorrect": true},
      {"text": "Rome", "isCorrect": false}
    ]
  },
  {
    "question": "What is the chemical formula for water?",
    "answerOptions": [
      {"text": "H2O", "isCorrect": true},
      {"text": "CO2", "isCorrect": false},
      {"text": "NaCl", "isCorrect": false},
      {"text": "NH3", "isCorrect": false}
    ]
  },
  {
    "question": "What is the largest ocean on Earth?",
    "answerOptions": [
      {"text": "Atlantic Ocean", "isCorrect": false},
      {"text": "Pacific Ocean", "isCorrect": true},
      {"text": "Indian Ocean", "isCorrect": false},
      {"text": "Arctic Ocean", "isCorrect": false}
    ]
  },
  {
    "question": "What is the most popular social media platform?",
    "answerOptions": [
      {"text": "Instagram", "isCorrect": true},
      {"text": "Facebook", "isCorrect": false},
      {"text": "Twitter", "isCorrect": false},
      {"text": "YouTube", "isCorrect": false}
    ]
  },
  {
    "question": "What is the currency of Japan?",
    "answerOptions": [
      {"text": "Euro", "isCorrect": false},
      {"text": "US Dollar", "isCorrect": false},
      {"text": "Japanese Yen", "isCorrect": true},
      {"text": "Chinese Yuan", "isCorrect": false}
    ]
  },
  {
    "question": "What is the world's largest search engine?",
    "answerOptions": [
      {"text": "Google", "isCorrect": true},
      {"text": "Bing", "isCorrect": false},
      {"text": "Yahoo", "isCorrect": false},
      {"text": "DuckDuckGo", "isCorrect": false}
    ]
  },
  {
    "question": "Who painted the Mona Lisa?",
    "answerOptions": [
      {"text": "Michelangelo", "isCorrect": false},
      {"text": "Leonardo da Vinci", "isCorrect": true},
      {"text": "Sandro Botticelli", "isCorrect": false},
      {"text": "Raphael", "isCorrect": false}
    ]
  }
];

const Question = ({question, onAnswerClick = () => {}}) => {
  return (
    <div className="question">
      <h2>{question.question}</h2>
      <ul className="options">
        {question.answerOptions.map((option) => {
          return (
            <li key={option.text}>
              <button onClick={() => onAnswerClick(option.isCorrect)}>
                {option.text}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const Result = ({userAnswers, questions, resetQuiz = () => {}}) => {
  const correctAnswers = userAnswers.filter((answer) => answer).length;

  return (
    <div className="results">
      <h2>Results</h2>
      <p>
        You answered {correctAnswers} out of {questions.length} questions{" "}
        <span onClick={resetQuiz}>Click here to Retry</span>
      </p>
      <ul>
        {questions.map((question, index) => {
          return (
            <li key={index} data-correct={userAnswers[index]}>
              Q{index + 1}. {question.question}
              <b>
                {userAnswers[index]
                  ? ""
                  : `- ${
                      question.answerOptions.find((ans) => ans.isCorrect).text
                    }`}
              </b>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);

  // Keep all of the logic in App.jsx

  const handleNextQuestion = (isCorrect) => {
    setCurrentQuestion(currentQuestion + 1);
    setUserAnswers([...userAnswers, isCorrect]);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setUserAnswers([]);
  };

  return (
    <div className="App">
      <h1>World Quiz</h1>

      {/* Questions Component */}
      {currentQuestion < questions.length && (
        <Question
          question={questions[currentQuestion]}
          onAnswerClick={handleNextQuestion}
        />
      )}

      {/* Result Component */}
      {currentQuestion === questions.length && (
        <Result
          userAnswers={userAnswers}
          questions={questions}
          resetQuiz={resetQuiz}
        />
      )}
    </div>
  );
}

export default App;
