import React, { useState, useEffect, useRef } from 'react';
import { 
  Upload, 
  Trash2, 
  Maximize2, 
  ZoomIn, 
  ZoomOut, 
  ShieldAlert, 
  Camera, 
  Check, 
  Sparkles,
  Lock,
  Edit3,
  Sliders,
  Sun,
  Contrast,
  RotateCw,
  Eye,
  UserCheck,
  Link2
} from 'lucide-react';
import { FemaleOperativeAvatar, MaleOperativeAvatar } from './TacticalAvatars';
import { UserProfile } from '../data/userData';

interface UniformPhotoViewerProps {
  gender: 'female' | 'male';
  title: string;
  categoryName: string;
  badgeTitle: string;
  currentUser: UserProfile;
  onOpenModal: () => void;
}

export const UniformPhotoViewer: React.FC<UniformPhotoViewerProps> = ({
  gender,
  title,
  categoryName,
  badgeTitle,
  currentUser,
  onOpenModal,
}) => {
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [brightness, setBrightness] = useState<number>(100);
  const [contrast, setContrast] = useState<number>(100);
  const [showEditorTools, setShowEditorTools] = useState(false);
  const [showUrlPrompt, setShowUrlPrompt] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [rotation, setRotation] = useState<number>(0);
  const [serverImageChecked, setServerImageChecked] = useState(false);
  const [serverImageAvailable, setServerImageAvailable] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const defaultServerImagePath = gender === 'female' ? '/female.png' : '/male.png';
  const storageKey = gender === 'female' ? 'fsb_uniform_female_img' : 'fsb_uniform_male_img';
  const canEdit = currentUser.canEditScreenshots;

  // Check if server file exists (/male.png or /female.png on the hosting)
  useEffect(() => {
    let isMounted = true;
    const testImg = new Image();
    testImg.src = defaultServerImagePath;
    testImg.onload = () => {
      if (isMounted) {
        setServerImageAvailable(defaultServerImagePath);
        setServerImageChecked(true);
      }
    };
    testImg.onerror = () => {
      if (isMounted) {
        setServerImageAvailable(null);
        setServerImageChecked(true);
      }
    };
    return () => {
      isMounted = false;
    };
  }, [defaultServerImagePath]);

  // Load from localStorage or server file
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setCustomImage(saved);
    } else if (serverImageAvailable) {
      setCustomImage(serverImageAvailable);
    } else {
      setCustomImage(null);
    }
    setZoomLevel(1);
    setBrightness(100);
    setContrast(100);
    setRotation(0);
    setShowEditorTools(false);
  }, [storageKey, gender, serverImageAvailable]);

  // Handle file select
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!canEdit) {
      alert('Редактирование и загрузка скриншотов разрешена только Куратору (Станислав Яров).');
      return;
    }

    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setCustomImage(result);
        try {
          localStorage.setItem(storageKey, result);
        } catch (err) {
          console.warn('LocalStorage quota exceeded', err);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Drag & Drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (canEdit) setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (!canEdit) {
      alert('Редактирование и загрузка скриншотов разрешена только Куратору (Станислав Яров).');
      return;
    }

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setCustomImage(result);
        try {
          localStorage.setItem(storageKey, result);
        } catch (err) {
          console.warn('LocalStorage quota exceeded', err);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Paste from clipboard support (Ctrl+V)
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (!canEdit) return;
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const blob = items[i].getAsFile();
          if (blob) {
            const reader = new FileReader();
            reader.onload = (event) => {
              const result = event.target?.result as string;
              setCustomImage(result);
              try {
                localStorage.setItem(storageKey, result);
              } catch (err) {
                console.warn('LocalStorage quota exceeded', err);
              }
            };
            reader.readAsDataURL(blob);
          }
          break;
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [storageKey, canEdit]);

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!canEdit) {
      alert('Удаление скриншота доступно только Куратору (Станислав Яров).');
      return;
    }
    if (confirm('Сбросить текущий скриншот и вернуться к стандартному тактическому рендеру?')) {
      setCustomImage(null);
      localStorage.removeItem(storageKey);
      setZoomLevel(1);
      setBrightness(100);
      setContrast(100);
      setRotation(0);
    }
  };

  return (
    <div className="space-y-3">
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg, image/webp"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Editor Permission Banner */}
      <div className={`px-3 py-2 rounded-xl border text-xs flex items-center justify-between gap-2 transition-colors ${
        canEdit 
          ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300' 
          : 'bg-slate-900/60 border-slate-800 text-slate-400'
      }`}>
        <div className="flex items-center gap-2">
          {canEdit ? (
            <ShieldAlert className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          ) : (
            <Lock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          )}
          <span>
            {canEdit ? (
              <>Права редактора: <strong>Куратор {currentUser.name}</strong></>
            ) : (
              <>Режим просмотра: Редактировать может только <strong>Куратор Станислав Яров</strong></>
            )}
          </span>
        </div>

        {canEdit && (
          <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold">
            EDIT ACCESS
          </span>
        )}
      </div>

      {/* Main Image Frame / Canvas View */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative group rounded-2xl overflow-hidden border transition-all duration-200 aspect-[3/4] flex items-center justify-center bg-black/90 shadow-2xl ${
          isDragging
            ? 'border-rose-500 ring-2 ring-rose-500/40 bg-rose-950/20'
            : 'border-slate-800 hover:border-slate-700'
        }`}
      >
        {/* If Custom In-game Screenshot uploaded by user */}
        {customImage ? (
          <div className="w-full h-full overflow-hidden flex items-center justify-center relative bg-[#090b10]">
            <img
              src={customImage}
              alt={title}
              className="w-full h-full object-contain transition-transform duration-200"
              style={{ 
                transform: `scale(${zoomLevel}) rotate(${rotation}deg)`,
                filter: `brightness(${brightness}%) contrast(${contrast}%)`
              }}
            />

            {/* In-game badge indicator */}
            <div className="absolute bottom-3 left-3 z-20 px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md border border-white/10 text-[10px] text-slate-300 font-mono flex items-center gap-1.5">
              <Camera className="w-3 h-3 text-emerald-400" />
              <span>Оригинал из игры</span>
            </div>
          </div>
        ) : (
          /* Realistic Tactical Render */
          <div className="w-full h-full relative flex items-center justify-center">
            {gender === 'female' ? (
              <FemaleOperativeAvatar className="w-full h-full object-contain" />
            ) : (
              <MaleOperativeAvatar className="w-full h-full object-contain" />
            )}

            {/* Prompt to upload user screenshot */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4 z-10 pointer-events-none">
              <div className="text-[11px] text-slate-300 font-medium">
                {title} ({badgeTitle})
              </div>
              <div className="text-[10px] text-slate-400">
                {canEdit 
                  ? 'Куратор может загрузить сюда скриншот формы из игры'
                  : 'Стандартный тактический рендер комплекта'}
              </div>
            </div>
          </div>
        )}

        {/* Top-Right Control Buttons */}
        <div className="absolute top-3 right-3 z-30 flex items-center gap-1.5 opacity-90 hover:opacity-100 transition-opacity">
          {customImage && (
            <>
              {canEdit && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowEditorTools(!showEditorTools);
                  }}
                  className={`p-1.5 rounded-lg backdrop-blur-md border transition-colors ${
                    showEditorTools 
                      ? 'bg-rose-600 text-white border-rose-400' 
                      : 'bg-black/60 hover:bg-black/80 text-white border-white/10'
                  }`}
                  title="Панель цветокоррекции скриншота"
                >
                  <Sliders className="w-3.5 h-3.5" />
                </button>
              )}

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setZoomLevel((z) => Math.min(2.5, z + 0.25));
                }}
                className="p-1.5 rounded-lg bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/10"
                title="Увеличить"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setZoomLevel((z) => Math.max(0.75, z - 0.25));
                }}
                className="p-1.5 rounded-lg bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/10"
                title="Уменьшить"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>

              {canEdit && (
                <button
                  onClick={handleRemoveImage}
                  className="p-1.5 rounded-lg bg-rose-950/80 hover:bg-rose-900 text-rose-300 backdrop-blur-md border border-rose-500/30"
                  title="Удалить скриншот (только Куратор)"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenModal();
            }}
            className="p-1.5 rounded-lg bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/10"
            title="Развернуть"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Drag Drop Overlay */}
        {isDragging && canEdit && (
          <div className="absolute inset-0 z-40 bg-rose-950/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center text-white border-2 border-dashed border-rose-400 rounded-2xl">
            <Upload className="w-10 h-10 text-rose-300 animate-bounce mb-2" />
            <div className="text-sm font-bold">Отпустите файл для загрузки</div>
            <div className="text-xs text-rose-200 mt-1">
              Скриншот формы будет сохранен куратором в профиль «{title}»
            </div>
          </div>
        )}
      </div>

      {/* Editor Adjustment Drawer (Brightness, Contrast, Rotation) */}
      {showEditorTools && canEdit && customImage && (
        <div className="p-3.5 rounded-xl bg-slate-900 border border-rose-500/30 space-y-2.5 text-xs animate-in fade-in">
          <div className="flex items-center justify-between font-semibold text-rose-300 border-b border-slate-800 pb-2">
            <span className="flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5" />
              Редактор изображения скриншота
            </span>
            <button
              onClick={() => {
                setBrightness(100);
                setContrast(100);
                setRotation(0);
                setZoomLevel(1);
              }}
              className="text-[10px] text-slate-400 hover:text-white"
            >
              Сброс
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="flex justify-between text-slate-400 text-[11px] mb-1">
                <span className="flex items-center gap-1"><Sun className="w-3 h-3" /> Яркость:</span>
                <span className="font-mono">{brightness}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="150"
                value={brightness}
                onChange={(e) => setBrightness(Number(e.target.value))}
                className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-400 text-[11px] mb-1">
                <span className="flex items-center gap-1"><Contrast className="w-3 h-3" /> Контраст:</span>
                <span className="font-mono">{contrast}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="150"
                value={contrast}
                onChange={(e) => setContrast(Number(e.target.value))}
                className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] text-slate-400">Поворот:</span>
            <button
              onClick={() => setRotation((r) => (r + 90) % 360)}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] flex items-center gap-1"
            >
              <RotateCw className="w-3 h-3" />
              <span>Повернуть на 90° ({rotation}°)</span>
            </button>
          </div>
        </div>
      )}

      {/* Action Bar: Upload, Paste, URL (Available only or conditioned on permissions) */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          {canEdit ? (
            <>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-750 text-xs font-semibold text-slate-200 hover:text-white transition-all shadow-sm"
              >
                <Upload className="w-3.5 h-3.5 text-rose-400" />
                <span>{customImage ? 'Файл с ПК' : 'Загрузить файл'}</span>
              </button>

              <button
                onClick={() => setShowUrlPrompt(!showUrlPrompt)}
                className={`px-3 py-2.5 rounded-xl border text-xs font-medium transition-colors flex items-center gap-1.5 ${
                  showUrlPrompt
                    ? 'bg-rose-950/40 border-rose-500/50 text-rose-300'
                    : 'bg-slate-900 hover:bg-slate-800 border-slate-750 text-slate-300 hover:text-white'
                }`}
                title="Указать прямую ссылку на картинку (URL)"
              >
                <Link2 className="w-3.5 h-3.5 text-sky-400" />
                <span>По ссылке</span>
              </button>

              <button
                onClick={async () => {
                  try {
                    const clipboardItems = await navigator.clipboard.read();
                    for (const item of clipboardItems) {
                      const imageType = item.types.find((type) => type.startsWith('image/'));
                      if (imageType) {
                        const blob = await item.getType(imageType);
                        const reader = new FileReader();
                        reader.onload = (e) => {
                          const result = e.target?.result as string;
                          setCustomImage(result);
                          localStorage.setItem(storageKey, result);
                        };
                        reader.readAsDataURL(blob);
                        return;
                      }
                    }
                    alert('В буфере обмена не найдено изображение. Скопируйте картинку или нажмите «Загрузить».');
                  } catch (err) {
                    fileInputRef.current?.click();
                  }
                }}
                className="px-3 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-750 text-xs font-medium text-slate-300 hover:text-white transition-colors"
                title="Вставить картинку из буфера обмена (Ctrl+V)"
              >
                <span>Вставить</span>
              </button>
            </>
          ) : (
            <div className="flex-1 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-center text-xs text-slate-400">
              Редактирование скриншотов закреплено за аккаунтом Куратора Станислава Ярова
            </div>
          )}
        </div>

        {/* URL Input field if opened */}
        {showUrlPrompt && canEdit && (
          <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col gap-2">
            <div className="text-[11px] text-slate-300">
              Укажите прямую ссылку на скриншот (например, с Yapx, Imgur, Postimages или хостинга):
            </div>
            <div className="flex gap-2">
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://i.imgur.com/... или https://...png"
                className="flex-1 px-3 py-1.5 rounded-lg bg-black/60 border border-slate-750 text-xs text-slate-200 focus:outline-none focus:border-rose-500"
              />
              <button
                onClick={() => {
                  if (urlInput.trim()) {
                    setCustomImage(urlInput.trim());
                    try {
                      localStorage.setItem(storageKey, urlInput.trim());
                    } catch (e) {
                      console.warn(e);
                    }
                    setShowUrlPrompt(false);
                    setUrlInput('');
                  }
                }}
                className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-xs font-semibold text-white transition-colors"
              >
                Применить
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
