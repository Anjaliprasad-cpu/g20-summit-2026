import { useEffect, useRef, useState } from "react";
import { PlusIcon } from "./AdminIcons";

const API_URL = "http://127.0.0.1:5000";

const Speakers = () => {
  const [speakers, setSpeakers] = useState([]);
  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);

  // --------------------------------------------------
  // GET SPEAKERS FROM PYTHON BACKEND
  // --------------------------------------------------

  const fetchSpeakers = async () => {
    try {
      const response = await fetch(`${API_URL}/api/speakers`);

      if (!response.ok) {
        throw new Error("Failed to fetch speakers");
      }

      const data = await response.json();

      setSpeakers(data);
    } catch (error) {
      console.error("Error fetching speakers:", error);
    }
  };

  // --------------------------------------------------
  // LOAD SPEAKERS WHEN PAGE OPENS
  // --------------------------------------------------

  useEffect(() => {
    fetchSpeakers();
  }, []);

  // --------------------------------------------------
  // IMAGE UPLOAD
  // --------------------------------------------------

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImage(file);

    const previewUrl = URL.createObjectURL(file);

    setImagePreview(previewUrl);
  };

  // --------------------------------------------------
  // ADD SPEAKER
  // --------------------------------------------------

  const addSpeaker = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Please enter Full Name.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("name", name.trim());
      formData.append("role", role.trim());
      formData.append("company", company.trim());

      if (image) {
        formData.append("image", image);
      }

      const response = await fetch(`${API_URL}/api/speakers`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to add speaker"
        );
      }

      // Reload speakers from database
      await fetchSpeakers();

      // Clear form
      setName("");
      setRole("");
      setCompany("");
      setImage(null);
      setImagePreview(null);

      // Close modal
      setOpen(false);

    } catch (error) {
      console.error("Error adding speaker:", error);

      alert("Unable to add speaker. Please check the Python backend.");
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------
  // CLOSE MODAL
  // --------------------------------------------------

  const closeModal = () => {
    setOpen(false);

    setName("");
    setRole("");
    setCompany("");
    setImage(null);
    setImagePreview(null);
  };

  return (
    <section className="px-6 py-7 sm:px-8">

      {/* EXISTING HEADER - UNCHANGED */}

      <div className="flex items-start justify-between gap-5">
        <div>
          <h1 className="text-[22px] font-bold">
            Speakers
          </h1>

          <p className="mt-2 text-[13px] text-[#6e6e78]">
            {speakers.length} speakers added
          </p>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex h-[40px] items-center gap-2 rounded-[8px] bg-[#18181b] px-6 text-[13px] font-bold text-white hover:bg-black"
        >
          <PlusIcon />
          Add Speaker
        </button>
      </div>

      {/* EXISTING SPEAKERS AREA - UNCHANGED */}

      <div className="mt-10 min-h-[238px] rounded-[12px] border-2 border-dashed border-[#dedee2] bg-white">
        {speakers.length === 0 ? (
          <div className="flex min-h-[238px] flex-col items-center justify-center">
            <p className="text-[13px] text-[#9999a3]">
              No speakers yet
            </p>

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="mt-8 text-[13px] font-medium underline"
            >
              Add the first speaker
            </button>
          </div>
        ) : (
          <div className="divide-y divide-[#eeeeef]">
            {speakers.map((speaker) => (
              <div
                key={speaker.id}
                className="flex items-center justify-between px-6 py-4"
              >
                <div className="flex items-center gap-4">

                  {speaker.image ? (
                    <img
                      src={speaker.image}
                      alt={speaker.name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#eeeeef] text-[11px] text-[#777]">
                      N/A
                    </div>
                  )}

                  <div>
                    <span className="text-[14px] font-medium">
                      {speaker.name}
                    </span>

                    {speaker.role && (
                      <p className="mt-1 text-[12px] text-[#777]">
                        {speaker.role}
                      </p>
                    )}

                    {speaker.company && (
                      <p className="mt-1 text-[12px] text-[#999]">
                        {speaker.company}
                      </p>
                    )}
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ==================================================
          NEW ADD SPEAKER POPUP
          ================================================== */}

      {open && (
        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            overflow-y-auto
            bg-black/40
            px-5
            py-6
          "
        >

          <form
            onSubmit={addSpeaker}
            className="
              relative
              w-full
              max-w-[760px]
              rounded-[16px]
              bg-white
              shadow-xl
            "
          >

            {/* POPUP HEADER */}

            <div
              className="
                flex
                items-center
                justify-between
                border-b
                border-[#eeeeef]
                px-6
                py-5
                sm:px-8
              "
            >

              <h2 className="text-[20px] font-bold">
                Add Speaker
              </h2>

              {/* CLOSE BUTTON */}

              <button
                type="button"
                onClick={closeModal}
                aria-label="Close"
                className="
                  flex
                  h-[32px]
                  w-[32px]
                  items-center
                  justify-center
                  rounded-full
                  text-[24px]
                  leading-none
                  text-[#555]
                  hover:bg-[#f2f2f2]
                  hover:text-black
                "
              >
                ×
              </button>

            </div>


            {/* POPUP BODY */}

            <div className="px-6 py-7 sm:px-8 sm:py-8">

              {/* IMAGE UPLOAD */}

              <div className="flex justify-center">

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={() =>
                    fileInputRef.current?.click()
                  }
                  className="
                    flex
                    h-[140px]
                    w-[140px]
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-full
                    border
                    border-[#dcdcdc]
                    bg-[#fafafa]
                    transition
                    hover:bg-[#f3f3f3]
                  "
                >

                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Speaker preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center">

                      {/* UPLOAD ICON */}

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        className="h-[30px] w-[30px] text-[#777]"
                      >
                        <path d="M12 16V4" />
                        <path d="M8 8l4-4 4 4" />
                        <path d="M5 14v5h14v-5" />
                      </svg>

                      <span className="mt-2 text-[12px] font-medium text-[#777]">
                        UPLOAD
                      </span>

                    </div>
                  )}

                </button>

              </div>


              {/* FULL NAME */}

              <div className="mt-8">

                <label
                  htmlFor="speaker-name"
                  className="block text-[13px] font-medium text-[#222]"
                >
                  Full Name
                </label>

                <input
                  id="speaker-name"
                  autoFocus
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  placeholder="e.g. Nadita Rao"
                  className="
                    mt-2
                    h-[48px]
                    w-full
                    rounded-[7px]
                    border
                    border-[#d8d8dd]
                    px-4
                    text-[14px]
                    outline-none
                    focus:border-black
                  "
                />

              </div>


              {/* TITLE / ROLE */}

              <div className="mt-5">

                <label
                  htmlFor="speaker-role"
                  className="block text-[13px] font-medium text-[#222]"
                >
                  Title / Role
                </label>

                <input
                  id="speaker-role"
                  value={role}
                  onChange={(e) =>
                    setRole(e.target.value)
                  }
                  placeholder="e.g. Chief Investment Officer"
                  className="
                    mt-2
                    h-[48px]
                    w-full
                    rounded-[7px]
                    border
                    border-[#d8d8dd]
                    px-4
                    text-[14px]
                    outline-none
                    focus:border-black
                  "
                />

              </div>


              {/* COMPANY */}

              <div className="mt-5">

                <label
                  htmlFor="speaker-company"
                  className="block text-[13px] font-medium text-[#222]"
                >
                  Company
                </label>

                <input
                  id="speaker-company"
                  value={company}
                  onChange={(e) =>
                    setCompany(e.target.value)
                  }
                  placeholder="e.g. Meridian A.M.C."
                  className="
                    mt-2
                    h-[48px]
                    w-full
                    rounded-[7px]
                    border
                    border-[#d8d8dd]
                    px-4
                    text-[14px]
                    outline-none
                    focus:border-black
                  "
                />

              </div>

            </div>


            {/* POPUP FOOTER */}

            <div
              className="
                flex
                flex-col-reverse
                gap-3
                border-t
                border-[#eeeeef]
                px-6
                py-5
                sm:flex-row
                sm:justify-end
                sm:px-8
              "
            >

              {/* CANCEL */}

              <button
                type="button"
                onClick={closeModal}
                className="
                  rounded-[7px]
                  px-5
                  py-2.5
                  text-[13px]
                  font-medium
                  text-[#555]
                  hover:bg-[#f5f5f5]
                "
              >
                Cancel
              </button>


              {/* ADD SPEAKER */}

              <button
                type="submit"
                disabled={loading}
                className="
                  rounded-[7px]
                  bg-[#18181b]
                  px-6
                  py-2.5
                  text-[13px]
                  font-bold
                  text-white
                  hover:bg-black
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {loading ? "Adding..." : "Add Speaker"}
              </button>

            </div>

          </form>

        </div>
      )}

    </section>
  );
};

export default Speakers;





// import { useEffect,useState } from "react";
// import { PlusIcon } from "./AdminIcons";
// const API_URL = "http://127.0.0.1:5000";

// const Speakers = () => {
//   const [speakers, setSpeakers] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [name, setName] = useState("");

//   // const addSpeaker = (e) => {
//   //   e.preventDefault();
//   //   if (!name.trim()) return;
//   //   setSpeakers((prev) => [...prev, { id: Date.now(), name: name.trim() }]);
//   //   setName("");
//   //   setOpen(false);
//   // };


//   const fetchSpeakers = async () => {
//   try {
//     const response = await fetch(`${API_URL}/api/speakers`);

//     if (!response.ok) {
//       throw new Error("Failed to fetch speakers");
//     }

//     const data = await response.json();

//     setSpeakers(data);
//   } catch (error) {
//     console.error("Error fetching speakers:", error);
//   }
// };

// const addSpeaker = async (e) => {
//   e.preventDefault();

//   if (!name.trim()) return;

//   try {
//     const formData = new FormData();

//     formData.append("name", name.trim());

//     const response = await fetch(`${API_URL}/api/speakers`, {
//       method: "POST",
//       body: formData,
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       throw new Error(data.message || "Failed to add speaker");
//     }

//     await fetchSpeakers();

//     setName("");
//     setOpen(false);
//   } catch (error) {
//     console.error("Error adding speaker:", error);
//     alert("Unable to add speaker.");
//   }
// };

// useEffect(() => {
//   fetchSpeakers();
// }, []);

//   return (
//     <section className="px-6 py-7 sm:px-8">
//       <div className="flex items-start justify-between gap-5">
//         <div>
//           <h1 className="text-[22px] font-bold">Speakers</h1>
//           <p className="mt-2 text-[13px] text-[#6e6e78]">
//             {speakers.length} speakers added
//           </p>
//         </div>

//         <button
//           type="button"
//           onClick={() => setOpen(true)}
//           className="flex h-[40px] items-center gap-2 rounded-[8px] bg-[#18181b] px-6 text-[13px] font-bold text-white hover:bg-black"
//         >
//           <PlusIcon />
//           Add Speaker
//         </button>
//       </div>

//       <div className="mt-10 min-h-[238px] rounded-[12px] border-2 border-dashed border-[#dedee2] bg-white">
//         {speakers.length === 0 ? (
//           <div className="flex min-h-[238px] flex-col items-center justify-center">
//             <p className="text-[13px] text-[#9999a3]">No speakers yet</p>
//             <button
//               type="button"
//               onClick={() => setOpen(true)}
//               className="mt-8 text-[13px] font-medium underline"
//             >
//               Add the first speaker
//             </button>
//           </div>
//         ) : (
//           <div className="divide-y divide-[#eeeeef]">
//             {speakers.map((speaker) => (
//               <div key={speaker.id} className="flex items-center justify-between px-6 py-4">
//                 <span className="text-[14px] font-medium">{speaker.name}</span>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
                                                
//       {open && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-5">
//           <form onSubmit={addSpeaker} className="w-full max-w-[420px] rounded-[14px] bg-white p-6 shadow-xl">
//             <h2 className="text-[18px] font-bold">Add Speaker</h2>
//             <label className="mt-6 block text-[12px] font-medium">Speaker name</label>
//             <input
//               autoFocus
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="mt-2 h-[45px] w-full rounded-[7px] border border-[#d8d8dd] px-4 outline-none focus:border-black"
//             />
//             <div className="mt-6 flex justify-end gap-3">
//               <button type="button" onClick={() => setOpen(false)} className="rounded-[7px] px-4 py-2 text-[13px]">
//                 Cancel
//               </button>
//               <button type="submit" className="rounded-[7px] bg-[#18181b] px-5 py-2 text-[13px] font-bold text-white">
//                 Add Speaker
//               </button>
//             </div>
//           </form>
//         </div>
//       )}
//     </section>
//   );
// };

// export default Speakers;


