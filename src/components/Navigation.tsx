import { Scan, MapPin, Gift, User } from 'lucide-react';
import type { Screen } from '../App';

interface NavigationProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

export default function Navigation({ currentScreen, onNavigate }: NavigationProps) {
  const navItems: Array<{ screen: Screen; icon: React.ReactNode; label: string }> = [
    { screen: 'scanner', icon: <Scan className="w-6 h-6" />, label: 'Scan' },
    { screen: 'map', icon: <MapPin className="w-6 h-6" />, label: 'Peta' },
    { screen: 'rewards', icon: <Gift className="w-6 h-6" />, label: 'Rewards' },
    { screen: 'profile', icon: <User className="w-6 h-6" />, label: 'Profil' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-emerald-100 shadow-2xl z-50 rounded-t-3xl">
      <div className="max-w-md mx-auto">
        <div className="grid grid-cols-4">
          {navItems.map((item) => (
            <button
              key={item.screen}
              onClick={() => onNavigate(item.screen)}
              className={`flex flex-col items-center gap-1 py-3 transition-all ${
                currentScreen === item.screen
                  ? 'text-emerald-600 transform scale-110'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <div className={`${
                currentScreen === item.screen 
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white p-2 rounded-2xl shadow-lg' 
                  : ''
              }`}>
                {item.icon}
              </div>
              <span className={`${
                currentScreen === item.screen ? 'text-emerald-600' : 'text-gray-600'
              }`}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}