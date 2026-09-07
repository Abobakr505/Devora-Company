import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import CustomCursor from "./components/Cursor/CustomCursor.jsx";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop.jsx";
import Home from "./pages/Home.jsx";
import ProjectDetails from "./pages/ProjectDetails.jsx";
import NotFound from "./pages/NotFound.jsx";

import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./components/admin/ProtectedRoute.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import AdminLogin from "./pages/admin/AdminLogin.jsx";
import DashboardHome from "./pages/admin/DashboardHome.jsx";
import MessagesManager from "./pages/admin/MessagesManager.jsx";
import ProjectsManager from "./pages/admin/ProjectsManager.jsx";
import ProjectForm from "./pages/admin/ProjectForm.jsx";

/** الموقع العام: فيه Navbar / Footer / Cursor / تأثيرات السكرول */
function SiteLayout({ children }) {
  return (
    <div className="relative">
      <div className="grain" />
      <CustomCursor />
      <Navbar />
      <ScrollToTop />

      {children}

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* ================= الموقع العام ================= */}
          <Route path="/" element={<SiteLayout><Home /></SiteLayout>} />
          <Route
            path="/projects/:slug"
            element={<SiteLayout><ProjectDetails /></SiteLayout>}
          />

          {/* ================= لوحة التحكم ================= */}
          <Route path="/admin/login" element={<AdminLogin />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardHome />} />
            <Route path="messages" element={<MessagesManager />} />
            <Route path="projects" element={<ProjectsManager />} />
            <Route path="projects/new" element={<ProjectForm />} />
            <Route path="projects/:id" element={<ProjectForm />} />
          </Route>

          {/* ================= 404 ================= */}
          <Route path="*" element={<SiteLayout><NotFound /></SiteLayout>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}