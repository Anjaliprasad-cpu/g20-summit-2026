import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  



  const handleSubmit = (e) => {
  e.preventDefault();

  if (
    username === "admin" &&
    password === "Admin@12345"
  ) {
    setError("");

    // Save admin login status
    sessionStorage.setItem(
      "g20AdminLoggedIn",
      "true"
    );

    // Open Speakers page
    navigate("/admin/speakers");
  } else {
    setError("Invalid username or password.");
  }
};



  return (
    <div className="flex min-h-screen items-center justify-center bg-[#08080a] px-4">

      <div className="flex w-full max-w-[390px] flex-col items-center">

        {/* G2 LOGO */}
        <div className="mb-7 flex h-[56px] w-[56px] items-center justify-center rounded-[15px] bg-white">
          <span className="text-[18px] font-bold text-black">
            G2
          </span>
        </div>

        {/* TITLE */}
        <h1 className="text-[24px] font-bold text-white">
          G200 Admin
        </h1>

        <p className="mt-1 text-[13px] text-[#77777d]">
          Summit 2026 · Control Panel
        </p>

        {/* LOGIN CARD */}
        <form
          onSubmit={handleSubmit}
          className="
            mt-9
            w-full
            rounded-[16px]
            bg-[#1a1a1d]
            p-8
          "
        >

          {/* USERNAME */}
          <div>
            <label className="mb-2 block text-[11px] font-medium text-[#a6a6ad]">
              USERNAME
            </label>

            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError("");
              }}
              placeholder="admin"
              className="
                h-[54px]
                w-full
                rounded-[8px]
                border
                border-[#bcbcc1]
                bg-[#29292c]
                px-5
                text-[14px]
                text-white
                outline-none
                placeholder:text-[#55555d]
                focus:border-white
              "
            />
          </div>

          {/* PASSWORD */}
          <div className="mt-5">
            <label className="mb-2 block text-[11px] font-medium text-[#a6a6ad]">
              PASSWORD
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              placeholder="••••••••"
              className="
                h-[54px]
                w-full
                rounded-[8px]
                border
                border-[#bcbcc1]
                bg-[#29292c]
                px-5
                text-[14px]
                text-white
                outline-none
                placeholder:text-[#55555d]
                focus:border-white
              "
            />
          </div>

          {/* ERROR */}
          {error && (
            <p className="mt-3 text-[12px] font-medium text-red-400">
              {error}
            </p>
          )}

          {/* SIGN IN */}
          <button
            type="submit"
            className="
              mt-5
              h-[54px]
              w-full
              rounded-[8px]
              bg-white
              text-[14px]
              font-bold
              text-black
              transition
              hover:bg-[#eeeeee]
              active:scale-[0.99]
            "
          >
            Sign In
          </button>

        </form>
      </div>
    </div>
  );
}




// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const AdminLogin = () => {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!username.trim() || !password) {
//       setError("Please enter username and password.");
//       return;
//     }


//     // Replace this section with your real API authentication.
//     sessionStorage.setItem("g20AdminLoggedIn", "true");
//     navigate("/g200summit2026/admin/speakers");
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-[#09090b] px-5 text-white">
//       <div className="flex w-full max-w-[385px] flex-col items-center">
//         <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-[15px] bg-white text-[17px] font-bold text-black">
//           G2
//         </div>

//         <h1 className="text-[24px] font-bold">G200 Admin</h1>
//         <p className="mt-2 text-[12px] text-[#72727a]">Summit 2026 · Control Panel</p>

//         <form
//           onSubmit={handleSubmit}
//           className="mt-9 w-full rounded-[16px] bg-[#1b1b1e] p-8"
//         >
//           <label className="block text-[11px] font-medium text-[#a7a7af]">
//             USERNAME
//           </label>
//           <input
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             placeholder="admin"
//             className="mt-2 h-[54px] w-full rounded-[8px] border border-[#bfc0c4] bg-[#29292c] px-5 text-[14px] text-white outline-none placeholder:text-[#62626a] focus:border-white"
//           />

//           <label className="mt-5 block text-[11px] font-medium text-[#a7a7af]">
//             PASSWORD
//           </label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="••••••••"
//             className="mt-2 h-[54px] w-full rounded-[8px] border border-[#bfc0c4] bg-[#29292c] px-5 text-[14px] text-white outline-none placeholder:text-[#62626a] focus:border-white"
//           />

//           {error && <p className="mt-3 text-[12px] text-[#f5a5a5]">{error}</p>}

//           <button
//             type="submit"
//             className="mt-4 h-[54px] w-full rounded-[8px] bg-white text-[14px] font-bold text-black transition hover:bg-[#ededed]"
//           >
//             Sign In
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AdminLogin;
