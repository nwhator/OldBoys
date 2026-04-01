import { BrandMark } from "@/components/layout/brand-mark";

export function MemberFooter() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white px-4 py-8 md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
        <div className="max-w-full">
          <BrandMark size={34} compact subtitle="Holy Ghost College Owerri" />
        </div>
        <p>Member access for approved alumni.</p>
      </div>
    </footer>
  );
}
