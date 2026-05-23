export const thesiusTailwindConfig = `tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "secondary-container": "#2A2640",
        "background": "#06060A",
        "on-primary-container": "#F4F0E6",
        "surface-container-low": "#0E0E14",
        "secondary-fixed-dim": "#E8D5A3",
        "surface-tint": "#1A1A24",
        "on-secondary-fixed": "#06060A",
        "on-tertiary-fixed": "#F4F3F0",
        "on-secondary-container": "#E8E6E3",
        "primary-fixed-dim": "#9B8B5C",
        "surface-variant": "#1E1E28",
        "on-surface": "#F4F3F0",
        "inverse-primary": "#06060A",
        "error-container": "#3D1515",
        "on-background": "#F4F3F0",
        "tertiary-fixed-dim": "#6B5B95",
        "inverse-on-surface": "#F4F3F0",
        "tertiary": "#A89BC4",
        "surface-container-lowest": "#12121A",
        "on-surface-variant": "#9493A4",
        "on-primary-fixed": "#06060A",
        "surface-container-high": "#181822",
        "primary-container": "#2A2418",
        "secondary": "#E8E6E3",
        "on-error-container": "#FCA5A5",
        "surface-dim": "#0A0A10",
        "on-secondary-fixed-variant": "#C9A962",
        "on-tertiary": "#06060A",
        "surface-container-highest": "#22222E",
        "primary-fixed": "#F5EDD8",
        "on-secondary": "#06060A",
        "error": "#F87171",
        "tertiary-container": "#2A2640",
        "on-tertiary-container": "#D4C8F0",
        "outline": "#6B6A78",
        "surface": "#0E0E14",
        "on-primary-fixed-variant": "#9B8B5C",
        "on-error": "#06060A",
        "tertiary-fixed": "#E9DDFF",
        "secondary-fixed": "#F5EDD8",
        "surface-bright": "#14141C",
        "outline-variant": "#2E2E3A",
        "primary": "#C9A962",
        "on-tertiary-fixed-variant": "#6B5B95",
        "on-primary": "#06060A",
        "inverse-surface": "#F4F3F0",
        "surface-container": "#14141C"
      },
      borderRadius: {
        DEFAULT: "0.375rem",
        lg: "0.625rem",
        xl: "0.875rem",
        "2xl": "1rem",
        "3xl": "1.25rem",
        full: "9999px"
      },
      spacing: {
        unit: "4px",
        "margin-mobile": "16px",
        xl: "40px",
        "2xl": "56px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        gutter: "24px",
        "container-max": "1200px",
        xs: "4px"
      },
      fontFamily: {
        sans: ["DM Sans", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Fraunces", "ui-serif", "Georgia", "serif"],
        "headline-md": ["Fraunces", "ui-serif", "Georgia", "serif"],
        "headline-lg": ["Fraunces", "ui-serif", "Georgia", "serif"],
        "headline-lg-mobile": ["Fraunces", "ui-serif", "Georgia", "serif"],
        "display-lg": ["Fraunces", "ui-serif", "Georgia", "serif"],
        "body-md": ["DM Sans", "ui-sans-serif", "system-ui", "sans-serif"],
        "body-lg": ["DM Sans", "ui-sans-serif", "system-ui", "sans-serif"],
        "label-md": ["DM Sans", "ui-sans-serif", "system-ui", "sans-serif"],
        "label-sm": ["DM Sans", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      fontSize: {
        "headline-md": ["1.5rem", { lineHeight: "2rem", letterSpacing: "-0.015em", fontWeight: "600" }],
        "body-md": ["1rem", { lineHeight: "1.5rem", fontWeight: "400" }],
        "headline-lg-mobile": ["1.5rem", { lineHeight: "2rem", letterSpacing: "-0.015em", fontWeight: "600" }],
        "display-lg": ["clamp(2.5rem, 5.5vw, 3.5rem)", { lineHeight: "1.08", letterSpacing: "-0.035em", fontWeight: "700" }],
        "label-md": ["0.875rem", { lineHeight: "1.25rem", letterSpacing: "0.01em", fontWeight: "500" }],
        "headline-lg": ["2rem", { lineHeight: "2.5rem", letterSpacing: "-0.02em", fontWeight: "600" }],
        "label-sm": ["0.75rem", { lineHeight: "1rem", letterSpacing: "0.04em", fontWeight: "600" }],
        "body-lg": ["1.125rem", { lineHeight: "1.75rem", fontWeight: "400" }]
      },
      boxShadow: {
        "elegant": "0 4px 24px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255,255,255,0.04)",
        "elegant-lg": "0 20px 50px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255,255,255,0.06)",
        "gold": "0 4px 32px rgba(201, 169, 98, 0.2)"
      }
    }
  }
};`;

export const thesiusGlobalCss = `
  html {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }
  body {
    font-family: 'DM Sans', ui-sans-serif, system-ui, sans-serif;
    font-size: 1rem;
    line-height: 1.5;
    font-feature-settings: 'cv02', 'cv03', 'cv04', 'cv11';
    background:
      radial-gradient(circle at 8% -20%, rgba(212, 185, 110, 0.18), transparent 30%),
      radial-gradient(circle at 90% -10%, rgba(106, 138, 196, 0.12), transparent 32%),
      #06060A;
    color: #F4F3F0;
    scroll-behavior: smooth;
  }
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image:
      radial-gradient(ellipse 100% 80% at 50% -30%, rgba(201, 169, 98, 0.12), transparent 52%),
      linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px);
    background-size: 100% 100%, 42px 42px, 42px 42px;
    pointer-events: none;
    z-index: 0;
    mask-image: linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0.35));
  }
  body::after {
    content: '';
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    opacity: 0.14;
    background-image:
      radial-gradient(rgba(255,255,255,0.12) 0.6px, transparent 0.6px),
      radial-gradient(rgba(255,255,255,0.08) 0.5px, transparent 0.5px);
    background-size: 4px 4px, 7px 7px;
    background-position: 0 0, 11px 9px;
  }
  h1, h2, h3, h4, h5, h6,
  .font-display-lg, .font-headline-lg, .font-headline-md, .font-headline-lg-mobile {
    font-family: 'Fraunces', ui-serif, Georgia, serif;
    font-feature-settings: normal;
  }
  .font-label-md, .font-label-sm, .font-body-md, .font-body-lg {
    font-family: 'DM Sans', ui-sans-serif, system-ui, sans-serif;
  }
  input, textarea, button, select { font-family: inherit; }
  .app-shell-search {
    background: rgba(255, 255, 255, 0.045) !important;
    border-color: rgba(255, 255, 255, 0.1) !important;
    color: #F4F3F0 !important;
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.08), 0 8px 24px rgba(0,0,0,0.24) !important;
  }
  .app-shell-search:focus {
    background: rgba(255, 255, 255, 0.06) !important;
    border-color: rgba(201, 169, 98, 0.38) !important;
  }

  .material-symbols-outlined {
    font-family: 'Material Symbols Outlined';
    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
    vertical-align: middle;
    line-height: 1;
  }

  /* —— Superfícies —— */
  .surface-glass, .glass-panel, .surface_glass {
    background:
      linear-gradient(160deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02) 38%, rgba(255,255,255,0.01)),
      rgba(10, 11, 17, 0.75);
    backdrop-filter: blur(22px) saturate(1.35);
    border: 1px solid rgba(255, 255, 255, 0.12);
    box-shadow: 0 14px 40px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255,255,255,0.15);
  }
  .thesius-card {
    background:
      linear-gradient(150deg, rgba(26, 27, 36, 0.97), rgba(14, 14, 22, 0.98)),
      radial-gradient(circle at top right, rgba(201,169,98,0.08), transparent 42%);
    border: 1px solid rgba(255, 255, 255, 0.09);
    border-radius: 1rem;
    box-shadow: 0 10px 34px rgba(0, 0, 0, 0.42), inset 0 1px 0 rgba(255,255,255,0.09);
    transition: border-color 0.32s, box-shadow 0.32s, transform 0.32s;
    position: relative;
    overflow: hidden;
  }
  .thesius-card::before {
    content: '';
    position: absolute;
    inset: -40% 35% auto -40%;
    height: 75%;
    border-radius: 999px;
    background: radial-gradient(circle, rgba(201,169,98,0.14), transparent 68%);
    pointer-events: none;
    transform: rotate(-18deg);
  }
  .thesius-card:hover {
    border-color: rgba(201, 169, 98, 0.32);
    box-shadow: 0 20px 52px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(201, 169, 98, 0.16);
  }
  .ambient-shadow, .academic-glow { box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4); }
  .status-dot { background-color: #4ade80; box-shadow: 0 0 10px rgba(74, 222, 128, 0.45); }

  /* —— Navegação —— */
  .nav-item-active {
    background: linear-gradient(90deg, rgba(201, 169, 98, 0.12) 0%, transparent 100%);
    border: 1px solid rgba(201, 169, 98, 0.2);
    color: #C9A962 !important;
    box-shadow: inset 3px 0 0 #C9A962;
  }
  .sidebar-elegant {
    background:
      linear-gradient(180deg, rgba(15, 16, 24, 0.98) 0%, rgba(8, 8, 13, 0.98) 100%),
      radial-gradient(circle at 10% -5%, rgba(201,169,98,0.15), transparent 40%);
    border-right: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: inset -1px 0 0 rgba(255,255,255,0.04);
  }
  .logo-glow {
    box-shadow: 0 0 24px rgba(201, 169, 98, 0.35);
  }

  /* —— Tipografia de seção —— */
  .section-eyebrow {
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #C9A962;
  }
  .gradient-text {
    background: linear-gradient(135deg, #E8D5A3 0%, #C9A962 40%, #F4F3F0 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* —— Bordas e IA —— */
  .ai-gradient-border {
    position: relative;
    background: #12121A;
    background-clip: padding-box;
    border-radius: 1rem;
  }
  .ai-gradient-border::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    margin: -1px;
    border-radius: inherit;
    background: linear-gradient(135deg, rgba(201,169,98,0.6), rgba(255,255,255,0.15));
  }
  .gradient-border-ai {
    position: relative;
    border-radius: 0.875rem;
    padding: 1px;
    background: linear-gradient(135deg, #C9A962 0%, rgba(255,255,255,0.3) 100%);
  }
  .gradient-border-inner {
    background: #12121A;
    color: #C9A962;
    border-radius: calc(0.875rem - 1px);
  }

  /* —— Botões —— */
  .btn-primary {
    background: linear-gradient(135deg, #D4B96E 0%, #C9A962 50%, #A88B4A 100%);
    color: #06060A;
    font-weight: 600;
    border-radius: 0.75rem;
    box-shadow: 0 10px 24px rgba(201, 169, 98, 0.35), inset 0 1px 0 rgba(255,255,255,0.22);
    transition: transform 0.26s, box-shadow 0.26s, filter 0.26s;
  }
  .btn-primary:hover {
    transform: translateY(-2px) scale(1.01);
    box-shadow: 0 16px 32px rgba(201, 169, 98, 0.5);
    filter: brightness(1.05);
  }
  .btn-ghost {
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #F4F3F0;
    border-radius: 0.75rem;
    font-weight: 500;
    transition: background 0.24s, border-color 0.24s, transform 0.24s;
  }
  .btn-ghost:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(201, 169, 98, 0.35);
    transform: translateY(-1px);
  }

  /* —— Landing —— */
  .saas-cta-primary {
    background: linear-gradient(135deg, #D4B96E 0%, #C9A962 50%, #A88B4A 100%);
    color: #06060A;
    font-weight: 600;
    box-shadow: 0 4px 24px rgba(201, 169, 98, 0.35);
    transition: transform 0.2s, box-shadow 0.2s;
    display: inline-block;
  }
  .saas-cta-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(201, 169, 98, 0.45); }
  .saas-cta-secondary {
    background: rgba(255,255,255,0.04);
    color: #F4F3F0;
    border: 1px solid rgba(255,255,255,0.12);
    font-weight: 600;
    transition: background 0.2s, border-color 0.2s;
    display: inline-block;
  }
  .saas-cta-secondary:hover { background: rgba(201,169,98,0.08); border-color: rgba(201,169,98,0.4); }
  .saas-badge {
    background: rgba(201, 169, 98, 0.1);
    border: 1px solid rgba(201, 169, 98, 0.22);
    padding: 6px 14px;
    border-radius: 9999px;
    color: #E8D5A3;
  }
  .saas-chip {
    display: inline-block;
    padding: 4px 10px;
    border-radius: 9999px;
    font-size: 11px;
    font-weight: 600;
    background: rgba(255,255,255,0.05);
    color: #9493A4;
    border: 1px solid rgba(255,255,255,0.06);
  }
  .saas-feature-card {
    background: linear-gradient(160deg, #14141C, #12121A);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 1rem;
    padding: 1.75rem;
    transition: border-color 0.35s, box-shadow 0.35s, transform 0.35s;
  }
  .saas-feature-card:hover {
    border-color: rgba(201,169,98,0.3);
    box-shadow: 0 16px 48px rgba(0,0,0,0.4);
    transform: translateY(-7px) scale(1.012);
  }
  .saas-step {
    background: linear-gradient(160deg, #14141C, #12121A);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 1rem;
    padding: 1.5rem;
    transition: border-color 0.2s;
  }
  .saas-step:hover { border-color: rgba(201,169,98,0.35); }
  .hero-mesh {
    background-image:
      radial-gradient(ellipse 100% 65% at 18% 0%, rgba(201, 169, 98, 0.18), transparent 55%),
      radial-gradient(ellipse 82% 58% at 92% 8%, rgba(106, 138, 196, 0.14), transparent 52%);
  }
  .saas-float { animation: float 6s ease-in-out infinite; }
  @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }

  /* —— Editor —— */
  .editor-cursor::after {
    content: '';
    border-right: 2px solid #C9A962;
    animation: blink 1s infinite steps(1);
  }
  @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
  .editor-page {
    background: #FAFAF8;
    color: #1a1a1a;
    box-shadow: 0 25px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08);
  }
  .shadow-elegant-lg {
    box-shadow: 0 25px 80px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.06);
  }

  @media print {
    body::before { display: none !important; }
    body { background: #fff !important; color: #000 !important; }
    .sidebar-elegant, header, .glass-panel, aside, button { display: none !important; }
    main { margin: 0 !important; width: 100% !important; }
    .tiptap-toolbar { display: none !important; }
    .tiptap-editor-page, .editor-page {
      box-shadow: none !important;
      border-radius: 0 !important;
    }
    .tiptap-editor-content {
      padding: 0 !important;
      min-height: auto !important;
    }
  }

  .custom-scrollbar::-webkit-scrollbar { width: 5px; height: 5px; }
  .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
  .custom-scrollbar::-webkit-scrollbar-thumb { background: #2E2E3A; border-radius: 10px; }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #4a4a58; }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-thumb { background: #2E2E3A; border-radius: 10px; }
  .bento-grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: 24px; }

  .pricing-popular {
    border: 1px solid rgba(201, 169, 98, 0.45) !important;
    box-shadow: 0 0 40px rgba(201, 169, 98, 0.15), 0 20px 50px rgba(0,0,0,0.4) !important;
  }

  /* ━━ Entrance Animations ━━ */
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(28px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.92); }
    to { opacity: 1; transform: scale(1); }
  }
  @keyframes slideInRight {
    from { opacity: 0; transform: translateX(28px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  @keyframes gradientShift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  @keyframes subtleBounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-4px); }
  }
  @keyframes typing {
    from { width: 0; }
    to { width: 100%; }
  }
  @keyframes blinkCaret {
    0%, 100% { border-color: #C9A962; }
    50% { border-color: transparent; }
  }

  .animate-fade-in-up { animation: fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) both; }
  .animate-fade-in { animation: fadeIn 0.6s ease both; }
  .animate-scale-in { animation: scaleIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) both; }
  .animate-slide-in-right { animation: slideInRight 0.6s cubic-bezier(0.16, 1, 0.3, 1) both; }

  .delay-1 { animation-delay: 0.08s; }
  .delay-2 { animation-delay: 0.16s; }
  .delay-3 { animation-delay: 0.24s; }
  .delay-4 { animation-delay: 0.32s; }
  .delay-5 { animation-delay: 0.40s; }
  .delay-6 { animation-delay: 0.48s; }
  .delay-7 { animation-delay: 0.56s; }
  .delay-8 { animation-delay: 0.64s; }

  /* ━━ Scroll Reveal ━━ */
  .reveal {
    opacity: 0;
    transform: translateY(32px);
    will-change: transform, opacity;
    transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }
  .reveal-scale {
    opacity: 0;
    transform: scale(0.95);
    will-change: transform, opacity;
    transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .reveal-scale.visible {
    opacity: 1;
    transform: scale(1);
  }

  /* ━━ Antigravity Vibe Animations ━━ */
  .antigravity-card-hover {
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s;
    transform-style: preserve-3d;
    perspective: 1000px;
    will-change: transform, box-shadow;
  }
  .antigravity-card-hover:hover {
    transform: translateY(-8px) rotateX(2.5deg) rotateY(-1deg) scale(1.015);
    border-color: rgba(201, 169, 98, 0.3);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(201, 169, 98, 0.12);
  }
  .antigravity-card-inner {
    transform: translateZ(24px);
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .floating-element {
    animation: floatUpDown 7s ease-in-out infinite;
    will-change: transform;
  }
  .floating-element-delayed {
    animation: floatUpDownDelayed 8.5s ease-in-out infinite;
    will-change: transform;
  }

  @keyframes floatUpDown {
    0%, 100% { transform: translateY(0) rotate(0.5deg); }
    50% { transform: translateY(-10px) rotate(-0.5deg); }
  }
  @keyframes floatUpDownDelayed {
    0%, 100% { transform: translateY(0) rotate(-0.5deg); }
    50% { transform: translateY(-8px) rotate(0.5deg); }
  }

  /* Staggered reveals */
  .reveal-delay-1 { transition-delay: 0.06s; }
  .reveal-delay-2 { transition-delay: 0.12s; }
  .reveal-delay-3 { transition-delay: 0.18s; }
  .reveal-delay-4 { transition-delay: 0.24s; }
  .reveal-delay-5 { transition-delay: 0.30s; }
  .reveal-delay-6 { transition-delay: 0.36s; }

  @media (prefers-reduced-motion: reduce) {
    .reveal, .reveal-scale, .antigravity-card-hover, .floating-element, .floating-element-delayed, .btn-primary, .saas-feature-card, .saas-step, .thesius-card {
      animation: none !important;
      transition: none !important;
      transform: none !important;
    }
  }

  /* ━━ Enhanced Button Shine ━━ */
  .btn-primary { position: relative; overflow: hidden; }
  .btn-primary::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 60%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent);
    transition: left 0.6s ease;
    pointer-events: none;
  }
  .btn-primary:hover::after { left: 150%; }

  /* ━━ Mobile Navigation ━━ */
  .mobile-nav-overlay {
    position: fixed;
    inset: 0;
    background: rgba(6, 6, 10, 0.75);
    backdrop-filter: blur(8px);
    z-index: 100;
    animation: fadeIn 0.25s ease;
  }
  .mobile-nav-drawer {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: min(320px, 85vw);
    background: linear-gradient(180deg, #0E0E14, #0A0A10);
    border-left: 1px solid rgba(255,255,255,0.08);
    z-index: 101;
    padding: 1.5rem;
    overflow-y: auto;
  }
  @keyframes slideInFromRight {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }
  .mobile-sidebar-overlay {
    position: fixed;
    inset: 0;
    background: rgba(6, 6, 10, 0.7);
    backdrop-filter: blur(8px);
    z-index: 49;
    animation: fadeIn 0.25s ease;
  }
  .mobile-sidebar-panel {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: min(280px, 85vw);
    z-index: 50;
  }
  @keyframes slideInFromLeft {
    from { transform: translateX(-100%); }
    to { transform: translateX(0); }
  }

  /* ━━ Skeleton Loading ━━ */
  .skeleton {
    background: linear-gradient(90deg, #1E1E28 25%, #2A2A38 50%, #1E1E28 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s ease-in-out infinite;
    border-radius: 0.5rem;
  }

  /* ━━ Focus States ━━ */
  :focus-visible {
    outline: 2px solid rgba(201, 169, 98, 0.6);
    outline-offset: 2px;
  }
  input:focus-visible, textarea:focus-visible, select:focus-visible, button:focus-visible {
    outline: 2px solid rgba(201, 169, 98, 0.5);
    outline-offset: 1px;
  }

  /* ━━ Testimonials ━━ */
  .testimonial-card {
    background: linear-gradient(160deg, #14141C, #12121A);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 1rem;
    padding: 1.75rem;
    position: relative;
    transition: border-color 0.3s, transform 0.3s;
  }
  .testimonial-card:hover {
    border-color: rgba(201, 169, 98, 0.2);
    transform: translateY(-2px);
  }
  .testimonial-quote {
    position: absolute;
    top: 8px;
    left: 18px;
    font-size: 3.5rem;
    line-height: 1;
    color: rgba(201, 169, 98, 0.12);
    font-family: Georgia, serif;
    pointer-events: none;
    user-select: none;
  }

  /* ━━ Notification Badge ━━ */
  .has-notification { position: relative; }
  .has-notification::after {
    content: '';
    position: absolute;
    top: 4px;
    right: 4px;
    width: 8px;
    height: 8px;
    background: #F87171;
    border-radius: 50%;
    border: 2px solid #0E0E14;
  }

  /* ━━ Animated gradient text ━━ */
  .gradient-text-animated {
    background: linear-gradient(135deg, #E8D5A3, #C9A962, #F4F3F0, #C9A962);
    background-size: 300% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: gradientShift 4s ease-in-out infinite;
  }

  /* ━━ Page enter animation ━━ */
  .page-enter {
    animation: fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  /* ━━ Stat number animation ━━ */
  .stat-value {
    animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
    animation-delay: 0.15s;
  }

  /* ━━ Card hover lift ━━ */
  .card-hover-lift {
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s;
  }
  .card-hover-lift:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
  }

  /* ━━ Improved mobile app shell ━━ */
  @media (max-width: 1023px) {
    .sidebar-elegant.desktop-only { display: none !important; }
    .ml-sidebar { margin-left: 0 !important; }
  }

  /* ━━ Typing cursor effect ━━ */
  .typing-cursor::after {
    content: '|';
    color: #C9A962;
    animation: blinkCaret 0.8s infinite;
    font-weight: 300;
    margin-left: 2px;
  }

  /* ━━ Better toast ━━ */
  .toast-success {
    background: linear-gradient(135deg, rgba(74, 222, 128, 0.15), rgba(74, 222, 128, 0.05));
    border: 1px solid rgba(74, 222, 128, 0.3);
    border-radius: 0.75rem;
    padding: 0.75rem 1rem;
    color: #4ade80;
    animation: fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  /* â”â” Auth surfaces â”â” */
  .auth-shell {
    position: relative;
    isolation: isolate;
  }
  .auth-shell::before {
    content: '';
    position: absolute;
    inset: 8% auto auto 50%;
    width: min(640px, 92vw);
    height: 380px;
    transform: translateX(-50%);
    background: radial-gradient(circle, rgba(201,169,98,0.18), rgba(90,130,180,0.1) 45%, transparent 72%);
    filter: blur(40px);
    pointer-events: none;
    z-index: -1;
  }
  .auth-card {
    background:
      linear-gradient(165deg, rgba(22,23,33,0.97), rgba(12,12,20,0.98)),
      radial-gradient(circle at 12% -8%, rgba(201,169,98,0.2), transparent 35%);
    border: 1px solid rgba(255,255,255,0.12);
    box-shadow: 0 26px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.14);
  }
  .auth-field {
    background: linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02));
    border: 1px solid rgba(255,255,255,0.14);
    transition: border-color 0.25s, box-shadow 0.25s, background 0.25s;
  }
  .auth-field:focus {
    border-color: rgba(201,169,98,0.55);
    box-shadow: 0 0 0 3px rgba(201,169,98,0.18);
    background: linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04));
  }
`;
