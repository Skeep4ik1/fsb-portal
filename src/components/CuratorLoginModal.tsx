import React, { useState } from 'react';
import { ShieldAlert, KeyRound, Lock, Eye, EyeOff, Check, X, AlertCircle } from 'lucide-react';
import { CURATOR_PIN, USERS_DB, UserProfile } from '../data/userData';

interface CuratorLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (curatorUser: UserProfile) => void;
}

export const CuratorLoginModal: React.FC<CuratorLoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.trim() === CURATOR_PIN) {
      setIsSuccess(true);
      setError(null);
      setTimeout(() => {
        const curator = USERS_DB.find((u) => u.id === 'curator-stanislav')!;
        localStorage.setItem('fsb_auth_role', 'curator');
        onSuccess(curator);
        setIsSuccess(false);
        setPin('');
        onClose();
      }, 600);
    } else {
      setError('Неверный служебный пин-код доступа!');
      setPin('');
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-w-sm w-full bg-slate-900 border border-slate-700/80 rounded-2xl p-6 shadow-2xl relative space-y-4 animate-in fade-in zoom-in-95"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-600/20 border border-rose-500/30 flex items-center justify-center text-rose-400">
            <KeyRound className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-rose-400 font-bold">
              Служба безопасности ЦСН
            </div>
            <h3 className="text-base font-bold text-white leading-tight">
              Авторизация Куратора
            </h3>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Профиль <strong className="text-white">Станислав Яров</strong> защищен служебным пин-кодом. Введите пин-код для разблокировки прав редактирования скриншотов.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 pt-1">
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-slate-300 flex items-center justify-between">
              <span>Служебный PIN-код:</span>
              <span className="text-[10px] font-mono text-slate-500">8 цифр</span>
            </label>
            
            <div className="relative">
              <input
                type={showPin ? 'text' : 'password'}
                maxLength={8}
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="Введите 8-значный PIN"
                autoFocus
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-750 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 text-white font-mono text-sm tracking-widest placeholder:text-slate-600 placeholder:tracking-normal outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {error && (
              <div className="flex items-center gap-1.5 text-xs text-rose-400 mt-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-xs font-semibold text-slate-300 transition-colors"
            >
              Отмена
            </button>
            <button
              type="submit"
              disabled={isSuccess || pin.length < 4}
              className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                isSuccess
                  ? 'bg-emerald-600 text-white'
                  : 'bg-rose-600 hover:bg-rose-500 text-white disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-rose-950/50'
              }`}
            >
              {isSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>Доступ открыт</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  <span>Подтвердить</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
