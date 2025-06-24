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

  const headingStyle = `text-base font-semibold tracking-wide ${isDarkMode ? 'text-zinc-200' : 'text-stone-800'}`;
  const subheadingStyle = `font-medium text-sm ${isDarkMode ? 'text-zinc-100' : 'text-stone-900'}`;
  const textStyle = `text-sm leading-snug ${isDarkMode ? 'text-zinc-400' : 'text-stone-600'}`;

  const renderContent = () => {
    switch (activeSection) {
      case 'about':
        return (
          <div className="space-y-1">
            <h2 className={headingStyle}>ABOUT</h2>
            <p className={textStyle}>Passionate IT student specializing in full-stack development, mobile applications, and emerging technologies.</p>
          </div>
        );
      case 'education':
        return (
          <div className="space-y-1">
            <h2 className={headingStyle}>EDUCATION</h2>
            <div>
              <h3 className={subheadingStyle}>CBIT</h3>
              <p className={textStyle}>B.E IT (2023-Present) CGPA: 8.10</p>
              <h3 className={subheadingStyle}>Government Polytechnic</h3>
              <p className={textStyle}>Diploma CE (2020-2023) CGPA: 9.74</p>
            </div>
          </div>
        );
      case 'skills':
        return (
          <div className="space-y-1">
            <h2 className={headingStyle}>SKILLS</h2>
            <div>
              <p className={subheadingStyle}>Languages</p>
              <p className={textStyle}>C++, Java, Python, Kotlin</p>
              <p className={subheadingStyle}>Web Development</p>
              <p className={textStyle}>Node.js</p>
            </div>
          </div>
        );
      case 'projects':
        return (
          <div className="space-y-1">
            <h2 className={headingStyle}>PROJECTS</h2>
            <div>
              <h3 className={subheadingStyle}>Versatile Converter</h3>
              <p className={textStyle}>Python app with Tesseract OCR</p>
              <h3 className={subheadingStyle}>Student Dashboard</h3>
              <p className={textStyle}>Node.js platform with Chart.js</p>
            </div>
          </div>
        );
      case 'certifications':
        return (
          <div className="space-y-1">
            <h2 className={headingStyle}>CERTIFICATIONS</h2>
            <div className={textStyle}>
              <p>• MongoDB Node.js</p>
              <p>• Web Development 101</p>
            </div>
          </div>
        );
      case 'contact':
        return (
          <div className="space-y-1">
            <h2 className={headingStyle}>CONTACT</h2>
            <div className={textStyle}>
              <p>vinithreddybanda@gmail.com</p>
              <p>linkedin.com/vinithreddybanda</p>
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-2">
            <div>
              <h1 className={`text-lg font-bold tracking-wide ${isDarkMode ? 'text-zinc-100' : 'text-stone-800'}`}>VINITH REDDY BANDA</h1>
              <p className={textStyle}>Information Technology Student & Developer</p>
            </div>
            <div className={textStyle}>
              <p>Passionate about creating innovative solutions</p>
              <p>Currently pursuing B.E in IT at CBIT</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`h-screen overflow-hidden transition-all duration-500 ${isDarkMode ? 'dark bg-zinc-900' : 'bg-stone-100'}`}>
      <div className="fixed inset-0 pointer-events-none">
        <div className={`w-full h-full mathematical-wave-particles ${isDarkMode ? 'dark-particles' : 'light-particles'}`} />
      </div>

      <div className="h-full p-2">
        <div className={`h-full border transition-colors duration-500 ${isDarkMode ? 'border-zinc-700 bg-zinc-800/95' : 'border-stone-300 bg-stone-50/95'} backdrop-blur-sm shadow-lg flex flex-col`}>

          {/* Nav */}
          <div className="flex items-center justify-between px-2 py-1 border-b border-opacity-30 border-stone-400 dark:border-zinc-600">
            <nav className="flex-1">
              <ul className="flex flex-wrap gap-1 text-sm">
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
          <main className="flex-1 p-4">
            <div className="h-full flex items-center justify-start">
              <div className="w-full max-w-md text-left">
                {renderContent()}
              </div>
            </div>
          </main>

          {/* Footer */}
          <footer className={`px-2 py-1 border-t border-opacity-30 border-stone-400 dark:border-zinc-600 text-sm ${isDarkMode ? 'text-zinc-500' : 'text-stone-500'} flex justify-between items-center`}>
            <p>Hyderabad, India</p>
            <a
              href="/vinithreddybanda.pdf"
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
