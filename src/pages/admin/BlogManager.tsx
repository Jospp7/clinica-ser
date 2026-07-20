import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Pencil, RefreshCw, Trash2 } from "lucide-react";

const CATEGORIES = ["Alcoholismo", "Familia", "Drogadicción", "Rehabilitación", "Psicología", "Recaídas", "Sin categoría"];

const BlogManager = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterCat, setFilterCat] = useState("");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    let q = supabase.from("posts").select("*").order("created_at", { ascending: false });
    if (filterStatus) q = q.eq("status", filterStatus);
    if (filterCat) q = q.eq("category", filterCat);
    if (search) q = q.ilike("title", `%${search}%`);
    const { data, error } = await q;
    if (error) console.error("[BlogManager] load failed:", error);
    setPosts(data ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, [search, filterStatus, filterCat]);

  const toggleStatus = async (id: string, current: string) => {
    const { error } = await supabase.from("posts").update({ status: current === "published" ? "draft" : "published" }).eq("id", id);
    if (error) {
      console.error("[BlogManager] toggleStatus failed:", error);
      alert("No se pudo cambiar el status: " + error.message);
      return;
    }
    load();
  };

  const deletePost = async (id: string) => {
    if (!confirm("¿Eliminar este post?")) return;
    const { error } = await supabase.from("posts").delete().eq("id", id);
    if (error) {
      console.error("[BlogManager] deletePost failed:", error);
      alert("No se pudo eliminar el post: " + error.message);
      return;
    }
    load();
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1A1A2E", margin: 0 }}>Blog</h2>
        <Link to="/admin/blog/new" style={{ background: "#C8E64A", color: "#1A1A2E", padding: "10px 20px", borderRadius: 8, textDecoration: "none", fontSize: 13, fontWeight: 700 }}>+ Nuevo Post</Link>
      </div>

      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        <input placeholder="Buscar por título..." value={search} onChange={e => setSearch(e.target.value)}
          style={{ padding: "8px 14px", border: "1px solid #E8E8E8", borderRadius: 8, fontSize: 13, flex: 1, minWidth: 200 }} />
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
          style={{ padding: "8px 14px", border: "1px solid #E8E8E8", borderRadius: 8, fontSize: 13 }}>
          <option value="">Todos los status</option>
          <option value="draft">Borrador</option>
          <option value="published">Publicado</option>
        </select>
        <select value={filterCat} onChange={e => setFilterCat(e.target.value)}
          style={{ padding: "8px 14px", border: "1px solid #E8E8E8", borderRadius: 8, fontSize: 13 }}>
          <option value="">Todas las categorías</option>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div style={{ background: "white", borderRadius: 12, boxShadow: "0 1px 3px rgba(0,0,0,.06)", overflowX: "auto" }}>
        {loading ? <div style={{ padding: 40, textAlign: "center", color: "#888" }}>Cargando...</div> : (
          <table style={{ width: "100%", fontSize: 13, borderCollapse: "collapse" }}>
            <thead><tr style={{ borderBottom: "1px solid #E8E8E8", textAlign: "left" }}>
              <th style={{ padding: "12px 16px", fontWeight: 600, color: "#888" }}>Título</th>
              <th style={{ padding: "12px 16px", fontWeight: 600, color: "#888" }}>Categoría</th>
              <th style={{ padding: "12px 16px", fontWeight: 600, color: "#888" }}>Status</th>
              <th style={{ padding: "12px 16px", fontWeight: 600, color: "#888" }}>Vistas</th>
              <th style={{ padding: "12px 16px", fontWeight: 600, color: "#888" }}>Fecha</th>
              <th style={{ padding: "12px 16px", fontWeight: 600, color: "#888" }}>Acciones</th>
            </tr></thead>
            <tbody>
              {posts.map(p => (
                <tr key={p.id} style={{ borderBottom: "1px solid #f5f5f5" }}>
                  <td style={{ padding: "12px 16px", fontWeight: 500 }}>{p.title}</td>
                  <td style={{ padding: "12px 16px" }}>{p.category || "—"}</td>
                  <td style={{ padding: "12px 16px" }}>
                    <span style={{ background: p.status === "published" ? "#22C55E" : "#888", color: "white", padding: "2px 10px", borderRadius: 10, fontSize: 11, fontWeight: 600 }}>{p.status === "published" ? "Publicado" : "Borrador"}</span>
                  </td>
                  <td style={{ padding: "12px 16px" }}>{p.views}</td>
                  <td style={{ padding: "12px 16px", color: "#888" }}>{new Date(p.created_at).toLocaleDateString()}</td>
                  <td style={{ padding: "12px 16px", display: "flex", gap: 8 }}>
                    <Link to={`/admin/blog/edit/${p.id}`} style={{ textDecoration: "none", color: "#1A1A2E", display: "inline-flex", alignItems: "center" }} title="Editar" aria-label="Editar">
                      <Pencil size={16} aria-hidden="true" />
                    </Link>
                    <button onClick={() => toggleStatus(p.id, p.status)} style={{ background: "none", border: "none", cursor: "pointer", color: "#1A1A2E", display: "inline-flex", alignItems: "center" }} title="Cambiar status" aria-label="Cambiar status">
                      <RefreshCw size={16} aria-hidden="true" />
                    </button>
                    <button onClick={() => deletePost(p.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#1A1A2E", display: "inline-flex", alignItems: "center" }} title="Eliminar" aria-label="Eliminar">
                      <Trash2 size={16} aria-hidden="true" />
                    </button>
                  </td>
                </tr>
              ))}
              {posts.length === 0 && <tr><td colSpan={6} style={{ padding: 40, textAlign: "center", color: "#888" }}>No hay posts</td></tr>}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default BlogManager;
