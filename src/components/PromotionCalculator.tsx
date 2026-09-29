import React, { useState } from 'react';
import { Calculator, Plus, Minus, Check, Copy, AlertTriangle, ArrowRight, ShieldCheck, Sparkles, RefreshCw } from 'lucide-react';
import { RANKS_LADDER, ACTIVITIES } from '../data/portalData';

interface PromotionCalculatorProps {
  onPointsCalculated: (points: number) => void;
}

export const PromotionCalculator: React.FC<PromotionCalculatorProps> = ({ onPointsCalculated }) => {
  const [selectedRankIdx, setSelectedRankIdx] = useState(0);
  const [arrests, setArrests] = useState(0);
  const [businessDefenses, setBusinessDefenses] = useState(0);
  const [rollbackDefenses, setRollbackDefenses] = useState(0);
  const [emergencyCalls, setEmergencyCalls] = useState(0);
  const [manualBonus, setManualBonus] = useState(0);
  const [copierState, setCopierState] = useState(false);

  const currentRank = RANKS_LADDER[selectedRankIdx];
  const requiredPoints = currentRank.points;

  // Total points calculation
  const totalPoints =
    arrests * 20 +
    businessDefenses * 20 +
    rollbackDefenses * 50 +
    emergencyCalls * 10 +
    manualBonus;

  // Overflow and rollover calculation
  const surplus = Math.max(0, totalPoints - requiredPoints);
  const rollover = Math.floor(surplus / 2);
  const percentComplete = Math.min(100, Math.round((totalPoints / requiredPoints) * 100));
  const isReady = totalPoints >= requiredPoints;

  // Notify parent on points change
  React.useEffect(() => {
    onPointsCalculated(totalPoints);
  }, [totalPoints, onPointsCalculated]);

  // Check additional conditions
  const hasEnoughArrests =
    selectedRankIdx === 2 ? arrests >= 3 : selectedRankIdx === 3 ? arrests >= 5 : true;

  const handleCopyReport = () => {
    const reportText = `[РАПОРТ НА ПОВЫШЕНИЕ — УПРАВЛЕНИЕ «В» ФСБ]
1. Текущее звание: ${currentRank.fromRank}
2. Желаемое звание: ${currentRank.toRank} (Требуется: ${requiredPoints} б.)
3. Проделанная работа:
   • Задержания преступников: ${arrests} шт. (${arrests * 20} б.)
   • Отбития бизнесов: ${businessDefenses} шт. (${businessDefenses * 20} б.)
   • Отбития с откатом: ${rollbackDefenses} шт. (${rollbackDefenses * 50} б.)
   • Реагирование на коды: ${emergencyCalls} шт. (${emergencyCalls * 10} б.)
   ${manualBonus > 0 ? `• Дополнительные баллы: ${manualBonus} б.` : ''}
---------------------------------------------
ИТОГО НАБРАНО: ${totalPoints} / ${requiredPoints} баллов
ОСТАТОК К ПЕРЕНОСУ: ${rollover} баллов (сверх нормы: ${surplus} б.)
Фиксация прикреплена в канале #скриншоты`;

    navigator.clipboard.writeText(reportText);
    setCopierState(true);
    setTimeout(() => setCopierState(false), 2200);
  };

  const handleReset = () => {
    setArrests(0);
    setBusinessDefenses(0);
    setRollbackDefenses(0);
    setEmergencyCalls(0);
    setManualBonus(0);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-emerald-950/30 via-slate-900 to-slate-900 border border-emerald-500/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <Calculator className="w-3.5 h-3.5" />
              Калькулятор нормативов
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Интерактивный расчёт баллов
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-xl">
              Укажите выполненные служебные задачи, оцените готовность к следующему воинскому званию и сгенерируйте готовый рапорт для отчёта.
            </p>
          </div>

          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-medium border border-slate-700 transition-colors self-start sm:self-auto"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Сбросить счётчики
          </button>
        </div>
      </div>

      {/* Target Rank Selection */}
      <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-5 space-y-3">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
          Выберите целевой переход звания:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
          {RANKS_LADDER.map((rank, idx) => {
            const isSelected = selectedRankIdx === idx;
            return (
              <button
                key={idx}
                onClick={() => setSelectedRankIdx(idx)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-rose-600/15 border-rose-500/50 text-white shadow-md shadow-rose-950/40 ring-1 ring-rose-500/30'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <div className="text-[11px] text-slate-400 truncate">{rank.fromRank}</div>
                <div className="text-xs font-bold text-rose-300 flex items-center gap-1 my-1">
                  <span>→ {rank.toRank}</span>
                </div>
                <div className="text-[11px] font-mono font-semibold text-amber-400">
                  {rank.points} баллов
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Activity Counters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Arrests */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-white">Задержание нарушителя</div>
            <div className="text-[11px] text-slate-400 mt-0.5">20 баллов за каждое успешное задержание</div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setArrests(Math.max(0, arrests - 1))}
              className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center transition-colors"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-10 text-center font-mono font-bold text-sm text-white">
              {arrests}
            </span>
            <button
              onClick={() => setArrests(arrests + 1)}
              className="w-8 h-8 rounded-lg bg-rose-600/30 hover:bg-rose-600 text-rose-200 hover:text-white flex items-center justify-center transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Business Defenses */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-white">Отбитие бизнеса (штатное)</div>
            <div className="text-[11px] text-slate-400 mt-0.5">20 баллов за успешную защиту объекта</div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setBusinessDefenses(Math.max(0, businessDefenses - 1))}
              className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center transition-colors"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-10 text-center font-mono font-bold text-sm text-white">
              {businessDefenses}
            </span>
            <button
              onClick={() => setBusinessDefenses(businessDefenses + 1)}
              className="w-8 h-8 rounded-lg bg-rose-600/30 hover:bg-rose-600 text-rose-200 hover:text-white flex items-center justify-center transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Rollback Defenses */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-white flex items-center gap-1.5">
              <span>Отбитие с откатом / сопротивлением</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-500/20 text-amber-300 font-mono">
                50 б.
              </span>
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">При плотном сопротивлении с видеофиксацией</div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setRollbackDefenses(Math.max(0, rollbackDefenses - 1))}
              className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center transition-colors"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-10 text-center font-mono font-bold text-sm text-white">
              {rollbackDefenses}
            </span>
            <button
              onClick={() => setRollbackDefenses(rollbackDefenses + 1)}
              className="w-8 h-8 rounded-lg bg-rose-600/30 hover:bg-rose-600 text-rose-200 hover:text-white flex items-center justify-center transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Emergency Code Calls */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-white">Выезд на срочный код</div>
            <div className="text-[11px] text-slate-400 mt-0.5">10 баллов за каждый оперативный вызов</div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setEmergencyCalls(Math.max(0, emergencyCalls - 1))}
              className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center justify-center transition-colors"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-10 text-center font-mono font-bold text-sm text-white">
              {emergencyCalls}
            </span>
            <button
              onClick={() => setEmergencyCalls(emergencyCalls + 1)}
              className="w-8 h-8 rounded-lg bg-rose-600/30 hover:bg-rose-600 text-rose-200 hover:text-white flex items-center justify-center transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Progress & Result Box */}
      <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-xs text-slate-400 font-medium">Текущий результат:</div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl sm:text-4xl font-mono font-extrabold text-white tabular-nums">
                {totalPoints}
              </span>
              <span className="text-sm font-mono text-slate-400">/ {requiredPoints} баллов</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isReady ? (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
                <Check className="w-4 h-4 text-emerald-400" />
                Норматив выполнен!
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                Осталось набрать: {requiredPoints - totalPoints} б.
              </div>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div>
          <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden p-0.5">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                isReady
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                  : 'bg-gradient-to-r from-rose-500 to-amber-500'
              }`}
              style={{ width: `${percentComplete}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-slate-500 font-mono mt-1.5">
            <span>Прогресс: {percentComplete}%</span>
            <span>
              Сверх нормы: <strong className="text-emerald-400">+{surplus} б.</strong> (В новое звание перейдёт: <strong>+{rollover} б.</strong>)
            </span>
          </div>
        </div>

        {/* Conditions Check */}
        {currentRank.conditions !== 'Без дополнительных условий' && (
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-300">
              <span className="text-slate-500">Доп. условие:</span>
              <strong>{currentRank.conditions}</strong>
            </div>
            {hasEnoughArrests ? (
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Выполнено
              </span>
            ) : (
              <span className="text-amber-400 font-semibold flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" /> Недостаточно
              </span>
            )}
          </div>
        )}

        {/* Generate Report Button */}
        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleCopyReport}
            className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-xs sm:text-sm transition-all ${
              copierState
                ? 'bg-emerald-600 text-white'
                : 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-950/40'
            }`}
          >
            {copierState ? (
              <>
                <Check className="w-4 h-4" />
                Рапорт скопирован в буфер обмена!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Скопировать готовый рапорт для отчёта
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
