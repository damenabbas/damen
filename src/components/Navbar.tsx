import { useEffect, useState } from 'react';
import { Home, Mountain, Waves, Brain, Menu, X } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const navItems = [
  { id: 'home', label: 'الرئيسية', icon: Home },
  { id: 'mountains-deserts', label: 'الجبال والصحاري', icon: Mountain },
  { id: 'seas-palms', label: 'البحار والنخيل', icon: Waves },
  { id: 'ai-classifier', label: 'الذكاء الاصطناعي', icon: Brain },
];

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page: string) => {
    onNavigate(page);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled ? 'glass shadow-lg py-2' : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 group"
            >
              <div className="relative">
                <div className="w-11 h-11 rounded-full bg-saudi-green flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-heading font-bold text-lg">96</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gold animate-pulse" />
              </div>
              <div className="text-right hidden sm:block">
                <h1
                  className={`font-heading font-bold text-base leading-tight transition-colors duration-300 ${
                    scrolled ? 'text-saudi-green-dark' : 'text-white'
                  }`}
                >
                  اليوم الوطني السعودي
                </h1>
                <p
                  className={`text-xs transition-colors duration-300 ${
                    scrolled ? 'text-gold-dark' : 'text-gold-light'
                  }`}
                >
                  ٩٦ - طبيعة المملكة
                </p>
              </div>
            </button>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-body font-medium text-sm transition-all duration-300 ${
                      isActive
                        ? 'bg-saudi-green text-white shadow-lg'
                        : scrolled
                        ? 'text-saudi-green-dark hover:bg-saudi-green-50'
                        : 'text-white hover:bg-white/20'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                scrolled ? 'text-saudi-green-dark' : 'text-white'
              }`}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-30 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute top-20 right-0 left-0 glass shadow-2xl rounded-b-2xl mx-4 overflow-hidden animate-scale-in">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-6 py-4 font-body font-medium transition-colors border-b border-saudi-green-100 last:border-0 ${
                    isActive
                      ? 'bg-saudi-green text-white'
                      : 'text-saudi-green-dark hover:bg-saudi-green-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
