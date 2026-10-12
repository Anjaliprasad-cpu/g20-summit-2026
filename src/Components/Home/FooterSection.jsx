const FooterSection = () => {
  return (
    <footer className="w-full bg-[#a87918] px-6 py-6 sm:px-10 lg:px-[7.5%]">
      <div
        className="
          mx-auto flex w-full max-w-[1440px]
          flex-col items-center justify-between gap-4
          sm:flex-row sm:gap-6
        "
      >
        <p
          className="
            m-0 text-center text-[11px] font-bold uppercase
            tracking-[1.8px] text-white sm:text-left sm:text-[12px]
          "
        >
          G200 SUMMIT 2026 · ANAND RATHI INSTITUTIONAL EQUITIES
        </p>

        <p
          className="
            m-0 text-center text-[10px] font-medium text-white
            sm:text-right sm:text-[11px]
          "
        >
          Taj Santacruz, Mumbai · 21–22 September 2026 · By invitation only
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;
