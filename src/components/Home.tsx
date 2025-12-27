import { Sparkles, Zap, Network } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function Home() {
  const { pinnedSites, setCurrentSite } = useApp();

  return (
    <div className="relative flex-1 flex flex-col items-center justify-center p-8 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative max-w-4xl mx-auto text-center space-y-8">
        <div className="inline-block p-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl backdrop-blur-sm border border-white/10 mb-6">
          <Network size={64} className="text-blue-400" />
        </div>

        <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          AI Hub
        </h1>

        <p className="text-xl text-white/60 max-w-2xl mx-auto">
          Your centralized gateway to the world's most powerful AI assistants. Click any pinned site to begin your AI-powered journey.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
          <div className="group p-6 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 hover:border-blue-500/50 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Sparkles className="text-white" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Quick Access</h3>
            <p className="text-white/60 text-sm">
              Instantly switch between your favorite AI tools with a single click
            </p>
          </div>

          <div className="group p-6 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Zap className="text-white" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Customizable</h3>
            <p className="text-white/60 text-sm">
              Pin your preferred AI sites and organize them your way
            </p>
          </div>

          <div className="group p-6 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 hover:border-pink-500/50 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Network className="text-white" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Unified Interface</h3>
            <p className="text-white/60 text-sm">
              Access all AI tools from one beautiful, modern interface
            </p>
          </div>
        </div>

        {pinnedSites.length > 0 && (
          <div className="pt-12">
            <p className="text-white/40 mb-6">Quick Launch</p>
            <div className="flex flex-wrap justify-center gap-4">
              {pinnedSites.map(site => (
                <button
                  key={site.id}
                  onClick={() => setCurrentSite(site.id)}
                  className="group flex items-center gap-3 px-6 py-3 bg-white/5 hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-500/20 border border-white/10 hover:border-blue-500/50 rounded-xl transition-all duration-300 hover:scale-105"
                >
                  <span className="text-3xl">{site.icon}</span>
                  <span className="text-white font-medium">{site.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="absolute bottom-8 text-center">
        <p className="text-white/30 text-sm">
          Neural connections powered by modern web technology
        </p>
      </div>
    </div>
  );
}
