import React, { useState } from 'react';
import { Terminal, Copy, Check, ExternalLink, HelpCircle, Code, ShieldCheck, Zap } from 'lucide-react';
import { MACRO_CONFIG } from '../data/portalData';

export const MacroSection: React.FC = () => {
  const [copiedId, setCopiedId] = useState(false);
  const [copiedBindIdx, setCopiedBindIdx] = useState<number | null>(null);

  const handleCopyId = () => {
    navigator.clipboard.writeText(MACRO_CONFIG.id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2200);
  };

  const handleCopyBind = (cmd: string, idx: number) => {
    navigator.clipboard.writeText(cmd);
    setCopiedBindIdx(idx);
    setTimeout(() => setCopiedBindIdx(null), 1800);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-purple-950/30 via-slate-900 to-slate-900 border border-purple-500/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <Terminal className="w-3.5 h-3.5" />
              Официальный биндер
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Макрос отыгровки Управления «В»
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-xl">
              Унифицированный профиль действий для автоматической корректной RP-отыгровки процессуальных действий сотрудника спецслужбы.
            </p>
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 font-mono text-xs font-semibold self-start sm:self-auto">
            Версия профиля: {MACRO_CONFIG.version}
          </div>
        </div>
      </div>

      {/* Main Macro ID Box */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-purple-500/30 space-y-3 relative overflow-hidden shadow-xl">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Идентификатор импорта (UUID)
          </span>
          <span className="text-[11px] text-purple-400 font-medium">Готов к копированию</span>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="flex-1 p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm text-purple-300 select-all overflow-x-auto">
            {MACRO_CONFIG.id}
          </div>

          <button
            onClick={handleCopyId}
            className={`inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-xs sm:text-sm transition-all ${
              copiedId
                ? 'bg-emerald-600 text-white'
                : 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-950/50'
            }`}
          >
            {copiedId ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>ID скопирован!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Скопировать ID</span>
              </>
            )}
          </button>
        </div>

        <p className="text-[11px] text-slate-400">
          Вставьте данный код в окне импорта профилей вашего игрового биндера или хелпера (Russia Online / GTA RP).
        </p>
      </div>

      {/* 3 Step Instruction */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
          <div className="w-6 h-6 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 font-mono text-xs font-bold flex items-center justify-center">
            1
          </div>
          <div className="text-xs font-semibold text-white">Скопируйте UUID</div>
          <p className="text-[11px] text-slate-400">
            Нажмите кнопку «Скопировать ID» выше, чтобы скопировать уникальный хэш профиля в буфер.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
          <div className="w-6 h-6 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 font-mono text-xs font-bold flex items-center justify-center">
            2
          </div>
          <div className="text-xs font-semibold text-white">Импортируйте в хелпер</div>
          <p className="text-[11px] text-slate-400">
            В настройках биндера выберите пункт «Импорт по ключу» и вставьте скопированный код.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
          <div className="w-6 h-6 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 font-mono text-xs font-bold flex items-center justify-center">
            3
          </div>
          <div className="text-xs font-semibold text-white">Проверьте горячие клавиши</div>
          <p className="text-[11px] text-slate-400">
            Убедитесь, что клавиши Numpad 1–6 назначены и активны в игре для быстрого реагирования.
          </p>
        </div>
      </div>

      {/* Preset Binds Cheatsheet */}
      <div className="rounded-xl bg-slate-900/70 border border-slate-800 overflow-hidden shadow-xl">
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white flex items-center gap-2">
            <Code className="w-4 h-4 text-purple-400" />
            Раскладка стандартных действий (Numpad)
          </h2>
          <span className="text-[11px] text-slate-500 font-mono">6 предустановок</span>
        </div>

        <div className="divide-y divide-slate-800/60">
          {MACRO_CONFIG.binds.map((bind, i) => (
            <div key={i} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-850/30 transition-colors">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 font-mono text-xs font-bold text-amber-300">
                    {bind.key}
                  </span>
                  <span className="text-xs font-semibold text-white">
                    {bind.action}
                  </span>
                </div>
                <pre className="text-[11px] font-mono text-slate-400 bg-slate-950/80 p-2 rounded-lg border border-slate-800/80 overflow-x-auto whitespace-pre-wrap">
                  {bind.cmd}
                </pre>
              </div>

              <button
                onClick={() => handleCopyBind(bind.cmd, i)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium inline-flex items-center gap-1.5 self-start sm:self-auto shrink-0 transition-colors"
                title="Скопировать текст команды"
              >
                {copiedBindIdx === i ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Скопировано</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Копировать</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
