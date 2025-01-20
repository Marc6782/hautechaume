import React, { useState, useRef } from 'react';
import { Music, Check, X } from 'lucide-react';

const MUSIC_QUESTIONS = [
  {
    id: 1,
    title: "Le Chant des Oiseaux",
    composer: "Nature",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    options: [
      "Le Rossignol",
      "Le Merle",
      "La Mésange",
      "Le Pinson"
    ]
  },
  {
    id: 2,
    title: "Le Ruisseau",
    composer: "Nature",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    options: [
      "Le Ruisseau",
      "La Cascade",
      "La Rivière",
      "La Pluie"
    ]
  },
  {
    id: 3,
    title: "Le Vent",
    composer: "Nature",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    options: [
      "Le Vent dans les arbres",
      "La Brise marine",
      "L'Orage",
      "La Tempête"
    ]
  }
];

interface MusicQuizProps {
  onComplete: () => void;
}

function MusicQuiz({ onComplete }: MusicQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlaySound = async () => {
    if (!audioRef.current) return;

    setAudioError(null);

    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    } else {
      setIsLoading(true);
      try {
        audioRef.current.currentTime = 0;
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          await playPromise;
          setIsPlaying(true);
        }
      } catch (error) {
        console.error("Erreur de lecture audio:", error);
        setAudioError("Impossible de lire le son. Veuillez réessayer.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  const handleAudioError = () => {
    setIsLoading(false);
    setIsPlaying(false);
    setAudioError("Erreur lors du chargement du son. Veuillez réessayer.");
  };

  const handleAnswer = (answer: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setSelectedAnswer(answer);
    const isCorrect = answer === MUSIC_QUESTIONS[currentQuestion].options[0];
    
    if (isCorrect) {
      setScore(score + 1);
    }

    setTimeout(() => {
      setSelectedAnswer(null);
      setAudioError(null);
      if (currentQuestion < MUSIC_QUESTIONS.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResult(true);
        onComplete();
      }
    }, 1500);
  };

  const resetQuiz = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setIsPlaying(false);
    setIsLoading(false);
    setAudioError(null);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-serif">Quiz des Sons de la Nature</h2>
          <button
            onClick={resetQuiz}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Nouvelle Partie
          </button>
        </div>

        {!showResult ? (
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-lg mb-2">Question {currentQuestion + 1}/{MUSIC_QUESTIONS.length}</p>
              <p className="text-gray-600">Écoutez le son et devinez ce qu'il représente</p>
            </div>

            <div className="flex flex-col items-center gap-4 mb-8">
              <button
                onClick={handlePlaySound}
                disabled={isLoading}
                className={`
                  relative w-24 h-24 rounded-full
                  ${isPlaying ? 'bg-green-100' : 'bg-green-500'}
                  ${isLoading ? 'opacity-75 cursor-wait' : 'hover:bg-green-600'}
                  transition-colors duration-300
                  focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
                  disabled:opacity-50 disabled:cursor-not-allowed
                `}
                aria-label={isPlaying ? 'Arrêter le son' : 'Jouer le son'}
              >
                <Music 
                  className={`
                    absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                    w-12 h-12 ${isPlaying ? 'text-green-500' : 'text-white'}
                    transition-colors duration-300
                    ${isLoading ? 'animate-pulse' : ''}
                  `}
                />
              </button>

              {audioError && (
                <p className="text-red-500 text-sm">{audioError}</p>
              )}

              <audio
                ref={audioRef}
                src={MUSIC_QUESTIONS[currentQuestion].url}
                onEnded={handleAudioEnded}
                onError={handleAudioError}
                preload="auto"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {MUSIC_QUESTIONS[currentQuestion].options.map((option, index) => (
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
                          ? option === MUSIC_QUESTIONS[currentQuestion].options[0]
                            ? 'bg-green-100 border border-green-500'
                            : 'bg-red-100 border border-red-500'
                          : option === MUSIC_QUESTIONS[currentQuestion].options[0] && selectedAnswer !== null
                            ? 'bg-green-100 border border-green-500'
                            : 'bg-white border border-green-200 opacity-50'
                    }
                  `}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {selectedAnswer === option && (
                      option === MUSIC_QUESTIONS[currentQuestion].options[0]
                        ? <Check className="text-green-500" />
                        : <X className="text-red-500" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center space-y-6">
            <h3 className="text-2xl font-bold mb-4">
              Score Final: {score}/{MUSIC_QUESTIONS.length}
            </h3>
            <p className="text-gray-600">
              {score === MUSIC_QUESTIONS.length
                ? "Parfait ! Vous avez une excellente oreille !"
                : score >= MUSIC_QUESTIONS.length / 2
                ? "Bien joué ! Continuez à écouter la nature !"
                : "Continuez à vous entraîner, la nature a tant à nous faire entendre !"}
            </p>
            <p className="text-green-600 font-medium">
              Le quiz des champignons est maintenant débloqué !
            </p>
            <button
              onClick={resetQuiz}
              className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Rejouer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MusicQuiz;