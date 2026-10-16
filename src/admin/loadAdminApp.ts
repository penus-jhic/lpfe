// Kode panel admin dipisah dari situs utama. Fungsi ini dipakai React.lazy di routes, dan juga dipanggil lebih awal
// saat kursor/fokus mendarat di tombol Dasbor, supaya kodenya sudah terunduh begitu tombolnya diklik.
// import() yang sama hanya mengunduh sekali, jadi aman dipanggil berkali-kali.
export const loadAdminApp = () => import("./AdminApp");
