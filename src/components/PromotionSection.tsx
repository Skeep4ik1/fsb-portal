import React, { useState } from 'react';
import { TrendingUp, ShieldCheck, Award, ArrowRight } from 'lucide-react';
import { RANKS_LADDER } from '../data/portalData';

interface PromotionSectionProps {
  onOpenCalculator: () => void;
}

export const PromotionSection: React.FC<PromotionSectionProps> = ({ onOpenCalculator }) => {
  const [selectedRankIdx, setSelectedRankIdx] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-950/40 via-slate-900/60 to-slate-900 border border-rose-500/20 p-5 sm:p-7">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <TrendingUp className="w-3.5 h-3.5" />
              Регламент карьеры
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Система повышения званий
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-xl">
              Критерии перехода между воинскими званиями Управления «В», система начисления служебных баллов и правила переноса остатков.
            </p>
          </div>

          <button
            onClick={onOpenCalculator}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-medium text-xs sm:text-sm shadow-lg shadow-rose-950/50 transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap self-start sm:self-auto"
          >
            <ShieldCheck className="w-4 h-4" />
            Рассчитать повышение
          </button>
        </div>
      </div>

      {/* Ranks Ladder Table */}
      <div className="rounded-xl bg-slate-900/70 border border-slate-800 overflow-hidden shadow-xl">
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-rose-400" />
            <h2 className="text-sm font-semibold text-white">
              Лестница званий и нормативы
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-mono">5 ступеней</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/60 text-slate-400 uppercase text-[11px] font-semibold border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Звание (Переход)</th>
                <th className="py-3 px-4 text-center">Необходимые баллы</th>
                <th className="py-3 px-4">Особые требования</th>
                <th className="py-3 px-4 text-right">Действие</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {RANKS_LADDER.map((rank, idx) => (
                <tr
                  key={idx}
                  onClick={() => setSelectedRankIdx(idx === selectedRankIdx ? null : idx)}
                  className={`cursor-pointer transition-colors ${
                    selectedRankIdx === idx
                      ? 'bg-rose-950/20'
                      : 'hover:bg-slate-850/40'
                  }`}
                >
                  <td className="py-3.5 px-4 font-medium text-slate-200">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400">{rank.fromRank}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-rose-400" />
                      <span className="text-rose-300 font-semibold">{rank.toRank}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-center font-mono font-bold text-amber-300">
                    <span className="px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20">
                      {rank.points} б.
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-400">
                    {rank.conditions === 'Без дополнительных условий' ? (
                      <span className="text-slate-500 italic">—</span>
                    ) : (
                      <span className="text-slate-300 font-medium">{rank.conditions}</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenCalculator();
                      }}
                      className="text-xs text-rose-400 hover:text-rose-300 font-medium underline"
                    >
                      К расчёту
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
