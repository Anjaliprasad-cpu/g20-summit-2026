
import { useEffect, useMemo, useState } from "react";
import { PlusIcon } from "./AdminIcons";

const API_URL = `http://${window.location.hostname}:5000`;

const SECTORS = [
  "Finance",
  "Real Estate",
  "IT Services, Internet & Staffing",
  "Chemicals (Agri & Specialty)",
  "FMCG, Alcobev & QSR",
];

const EMPTY_FORM = {
  name: "",
  sector: "",
  subSector: "",
  tentative: false,
  full: false,
};

const Companies = () => {
  const [sectorSearch, setSectorSearch] = useState("");

  const [activeTab, setActiveTab] = useState("Companies");
  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState("");
  const [sector, setSector] = useState("All Sectors");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load saved companies from the backend.
  const fetchCompanies = async () => {
    try {
      const response = await fetch(`${API_URL}/api/companies`);

      if (!response.ok) {
        throw new Error("Could not load companies.");
      }

      const data = await response.json();
      setCompanies(data);
      setError("");
    } catch (err) {
      console.error("Error fetching companies:", err);
      setError(
        "Unable to load companies. Please check that the Python backend is running and the companies API is configured."
      );
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const filtered = useMemo(() => {
    return companies.filter((item) => {
      const matchesSearch = [
        item.name,
        item.sector,
        item.subSector,
      ].some((value) =>
        String(value || "")
          .toLowerCase()
          .includes(search.toLowerCase())
      );

      const matchesSector =
        sector === "All Sectors" || item.sector === sector;

      return matchesSearch && matchesSector;
    });
  }, [companies, search, sector]);

  const updateField = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const closeModal = () => {
    setOpen(false);
    setForm(EMPTY_FORM);
    setError("");
  };

  const addCompany = async (event) => {
    event.preventDefault();

    if (!form.name.trim() || !form.sector || !form.subSector.trim()) {
      setError("Please enter the company name, sector, and sub-sector.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/api/companies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          sector: form.sector,
          subSector: form.subSector.trim(),
          tentative: form.tentative,
          full: form.full,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to add company.");
      }

      await fetchCompanies();
      setForm(EMPTY_FORM);
      setOpen(false);
    } catch (err) {
      console.error("Error adding company:", err);
      setError(
        err.message ||
          "Unable to add company. Check the Python backend."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-6 py-7 sm:px-8">
      <h1 className="text-[22px] font-bold">Companies</h1>

      {/* Tabs */}
      <div className="mt-7 border-b border-[#dedee2]">
        <div className="flex gap-7">
          {["Companies", "Sectors"].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`relative px-6 pb-4 text-[14px] ${
                activeTab === tab
                  ? "font-medium text-black"
                  : "text-[#9898a2]"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-black" />
              )}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "Companies" ? (
        <>
          {/* Search, filter and Add Company */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <p className="text-[13px] text-[#6e6e78]">
              {filtered.length} of {companies.length} companies
            </p>

            <div className="flex flex-wrap gap-3">
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search..."
                className="h-[40px] w-[210px] rounded-[8px] border border-[#dedee2] bg-white px-4 text-[13px] outline-none focus:border-[#777]"
              />

              <select
                value={sector}
                onChange={(event) => setSector(event.target.value)}
                className="h-[40px] rounded-[8px] bg-white px-4 text-[13px] outline-none"
              >
                <option>All Sectors</option>
                {SECTORS.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={() => {
                  setForm(EMPTY_FORM);
                  setError("");
                  setOpen(true);
                }}
                className="flex h-[40px] items-center gap-2 rounded-[8px] bg-[#18181b] px-6 text-[13px] font-bold text-white hover:bg-black"
              >
                <PlusIcon />
                Add Company
              </button>
            </div>
          </div>

          {/* Companies table */}
          <div className="mt-6 overflow-x-auto rounded-[12px] bg-white">
            <div className="min-w-[760px]">
              <div className="grid grid-cols-5 rounded-t-[12px] bg-[#29292c] px-7 py-4 text-[12px] font-bold text-white">
                <span>COMPANY</span>
                <span>SECTOR</span>
                <span>SUB-SECTOR</span>
                <span>TENTATIVE</span>
                <span>FULL</span>
              </div>

              {filtered.length === 0 ? (
                <div className="flex h-[148px] items-center justify-center text-[13px] text-[#9999a3]">
                  {error
                    ? "Unable to load companies"
                    : "No companies found"}
                </div>
              ) : (
                filtered.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-5 items-center border-b border-[#eeeeef] px-7 py-5 text-[13px] last:border-b-0"
                  >
                    <span className="break-words pr-3">{item.name}</span>
                    <span className="break-words pr-3">{item.sector}</span>
                    <span className="break-words pr-3">
                      {item.subSector}
                    </span>
                    <span>{item.tentative ? "Yes" : "—"}</span>
                    <span>{item.full ? "Yes" : "—"}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </>

      
) : (
  <div className="mt-6 overflow-hidden rounded-[12px] bg-white">
    {/* Search sector */}
    <div className="border-b border-[#eeeeef] p-5">
      <input
        type="text"
        value={sectorSearch}
        onChange={(e) => setSectorSearch(e.target.value)}
        placeholder="Search sector..."
        className="h-[40px] w-full max-w-[320px] rounded-[8px] border border-[#dedee2] bg-white px-4 text-[13px] outline-none focus:border-black"
      />
    </div>

    {/* Matching sectors */}
    <div className="divide-y divide-[#eeeeef]">
      {SECTORS.filter((item) =>
        item.toLowerCase().includes(sectorSearch.toLowerCase().trim())
      ).map((item) => (
        <div
          key={item}
          className="px-6 py-4 text-[13px] text-[#333] hover:bg-[#f8f8f8]"
        >
          {item}
        </div>
      ))}

      {SECTORS.filter((item) =>
        item.toLowerCase().includes(sectorSearch.toLowerCase().trim())
      ).length === 0 && (
        <div className="flex h-[100px] items-center justify-center text-[13px] text-[#9999a3]">
          No sectors found
        </div>
      )}
    </div>
  </div>
)}


      {/* Add Company modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 px-4 py-5 sm:px-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeModal();
          }}
        >
          <form
            onSubmit={addCompany}
            className="my-auto w-full max-w-[900px] overflow-hidden rounded-[14px] bg-[#fffdf7] shadow-2xl"
          >
            {/* Modal header */}
            <div className="flex items-center justify-between border-b border-[#e8e4d9] px-6 py-5 sm:px-10 sm:py-7">
              <h2 className="text-[24px] font-bold text-[#292929] sm:text-[30px]">
                Add Company
              </h2>

              <button
                type="button"
                onClick={closeModal}
                aria-label="Close"
                className="text-[27px] leading-none text-[#555] hover:text-black"
              >
                ×
              </button>
            </div>

            {/* Form fields */}
            <div className="space-y-7 px-6 py-7 sm:px-10 sm:py-9">
              <div>
                <label
                  htmlFor="company-name"
                  className="block text-[17px] font-semibold text-[#292929] sm:text-[20px]"
                >
                  Company Name
                </label>

                <input
                  id="company-name"
                  autoFocus
                  value={form.name}
                  onChange={(event) =>
                    updateField("name", event.target.value)
                  }
                  placeholder="Enter company name"
                  className="mt-4 h-[58px] w-full rounded-[7px] border border-[#e0ded7] bg-transparent px-5 text-[15px] outline-none focus:border-[#617f9b]"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="company-sector"
                  className="block text-[17px] font-semibold text-[#292929] sm:text-[20px]"
                >
                  Sector
                </label>

                <select
                  id="company-sector"
                  value={form.sector}
                  onChange={(event) =>
                    updateField("sector", event.target.value)
                  }
                  className="mt-4 h-[58px] w-full rounded-[7px] border border-[#e0ded7] bg-transparent px-5 text-[15px] outline-none focus:border-[#617f9b]"
                  required
                >
                  <option value="">Select sector</option>
                  {SECTORS.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="company-sub-sector"
                  className="block text-[17px] font-semibold text-[#292929] sm:text-[20px]"
                >
                  Sub-Sector
                </label>

                <input
                  id="company-sub-sector"
                  value={form.subSector}
                  onChange={(event) =>
                    updateField("subSector", event.target.value)
                  }
                  placeholder="Enter sub-sector"
                  className="mt-4 h-[58px] w-full rounded-[7px] border border-[#e0ded7] bg-transparent px-5 text-[15px] outline-none focus:border-[#617f9b]"
                  required
                />
              </div>

              {/* Booking status */}
              <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
                <label className="flex cursor-pointer items-center gap-3 text-[15px] font-medium text-[#292929] sm:text-[17px]">
                  <input
                    type="checkbox"
                    checked={form.tentative}
                    onChange={(event) =>
                      updateField("tentative", event.target.checked)
                    }
                    className="h-5 w-5 accent-[#536f89]"
                  />
                  Tentative
                </label>

                <label className="flex cursor-pointer items-center gap-3 text-[15px] font-medium text-[#292929] sm:text-[17px]">
                  <input
                    type="checkbox"
                    checked={form.full}
                    onChange={(event) =>
                      updateField("full", event.target.checked)
                    }
                    className="h-5 w-5 accent-[#536f89]"
                  />
                  Fully Booked
                </label>
              </div>

              {error && (
                <p className="text-[13px] text-red-600">{error}</p>
              )}
            </div>

            {/* Modal actions */}
            <div className="flex items-center justify-end gap-5 border-t border-[#e8e4d9] px-6 py-5 sm:px-10 sm:py-6">
              <button
                type="button"
                onClick={closeModal}
                className="rounded-[7px] px-4 py-3 text-[14px] text-[#444] hover:bg-[#f0eee8]"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="rounded-[7px] bg-[#536f89] px-7 py-3 text-[14px] font-semibold text-white hover:bg-[#405a72] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Adding..." : "Add"}
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
};

export default Companies;




// import { useMemo, useState } from "react";
// import { PlusIcon,  } from "./AdminIcons";

// // SearchIcon 

// const Companies = () => {
//   const [activeTab, setActiveTab] = useState("Companies");
//   const [companies, setCompanies] = useState([]);
//   const [search, setSearch] = useState("");
//   const [sector, setSector] = useState("All Sectors");
//   const [open, setOpen] = useState(false);
//   const [companyName, setCompanyName] = useState("");

//   const filtered = useMemo(
//     () =>
//       companies.filter((item) =>
//         item.name.toLowerCase().includes(search.toLowerCase())
//       ),
//     [companies, search]
//   );

//   const addCompany = (e) => {
//     e.preventDefault();
//     if (!companyName.trim()) return;
//     setCompanies((prev) => [
//       ...prev,
//       { id: Date.now(), name: companyName.trim(), sector: "—", subSector: "—", tentative: "—", full: "—" },
//     ]);
//     setCompanyName("");
//     setOpen(false);
//   };

//   return (
//     <section className="px-6 py-7 sm:px-8">
//       <h1 className="text-[22px] font-bold">Companies</h1>

//       <div className="mt-7 border-b border-[#dedee2]">
//         <div className="flex gap-7">
//           {["Companies", "Sectors"].map((tab) => (
//             <button
//               key={tab}
//               type="button"
//               onClick={() => setActiveTab(tab)}
//               className={`relative px-6 pb-4 text-[14px] ${
//                 activeTab === tab ? "font-medium text-black" : "text-[#9898a2]"
//               }`}
//             >
//               {tab}
//               {activeTab === tab && (
//                 <span className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-black" />
//               )}
//             </button>
//           ))}
//         </div>
//       </div>

//       {activeTab === "Companies" ? (
//         <>
//           <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
//             <p className="text-[13px] text-[#6e6e78]">
//               {filtered.length} of {companies.length} companies
//             </p>

//             <div className="flex flex-wrap gap-3">
//               <div className="relative">

//                 {/* <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-[#92929a]" /> */}
                  

//                 <input
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                   placeholder="Search..."
//                   className="h-[40px] w-[210px] rounded-[8px] border border-[#dedee2] bg-white pl-11 pr-4 text-[13px] outline-none"
//                 />
//               </div>

//               <select
//                 value={sector}
//                 onChange={(e) => setSector(e.target.value)}
//                 className="h-[40px] rounded-[8px] bg-white px-5 text-[13px] outline-none"
//               >
//                 <option>All Sectors</option>
//               </select>

//               <button
//                 type="button"
//                 onClick={() => setOpen(true)}
//                 className="flex h-[40px] items-center gap-2 rounded-[8px] bg-[#18181b] px-6 text-[13px] font-bold text-white"
//               >
//                 <PlusIcon />
//                 Add Company
//               </button>
//             </div>
//           </div>
                                  
//           <div className="mt-6 overflow-hidden rounded-[12px] bg-white">
//             <div className="grid grid-cols-5 bg-[#29292c] px-7 py-4 text-[12px] font-bold text-white">
//               <span>COMPANY</span>
//               <span>SECTOR</span>
//               <span>SUB-SECTOR</span>
//               <span>TENTATIVE</span>
//               <span>FULL</span>
//             </div>

//             {filtered.length === 0 ? (
//               <div className="flex h-[148px] items-center justify-center text-[13px] text-[#9999a3]">
//                 No companies found
//               </div>
//             ) : (
//               filtered.map((item) => (
//                 <div key={item.id} className="grid grid-cols-5 px-7 py-5 text-[13px]">
//                   <span>{item.name}</span>
//                   <span>{item.sector}</span>
//                   <span>{item.subSector}</span>
//                   <span>{item.tentative}</span>
//                   <span>{item.full}</span>
//                 </div>
//               ))
//             )}
//           </div>
//         </>
//       ) : (
//         <div className="mt-6 rounded-[12px] bg-white p-8 text-[13px] text-[#9999a3]">
//           No sectors found
//         </div>
//       )}

//       {open && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-5">
//           <form onSubmit={addCompany} className="w-full max-w-[420px] rounded-[14px] bg-white p-6 shadow-xl">
//             <h2 className="text-[18px] font-bold">Add Company</h2>
//             <label className="mt-6 block text-[12px] font-medium">Company name</label>
//             <input
//               autoFocus
//               value={companyName}
//               onChange={(e) => setCompanyName(e.target.value)}
//               className="mt-2 h-[45px] w-full rounded-[7px] border border-[#d8d8dd] px-4 outline-none focus:border-black"
//             />
//             <div className="mt-6 flex justify-end gap-3">
//               <button type="button" onClick={() => setOpen(false)} className="rounded-[7px] px-4 py-2 text-[13px]">
//                 Cancel
//               </button>
//               <button type="submit" className="rounded-[7px] bg-[#18181b] px-5 py-2 text-[13px] font-bold text-white">
//                 Add Company
//               </button>
//             </div>
//           </form>
//         </div>
//       )}
//     </section>
//   );
// };

// export default Companies;
