/** The navy cost-of-cybercrime band — sits right under the hero. */
export function StatBand() {
  return (
    <section className="flex flex-col gap-4 bg-blue-900 px-8 py-12 md:px-14">
      <span className="font-display text-[clamp(64px,8vw,112px)] leading-[0.9] font-extrabold tracking-[-0.045em] text-white">
        $11.8T
      </span>
      <p className="max-w-[720px] font-serif text-[22px] leading-[1.5] font-bold text-blue-100 italic text-pretty">
        is what cybercrime costs the world every year, all while 4.8 million
        security jobs sit unfilled.
      </p>
    </section>
  );
}
