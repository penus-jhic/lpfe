import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import AdminLoadingScreen from "../admin/components/AdminLoadingScreen";
import { loadAdminApp } from "../admin/loadAdminApp";

// Beranda dimuat langsung. Halaman lain dipecah per halaman & baru diunduh saat dibuka,
// supaya kunjungan pertama ke beranda tidak ikut mengunduh kode seluruh situs
const About = lazy(() => import("../pages/about/About"));
const MajorDetail = lazy(() => import("../pages/majors/MajorDetail"));
const Teachers = lazy(() => import("../pages/teachers/Teachers"));
const TeacherDetail = lazy(() => import("../pages/teachers/TeacherDetail"));
const Facilities = lazy(() => import("../pages/facilities/Facilities"));
const News = lazy(() => import("../pages/news/News"));
const NewsDetail = lazy(() => import("../pages/news/NewsDetail"));
const ProgramDetail = lazy(() => import("../pages/programs/ProgramDetail"));
const Activities = lazy(() => import("../pages/activities/Activities"));
const ActivityDetail = lazy(() => import("../pages/activities/ActivityDetail"));
const LoginPage = lazy(() => import("../pages/login/LoginPage"));
const NotFound = lazy(() => import("../pages/notfound/NotFound"));

// Panel admin dimuat terpisah, jadi pengunjung situs tidak ikut mengunduh kodenya
const AdminApp = lazy(loadAdminApp);

export default function AppRoutes() {
  return (
    // Selama kode halaman diunduh (biasanya sekejap) tampil latar gelap seperti hero tiap halaman
    <Suspense fallback={<div className="min-h-svh bg-brand-ink" />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tentang" element={<About />} />
        <Route path="/profil-guru" element={<Teachers />} />
        <Route path="/profil-guru/:id" element={<TeacherDetail />} />
        <Route path="/fasilitas" element={<Facilities />} />
        <Route path="/jurusan/:slug" element={<MajorDetail />} />
        <Route path="/berita" element={<News />} />
        <Route path="/berita/:slug" element={<NewsDetail />} />
        <Route path="/program/:slug" element={<ProgramDetail />} />
        <Route path="/kegiatan" element={<Activities />} />
        <Route path="/kegiatan/:slug" element={<ActivityDetail />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/admin/*"
          element={
            <Suspense fallback={<AdminLoadingScreen />}>
              <AdminApp />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
