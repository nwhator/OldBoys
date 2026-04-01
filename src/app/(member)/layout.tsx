import type { ReactNode } from "react";
import { MemberHeader } from "@/components/layout/member-header";
import { MemberFooter } from "@/components/layout/member-footer";

export default function MemberLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <MemberHeader />
      {children}
      <MemberFooter />
    </>
  );
}
