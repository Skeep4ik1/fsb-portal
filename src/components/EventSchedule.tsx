import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  Package,
  Factory,
  Users,
  AlertCircle,
  Bell,
  Settings,
  Volume2,
  Globe,
  Play,
  CheckCircle2,
} from 'lucide-react';
import { EVENTS_SCHEDULE, ScheduledEvent } from '../data/portalData';
import { useNotifications } from '../context/NotificationContext';

export const EventSchedule: React.FC = () => {
  const [filterType, setFilterType] = useState<'all' | 'drop' | 'dealers' | 'factory'>('all');
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [nextEventId, setNextEventId] = useState<string>('1');
  const [remainingSec, setRemainingSec] = useState<number>(0);

  const { settings, setIsSettingsModalOpen, testAlert } = useNotifications();

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      setCurrentTime(now);

      const curSec = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
      let closest: { ev: ScheduledEvent; diff: number } | null = null;

      for (const ev of EVENTS_SCHEDULE) {
        const evSec = ev.hours * 3600 + ev.minutes * 60;
        let diff = evSec - curSec;
        if (diff <= 0) {
          diff += 24 * 3600;
        }
        if (!closest || diff < closest.diff) {
          closest = { ev, diff };
        }
      }

      if (closest) {
        setNextEventId(closest.ev.id);
        setRemainingSec(closest.diff);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const filteredEvents = EVENTS_SCHEDULE.filter((ev) => {
    if (filterType === 'all') return true;
    return ev.type === filterType;
  });

  const formatTimer = (sec: number) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const getEventBadge = (type: ScheduledEvent['type']) => {
    switch (type) {
      case 'drop':
        return {
          icon: <Package className="w-3.5 h-3.5" />,
          label: 'Аирдроп',
          cls: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
        };
      case 'dealers':
        return {
          icon: <Users className="w-3.5 h-3.5" />,
          label: 'Оружейные дилеры',
          cls: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
        };
      case 'factory':
        return {
          icon: <Factory className="w-3.5 h-3.5" />,
          label: 'Борьба за цеха',
          cls: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
        };
    }
  };

  const getPreAlertTimeStr = (ev: ScheduledEvent) => {
    const totalMinutes = ev.hours * 60 + ev.minutes;
    const pre30Minutes = (totalMinutes - 30 + 1440) % 1440;
    const h = Math.floor(pre30Minutes / 60)
      .toString()
      .padStart(2, '0');
    const m = (pre30Minutes % 60).toString().padStart(2, '0');
    return `${h}:${m}`;
  };

  const nextEv = EVENTS_SCHEDULE.find((e) => e.id === nextEventId);

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-amber-950/30 via-slate-900 to-slate-900 border border-amber-500/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <Calendar className="w-3.5 h-3.5" />
              Ежедневный график
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Расписание боевых мероприятий
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-xl">
              Точный график сброса аирдропов, появления оружейных дилеров и штурма промышленных цехов на территории области.
            </p>
          </div>

          {/* Live countdown card */}
          {nextEv && (
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-amber-500/30 min-w-[220px]">
              <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                <span className="flex items-center gap-1.5 font-semibold uppercase text-amber-400">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping inline-block" />
                  Ближайшее событие
                </span>
                <span className="font-mono">{nextEv.time}</span>
              </div>
              <div className="text-sm font-bold text-white truncate">{nextEv.name}</div>
              <div className="text-xs font-mono font-extrabold text-amber-300 mt-1 tabular-nums">
                До старта: {formatTimer(remainingSec)}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Notification status bar & control center */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-750 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-bold">
            <Bell className="w-4 h-4 text-rose-400 animate-pulse" />
            <span>Система оповещений: АКТИВНА</span>
          </div>

          {settings.notify30Min && (
            <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px] font-mono flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-amber-400" />
              За 30 минут
            </span>
          )}

          {settings.notifyAtStart && (
            <span className="px-2.5 py-1 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-[11px] font-mono flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-rose-400" />
              В момент старта
            </span>
          )}

          {settings.soundEnabled && (
            <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[11px] font-mono flex items-center gap-1">
              <Volume2 className="w-3 h-3 text-emerald-400" />
              Звук
            </span>
          )}

          {settings.browserPushEnabled && (
            <span className="px-2.5 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[11px] font-mono flex items-center gap-1">
              <Globe className="w-3 h-3 text-indigo-400" />
              Push
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => testAlert('30min')}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-amber-300 text-xs font-mono font-medium flex items-center gap-1.5 transition-colors"
            title="Тестировать сигнал за 30 минут"
          >
            <Play className="w-3 h-3 fill-current" />
            <span>Тест 30м</span>
          </button>

          <button
            onClick={() => testAlert('start')}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-rose-300 text-xs font-mono font-medium flex items-center gap-1.5 transition-colors"
            title="Тестировать сигнал в момент старта"
          >
            <Play className="w-3 h-3 fill-current" />
            <span>Тест Старт</span>
          </button>

          <button
            onClick={() => setIsSettingsModalOpen(true)}
            className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-2 transition-all shadow-md shadow-rose-950/40"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Настроить</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setFilterType('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            filterType === 'all'
              ? 'bg-rose-600 text-white shadow-sm'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          Все события (10)
        </button>
        <button
          onClick={() => setFilterType('drop')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            filterType === 'drop'
              ? 'bg-rose-600 text-white shadow-sm'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          Аирдропы (5)
        </button>
        <button
          onClick={() => setFilterType('dealers')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            filterType === 'dealers'
              ? 'bg-rose-600 text-white shadow-sm'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          Оружейные дилеры (2)
        </button>
        <button
          onClick={() => setFilterType('factory')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            filterType === 'factory'
              ? 'bg-rose-600 text-white shadow-sm'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          Борьба за цеха (3)
        </button>
      </div>

      {/* Schedule Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {filteredEvents.map((ev) => {
          const badge = getEventBadge(ev.type);
          const isNext = ev.id === nextEventId;
          const preAlertStr = getPreAlertTimeStr(ev);

          return (
            <div
              key={ev.id}
              className={`p-4 rounded-xl border transition-all ${
                isNext
                  ? 'bg-slate-900/90 border-amber-500/50 shadow-lg shadow-amber-950/20 ring-1 ring-amber-500/20'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-750'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 font-mono font-bold text-sm text-white tabular-nums">
                    {ev.time}
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                      {ev.name}
                      {isNext && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-500/20 text-amber-300 font-mono font-bold">
                          СЛЕДУЮЩЕЕ
                        </span>
                      )}
                    </h3>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {ev.description}
                    </div>
                  </div>
                </div>

                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium border shrink-0 ${badge.cls}`}
                >
                  {badge.icon}
                  <span>{badge.label}</span>
                </span>
              </div>

              {/* Pre-alert and event start times */}
              <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="text-slate-500">Сигнал 30м:</span>
                  <span className="font-mono text-amber-300 font-semibold bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                    {preAlertStr} МСК
                  </span>
                </div>

                <div className="flex items-center gap-1 text-slate-400">
                  <span className="text-slate-500">Старт:</span>
                  <span className="font-mono text-rose-300 font-semibold bg-rose-500/10 px-1.5 py-0.5 rounded border border-rose-500/20">
                    {ev.time} МСК
                  </span>
                </div>
              </div>

              <div className="mt-2 text-[11px] flex items-center justify-between">
                <span className="text-slate-500">Возможная добыча:</span>
                <span className="text-slate-300 font-medium">{ev.rewardHint}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
        <AlertCircle className="w-4 h-4 text-slate-500 shrink-0" />
        <span>
          Время мероприятий указано по Московскому времени (МСК / Серверное время). При опоздании доступ в зону спецоперации может быть ограничен лидером группы.
        </span>
      </div>
    </div>
  );
};
