import React, { useState, useRef, useEffect } from 'react';
import { Heart, Volume2, VolumeX } from 'lucide-react';

function Remerciements() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Créer un nouvel élément audio avec un fichier plus léger
    audioRef.current = new Audio('https://upload.wikimedia.org/wikipedia/commons/8/8d/Vivaldi_-_Autumn_mvt_1_Allegro.ogg');
    
    const audio = audioRef.current;
    
    const handleEnded = () => setIsPlaying(false);
    const handleError = () => {
      setAudioError('Erreur lors du chargement de la musique');
      setIsPlaying(false);
    };

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    // Précharger l'audio
    audio.load();

    return () => {
      if (audio) {
        audio.pause();
        audio.removeEventListener('ended', handleEnded);
        audio.removeEventListener('error', handleError);
      }
    };
  }, []);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        setAudioError(null);
        // Réinitialiser l'audio avant de jouer
        audioRef.current.currentTime = 0;
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Erreur de lecture:', error);
      setAudioError('Impossible de lire la musique. Veuillez réessayer.');
      setIsPlaying(false);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl">
      <h2 className="text-4xl font-serif text-center mb-12">Remerciements</h2>
      
      <div className="bg-white rounded-lg shadow-lg p-8 sm:p-12">
        <div 
          className="relative aspect-video mb-8 group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b"
            alt="Coucher de soleil sur les montagnes"
            className={`w-full h-full object-cover rounded-lg transition-all duration-500 ${
              isHovered ? 'brightness-75' : 'brightness-100'
            }`}
          />
          
          <button
            onClick={togglePlay}
            className={`
              absolute bottom-4 right-4
              p-3 rounded-full
              transition-all duration-300
              ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
              ${isPlaying ? 'bg-white text-blue-600' : 'bg-blue-600 text-white'}
              hover:scale-110
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            `}
            aria-label={isPlaying ? 'Arrêter la musique' : 'Jouer la musique'}
          >
            {isPlaying ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
          </button>

          {audioError && (
            <div className="absolute bottom-4 left-4 bg-red-500 text-white px-4 py-2 rounded-lg text-sm animate-fade-in">
              {audioError}
            </div>
          )}
        </div>

        <div className="space-y-8">
          <p className="text-lg text-gray-700 leading-relaxed">
            Je tiens à remercier du fond du cœur toutes les personnes qui nous ont soutenus pendant ces moments difficiles. Votre présence, vos messages et votre amour nous ont donné la force de continuer.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed">
            Un merci spécial à l'équipe médicale pour leurs soins attentionnés, à notre famille pour son soutien inconditionnel, et à nos amis pour leur présence constante.
          </p>

          <div className="text-center">
            <Heart className="inline-block text-pink-500 w-12 h-12 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Remerciements;