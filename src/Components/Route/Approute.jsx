import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Home from "../Home/Home";
import Admin from "../Admin/Admin";

export default function Approute() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />

        {/* Admin Panel */}
        <Route path="/admin/*" element={<Admin />} />

        {/* Unknown URL */}
        <Route path="*" element={<Navigate to="/" replace />} />
        
      </Routes>
    </BrowserRouter>
  );
}
