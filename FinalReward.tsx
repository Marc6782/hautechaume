import React from 'react';
import { Star, Clock } from 'lucide-react';
import Leaderboard from './Leaderboard';

interface FinalRewardProps {
  finalTime: number;
}

function formatTime(time: number): string {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function FinalReward({ finalTime }: FinalRewardProps) {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4 md:p-8">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center gap-4">
            <h2 className="text-3xl font-serif">
              <Star className="inline-block text-yellow-500 w-8 h-8 mr-2" />
              Félicitations !
              <Star className="inline-block text-yellow-500 w-8 h-8 ml-2" />
            </h2>
            <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg">
              <Clock className="w-5 h-5 text-blue-500" />
              <span className="font-mono font-bold">{formatTime(finalTime)}</span>
            </div>
          </div>
          
          <p className="text-xl text-gray-700 mb-8">
            Vous avez complété tous les défis avec brio !
          </p>

          <div className="relative rounded-lg overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1465056836041-7f43ac27dcb5"
              alt="Mer de nuages au coucher du soleil"
              className="w-full h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end justify-center p-8">
              <p className="text-white text-xl font-serif italic">
                "Au-dessus des nuages, le ciel est toujours bleu"
              </p>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-gray-600">
              Cette vue magnifique symbolise votre parcours à travers les étoiles, les planètes et la nature.
              Comme ces nuages qui dansent sous le soleil, chaque défi relevé vous a fait monter un peu plus haut.
            </p>
          </div>
        </div>
      </div>

      <Leaderboard currentTime={finalTime} />
    </div>
  );
}

export default FinalReward;