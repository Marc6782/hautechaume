import React from 'react';
import { Star } from 'lucide-react';

function Header() {
  return (
    <header className="relative w-full overflow-hidden bg-gradient-to-b from-blue-50 to-slate-50 py-24 sm:py-32">
      <div className="absolute inset-0 opacity-10">
        <div className="constellation-leo absolute top-1/4 left-1/4"></div>
        <div className="constellation-capricorn absolute top-1/4 right-1/4"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="relative text-center">
          <div className="relative px-6 py-8 sm:py-12">
            <h1 className="font-serif mb-4 sm:mb-6">
              <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl animate-title-gradient">
                Une Lumière Éternelle
              </span>
              <Star className="inline-block text-amber-400 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 animate-pulse" />
            </h1>
            
            <p className="text-xl sm:text-2xl md:text-3xl text-gray-600 max-w-3xl mx-auto font-serif italic">
              La lumière d'une étoile ne s'éteint jamais
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;