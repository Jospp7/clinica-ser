import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import IntroMask from "@/components/IntroMask";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Index from "./pages/Index.tsx";
import Tratamiento from "./pages/Tratamiento.tsx";
import InstalacionesPage from "./pages/InstalacionesPage.tsx";
import Padecimientos from "./pages/Padecimientos.tsx";
import Blog from "./pages/Blog.tsx";
import GuiaIngreso from "./pages/GuiaIngreso.tsx";
import GuiaIntervencion from "./pages/GuiaIntervencion.tsx";
import PorQueElegirnos from "./pages/PorQueElegirnos.tsx";
import Equipo from "./pages/Equipo.tsx";
import NotFound from "./pages/NotFound.tsx";
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
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/tratamiento" element={<Tratamiento />} />
      <Route path="/instalaciones" element={<InstalacionesPage />} />
      <Route path="/padecimientos" element={<Padecimientos />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/guia-ingreso" element={<GuiaIngreso />} />
      <Route path="/guia-intervencion" element={<GuiaIntervencion />} />
      <Route path="/por-que-elegirnos" element={<PorQueElegirnos />} />
      <Route path="/equipo" element={<Equipo />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  const [introDone, setIntroDone] = useState(
    () => Boolean(sessionStorage.getItem("ser_intro_done"))
  );

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
