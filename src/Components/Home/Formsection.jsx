import CompanySelector from "./CompanySelector";

import { useState } from "react";

import trainImage from "../../assets/train.png";
import aritLogo from "../../assets/arit-logo.png";
import g20Logo from "../../assets/g20-logo.png";



// const COMPANY_CATEGORIES = [
//   {
//     name: "Finance",
//     count: 22,
//     icon: "bank",
//     companies: [
//       "Capital Small Finance Bank Ltd.",
//       "Equitas Small Finance Bank Ltd.",
//       "Tamilnad Mercantile Bank Ltd.",
//       "The Federal Bank Ltd.",
//     ],
//   },
//   {
//     name: "Real Estate",
//     count: 12,
//     icon: "home",
//     companies: [
//       "Ashiana Housing Ltd.",
//       "Embassy Developments Ltd.",
//       "Indiabulls Ltd.",
//       "Kalpataru Ltd.",
//     ],
//   },
//   {
//     name: "IT Services, Internet & Staffing",
//     count: 10,
//     icon: "monitor",
//     companies: [
//       "Datamatics Global Services Ltd.",
//       "eMudhra Ltd.",
//       "Happiest Minds Technologies Ltd.",
//       "Ivalue Infosolutions Ltd.",
//     ],
//   },
//   {
//     name: "Chemicals (Agri & Specialty)",
//     count: 6,
//     icon: "flask",
//     companies: [
//       "DCM Shriram Ltd.",
//       "Epigral Ltd.",
//       "Fine Organic Industries Ltd.",
//       "GHCL Ltd.",
//     ],
//   },
//   {
//     name: "FMCG, Alcobev & QSR",
//     count: 6,
//     icon: "bottle",
//     companies: [
//       "Globus Spirits Ltd.",
//       "Godrej Consumer Products Ltd.",
//       "Restaurant Brands Asia Ltd.",
//       "Tilaknagar Industries Ltd.",
//     ],
//   },
// ];



const Formsection = () => {
  
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    workingAt: "",
    designation: "",
    meetingType: "",
  });

  


const [draftCompanies, setDraftCompanies] = useState([]);

// const [companySearch, setCompanySearch] = useState("");

// const [expandedCategories, setExpandedCategories] = useState([]);


  const [oneOnOneCompanies, setOneOnOneCompanies] = useState([]);
  const [groupCompanies, setGroupCompanies] = useState([]);
  const [activeCompanyDropdown, setActiveCompanyDropdown] = useState(null);
  const [selectorMeetingType, setSelectorMeetingType] = useState(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  
const API_URL = `http://${window.location.hostname}:5000`;

const [submitting, setSubmitting] = useState(false);
const [submitMessage, setSubmitMessage] = useState("");






const handleSubmit = async (e) => {
  e.preventDefault();
  setSubmitMessage("");

  if (
    !formData.name.trim() ||
    !formData.mobile.trim() ||
    !formData.email.trim()
  ) {
    setSubmitMessage("Please fill in your name, mobile number and email.");
    return;
  }

  if (!formData.meetingType) {
    setSubmitMessage("Please select a meeting type.");
    return;
  }

  const payload = {
    name: formData.name.trim(),
    mobile: formData.mobile.trim(),
    email: formData.email.trim(),
    workingAt: formData.workingAt.trim(),
    designation: formData.designation.trim(),
    oneOnOne: formData.meetingType === "one-on-one",
    groupMeeting: formData.meetingType === "group",
    oneOnOneCompanies:
      formData.meetingType === "one-on-one"
        ? oneOnOneCompanies
        : [],
    groupCompanies:
      formData.meetingType === "group"
        ? groupCompanies
        : [],
  };

  try {
    setSubmitting(true);

    const response = await fetch(`${API_URL}/api/submissions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.message || "Unable to submit your registration."
      );
    }

    setSubmitMessage("Registration submitted successfully!");

    setFormData({
      name: "",
      mobile: "",
      email: "",
      workingAt: "",
      designation: "",
      meetingType: "",
    });

    setOneOnOneCompanies([]);
    setGroupCompanies([]);
    setActiveCompanyDropdown(null);
    setDraftCompanies([]);
  } catch (error) {
    console.error("Submission error:", error);
    setSubmitMessage(
      error.message || "Submission failed. Please try again."
    );
  } finally {
    setSubmitting(false);
  }
};


  const CompanyDropdown = ({ type, selectedCompanies, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="ml-8 flex h-[51px] w-[calc(100%-32px)] items-center gap-3 rounded-[8px] border border-[#e2e2e2] bg-white px-4 text-left transition hover:border-[#a87918] focus:outline-none focus:ring-1 focus:ring-[#a87918]"
    aria-label={`Search and select companies for ${type}`}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-[18px] w-[18px] shrink-0 text-[#999]"
    >
      <path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-7h6v7M3 8h18" />
    </svg>

    <span className="flex-1 truncate text-[14px] font-medium text-[#999]">
      {selectedCompanies.length > 0
        ? `${selectedCompanies.length} companies selected`
        : "Search & select companies"}
    </span>

    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-4 w-4 shrink-0 text-[#888]"
    >
      <path d="m7 10 5 5 5-5" />
    </svg>
  </button>
);



  return (
    <section className="relative min-h-screen overflow-hidden bg-[#f7e9c9]">

      {/* =====================================================
          LEFT BACKGROUND SHAPE
      ====================================================== */}

      <div
        className="
          absolute
          inset-y-0
          left-0
          hidden
          w-[64%]
          bg-[#f7e9c9]
          lg:block
        "
      />

      {/* Angled right-side background */}
      <div
        className="
          absolute
          right-0
          top-0
          hidden
          h-full
          w-[42%]
          bg-[#ead5a5]
          lg:block
        "
        style={{
          clipPath: "polygon(14% 0, 100% 0, 100% 100%, 0 100%)",
        }}
      />

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 py-8 sm:px-8 lg:px-10">

        <div className="grid min-h-screen grid-cols-1 gap-8 lg:grid-cols-[1.6fr_0.85fr]">

          {/* =================================================
              LEFT SIDE
          ================================================== */}

          <div className="relative flex min-h-[750px] flex-col">

            {/* -----------------------------------------------
                TOP HEADING
            ------------------------------------------------ */}

            <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:gap-8">

              {/* BHARAT */}
              <h1
                className="
                  m-0
                  text-[58px]
                  font-extrabold
                  leading-none
                  tracking-tight
                  text-[#a87918]
                  sm:text-[72px]
                  md:text-[82px]
                  lg:text-[78px]
                  xl:text-[84px]
                  2xl:text-[92px]
                "
              >
                BHARAT
              </h1>

              {/* Vertical divider */}
              <div
                className="
                  hidden
                  h-[62px]
                  w-px
                  bg-[#b6a985]
                  xl:block
                "
              />

              {/* Heading text */}
              <div>
                <h2
                  className="
                    m-0
                    max-w-[470px]
                    text-[30px]
                    font-semibold
                    uppercase
                    leading-[1.05]
                    tracking-tight
                    text-[#151515]
                    sm:text-[35px]
                    md:text-[40px]
                    lg:text-[36px]
                    xl:text-[38px]
                  "
                >
                  THE NEXT ENGINE OF
                  <br />
                  GLOBAL{" "}
                  <span className="text-[#148b4b]">
                    GROWTH
                  </span>
                </h2>
              </div>
            </div>

            {/* -----------------------------------------------
                EVENT INFORMATION
            ------------------------------------------------ */}

            <div
              className="
                mt-7
                flex
                flex-col
                gap-4
                text-[#151515]
                sm:flex-row
                sm:flex-wrap
                sm:items-center
                sm:gap-0
              "
            >

              {/* Date */}
              <div className="flex items-center gap-3 sm:pr-5">

                <div
                  className="
                    flex
                    h-[38px]
                    w-[38px]
                    items-center
                    justify-center
                    border
                    border-[#d1b875]
                    bg-[#f8edcf]
                  "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="h-5 w-5 text-[#a87918]"
                  >
                    <rect
                      x="3"
                      y="4"
                      width="18"
                      height="17"
                      rx="1"
                    />
                    <path d="M16 2v4M8 2v4M3 9h18" />
                  </svg>
                </div>

                <span className="text-[15px] font-medium sm:text-[16px]">
                  21st – 22nd September 2026
                </span>
              </div>

              {/* Separator */}
              <div className="hidden h-[34px] w-px bg-[#cdbd98] sm:block" />

              {/* Location */}
              <div className="flex items-center gap-3 sm:pl-5">

                <div
                  className="
                    flex
                    h-[38px]
                    w-[38px]
                    items-center
                    justify-center
                    border
                    border-[#d1b875]
                    bg-[#f8edcf]
                  "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="h-5 w-5 text-[#a87918]"
                  >
                    <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                </div>

                <span className="text-[15px] font-medium sm:text-[16px]">
                  Taj Santacruz, Mumbai
                </span>
              </div>
            </div>

            {/* -----------------------------------------------
                TRAIN IMAGE
            ------------------------------------------------ */}

            <div
              className="
                absolute
                bottom-[-5px]
                left-[-35px]
                w-[1000px]
                max-w-[95%]
                sm:left-[-25px]
                sm:w-[900px]
                md:w-[1000px]
                lg:left-[-45px]
                lg:w-[950px]
                xl:w-[1050px]
                2xl:w-[1150px]
              "
            >
              <img
                src={trainImage}
                alt="Indian train with globe"
                className="
                  block
                  h-auto
                  w-full
                  object-contain
                "
              />
            </div>
          </div>


          
          {/* =================================================
              RIGHT SIDE
          ================================================== */}

          <div
            className="
              relative
              flex
              min-h-[750px]
              flex-col
              items-center
              pt-0
              lg:pt-1
            "
          >


            {/* -----------------------------------------------
                LOGOS
            ------------------------------------------------ */}

            <div
              className="
                mb-4
                flex
                w-full
                items-center
                justify-end
                gap-4
                pr-1
                sm:gap-5
              "
            >
              <img
                src={aritLogo}
                alt="Anand Rathi Institute of India"
                className="
                  h-auto
                  w-[135px]
                  object-contain
                  sm:w-[160px]
                "
              />

              <img
                src={g20Logo}
                alt="G20 Summit Bharat"
                className="
                  h-auto
                  w-[110px]
                  object-contain
                  sm:w-[125px]
                "
              />
            </div>

            {/* -----------------------------------------------
                FORM CARD
            ------------------------------------------------ */}

            <div
              className="
                w-full
                max-w-[435px]
                rounded-[16px]
                border-[3px]
                border-[#ed7624]
                bg-[#fffdf8]
                px-6
                py-8
                shadow-sm
                sm:px-8
                sm:py-9
              "
            >

              {/* Form title */}

              <h2
                className="
                  mb-7
                  text-center
                  text-[27px]
                  font-extrabold
                  uppercase
                  tracking-wide
                  text-[#a87918]
                  sm:text-[30px]
                "
              >
                GET YOUR INVITE
              </h2>

              <form
                onSubmit={handleSubmit}
                className="space-y-3.5"
              >

                {/* NAME */}

                <div>
                  <div
                    className="
                      flex
                      h-[51px]
                      items-center
                      gap-3
                      rounded-[8px]
                      border
                      border-[#e2e2e2]
                      bg-white
                      px-4
                      focus-within:border-[#ed7624]
                    "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      className="h-[19px] w-[19px] shrink-0 text-[#999]"
                    >
                      <circle cx="12" cy="8" r="3.5" />
                      <path d="M5 20c.8-3.4 3-5 7-5s6.2 1.6 7 5" />
                    </svg>

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="ENTER YOUR NAME"
                      className="
                        w-full
                        bg-transparent
                        text-[14px]
                        font-medium
                        tracking-wide
                        text-[#333]
                        outline-none
                        placeholder:text-[#999]
                      "
                    />
                  </div>
                </div>

                {/* MOBILE */}

                <div
                  className="
                    flex
                    h-[51px]
                    items-center
                    gap-3
                    rounded-[8px]
                    border
                    border-[#e2e2e2]
                    bg-white
                    px-4
                    focus-within:border-[#ed7624]
                  "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    className="h-[19px] w-[19px] shrink-0 text-[#999]"
                  >
                    <path d="M7 3h3l1.5 4-2 1.5c1 2.2 2.8 4 5 5l1.5-2 4 1.5v3c0 1-1 2-2 2C11.3 18 6 12.7 6 6c0-1.7.4-3 1-3Z" />
                  </svg>

                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="ENTER YOUR MOBILE NUMBER"
                    className="
                      w-full
                      bg-transparent
                      text-[14px]
                      font-medium
                      tracking-wide
                      outline-none
                      placeholder:text-[#999]
                    "
                  />
                </div>

                {/* EMAIL */}

                <div
                  className="
                    flex
                    h-[51px]
                    items-center
                    gap-3
                    rounded-[8px]
                    border
                    border-[#e2e2e2]
                    bg-white
                    px-4
                    focus-within:border-[#ed7624]
                  "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    className="h-[19px] w-[19px] shrink-0 text-[#999]"
                  >
                    <rect
                      x="3"
                      y="5"
                      width="18"
                      height="14"
                      rx="2"
                    />
                    <path d="m4 7 8 6 8-6" />
                  </svg>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="ENTER YOUR COMPANY EMAIL ID"
                    className="
                      w-full
                      bg-transparent
                      text-[14px]
                      font-medium
                      tracking-wide
                      outline-none
                      placeholder:text-[#999]
                    "
                  />
                </div>

                {/* WORKING AT */}

                <div
                  className="
                    flex
                    h-[51px]
                    items-center
                    gap-3
                    rounded-[8px]
                    border
                    border-[#e2e2e2]
                    bg-white
                    px-4
                    focus-within:border-[#ed7624]
                  "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    className="h-[19px] w-[19px] shrink-0 text-[#999]"
                  >
                    <rect
                      x="3"
                      y="7"
                      width="18"
                      height="13"
                      rx="2"
                    />
                    <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18" />
                  </svg>

                  <input
                    type="text"
                    name="workingAt"
                    value={formData.workingAt}
                    onChange={handleChange}
                    placeholder="WORKING AT"
                    className="
                      w-full
                      bg-transparent
                      text-[14px]
                      font-medium
                      tracking-wide
                      outline-none
                      placeholder:text-[#999]
                    "
                  />
                </div>

                {/* DESIGNATION */}

                <div
                  className="
                    flex
                    h-[51px]
                    items-center
                    gap-3
                    rounded-[8px]
                    border
                    border-[#e2e2e2]
                    bg-white
                    px-4
                    focus-within:border-[#ed7624]
                  "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    className="h-[19px] w-[19px] shrink-0 text-[#999]"
                  >
                    <rect
                      x="5"
                      y="3"
                      width="14"
                      height="18"
                      rx="2"
                    />
                    <circle cx="12" cy="9" r="2.5" />
                    <path d="M8.5 16c.8-2 6.2-2 7 0" />
                  </svg>

                  <input
                    type="text"
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    placeholder="DESIGNATION"
                    className="
                      w-full
                      bg-transparent
                      text-[14px]
                      font-medium
                      tracking-wide
                      outline-none
                      placeholder:text-[#999]
                    "
                  />
                </div>


                {/* MEETING TYPE */}
                
<div className="pt-1">

  <p
    className="
      mb-3
      text-[12px]
      font-bold
      uppercase
      tracking-wide
      text-[#171717]
    "
  >
    MEETING TYPE
    <span className="text-[#ed7624]"> *</span>
  </p>

  <div className="flex flex-col gap-2.5">

    {/* ONE ON ONE */}
    <label
      className="
        flex
        h-[46px]
        cursor-pointer
        items-center
        rounded-[8px]
        border
        border-[#e2e2e2]
        bg-white
        px-4
        transition
        hover:border-[#c9c9c9]
      "
    >
      <input
        type="checkbox"
        checked={formData.meetingType === "one-on-one"}

        onChange={() => {
  setFormData((prev) => ({
    ...prev,
    meetingType:
      prev.meetingType === "one-on-one" ? "" : "one-on-one",
  }));

  setActiveCompanyDropdown((current) =>
    current === "one-on-one" ? null : "one-on-one"
  );
}}

        className="
          h-4
          w-4
          cursor-pointer
          accent-[#a87918]
        "
      />

      {/* Person Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="ml-4 h-[18px] w-[18px] text-[#777]"
      >
        <circle cx="12" cy="7" r="4" />
        <path d="M5.5 21a6.5 6.5 0 0 1 13 0" />
      </svg>

      <span className="ml-4 text-[12px] font-medium tracking-[1px] text-[#555]">
        ONE - ON - ONE MEETING
      </span>
    </label>



    {activeCompanyDropdown === "one-on-one" && (
  <CompanyDropdown
    type="One-on-One Meeting"
    selectedCompanies={oneOnOneCompanies}
    onClick={() => {
      setDraftCompanies(oneOnOneCompanies);
      setSelectorMeetingType("one-on-one");
    }}
  />
)}



    {/* GROUP MEETING */}
    <label
      className="
        flex
        h-[46px]
        cursor-pointer
        items-center
        rounded-[8px]
        border
        border-[#e2e2e2]
        bg-white
        px-4
        transition
        hover:border-[#c9c9c9]
      "
    >
      <input
        type="checkbox"
        checked={formData.meetingType === "group"}


        onChange={() => {
  setFormData((prev) => ({
    ...prev,
    meetingType:
      prev.meetingType === "group" ? "" : "group",
  }));

  setActiveCompanyDropdown((current) =>
    current === "group" ? null : "group"
  );
}}

        className="
          h-4
          w-4
          cursor-pointer
          accent-[#a87918]
        "
      />

      {/* Group Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="ml-4 h-[18px] w-[18px] text-[#777]"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>

      <span className="ml-4 text-[12px] font-medium tracking-[1px] text-[#555]">
        GROUP MEETING
      </span>
    </label>




    {activeCompanyDropdown === "group" && (
  <CompanyDropdown
    type="Group Meeting"
    selectedCompanies={groupCompanies}
    onClick={() => {
      setDraftCompanies(groupCompanies);
      setSelectorMeetingType("group");
    }}
  />
)}





  </div>
</div>


                {/* SUBMIT */}

                <button
                  type="submit"
                  disabled={submitting}
                  className="
                    mt-4
                    w-full
                    rounded-[6px]
                    bg-[#a87918]
                    py-3
                    text-[14px]
                    font-bold
                    uppercase
                    tracking-wide
                    text-white
                    transition
                    duration-300
                    hover:bg-[#8d6412]
                    disabled:cursor-not-allowed 
                    disabled:opacity-60
                  "
                >
                  {submitting ? "SUBMITTING..." : "SUBMIT"}
                  
                  {/* SUBMIT */}

                </button>

              </form>

              {submitMessage && (
  <p
    role="status"
    className="mt-3 text-center text-[13px] text-[#555]"
  >
    {submitMessage}
  </p>
)}

            </div>
          </div>
        </div>
      </div>

      {selectorMeetingType && (
  <CompanySelector
    key={selectorMeetingType}
    meetingType={selectorMeetingType}
    selectedCompanies={draftCompanies}
    onClose={() => setSelectorMeetingType(null)}
    onDone={(companies) => {
      if (selectorMeetingType === "one-on-one") {
        setOneOnOneCompanies(companies);
      } else {
        setGroupCompanies(companies);
      }

      setSelectorMeetingType(null);
    }}
  />
)}


</section>
  );
};

export default Formsection;
