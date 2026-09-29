import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Bell,
  Volume2,
  VolumeX,
  Smartphone,
  Globe,
  Monitor,
  Clock,
  Flame,
  Check,
  AlertTriangle,
  Play,
  Trash2,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';
import { useNotifications } from '../context/NotificationContext';
import { tacticalAudio } from '../services/soundEffects';

export const NotificationSettingsModal: React.FC = () => {
  const {
    settings,
    updateSettings,
    testAlert,
    requestBrowserPermission,
    browserPermission,
    alertLog,
    clearLog,
    isSettingsModalOpen,
    setIsSettingsModalOpen,
  } = useNotifications();

  if (!isSettingsModalOpen) return null;

  const handleTest30Min = () => {
    testAlert('30min');
  };

  const handleTestStart = () => {
    testAlert('start');
  };

  const handleTestSound30 = () => {
    tacticalAudio.play30MinWarning(settings.soundVolume);
  };

  const handleTestSoundStart = () => {
    tacticalAudio.playEventStartAlarm(settings.soundVolume);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-2xl bg-slate-900 border border-slate-750 rounded-2xl shadow-2xl overflow-hidden my-8"
        >
          {/* Header */}
          <div className="p-5 sm:p-6 bg-gradient-to-r from-rose-950/60 via-slate-900 to-slate-900 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-300">
                <Bell className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>Настройки уведомлений о мероприятиях</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    УПРАВЛЕНИЕ «В»
                  </span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Мультимедийное оповещение за 30 минут и в момент старта событий
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsSettingsModalOpen(false)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Закрыть"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-5 sm:p-6 space-y-6 max-h-[75vh] overflow-y-auto">
            {/* Section 1: Timing Rules */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>1. Время срабатывания оповещений</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* 30 Minutes advance warning toggle */}
                <div
                  onClick={() => updateSettings({ notify30Min: !settings.notify30Min })}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start justify-between gap-3 ${
                    settings.notify30Min
                      ? 'bg-amber-950/20 border-amber-500/40 shadow-sm shadow-amber-950/30'
                      : 'bg-slate-950/60 border-slate-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <div className="p-2 rounded-lg bg-amber-500/15 text-amber-300 shrink-0 mt-0.5">
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">За 30 минут до начала</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        Предварительный сигнал для сбора состава и проверки снаряжения
                      </div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.notify30Min}
                    onChange={() => {}}
                    className="w-4 h-4 rounded accent-amber-500 shrink-0 cursor-pointer mt-1"
                  />
                </div>

                {/* Event Start toggle */}
                <div
                  onClick={() => updateSettings({ notifyAtStart: !settings.notifyAtStart })}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start justify-between gap-3 ${
                    settings.notifyAtStart
                      ? 'bg-rose-950/20 border-rose-500/40 shadow-sm shadow-rose-950/30'
                      : 'bg-slate-950/60 border-slate-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <div className="p-2 rounded-lg bg-rose-500/15 text-rose-300 shrink-0 mt-0.5">
                      <Flame className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">В момент старта события</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        Боевая тревога при ровно 00 минут (старт аирдропа/цехов/дилеров)
                      </div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.notifyAtStart}
                    onChange={() => {}}
                    className="w-4 h-4 rounded accent-rose-500 shrink-0 cursor-pointer mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Channels (Sound, Visual, Push, Vibration) */}
            <div className="space-y-3 pt-2 border-t border-slate-800">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4" />
                <span>2. Каналы и форматы оповещения</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Visual HUD Banner */}
                <div
                  onClick={() => updateSettings({ visualBannerEnabled: !settings.visualBannerEnabled })}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                    settings.visualBannerEnabled
                      ? 'bg-slate-800/80 border-slate-700 text-white'
                      : 'bg-slate-950/50 border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Monitor className="w-4 h-4 text-sky-400 shrink-0" />
                    <div>
                      <div className="text-xs font-bold">Всплывающая плашка на экране</div>
                      <div className="text-[10px] text-slate-400">Интерактивный баннер с таймером</div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.visualBannerEnabled}
                    onChange={() => {}}
                    className="w-4 h-4 rounded accent-rose-500 shrink-0"
                  />
                </div>

                {/* Sound toggle */}
                <div
                  onClick={() => updateSettings({ soundEnabled: !settings.soundEnabled })}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                    settings.soundEnabled
                      ? 'bg-slate-800/80 border-slate-700 text-white'
                      : 'bg-slate-950/50 border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {settings.soundEnabled ? (
                      <Volume2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <VolumeX className="w-4 h-4 text-slate-500 shrink-0" />
                    )}
                    <div>
                      <div className="text-xs font-bold">Тактический аудиосигнал</div>
                      <div className="text-[10px] text-slate-400">Звуковой зуммер и гармоника</div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.soundEnabled}
                    onChange={() => {}}
                    className="w-4 h-4 rounded accent-rose-500 shrink-0"
                  />
                </div>

                {/* Browser Push */}
                <div
                  className={`p-3 rounded-xl border transition-all flex items-center justify-between ${
                    settings.browserPushEnabled && browserPermission === 'granted'
                      ? 'bg-slate-800/80 border-slate-700 text-white'
                      : 'bg-slate-950/50 border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Globe className="w-4 h-4 text-indigo-400 shrink-0" />
                    <div>
                      <div className="text-xs font-bold flex items-center gap-1.5">
                        <span>Браузерные Push-уведомления</span>
                        {browserPermission === 'granted' && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">
                            АКТИВНО
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400">Работают даже во вкладке в фоновом режиме</div>
                    </div>
                  </div>

                  {browserPermission === 'granted' ? (
                    <input
                      type="checkbox"
                      checked={settings.browserPushEnabled}
                      onChange={(e) => updateSettings({ browserPushEnabled: e.target.checked })}
                      className="w-4 h-4 rounded accent-rose-500 shrink-0 cursor-pointer"
                    />
                  ) : (
                    <button
                      onClick={requestBrowserPermission}
                      className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-medium transition-colors shrink-0"
                    >
                      Включить
                    </button>
                  )}
                </div>

                {/* Vibration */}
                <div
                  onClick={() => updateSettings({ vibrateEnabled: !settings.vibrateEnabled })}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                    settings.vibrateEnabled
                      ? 'bg-slate-800/80 border-slate-700 text-white'
                      : 'bg-slate-950/50 border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Smartphone className="w-4 h-4 text-amber-400 shrink-0" />
                    <div>
                      <div className="text-xs font-bold">Вибрация устройства</div>
                      <div className="text-[10px] text-slate-400">Тактильный отклик на мобильных</div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.vibrateEnabled}
                    onChange={() => {}}
                    className="w-4 h-4 rounded accent-rose-500 shrink-0"
                  />
                </div>
              </div>

              {/* Volume slider */}
              {settings.soundEnabled && (
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-medium flex items-center gap-1.5">
                      <Volume2 className="w-3.5 h-3.5 text-slate-400" />
                      Громкость звукового сигнала
                    </span>
                    <span className="font-mono text-rose-300 font-bold">
                      {Math.round(settings.soundVolume * 100)}%
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="0.05"
                      max="1.0"
                      step="0.05"
                      value={settings.soundVolume}
                      onChange={(e) => updateSettings({ soundVolume: parseFloat(e.target.value) })}
                      className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
                    />
                    <div className="flex gap-1 shrink-0">
                      <button
                        onClick={handleTestSound30}
                        className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[10px] text-amber-300 font-mono transition-colors"
                        title="Прослушать сигнал 30 мин"
                      >
                        Тест 30м
                      </button>
                      <button
                        onClick={handleTestSoundStart}
                        className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[10px] text-rose-300 font-mono transition-colors"
                        title="Прослушать сигнал старта"
                      >
                        Тест Старт
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Section 3: Instant Test Triggers */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Мгновенная проверка работы уведомлений</span>
                </span>
                <span className="text-[10px] text-slate-400 hidden sm:inline">
                  Тестирует всплывающую карточку, звук, вибрацию и push
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  onClick={handleTest30Min}
                  className="px-3.5 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Проверить сигнал «30 минут»</span>
                </button>

                <button
                  onClick={handleTestStart}
                  className="px-3.5 py-2.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/40 text-rose-300 text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Проверить сигнал «СТАРТ СОБЫТИЯ»</span>
                </button>
              </div>
            </div>

            {/* Section 4: Notification Log History */}
            <div className="space-y-3 pt-2 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Журнал последних сработанных уведомлений</span>
                </h4>

                {alertLog.length > 0 && (
                  <button
                    onClick={clearLog}
                    className="text-[11px] text-slate-400 hover:text-rose-400 flex items-center gap-1 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Очистить журнал</span>
                  </button>
                )}
              </div>

              {alertLog.length === 0 ? (
                <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800/60 text-center text-xs text-slate-500">
                  Журнал пуст. Уведомления появятся здесь при наступлении событий.
                </div>
              ) : (
                <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                  {alertLog.map((log) => {
                    const is30 = log.alertType === '30min';
                    return (
                      <div
                        key={log.id}
                        className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80 text-xs flex items-center justify-between gap-2"
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span
                            className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold shrink-0 ${
                              is30
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            }`}
                          >
                            {is30 ? '30 МИН' : 'СТАРТ'}
                          </span>
                          <span className="text-white font-medium truncate">{log.eventName}</span>
                          {log.isTest && (
                            <span className="text-[9px] text-slate-500 font-mono">[ТЕСТ]</span>
                          )}
                        </div>

                        <div className="text-[10px] text-slate-400 font-mono shrink-0">
                          {log.timestamp} ({log.eventTime} МСК)
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">
              Настройки сохраняются локально в вашем браузере.
            </span>
            <button
              onClick={() => setIsSettingsModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-colors shadow-lg shadow-rose-950/50"
            >
              Сохранить и закрыть
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
