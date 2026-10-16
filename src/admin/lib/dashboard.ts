import type { News } from "../../data/news";

// Ringkasan dari GET /admin/dashboard. Dipakai halaman Dashboard dan lonceng notifikasi di AdminLayout
// (path sama, jadi datanya diambil sekali lewat cache useApi)
export const dashboardPath = "/admin/dashboard";

export type DashboardSummary = {
    news: { total: number; published: number; scheduled: number; draft: number };
    programs: number;
    facilities: number;
    recent_news: News[];
};
