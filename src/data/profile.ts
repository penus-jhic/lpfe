import type { IconName } from "../components/Icon";
import { majors } from "./majors";

// Data resmi dari Data Pokok Pendidikan (Dapodik) lewat smk.sch.id/sekolah/69978524.
// Angka di bawah ini data semester ganjil 2025/2026, perbarui setiap semester.
export const dataSource = "Data Pokok Pendidikan (Dapodik), semester ganjil 2025/2026";

export const visi =
    "Menjadi Sekolah Menengah Kejuruan Unggulan yang menghasilkan sumber daya manusia yang Terampil, Entrepreneur, dan Religius untuk memenuhi kebutuhan industri dan masyarakat.";

export const misi = [
    "Mengelola sekolah secara profesional.",
    "Meningkatkan kuantitas dan kualitas sarana pendukung pembelajaran yang representatif.",
    "Meningkatkan dan mengembangkan kompetensi pendidikan dan tenaga kependidikan yang berkelanjutan.",
    "Menggunakan pendekatan pembelajaran modern.",
    "Mengembangkan keterampilan peserta didik yang relevan dengan kebutuhan dunia usaha dan industri.",
    "Menumbuhkan jiwa entrepreneurship kepada peserta didik.",
    "Menanamkan nilai-nilai iman dan takwa kepada Tuhan Yang Maha Esa bagi seluruh warga sekolah, dan menampilkannya dalam segala aspek kegiatan.",
    "Menanamkan disiplin melalui budaya sekolah.",
];

// Misi yang tampil di beranda: tiga yang paling mencerminkan visi (Terampil, Entrepreneur, Religius).
// Daftar lengkap tetap tampil di halaman Tentang Kami.
export const misiHighlights = [misi[4], misi[5], misi[6]];

// Angka utama yang tampil di hero halaman profil
export const highlights = [
    { value: "2018", label: "Tahun berdiri" },
    { value: "A", label: "Akreditasi" },
    { value: "1.048", label: "Peserta didik" },
    { value: String(majors.length), label: "Kompetensi keahlian" },
];

export type Milestone = {
    date: string;     // teks yang tampil
    dateTime: string; // format ISO untuk <time>, boleh hanya tahun
    title: string;
    desc: string;
    icon: IconName;
};

// TODO: lengkapi dengan cerita dari yayasan, misalnya angkatan pertama, lulusan pertama, dan prestasi penting
export const history: Milestone[] = [
    {
        date: "11 April 2018",
        dateTime: "2018-04-11",
        title: "Resmi Didirikan",
        desc: "Yayasan Pelita Nusantara Bogor mendirikan SMK Plus Pelita Nusantara di Ciriung, Cibinong, dengan SK Pendirian No. 503/7765-BPSMK.",
        icon: "flag",
    },
    {
        date: "5 Juli 2018",
        dateTime: "2018-07-05",
        title: "Izin Operasional Terbit",
        desc: "Sekolah menerima izin operasional No. 421.9/Kep. 14/I/SMK-DPMPTSP/VII/2018 dan resmi beroperasi sebagai SMK swasta.",
        icon: "check",
    },
    {
        date: "12 Desember 2019",
        dateTime: "2019-12-12",
        title: "Terakreditasi A",
        desc: "Kurang dari dua tahun setelah berdiri, sekolah meraih akreditasi A dari BAN-S/M dengan SK No. 1442/BAN-SM/SK/2019.",
        icon: "award",
    },
    {
        date: "2024",
        dateTime: "2024",
        title: "Akreditasi A Dipertahankan",
        desc: "Akreditasi A kembali diraih dari BAN-PDM dengan SK No. 104/BAN-PDM/SK/2024 dan berlaku hingga 2029.",
        icon: "shield",
    },
    {
        date: "2025/2026",
        dateTime: "2025",
        title: "Lebih dari 1.000 Siswa",
        desc: "Kini sekolah membina 1.089 peserta didik dalam 32 rombongan belajar, didampingi 51 guru.",
        icon: "users",
    },
];

export const identity: { label: string; value: string }[] = [
    { label: "Nama Sekolah", value: "SMK Plus Pelita Nusantara" },
    { label: "NPSN", value: "69978524" },
    { label: "Status", value: "Swasta" },
    { label: "Penyelenggara", value: "Yayasan Pelita Nusantara Bogor" },
    { label: "Pimpinan Yayasan", value: "Dr. Aidawati, M.Pd." },
    { label: "SK Pendirian", value: "503/7765-BPSMK, 11 April 2018" },
    { label: "Izin Operasional", value: "421.9/Kep. 14/I/SMK-DPMPTSP/VII/2018, 5 Juli 2018" },
    { label: "Akreditasi", value: "A, SK 104/BAN-PDM/SK/2024 (berlaku 2024–2029)" },
];

export const facts = [
    { value: "32", label: "Rombongan belajar" },
    { value: "51", label: "Guru" },
    { value: "32", label: "Ruang kelas" },
    { value: "4", label: "Laboratorium" }, // 2 lab komputer, 1 lab bahasa, 1 lab IPA
    { value: "1", label: "Perpustakaan" },
    { value: "4.062 m²", label: "Luas lahan" },
];
