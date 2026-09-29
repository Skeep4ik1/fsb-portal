export interface UserProfile {
  id: string;
  name: string;
  callsign: string;
  role: 'curator' | 'cadet';
  rank: string;
  badgeNumber: string;
  canEditScreenshots: boolean;
  avatarLetter: string;
}

export const CURATOR_PIN = '55595742';

export const USERS_DB: UserProfile[] = [
  {
    id: 'agent-guest',
    name: 'Сотрудник Управления',
    callsign: 'ВЫМПЕЛ-4',
    role: 'cadet',
    rank: 'Сотрудник (Режим чтения)',
    badgeNumber: 'ФСБ-084',
    canEditScreenshots: false,
    avatarLetter: 'ОР',
  },
  {
    id: 'curator-stanislav',
    name: 'Станислав Яров',
    callsign: 'ЯРОВ',
    role: 'curator',
    rank: 'Куратор Управления «В»',
    badgeNumber: 'ФСБ-001',
    canEditScreenshots: true,
    avatarLetter: 'СЯ',
  }
];

export const DEFAULT_USER = USERS_DB[0]; // По умолчанию обычный сотрудник (только чтение)
