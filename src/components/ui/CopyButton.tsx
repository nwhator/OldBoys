"use client";

import { useState } from "react";

type Props = {
  value: string;
  ariaLabel?: string;
};

export default function CopyButton({ value, ariaLabel }: Props) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // ignore
    }
  }

  return (
    <button
      type="button"
      aria-label={ariaLabel ?? "Copy to clipboard"}
      onClick={handleCopy}
      className="ml-2 inline-flex items-center rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}
