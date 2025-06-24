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
          <div className="space-y-2">
            <h2 className={`text-sm font-semibold tracking-wide ${isDarkMode ? 'text-zinc-200' : 'text-stone-800'}`}>ABOUT</h2>
            <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-zinc-400' : 'text-stone-600'}`}>
              Passionate IT student specializing in full-stack development, mobile applications, and emerging technologies.
            </p>
          </div>
        );
      case 'education':
        return (
          <div className="space-y-3">
            <h2 className={`text-sm font-semibold tracking-wide ${isDarkMode ? 'text-zinc-200' : 'text-stone-800'}`}>EDUCATION</h2>
            <div className="space-y-2">
              <div>
                <h3 className={`font-medium text-sm ${isDarkMode ? 'text-zinc-100' : 'text-stone-900'}`}>CBIT</h3>
                <p className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-stone-600'}`}>B.E IT (2023-Present) CGPA: 8.10</p>
              </div>
              <div>
                <h3 className={`font-medium text-sm ${isDarkMode ? 'text-zinc-100' : 'text-stone-900'}`}>Government Polytechnic</h3>
                <p className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-stone-600'}`}>Diploma CE (2020-2023) CGPA: 9.74</p>
              </div>
            </div>
          </div>
        );
      case 'skills':
        return (
          <div className="space-y-2">
            <h2 className={`text-sm font-semibold tracking-wide ${isDarkMode ? 'text-zinc-200' : 'text-stone-800'}`}>SKILLS</h2>
            <div className="space-y-2 text-xs">
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
            <h2 className={`text-sm font-semibold tracking-wide ${isDarkMode ? 'text-zinc-200' : 'text-stone-800'}`}>PROJECTS</h2>
            <div className="space-y-2">
              <div>
                <h3 className={`font-medium text-sm ${isDarkMode ? 'text-zinc-100' : 'text-stone-900'}`}>Versatile Converter</h3>
                <p className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-stone-600'}`}>Python app with Tesseract OCR</p>
              </div>
              <div>
                <h3 className={`font-medium text-sm ${isDarkMode ? 'text-zinc-100' : 'text-stone-900'}`}>Student Dashboard</h3>
                <p className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-stone-600'}`}>Node.js platform with Chart.js</p>
              </div>
            </div>
          </div>
        );
      case 'certifications':
        return (
          <div className="space-y-2">
            <h2 className={`text-sm font-semibold tracking-wide ${isDarkMode ? 'text-zinc-200' : 'text-stone-800'}`}>CERTIFICATIONS</h2>
            <div className={`space-y-1 text-xs ${isDarkMode ? 'text-zinc-400' : 'text-stone-600'}`}>
              <p>• MongoDB Node.js</p>
              <p>• Web Development 101</p>
            </div>
          </div>
        );
      case 'contact':
        return (
          <div className="space-y-2">
            <h2 className={`text-sm font-semibold tracking-wide ${isDarkMode ? 'text-zinc-200' : 'text-stone-800'}`}>CONTACT</h2>
            <div className={`space-y-1 text-xs ${isDarkMode ? 'text-zinc-400' : 'text-stone-600'}`}>
              <p>vinithreddybanda@gmail.com</p>
              <p>linkedin.com/vinithreddybanda</p>
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-3">
            <div>
              <h1 className={`text-lg font-bold tracking-wide ${isDarkMode ? 'text-zinc-100' : 'text-stone-800'}`}>
                VINITH REDDY BANDA
              </h1>
              <p className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-stone-600'}`}>
                Information Technology Student & Developer
              </p>
            </div>
            <div className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-stone-600'}`}>
              <p>Passionate about creating innovative solutions</p>
              <p>Currently pursuing B.E in IT at CBIT</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`h-screen overflow-hidden transition-all duration-500 ${isDarkMode ? 'dark bg-zinc-900' : 'bg-stone-100'}`}>
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className={`w-full h-full mathematical-wave-particles ${isDarkMode ? 'dark-particles' : 'light-particles'}`}></div>
      </div>

      {/* Container */}
      <div className="h-screen p-3">
        <div className={`h-full border transition-colors duration-500 ${isDarkMode ? 'border-zinc-700 bg-zinc-800/95' : 'border-stone-300 bg-stone-50/95'} backdrop-blur-sm shadow-lg flex flex-col`}>
          
          {/* Navigation */}
          <div className="flex items-center justify-between p-2 border-b border-opacity-30 border-stone-400 dark:border-zinc-600">
            <nav className="flex-1">
              <ul className="flex flex-wrap gap-1.5 text-xs">
                {['.', 'about', 'education', 'skills', 'projects', 'certifications', 'contact'].map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => setActiveSection(item)}
                      className={`px-2 py-0.5 rounded transition-colors ${
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
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>

          {/* Content */}
          <main className="flex-1 p-4 overflow-hidden">
            <div className="h-full flex items-center">
              <div className="w-full max-w-md ml-4">
                {renderContent()}
              </div>
            </div>
          </main>

          {/* Footer */}
          <footer className={`p-2 border-t border-opacity-30 border-stone-400 dark:border-zinc-600 text-xs ${isDarkMode ? 'text-zinc-500' : 'text-stone-500'} flex justify-between items-center`}>
  <p>Hyderabad, India</p>
  <a
    href="/src/pages/vinithreddybanda.pdf" // Update this path to your resume's actual location
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-500 hover:underline hover:text-blue-600"
  >
    View Resume
  </a>
</footer>

        </div>
      </div>
    </div>
  );
};

export default Index;
