import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { EVENTS_SCHEDULE, ScheduledEvent } from '../data/portalData';
import { tacticalAudio } from '../services/soundEffects';

export interface NotificationSettings {
  notify30Min: boolean;
  notifyAtStart: boolean;
  soundEnabled: boolean;
  visualBannerEnabled: boolean;
  browserPushEnabled: boolean;
  vibrateEnabled: boolean;
  soundVolume: number;
}

export interface ActiveAlert {
  id: string;
  eventId: string;
  eventName: string;
  eventTime: string;
  eventType: 'drop' | 'dealers' | 'factory';
  alertType: '30min' | 'start';
  timestamp: Date;
  description: string;
  rewardHint: string;
}

export interface AlertLogItem {
  id: string;
  eventId: string;
  eventName: string;
  eventTime: string;
  eventType: 'drop' | 'dealers' | 'factory';
  alertType: '30min' | 'start';
  timestamp: string;
  isTest?: boolean;
}

interface NotificationContextType {
  settings: NotificationSettings;
  updateSettings: (newSettings: Partial<NotificationSettings>) => void;
  activeAlerts: ActiveAlert[];
  alertLog: AlertLogItem[];
  dismissAlert: (id: string) => void;
  snoozeAlert: (id: string, minutes?: number) => void;
  testAlert: (alertType: '30min' | 'start') => void;
  requestBrowserPermission: () => Promise<boolean>;
  browserPermission: NotificationPermission | 'unsupported';
  clearLog: () => void;
  isSettingsModalOpen: boolean;
  setIsSettingsModalOpen: (open: boolean) => void;
}

const DEFAULT_SETTINGS: NotificationSettings = {
  notify30Min: true,
  notifyAtStart: true,
  soundEnabled: true,
  visualBannerEnabled: true,
  browserPushEnabled: true,
  vibrateEnabled: true,
  soundVolume: 0.4,
};

const SETTINGS_STORAGE_KEY = 'fsb_tactical_notification_settings';
const LOG_STORAGE_KEY = 'fsb_tactical_alert_log';

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<NotificationSettings>(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
      }
    } catch {
      // Fallback
    }
    return DEFAULT_SETTINGS;
  });

  const [activeAlerts, setActiveAlerts] = useState<ActiveAlert[]>([]);
  const [alertLog, setAlertLog] = useState<AlertLogItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOG_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return [];
  });

  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [browserPermission, setBrowserPermission] = useState<NotificationPermission | 'unsupported'>(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      return Notification.permission;
    }
    return 'unsupported';
  });

  // Track fired events to prevent duplicates in current session
  const [firedAlertKeys, setFiredAlertKeys] = useState<Set<string>>(() => new Set());

  // Save settings
  const updateSettings = useCallback((newSettings: Partial<NotificationSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      try {
        localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // storage quota fallback
      }
      return updated;
    });
  }, []);

  // Request browser notification permission
  const requestBrowserPermission = useCallback(async (): Promise<boolean> => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      setBrowserPermission('unsupported');
      return false;
    }
    try {
      const permission = await Notification.requestPermission();
      setBrowserPermission(permission);
      if (permission === 'granted') {
        updateSettings({ browserPushEnabled: true });
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }, [updateSettings]);

  // Dismiss a specific active banner
  const dismissAlert = useCallback((id: string) => {
    setActiveAlerts((prev) => prev.filter((a) => a.id !== id));
  }, []);

  // Snooze alert (dismiss and optionally re-remind later)
  const snoozeAlert = useCallback((id: string, _minutes: number = 5) => {
    dismissAlert(id);
  }, [dismissAlert]);

  // Clear notification history log
  const clearLog = useCallback(() => {
    setAlertLog([]);
    try {
      localStorage.removeItem(LOG_STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  // Dispatch alert to all active channels: Sound, Visual HUD Toast, Browser Push, Mobile Vibration
  const triggerAlert = useCallback(
    (ev: ScheduledEvent, alertType: '30min' | 'start', isTest = false) => {
      const is30Min = alertType === '30min';
      const alertId = `${ev.id}_${alertType}_${Date.now()}`;

      // 1. Audio Sound alert
      if (settings.soundEnabled) {
        if (is30Min) {
          tacticalAudio.play30MinWarning(settings.soundVolume);
        } else {
          tacticalAudio.playEventStartAlarm(settings.soundVolume);
        }
      }

      // 2. Mobile Device Vibration
      if (settings.vibrateEnabled && typeof navigator !== 'undefined' && navigator.vibrate) {
        try {
          if (is30Min) {
            navigator.vibrate([200, 100, 200]);
          } else {
            navigator.vibrate([300, 100, 300, 100, 400]);
          }
        } catch {
          // Ignore vibration error
        }
      }

      // 3. Visual On-Screen HUD Toast Banner
      if (settings.visualBannerEnabled || isTest) {
        const newAlert: ActiveAlert = {
          id: alertId,
          eventId: ev.id,
          eventName: ev.name,
          eventTime: ev.time,
          eventType: ev.type,
          alertType,
          timestamp: new Date(),
          description: ev.description,
          rewardHint: ev.rewardHint,
        };

        setActiveAlerts((prev) => [newAlert, ...prev.slice(0, 2)]);

        // Auto dismiss after 18 seconds
        setTimeout(() => {
          dismissAlert(alertId);
        }, 18000);
      }

      // 4. Desktop/Browser System Push Notification
      if (
        settings.browserPushEnabled &&
        typeof window !== 'undefined' &&
        'Notification' in window &&
        Notification.permission === 'granted'
      ) {
        try {
          const title = is30Min
            ? `🚨 [ФСБ РО] Через 30 мин: ${ev.name}`
            : `⚔️ [ФСБ РО] СТАРТ: ${ev.name} начался!`;

          const body = is30Min
            ? `Время: ${ev.time} (МСК). Подготовьте снаряжение и экипировку. Добыча: ${ev.rewardHint}`
            : `Время: ${ev.time} (МСК). Срочный выезд личного состава в зону проведения операции!`;

          const notif = new Notification(title, {
            body,
            icon: '/favicon.ico',
            tag: `fsb-event-${ev.id}-${alertType}`,
            requireInteraction: !is30Min,
          });

          notif.onclick = () => {
            window.focus();
            notif.close();
          };
        } catch {
          // Push notification error
        }
      }

      // 5. Add to Log History
      const logEntry: AlertLogItem = {
        id: alertId,
        eventId: ev.id,
        eventName: ev.name,
        eventTime: ev.time,
        eventType: ev.type,
        alertType,
        timestamp: new Date().toLocaleTimeString('ru-RU', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
        isTest,
      };

      setAlertLog((prev) => {
        const updated = [logEntry, ...prev.slice(0, 29)];
        try {
          localStorage.setItem(LOG_STORAGE_KEY, JSON.stringify(updated));
        } catch {
          // ignore
        }
        return updated;
      });
    },
    [settings, dismissAlert]
  );

  // Instant test function for user verification
  const testAlert = useCallback(
    (alertType: '30min' | 'start') => {
      // Pick next or first event for test
      const sampleEvent = EVENTS_SCHEDULE[alertType === '30min' ? 0 : 5] || EVENTS_SCHEDULE[0];
      triggerAlert(sampleEvent, alertType, true);
    },
    [triggerAlert]
  );

  // Main Background Countdown & Alarm Monitoring Loop
  useEffect(() => {
    const checkSchedule = () => {
      const now = new Date();
      const currentSeconds = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
      const dateKey = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;

      EVENTS_SCHEDULE.forEach((ev) => {
        const evSeconds = ev.hours * 3600 + ev.minutes * 60;
        let diff = evSeconds - currentSeconds;

        // If event passed today, next occurrence is tomorrow
        if (diff < 0) {
          diff += 24 * 3600;
        }

        // --- 1. NOTIFICATION ЗА 30 МИНУТ ДО НАЧАЛА (1800 секунд) ---
        // Trigger if remaining seconds is between 1740 (29m) and 1800 (30m)
        if (settings.notify30Min && diff <= 1800 && diff >= 1740) {
          const key30 = `${ev.id}_30min_${dateKey}_${Math.floor(evSeconds / 3600)}`;
          if (!firedAlertKeys.has(key30)) {
            setFiredAlertKeys((prev) => new Set(prev).add(key30));
            triggerAlert(ev, '30min');
          }
        }

        // --- 2. NOTIFICATION В НАЧАЛЕ СОБЫТИЯ (0 секунд / СТАРТ) ---
        // Trigger at exactly 0-10 seconds window when event begins
        if (settings.notifyAtStart && diff <= 10 && diff >= 0) {
          const keyStart = `${ev.id}_start_${dateKey}_${Math.floor(evSeconds / 3600)}`;
          if (!firedAlertKeys.has(keyStart)) {
            setFiredAlertKeys((prev) => new Set(prev).add(keyStart));
            triggerAlert(ev, 'start');
          }
        }
      });
    };

    // Run check every 1000ms
    const interval = setInterval(checkSchedule, 1000);
    checkSchedule();

    return () => clearInterval(interval);
  }, [settings.notify30Min, settings.notifyAtStart, firedAlertKeys, triggerAlert]);

  return (
    <NotificationContext.Provider
      value={{
        settings,
        updateSettings,
        activeAlerts,
        alertLog,
        dismissAlert,
        snoozeAlert,
        testAlert,
        requestBrowserPermission,
        browserPermission,
        clearLog,
        isSettingsModalOpen,
        setIsSettingsModalOpen,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
