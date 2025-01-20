import React, { useState } from 'react';
import { Flower2 } from 'lucide-react';

const MUSHROOM_QUESTIONS = [
  {
    id: 1,
    question: "Quel est ce champignon à lamelles roses devenant brunes ?",
    image: "https://images.unsplash.com/photo-1607492057436-f4e7c2f01e71?w=400&h=300&fit=crop",
    options: ["Rosé des prés", "Amanite tue-mouches", "Girolle", "Morille"],
    correctAnswer: "Rosé des prés"
  },
  {
    id: 2,
    question: "Comment s'appelle ce champignon aux reflets bleutés ?",
    image: "https://images.unsplash.com/photo-1595507238835-bff863eb6edb?w=400&h=300&fit=crop",
    options: ["Pied bleu", "Cèpe de Bordeaux", "Chanterelle", "Bolet"],
    correctAnswer: "Pied bleu"
  },
  {
    id: 3,
    question: "Comment s'appelle ce champignon de couleur orangée ?",
    image: "https://images.unsplash.com/photo-1595507238835-bff863eb6edb?w=400&h=300&fit=crop",
    options: ["Girolle", "Pleurote", "Trompette de la mort", "Morille"],
    correctAnswer: "Girolle"
  },
  {
    id: 4,
    question: "Quel est ce champignon noir en forme de trompette ?",
    image: "https://images.unsplash.com/photo-1610398000003-575ddd8867c5?w=400&h=300&fit=crop",
    options: ["Morille", "Trompette de la mort", "Bolet", "Pleurote"],
    correctAnswer: "Trompette de la mort"
  },
  {
    id: 5,
    question: "Comment s'appelle ce champignon au chapeau alvéolé ?",
    image: "https://images.unsplash.com/photo-1589674781759-c21c37956a44?w=400&h=300&fit=crop",
    options: ["Pleurote", "Cèpe", "Morille", "Girolle"],
    correctAnswer: "Morille"
  }
];

interface MushroomQuizProps {
  onComplete: () => void;
}

function MushroomQuiz({ onComplete }: MushroomQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    const isCorrect = answer === MUSHROOM_QUESTIONS[currentQuestion].correctAnswer;
    
    if (isCorrect) {
      setScore(score + 1);
    }

    setShowExplanation(true);

    setTimeout(() => {
      setSelectedAnswer(null);
      setShowExplanation(false);
      if (currentQuestion < MUSHROOM_QUESTIONS.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResult(true);
        onComplete();
      }
    }, 2000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-serif">Quiz des Champignons</h2>
          {!showResult && (
            <button
              onClick={resetQuiz}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Recommencer
            </button>
          )}
        </div>

        {!showResult ? (
          <div className="space-y-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Flower2 className="w-8 h-8 text-green-500" />
                <p className="text-lg">Question {currentQuestion + 1}/{MUSHROOM_QUESTIONS.length}</p>
              </div>
              
              <div className="mb-6">
                <div className="relative w-full max-w-md mx-auto aspect-[4/3] mb-4">
                  <img
                    src={MUSHROOM_QUESTIONS[currentQuestion].image}
                    alt="Champignon à identifier"
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                    loading="lazy"
                  />
                </div>
                <p className="text-gray-800 text-xl font-medium">
                  {MUSHROOM_QUESTIONS[currentQuestion].question}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {MUSHROOM_QUESTIONS[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  disabled={selectedAnswer !== null}
                  className={`
                    p-4 rounded-lg text-left transition-all duration-300
                    ${
                      selectedAnswer === null
                        ? 'bg-white hover:bg-green-50 border border-green-200'
                        : selectedAnswer === option
                          ? option === MUSHROOM_QUESTIONS[currentQuestion].correctAnswer
                            ? 'bg-green-100 border border-green-500'
                            : 'bg-red-100 border border-red-500'
                          : option === MUSHROOM_QUESTIONS[currentQuestion].correctAnswer && selectedAnswer !== null
                            ? 'bg-green-100 border border-green-500'
                            : 'bg-white border border-green-200 opacity-50'
                    }
                  `}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center space-y-6">
            <h3 className="text-2xl font-bold mb-4">
              Score Final: {score}/{MUSHROOM_QUESTIONS.length}
            </h3>
            <p className="text-gray-600">
              {score === MUSHROOM_QUESTIONS.length
                ? "Parfait ! Vous êtes un expert en mycologie !"
                : score >= MUSHROOM_QUESTIONS.length / 2
                ? "Bien joué ! Vous commencez à bien connaître les champignons !"
                : "Continuez à apprendre sur les champignons de nos forêts !"}
            </p>
            <p className="text-green-600 font-medium">
              Une belle récompense vous attend !
            </p>
            <button
              onClick={resetQuiz}
              className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Réessayer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MushroomQuiz;