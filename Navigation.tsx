import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 100;

      sections.forEach(section => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute('id') || '';

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { id: 'remerciements', label: 'Remerciements' },
    { id: 'universe-star-finder', label: 'Universe Star Finder' },
    { id: 'synopsis', label: 'Synopsis' },
    { id: 'questionnaire', label: 'Questionnaire' },
    { id: 'memory-game', label: 'Jeu de Mémoire' },
    { id: 'music-quiz', label: 'Quiz Musical' }
  ];

  const handleClick = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="bg-white/95 backdrop-blur-sm shadow-md sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-4">
        {/* Version desktop */}
        <ul className="hidden md:flex justify-center space-x-8 py-4">
          {menuItems.map(item => (
            <li key={item.id}>
              <button
                onClick={() => handleClick(item.id)}
                className={`text-gray-600 hover:text-gray-900 transition-colors relative py-1 px-2
                  ${activeSection === item.id ? 'text-blue-600 font-medium' : ''}
                `}
              >
                {item.label}
                {activeSection === item.id && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full" />
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* Version mobile */}
        <div className="md:hidden flex items-center justify-between py-4">
          <button
            onClick={toggleMenu}
            className="text-gray-600 hover:text-gray-900 transition-colors p-2 rounded-lg hover:bg-gray-100"
            aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <span className="text-gray-900 font-medium">Menu</span>
          <div className="w-10" />
        </div>
      </div>

      {/* Menu mobile déroulant avec animation */}
      <div
        className={`md:hidden fixed inset-x-0 bg-white/95 backdrop-blur-sm border-t border-gray-100 transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'top-[65px] opacity-100' : 'top-[-100%] opacity-0'
        }`}
      >
        <div className="container mx-auto px-4">
          <ul className="py-2 space-y-1">
            {menuItems.map(item => (
              <li key={item.id}>
                <button
                  onClick={() => handleClick(item.id)}
                  className={`w-full text-left py-3 px-4 rounded-lg transition-colors
                    ${
                      activeSection === item.id
                        ? 'bg-blue-50 text-blue-600 font-medium'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;