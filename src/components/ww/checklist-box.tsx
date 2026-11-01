import { ChecklistForm } from "@/components/ww/checklist-form";

/**
 * The checklist signup card used on /ww/checklist and twice on every guide
 * (after the first section and at the end).
 */
export function ChecklistBox({
  title = "Get the free 1-page security checklist",
  intro = "Ten things every small organisation should have in place, from passwords and backups to what to do when someone leaves. Free, in your inbox in a minute.",
}: {
  title?: string;
  intro?: string;
}) {
  return (
    <aside
      aria-label="Free security checklist"
      className="flex flex-col gap-5 rounded-card border border-blue-200 bg-blue-50 p-6 md:p-8"
    >
      <div className="flex flex-col gap-2">
        <span className="font-mono text-[11px] leading-none font-medium tracking-[0.16em] text-blue-600 uppercase">
          Free download
        </span>
        <h2 className="font-display text-[24px] leading-tight font-bold tracking-[-0.02em] text-blue-900 text-balance">
          {title}
        </h2>
        <p className="font-body text-[15px] leading-relaxed text-gray-700">{intro}</p>
      </div>
      <ChecklistForm />
    </aside>
  );
}
