import g20Logo from "../../assets/g20-logo.png";

const AboutSection = () => {
  return (
    <section className="relative w-full bg-[#f5f3ee] py-16 sm:py-20 lg:py-24">
      <div
        className="mx-auto grid w-full max-w-[1250px] grid-cols-1 items-center gap-12 px-6 sm:px-10 lg:grid-cols-[0.8fr_1.6fr] lg:gap-14 lg:px-12"
      >
        <div className="flex flex-col items-center justify-center border-b border-[#d7c79e] pb-10 lg:min-h-[355px] lg:border-b-0 lg:border-r lg:pb-0 lg:pr-14">
          <img
            src={g20Logo}
            alt="G20 Summit Bharat"
            className="h-auto w-[245px] object-contain sm:w-[280px] lg:w-[300px]"
          />

{/* now build this footer section below same as into this image into my project files code.  */}

          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="mt-8 flex w-[270px] items-center justify-center gap-4 rounded-[7px] bg-[#a87918] px-6 py-4 text-center text-white shadow-[0_10px_20px_rgba(120,90,20,0.18)] transition duration-300 hover:bg-[#8d6412]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-5 w-5 shrink-0"
            >
              <path d="M12 3v12" />
              <path d="m7 10 5 5 5-5" />
              <path d="M5 21h14" />
            </svg>

            <span className="font-serif text-[16px] font-semibold italic leading-[1.1] sm:text-[17px]">
              Click here to
              <br />
              Download the Brochure
            </span>
          </a>
        </div>

        <div className="flex flex-col justify-center">
          <h2 className="m-0 font-serif text-[34px] font-semibold italic leading-tight text-[#a87918] sm:text-[40px] lg:text-[43px]">
            About G20 Summit
          </h2>

          <p className="mt-5 max-w-[820px] font-serif text-[16px] font-medium leading-[1.9] text-[#171717] sm:text-[17px] lg:text-[18px]">
            Building on the remarkable success of the 2023, 2024, and 2025
            editions, we are proud to unveil the next chapter-G20 Summit:
            BIHARAT – The Engine of Global Growth. Conceived as a flagship
            platform of influence, this exclusive two-day forum convenes an
            elite cohort of India's foremost corporate leaders, distinguished
            policymakers, and leading institutional investors. Beyond dialogue,
            the summit is designed to enable strategic partnerships, unlock
            capital flows, and shape the next phase of India's growth journey.
            At a time when global economies seek resilience and direction, the
            G20 Summit stands as a definitive platform to engage with the ideas,
            leadership, and collaborations that will power Bharat's rise on the
            world stage.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
