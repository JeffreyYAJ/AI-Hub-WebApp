import { Modal } from './Modal';
import { useApp } from '../context/AppContext';
import { Sun, Moon, Sidebar as SidebarIcon, PanelBottom, PanelLeft, PanelRight } from 'lucide-react';
import { BarPosition } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { theme, setTheme, barPosition, setBarPosition } = useApp();

  const positions: { value: BarPosition; label: string; icon: typeof PanelLeft }[] = [
    { value: 'left', label: 'Left', icon: PanelLeft },
    { value: 'right', label: 'Right', icon: PanelRight },
    { value: 'bottom', label: 'Bottom', icon: PanelBottom },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Settings">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-white/80 mb-3">
            Theme
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setTheme('dark')}
              className={`
                flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all
                ${theme === 'dark'
                  ? 'border-blue-500 bg-blue-500/20'
                  : 'border-white/10 bg-white/5 hover:bg-white/10'
                }
              `}
            >
              <Moon size={20} className="text-white" />
              <span className="text-white font-medium">Dark</span>
            </button>
            <button
              onClick={() => setTheme('light')}
              className={`
                flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all
                ${theme === 'light'
                  ? 'border-blue-500 bg-blue-500/20'
                  : 'border-white/10 bg-white/5 hover:bg-white/10'
                }
              `}
            >
              <Sun size={20} className="text-white" />
              <span className="text-white font-medium">Light</span>
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-white/80 mb-3">
            Sidebar Position
          </label>
          <div className="grid grid-cols-3 gap-3">
            {positions.map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                onClick={() => setBarPosition(value)}
                className={`
                  flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all
                  ${barPosition === value
                    ? 'border-blue-500 bg-blue-500/20'
                    : 'border-white/10 bg-white/5 hover:bg-white/10'
                  }
                `}
              >
                <Icon size={24} className="text-white" />
                <span className="text-white text-sm font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-white/10">
          <div className="flex items-center gap-2 text-white/60 text-sm">
            <SidebarIcon size={16} />
            <span>Drag sites to reorder them in the sidebar</span>
          </div>
        </div>
      </div>
    </Modal>
  );
}
