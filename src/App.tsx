import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { PromotionSection } from './components/PromotionSection';
import { PromotionCalculator } from './components/PromotionCalculator';
import { EventSchedule } from './components/EventSchedule';
import { GeneralRules } from './components/GeneralRules';
import { MacroSection } from './components/MacroSection';
import { DressCodeSection } from './components/DressCodeSection';
import { MemoResources } from './components/MemoResources';
import { TacticalAlertBanner } from './components/TacticalAlertBanner';
import { NotificationSettingsModal } from './components/NotificationSettingsModal';
import { DEFAULT_USER, UserProfile, USERS_DB } from './data/userData';
import { NotificationProvider } from './context/NotificationContext';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('promotion');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [savedPoints, setSavedPoints] = useState(0);
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    // Restore session if curator previously entered PIN on this device
    const savedRole = localStorage.getItem('fsb_auth_role');
    if (savedRole === 'curator') {
      const curator = USERS_DB.find((u) => u.id === 'curator-stanislav');
      if (curator) return curator;
    }
    return DEFAULT_USER;
  });

  const handleSelectSection = (id: string) => {
    setActiveSection(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (query && activeSection !== 'general') {
      setActiveSection('general');
    }
  };

  return (
    <NotificationProvider>
      <div className="min-h-screen bg-[#080a0f] text-slate-100 flex flex-col selection:bg-rose-500/20 selection:text-rose-300">
        {/* Top Header */}
        <Header
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          onSelectSection={handleSelectSection}
          currentUser={currentUser}
          onSelectUser={(u) => setCurrentUser(u)}
        />

        {/* Main Layout Area */}
        <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex gap-6">
          {/* Sidebar Navigation */}
          <Sidebar
            isOpen={sidebarOpen}
            onCloseMobile={() => setSidebarOpen(false)}
            activeSection={activeSection}
            onSelectSection={handleSelectSection}
            savedPoints={savedPoints}
          />

          {/* Content View */}
          <main className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.15 }}
              >
                {activeSection === 'promotion' && (
                  <PromotionSection onOpenCalculator={() => setActiveSection('calculator')} />
                )}
                {activeSection === 'calculator' && (
                  <PromotionCalculator
                    onPointsCalculated={(pts: number) => setSavedPoints(pts)}
                  />
                )}
                {activeSection === 'events' && <EventSchedule />}
                {activeSection === 'general' && <GeneralRules searchQuery={searchQuery} />}
                {activeSection === 'macros' && <MacroSection />}
                {activeSection === 'dresscode' && <DressCodeSection currentUser={currentUser} />}
                {activeSection === 'memo' && <MemoResources />}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>

        {/* Interactive Tactical Event Alert Pop-up Banner */}
        <TacticalAlertBanner onNavigateToEvents={() => handleSelectSection('events')} />

        {/* Modal for Notification Settings and History Log */}
        <NotificationSettingsModal />
      </div>
    </NotificationProvider>
  );
}

