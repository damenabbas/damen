import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Confetti from '@/components/Confetti';
import HomePage from '@/pages/HomePage';
import MountainsDesertsPage from '@/pages/MountainsDesertsPage';
import SeasPalmsPage from '@/pages/SeasPalmsPage';
import AIClassifierPage from '@/pages/AIClassifierPage';

type Page = 'home' | 'mountains-deserts' | 'seas-palms' | 'ai-classifier';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [showConfetti, setShowConfetti] = useState(true);

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
  };

  const dismissConfetti = () => {
    setShowConfetti(false);
  };

  return (
    <div className="min-h-screen bg-cream" onClick={dismissConfetti}>
      {showConfetti && currentPage === 'home' && <Confetti />}
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
      <main>
        {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
        {currentPage === 'mountains-deserts' && <MountainsDesertsPage onNavigate={handleNavigate} />}
        {currentPage === 'seas-palms' && <SeasPalmsPage onNavigate={handleNavigate} />}
        {currentPage === 'ai-classifier' && <AIClassifierPage onNavigate={handleNavigate} />}
      </main>
    </div>
  );
}

export default App;
