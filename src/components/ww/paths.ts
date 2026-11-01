/** Routes of the worldwide (English) Ad Grants pages. */
const base = "/grants/ai-pentest/ww";

export const wwPaths = {
  pentest: base,
  pentestSuccess: `${base}/success`,
  checklist: `${base}/checklist`,
  checklistThanks: `${base}/checklist/thanks`,
  checklistDownload: `${base}/checklist/download`,
  guide: (slug: string) => `${base}/${slug}`,
};
