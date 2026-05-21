import logoUrl from "../screen.png";

type LogoProps = {
  className?: string;
  size?: number;
};

export function Logo({ className = "", size = 40 }: LogoProps) {
  return (
    <img
      src={logoUrl}
      alt="Thesius Logo"
      style={{ width: size, height: size }}
      className={`object-contain rounded-xl select-none pointer-events-none shrink-0 ${className}`}
    />
  );
}
