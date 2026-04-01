import Image from "next/image";

type BrandMarkProps = {
  size?: number;
  compact?: boolean;
  subtitle?: string;
};

export function BrandMark({ size = 40, compact = false, subtitle }: BrandMarkProps) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <span
        className="logo-shell inline-flex shrink-0 items-center justify-center rounded-xl"
        style={{ width: size, height: size }}
      >
        <Image
          src="/logo.jpg"
          alt="Old Boys' Association logo"
          width={size - 8}
          height={size - 8}
          className="h-auto w-auto object-contain"
          priority={compact}
          quality={90}
        />
      </span>
      <div className="min-w-0">
        <p className="truncate text-sm font-black tracking-tight text-(--primary) md:text-base">Old Boys' Association</p>
        {subtitle ? <p className="truncate text-[10px] uppercase tracking-[0.2em] text-slate-500">{subtitle}</p> : null}
      </div>
    </div>
  );
}
