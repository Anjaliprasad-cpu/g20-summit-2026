
import { useEffect, useState } from "react";

const API_URL = `http://${window.location.hostname}:5000`;

export default function SpeakersSection() {
  const [speakers, setSpeakers] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const fetchSpeakers = async () => {
      try {
        const response = await fetch(`${API_URL}/api/speakers`);

        if (!response.ok) {
          throw new Error("Failed to fetch speakers");
        }

        const data = await response.json();

        if (isMounted) {
          setSpeakers(data);
        }
      } catch (error) {
        console.error("Error fetching speakers:", error);
      }
    };

    fetchSpeakers();

    // Refresh the list to show newly added speakers automatically.
    const intervalId = setInterval(fetchSpeakers, 5000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#f8efdd] px-5 pb-12 pt-10 sm:px-8 sm:pb-16 sm:pt-14 lg:px-12">
      {/* Decorative top ornaments */}
      <div className="mb-4 flex items-center justify-center gap-2 text-[#c6a04a]">
        <span className="text-[8px]">◆</span>
        <span className="text-[15px]">◇</span>
        <span className="text-[8px]">◆</span>
      </div>

      {/* Section heading */}
      <div className="relative z-10 text-center">
        <h2 className="font-serif text-[27px] font-bold leading-tight text-[#70501e] sm:text-[36px] md:text-[42px] lg:text-[40px]">
          SPEAKERS AT THE EVENT
        </h2>

        <p className="mt-4 text-[12px] text-[#827c70] sm:text-[13px] sm:text-[14px]">
          Industry leaders. Global perspectives. Meaningful conversations.
        </p>
      </div>

      {/* Speaker cards */}
      <div className="relative z-10 mx-auto mt-10 grid w-full max-w-[1000px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {speakers.map((speaker) => (
          <article
            key={speaker.id}
            className="flex min-h-[268px] flex-col items-center rounded-[13px] border border-[#b49743] bg-[#1e3023] px-4 pb-5 pt-5 text-center shadow-[0_8px_18px_rgba(39,43,30,0.15)] transition-transform duration-300 hover:-translate-y-1"
          >
            {/* Speaker portrait */}
            <div className="h-[140px] w-[140px] shrink-0 overflow-hidden rounded-full border-[2px] border-[#a98a36] bg-[#29392d] sm:h-[140px] sm:w-[140px]">
              {speaker.image ? (
                <img
                  src={speaker.image}
                  alt={speaker.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-3xl font-semibold text-[#d2b45c]">
                  {speaker.name?.charAt(0)?.toUpperCase() || "S"}
                </div>
              )}
            </div>

            {/* Speaker name */}
            <h3 className="mt-4 w-full break-words font-serif text-[14px] font-bold uppercase leading-5 tracking-[0.5px] text-[#d8b04b]">
              {speaker.name}
            </h3>

            {/* Speaker role */}
            {speaker.role && (
              <p className="mt-2 text-[11px] leading-[17px] text-[#c9c9bd]">
                {speaker.role}
              </p>
            )}

            {/* Speaker company */}
            {speaker.company && (
              <p className="mt-1 break-words text-[11px] font-semibold leading-[17px] text-white">
                {speaker.company}
              </p>
            )}
          </article>
        ))}

        {speakers.length === 0 && (
          <div className="col-span-full py-10 text-center text-[13px] text-[#827c70]">
            Speakers will be announced soon.
          </div>
        )}
      </div>

      {/* Decorative cityscape */}
      <div
        aria-hidden="true"
        className="pointer-events-none relative mx-auto mt-8 flex h-[65px] max-w-[550px] items-end justify-center overflow-hidden opacity-25"
      >
        <svg
          viewBox="0 0 550 75"
          className="h-full w-full"
          fill="none"
          stroke="#b59a64"
          strokeWidth="1"
        >
          <path d="M0 70H550" />

          {/* Buildings */}
          <path d="M18 70V42H35V70M22 42V32H31V42M25 32V24H28V32" />
          <path d="M42 70V48H59V70M46 48V38H55V48" />
          <path d="M65 70V30H82V70M69 30V20H78V30M73 20V12H75V20" />
          <path d="M88 70V43H108V70M93 43V35H103V43" />
          <path d="M116 70V24H133V70M120 24V16H129V24M124 16V8H126V16" />

          {/* Monument */}
          <path d="M152 70V46H190V70M148 46H194L171 28L148 46ZM157 46V70M166 46V70M176 46V70M185 46V70" />

          {/* Domed building */}
          <path d="M213 70V44H252V70M209 44H256L232 28L209 44ZM223 28V21Q232 9 241 21V28M232 9V4" />

          {/* Additional skyline */}
          <path d="M274 70V39H291V70M278 39V31H287V39M300 70V25H316V70M304 25V16H312V25" />
          <path d="M325 70V45H345V70M330 45V35H340V45" />
          <path d="M354 70V32H372V70M358 32V23H368V32" />

          {/* Arch */}
          <path d="M390 70V48Q414 14 438 48V70M398 70V50Q414 30 430 50V70M386 70H442" />

          {/* Far-right buildings */}
          <path d="M454 70V42H474V70M458 42V32H470V42M480 70V26H498V70M484 26V17H494V26M504 70V47H524V70M529 70V38H543V70" />
        </svg>
      </div>

      {/* Decorative pagination dots */}
      <div className="relative z-10 mt-1 flex items-center justify-center gap-3">
        <span className="h-[8px] w-[8px] rounded-full bg-[#aa852b]" />
        <span className="h-[8px] w-[8px] rounded-full border border-[#c8ab66]" />
        <span className="h-[8px] w-[8px] rounded-full border border-[#c8ab66]" />
        <span className="h-[8px] w-[8px] rounded-full border border-[#c8ab66]" />
      </div>
    </section>
  );
}
