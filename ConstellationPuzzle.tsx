import React, { useState } from 'react';
import { Star } from 'lucide-react';

const PLANETS = [
  {
    id: 1,
    name: 'Mercure',
    image: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=400&h=400&fit=crop'
  },
  {
    id: 2,
    name: 'Vénus',
    image: 'https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?w=400&h=400&fit=crop'
  },
  {
    id: 3,
    name: 'Terre',
    image: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=400&h=400&fit=crop'
  },
  {
    id: 4,
    name: 'Mars',
    image: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=400&h=400&fit=crop'
  },
  {
    id: 5,
    name: 'Jupiter',
    image: 'https://images.unsplash.com/photo-1614314107768-6018061b5b72?w=400&h=400&fit=crop'
  },
  {
    id: 6,
    name: 'Saturne',
    image: 'https://images.unsplash.com/photo-1614732484003-ef9881555dc3?w=400&h=400&fit=crop'
  }
];

const MEMORY_CARDS = [...PLANETS, ...PLANETS].map((card, index) => ({
  ...card,
  uniqueId: index
}));

function shuffleArray(array: typeof MEMORY_CARDS) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

interface MemoryGameProps {
  onComplete: () => void;
}

function MemoryGame({ onComplete }: MemoryGameProps) {
  const [cards, setCards] = useState(() => shuffleArray(MEMORY_CARDS));
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [disabled, setDisabled] = useState(false);

  const handleClick = (uniqueId: number) => {
    if (flipped.includes(uniqueId) || disabled) {
      return;
    }

    const newFlipped = [...flipped, uniqueId];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setDisabled(true);
      const [firstId, secondId] = newFlipped;
      const firstCard = cards.find(card => card.uniqueId === firstId);
      const secondCard = cards.find(card => card.uniqueId === secondId);

      if (firstCard && secondCard && firstCard.id === secondCard.id) {
        setMatched([...matched, firstCard.id]);
        setFlipped([]);
        setDisabled(false);
        
        if (matched.length + 1 === PLANETS.length) {
          onComplete();
        }
      } else {
        setTimeout(() => {
          setFlipped([]);
          setDisabled(false);
        }, 1000);
      }
    }
  };

  const resetGame = () => {
    setCards(shuffleArray(MEMORY_CARDS));
    setFlipped([]);
    setMatched([]);
    setDisabled(false);
  };

  const isGameComplete = matched.length === PLANETS.length;

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-3 sm:p-4">
        <div className="flex justify-between items-center mb-3 sm:mb-4">
          <h2 className="text-xl sm:text-2xl font-serif">Jeu de Mémoire des Planètes</h2>
          <button
            onClick={resetGame}
            className="px-3 py-1.5 sm:px-4 sm:py-2 bg-indigo-500 text-white text-sm sm:text-base rounded-lg hover:bg-indigo-600 transition-colors"
          >
            Nouvelle Partie
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
          {cards.map(card => (
            <div
              key={card.uniqueId}
              className="relative aspect-square cursor-pointer"
              onClick={() => handleClick(card.uniqueId)}
            >
              <div
                className={`
                  absolute inset-0 w-full h-full
                  transform-gpu transition-all duration-500 preserve-3d
                  ${flipped.includes(card.uniqueId) || matched.includes(card.id) ? 'rotate-y-180' : ''}
                `}
              >
                <div
                  className={`
                    absolute inset-0 w-full h-full backface-hidden
                    bg-gradient-to-br from-indigo-500 to-purple-600
                    rounded-lg flex items-center justify-center p-2
                    transform-gpu
                  `}
                >
                  <Star className="w-6 h-6 sm:w-7 sm:h-7 text-white animate-pulse" />
                </div>

                <div
                  className={`
                    absolute inset-0 w-full h-full backface-hidden rotate-y-180
                    bg-white rounded-lg overflow-hidden transform-gpu
                  `}
                >
                  <img
                    src={card.image}
                    alt={card.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-black/60 backdrop-blur-sm p-1">
                    <p className="text-white font-medium text-center text-xs sm:text-sm">
                      {card.name}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {isGameComplete && (
          <div className="mt-4 sm:mt-6 text-center">
            <h3 className="text-xl sm:text-2xl font-bold text-green-600 mb-3 sm:mb-4">
              Félicitations ! Vous avez trouvé toutes les paires !
            </h3>
            <p className="text-gray-600 text-sm sm:text-base mb-4">
              Le quiz musical est maintenant débloqué !
            </p>
            <button
              onClick={resetGame}
              className="px-4 py-2 sm:px-6 sm:py-3 bg-green-500 text-white text-sm sm:text-base rounded-lg hover:bg-green-600 transition-colors"
            >
              Rejouer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MemoryGame;