import React from 'react';

export const FemaleOperativeAvatar: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => {
  return (
    <svg
      viewBox="0 0 340 680"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* In-game indoor room background gradient */}
        <linearGradient id="roomBgFemale" x1="170" y1="0" x2="170" y2="680" gradientUnits="userSpaceOnUse">
          <stop stopColor="#302c29" />
          <stop offset="0.45" stopColor="#252220" />
          <stop offset="0.75" stopColor="#483f35" />
          <stop offset="1" stopColor="#5a4e40" />
        </linearGradient>

        <linearGradient id="glassWall" x1="0" y1="0" x2="1" y2="0">
          <stop stopColor="#4d5f6e" stopOpacity="0.45" />
          <stop offset="0.5" stopColor="#677f93" stopOpacity="0.25" />
          <stop offset="1" stopColor="#3d4c58" stopOpacity="0.5" />
        </linearGradient>

        {/* Tactical Black Fabric Gradients with Realistic Folds */}
        <linearGradient id="tacticalBlackTop" x1="170" y1="180" x2="170" y2="350" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1f2229" />
          <stop offset="0.5" stopColor="#13151b" />
          <stop offset="1" stopColor="#0a0b0f" />
        </linearGradient>

        <linearGradient id="tacticalPants" x1="170" y1="340" x2="170" y2="620" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1b1d24" />
          <stop offset="0.5" stopColor="#111318" />
          <stop offset="1" stopColor="#08090d" />
        </linearGradient>

        {/* Skin Tone */}
        <linearGradient id="skinToneFemale" x1="170" y1="120" x2="170" y2="150" gradientUnits="userSpaceOnUse">
          <stop stopColor="#d59f84" />
          <stop offset="1" stopColor="#bd8168" />
        </linearGradient>

        {/* Yellow Gold Embroidered FSB Badge */}
        <linearGradient id="fsbYellow" x1="0" y1="0" x2="1" y2="0">
          <stop stopColor="#facc15" />
          <stop offset="0.5" stopColor="#f59e0b" />
          <stop offset="1" stopColor="#eab308" />
        </linearGradient>

        <radialGradient id="shadowFloor" cx="170" cy="650" r="110" gradientUnits="userSpaceOnUse">
          <stop stopColor="#000000" stopOpacity="0.75" />
          <stop offset="1" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* 1. ROOM BACKGROUND (Indoor office / lobby with glass and pillars) */}
      <rect width="340" height="680" fill="url(#roomBgFemale)" />
      
      {/* Center column / pillar */}
      <rect x="145" y="0" width="50" height="320" fill="#383430" />
      <line x1="145" y1="0" x2="145" y2="320" stroke="#1f1d1b" strokeWidth="1.5" />
      <line x1="195" y1="0" x2="195" y2="320" stroke="#48423c" strokeWidth="1.5" />

      {/* Glass partition wall */}
      <rect x="0" y="70" width="340" height="340" fill="url(#glassWall)" />
      <line x1="0" y1="210" x2="340" y2="210" stroke="#718096" strokeWidth="1.5" opacity="0.3" />
      <line x1="0" y1="250" x2="340" y2="250" stroke="#a0aec0" strokeWidth="3" opacity="0.5" />
      <line x1="0" y1="410" x2="340" y2="410" stroke="#2d3748" strokeWidth="3" />

      {/* Blurred background indoor benches / tables */}
      <rect x="10" y="255" width="125" height="18" rx="2" fill="#8c6a46" opacity="0.6" />
      <rect x="205" y="255" width="125" height="18" rx="2" fill="#8c6a46" opacity="0.6" />
      <line x1="30" y1="273" x2="28" y2="330" stroke="#2d3748" strokeWidth="2.5" opacity="0.7" />
      <line x1="110" y1="273" x2="112" y2="330" stroke="#2d3748" strokeWidth="2.5" opacity="0.7" />
      <line x1="225" y1="273" x2="223" y2="330" stroke="#2d3748" strokeWidth="2.5" opacity="0.7" />
      <line x1="305" y1="273" x2="307" y2="330" stroke="#2d3748" strokeWidth="2.5" opacity="0.7" />

      {/* Base floor / skirting board */}
      <rect x="0" y="440" width="340" height="240" fill="#584b3d" />
      <line x1="0" y1="440" x2="340" y2="440" stroke="#2a231c" strokeWidth="3" />

      {/* Shadow under operative */}
      <ellipse cx="170" cy="650" rx="90" ry="20" fill="url(#shadowFloor)" />

      {/* 2. OPERATIVE MODEL */}

      {/* BLACK BOOTS */}
      <path d="M120 600L108 642L116 652H154L150 600H120Z" fill="#0d0f14" stroke="#1f242e" strokeWidth="1.5" />
      <path d="M190 600L186 652H224L232 642L220 600H190Z" fill="#0d0f14" stroke="#1f242e" strokeWidth="1.5" />
      <path d="M106 650H156V656H104L106 650Z" fill="#050608" />
      <path d="M184 650H234L236 656H184V650Z" fill="#050608" />
      {/* Boot laces / texture */}
      <path d="M124 610H142M122 620H140M120 630H138" stroke="#334155" strokeWidth="1.5" />
      <path d="M198 610H216M200 620H218M202 630H220" stroke="#334155" strokeWidth="1.5" />

      {/* BLACK COMBAT PANTS */}
      <path d="M118 350L106 520L116 605H150L156 520L164 370" fill="url(#tacticalPants)" stroke="#222631" strokeWidth="2" />
      <path d="M222 350L234 520L224 605H190L184 520L176 370" fill="url(#tacticalPants)" stroke="#222631" strokeWidth="2" />
      <path d="M156 360L170 395L184 360" stroke="#0b0d12" strokeWidth="2" fill="none" />

      {/* Knee pads */}
      <rect x="112" y="495" width="38" height="46" rx="10" fill="#14161d" stroke="#374151" strokeWidth="2" />
      <rect x="190" y="495" width="38" height="46" rx="10" fill="#14161d" stroke="#374151" strokeWidth="2" />
      <circle cx="131" cy="518" r="3" fill="#475569" />
      <circle cx="209" cy="518" r="3" fill="#475569" />

      {/* Right thigh tactical holster strap & gun holster */}
      <path d="M106 415H158V434H106Z" fill="#0e1015" stroke="#334155" strokeWidth="2" />
      <rect x="100" y="425" width="28" height="60" rx="4" fill="#090a0e" stroke="#475569" strokeWidth="2" />
      <rect x="114" y="420" width="14" height="12" rx="2" fill="#64748b" />
      {/* Holster belt loop */}
      <line x1="112" y1="365" x2="112" y2="415" stroke="#1e293b" strokeWidth="3" />

      {/* TACTICAL NYLON BELT */}
      <rect x="110" y="340" width="120" height="22" rx="3" fill="#0d0f14" stroke="#334155" strokeWidth="2" />
      <rect x="156" y="337" width="28" height="28" rx="4" fill="#1e2430" stroke="#64748b" strokeWidth="2" />
      <circle cx="170" cy="351" r="3.5" fill="#94a3b8" />

      {/* TORSO / FEMALE COMBAT SHIRT (Long sleeve with zipper & collar) */}
      <path d="M112 215L102 345H238L228 215L192 195H148L112 215Z" fill="url(#tacticalBlackTop)" stroke="#2b313e" strokeWidth="2" />

      {/* Turned down collar */}
      <path d="M146 195L158 225L170 205L182 225L194 195" fill="#15171e" stroke="#334155" strokeWidth="1.5" />

      {/* Front zipper */}
      <line x1="170" y1="205" x2="170" y2="340" stroke="#334155" strokeWidth="2.5" strokeDasharray="3 2" />
      <rect x="167" y="240" width="6" height="12" rx="1.5" fill="#64748b" />

      {/* Fabric seam folds */}
      <path d="M125 240C135 270 145 290 148 335" stroke="#161820" strokeWidth="1.5" fill="none" />
      <path d="M215 240C205 270 195 290 192 335" stroke="#161820" strokeWidth="1.5" fill="none" />

      {/* ARMS & HANDS */}
      {/* Left arm */}
      <path d="M112 215L78 355L102 388L114 340L122 250Z" fill="url(#tacticalBlackTop)" stroke="#242934" strokeWidth="1.5" />
      <path d="M78 355L72 392L90 396L96 368Z" fill="#d59f84" stroke="#ad7a62" strokeWidth="1.5" />
      {/* Right arm */}
      <path d="M228 215L262 355L238 388L226 340L218 250Z" fill="url(#tacticalBlackTop)" stroke="#242934" strokeWidth="1.5" />
      <path d="M262 355L268 392L250 396L244 368Z" fill="#d59f84" stroke="#ad7a62" strokeWidth="1.5" />

      {/* Sleeve pockets */}
      <rect x="76" y="255" width="16" height="30" rx="3" fill="#181b22" stroke="#334155" strokeWidth="1.5" />
      <rect x="248" y="255" width="16" height="30" rx="3" fill="#181b22" stroke="#334155" strokeWidth="1.5" />

      {/* NECK / BALACLAVA LOWER */}
      <path d="M150 160L146 208H194L190 160H150Z" fill="#0f1116" stroke="#262b36" strokeWidth="2" />

      {/* BALACLAVA HEAD */}
      <ellipse cx="170" cy="142" rx="30" ry="36" fill="#111317" stroke="#282e3b" strokeWidth="2" />

      {/* Eye cut area */}
      <path d="M148 132C148 126 192 126 192 132C192 144 148 144 148 132Z" fill="url(#skinToneFemale)" stroke="#0e1014" strokeWidth="2" />
      
      {/* Female Eyes - Natural In-game Look */}
      {/* Left eye */}
      <ellipse cx="158" cy="132" rx="6" ry="3.5" fill="#f8fafc" />
      <circle cx="159" cy="132" r="3" fill="#3b82f6" />
      <circle cx="159" cy="132" r="1.5" fill="#0f172a" />
      <circle cx="160" cy="131" r="0.8" fill="#ffffff" />
      {/* Right eye */}
      <ellipse cx="182" cy="132" rx="6" ry="3.5" fill="#f8fafc" />
      <circle cx="181" cy="132" r="3" fill="#3b82f6" />
      <circle cx="181" cy="132" r="1.5" fill="#0f172a" />
      <circle cx="180" cy="131" r="0.8" fill="#ffffff" />
      {/* Eyebrows */}
      <path d="M151 127C155 125 162 125 166 127" stroke="#271c19" strokeWidth="2" strokeLinecap="round" />
      <path d="M174 127C178 125 185 125 189 127" stroke="#271c19" strokeWidth="2" strokeLinecap="round" />

      {/* BLACK TACTICAL BASEBALL CAP */}
      <path d="M136 120C136 82 204 82 204 120H136Z" fill="#11141a" stroke="#333b4b" strokeWidth="2" />
      {/* Visor */}
      <path d="M130 119C130 112 210 112 210 119C210 128 130 128 130 119Z" fill="#090b0e" stroke="#475569" strokeWidth="2" />
      <path d="M130 120C140 127 200 127 210 120" stroke="#64748b" strokeWidth="2.5" />

      {/* Yellow Rectangular Patch "ФСБ" on Cap */}
      <rect x="151" y="94" width="38" height="17" rx="3" fill="#080a0e" stroke="#eab308" strokeWidth="2" />
      <text x="170" y="106" fill="url(#fsbYellow)" fontSize="10.5" fontWeight="bold" fontFamily="monospace" textAnchor="middle" letterSpacing="1.5">
        ФСБ
      </text>

      {/* In-game mouse cursor as seen in user screenshot */}
      <path d="M185 365L185 385L190 380L196 392L200 390L194 378L200 378Z" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />

      {/* Top Banner Tag */}
      <rect x="16" y="16" width="138" height="28" rx="8" fill="#0c1017" fillOpacity="0.88" stroke="#e11d48" strokeWidth="1.5" />
      <circle cx="30" cy="30" r="4.5" fill="#e11d48" />
      <text x="42" y="34" fill="#fda4af" fontSize="10.5" fontWeight="bold" fontFamily="sans-serif">
        БОЕВОЙ ФСБ (Ж)
      </text>
    </svg>
  );
};

export const MaleOperativeAvatar: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => {
  return (
    <svg
      viewBox="0 0 340 680"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* In-game wall background (concrete beige/sand room) */}
        <linearGradient id="roomBgMale" x1="170" y1="0" x2="170" y2="680" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6e6255" />
          <stop offset="0.3" stopColor="#877a6d" />
          <stop offset="0.7" stopColor="#7a6e61" />
          <stop offset="1" stopColor="#4f463c" />
        </linearGradient>

        <linearGradient id="vestDark" x1="170" y1="180" x2="170" y2="350" gradientUnits="userSpaceOnUse">
          <stop stopColor="#222631" />
          <stop offset="0.5" stopColor="#141720" />
          <stop offset="1" stopColor="#0b0d12" />
        </linearGradient>

        <linearGradient id="pantsDarkMale" x1="170" y1="340" x2="170" y2="620" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1a1d24" />
          <stop offset="0.5" stopColor="#101217" />
          <stop offset="1" stopColor="#08090d" />
        </linearGradient>

        {/* Yellow Gold Embroidered FSB Badge */}
        <linearGradient id="fsbYellowMale" x1="0" y1="0" x2="1" y2="0">
          <stop stopColor="#facc15" />
          <stop offset="0.5" stopColor="#f59e0b" />
          <stop offset="1" stopColor="#eab308" />
        </linearGradient>

        <radialGradient id="shadowFloorMale" cx="170" cy="650" r="120" gradientUnits="userSpaceOnUse">
          <stop stopColor="#000000" stopOpacity="0.8" />
          <stop offset="1" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* 1. ROOM BACKGROUND (Realistic beige concrete wall with panel seam) */}
      <rect width="340" height="680" fill="url(#roomBgMale)" />
      {/* Wall seam on left */}
      <line x1="88" y1="0" x2="88" y2="680" stroke="#483f35" strokeWidth="2" opacity="0.6" />
      <line x1="90" y1="0" x2="90" y2="680" stroke="#9e9081" strokeWidth="1" opacity="0.4" />

      {/* Floor base line */}
      <rect x="0" y="580" width="340" height="100" fill="#443c33" />
      <line x1="0" y1="580" x2="340" y2="580" stroke="#2d2721" strokeWidth="3" />

      {/* Floor Shadow */}
      <ellipse cx="170" cy="650" rx="100" ry="22" fill="url(#shadowFloorMale)" />

      {/* 2. OPERATIVE MODEL (Heavy Assault Trooper Vympel) */}

      {/* BOOTS */}
      <path d="M116 600L102 645L110 655H152L148 600H116Z" fill="#0d0f14" stroke="#1f242e" strokeWidth="2" />
      <path d="M188 600L184 655H226L234 645L220 600H188Z" fill="#0d0f14" stroke="#1f242e" strokeWidth="2" />
      <path d="M98 650H154V658H96L98 650Z" fill="#050608" />
      <path d="M182 650H238L240 658H182V650Z" fill="#050608" />
      {/* Subtle red trim on boot sole as in screenshot */}
      <line x1="100" y1="656" x2="152" y2="656" stroke="#e11d48" strokeWidth="1.5" />
      <line x1="184" y1="656" x2="236" y2="656" stroke="#e11d48" strokeWidth="1.5" />

      {/* HEAVY COMBAT PANTS */}
      <path d="M112 350L98 520L110 605H150L158 520L164 370" fill="url(#pantsDarkMale)" stroke="#222631" strokeWidth="2" />
      <path d="M228 350L242 520L230 605H190L182 520L176 370" fill="url(#pantsDarkMale)" stroke="#222631" strokeWidth="2" />

      {/* Reinforced Assault Knee pads */}
      <rect x="104" y="490" width="42" height="50" rx="10" fill="#1b1e26" stroke="#475569" strokeWidth="2.5" />
      <rect x="194" y="490" width="42" height="50" rx="10" fill="#1b1e26" stroke="#475569" strokeWidth="2.5" />
      <circle cx="125" cy="515" r="3.5" fill="#64748b" />
      <circle cx="215" cy="515" r="3.5" fill="#64748b" />

      {/* Right thigh drop leg tactical holster with gun */}
      <path d="M94 405H156V428H94Z" fill="#0d0f14" stroke="#334155" strokeWidth="2" />
      <rect x="90" y="415" width="30" height="65" rx="4" fill="#08090d" stroke="#475569" strokeWidth="2.5" />
      <rect x="108" y="410" width="14" height="14" rx="2" fill="#64748b" />

      {/* BATTLE WARBELT WITH POUCHES */}
      <rect x="98" y="335" width="144" height="26" rx="4" fill="#0c0e13" stroke="#334155" strokeWidth="2.5" />
      <rect x="154" y="332" width="32" height="32" rx="4" fill="#1e2430" stroke="#64748b" strokeWidth="2" />
      {/* Side pouches */}
      <rect x="70" y="338" width="24" height="26" rx="3" fill="#141720" stroke="#334155" strokeWidth="1.5" />
      <rect x="246" y="338" width="24" height="26" rx="3" fill="#141720" stroke="#334155" strokeWidth="1.5" />

      {/* HEAVY PLATE CARRIER (Бронежилет Бр5) */}
      <path d="M106 180L90 338H250L234 180L194 165H146L106 180Z" fill="url(#vestDark)" stroke="#373e4d" strokeWidth="2.5" />

      {/* Shoulder straps */}
      <rect x="116" y="165" width="26" height="48" rx="4" fill="#1a1d26" stroke="#475569" strokeWidth="2" />
      <rect x="198" y="165" width="26" height="48" rx="4" fill="#1a1d26" stroke="#475569" strokeWidth="2" />

      {/* Yellow Rectangular Chest Patch "ФСБ" */}
      <rect x="140" y="200" width="60" height="22" rx="3" fill="#080a0e" stroke="#f59e0b" strokeWidth="2.5" />
      <text x="170" y="216" fill="url(#fsbYellowMale)" fontSize="13" fontWeight="bold" fontFamily="monospace" textAnchor="middle" letterSpacing="2">
        ФСБ
      </text>

      {/* Triple AK-12 / AK-74M Magazine Pouches */}
      <rect x="112" y="235" width="34" height="58" rx="4" fill="#0c0e14" stroke="#384152" strokeWidth="2.5" />
      <rect x="153" y="235" width="34" height="58" rx="4" fill="#0c0e14" stroke="#384152" strokeWidth="2.5" />
      <rect x="194" y="235" width="34" height="58" rx="4" fill="#0c0e14" stroke="#384152" strokeWidth="2.5" />
      {/* Magazine tops sticking out */}
      <path d="M116 224H142V235H116Z" fill="#2b313d" stroke="#475569" strokeWidth="1.5" />
      <path d="M157 224H183V235H157Z" fill="#2b313d" stroke="#475569" strokeWidth="1.5" />
      <path d="M198 224H224V235H198Z" fill="#2b313d" stroke="#475569" strokeWidth="1.5" />

      {/* ARMS & HANDS */}
      {/* Left arm */}
      <path d="M104 180L68 340L92 372L106 330L116 230Z" fill="#14171f" stroke="#252a35" strokeWidth="2" />
      <path d="M68 340L62 382L82 386L86 355Z" fill="#d59f84" stroke="#ad7a62" strokeWidth="1.5" />
      {/* Right arm */}
      <path d="M236 180L272 340L248 372L234 330L224 230Z" fill="#14171f" stroke="#252a35" strokeWidth="2" />
      <path d="M272 340L278 382L258 386L254 355Z" fill="#d59f84" stroke="#ad7a62" strokeWidth="1.5" />

      {/* Shoulder patch on sleeve (Vympel 'B') */}
      <rect x="70" y="235" width="18" height="28" rx="3" fill="#0b0e14" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="79" y="252" fill="#f59e0b" fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
        В
      </text>

      {/* Radio antenna from rear of vest */}
      <line x1="126" y1="180" x2="124" y2="120" stroke="#334155" strokeWidth="3" strokeLinecap="round" />

      {/* NECK / BALACLAVA */}
      <path d="M148 138L145 190H195L192 138H148Z" fill="#0e1015" stroke="#262b36" strokeWidth="2" />

      {/* TACTICAL ASSAULT HELMET */}
      <path d="M130 102C130 58 210 58 210 102C210 114 130 114 130 102Z" fill="#141720" stroke="#333b4b" strokeWidth="3" />

      {/* Ballistic Goggles mounted on Helmet band */}
      <rect x="132" y="90" width="76" height="22" rx="7" fill="#0a0d12" stroke="#475569" strokeWidth="2.5" />
      <ellipse cx="153" cy="101" rx="15" ry="6.5" fill="#1e293b" />
      <ellipse cx="187" cy="101" rx="15" ry="6.5" fill="#1e293b" />
      <path d="M122 98H132M208 98H218" stroke="#475569" strokeWidth="3.5" />

      {/* Eyes cut area & Operator Eyes */}
      <path d="M146 124C146 118 194 118 194 124C194 135 146 135 146 124Z" fill="#d59f84" stroke="#0e1014" strokeWidth="2" />
      <ellipse cx="157" cy="124" rx="5.5" ry="3.5" fill="#f8fafc" />
      <circle cx="158" cy="124" r="3" fill="#1e293b" />
      <ellipse cx="183" cy="124" rx="5.5" ry="3.5" fill="#f8fafc" />
      <circle cx="182" cy="124" r="3" fill="#1e293b" />
      {/* Brows */}
      <path d="M149 120L163 122" stroke="#231714" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M177 122L191 120" stroke="#231714" strokeWidth="2.5" strokeLinecap="round" />

      {/* Top Banner Tag */}
      <rect x="16" y="16" width="144" height="28" rx="8" fill="#0c1017" fillOpacity="0.88" stroke="#3b82f6" strokeWidth="1.5" />
      <circle cx="30" cy="30" r="4.5" fill="#3b82f6" />
      <text x="42" y="34" fill="#93c5fd" fontSize="10.5" fontWeight="bold" fontFamily="sans-serif">
        УПРАВЛЕНИЕ «В» (М)
      </text>
    </svg>
  );
};
