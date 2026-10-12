
/*
  Add your two highlight/video thumbnail images to:
  src/assets/

  Then update these two paths:
    /assets/Video-Image-1.png
    /assets/Video-Image-2.png
*/

import highlights2023 from "../../assets/Video-Image-1.png";
import highlights2024 from "../../assets/Video-Image-2.png";
import { useState } from "react";


const highlights = [
  {
    year: "2023",
    image: highlights2023,
    video: "https://www.youtube.com/embed/QS9CWWznPLo",
  },
  {
    year: "2024",
    image: highlights2024,
    video: "https://www.youtube.com/embed/ltk4YaOVIhw",
  },
];

const HighlightsSection = () => {
  const [playingYear, setPlayingYear] = useState(null);
  return (
    <section className="relative w-full overflow-hidden bg-[#f7ead0] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-10 lg:px-12">

        {/* TOP DECORATION */}
        <div className="mb-6 flex items-center justify-center gap-3">
          <span className="h-px w-[70px] bg-[#d8b35d] sm:w-[95px]" />

          <span className="text-[12px] text-[#d8b35d]">◆</span>

          <span
            className="
              flex
              h-[18px]
              w-[18px]
              rotate-45
              items-center
              justify-center
              border
              border-[#d8b35d]
            "
          >
            <span className="-rotate-45 text-[9px] text-[#d8b35d]">
              ◆
            </span>
          </span>

          <span className="text-[12px] text-[#d8b35d]">◆</span>

          <span className="h-px w-[70px] bg-[#d8b35d] sm:w-[95px]" />
        </div>

        {/* TITLE */}
        <h2
          className="
            text-center
            font-serif
            text-[36px]
            font-semibold
            uppercase
            leading-tight
            tracking-[1px]
            text-[#704d0b]
            sm:text-[44px]
            lg:text-[48px]
          "
        >
          Highlights of G200 Summit
        </h2>

        {/* SUBTITLE */}
        <p
          className="
            mt-5
            text-center
            text-[15px]
            font-normal
            text-[#777]
            sm:text-[16px]
          "
        >
          Moments that inspired ideas. Conversations that drove change.
        </p>

        {/* HIGHLIGHT CARDS */}
        <div
          className="
            mt-12
            grid
            grid-cols-1
            gap-6
            lg:grid-cols-2
            lg:gap-8
          "
        >
          {highlights.map((item) => (
            <div
              key={item.year}
              className="
                group
                relative
                aspect-[1.78/1]
                overflow-hidden
                rounded-[15px]
                border-[2px]
                border-[#a87918]
                bg-[#ddd]
                shadow-sm
              "
            >
              {/* VIDEO / IMAGE */}
              {playingYear === item.year ? (
                <iframe
                  src={`${item.video}?autoplay=1&rel=0`}
                  title={`G200 Summit ${item.year} Highlights`}
                  className="absolute inset-0 h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
              <img
                src={item.image}
                alt={`G20 Summit ${item.year} highlights`}
                className="
                  absolute
                  inset-0
                  h-full
                  w-full
                  object-cover
                  transition
                  duration-500
                  group-hover:scale-[1.02]
                "
              />
            )}

              {/* DARK BOTTOM GRADIENT */}
              <div
                className="
                pointer-events-none
                  absolute
                  inset-x-0
                  bottom-0
                  h-[38%]
                  bg-gradient-to-t
                  from-black/75
                  via-black/20
                  to-transparent
                "
              />

              {/* PLAY BUTTON */}
              {playingYear !== item.year && (
              <button
                type="button"
                aria-label={`Play ${item.year} highlights`}
                onClick={() => setPlayingYear(item.year)}
                className="
                  absolute
                  left-1/2
                  top-1/2
                  flex
                  h-[74px]
                  w-[74px]
                  -translate-x-1/2
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-full
                  border-2
                  border-white
                  bg-black/10
                  backdrop-blur-[2px]
                  transition
                  duration-300
                  group-hover:scale-105
                "
              >
                <span
                  className="
                    ml-1
                    h-0
                    w-0
                    border-y-[10px]
                    border-l-[15px]
                    border-y-transparent
                    border-l-white
                  "
                />
              </button>
              )}


              {/* YEAR */}
              <div
                className="
                pointer-events-none
                  absolute
                  bottom-5
                  left-6
                  z-10
                  flex
                  items-center
                  gap-3
                  text-[#e0b94e]
                  sm:bottom-6
                  sm:left-7
                "
              >

                {/* CALENDAR ICON */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  className="h-[19px] w-[19px]"
                >
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M16 2v4M8 2v4M3 9h18" />
                </svg>

                <span
                  className="
                    font-serif
                    text-[22px]
                    font-semibold
                    leading-none
                    sm:text-[24px]
                  "
                >
                  {item.year}
                </span>
              </div>

              {/* DECORATIVE CORNER */}
              <div
                className="
                  pointer-events-none
                  absolute
                  right-[-30px]
                  top-[-30px]
                  z-10
                  h-[115px]
                  w-[115px]
                  rotate-[25deg]
                  border-b-[10px]
                  border-l-[10px]
                  border-[#e7d2a2]/80
                "
              />
            </div>
          ))}
        </div>

        {/* SLIDER INDICATORS */}
        <div className="mt-8 flex items-center justify-center gap-7">
          <span className="h-[11px] w-[11px] rounded-full bg-[#a87918]" />
          <span className="h-[11px] w-[11px] rounded-full border border-[#caa44d] bg-transparent" />
        </div>

      </div>
    </section>
  );
};

export default HighlightsSection;
