
import { useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('.');

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'about':
        return (
          <div className="space-y-1.5">
            <h2 className={`text-xs font-semibold tracking-wide ${isDarkMode ? 'text-zinc-200' : 'text-stone-800'}`}>ABOUT</h2>
            <p className={`text-[10px] leading-relaxed ${isDarkMode ? 'text-zinc-400' : 'text-stone-600'}`}>
              Passionate IT student specializing in full-stack development, mobile applications, and emerging technologies.
            </p>
          </div>
        );
      case 'education':
        return (
          <div className="space-y-2">
            <h2 className={`text-xs font-semibold tracking-wide ${isDarkMode ? 'text-zinc-200' : 'text-stone-800'}`}>EDUCATION</h2>
            <div className="space-y-1.5">
              <div>
                <h3 className={`font-medium text-[10px] ${isDarkMode ? 'text-zinc-100' : 'text-stone-900'}`}>CBIT</h3>
                <p className={`text-[9px] ${isDarkMode ? 'text-zinc-400' : 'text-stone-600'}`}>B.E IT (2023-Present) CGPA: 8.10</p>
              </div>
              <div>
                <h3 className={`font-medium text-[10px] ${isDarkMode ? 'text-zinc-100' : 'text-stone-900'}`}>Government Polytechnic</h3>
                <p className={`text-[9px] ${isDarkMode ? 'text-zinc-400' : 'text-stone-600'}`}>Diploma CE (2020-2023) CGPA: 9.74</p>
              </div>
            </div>
          </div>
        );
      case 'skills':
        return (
          <div className="space-y-1.5">
            <h2 className={`text-xs font-semibold tracking-wide ${isDarkMode ? 'text-zinc-200' : 'text-stone-800'}`}>SKILLS</h2>
            <div className="space-y-1 text-[10px]">
              <div>
                <p className={`font-medium ${isDarkMode ? 'text-zinc-100' : 'text-stone-900'}`}>Languages</p>
                <p className={`${isDarkMode ? 'text-zinc-400' : 'text-stone-600'}`}>C++, Java, Python, Kotlin</p>
              </div>
              <div>
                <p className={`font-medium ${isDarkMode ? 'text-zinc-100' : 'text-stone-900'}`}>Web Development</p>
                <p className={`${isDarkMode ? 'text-zinc-400' : 'text-stone-600'}`}>Node.js</p>
              </div>
            </div>
          </div>
        );
      case 'projects':
        return (
          <div className="space-y-2">
            <h2 className={`text-xs font-semibold tracking-wide ${isDarkMode ? 'text-zinc-200' : 'text-stone-800'}`}>PROJECTS</h2>
            <div className="space-y-1.5">
              <div>
                <h3 className={`font-medium text-[10px] ${isDarkMode ? 'text-zinc-100' : 'text-stone-900'}`}>Versatile Converter</h3>
                <p className={`text-[9px] ${isDarkMode ? 'text-zinc-400' : 'text-stone-600'}`}>Python app with Tesseract OCR</p>
              </div>
              <div>
                <h3 className={`font-medium text-[10px] ${isDarkMode ? 'text-zinc-100' : 'text-stone-900'}`}>Student Dashboard</h3>
                <p className={`text-[9px] ${isDarkMode ? 'text-zinc-400' : 'text-stone-600'}`}>Node.js platform with Chart.js</p>
              </div>
            </div>
          </div>
        );
      case 'certifications':
        return (
          <div className="space-y-1.5">
            <h2 className={`text-xs font-semibold tracking-wide ${isDarkMode ? 'text-zinc-200' : 'text-stone-800'}`}>CERTIFICATIONS</h2>
            <div className={`space-y-0.5 text-[10px] ${isDarkMode ? 'text-zinc-400' : 'text-stone-600'}`}>
              <p>• MongoDB Node.js</p>
              <p>• Web Development 101</p>
            </div>
          </div>
        );
      case 'contact':
        return (
          <div className="space-y-1.5">
            <h2 className={`text-xs font-semibold tracking-wide ${isDarkMode ? 'text-zinc-200' : 'text-stone-800'}`}>CONTACT</h2>
            <div className={`space-y-0.5 text-[10px] ${isDarkMode ? 'text-zinc-400' : 'text-stone-600'}`}>
              <p>+91 7702608995</p>
              <p>vinithreddybanda@gmail.com</p>
              <p>linkedin.com/vinithreddybanda</p>
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-2">
            <div>
              <h1 className={`text-sm font-bold mb-0.5 tracking-wide ${isDarkMode ? 'text-zinc-100' : 'text-stone-800'}`}>
                VINITH REDDY BANDA
              </h1>
              <p className={`text-[10px] ${isDarkMode ? 'text-zinc-400' : 'text-stone-600'}`}>
                Information Technology Student & Developer
              </p>
            </div>
            <div className={`text-[10px] ${isDarkMode ? 'text-zinc-400' : 'text-stone-600'}`}>
              <p>Passionate about creating innovative solutions</p>
              <p>Currently pursuing B.E in IT at CBIT</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`h-screen overflow-hidden transition-all duration-500 ${isDarkMode ? 'dark bg-zinc-900' : 'bg-stone-100'}`}>
      {/* Mathematical Wave Grain Particles Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className={`w-full h-full mathematical-wave-particles ${isDarkMode ? 'dark-particles' : 'light-particles'}`}></div>
      </div>
      
      {/* Main container */}
      <div className="h-screen p-3">
        <div className={`h-full border transition-colors duration-500 ${isDarkMode ? 'border-zinc-700 bg-zinc-800/95' : 'border-stone-300 bg-stone-50/95'} backdrop-blur-sm shadow-lg flex flex-col`}>
          
          {/* Top Navigation Strip */}
          <div className="flex items-center justify-between p-2 border-b border-opacity-30 border-stone-400 dark:border-zinc-600">
            <nav className="flex-1">
              <ul className="flex flex-wrap gap-1.5 text-[10px]">
                {['.', 'about', 'education', 'skills', 'projects', 'certifications', 'contact'].map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => setActiveSection(item)}
                      className={`px-1.5 py-0.5 rounded transition-colors ${
                        activeSection === item
                          ? isDarkMode ? 'bg-zinc-700 text-zinc-100' : 'bg-stone-200 text-stone-900'
                          : isDarkMode ? 'text-zinc-400 hover:text-zinc-200' : 'text-stone-600 hover:text-stone-800'
                      }`}
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
            
            <Button
              onClick={toggleTheme}
              variant="ghost"
              size="icon"
              className="hover:bg-stone-200 dark:hover:bg-zinc-700 h-6 w-6 ml-2"
            >
              {isDarkMode ? <Sun className="h-3 w-3" /> : <Moon className="h-3 w-3" />}
            </Button>
          </div>

          {/* Content area - Left aligned */}
          <main className="flex-1 p-4 overflow-hidden">
            <div className="h-full flex items-center">
              <div className="w-full max-w-md">
                {renderContent()}
              </div>
            </div>
          </main>

          {/* Footer */}
          <footer className={`p-2 border-t border-opacity-30 border-stone-400 dark:border-zinc-600 text-[9px] ${isDarkMode ? 'text-zinc-500' : 'text-stone-500'}`}>
            <p>Hyderabad, India</p>
          </footer>

        </div>
      </div>
    </div>
  );
};

export default Index;
