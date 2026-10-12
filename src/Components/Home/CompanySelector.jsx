
import { useMemo, useState } from "react";

const COMPANY_CATEGORIES = [
  {
    name: "Finance",
    count: 22,
    companies: [
      "Capital Small Finance Bank Ltd.",
      "Equitas Small Finance Bank Ltd.",
      "Tamilnad Mercantile Bank Ltd.",
      "The Federal Bank Ltd.",
    ],
  },
  {
    name: "Real Estate",
    count: 12,
    companies: [
      "Ashiana Housing Ltd.",
      "Embassy Developments Ltd.",
      "Indiabulls Ltd.",
      "Kalpataru Ltd.",
    ],
  },
  {
    name: "IT Services, Internet & Staffing",
    count: 10,
    companies: [
      "Datamatics Global Services Ltd.",
      "eMudhra Ltd.",
      "Happiest Minds Technologies Ltd.",
      "Ivalue Infosolutions Ltd.",
    ],
  },
  {
    name: "Chemicals (Agri & Specialty)",
    count: 6,
    companies: [
      "DCM Shriram Ltd.",
      "Epigral Ltd.",
      "Fine Organic Industries Ltd.",
      "GHCL Ltd.",
    ],
  },
  {
    name: "FMCG, Alcobev & QSR",
    count: 6,
    companies: [
      "Globus Spirits Ltd.",
      "Godrej Consumer Products Ltd.",
      "Restaurant Brands Asia Ltd.",
      "Tilaknagar Industries Ltd.",
    ],
  },
];


export default function CompanySelector({
  meetingType,
  selectedCompanies,
  onDone,
  onClose,
}) {
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState(
    COMPANY_CATEGORIES.map((category) => category.name)
  );
  const [draft, setDraft] = useState(selectedCompanies);

  const filteredCategories = useMemo(() => {
    const query = search.trim().toLowerCase();

    return COMPANY_CATEGORIES.map((category) => ({
      ...category,
      companies: category.companies.filter(
        (company) =>
          company.toLowerCase().includes(query) ||
          category.name.toLowerCase().includes(query)
      ),
    })).filter(
      (category) =>
        category.companies.length > 0 ||
        category.name.toLowerCase().includes(query)
    );
  }, [search]);

  const visibleCompanies = filteredCategories.flatMap(
    (category) => category.companies
  );

  const toggleCompany = (company) => {
    setDraft((previous) =>
      previous.includes(company)
        ? previous.filter((item) => item !== company)
        : [...previous, company]
    );
  };

  const selectAllVisible = () => {
    setDraft((previous) => [
      ...new Set([...previous, ...visibleCompanies]),
    ]);
  };

  const clearAll = () => setDraft([]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-3 py-4 sm:px-5"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Select Companies"
        className="flex max-h-[85vh] w-full max-w-[580px] flex-col overflow-hidden rounded-[16px] bg-white shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#eeeeee] px-5 py-4">
          <div>
            <h2 className="text-[15px] font-bold text-[#302e29]">
              Select Companies
            </h2>
            <p className="mt-1 text-[12px] text-[#88847c]">
              for {meetingType === "one-on-one"
                ? "One - on - One Meeting"
                : "Group Meeting"}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close company selector"
            className="text-[25px] leading-none text-[#888] hover:text-black"
          >
            ×
          </button>
        </div>

        {/* Search */}
        <div className="border-b border-[#eeeeee] px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-[44px] min-w-0 flex-1 items-center rounded-[9px] border border-[#d8c08b] px-3 focus-within:ring-1 focus-within:ring-[#a87918]">
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search company or sector..."
                className="w-full bg-transparent text-[13px] text-[#333] outline-none placeholder:text-[#999]"
              />
              <span className="text-[15px] text-[#999]">⌕</span>
            </div>

            <button
              type="button"
              onClick={clearAll}
              className="shrink-0 text-[12px] text-[#888] hover:text-[#a87918]"
            >
              Clear All
            </button>
          </div>

          <div className="mt-3 text-right">
            <button
              type="button"
              onClick={selectAllVisible}
              className="text-[12px] font-semibold text-[#77736b] hover:text-[#a87918]"
            >
              Select All (Visible)
            </button>
          </div>
        </div>

        {/* Company list */}
        <div className="min-h-0 flex-1 overflow-y-auto px-5">
          {filteredCategories.map((category) => {
            const isExpanded = expanded.includes(category.name);

            return (
              <div
                key={category.name}
                className="border-b border-[#eeeeee] py-3"
              >
                <button
                  type="button"
                  onClick={() =>
                    setExpanded((previous) =>
                      isExpanded
                        ? previous.filter((name) => name !== category.name)
                        : [...previous, category.name]
                    )
                  }
                  className="flex w-full items-center gap-3 py-1 text-left"
                >
                  <span className="w-5 text-center text-[16px] text-[#8a867d]">
                    {category.name === "Finance"
                      ? "♙"
                      : category.name === "Real Estate"
                        ? "⌂"
                        : category.name.startsWith("IT Services")
                          ? "▣"
                          : category.name.startsWith("Chemicals")
                            ? "♧"
                            : "♜"}
                  </span>

                  <span className="flex-1 text-[13px] font-semibold text-[#3d3a33]">
                    {category.name}
                  </span>

                  <span className="rounded bg-[#f1f0ee] px-2 py-0.5 text-[10px] text-[#858078]">
                    {category.count}
                  </span>

                  <span className="ml-2 text-[13px] text-[#999]">
                    {isExpanded ? "⌃" : "⌄"}
                  </span>
                </button>

                {isExpanded && (
                  <div className="ml-8 mt-3 space-y-2">
                    {category.companies.length > 0 &&
                    category.companies.every((company) =>
                      company.toLowerCase().includes(search.toLowerCase())
                    ) ? (
                      category.companies.map((company) => (
                        <label
                          key={company}
                          className="flex cursor-pointer items-start gap-3 rounded-md px-2 py-1.5 text-[13px] text-[#504d46] hover:bg-[#f8f6f2]"
                        >
                          <input
                            type="checkbox"
                            checked={draft.includes(company)}
                            onChange={() => toggleCompany(company)}
                            className="mt-0.5 h-4 w-4 accent-[#a87918]"
                          />
                          <span>{company}</span>
                        </label>
                      ))
                    ) : (
                      filteredCategories
                        .find((item) => item.name === category.name)
                        ?.companies.map((company) => (
                          <label
                            key={company}
                            className="flex cursor-pointer items-start gap-3 rounded-md px-2 py-1.5 text-[13px] text-[#504d46] hover:bg-[#f8f6f2]"
                          >
                            <input
                              type="checkbox"
                              checked={draft.includes(company)}
                              onChange={() => toggleCompany(company)}
                              className="mt-0.5 h-4 w-4 accent-[#a87918]"
                            />
                            <span>{company}</span>
                          </label>
                        ))
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {filteredCategories.length === 0 && (
            <p className="py-8 text-center text-[13px] text-[#888]">
              No matching companies found.
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#eeeeee] px-5 py-4">
          <p className="text-[12px] text-[#555]">
            <strong>{draft.length}</strong> companies selected
          </p>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-[8px] border border-[#dedbd4] px-4 py-2 text-[13px] text-[#555] hover:bg-[#f7f6f3]"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={() => onDone(draft)}
              className="rounded-[8px] bg-[#a87918] px-5 py-2 text-[13px] font-semibold text-white hover:bg-[#8d6412]"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
