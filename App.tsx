import React, { useState, useEffect } from 'react';
import { Star, Heart } from 'lucide-react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Remerciements from './components/Remerciements';
import UniverseStarFinder from './components/UniverseStarFinder';
import Synopsis from './components/Synopsis';
import Questionnaire from './components/Questionnaire';
import MemoryGame from './components/ConstellationPuzzle';
import MusicQuiz from './components/MusicQuiz';
import MushroomQuiz from './components/MushroomQuiz';
import FinalReward from './components/FinalReward';
import Timer from './components/Timer';

export default function App() {
  const [gameProgress, setGameProgress] = useState({
    questionnaireStarted: false,
    questionnaireCompleted: false,
    memoryGameCompleted: false,
    musicQuizCompleted: false,
    mushroomQuizCompleted: false
  });

  const [elapsedTime, setElapsedTime] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isTimerActive) {
      timer = setInterval(() => {
        setElapsedTime(time => time + 1);
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isTimerActive]);

  const handleQuestionnaireStart = () => {
    if (!gameProgress.questionnaireStarted) {
      setGameProgress(prev => ({ ...prev, questionnaireStarted: true }));
      setIsTimerActive(true);
    }
  };

  const handleQuestionnaireComplete = () => {
    setGameProgress(prev => ({ ...prev, questionnaireCompleted: true }));
  };

  const handleMemoryGameComplete = () => {
    setGameProgress(prev => ({ ...prev, memoryGameCompleted: true }));
  };

  const handleMusicQuizComplete = () => {
    setGameProgress(prev => ({ ...prev, musicQuizCompleted: true }));
  };

  const handleMushroomQuizComplete = () => {
    setGameProgress(prev => ({ ...prev, mushroomQuizCompleted: true }));
    setIsTimerActive(false);
  };

  return (
    <div className="min-h-screen bg-rose-50">
      <Navigation />
      <Header />
      
      {isTimerActive && <Timer time={elapsedTime} />}
      
      <main className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-16 sm:space-y-24 md:space-y-32">
        <section id="remerciements" className="scroll-mt-20 sm:scroll-mt-24">
          <Remerciements />
        </section>

        <section id="universe-star-finder" className="bg-green-50 rounded-lg p-4 sm:p-6 md:p-8 scroll-mt-20 sm:scroll-mt-24">
          <UniverseStarFinder />
        </section>

        <section id="synopsis" className="bg-black text-white rounded-lg p-4 sm:p-6 md:p-8 scroll-mt-20 sm:scroll-mt-24">
          <Synopsis />
        </section>

        <section id="questionnaire" className="bg-blue-50 rounded-lg p-4 sm:p-6 md:p-8 scroll-mt-20 sm:scroll-mt-24">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-serif">Quiz des Étoiles</h2>
            {!gameProgress.questionnaireStarted && (
              <button
                onClick={handleQuestionnaireStart}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Commencer le Quiz
              </button>
            )}
          </div>
          {gameProgress.questionnaireStarted ? (
            <Questionnaire 
              onComplete={handleQuestionnaireComplete}
            />
          ) : (
            <div className="text-center p-8">
              <p className="text-gray-600">
                Cliquez sur "Commencer le Quiz" pour démarrer le chronomètre et commencer à jouer !
              </p>
            </div>
          )}
        </section>

        {gameProgress.questionnaireCompleted ? (
          <section id="memory-game" className="bg-indigo-50 rounded-lg p-4 sm:p-6 md:p-8 scroll-mt-20 sm:scroll-mt-24">
            <MemoryGame onComplete={handleMemoryGameComplete} />
          </section>
        ) : (
          <section className="bg-gray-100 rounded-lg p-4 sm:p-6 md:p-8 text-center">
            <p className="text-gray-600 text-sm sm:text-base">Complétez le questionnaire pour débloquer le jeu de mémoire</p>
          </section>
        )}

        {gameProgress.memoryGameCompleted ? (
          <section id="music-quiz" className="bg-green-50 rounded-lg p-4 sm:p-6 md:p-8 scroll-mt-20 sm:scroll-mt-24">
            <MusicQuiz onComplete={handleMusicQuizComplete} />
          </section>
        ) : (
          <section className="bg-gray-100 rounded-lg p-4 sm:p-6 md:p-8 text-center">
            <p className="text-gray-600 text-sm sm:text-base">Complétez le jeu de mémoire pour débloquer le quiz musical</p>
          </section>
        )}

        {gameProgress.musicQuizCompleted ? (
          <section id="mushroom-quiz" className="bg-green-50 rounded-lg p-4 sm:p-6 md:p-8 scroll-mt-20 sm:scroll-mt-24">
            <MushroomQuiz onComplete={handleMushroomQuizComplete} />
          </section>
        ) : (
          <section className="bg-gray-100 rounded-lg p-4 sm:p-6 md:p-8 text-center">
            <p className="text-gray-600 text-sm sm:text-base">Complétez le quiz musical pour débloquer le quiz des champignons</p>
          </section>
        )}

        {gameProgress.mushroomQuizCompleted && (
          <section id="final-reward" className="scroll-mt-20 sm:scroll-mt-24">
            <FinalReward finalTime={elapsedTime} />
          </section>
        )}
      </main>

      <footer className="text-center py-6 sm:py-8 text-gray-600">
        <p className="font-serif italic text-sm sm:text-base">Avec tout mon amour sincère. Merci</p>
      </footer>
    </div>
  );
}