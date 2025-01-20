import React, { useState } from 'react';
import { Play } from 'lucide-react';

function Synopsis() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-serif text-center mb-6 md:mb-8">
        Rando du père Jeanno : Les Hautes Chaumes d'Alsace
      </h2>

      <div className="grid md:grid-cols-2 gap-6 md:gap-8">
        <div className="space-y-4 order-2 md:order-1">
          <p className="text-gray-300 leading-relaxed text-sm md:text-base">
            Dans ce documentaire fiction léger et émouvant, Jeanno part à l'aventure dans la nature pour se reconnecter avec lui-même après des épreuves personnelles. Après une première tentative de bivouac chaotique, il se lance de nouveau sur les sentiers, transformant chaque pas en une exploration intérieure.
          </p>
          
          <p className="text-gray-300 leading-relaxed text-sm md:text-base">
            À travers des moments de légèreté et de réflexion, ce voyage devient une quête de résilience. Les paysages magnifiques et les instants de contemplation révèlent une force insoupçonnée, célébrant la beauté de la vie et la lumière qui peut émerger des moments de ténèbres.
          </p>

          <button
            onClick={() => setIsPlaying(true)}
            className={`
              group mt-4 md:mt-6 px-4 md:px-6 py-2 md:py-2.5 
              bg-white/10 hover:bg-white/20
              backdrop-blur-sm
              border border-white/20
              rounded-full
              transition-all duration-300
              flex items-center justify-center gap-2 md:gap-3
              text-white/90 hover:text-white
              text-sm md:text-base font-medium
              shadow-lg shadow-black/5
              w-full md:w-auto
              ${isPlaying ? 'opacity-50 cursor-default' : 'hover:scale-[1.02]'}
            `}
            disabled={isPlaying}
          >
            <Play className={`w-4 h-4 ${isPlaying ? '' : 'group-hover:scale-110 transition-transform duration-300'}`} />
            <span className="tracking-wide">
              {isPlaying ? 'Lecture en cours...' : 'Regarder la vidéo'}
            </span>
          </button>
        </div>

        <div className="relative order-1 md:order-2 rounded-lg overflow-hidden flex justify-center">
          <div className="w-full md:w-[315px] aspect-[9/16]">
            <iframe
              src={`https://www.youtube.com/embed/Pj7Y6ogKZqk?autoplay=1&mute=1&loop=1&playlist=Pj7Y6ogKZqk&controls=1&rel=0${isPlaying ? '' : '&controls=0'}`}
              title="Rando du père Jeanno"
              className="absolute inset-0 w-full h-full rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Synopsis;