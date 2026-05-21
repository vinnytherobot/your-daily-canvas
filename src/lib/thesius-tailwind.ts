export const thesiusTailwindConfig = `tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "secondary-container": "#2170e4",
        "background": "#f8f9fa",
        "on-primary-container": "#7d8497",
        "surface-container-low": "#f3f4f5",
        "secondary-fixed-dim": "#adc6ff",
        "surface-tint": "#575e70",
        "on-secondary-fixed": "#001a42",
        "on-tertiary-fixed": "#23005c",
        "on-secondary-container": "#fefcff",
        "primary-fixed-dim": "#c0c6db",
        "surface-variant": "#e1e3e4",
        "on-surface": "#191c1d",
        "inverse-primary": "#c0c6db",
        "error-container": "#ffdad6",
        "on-background": "#191c1d",
        "tertiary-fixed-dim": "#d0bcff",
        "inverse-on-surface": "#f0f1f2",
        "tertiary": "#000000",
        "surface-container-lowest": "#ffffff",
        "on-surface-variant": "#45464c",
        "on-primary-fixed": "#141b2b",
        "surface-container-high": "#e7e8e9",
        "primary-container": "#141b2b",
        "on-tertiary-container": "#9466ff",
        "secondary": "#0058be",
        "on-error-container": "#93000a",
        "surface-dim": "#d9dadb",
        "on-secondary-fixed-variant": "#004395",
        "on-tertiary": "#ffffff",
        "surface-container-highest": "#e1e3e4",
        "primary-fixed": "#dce2f7",
        "on-secondary": "#ffffff",
        "error": "#ba1a1a",
        "tertiary-container": "#23005c",
        "outline": "#76777d",
        "surface": "#f8f9fa",
        "on-primary-fixed-variant": "#404758",
        "on-error": "#ffffff",
        "tertiary-fixed": "#e9ddff",
        "secondary-fixed": "#d8e2ff",
        "surface-bright": "#f8f9fa",
        "outline-variant": "#c6c6cd",
        "primary": "#000000",
        "on-tertiary-fixed-variant": "#5516be",
        "on-primary": "#ffffff",
        "inverse-surface": "#2e3132",
        "surface-container": "#edeeef"
      },
      borderRadius: { DEFAULT: "0.25rem", lg: "0.5rem", xl: "0.75rem", full: "9999px" },
      spacing: { unit: "4px", "margin-mobile": "16px", xl: "40px", sm: "8px", md: "16px", lg: "24px", gutter: "24px", "container-max": "1200px", xs: "4px" },
      fontFamily: {
        "headline-md": ["Manrope"], "body-md": ["Inter"], "headline-lg-mobile": ["Manrope"],
        "display-lg": ["Manrope"], "label-md": ["Inter"], "headline-lg": ["Manrope"],
        "label-sm": ["Inter"], "body-lg": ["Inter"]
      },
      fontSize: {
        "headline-md": ["24px", { lineHeight: "32px", fontWeight: "600" }],
        "body-md": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "headline-lg-mobile": ["24px", { lineHeight: "32px", fontWeight: "600" }],
        "display-lg": ["48px", { lineHeight: "56px", letterSpacing: "-0.02em", fontWeight: "700" }],
        "label-md": ["14px", { lineHeight: "20px", letterSpacing: "0.01em", fontWeight: "500" }],
        "headline-lg": ["32px", { lineHeight: "40px", letterSpacing: "-0.01em", fontWeight: "600" }],
        "label-sm": ["12px", { lineHeight: "16px", fontWeight: "600" }],
        "body-lg": ["18px", { lineHeight: "28px", fontWeight: "400" }]
      }
    }
  }
};`;

export const thesiusGlobalCss = `
  body { font-family: 'Inter', sans-serif; background-color: #f8f9fa; color: #191c1d; scroll-behavior: smooth; }
  .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; vertical-align: middle; }
  .surface-glass, .glass-panel, .surface_glass { background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.2); }
  .ambient-shadow, .academic-glow { box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04); }
  .ai-gradient-border { position: relative; background: #fff; background-clip: padding-box; border: 1px solid transparent; }
  .ai-gradient-border::before { content: ''; position: absolute; inset: 0; z-index: -1; margin: -1px; border-radius: inherit; background: linear-gradient(to right, #0058be, #9466ff); }
  .gradient-border-ai { position: relative; border-radius: 0.75rem; padding: 1px; background: linear-gradient(135deg, #0058be 0%, #9466ff 100%); }
  .gradient-border-inner { background: #ffffff; border-radius: calc(0.75rem - 1px); }
  .custom-scrollbar::-webkit-scrollbar { width: 4px; }
  .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
  .custom-scrollbar::-webkit-scrollbar-thumb { background: #e1e3e4; border-radius: 10px; }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #e1e3e4; border-radius: 10px; }
  .editor-cursor::after { content: ''; border-right: 2px solid #0058be; animation: blink 1s infinite steps(1); }
  @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
  .bento-grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: 24px; }
`;
