import Link from "next/link";

type QuickLinkCardProps = {
  title: string;
  description: string;
  href: string;
};

export function QuickLinkCard({ title, description, href }: QuickLinkCardProps) {
  return (
    <article className="editorial-card rounded-xl p-6">
      <h3 className="text-2xl font-bold text-(--primary)">{title}</h3>
      <p className="mt-3 text-sm text-slate-600">{description}</p>
      <Link className="mt-5 inline-block text-sm font-bold text-(--primary-container)" href={href}>
        Explore
      </Link>
    </article>
  );
}
