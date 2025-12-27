import { useState } from 'react';
import { Plus, Settings } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AISite } from '../types';
import { SitePin } from './SitePin';
import { Button } from './Button';

interface SidebarProps {
  onAddClick: () => void;
  onSettingsClick: () => void;
}

export function Sidebar({ onAddClick, onSettingsClick }: SidebarProps) {
  const { pinnedSites, currentSiteId, updateSiteOrder, barPosition } = useApp();
  const [draggedSite, setDraggedSite] = useState<AISite | null>(null);

  const handleDragStart = (e: React.DragEvent, site: AISite) => {
    setDraggedSite(site);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetSite: AISite) => {
    e.preventDefault();
    if (!draggedSite || draggedSite.id === targetSite.id) return;

    const draggedIndex = pinnedSites.findIndex(s => s.id === draggedSite.id);
    const targetIndex = pinnedSites.findIndex(s => s.id === targetSite.id);

    const newSites = [...pinnedSites];
    newSites.splice(draggedIndex, 1);
    newSites.splice(targetIndex, 0, draggedSite);

    const reorderedSites = newSites.map((site, index) => ({
      ...site,
      order: index,
    }));

    updateSiteOrder(reorderedSites);
    setDraggedSite(null);
  };

  const isHorizontal = barPosition === 'bottom';

  return (
    <div
      className={`
        bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-xl border-white/10
        ${isHorizontal
          ? 'h-24 border-t flex flex-row items-center px-4 gap-4 overflow-x-auto'
          : 'w-80 border-r flex flex-col p-4 gap-4 overflow-y-auto'
        }
      `}
    >
      <div className={`flex ${isHorizontal ? 'flex-row gap-4' : 'flex-col gap-4'} flex-1`}>
        {pinnedSites.map(site => (
          <SitePin
            key={site.id}
            site={site}
            isActive={currentSiteId === site.id}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          />
        ))}
      </div>
      <div className={`flex gap-2 ${isHorizontal ? 'flex-row' : 'flex-col'}`}>
        <Button onClick={onAddClick} variant="primary" className="justify-center">
          <Plus size={20} />
          {!isHorizontal && 'Add Site'}
        </Button>
        <Button onClick={onSettingsClick} variant="ghost" className="justify-center">
          <Settings size={20} />
          {!isHorizontal && 'Settings'}
        </Button>
      </div>
    </div>
  );
}
