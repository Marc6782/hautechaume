import React from 'react';
import { Star, Download, Compass, Target } from 'lucide-react';

export default function UniverseStarFinder() {
  return (
    <div className="max-w-4xl mx-auto font-['Inter'] relative">
      {/* Animated stars background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 sm:w-2 h-1.5 sm:h-2 bg-pink-200 rounded-full animate-twinkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
        {[...Array(15)].map((_, i) => (
          <div
            key={`shooting-${i}`}
            className="absolute w-2 sm:w-3 h-0.5 sm:h-1 bg-gradient-to-r from-pink-200 to-transparent rounded-full animate-shooting-star"
            style={{
              top: `${Math.random() * 100}%`,
              left: '-10px',
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: '5s',
              transform: `rotate(${15 + Math.random() * 30}deg)`
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-center mb-6 sm:mb-8 md:mb-10">
          Universe Star Finder
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 aspect-[4/3] sm:aspect-[16/10]">
            <div className="relative h-full">
              <img
                src="https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/81/25/09/812509df-e4c7-e795-a7b1-f9390528ce2d/60315776-2595-44bb-afad-928a94a5ecbf_5.png/230x0w.webp"
                alt="Télescope sous les étoiles"
                className="w-full h-full object-cover rounded-lg"
                loading="lazy"
              />
            </div>
            <div className="relative h-full">
              <img
                src="https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/56/9d/9a/569d9a9e-d06c-277e-64c3-69e129537472/16d7e44b-be14-41b7-9804-a3723d0fc238_3.png/230x0w.webp"
                alt="Vue nocturne étoilée"
                className="w-full h-full object-cover rounded-lg"
                loading="lazy"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <div className="bg-white/90 backdrop-blur-sm p-4 sm:p-6 rounded-lg shadow relative z-10 flex-1">
              <h3 className="text-base sm:text-lg font-medium mb-4 flex items-center text-gray-800">
                <Star className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                Guide d'utilisation
              </h3>
              
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start space-x-3">
                  <Download className="w-4 sm:w-5 h-4 sm:h-5 text-blue-500 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-sm font-medium mb-1 text-gray-700">1. Téléchargez l'application</h4>
                    <div className="flex items-center gap-2">
                      <img
                        src="https://play-lh.googleusercontent.com/oC4WyvQ-JdH2Gww3mG9yYgPyJnGPSv_ueCXj31uEq5sZCb1p8S7AvLQOyrZEHOnG1A=w240-h480-rw"
                        alt="Logo Universe Star Finder"
                        className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl"
                      />
                      <p className="text-xs sm:text-sm text-gray-600">
                        Installez Universe Star Finder depuis l'App Store ou Google Play Store.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Target className="w-4 sm:w-5 h-4 sm:h-5 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-sm font-medium mb-1 text-gray-700">2. Trouvez votre étoile</h4>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Pour Lou (STL8262FR) : 20°46'5.7" -26°43'44.8" (Capricorne)<br />
                      Pour Léontine (STL8304FR) : 10°8'22.3" -11°58'2" (Lion)
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Compass className="w-4 sm:w-5 h-4 sm:h-5 text-purple-500 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-sm font-medium mb-1 text-gray-700">3. Observez le ciel</h4>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Levez votre téléphone vers le ciel et suivez les indications pour trouver votre étoile.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 mt-4">
              <div className="h-10 sm:h-12">
                <a 
                  href="https://apps.apple.com/fr/app/universe-star-finder/id1575384854" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="h-full transition-transform hover:scale-105"
                >
                  <img 
                    src="https://developer.apple.com/app-store/marketing/guidelines/images/badge-download-on-the-app-store.svg"
                    alt="Download on App Store"
                    className="h-full w-auto"
                    style={{ width: '120px', objectFit: 'contain' }}
                  />
                </a>
              </div>
              <div className="h-13 sm:h-16">
                <a 
                  href="https://play.google.com/store/search?q=universe+star+finder+3d&c=apps" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="h-full transition-transform hover:scale-105"
                >
                  <img 
                    src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                    alt="Get it on Google Play"
                    className="h-full w-auto"
                    style={{ width: '156px', objectFit: 'contain' }}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}