import type { CSSProperties } from "react";

type IconProps = {
  name: string;
  className?: string;
  fill?: boolean;
  size?: number;
  style?: CSSProperties;
};

/** Ícone Material Symbols com alinhamento consistente em flex/buttons */
export function Icon({ name, className = "", fill = false, size = 24, style }: IconProps) {
  return (
    <span
      className={`material-symbols-outlined inline-flex items-center justify-center shrink-0 leading-none select-none ${className}`}
      style={{
        fontSize: size,
        width: size,
        height: size,
        fontVariationSettings: fill ? "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" : "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
        ...style,
      }}
      aria-hidden
    >
      {name}
    </span>
  );
}
