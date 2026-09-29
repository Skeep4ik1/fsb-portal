import React, { useState } from 'react';
import { 
  Shirt, 
  Shield, 
  Check, 
  Layers, 
  Info, 
  Maximize2, 
  Sparkles, 
  ChevronRight, 
  Users, 
  UserCheck, 
  Radio, 
  Lock, 
  Crosshair 
} from 'lucide-react';
import { UNIFORM_PROFILES, UniformProfile } from '../data/portalData';
import { UniformPhotoViewer } from './UniformPhotoViewer';
import { UserProfile } from '../data/userData';

interface DressCodeSectionProps {
  currentUser: UserProfile;
}

export const DressCodeSection: React.FC<DressCodeSectionProps> = ({ currentUser }) => {
  const [selectedProfileId, setSelectedProfileId] = useState<'female' | 'male'>('female');
  const [selectedGearIdx, setSelectedGearIdx] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const activeProfile = UNIFORM_PROFILES.find((p) => p.id === selectedProfileId) || UNIFORM_PROFILES[0];

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-rose-950/30 via-slate-900 to-slate-900 border border-rose-500/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <Shirt className="w-3.5 h-3.5" />
              Уставное снаряжение ФСБ РО
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Дресс-код подразделения
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-xl">
              Установленные комплекты обмундирования: <strong className="text-rose-300">«Боевой комплект ФСБ»</strong> для женского состава и <strong className="text-blue-300">«Управление В»</strong> для мужского штурмового состава.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold self-start sm:self-auto">
            <Check className="w-4 h-4 text-emerald-400" />
            Уставная форма обязательна
          </div>
        </div>
      </div>

      {/* Gender Profile Switcher Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-1.5 rounded-2xl bg-slate-950/80 border border-slate-800">
        {/* Female Tab */}
        <button
          onClick={() => {
            setSelectedProfileId('female');
            setSelectedGearIdx(0);
          }}
          className={`flex items-center justify-between p-3.5 rounded-xl border text-left transition-all ${
            selectedProfileId === 'female'
              ? 'bg-rose-950/30 border-rose-500/60 shadow-lg shadow-rose-950/40 ring-1 ring-rose-500/30 text-white'
              : 'bg-slate-900/40 border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/80'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm ${
              selectedProfileId === 'female' ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-400'
            }`}>
              Ж
            </div>
            <div>
              <div className="text-xs font-semibold text-rose-300 uppercase tracking-wider">
                Для женщин
              </div>
              <div className="text-sm font-bold text-white">
                Боевой комплект ФСБ
              </div>
            </div>
          </div>

          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-rose-500/15 border border-rose-500/25 text-rose-300">
            Облегченный
          </span>
        </button>

        {/* Male Tab */}
        <button
          onClick={() => {
            setSelectedProfileId('male');
            setSelectedGearIdx(0);
          }}
          className={`flex items-center justify-between p-3.5 rounded-xl border text-left transition-all ${
            selectedProfileId === 'male'
              ? 'bg-blue-950/30 border-blue-500/60 shadow-lg shadow-blue-950/40 ring-1 ring-blue-500/30 text-white'
              : 'bg-slate-900/40 border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/80'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm ${
              selectedProfileId === 'male' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'
            }`}>
              М
            </div>
            <div>
              <div className="text-xs font-semibold text-blue-300 uppercase tracking-wider">
                Для мужчин
              </div>
              <div className="text-sm font-bold text-white">
                Управление В
              </div>
            </div>
          </div>

          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-500/15 border border-blue-500/25 text-blue-300">
            Штурмовой Бр5
          </span>
        </button>
      </div>

      {/* Main Showcase: Visual Avatar & Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Rendered Operative Model Preview (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl bg-slate-900/80 border border-slate-800 p-4 space-y-4">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-white">
              <Shield className={`w-4 h-4 ${selectedProfileId === 'female' ? 'text-rose-400' : 'text-blue-400'}`} />
              <span>{activeProfile.title}</span>
            </div>
            <span className="text-[11px] text-slate-500 font-mono">
              {activeProfile.categoryName}
            </span>
          </div>

          {/* Model Frame with Live Screenshot Viewer & Upload */}
          <UniformPhotoViewer
            gender={selectedProfileId}
            title={activeProfile.title}
            categoryName={activeProfile.categoryName}
            badgeTitle={activeProfile.badgeTitle}
            currentUser={currentUser}
            onOpenModal={() => setIsModalOpen(true)}
          />

          {/* Role badge */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="text-[10px] font-semibold uppercase text-slate-400 tracking-wider">
              Назначение комплекта:
            </div>
            <div className="text-xs font-medium text-slate-200">
              {activeProfile.role}
            </div>
          </div>
        </div>

        {/* Right: Technical Specs & Equipment List (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Key Attributes Grid */}
          <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-5 space-y-4">
            <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                  Характеристики комплекта
                </span>
                <h2 className="text-base font-bold text-white mt-0.5">
                  {activeProfile.title}
                </h2>
              </div>
              <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${
                selectedProfileId === 'female'
                  ? 'bg-rose-500/15 border-rose-500/30 text-rose-300'
                  : 'bg-blue-500/15 border-blue-500/30 text-blue-300'
              }`}>
                {activeProfile.badgeTitle}
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {activeProfile.description}
            </p>

            {/* Quick Specs List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80">
                <span className="text-slate-500 block text-[10px] uppercase font-semibold">Головной убор:</span>
                <span className="text-slate-200 font-medium">{activeProfile.headwear}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80">
                <span className="text-slate-500 block text-[10px] uppercase font-semibold">Балаклава:</span>
                <span className="text-slate-200 font-medium">{activeProfile.mask}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80">
                <span className="text-slate-500 block text-[10px] uppercase font-semibold">Бронезащита / Торс:</span>
                <span className="text-slate-200 font-medium">{activeProfile.armor}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80">
                <span className="text-slate-500 block text-[10px] uppercase font-semibold">Пояс и кобура:</span>
                <span className="text-slate-200 font-medium">{activeProfile.holster}</span>
              </div>
            </div>

            {/* Special Features Pills */}
            <div className="pt-2">
              <div className="text-[11px] font-semibold text-slate-400 mb-2">Особенности экипировки:</div>
              <div className="flex flex-wrap gap-1.5">
                {activeProfile.specialFeatures.map((feat, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800 text-[11px] text-slate-300"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                    <span>{feat}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Item Components */}
          <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-rose-400" />
                <span>Элементы комплекта ({activeProfile.gearList.length})</span>
              </h3>
              <span className="text-[11px] text-slate-500 font-mono">Детализация</span>
            </div>

            <div className="space-y-2">
              {activeProfile.gearList.map((gear, idx) => {
                const isSelected = selectedGearIdx === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedGearIdx(idx)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-rose-950/20 border-rose-500/40 shadow-sm ring-1 ring-rose-500/20'
                        : 'bg-slate-950/50 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-xs font-bold text-rose-300">
                        {gear.part}
                      </span>
                      <span className="text-[10px] uppercase font-mono text-slate-500">
                        Уставной стандарт
                      </span>
                    </div>
                    <div className="text-xs text-slate-300 mt-1 leading-relaxed">
                      {gear.item}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Disciplinary Notice */}
      <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400 flex items-start gap-3">
        <Info className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-slate-200">Дисциплинарное примечание:</strong> Замена элементов формы на неуставную одежду, гражданские аксессуары, маски с рисунками либо ношение несоответствующего комплекта без согласования с куратором Управления карается выговором в личное дело.
        </p>
      </div>

      {/* Full Spec Modal */}
      {isModalOpen && (
        <div
          onClick={() => setIsModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-lg w-full bg-slate-900 border border-slate-700 rounded-2xl p-6 space-y-4 relative"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <div className="text-xs font-semibold text-rose-400 uppercase">Спецификация формы</div>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  {activeProfile.title} ({activeProfile.categoryName})
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white text-xs px-2.5 py-1 rounded-lg bg-slate-800"
              >
                Закрыть ✕
              </button>
            </div>
            
            {/* Modal Image & Specs */}
            <div className="space-y-3">
              <p className="text-xs text-slate-300 leading-relaxed">
                {activeProfile.description}
              </p>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <strong className="text-rose-300">Головной убор:</strong> {activeProfile.headwear}
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <strong className="text-rose-300">Лицевая маска:</strong> {activeProfile.mask}
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <strong className="text-rose-300">Бронезащита и торс:</strong> {activeProfile.armor}
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <strong className="text-rose-300">Кобура и пояс:</strong> {activeProfile.holster}
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <strong className="text-rose-300">Брюки и обувь:</strong> {activeProfile.pants}, {activeProfile.footwear}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-300 flex items-center justify-between">
                <span>Статус формы: Действующий устав Управления «В»</span>
                <span className="text-slate-400">ЦСН ФСБ</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
