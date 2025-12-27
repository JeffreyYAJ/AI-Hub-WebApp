import { useState } from 'react';
import { useApp } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { Home } from './components/Home';
import { WebView } from './components/WebView';
import { AddSiteModal } from './components/AddSiteModal';
import { SettingsModal } from './components/SettingsModal';

function App() {
  const { currentSiteId, barPosition } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const isHorizontal = barPosition === 'bottom';
  const isLeft = barPosition === 'left';
  const isRight = barPosition === 'right';

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className={`flex flex-1 overflow-hidden ${isHorizontal ? 'flex-col' : 'flex-row'}`}>
        {(isLeft || isHorizontal) && (
          <Sidebar
            onAddClick={() => setShowAddModal(true)}
            onSettingsClick={() => setShowSettingsModal(true)}
          />
        )}

        <div className="flex-1 flex overflow-hidden">
          {currentSiteId ? <WebView /> : <Home />}
        </div>

        {isRight && (
          <Sidebar
            onAddClick={() => setShowAddModal(true)}
            onSettingsClick={() => setShowSettingsModal(true)}
          />
        )}
      </div>

      <AddSiteModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
      />

      <SettingsModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
      />
    </div>
  );
}

export default App;
