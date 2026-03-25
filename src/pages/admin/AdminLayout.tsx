import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import logoSer from "@/assets/logo-ser.svg";

const NAV = [
  { label: "Dashboard", icon: "📊", path: "/admin/dashboard" },
  { label: "Blog", icon: "✍️", path: "/admin/blog" },
  { label: "Contactos", icon: "👥", path: "/admin/contacts" },
  { label: "Analíticas", icon: "📈", path: "/admin/analytics" },
];

const AdminLayout = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [newContacts, setNewContacts] = useState(0);

  useEffect(() => {
    if (!loading && !user) navigate("/admin/login");
  }, [user, loading, navigate]);

  useEffect(() => {
    supabase.from("contacts").select("id", { count: "exact", head: true }).eq("status", "nuevo")
      .then(({ count }) => setNewContacts(count ?? 0));
  }, [location.pathname]);

  if (loading) return <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter',sans-serif" }}>Cargando...</div>;
  if (!user) return null;

  const currentTitle = NAV.find(n => location.pathname.startsWith(n.path))?.label ?? "Admin";

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>
      {sidebarOpen && <div onClick={() => setSidebarOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.5)", zIndex: 998 }} />}

      <aside style={{
        width: 240, background: "#1B2A4A", color: "white", display: "flex", flexDirection: "column",
        position: "fixed", top: 0, bottom: 0, left: sidebarOpen ? 0 : -240, zIndex: 999,
        transition: "left .3s ease",
      }} className="admin-sidebar">
        <div style={{ padding: "24px 20px", borderBottom: "1px solid rgba(255,255,255,.1)" }}>
          <img src={logoSer} alt="SER" style={{ height: 32, filter: "brightness(10)" }} />
        </div>
        <nav style={{ flex: 1, padding: "16px 12px" }}>
          {NAV.map(item => (
            <Link key={item.path} to={item.path} onClick={() => setSidebarOpen(false)}
              style={{
                display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 8,
                color: location.pathname.startsWith(item.path) ? "white" : "rgba(255,255,255,.6)",
                background: location.pathname.startsWith(item.path) ? "rgba(255,255,255,.1)" : "transparent",
                textDecoration: "none", fontSize: 14, fontWeight: 500, marginBottom: 4, position: "relative",
              }}>
              <span>{item.icon}</span>
              <span>{item.label}</span>
              {item.label === "Contactos" && newContacts > 0 && (
                <span style={{ marginLeft: "auto", background: "#C0392B", borderRadius: 10, padding: "2px 8px", fontSize: 11, fontWeight: 700 }}>{newContacts}</span>
              )}
            </Link>
          ))}
        </nav>
        <div style={{ padding: "16px 12px", borderTop: "1px solid rgba(255,255,255,.1)" }}>
          <button onClick={() => { signOut(); navigate("/admin/login"); }}
            style={{ width: "100%", padding: "10px", background: "rgba(255,255,255,.1)", color: "rgba(255,255,255,.7)", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 500 }}>
            Cerrar sesión
          </button>
        </div>
      </aside>

      <div style={{ flex: 1, marginLeft: 0 }} className="admin-main">
        <header style={{ height: 60, background: "white", borderBottom: "1px solid #E8E8E8", display: "flex", alignItems: "center", padding: "0 24px", gap: 16, position: "sticky", top: 0, zIndex: 50 }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="admin-hamburger"
            style={{ background: "none", border: "1px solid #E8E8E8", borderRadius: 6, padding: "6px 10px", cursor: "pointer", fontSize: 18 }}>☰</button>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: "#1A1A2E", margin: 0 }}>{currentTitle}</h2>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: "#22C55E", fontWeight: 600 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22C55E", display: "inline-block", animation: "pulse 2s infinite" }} /> En vivo
            </span>
            <span style={{ fontSize: 12, color: "#888" }}>{user.email}</span>
          </div>
        </header>
        <main style={{ padding: 24, background: "#F5F5F5", minHeight: "calc(100vh - 60px)" }}>
          <Outlet />
        </main>
      </div>

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .4; } }
        @media (min-width: 901px) {
          .admin-sidebar { left: 0 !important; position: fixed !important; }
          .admin-main { margin-left: 240px !important; }
          .admin-hamburger { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default AdminLayout;
