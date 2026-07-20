import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const CATEGORIES = ["Alcoholismo", "Familia", "Drogadicción", "Rehabilitación", "Psicología", "Recaídas", "Sin categoría"];

function slugify(text: string) {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

const BlogEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [author, setAuthor] = useState("Equipo SER");
  const [content, setContent] = useState("");
  const [tab, setTab] = useState<"write" | "preview">("write");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (id) {
      supabase.from("posts").select("*").eq("id", id).single().then(({ data, error }) => {
        if (error) {
          console.error("[BlogEditor] load failed:", error);
          alert("No se pudo cargar el post: " + error.message);
          return;
        }
        if (data) {
          setTitle(data.title); setSlug(data.slug); setCategory(data.category ?? "");
          setExcerpt(data.excerpt ?? ""); setCoverImage(data.cover_image ?? "");
          setAuthor(data.author ?? "Equipo SER"); setContent(data.content ?? "");
        }
      });
    }
  }, [id]);

  const handleTitleChange = (v: string) => {
    setTitle(v);
    if (!isEdit) setSlug(slugify(v));
  };

  const save = async (status: string) => {
    if (!title.trim() || !slug.trim()) return alert("Título y slug son requeridos");
    setSaving(true);
    const payload = { title, slug, category: category || null, excerpt: excerpt || null, cover_image: coverImage || null, author, content: content || null, status };

    try {
      const { error } = isEdit
        ? await supabase.from("posts").update(payload).eq("id", id)
        : await supabase.from("posts").insert(payload);
      setSaving(false);
      if (error) {
        console.error("[BlogEditor] save failed:", error);
        alert("No se pudo guardar el post: " + error.message);
        return;
      }
      navigate("/admin/blog");
    } catch (err: any) {
      console.error("[BlogEditor] save threw:", err);
      setSaving(false);
      alert("No se pudo guardar el post: " + (err?.message ?? "error desconocido"));
    }
  };

  const inputStyle = { width: "100%", padding: "10px 14px", border: "1px solid #E8E8E8", borderRadius: 8, fontSize: 14, boxSizing: "border-box" as const };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1A1A2E", margin: 0 }}>{isEdit ? "Editar Post" : "Nuevo Post"}</h2>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => save("draft")} disabled={saving}
            style={{ padding: "10px 20px", background: "#888", color: "white", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
            Guardar borrador
          </button>
          <button onClick={() => save("published")} disabled={saving}
            style={{ padding: "10px 20px", background: "#C8E64A", color: "#1A1A2E", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
            Publicar
          </button>
        </div>
      </div>

      <div style={{ background: "white", borderRadius: 12, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,.06)" }}>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: "#888", display: "block", marginBottom: 4 }}>Título</label>
          <input value={title} onChange={e => handleTitleChange(e.target.value)} style={{ ...inputStyle, fontSize: 20, fontWeight: 700 }} placeholder="Título del artículo" />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: "#888", display: "block", marginBottom: 4 }}>Slug</label>
          <input value={slug} onChange={e => setSlug(e.target.value)} style={inputStyle} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#888", display: "block", marginBottom: 4 }}>Categoría</label>
            <select value={category} onChange={e => setCategory(e.target.value)} style={inputStyle}>
              <option value="">Sin categoría</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#888", display: "block", marginBottom: 4 }}>Autor</label>
            <input value={author} onChange={e => setAuthor(e.target.value)} style={inputStyle} />
          </div>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: "#888", display: "block", marginBottom: 4 }}>Extracto</label>
          <textarea value={excerpt} onChange={e => setExcerpt(e.target.value)} rows={2} style={{ ...inputStyle, resize: "vertical" }} placeholder="Resumen breve del artículo" />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: "#888", display: "block", marginBottom: 4 }}>Imagen de portada (URL)</label>
          <input value={coverImage} onChange={e => setCoverImage(e.target.value)} style={inputStyle} placeholder="https://..." />
          {coverImage && <img src={coverImage} alt="Preview" style={{ marginTop: 8, maxHeight: 160, borderRadius: 8, objectFit: "cover" }} />}
        </div>
        <div>
          <div style={{ display: "flex", gap: 0, marginBottom: 8 }}>
            <button onClick={() => setTab("write")} style={{ padding: "8px 20px", background: tab === "write" ? "#1A1A2E" : "#f5f5f5", color: tab === "write" ? "white" : "#888", border: "none", borderRadius: "8px 0 0 8px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Escribir</button>
            <button onClick={() => setTab("preview")} style={{ padding: "8px 20px", background: tab === "preview" ? "#1A1A2E" : "#f5f5f5", color: tab === "preview" ? "white" : "#888", border: "none", borderRadius: "0 8px 8px 0", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Vista previa</button>
          </div>
          {tab === "write" ? (
            <textarea value={content} onChange={e => setContent(e.target.value)} rows={16} style={{ ...inputStyle, fontFamily: "monospace", fontSize: 13, resize: "vertical" }} placeholder="Escribe el contenido HTML aquí..." />
          ) : (
            <div style={{ ...inputStyle, minHeight: 300, background: "#fafafa", overflow: "auto" }} dangerouslySetInnerHTML={{ __html: content }} />
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogEditor;
