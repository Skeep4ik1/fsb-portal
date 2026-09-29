import React from 'react';
import { 
  TrendingUp, 
  Calendar, 
  BookOpen, 
  Terminal, 
  Shirt, 
  ExternalLink,
  Calculator,
  ShieldAlert,
  Radio,
  FileCheck2,
  X
} from 'lucide-react';
import { motion } from 'motion/react';

interface SidebarProps {
  activeSection: string;
  onSelectSection: (id: string) => void;
  isOpen: boolean;
  onCloseMobile: () => void;
  savedPoints: number;
}

interface NavItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  badge?: string;
  badgeColor?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  onSelectSection,
  isOpen,
  onCloseMobile,
  savedPoints,
}) => {
  const navItems: NavItem[] = [
    {
      id: 'promotion',
      title: 'Система повышения',
      icon: <TrendingUp className="w-4 h-4" />,
      badge: savedPoints > 0 ? `${savedPoints} б.` : undefined,
      badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    },
    {
      id: 'calculator',
      title: 'Калькулятор баллов',
      icon: <Calculator className="w-4 h-4" />,
      badge: 'PRO',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    },
    {
      id: 'events',
      title: 'Расписание событий',
      icon: <Calendar className="w-4 h-4" />,
      badge: '10/день',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    },
    {
      id: 'general',
      title: 'Общее положение & Устав',
      icon: <BookOpen className="w-4 h-4" />,
      badge: '13 ст.',
      badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    },
    {
      id: 'macros',
      title: 'Макросы & Биндер',
      icon: <Terminal className="w-4 h-4" />,
      badge: 'v2.4',
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    },
    {
      id: 'dresscode',
      title: 'Дресс-код (М / Ж)',
      icon: <Shirt className="w-4 h-4" />,
      badge: '2 компл.',
      badgeColor: 'bg-rose-500/15 text-rose-300 border-rose-500/25',
    },
    {
      id: 'memo',
      title: 'Памятка & База знаний',
      icon: <FileCheck2 className="w-4 h-4" />,
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Main Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 md:w-72 bg-[#090b10] border-r border-slate-800/80 flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand header */}
        <div className="p-4 sm:p-5 border-b border-slate-800/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rose-600 via-rose-700 to-rose-900 border border-rose-500/30 flex items-center justify-center font-bold text-white shadow-lg shadow-rose-950/40 text-base">
              В
            </div>
            <div>
              <div className="text-sm font-bold text-white tracking-tight">
                Управление «В»
              </div>
              <div className="text-[11px] font-medium text-slate-400">
                Памятка сотрудника ФСБ
              </div>
            </div>
          </div>

          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Curator Meta */}
        <div className="px-4 py-2.5 mx-3 mt-3 rounded-lg bg-slate-900/60 border border-slate-800/80 text-[11px] text-slate-400 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Куратор: <strong className="text-slate-200">Станислав Яров</strong></span>
        </div>

        {/* Navigation list */}
        <div className="px-3 py-3 flex-1 overflow-y-auto space-y-1">
          <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            Служебные разделы
          </div>

          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectSection(item.id);
                  onCloseMobile();
                }}
                className={`relative w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'text-white'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850/40'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeSidebarIndicator"
                    className="absolute inset-0 bg-rose-600/15 border border-rose-500/30 rounded-xl"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}

                <div className="relative flex items-center gap-2.5 z-10">
                  <span className={`${isActive ? 'text-rose-400' : 'text-slate-500'}`}>
                    {item.icon}
                  </span>
                  <span>{item.title}</span>
                </div>

                {item.badge && (
                  <span
                    className={`relative z-10 text-[10px] font-mono px-1.5 py-0.5 rounded border ${
                      item.badgeColor || 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Quick Report Footer */}
        <div className="p-3.5 border-t border-slate-800/60 bg-slate-950/40">
          <div className="p-3 rounded-xl bg-gradient-to-b from-slate-900/80 to-slate-900/40 border border-slate-800 text-xs">
            <div className="flex items-center justify-between mb-1.5 text-[11px] text-slate-400 font-medium">
              <span>Статус готовности:</span>
              <span className="text-rose-300 font-mono font-semibold">{savedPoints} баллов</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-rose-500 to-amber-500 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (savedPoints / 550) * 100)}%` }}
              />
            </div>
            <div className="mt-2 text-[10px] text-slate-500 flex justify-between">
              <span>Цель: Капитан (550 б.)</span>
              <span>{Math.round((savedPoints / 550) * 100)}%</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
