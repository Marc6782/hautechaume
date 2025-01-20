import React, { useState } from 'react';
import { Trophy, Clock, Medal } from 'lucide-react';

interface Score {
  name: string;
  time: number;
  date: string;
}

interface LeaderboardProps {
  currentTime: number;
}

function formatTime(time: number): string {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function Leaderboard({ currentTime }: LeaderboardProps) {
  const [playerName, setPlayerName] = useState('');
  const [scores, setScores] = useState<Score[]>(() => {
    const savedScores = localStorage.getItem('gameScores');
    return savedScores ? JSON.parse(savedScores) : [];
  });
  const [showForm, setShowForm] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName.trim() || isSubmitting) return;

    setIsSubmitting(true);

    const newScore: Score = {
      name: playerName.trim(),
      time: currentTime,
      date: new Date().toLocaleDateString()
    };

    const newScores = [...scores, newScore]
      .sort((a, b) => a.time - b.time)
      .slice(0, 10);

    setScores(newScores);
    localStorage.setItem('gameScores', JSON.stringify(newScores));
    
    setTimeout(() => {
      setShowForm(false);
      setIsSubmitting(false);
    }, 500);
  };

  const getMedalColor = (index: number) => {
    switch (index) {
      case 0: return 'text-yellow-400';
      case 1: return 'text-gray-400';
      case 2: return 'text-amber-600';
      default: return 'text-gray-300';
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6 animate-fade-in">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Trophy className="w-8 h-8 text-yellow-500 animate-pulse" />
          <h3 className="text-2xl font-bold">Tableau des Scores</h3>
        </div>
        <div className="flex items-center justify-center gap-2 text-lg">
          <Clock className="w-6 h-6 text-blue-500" />
          <span>Votre temps : </span>
          <span className="font-mono font-bold text-blue-600">{formatTime(currentTime)}</span>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex flex-col items-center gap-4">
            <div className="w-full max-w-xs">
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Entrez votre nom"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                maxLength={20}
                disabled={isSubmitting}
              />
              {playerName.length > 0 && playerName.length < 3 && (
                <p className="mt-1 text-sm text-red-500">
                  Le nom doit contenir au moins 3 caractères
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={playerName.length < 3 || isSubmitting}
              className={`
                px-6 py-2 bg-blue-500 text-white rounded-lg
                transition-all duration-300
                ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600 hover:scale-105'}
              `}
            >
              {isSubmitting ? 'Enregistrement...' : 'Enregistrer mon score'}
            </button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {scores.map((score, index) => (
          <div
            key={index}
            className={`
              flex items-center justify-between p-4 rounded-lg
              transition-all duration-300
              ${index === 0 ? 'bg-yellow-50 scale-105' : 'bg-gray-50 hover:scale-[1.02]'}
              ${score.time === currentTime && !showForm ? 'ring-2 ring-blue-500' : ''}
            `}
          >
            <div className="flex items-center gap-4">
              <Medal className={`w-6 h-6 ${getMedalColor(index)}`} />
              <span className="font-medium">{score.name}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-mono font-bold text-blue-600">{formatTime(score.time)}</span>
              <span className="text-sm text-gray-500">{score.date}</span>
            </div>
          </div>
        ))}

        {scores.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 italic">
              Soyez le premier à enregistrer un score !
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Leaderboard;