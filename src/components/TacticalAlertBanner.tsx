import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, AlertTriangle, Flame, Clock, X, ArrowRight, ShieldAlert, Volume2 } from 'lucide-react';
import { useNotifications, ActiveAlert } from '../context/NotificationContext';

interface TacticalAlertBannerProps {
  onNavigateToEvents: () => void;
}

export const TacticalAlertBanner: React.FC<TacticalAlertBannerProps> = ({ onNavigateToEvents }) => {
  const { activeAlerts, dismissAlert, snoozeAlert } = useNotifications();

  if (activeAlerts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-md w-full px-4 sm:px-0 pointer-events-none">
      <AnimatePresence>
        {activeAlerts.map((alert: ActiveAlert) => {
          const is30Min = alert.alertType === '30min';

          return (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: 50, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="pointer-events-auto"
            >
              <div
                className={`relative overflow-hidden rounded-2xl border p-4 shadow-2xl backdrop-blur-xl ${
                  is30Min
                    ? 'bg-gradient-to-br from-slate-950/95 via-amber-950/40 to-slate-900/95 border-amber-500/50 shadow-amber-950/50 ring-1 ring-amber-500/30'
                    : 'bg-gradient-to-br from-slate-950/95 via-rose-950/50 to-slate-900/95 border-rose-500/60 shadow-rose-950/60 ring-1 ring-rose-500/40 animate-pulse-border'
                }`}
              >
                {/* Glowing top line */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 ${
                    is30Min ? 'bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500' : 'bg-gradient-to-r from-rose-500 via-red-400 to-rose-600'
                  }`}
                />

                {/* Header row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                        is30Min
                          ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                          : 'bg-rose-500/25 border-rose-500/50 text-rose-300 animate-pulse'
                      }`}
                    >
                      {is30Min ? (
                        <AlertTriangle className="w-5 h-5 animate-bounce" />
                      ) : (
                        <Flame className="w-5 h-5 text-rose-400 animate-spin-slow" />
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-mono font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                            is30Min
                              ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                              : 'bg-rose-500/25 text-rose-200 border-rose-500/40 animate-pulse'
                          }`}
                        >
                          {is30Min ? '⏱ НАЧАЛО ЧЕРЕЗ 30 МИНУТ' : '🚨 МЕРОПРИЯТИЕ НАЧАЛОСЬ!'}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                          <Volume2 className="w-3 h-3 text-slate-400" />
                          {alert.eventTime} МСК
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white mt-1 leading-snug">
                        {alert.eventName}
                      </h4>
                    </div>
                  </div>

                  <button
                    onClick={() => dismissAlert(alert.id)}
                    className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
                    title="Закрыть оповещение"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Body details */}
                <div className="mt-2.5 pl-11 text-xs text-slate-300 space-y-1">
                  <p className="line-clamp-2 text-slate-400 text-[11px]">{alert.description}</p>
                  <div className="text-[11px] text-amber-300/90 font-mono">
                    <span className="text-slate-400">Добыча / Награда:</span> {alert.rewardHint}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="mt-3.5 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <button
                    onClick={() => snoozeAlert(alert.id, 5)}
                    className="text-[11px] px-2.5 py-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors font-medium"
                  >
                    Отложить
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => dismissAlert(alert.id)}
                      className="text-[11px] px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition-colors"
                    >
                      Принято
                    </button>
                    <button
                      onClick={() => {
                        dismissAlert(alert.id);
                        onNavigateToEvents();
                      }}
                      className={`text-[11px] px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all shadow-md ${
                        is30Min
                          ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-950/40'
                          : 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-950/50'
                      }`}
                    >
                      <span>Расписание</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
