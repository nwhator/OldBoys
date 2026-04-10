"use client";

import { useEffect, useState } from "react";

type Props = {
  message: string;
  type?: "success" | "error";
  ttl?: number;
};

export default function FlashMessage({ message, type = "success", ttl = 4000 }: Props) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), ttl);
    return () => clearTimeout(t);
  }, [ttl]);

  if (!visible) return null;

  return (
    <div className={`rounded-md px-4 py-2 text-sm ${type === "success" ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-800"}`}>
      {message}
    </div>
  );
}
