import React, { useState } from 'react';
import { ExternalLink, Radio, Copy, Check, Shield, BookOpen, AlertOctagon, HelpCircle } from 'lucide-react';
import { HELPFUL_LINKS } from '../data/portalData';

export const MemoResources: React.FC = () => {
  const [recipient, setRecipient] = useState('');
  const [location, setLocation] = useState('');
  const [situation, setSituation] = useState('');
  const [copiedReport, setCopiedReport] = useState(false);

  const formattedRadioReport = recipient || location || situation
    ? `${recipient || '[Кому]'}. В районе «${location || '[Объект]'}» ${situation || '[Обстановка]'}`
    : 'Заполните поля выше для формирования доклада в рацию';

  const handleCopyReport = () => {
    navigator.clipboard.writeText(formattedRadioReport);
    setCopiedReport(true);
    setTimeout(() => setCopiedReport(false), 2000);
  };

  const emergencyCodes = [
    { code: 'Код 1', status: 'Обстановка стабильная', desc: 'Сектор чист, дежурство продолжается в штатном режиме.', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
    { code: 'Код 2', status: 'Подозрительная активность', desc: 'Замечены вооруженные лица или подозрительный кортеж. Внимание в секторе.', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
    { code: 'Код 3', status: 'Нападение / Срочная поддержка', desc: 'Идет интенсивная перестрелка. Всем свободным экипажам немедленно прибыть.', color: 'text-rose-400 bg-rose-500/10 border-rose-500/20' },
    { code: 'Код 0', status: 'Офицер ранен / На земле', desc: 'Критическое ранение сотрудника. Требуется немедленная эвакуация и поддержка.', color: 'text-red-500 bg-red-600/20 border-red-500/30' },
  ];

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-rose-950/20 border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <BookOpen className="w-3.5 h-3.5 text-rose-400" />
              База знаний и ресурсы
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Служебная памятка и ссылки
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-xl">
              Быстрый доступ к нормативным актам сервера, генератор уставных радиодокладов и таблица кодов оперативного реагирования.
            </p>
          </div>
        </div>
      </div>

      {/* Useful Links List */}
      <div className="space-y-3">
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-1">
          Официальные ресурсы сервера РО
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {HELPFUL_LINKS.map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-rose-500/40 hover:bg-slate-850/50 flex flex-col justify-between gap-3 transition-all group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-rose-500/10 text-rose-300 border border-rose-500/20">
                    {link.tag}
                  </span>
                  <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-rose-400 transition-colors" />
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-rose-200 transition-colors">
                  {link.title}
                </h3>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {link.description}
                </p>
              </div>

              <div className="text-[11px] font-medium text-rose-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                <span>Открыть документ</span>
                <span>→</span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Interactive Radio Report Builder */}
      <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-rose-400" />
            <h2 className="text-sm font-semibold text-white">
              Конструктор уставного доклада в рацию
            </h2>
          </div>
          <span className="text-[11px] text-slate-500 font-mono">Статья 10 Устава</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <label className="block text-slate-400 font-medium mb-1">Обращение:</label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-rose-500/50"
              placeholder="Гос.Структуры"
            />
          </div>

          <div>
            <label className="block text-slate-400 font-medium mb-1">Место / Объект:</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-rose-500/50"
              placeholder="Ювелирный салон"
            />
          </div>

          <div>
            <label className="block text-slate-400 font-medium mb-1">Обстановка / Действия:</label>
            <input
              type="text"
              value={situation}
              onChange={(e) => setSituation(e.target.value)}
              className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-rose-500/50"
              placeholder="зафиксировано ограбление..."
            />
          </div>
        </div>

        {/* Live Output */}
        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-mono text-rose-300 overflow-x-auto">
            <span className="text-slate-500 shrink-0">Рация:</span>
            <span>«{formattedRadioReport}»</span>
          </div>

          <button
            onClick={handleCopyReport}
            className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-medium flex items-center justify-center gap-1.5 shrink-0 transition-colors"
          >
            {copiedReport ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-300" />
                <span>Скопировано</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Копировать доклад</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Emergency Status Codes */}
      <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="text-sm font-semibold text-white flex items-center gap-2">
            <AlertOctagon className="w-4 h-4 text-amber-400" />
            Коды оперативного реагирования
          </h2>
          <span className="text-xs text-slate-500 font-mono">Шпаргалка</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {emergencyCodes.map((item, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
              <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-mono font-bold border ${item.color}`}>
                {item.code}
              </span>
              <div className="text-xs font-bold text-slate-200">{item.status}</div>
              <p className="text-[11px] text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
