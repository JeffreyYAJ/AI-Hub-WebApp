import { useState } from 'react';
import { X, GripVertical } from 'lucide-react';
import { AISite } from '../types';
import { useApp } from '../context/AppContext';

interface SitePinProps {
  site: AISite;
  isActive: boolean;
  onDragStart: (e: React.DragEvent, site: AISite) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, targetSite: AISite) => void;
}

export function SitePin({ site, isActive, onDragStart, onDragOver, onDrop }: SitePinProps) {
  const { setCurrentSite, removeSite } = useApp();
  const [showDelete, setShowDelete] = useState(false);

  const handleClick = () => {
    setCurrentSite(site.id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    removeSite(site.id);
  };

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, site)}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, site)}
      onMouseEnter={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
      onClick={handleClick}
      className={`
        group relative flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200
        ${isActive
          ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-2 border-blue-500/50 shadow-lg'
          : 'bg-white/5 hover:bg-white/10 border-2 border-transparent'
        }
      `}
    >
      <div className="cursor-grab active:cursor-grabbing text-white/40 hover:text-white/60 transition-colors">
        <GripVertical size={16} />
      </div>
      <div className="text-2xl">{site.icon}</div>
      <div className="flex-1 min-w-0">
        <div className="text-white font-medium truncate">{site.name}</div>
      </div>
      {showDelete && (
        <button
          onClick={handleDelete}
          className="text-red-400 hover:text-red-300 transition-colors opacity-0 group-hover:opacity-100"
        >
          <X size={18} />
        </button>
      )}
      {isActive && (
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-pulse pointer-events-none" />
      )}
    </div>
  );
}
