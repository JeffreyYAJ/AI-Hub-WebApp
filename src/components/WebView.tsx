import { ArrowLeft, ExternalLink, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button } from './Button';
import { useState } from 'react';

export function WebView() {
  const { pinnedSites, currentSiteId, setCurrentSite } = useApp();
  const [loadError, setLoadError] = useState(false);
  const currentSite = pinnedSites.find(site => site.id === currentSiteId);

  if (!currentSite) return null;

  const handleBack = () => {
    setCurrentSite(null);
  };

  const handleOpenExternal = () => {
    window.open(currentSite.url, '_blank');
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-900">
      <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-900 to-gray-800 border-b border-white/10">
        <Button onClick={handleBack} variant="ghost" className="px-3">
          <ArrowLeft size={20} />
          Back
        </Button>
        <div className="flex items-center gap-3 flex-1">
          <span className="text-2xl">{currentSite.icon}</span>
          <div className="flex-1">
            <h2 className="text-white font-semibold">{currentSite.name}</h2>
            <p className="text-white/50 text-sm truncate">{currentSite.url}</p>
          </div>
        </div>
        <Button onClick={handleOpenExternal} variant="secondary" className="px-3">
          <ExternalLink size={18} />
          Open in New Tab
        </Button>
      </div>

      {loadError ? (
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center max-w-md">
            <div className="inline-block p-4 bg-yellow-500/10 rounded-2xl mb-4">
              <AlertCircle size={48} className="text-yellow-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Unable to Load Site
            </h3>
            <p className="text-white/60 mb-6">
              Some websites prevent embedding for security reasons. This doesn't mean the site is broken - you can still access it directly.
            </p>
            <Button onClick={handleOpenExternal} variant="primary">
              <ExternalLink size={18} />
              Open {currentSite.name} in New Tab
            </Button>
          </div>
        </div>
      ) : (
        <iframe
          src={currentSite.url}
          className="flex-1 w-full h-full border-none"
          title={currentSite.name}
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-downloads"
          onError={() => setLoadError(true)}
        />
      )}
    </div>
  );
}
