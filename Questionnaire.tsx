import React, { useState } from 'react';
import { Star, Check, X } from 'lucide-react';

const QUESTIONS = [
  {
    id: 1,
    question: "Dans quelle constellation se trouve l'étoile de Lou ?",
    options: ["Capricorne", "Lion", "Verseau", "Poissons"],
    correctAnswer: "Capricorne",
    explanation: "L'étoile de Lou brille dans la constellation du Capricorne, à la position 20°46'5.7\" -26°43'44.8\""
  },
  {
    id: 2,
    question: "Dans quelle constellation brille l'étoile de Léontine ?",
    options: ["Capricorne", "Lion", "Verseau", "Poissons"],
    correctAnswer: "Lion",
    explanation: "L'étoile de Léontine illumine la constellation du Lion, à la position 10°8'22.3\" -11°58'2\""
  },
  {
    id: 3,
    question: "Quelle planète est surnommée 'la planète rouge' ?",
    options: ["Vénus", "Mars", "Jupiter", "Mercure"],
    correctAnswer: "Mars",
    explanation: "Mars doit sa couleur rouge à la présence d'oxyde de fer (rouille) à sa surface"
  },
  {
    id: 4,
    question: "Quelle est la plus grande planète du système solaire ?",
    options: ["Saturne", "Mars", "Jupiter", "Neptune"],
    correctAnswer: "Jupiter",
    explanation: "Jupiter est la plus grande planète, avec un diamètre 11 fois plus grand que celui de la Terre"
  },
  {
    id: 5,
    question: "Quelle est la planète la plus proche du Soleil ?",
    options: ["Vénus", "Mars", "Mercure", "Terre"],
    correctAnswer: "Mercure",
    explanation: "Mercure est la planète la plus proche du Soleil, orbitant à une distance moyenne de 58 millions de kilomètres"
  }
];

interface QuestionnaireProps {
  onComplete: () => void;
}

function Questionnaire({ onComplete }: QuestionnaireProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    const isCorrect = answer === QUESTIONS[currentQuestion].correctAnswer;
    
    if (isCorrect) {
      setScore(score + 1);
    }

    setShowExplanation(true);

    // Réduit le délai à 800ms au lieu de 3000ms
    setTimeout(() => {
      setSelectedAnswer(null);
      setShowExplanation(false);
      if (currentQuestion < QUESTIONS.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResult(true);
        onComplete();
      }
    }, 800); // Changé de 3000 à 800 pour une transition plus rapide
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
        {!showResult ? (
          <div className="space-y-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Star className="w-8 h-8 text-yellow-500" />
                <p className="text-lg">Question {currentQuestion + 1}/{QUESTIONS.length}</p>
              </div>
              <p className="text-gray-800 text-xl font-medium mb-6">
                {QUESTIONS[currentQuestion].question}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {QUESTIONS[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  disabled={selectedAnswer !== null}
                  className={`
                    p-4 rounded-lg text-left transition-all duration-300
                    ${
                      selectedAnswer === null
                        ? 'bg-white hover:bg-blue-50 border border-blue-200'
                        : selectedAnswer === option
                          ? option === QUESTIONS[currentQuestion].correctAnswer
                            ? 'bg-green-100 border border-green-500'
                            : 'bg-red-100 border border-red-500'
                          : option === QUESTIONS[currentQuestion].correctAnswer && selectedAnswer !== null
                            ? 'bg-green-100 border border-green-500'
                            : 'bg-white border border-blue-200 opacity-50'
                    }
                  `}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {selectedAnswer === option && (
                      option === QUESTIONS[currentQuestion].correctAnswer
                        ? <Check className="text-green-500" />
                        : <X className="text-red-500" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {showExplanation && (
              <div className={`
                mt-4 p-4 rounded-lg
                ${selectedAnswer === QUESTIONS[currentQuestion].correctAnswer
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-red-50 border border-red-200'}
              `}>
                <p className="text-sm">{QUESTIONS[currentQuestion].explanation}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center space-y-6">
            <h3 className="text-2xl font-bold mb-4">
              Score Final: {score}/{QUESTIONS.length}
            </h3>
            <p className="text-gray-600">
              {score === QUESTIONS.length
                ? "Parfait ! Vous êtes un véritable astronome !"
                : score >= QUESTIONS.length / 2
                ? "Bien joué ! Continuez à explorer les étoiles !"
                : "Continuez à apprendre sur les merveilles de l'univers !"}
            </p>
            <p className="text-blue-600 font-medium">
              Le jeu de mémoire est maintenant débloqué !
            </p>
            <button
              onClick={resetQuiz}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Réessayer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Questionnaire;