import { NavLink, Outlet, useNavigate } from "react-router-dom";

import {
  UserIcon,
  BuildingIcon,
  DocumentIcon,
  LogoutIcon,
} from "./AdminIcons";


const AdminLayout = () => {
  const navigate = useNavigate();

  const navItems = [
    {
      label: "Speakers",
      path: "/admin/speakers",
      icon: UserIcon,
    },
    {
      label: "Companies",
      path: "/admin/companies",
      icon: BuildingIcon,
    },
    {
      label: "Submissions",
      path: "/admin/submissions",
      icon: DocumentIcon,
    },
  ];


  const handleLogout = () => {
    sessionStorage.removeItem("g20AdminLoggedIn");

    navigate("/admin");
  };


  return (
    <div className="min-h-screen bg-[#f7f7f8]">

      {/* ================= SIDEBAR ================= */}
      <aside
        className="
          fixed
          left-0
          top-0
          z-40
          flex
          h-screen
          w-[244px]
          flex-col
          bg-[#08080a]
          text-white
        "
      >

        {/* LOGO / HEADER */}
        <div className="px-7 pt-7">

          <div
            className="
              flex
              h-[42px]
              w-[42px]
              items-center
              justify-center
              rounded-[10px]
              bg-white
            "
          >
            <span className="text-[15px] font-bold text-black">
              G2
            </span>
          </div>

          <h1 className="mt-5 text-[18px] font-bold">
            G200 Admin
          </h1>

          <p className="mt-1 text-[11px] text-[#77777d]">
            Summit 2026
          </p>

        </div>


        {/* ================= NAVIGATION ================= */}
        <nav className="mt-10 px-3">

          {navItems.map((item) => {

            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `
                  mb-2
                  flex
                  h-[44px]
                  w-full
                  items-center
                  rounded-[8px]
                  px-4
                  text-[13px]
                  transition-all
                  duration-200
                  ${
                    isActive
                      ? "bg-[#29292d] text-white"
                      : "text-[#8d8d94] hover:bg-[#18181b] hover:text-white"
                  }
                  `
                }
              >

                <Icon className="mr-3 h-[19px] w-[19px]" />

                <span>
                  {item.label}
                </span>

              </NavLink>
            );
          })}

        </nav>


        {/* ================= LOGOUT ================= */}
        <div className="mt-auto border-t border-[#242428] p-3">

          <button
            type="button"
            onClick={handleLogout}
            className="
              flex
              h-[44px]
              w-full
              items-center
              rounded-[8px]
              px-4
              text-[13px]
              text-[#8d8d94]
              transition-all
              duration-200
              hover:bg-[#18181b]
              hover:text-white
            "
          >

            <LogoutIcon className="mr-3 h-[19px] w-[19px]" />

            <span>
              Logout
            </span>

          </button>

        </div>

      </aside>


      {/* ================= MAIN CONTENT ================= */}
      <main className="ml-[244px] min-h-screen">

        {/* TOP HEADER */}
        <header
          className="
            flex
            h-[72px]
            items-center
            border-b
            border-[#e5e5e7]
            bg-white
            px-8
          "
        >

          <h2 className="text-[18px] font-semibold text-[#171719]">
            G200 Summit 2026
          </h2>

        </header>


        {/* PAGE CONTENT */}
        <div className="p-8">

          <Outlet />

        </div>

      </main>

    </div>
  );
};


export default AdminLayout;






// import { NavLink, Outlet, useNavigate } from "react-router-dom";
// import {
//   UserIcon,
//   BuildingIcon,
//   DocumentIcon,
//   LogoutIcon,
// } from "./AdminIcons";

// const navItems = [
//   { label: "Speakers", path: "/g200summit2026/admin/speakers", icon: UserIcon },
//   { label: "Companies", path: "/g200summit2026/admin/companies", icon: BuildingIcon },
//   { label: "Submissions", path: "/g200summit2026/admin/submissions", icon: DocumentIcon },
// ];

// const AdminLayout = () => {
//   const navigate = useNavigate();

//   const logout = () => {
//     sessionStorage.removeItem("g20AdminLoggedIn");
//     navigate("/g200summit2026/admin");
//   };

//   return (
//     <div className="min-h-screen bg-[#f5f5f6] text-[#17171a]">
//       <aside className="fixed inset-y-0 left-0 z-30 hidden w-[244px] bg-[#18181b] text-white lg:flex lg:flex-col">
//         <div className="flex items-center gap-3 px-7 py-5">
//           <div className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-white text-[14px] font-bold text-black">
//             G2
//           </div>
//           <div>
//             <p className="text-[15px] font-bold leading-4">G200 Admin</p>
//             <p className="mt-1 text-[11px] text-[#77777e]">Summit 2026</p>
//           </div>
//         </div>

//         <nav className="mt-5 flex flex-1 flex-col gap-2 px-4">
//           {navItems.map(({ label, path, icon: Icon }) => (
//             <NavLink
//               key={path}
//               to={path}
//               className={({ isActive }) =>
//                 `flex h-[41px] items-center gap-4 rounded-[9px] px-4 text-[14px] transition ${
//                   isActive
//                     ? "bg-white font-medium text-[#151519]"
//                     : "text-[#bdbdc5] hover:bg-[#242428] hover:text-white"
//                 }`
//               }
//             >
//               <Icon className="h-[19px] w-[19px]" />
//               <span>{label}</span>
//             </NavLink>
//           ))}
//         </nav>

//         <div className="border-t border-[#2b2b2f] p-4">
//           <button
//             type="button"
//             onClick={logout}
//             className="flex h-[42px] w-full items-center gap-4 rounded-[9px] px-4 text-[14px] text-[#bdbdc5] hover:bg-[#242428] hover:text-white"
//           >
//             <LogoutIcon className="h-[19px] w-[19px]" />
//             Logout
//           </button>
//         </div>
//       </aside>

//       <div className="min-h-screen lg:pl-[244px]">
//         <header className="flex h-[64px] items-center justify-between border-b border-[#eeeeef] bg-white px-6 sm:px-8">
//           <p className="text-[14px] font-medium">G200 Summit 2026</p>
//           <p className="text-[12px] text-[#9999a3]">G200 Summit 2026</p>
//         </header>

//         <main className="min-h-[calc(100vh-64px)] bg-[#f5f5f6]">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminLayout;
