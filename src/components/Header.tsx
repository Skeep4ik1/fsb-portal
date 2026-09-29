import React, { useState, useEffect } from 'react';
import { Clock, Bell, BellOff, Search, Copy, Check, Menu, Radio, Shield, ChevronDown, Lock, LogOut, Settings } from 'lucide-react';
import { EVENTS_SCHEDULE, MACRO_CONFIG, ScheduledEvent } from '../data/portalData';
import { UserProfile, USERS_DB } from '../data/userData';
import { CuratorLoginModal } from './CuratorLoginModal';
import { useNotifications } from '../context/NotificationContext';

interface HeaderProps {
  onToggleSidebar: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectSection: (id: string) => void;
  currentUser: UserProfile;
  onSelectUser: (user: UserProfile) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleSidebar,
  searchQuery,
  onSearchChange,
  onSelectSection,
  currentUser,
  onSelectUser,
}) => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [nextEvent, setNextEvent] = useState<{ event: ScheduledEvent; remainingMs: number } | null>(null);
  const [copiedMacro, setCopiedMacro] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState<boolean>(() => {
    return localStorage.getItem('fsb_event_audio_notifications') === 'true';
  });
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const { activeAlerts, setIsSettingsModalOpen } = useNotifications();

  // Play audio sound using web audio api when event draws near
  const playAlertSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.1); // A5
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.4);
    } catch {
      // AudioContext may be blocked before interaction
    }
  };

  const toggleNotifications = () => {
    const nextVal = !audioEnabled;
    setAudioEnabled(nextVal);
    localStorage.setItem('fsb_event_audio_notifications', String(nextVal));
    if (nextVal) {
      playAlertSound();
    }
  };

  // Live timer tick
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);

      // Find next event
      const currentHours = now.getHours();
      const currentMinutes = now.getMinutes();
      const currentSeconds = now.getSeconds();
      const currentTotalSeconds = currentHours * 3600 + currentMinutes * 60 + currentSeconds;

      let closest: { event: ScheduledEvent; diffSeconds: number } | null = null;

      for (const ev of EVENTS_SCHEDULE) {
        const evSeconds = ev.hours * 3600 + ev.minutes * 60;
        let diff = evSeconds - currentTotalSeconds;
        // If event already passed today, consider it tomorrow
        if (diff < 0) {
          diff += 24 * 3600;
        }

        if (!closest || diff < closest.diffSeconds) {
          closest = { event: ev, diffSeconds: diff };
        }
      }

      if (closest) {
        setNextEvent({
          event: closest.event,
          remainingMs: closest.diffSeconds * 1000,
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatRemaining = (ms: number) => {
    const totalSec = Math.floor(ms / 1000);
    const hours = Math.floor(totalSec / 3600);
    const minutes = Math.floor((totalSec % 3600) / 60);
    const seconds = totalSec % 60;

    const pad = (n: number) => n.toString().padStart(2, '0');
    if (hours > 0) {
      return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    }
    return `${pad(minutes)}:${pad(seconds)}`;
  };

  const handleCopyMacro = () => {
    navigator.clipboard.writeText(MACRO_CONFIG.id);
    setCopiedMacro(true);
    setTimeout(() => setCopiedMacro(false), 2000);
  };

  const handleSelectUserClick = (targetUser: UserProfile) => {
    setUserDropdownOpen(false);
    if (targetUser.role === 'curator') {
      // If already curator, nothing to do
      if (currentUser.id === targetUser.id) return;
      // Prompt for PIN code
      setLoginModalOpen(true);
    } else {
      // Switch back to regular guest/cadet
      localStorage.removeItem('fsb_auth_role');
      onSelectUser(targetUser);
    }
  };

  const handleLogoutCurator = () => {
    setUserDropdownOpen(false);
    localStorage.removeItem('fsb_auth_role');
    const guest = USERS_DB.find((u) => u.id === 'agent-guest')!;
    onSelectUser(guest);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Mobile hamburger & Organization info */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-lg bg-slate-900 border border-slate-750 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            title="Открыть меню разделов"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rose-600 to-rose-950 border border-rose-500/30 flex items-center justify-center text-white shadow-lg shadow-rose-950/40">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm tracking-tight text-white flex items-center gap-1.5">
                  ФСБ РО
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-500/10 text-rose-300 border border-rose-500/20">
                  УПРАВЛЕНИЕ «В»
                </span>
              </div>
              <p className="text-[10px] text-slate-400 hidden sm:block">
                Служебный информационный портал ЦСН
              </p>
            </div>
          </div>
        </div>

        {/* Center: Search input */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Поиск по уставу, макросам, кодексам..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-slate-900/90 border border-slate-750 focus:border-rose-500/60 focus:ring-1 focus:ring-rose-500/40 text-xs text-white placeholder-slate-400 outline-none transition-all"
            />
          </div>
        </div>

        {/* Right: Actions, Timer, Macro, Curator User */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Live Moscow Time & Next Event Badge with Notification Toggle */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-750 text-xs">
            <div className="flex items-center gap-1.5 text-slate-300 font-mono">
              <Clock className="w-3.5 h-3.5 text-rose-400" />
              <span>
                {currentTime.toLocaleTimeString('ru-RU', {
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                })}
              </span>
            </div>

            {nextEvent && (
              <>
                <span className="w-1 h-1 rounded-full bg-slate-700" />
                <div
                  onClick={() => onSelectSection('events')}
                  className="flex items-center gap-1.5 cursor-pointer hover:text-rose-300 transition-colors text-slate-400 font-mono text-[11px]"
                  title={`${nextEvent.event.name} (${nextEvent.event.time})`}
                >
                  <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
                  <span>
                    через{' '}
                    <strong className="text-white">
                      {formatRemaining(nextEvent.remainingMs)}
                    </strong>
                  </span>
                </div>
              </>
            )}

            <span className="w-1 h-1 rounded-full bg-slate-700" />

            {/* Notification Control & Settings Button */}
            <button
              onClick={() => setIsSettingsModalOpen(true)}
              className="relative flex items-center gap-1 px-2.5 py-1 rounded-lg border bg-rose-500/15 border-rose-500/40 text-rose-300 hover:bg-rose-500/25 transition-all shadow-sm shadow-rose-950/40"
              title="Открыть настройки и журнал уведомлений о мероприятиях"
            >
              <Bell className="w-3.5 h-3.5 text-rose-400 animate-bounce" />
              <span className="text-[10px] font-bold text-rose-300 hidden xl:inline">Оповещения</span>
              {activeAlerts.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white font-mono font-extrabold text-[9px] flex items-center justify-center animate-pulse shadow-md">
                  {activeAlerts.length}
                </span>
              )}
            </button>
          </div>

          {/* Quick Copy Macro ID */}
          <button
            onClick={handleCopyMacro}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-750 text-xs font-mono text-slate-300 hover:text-white transition-all shadow-sm"
            title="Скопировать ID макроса для биндера"
          >
            {copiedMacro ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">Скопировано!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">ID Макроса</span>
              </>
            )}
          </button>

          {/* User Profile Selector (Куратор Станислав Яров с ПИН-кодом) */}
          <div className="relative">
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-xs transition-colors ${
                currentUser.role === 'curator'
                  ? 'bg-rose-950/40 border-rose-500/50 shadow-sm shadow-rose-950/40'
                  : 'bg-slate-900 border-slate-750 hover:border-slate-650'
              }`}
              title="Служебный профиль пользователя"
            >
              <div className={`w-6 h-6 rounded-md flex items-center justify-center font-bold text-[10px] ${
                currentUser.role === 'curator' ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-300'
              }`}>
                {currentUser.avatarLetter}
              </div>
              <div className="hidden xl:block text-left">
                <div className="text-white font-medium text-[11px] leading-tight flex items-center gap-1">
                  <span>{currentUser.name}</span>
                  {currentUser.canEditScreenshots ? (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" title="Доступ редактора активен" />
                  ) : (
                    <Lock className="w-2.5 h-2.5 text-slate-500" />
                  )}
                </div>
                <div className="text-slate-400 text-[9px] leading-tight flex items-center gap-1">
                  <span>{currentUser.role === 'curator' ? 'Куратор' : 'Сотрудник'}</span>
                  {currentUser.role === 'curator' && (
                    <span className="text-emerald-400 font-mono text-[8px] font-bold">[EDIT]</span>
                  )}
                </div>
              </div>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {userDropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setUserDropdownOpen(false)} 
                />
                <div className="absolute right-0 mt-2 w-72 p-2 rounded-xl bg-slate-900 border border-slate-750 shadow-2xl z-50 space-y-1 animate-in fade-in">
                  <div className="px-2.5 py-1.5 border-b border-slate-800 text-[10px] text-slate-400 uppercase tracking-wider font-semibold flex items-center justify-between">
                    <span>Служебный профиль</span>
                    <span className="text-slate-500 font-mono">ЦСН ФСБ</span>
                  </div>

                  {/* List of profiles */}
                  {USERS_DB.map((u) => {
                    const isSelected = u.id === currentUser.id;
                    const isCurator = u.role === 'curator';
                    return (
                      <button
                        key={u.id}
                        onClick={() => handleSelectUserClick(u)}
                        className={`w-full p-2 rounded-lg text-left text-xs flex items-center justify-between transition-colors ${
                          isSelected
                            ? 'bg-rose-950/40 border border-rose-500/40 text-white'
                            : 'hover:bg-slate-800/60 text-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                            isCurator ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-400'
                          }`}>
                            {u.avatarLetter}
                          </div>
                          <div>
                            <div className="font-semibold text-white flex items-center gap-1.5">
                              <span>{u.name}</span>
                              {isCurator && !isSelected && (
                                <span title="Требуется ввод PIN-кода">
                                  <Lock className="w-3 h-3 text-amber-400" />
                                </span>
                              )}
                              {isCurator && isSelected && (
                                <span className="px-1 py-0.2 rounded bg-emerald-500/20 text-emerald-300 text-[9px] font-mono">
                                  разблокирован
                                </span>
                              )}
                            </div>
                            <div className="text-[10px] text-slate-400">{u.rank}</div>
                          </div>
                        </div>

                        {isSelected ? (
                          <Check className="w-4 h-4 text-rose-400 shrink-0" />
                        ) : isCurator ? (
                          <span className="text-[10px] font-mono text-amber-400/90 px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                            PIN
                          </span>
                        ) : null}
                      </button>
                    );
                  })}

                  {/* Exit curator mode button if logged in as curator */}
                  {currentUser.role === 'curator' && (
                    <button
                      onClick={handleLogoutCurator}
                      className="w-full mt-1 p-2 rounded-lg text-left text-xs flex items-center gap-2 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors border-t border-slate-800"
                    >
                      <LogOut className="w-3.5 h-3.5 text-rose-400" />
                      <span>Выйти из режима Куратора</span>
                    </button>
                  )}

                  <div className="p-2.5 mt-1 rounded-lg bg-slate-950 border border-slate-800/80 text-[10px] text-slate-400 leading-relaxed">
                    Доступ к редактированию скриншотов защищен 8-значным служебным PIN-кодом Куратора.
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Curator PIN Login Modal */}
      <CuratorLoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onSuccess={(curator) => onSelectUser(curator)}
      />
    </header>
  );
};
