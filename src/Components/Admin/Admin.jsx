import { Navigate, Route, Routes } from "react-router-dom";

import AdminLayout from "./AdminLayout";
import AdminLogin from "./AdminLogin";
import Speakers from "./Speakers";
import Companies from "./Companies";
import Submissions from "./Submissions";


const ProtectedAdmin = () => {
  const loggedIn =
    sessionStorage.getItem("g20AdminLoggedIn") === "true";

  // If user is not logged in, send them to /admin login page
  if (!loggedIn) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <Routes>
      <Route element={<AdminLayout />}>

        {/* /admin → /admin/speakers */}
        <Route
          index
          element={<Navigate to="speakers" replace />}
        />

        {/* Speakers */}
        <Route
          path="speakers"
          element={<Speakers />}
        />

        {/* Companies */}
        <Route
          path="companies"
          element={<Companies />}
        />

        {/* Submissions */}
        <Route
          path="submissions"
          element={<Submissions />}
        />

      </Route>
    </Routes>
  );
};


const Admin = () => {
  return (
    <Routes>

      {/* Admin Login
          URL: /admin
      */}
      <Route
        path="/"
        element={<AdminLogin />}
      />

      {/* Protected Admin Pages
          /admin/speakers
          /admin/companies
          /admin/submissions
      */}
      <Route
        path="/*"
        element={<ProtectedAdmin />}
      />

    </Routes>
  );
};


export default Admin;







// import { Navigate, Route, Routes } from "react-router-dom";
// import AdminLayout from "./AdminLayout";
// import AdminLogin from "./AdminLogin";
// import Speakers from "./Speakers";
// import Companies from "./Companies";
// import Submissions from "./Submissions";

// const ProtectedAdmin = () => {
//   const loggedIn = sessionStorage.getItem("g20AdminLoggedIn") === "true";

//   if (!loggedIn) {
//     return <Navigate to="/g200summit2026/admin" replace />;
//   }

//   return (
//     <Routes>
//       <Route element={<AdminLayout />}>
//         <Route index element={<Navigate to="speakers" replace />} />
//         <Route path="speakers" element={<Speakers />} />
//         <Route path="companies" element={<Companies />} />
//         <Route path="submissions" element={<Submissions />} />
//       </Route>
//     </Routes>
//   );
// };

// const Admin = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<AdminLogin />} />
//       <Route path="/*" element={<ProtectedAdmin />} />
//     </Routes>
//   );
// };

// export default Admin;
