import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { usePageTracking } from "@/hooks/useTracking";
import IntroMask from "@/components/IntroMask";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Index from "./pages/Index.tsx";
import Blog from "./pages/Blog.tsx";
import BlogPost from "./pages/BlogPost.tsx";
import GuiaIngreso from "./pages/GuiaIngreso.tsx";
import Equipo from "./pages/Equipo.tsx";
import GuiaIntervencion from "./pages/GuiaIntervencion.tsx";
import PreguntasFrecuentes from "./pages/PreguntasFrecuentes.tsx";
import AvisoPrivacidad from "./pages/AvisoPrivacidad.tsx";
import LegacySlugRedirect from "./pages/LegacySlugRedirect.tsx";
import Login from "./pages/admin/Login.tsx";
import AdminLayout from "./pages/admin/AdminLayout.tsx";
import Dashboard from "./pages/admin/Dashboard.tsx";
import BlogManager from "./pages/admin/BlogManager.tsx";
import BlogEditor from "./pages/admin/BlogEditor.tsx";
import Contacts from "./pages/admin/Contacts.tsx";
import Analytics from "./pages/admin/Analytics.tsx";

const queryClient = new QueryClient();

const AppContent = () => {
  useScrollReveal();
  usePageTracking();
  useScrollToTop();
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/padecimientos" element={<Navigate to="/#programas" replace />} />
      <Route path="/por-que-elegirnos" element={<Navigate to="/#por-que-elegirnos" replace />} />
      <Route path="/programas" element={<Navigate to="/#programas" replace />} />
      <Route path="/tratamiento" element={<Navigate to="/#tratamiento" replace />} />
      <Route path="/instalaciones" element={<Navigate to="/#instalaciones" replace />} />
      <Route path="/guias" element={<Navigate to="/#guias" replace />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
      <Route path="/guia-ingreso" element={<GuiaIngreso />} />
      <Route path="/guia-intervencion" element={<GuiaIntervencion />} />
      <Route path="/equipo" element={<Equipo />} />
      <Route path="/preguntas-frecuentes" element={<PreguntasFrecuentes />} />
      <Route path="/aviso-privacidad" element={<AvisoPrivacidad />} />
      {/* Catch-all al final: redirige slugs heredados de WordPress a /blog/[slug] */}
      <Route path="*" element={<LegacySlugRedirect />} />
    </Routes>
  );
};

const App = () => {
  const [introDone, setIntroDone] = useState(() => {
    if (window.location.hash) {
      sessionStorage.setItem("ser_intro_done", "1");
      return true;
    }
    return Boolean(sessionStorage.getItem("ser_intro_done"));
  });

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="blog" element={<BlogManager />} />
              <Route path="blog/new" element={<BlogEditor />} />
              <Route path="blog/edit/:id" element={<BlogEditor />} />
              <Route path="contacts" element={<Contacts />} />
              <Route path="analytics" element={<Analytics />} />
            </Route>
            <Route
              path="*"
              element={
                <>
                  {!introDone && <IntroMask onComplete={() => setIntroDone(true)} />}
                  <div style={{ opacity: introDone ? 1 : 0, transition: "opacity 0.3s ease" }}>
                    <Navbar />
                    <AppContent />
                    <Footer />
                    <WhatsAppButton />
                  </div>
                </>
              }
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
