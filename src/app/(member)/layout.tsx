import type { ReactNode } from "react";
import { MemberHeader } from "@/components/layout/member-header";
import { MemberFooter } from "@/components/layout/member-footer";

export default function MemberLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <MemberHeader />
      <main className="flex-1">{children}</main>
      <MemberFooter />
    </div>
  );
}
