
import { useState, useEffect } from "react";
import { DownloadIcon } from "./AdminIcons";

const API_URL = `http://${window.location.hostname}:5000`;

const columns = [
  "#",
  "NAME",
  "EMAIL",
  "MOBILE",
  "COMPANY",
  "DESIGNATION",
  "ONE-ON-ONE",
  "GROUP",
  "SUBMITTED",
];

const Submissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const fetchSubmissions = async () => {
      try {
        const response = await fetch(`${API_URL}/api/submissions`);

        if (!response.ok) {
          throw new Error("Failed to load submissions.");
        }

        const data = await response.json();

        if (!cancelled) {
          setSubmissions(data);
          setError("");
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            "Unable to load submissions. Please check the Python backend."
          );
          console.error("Error fetching submissions:", err);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchSubmissions();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="px-6 py-7 sm:px-8">
      <div className="flex items-start justify-between gap-5">
        <div>
          <h1 className="text-[22px] font-bold">Submissions</h1>
          <p className="mt-2 text-[13px] text-[#6e6e78]">
            {submissions.length} invite requests received
          </p>
        </div>

        <button
          type="button"
          disabled
          className="flex h-[40px] cursor-default items-center gap-2 rounded-[8px] bg-[#a8d7c0] px-6 text-[13px] font-bold text-white"
        >
          <DownloadIcon />
          Download CSV
        </button>
      </div>

      <div className="mt-10 overflow-x-auto rounded-[12px] bg-white">
        <div className="min-w-[1080px]">
          <div className="grid grid-cols-9 bg-[#29292c] px-7 py-4 text-[12px] font-bold text-white">
            {columns.map((column) => (
              <span key={column}>{column}</span>
            ))}
          </div>

          {loading ? (
            <div className="flex h-[180px] items-center justify-center text-[13px] text-[#9999a3]">
              Loading submissions...
            </div>
          ) : error ? (
            <div className="flex min-h-[180px] items-center justify-center px-5 text-center text-[13px] text-red-600">
              {error}
            </div>
          ) : submissions.length === 0 ? (
            <div className="flex h-[180px] items-center justify-center text-[13px] text-[#9999a3]">
              No submissions yet
            </div>
          ) : (
            submissions.map((item, index) => (
              <div
                key={item.id ?? `${item.email}-${index}`}
                className="grid grid-cols-9 items-start gap-2 border-b border-[#eeeeef] px-7 py-4 text-[12px] text-[#444] last:border-b-0"
              >
                <span>{index + 1}</span>

                <span className="break-words">{item.name || "—"}</span>

                <span className="break-words">{item.email || "—"}</span>

                <span>{item.mobile || "—"}</span>

                <span className="break-words">
                  {item.company || item.workingAt || "—"}
                </span>

                <span className="break-words">
                  {item.designation || "—"}
                </span>

                <span className="break-words">
                  {item.oneOnOne
                    ? Array.isArray(item.oneOnOneCompanies) &&
                      item.oneOnOneCompanies.length > 0
                      ? item.oneOnOneCompanies.join(", ")
                      : "Yes"
                    : "—"}
                </span>

                <span className="break-words">
                  {item.groupMeeting
                    ? Array.isArray(item.groupCompanies) &&
                      item.groupCompanies.length > 0
                      ? item.groupCompanies.join(", ")
                      : "Yes"
                    : "—"}
                </span>

                <span>
                  {item.submittedAt
                    ? new Date(item.submittedAt).toLocaleDateString()
                    : "—"}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Submissions;








// import { useState, useEffect } from "react";
// import { DownloadIcon } from "./AdminIcons";

// const columns = [
//    "#",
//   "NAME",
//   "EMAIL",
//   "MOBILE",
//   "COMPANY",
//   "DESIGNATION",
//   "ONE-ON-ONE",
//   "GROUP",
//   "SUBMITTED",
// ];

// const Submissions = () => {
//   const API_URL = `http://${window.location.hostname}:5000`;

// const [submissions, setSubmissions] = useState([]);
// const [loading, setLoading] = useState(true);
// const [error, setError] = useState("");

// useEffect(() => {
//   let cancelled = false;

//   const fetchSubmissions = async () => {
//     try {
//       const response = await fetch(`${API_URL}/api/submissions`);

//       if (!response.ok) {
//         throw new Error("Failed to load submissions.");
//       }

//       const data = await response.json();

//       if (!cancelled) {
//         setSubmissions(data);
//         setError("");
//       }
//     } catch (err) {
//       if (!cancelled) {
//         setError("Unable to load submissions. Check that the backend is running.");
//         console.error(err);
//       }
//     } finally {
//       if (!cancelled) {
//         setLoading(false);
//       }
//     }
//   };

//   fetchSubmissions();

//   return () => {
//     cancelled = true;
//   };
// }, []);
//   // const [submissions] = useState([]);


//   return (
//     <section className="px-6 py-7 sm:px-8">
//       <div className="flex items-start justify-between gap-5">
//         <div>
//           <h1 className="text-[22px] font-bold">Submissions</h1>
//           <p className="mt-2 text-[13px] text-[#6e6e78]">
//             {submissions.length} invite requests received
//           </p>
//         </div>

//         <button
//           type="button"
//           disabled 
//           className="flex h-[40px] cursor-default items-center gap-2 rounded-[8px] bg-[#a8d7c0] px-6 text-[13px] font-bold text-white"
//         >
//           <DownloadIcon />
//           Download CSV
//         </button>
//       </div>
      

//       <div className="mt-10 overflow-x-auto rounded-[12px] bg-white">
//         <div className="min-w-[1080px]">
//           <div className="grid grid-cols-9 bg-[#29292c] px-7 py-4 text-[12px] font-bold text-white">
//             {columns.map((column) => (
//               <span key={column}>{column}</span>
//             ))}
//           </div>

//           <div className="flex h-[180px] items-center justify-center text-[13px] text-[#9999a3]">
//             No submissions yet
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Submissions;
