// 404.tsx or Index.tsx or wherever you want particles
import { useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-background text-foreground">
      {/* Particle Layer */}
      <div
        className={`absolute inset-0 w-full h-full pointer-events-none mathematical-wave-particles ${
          isDarkMode ? 'dark-particles' : 'light-particles'
        } z-0`}
      />

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full gap-4">
        <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
        <p className="text-lg text-muted-foreground">
          Oops! The page you’re looking for doesn’t exist.
        </p>
        <Button onClick={toggleTheme} className="mt-4">
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />} Toggle Theme
        </Button>
      </div>
    </div>
  );
};

export default Index;
