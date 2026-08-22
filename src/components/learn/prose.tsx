/**
 * Renders a Learn entry body. Content is authored as raw HTML in
 * content/writeups.json, so this just applies the site's prose styling to
 * it rather than parsing Markdown/MDX.
 */
export function Prose({ source }: { source: string }) {
  return (
    <div
      className="
        flex flex-col
        [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:font-display [&_h2]:text-[26px] [&_h2]:font-bold [&_h2]:tracking-[-0.02em] [&_h2]:text-blue-900
        [&_h3]:mt-8 [&_h3]:mb-2 [&_h3]:font-display [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-blue-900
        [&_p]:mb-4 [&_p]:font-body [&_p]:text-[17px] [&_p]:leading-[1.7] [&_p]:text-gray-800
        [&_a]:text-blue-600 [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-blue-800
        [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:font-body [&_li]:text-[17px] [&_li]:leading-[1.7] [&_li]:text-gray-800
        [&_strong]:font-semibold [&_strong]:text-blue-900
        [&_pre]:my-6 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-blue-900 [&_pre]:p-5 [&_pre]:text-[14px] [&_pre]:leading-relaxed
        [&_:not(pre)>code]:rounded [&_:not(pre)>code]:bg-blue-100 [&_:not(pre)>code]:px-1.5 [&_:not(pre)>code]:py-0.5 [&_:not(pre)>code]:font-mono [&_:not(pre)>code]:text-[14px] [&_:not(pre)>code]:text-blue-800
      "
      dangerouslySetInnerHTML={{ __html: source }}
    />
  );
}
