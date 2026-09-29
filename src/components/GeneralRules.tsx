import React, { useState } from 'react';
import { BookOpen, Search, Copy, Check, ChevronDown, ChevronUp, AlertCircle, Quote, Shield } from 'lucide-react';
import { GENERAL_RULES, RuleArticle } from '../data/portalData';

interface GeneralRulesProps {
  searchQuery: string;
}

export const GeneralRules: React.FC<GeneralRulesProps> = ({ searchQuery }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedArticles, setExpandedArticles] = useState<Record<number, boolean>>({
    1: true,
    3: true,
    6: true,
    10: true,
    13: true,
  });
  const [copiedQuote, setCopiedQuote] = useState<string | null>(null);

  const toggleArticle = (num: number) => {
    setExpandedArticles((prev) => ({
      ...prev,
      [num]: !prev[num],
    }));
  };

  const handleCopyQuote = (quoteText: string) => {
    navigator.clipboard.writeText(quoteText);
    setCopiedQuote(quoteText);
    setTimeout(() => setCopiedQuote(null), 2000);
  };

  const handleExpandAll = (expand: boolean) => {
    const next: Record<number, boolean> = {};
    GENERAL_RULES.forEach((r) => {
      next[r.number] = expand;
    });
    setExpandedArticles(next);
  };

  // Filter by category and search query
  const filteredRules = GENERAL_RULES.filter((r) => {
    const matchesCategory = selectedCategory === 'all' || r.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.content.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (r.quote && r.quote.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-blue-950/30 via-slate-900 to-slate-900 border border-blue-500/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              Устав подразделения
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Общее положение и служебный этикет
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-xl">
              Свод норм воинского приветствия, субординации, радиообмена и профессиональной этики бойцов Управления «В».
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => handleExpandAll(true)}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-medium border border-slate-700 transition-colors"
            >
              Развернуть всё
            </button>
            <button
              onClick={() => handleExpandAll(false)}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-medium border border-slate-700 transition-colors"
            >
              Свернуть всё
            </button>
          </div>
        </div>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            selectedCategory === 'all'
              ? 'bg-rose-600 text-white'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          Все статьи ({GENERAL_RULES.length})
        </button>
        <button
          onClick={() => setSelectedCategory('субординация')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            selectedCategory === 'субординация'
              ? 'bg-rose-600 text-white'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          Субординация
        </button>
        <button
          onClick={() => setSelectedCategory('этика')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            selectedCategory === 'этика'
              ? 'bg-rose-600 text-white'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          Служебная речь
        </button>
        <button
          onClick={() => setSelectedCategory('связь')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            selectedCategory === 'связь'
              ? 'bg-rose-600 text-white'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          Радиосвязь
        </button>
        <button
          onClick={() => setSelectedCategory('спецоперации')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            selectedCategory === 'спецоперации'
              ? 'bg-rose-600 text-white'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          Спецоперации
        </button>
        <button
          onClick={() => setSelectedCategory('дисциплина')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            selectedCategory === 'дисциплина'
              ? 'bg-rose-600 text-white'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          Дисциплина
        </button>
      </div>

      {/* Rules list */}
      <div className="space-y-3">
        {filteredRules.length === 0 ? (
          <div className="p-8 text-center rounded-xl bg-slate-900/40 border border-slate-800 text-slate-400 text-xs">
            По запросу ничего не найдено. Попробуйте изменить поисковую фразу.
          </div>
        ) : (
          filteredRules.map((rule) => {
            const isExpanded = expandedArticles[rule.number] ?? false;

            return (
              <div
                key={rule.number}
                className={`rounded-xl border transition-all ${
                  rule.important
                    ? 'bg-slate-900/80 border-slate-750'
                    : 'bg-slate-900/60 border-slate-800/80'
                }`}
              >
                {/* Header */}
                <button
                  onClick={() => toggleArticle(rule.number)}
                  className="w-full p-4 text-left flex items-center justify-between gap-3 hover:bg-slate-850/40 rounded-xl transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-slate-950 border border-slate-800 font-mono font-bold text-xs text-rose-300 flex items-center justify-center shrink-0">
                      {rule.number}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-white">
                      {rule.title}
                    </span>
                    {rule.important && (
                      <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] bg-rose-500/15 text-rose-300 border border-rose-500/20 font-medium">
                        Важно
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] text-slate-500 capitalize hidden sm:inline">
                      {rule.category}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                </button>

                {/* Content */}
                {isExpanded && (
                  <div className="px-4 pb-4 pt-1 border-t border-slate-800/50 space-y-3">
                    <ul className="space-y-2 text-xs text-slate-300 leading-relaxed">
                      {rule.content.map((p, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-rose-500 font-bold">•</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>

                    {rule.quote && (
                      <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-2 text-rose-300 italic">
                          <Quote className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                          <span>«{rule.quote}»</span>
                        </div>
                        <button
                          onClick={() => handleCopyQuote(rule.quote!)}
                          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-medium flex items-center gap-1 shrink-0 transition-colors"
                          title="Скопировать обращение"
                        >
                          {copiedQuote === rule.quote ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400">Скопировано</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Копировать</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Outro notice */}
      <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 text-xs text-slate-400 space-y-1">
        <div className="font-semibold text-slate-300 flex items-center gap-1.5">
          <Shield className="w-4 h-4 text-emerald-400" />
          Служебная ответственность:
        </div>
        <p className="leading-relaxed">
          Незнание устава не освобождает сотрудника от служебной ответственности. Нарушение субординации карается выговором или понижением в звании. Желаем всем успешной и добросовестной службы!
        </p>
      </div>
    </div>
  );
};
