import fotoKepsek from "../assets/images/Kepsek.png";
import fotoKaprogMM from "../assets/images/majors/mm/kaprog.jpg";
import fotoKaprogRPL from "../assets/images/majors/rpl/kaprog.jpg";
import fotoKaprogTKJ from "../assets/images/majors/tkj/kaprog.jpg";
import fotoKaprogPKM from "../assets/images/majors/pkm/kaprog.jpg";
import fotoKaprogTOI from "../assets/images/majors/toi/kaprog.jpg";

export type Education = {
    level: string;  // jenjang, contoh: "S1", "S2", "D3"
    field: string;  // program studi, contoh: "Pendidikan Matematika"
    school: string; // nama kampus
    year: number;   // tahun lulus
};

export type Teacher = {
    id: string;     // dipakai di URL halaman profil: /profil-guru/ahmad-fauzi
    name: string;   // lengkap dengan gelar, contoh: "Drs. Ahmad Fauzi, M.Pd."
    role: string;   // jabatan atau mata pelajaran yang diampu
    major?: string; // kode jurusan (lihat data/majors.ts), kosongkan untuk guru mapel umum
    image?: string; // foto potret 4:5, contoh: import fotoBudi from "../assets/images/guru/budi.jpg"

    // Isi halaman profil guru. Semuanya boleh dikosongkan, bagian yang kosong tidak ditampilkan
    since?: number;            // tahun mulai mengajar di sekolah ini
    quote?: string;            // pesan singkat untuk siswa, tampil sebagai kutipan
    bio?: string[];            // paragraf "Profil Singkat"
    subjects?: string[];       // mata pelajaran / bidang yang diampu
    education?: Education[];   // riwayat pendidikan, urutkan dari yang terbaru
    certifications?: string[]; // sertifikasi & pelatihan

    dummy?: boolean; // isi profil masih contoh, halaman profil menampilkan keterangan "data contoh". Hapus setelah diisi data asli
};

// TODO: ganti dengan nama, jabatan, foto, & isi profil asli guru
// Pimpinan pertama (kepala sekolah) tampil paling atas di bagan, sisanya (maks. 4) berjajar di bawahnya
export const leaders: Teacher[] = [
    {
        id: "sri-mildawati",
        name: "Sri Mildawati, M.Pd.",
        role: "Kepala Sekolah",
        dummy: true,
        image: fotoKepsek,
        since: 2018,
        quote: "Keterampilan membuka pintu kerja, karakter yang membuat kalian dipercaya.",
        bio: [
            "Memimpin SMK Plus Pelita Nusantara sejak sekolah berdiri pada 2018. Sebelumnya beliau mengajar dan menjabat wakil kepala sekolah di beberapa SMK di Kabupaten Bogor selama lebih dari lima belas tahun.",
            "Di bawah kepemimpinannya, sekolah meraih akreditasi A, membuka lima kompetensi keahlian, dan menjalin kerja sama dengan lebih dari seratus mitra industri untuk PKL dan penyaluran kerja lulusan.",
        ],
        subjects: ["Manajemen Sekolah", "Kemitraan Industri", "Pembinaan Karakter"],
        education: [
            { level: "S2", field: "Manajemen Pendidikan", school: "Universitas Negeri Jakarta", year: 2006 },
            { level: "S1", field: "Pendidikan Teknik Elektro", school: "IKIP Jakarta", year: 1996 },
        ],
        certifications: ["Sertifikat Pendidik", "Diklat Calon Kepala Sekolah (LPPKS)", "Asesor Akreditasi BAN-PDM"],
    },
    {
        id: "euis-kurniasih",
        name: "Hj. Euis Kurniasih, M.Pd.",
        role: "Wakasek Bidang Kurikulum",
        dummy: true,
        since: 2018,
        quote: "Belajar itu bukan soal cepat, tapi soal tidak berhenti.",
        bio: [
            "Menyusun kurikulum operasional sekolah dan menyelaraskannya dengan kebutuhan dunia usaha dan industri bersama para kepala program. Beliau juga mengoordinasikan asesmen dan uji kompetensi keahlian setiap tahun.",
        ],
        subjects: ["Kurikulum Merdeka", "Asesmen Pembelajaran", "Bahasa Indonesia"],
        education: [
            { level: "S2", field: "Pengembangan Kurikulum", school: "Universitas Pendidikan Indonesia", year: 2012 },
            { level: "S1", field: "Pendidikan Bahasa Indonesia", school: "Universitas Pakuan", year: 2004 },
        ],
        certifications: ["Sertifikat Pendidik", "Fasilitator Kurikulum Merdeka"],
    },
    {
        id: "dadang-kurnia",
        name: "Dadang Kurnia, S.Pd.",
        role: "Wakasek Bidang Kesiswaan",
        dummy: true,
        since: 2018,
        quote: "Disiplin kecil setiap hari lebih kuat dari semangat besar sesekali.",
        bio: [
            "Membina OSIS, ekstrakurikuler, dan program pembiasaan karakter. Beliau juga menjadi penghubung utama sekolah dengan orang tua untuk urusan kedisiplinan dan perkembangan siswa.",
        ],
        subjects: ["Pembinaan OSIS", "Ekstrakurikuler", "PJOK"],
        education: [
            { level: "S1", field: "Pendidikan Jasmani", school: "Universitas Negeri Jakarta", year: 2009 },
        ],
        certifications: ["Sertifikat Pendidik", "Pembina Pramuka Mahir Lanjutan"],
    },
    {
        id: "bambang-hermawan",
        name: "Ir. Bambang Hermawan",
        role: "Wakasek Bidang Sarana Prasarana",
        dummy: true,
        since: 2019,
        quote: "Alat yang dirawat dengan baik akan mengajari banyak angkatan.",
        bio: [
            "Bertanggung jawab atas pengadaan dan perawatan ruang praktik, laboratorium, serta seluruh fasilitas sekolah. Pengalamannya belasan tahun di industri manufaktur membantu menjaga peralatan praktik tetap setara standar industri.",
        ],
        subjects: ["Manajemen Sarana Prasarana", "K3 Ruang Praktik", "Teknik Mesin"],
        education: [
            { level: "S1", field: "Teknik Mesin", school: "Institut Pertanian Bogor", year: 1998 },
        ],
        certifications: ["Ahli K3 Umum (Kemnaker)", "Manajemen Aset Sekolah"],
    },
    {
        id: "wulan-sari",
        name: "Wulan Sari, S.E., M.M.",
        role: "Wakasek Bidang Hubungan Industri",
        dummy: true,
        since: 2018,
        quote: "Mitra industri percaya pada sekolah karena alumninya bekerja dengan baik.",
        bio: [
            "Mengelola kerja sama dengan mitra industri, penempatan PKL, serta Bursa Kerja Khusus (BKK). Beliau memastikan setiap siswa mendapat tempat PKL yang sesuai dengan kompetensi keahliannya.",
        ],
        subjects: ["Kemitraan Industri", "Bursa Kerja Khusus", "Projek Kreatif & Kewirausahaan"],
        education: [
            { level: "S2", field: "Manajemen", school: "Universitas Pakuan", year: 2014 },
            { level: "S1", field: "Manajemen", school: "Universitas Pakuan", year: 2008 },
        ],
        certifications: ["Sertifikat Pendidik", "Pengelola BKK (Disnaker Jawa Barat)"],
    },
];

// TODO: ganti dengan data kepala program asli. Tampil di section Kepala Program, halaman jurusan, & profil guru
export const kaprogs: Teacher[] = [
    {
        id: "rizky-pratama",
        name: "Rizky Pratama, S.Ds.",
        role: "Kepala Program Multimedia",
        dummy: true,
        major: "MM",
        image: fotoKaprogMM,
        since: 2018,
        quote: "Desain yang bagus bukan yang paling ramai, tapi yang paling jelas pesannya.",
        bio: [
            "Memimpin program Multimedia dan mengajar desain grafis serta fotografi. Sebelum mengajar, beliau bekerja sebagai desainer di agensi periklanan di Jakarta.",
            "Beliau membawa banyak projek nyata dari klien ke kelas, sehingga siswa sudah terbiasa dengan brief dan revisi sebelum PKL.",
        ],
        subjects: ["Desain Grafis", "Fotografi", "Projek Kreatif"],
        education: [{ level: "S1", field: "Desain Komunikasi Visual", school: "Universitas Bina Nusantara", year: 2013 }],
        certifications: ["Adobe Certified Professional", "Asesor Kompetensi BNSP"],
    },
    {
        id: "fajar-nugroho",
        name: "Fajar Nugroho, S.Kom.",
        role: "Kepala Program RPL",
        dummy: true,
        major: "RPL",
        image: fotoKaprogRPL,
        since: 2018,
        quote: "Kode yang baik adalah kode yang bisa dibaca orang lain.",
        bio: [
            "Memimpin program Rekayasa Perangkat Lunak dan mengajar pemrograman berorientasi objek serta basis data. Beliau pernah bekerja sebagai backend developer di perusahaan rintisan teknologi finansial.",
            "Beliau juga membina Devacto RPL, tempat siswa mengerjakan aplikasi untuk kebutuhan sekolah dan UMKM sekitar.",
        ],
        subjects: ["Pemrograman Berorientasi Objek", "Basis Data", "Devacto RPL"],
        education: [{ level: "S1", field: "Teknik Informatika", school: "Universitas Pakuan", year: 2012 }],
        certifications: ["Oracle Certified Associate Java", "Asesor Kompetensi BNSP"],
    },
    {
        id: "budi-santoso",
        name: "Budi Santoso, S.T.",
        role: "Kepala Program TKJ",
        dummy: true,
        major: "TKJ",
        image: fotoKaprogTKJ,
        since: 2018,
        quote: "Jaringan yang rapi mencerminkan teknisi yang teliti.",
        bio: [
            "Memimpin program Teknik Komputer dan Jaringan serta mengajar administrasi jaringan dan fiber optik. Beliau berpengalaman sebagai teknisi jaringan di penyedia layanan internet sebelum bergabung dengan sekolah.",
        ],
        subjects: ["Administrasi Jaringan", "Fiber Optik", "MikroTik"],
        education: [{ level: "S1", field: "Teknik Elektro", school: "Universitas Pakuan", year: 2011 }],
        certifications: ["MikroTik Certified Network Associate (MTCNA)", "Cisco CCNA", "Asesor Kompetensi BNSP"],
    },
    {
        id: "maya-sari",
        name: "Maya Sari, S.E.",
        role: "Kepala Program PKM",
        dummy: true,
        major: "PKM",
        image: fotoKaprogPKM,
        since: 2018,
        quote: "Kepercayaan nasabah dibangun dari ketelitian hal-hal kecil.",
        bio: [
            "Memimpin program Perbankan dan Keuangan Mikro serta mengajar layanan perbankan dan koperasi. Beliau pernah bekerja sebagai customer service dan teller di bank daerah selama enam tahun.",
        ],
        subjects: ["Layanan Perbankan", "Koperasi & Lembaga Keuangan Mikro", "Bank Mini Sekolah"],
        education: [{ level: "S1", field: "Manajemen Keuangan", school: "Universitas Pakuan", year: 2010 }],
        certifications: ["Sertifikasi Profesi Perbankan (LSPP)", "Asesor Kompetensi BNSP"],
    },
    {
        id: "arif-rahman",
        name: "Arif Rahman, S.T.",
        role: "Kepala Program TOI",
        dummy: true,
        major: "TOI",
        image: fotoKaprogTOI,
        since: 2022,
        quote: "Otomasi bukan menggantikan manusia, tapi membuat kerja lebih aman dan tepat.",
        bio: [
            "Memimpin program Teknik Otomasi Industri dan mengajar sistem kontrol serta pneumatik. Beliau berpengalaman sebagai maintenance engineer di pabrik otomotif di Cikarang.",
        ],
        subjects: ["Sistem Kontrol", "Pneumatik & Hidrolik", "Mekatronika"],
        education: [{ level: "S1", field: "Teknik Elektro", school: "Universitas Trisakti", year: 2014 }],
        certifications: ["Siemens Mechatronic Systems Certification", "Asesor Kompetensi BNSP"],
    },
];

// Foto guru di assets/images/guru, dipanggil dengan nama filenya. Kalau nama file salah, kartu menampilkan inisial
const photos = import.meta.glob<string>("../assets/images/guru/*", { eager: true, import: "default" });
const photo = (file: string) => photos[`../assets/images/guru/${file}`];

// Isi profil CONTOH per mata pelajaran, supaya halaman profil guru tidak kosong selama data asli belum ada.
// Guru yang memakai contoh() otomatis ditandai dummy (halaman profilnya menampilkan keterangan "data contoh").
// TODO: ganti contoh("...", tahun) di daftar guru dengan data asli (role, major, since, quote, bio, subjects, education, certifications)
type ProfileTemplate = {
    role: string;
    major?: string;
    subjects: string[];
    bio: string;
    quotes: string[];       // dipakai bergantian supaya guru semapel tidak berkutipan sama persis
    education: Omit<Education, "school" | "year"> & { schools: string[] };
    certifications: string[];
};

const templates = {
    agama: {
        role: "Pendidikan Agama Islam",
        subjects: ["Pendidikan Agama Islam", "Budi Pekerti", "Pembina Rohis"],
        bio: "Mengampu Pendidikan Agama Islam dan Budi Pekerti, sekaligus mendampingi kegiatan keagamaan sekolah seperti tadarus pagi, salat berjamaah, dan peringatan hari besar Islam.",
        quotes: ["Ilmu yang bermanfaat adalah ilmu yang diamalkan.", "Akhlak yang baik adalah bekal terbaik di mana pun kalian bekerja."],
        education: { level: "S1", field: "Pendidikan Agama Islam", schools: ["UIN Syarif Hidayatullah Jakarta", "Universitas Ibn Khaldun Bogor"] },
        certifications: ["Sertifikat Pendidik"],
    },
    pancasila: {
        role: "Pendidikan Pancasila",
        subjects: ["Pendidikan Pancasila", "Pembina Debat"],
        bio: "Mengajar Pendidikan Pancasila lewat diskusi kasus nyata dan simulasi musyawarah, serta membimbing siswa dalam lomba debat dan cerdas cermat kebangsaan.",
        quotes: ["Jadilah warga negara yang kritis, tapi tetap santun.", "Perbedaan pendapat itu wajar, yang penting saling menghargai."],
        education: { level: "S1", field: "Pendidikan Pancasila dan Kewarganegaraan", schools: ["Universitas Pakuan", "Universitas Negeri Jakarta"] },
        certifications: ["Sertifikat Pendidik"],
    },
    indonesia: {
        role: "Bahasa Indonesia",
        subjects: ["Bahasa Indonesia", "Jurnalistik Sekolah"],
        bio: "Mengajar Bahasa Indonesia dengan fokus pada menulis laporan, surat lamaran, dan presentasi, keterampilan yang langsung terpakai saat PKL dan melamar kerja.",
        quotes: ["Tulisan yang baik lahir dari kebiasaan membaca.", "Bahasa yang rapi membuat ide kalian lebih mudah dipercaya."],
        education: { level: "S1", field: "Pendidikan Bahasa dan Sastra Indonesia", schools: ["Universitas Negeri Jakarta", "Universitas Pakuan"] },
        certifications: ["Sertifikat Pendidik"],
    },
    matematika: {
        role: "Matematika",
        subjects: ["Matematika", "Pembina OSN"],
        bio: "Mengajar Matematika terapan yang dikaitkan dengan kebutuhan tiap jurusan, mulai dari perhitungan keuangan hingga logika pemrograman.",
        quotes: ["Matematika bukan menghafal rumus, tapi melatih cara berpikir.", "Soal yang sulit selalu bisa dipecah jadi langkah-langkah kecil."],
        education: { level: "S1", field: "Pendidikan Matematika", schools: ["Universitas Pakuan", "Universitas Pendidikan Indonesia"] },
        certifications: ["Pendidikan Profesi Guru (PPG)"],
    },
    inggris: {
        role: "Bahasa Inggris",
        subjects: ["Bahasa Inggris", "English Club"],
        bio: "Mengajar Bahasa Inggris untuk komunikasi kerja, seperti wawancara, email profesional, dan presentasi produk, serta mendampingi kegiatan English Club.",
        quotes: ["Don't be afraid to make mistakes, be afraid of not trying.", "Practice a little every day, and you'll be surprised how far you go."],
        education: { level: "S1", field: "Pendidikan Bahasa Inggris", schools: ["Universitas Pendidikan Indonesia", "Universitas Indraprasta PGRI"] },
        certifications: ["Sertifikat Pendidik"],
    },
    sejarah: {
        role: "Sejarah",
        subjects: ["Sejarah Indonesia", "Wisata Sejarah"],
        bio: "Mengajar Sejarah dengan pendekatan cerita dan kunjungan museum, serta mengajak siswa mengenal sejarah lokal Bogor.",
        quotes: ["Bangsa yang besar adalah bangsa yang mengenal sejarahnya.", "Masa lalu mengajarkan kita cara melangkah ke depan."],
        education: { level: "S1", field: "Pendidikan Sejarah", schools: ["Universitas Negeri Jakarta", "Universitas Pakuan"] },
        certifications: ["Sertifikat Pendidik"],
    },
    informatika: {
        role: "Informatika",
        subjects: ["Informatika", "Literasi Digital"],
        bio: "Mengajar Informatika untuk kelas X, mulai dari berpikir komputasional, literasi digital, hingga dasar keamanan data.",
        quotes: ["Teknologi hanya alat, yang penting adalah cara kita memakainya.", "Berpikir runtut dulu, baru menulis kode."],
        education: { level: "S1", field: "Teknik Informatika", schools: ["Universitas Gunadarma", "Universitas Pakuan"] },
        certifications: ["Microsoft Office Specialist"],
    },
    pjok: {
        role: "Pendidikan Jasmani (PJOK)",
        subjects: ["PJOK", "Pembina Ekstrakurikuler Olahraga"],
        bio: "Mengajar PJOK dan membina ekstrakurikuler olahraga sekolah yang rutin mengikuti kejuaraan antar-SMK.",
        quotes: ["Badan yang sehat membuat pikiran lebih siap belajar.", "Sportif di lapangan, sportif juga di luar lapangan."],
        education: { level: "S1", field: "Pendidikan Jasmani, Kesehatan, dan Rekreasi", schools: ["Universitas Negeri Jakarta", "Universitas Pendidikan Indonesia"] },
        certifications: ["Sertifikat Pendidik"],
    },
    sunda: {
        role: "Bahasa Sunda",
        subjects: ["Bahasa Sunda", "Seni Tradisional"],
        bio: "Mengajar Bahasa Sunda sebagai muatan lokal dan membina kegiatan seni tradisional sekolah.",
        quotes: ["Ngamumule basa Sunda téh ngajaga jati diri urang.", "Budaya sendiri adalah kekuatan, bukan hal yang kuno."],
        education: { level: "S1", field: "Pendidikan Bahasa Daerah", schools: ["Universitas Pendidikan Indonesia", "Universitas Pakuan"] },
        certifications: ["Sertifikat Pendidik"],
    },
    bk: {
        role: "Bimbingan Konseling",
        subjects: ["Bimbingan Konseling", "Konseling Karier"],
        bio: "Mendampingi siswa dalam urusan pribadi, belajar, dan pilihan karier, termasuk konseling karier untuk siswa kelas XII.",
        quotes: ["Tidak apa-apa belum tahu mau jadi apa, yang penting mau mencari tahu.", "Bercerita bukan tanda lemah, tapi langkah pertama untuk bangkit."],
        education: { level: "S1", field: "Bimbingan dan Konseling", schools: ["Universitas Negeri Jakarta", "Universitas Indraprasta PGRI"] },
        certifications: ["Konselor Pendidikan"],
    },
    seni: {
        role: "Seni Budaya",
        subjects: ["Seni Budaya", "Pembina Paduan Suara"],
        bio: "Mengajar Seni Budaya yang meliputi seni rupa, musik, dan tari, serta membina paduan suara untuk acara-acara sekolah.",
        quotes: ["Seni melatih kepekaan, dan kepekaan membuat kita lebih manusiawi.", "Berkarya dulu, sempurna belakangan."],
        education: { level: "S1", field: "Pendidikan Seni", schools: ["Universitas Pendidikan Indonesia", "Universitas Negeri Jakarta"] },
        certifications: ["Sertifikat Pendidik"],
    },
    ipas: {
        role: "Projek IPAS",
        subjects: ["Projek IPAS", "Praktikum Sains"],
        bio: "Mengajar Projek IPAS lewat percobaan dan proyek sederhana, supaya siswa memahami konsep sains yang dekat dengan kehidupan sehari-hari.",
        quotes: ["Rasa ingin tahu adalah awal dari semua penemuan.", "Coba, amati, lalu simpulkan sendiri."],
        education: { level: "S1", field: "Pendidikan Biologi", schools: ["Universitas Pakuan", "IPB University"] },
        certifications: ["Sertifikat Pendidik"],
    },
    jepang: {
        role: "Bahasa Jepang",
        subjects: ["Bahasa Jepang", "Persiapan Magang Jepang"],
        bio: "Mengajar Bahasa Jepang dasar dan budaya kerja Jepang, serta mendampingi siswa yang bersiap mengikuti program magang ke luar negeri.",
        quotes: ["Ganbatte! Usaha kecil setiap hari membawa hasil besar.", "Disiplin dan sopan santun dihargai di mana pun kalian bekerja."],
        education: { level: "S1", field: "Pendidikan Bahasa Jepang", schools: ["Universitas Pendidikan Indonesia", "Universitas Negeri Jakarta"] },
        certifications: ["JLPT N3"],
    },
    pkk: {
        role: "Projek Kreatif & Kewirausahaan",
        subjects: ["Projek Kreatif & Kewirausahaan", "Pendampingan Usaha Siswa"],
        bio: "Mengajar Projek Kreatif dan Kewirausahaan, mendampingi siswa merancang produk, menghitung modal, hingga menjual hasil karyanya di bazar sekolah.",
        quotes: ["Mulai dari yang kecil, yang penting mulai.", "Gagal jualan hari ini adalah pelajaran untuk laku besok."],
        education: { level: "S1", field: "Manajemen", schools: ["Universitas Pakuan", "Universitas Djuanda"] },
        certifications: ["Pelatihan Kewirausahaan"],
    },

    // Guru produktif per jurusan
    mmDesain: {
        role: "Desain Grafis & Fotografi",
        major: "MM",
        subjects: ["Desain Grafis", "Fotografi", "Projek Kreatif"],
        bio: "Mengajar desain grafis dan fotografi dengan banyak praktik berbasis brief klien, sehingga siswa terbiasa dengan alur revisi sebelum PKL.",
        quotes: ["Desain yang bagus bukan yang paling ramai, tapi yang paling jelas pesannya.", "Kamera hanya alat, mata kalianlah yang memotret."],
        education: { level: "S1", field: "Desain Komunikasi Visual", schools: ["Universitas Bina Nusantara", "Universitas Pakuan"] },
        certifications: ["Adobe Certified Professional"],
    },
    mmVideo: {
        role: "Videografi & Animasi",
        major: "MM",
        subjects: ["Videografi", "Animasi 2D", "Editing Video"],
        bio: "Mengajar videografi, animasi 2D, dan penyuntingan video, serta membina tim produksi konten sekolah.",
        quotes: ["Setiap gambar bergerak dimulai dari satu sketsa di kertas.", "Cerita yang kuat lebih penting dari alat yang mahal."],
        education: { level: "S1", field: "Film dan Televisi", schools: ["Institut Kesenian Jakarta", "Universitas Bina Nusantara"] },
        certifications: ["Adobe Certified Professional: Premiere Pro"],
    },
    rplWeb: {
        role: "Pemrograman Web & Mobile",
        major: "RPL",
        subjects: ["Pemrograman Web", "Pemrograman Mobile", "Git & Kolaborasi"],
        bio: "Mengajar pemrograman web dan aplikasi mobile dengan alur kerja seperti di industri: desain antarmuka, Git, dan code review.",
        quotes: ["Bangun dulu yang sederhana, lalu perbaiki sedikit demi sedikit.", "Error itu teman, dia yang menunjukkan di mana kita perlu belajar."],
        education: { level: "S1", field: "Teknik Informatika", schools: ["Universitas Gunadarma", "Universitas Pakuan"] },
        certifications: ["Dicoding Front-End Web Developer"],
    },
    rplData: {
        role: "Basis Data & Pemrograman Berorientasi Objek",
        major: "RPL",
        subjects: ["Basis Data", "Pemrograman Berorientasi Objek"],
        bio: "Mengajar perancangan basis data dan pemrograman berorientasi objek, serta membimbing siswa mengerjakan aplikasi untuk kebutuhan sekolah.",
        quotes: ["Kode yang baik adalah kode yang bisa dibaca orang lain.", "Rancang datanya dengan benar, aplikasinya akan mengikuti."],
        education: { level: "S1", field: "Sistem Informasi", schools: ["Universitas Gunadarma", "Universitas Ibn Khaldun Bogor"] },
        certifications: ["Oracle Certified Associate Java"],
    },
    tkjJaringan: {
        role: "Administrasi Jaringan & Fiber Optik",
        major: "TKJ",
        subjects: ["Administrasi Jaringan", "Fiber Optik", "MikroTik"],
        bio: "Mengajar administrasi jaringan dan instalasi fiber optik, mulai dari konfigurasi router hingga penyambungan kabel di lapangan.",
        quotes: ["Jaringan yang rapi mencerminkan teknisi yang teliti.", "Cek kabelnya dulu, baru salahkan konfigurasinya."],
        education: { level: "S1", field: "Teknik Elektro", schools: ["Universitas Pakuan", "Universitas Ibn Khaldun Bogor"] },
        certifications: ["MikroTik Certified Network Associate (MTCNA)"],
    },
    tkjServer: {
        role: "Administrasi Server & Keamanan Jaringan",
        major: "TKJ",
        subjects: ["Administrasi Server", "Keamanan Jaringan", "Linux"],
        bio: "Mengajar administrasi server Linux, layanan jaringan, dan keamanan jaringan dasar, serta mengelola server praktik siswa.",
        quotes: ["Sebelum memperbaiki, pahami dulu kenapa bisa rusak.", "Keamanan bukan fitur tambahan, tapi kebiasaan."],
        education: { level: "S1", field: "Teknik Informatika", schools: ["Universitas Ibn Khaldun Bogor", "Universitas Gunadarma"] },
        certifications: ["Linux Essentials (LPI)"],
    },
    pkmBank: {
        role: "Layanan Perbankan",
        major: "PKM",
        subjects: ["Layanan Perbankan", "Bank Mini Sekolah", "Customer Service"],
        bio: "Mengajar layanan perbankan dan membimbing siswa praktik langsung sebagai teller dan customer service di Bank Mini sekolah.",
        quotes: ["Kepercayaan nasabah dibangun dari ketelitian hal-hal kecil.", "Senyum dan sikap ramah adalah layanan pertama yang dinilai nasabah."],
        education: { level: "S1", field: "Manajemen Keuangan dan Perbankan", schools: ["Universitas Pakuan", "Universitas Djuanda"] },
        certifications: ["Sertifikasi Profesi Perbankan (LSPP)"],
    },
    pkmAkuntansi: {
        role: "Akuntansi & Keuangan Mikro",
        major: "PKM",
        subjects: ["Akuntansi Keuangan", "Koperasi & Keuangan Mikro", "Aplikasi Akuntansi"],
        bio: "Mengajar akuntansi keuangan dan pengelolaan lembaga keuangan mikro, serta membimbing siswa mengelola pembukuan koperasi sekolah.",
        quotes: ["Angka tidak pernah bohong, asal dicatat dengan jujur.", "Rapi di pembukuan, tenang saat diperiksa."],
        education: { level: "S1", field: "Akuntansi", schools: ["Universitas Pakuan", "Universitas Indonesia"] },
        certifications: ["Brevet Pajak A & B"],
    },
    toiPlc: {
        role: "PLC & Sistem Kontrol",
        major: "TOI",
        subjects: ["Pemrograman PLC", "Sistem Kontrol", "Pneumatik"],
        bio: "Mengajar pemrograman PLC, sistem kontrol, dan pneumatik dengan modul praktik yang disusun bersama mitra industri.",
        quotes: ["Otomasi bukan menggantikan manusia, tapi membuat kerja lebih aman dan tepat.", "Mesin hanya menjalankan perintah, pastikan perintahnya benar."],
        education: { level: "S1", field: "Teknik Elektro", schools: ["Universitas Trisakti", "Universitas Pakuan"] },
        certifications: ["Teknisi PLC Siemens S7"],
    },
    toiListrik: {
        role: "Instalasi Listrik Industri",
        major: "TOI",
        subjects: ["Instalasi Listrik Industri", "K3 Kelistrikan", "Perawatan Mesin"],
        bio: "Mengajar instalasi listrik industri, perawatan mesin, dan K3 kelistrikan supaya siswa siap bekerja aman di lingkungan pabrik.",
        quotes: ["Keselamatan kerja selalu nomor satu, baru kecepatan.", "Teliti sebelum menyalakan, karena listrik tidak memberi kesempatan kedua."],
        education: { level: "D3", field: "Teknik Listrik", schools: ["Politeknik Negeri Jakarta", "Politeknik Negeri Bandung"] },
        certifications: ["Ahli K3 Listrik (Kemnaker)"],
    },
} satisfies Record<string, ProfileTemplate>;

// Berapa kali tiap contoh sudah dipakai, untuk menggilir kutipan, kampus, & tahun lulus
const templateUses: Record<string, number> = {};

// Isi profil contoh untuk satu guru. since = tahun mulai mengajar
function contoh(key: keyof typeof templates, since: number): Omit<Teacher, "id" | "name" | "image"> {
    const template: ProfileTemplate = templates[key];
    const n = (templateUses[key] = (templateUses[key] ?? -1) + 1);
    const { schools, ...education } = template.education;

    return {
        role: template.role,
        major: template.major,
        since,
        quote: template.quotes[n % template.quotes.length],
        bio: [template.bio],
        subjects: template.subjects,
        education: [{ ...education, school: schools[n % schools.length], year: since - 1 - (n % 3) }],
        certifications: template.certifications,
        dummy: true,
    };
}

// Daftar Guru. Isi profilnya masih contoh (lihat contoh() di atas)
export const teachers: Teacher[] = [
    { id: "abdul-choir", name: "Abdul Choir", image: photo("ABDUL CHOIR1255.jpg"), ...contoh("agama", 2018) },
    { id: "abdul-faddilah", name: "Abdul Faddilah", image: photo("Abdul Faddilah1326.jpg"), ...contoh("mmDesain", 2021) },
    { id: "aditya-faiztanta", name: "Aditya Faiztanta", image: photo("Aditya Faiztanta1439.jpg"), ...contoh("pancasila", 2024) },
    { id: "akbar-maulana", name: "Akbar Maulana", image: photo("Akbar Maulana 1413.jpg"), ...contoh("rplWeb", 2020) },
    { id: "alfi-hardian", name: "Alfi Hardian", image: photo("Alfi Hardian1336.jpg"), ...contoh("indonesia", 2023) },
    { id: "alvi-luviani", name: "Alvi Luviani", image: photo("Alvi Luviani1293.jpg"), ...contoh("tkjJaringan", 2019) },
    { id: "amirul-hadid-ramadan", name: "Amirul Hadid Ramadan", image: photo("Amirul Hadid Ramadan1376.jpg"), ...contoh("matematika", 2022) },
    { id: "anisah-dwi-rahayu", name: "Anisah Dwi Rahayu", image: photo("Anisah dwi rahayu1273.jpg"), ...contoh("pkmBank", 2018) },
    { id: "anita-lestari", name: "Anita Lestari", image: photo("Anita Lestari1351.jpg"), ...contoh("inggris", 2021) },
    { id: "annisa-febriyanti", name: "Annisa Febriyanti", image: photo("Annisa Febriyanti1312.jpg"), ...contoh("toiPlc", 2024) },
    { id: "ardi-sukma", name: "Ardi Sukma", image: photo("Ardi Sukma1406.jpg"), ...contoh("sejarah", 2020) },
    { id: "ari-zulfikar", name: "Ari Zulfikar", image: photo("Ari Zulfikar1322.jpg"), ...contoh("mmVideo", 2023) },
    { id: "ariska-dwi", name: "Ariska Dwi", image: photo("Ariska Dwi1358.jpg"), ...contoh("informatika", 2019) },
    { id: "arsal-huda-nurrahman", name: "Arsal Huda Nurrahman", image: photo("Arsal Huda Nurrahman1332.jpg"), ...contoh("rplData", 2022) },
    { id: "arya-rangga-putra", name: "Arya Rangga Putra", image: photo("Arya Rangga Putra1390.jpg"), ...contoh("pjok", 2018) },
    { id: "ashifa-ramadanty", name: "Ashifa Ramadanty", image: photo("Ashifa Ramadanty.jpg"), ...contoh("tkjServer", 2021) },
    { id: "asit-rahmah", name: "Asit Rahmah", image: photo("Asit Rahmah1393.jpg"), ...contoh("sunda", 2024) },
    { id: "dewi-ratnawati", name: "Dewi Ratnawati", image: photo("Dewi ratnawati1301.jpg"), ...contoh("pkmAkuntansi", 2020) },
    { id: "diana-rosita", name: "Diana Rosita", image: photo("Diana Rosita1306.jpg"), ...contoh("bk", 2023) },
    { id: "dimas-maulana-ishaq", name: "Dimas Maulana Ishaq", image: photo("Dimas Maulana Ishaq_3.jpg.jpeg"), ...contoh("toiListrik", 2019) },
    { id: "dita-wulandari", name: "Dita Wulandari", image: photo("Dita Wulandari1305.jpg"), ...contoh("seni", 2022) },
    { id: "erfan-bayu-saputra", name: "Erfan Bayu Saputra", image: photo("Erfan bayu Saputra.jpg"), ...contoh("mmDesain", 2018) },
    { id: "farida-awalia", name: "Farida Awalia", image: photo("Farida Awalia1318.jpg"), ...contoh("ipas", 2021) },
    { id: "fitri-rohmayasari", name: "Fitri Rohmayasari", image: photo("Fitri Rohmayasari1369.jpg"), ...contoh("rplWeb", 2024) },
    { id: "hanifan-nurfauzi", name: "Hanifan Nurfauzi", image: photo("Hanifan Nurfauzi1378.jpg"), ...contoh("jepang", 2020) },
    { id: "ika-sartika", name: "Ika Sartika", image: photo("Ika Sartika1316.jpg"), ...contoh("tkjJaringan", 2023) },
    { id: "indah-ramadhanty", name: "Indah Ramadhanty", image: photo("Indah Ramadhanty1372.jpg"), ...contoh("pkk", 2019) },
    { id: "indri-dara-dinanti", name: "Indri Dara Dinanti", image: photo("Indri Dara Dinanti1283.jpg"), ...contoh("pkmBank", 2022) },
    { id: "karti-suminar", name: "Karti Suminar", image: photo("Karti Suminar1423.jpg"), ...contoh("matematika", 2018) },
    { id: "luthfi-abdul-rahman", name: "Luthfi Abdul Rahman", image: photo("Luthfi Abdul Rahman1259.jpg"), ...contoh("toiPlc", 2021) },
    { id: "mieke-rahmawaty", name: "Mieke Rahmawaty", image: photo("Mieke Rahmawaty1361.jpg"), ...contoh("indonesia", 2024) },
    { id: "moestamah", name: "Moestamah", image: photo("MOESTAMAH1245.jpg"), ...contoh("mmVideo", 2020) },
    { id: "muhamad-adib", name: "Muhamad Adib", image: photo("Muhamad Adib1387.jpg"), ...contoh("inggris", 2023) },
    { id: "muhammad-ghufran", name: "Muhammad Ghufran", image: photo("Muhammad Ghufran 1357.jpg"), ...contoh("rplData", 2019) },
    { id: "muhammad-nurcholis-majid", name: "Muhammad Nurcholis Majid", image: photo("Muhammad Nurcholis Majid1410.jpg"), ...contoh("agama", 2022) },
    { id: "muzakir-zulkarnaen", name: "Muzakir Zulkarnaen", image: photo("Muzakir Zulkarnaen1401.jpg"), ...contoh("tkjServer", 2018) },
    { id: "nadela-annisa", name: "Nadela Annisa", image: photo("Nadela Annisa1286.jpg"), ...contoh("pjok", 2021) },
    { id: "nani-yuliawati", name: "Nani Yuliawati", image: photo("Nani Yuliawati1364.jpg"), ...contoh("pkmAkuntansi", 2024) },
    { id: "nitta-lestari", name: "Nitta Lestari", image: photo("Nitta Lestari1300.jpg"), ...contoh("bk", 2020) },
    { id: "nugrah-dwi-saptaji", name: "Nugrah Dwi Saptaji", image: photo("Nugrah Dwi Saptaji.jpg"), ...contoh("toiListrik", 2023) },
    { id: "nurulia-falah", name: "Nurulia Falah", image: photo("Nurulia Falah.jpg"), ...contoh("agama", 2019) },
    { id: "nurwahida-fitriani", name: "Nurwahida Fitriani", image: photo("Nurwahida Fitriani.jpg"), ...contoh("mmDesain", 2022) },
    { id: "nurwanti-ayu-mashita", name: "Nurwanti Ayu Mashita", image: photo("Nurwanti Ayu Mashita1526.jpg.jpeg"), ...contoh("pancasila", 2018) },
    { id: "putri-ngawirabaya", name: "Putri Ngawirabaya", image: photo("Putri Ngawirabaya.jpg"), ...contoh("rplWeb", 2021) },
    { id: "qurotta-umi-kulsum", name: "Qurotta Umi Kulsum", image: photo("Qurotta Umi Kulsum1433.jpg"), ...contoh("indonesia", 2024) },
    { id: "r-dodi-setiadi", name: "R. Dodi Setiadi", image: photo("R. Dodi Setiadi1425.jpg"), ...contoh("tkjJaringan", 2020) },
    { id: "rakhma-dhania", name: "Rakhma Dhania, S.Pd.", image: photo("Rakhma Dhania, S.Pd.jpg"), ...contoh("matematika", 2023) },
    { id: "reza-destri", name: "Reza Destri", image: photo("Reza destri1331.jpg"), ...contoh("pkmBank", 2019) },
    { id: "ridho-azzura", name: "Ridho Azzura", image: photo("Ridho Azzura1432.jpg"), ...contoh("inggris", 2022) },
    { id: "rizni-fauziah", name: "Rizni Fauziah, S.Tr.Akun.", image: photo("Rizni Fauziah, S.Tr.Akun.jpg"), ...contoh("toiPlc", 2018) },
    { id: "ryan-syhrul", name: "Ryan Syhrul", image: photo("RYAN SYHRUL1240.jpg"), ...contoh("sejarah", 2021) },
    { id: "salsa-nabila", name: "Salsa Nabila", image: photo("salsa nabila.jpg"), ...contoh("mmVideo", 2024) },
    { id: "sashi-kirana", name: "Sashi Kirana", image: photo("sashi kirana.jpg"), ...contoh("informatika", 2020) },
    { id: "septia-sundari", name: "Septia Sundari", image: photo("Septia Sundari.jpg"), ...contoh("rplData", 2023) },
    { id: "septianto-raharso", name: "Septianto Raharso", image: photo("Septianto Raharso.jpg"), ...contoh("pjok", 2019) },
    { id: "sholehudin-aditya", name: "Sholehudin Aditya", image: photo("Sholehudin Aditya1324.jpg"), ...contoh("tkjServer", 2022) },
    { id: "silfa-tsania", name: "Silfa Tsania", image: photo("Silfa Tsania.jpg"), ...contoh("sunda", 2018) },
    { id: "siti-kholifah", name: "Siti Kholifah", image: photo("Siti Kholifah1338.jpg"), ...contoh("pkmAkuntansi", 2021) },
    { id: "suci-romadhini", name: "Suci Romadhini", image: photo("Suci Romadhini.jpg"), ...contoh("bk", 2024) },
    { id: "sulthan-alawy-shihab", name: "Sulthan Alawy Shihab", image: photo("Sulthan Alawy Shihab.jpg"), ...contoh("toiListrik", 2020) },
    { id: "vivin-dwi-yudianto", name: "Vivin Dwi Yudianto", image: photo("Vivin Dwi Yudianto1383.jpg"), ...contoh("seni", 2023) },
    { id: "wilda-septiarini", name: "Wilda Septiarini", image: photo("Wilda Septiarini1269.jpg"), ...contoh("ipas", 2019) },
    { id: "yaumil-akbaria", name: "Yaumil Akbaria", image: photo("Yaumil Akbaria1342.jpg"), ...contoh("jepang", 2022) },
    { id: "yuliane-kasari", name: "Yuliane Kasari", image: photo("Yuliane Kasari1414.jpg"), ...contoh("pkk", 2018) },
];

export const allTeachers = [...leaders, ...kaprogs, ...teachers];

// Kepala program sebuah jurusan, dicari dari jabatannya ("Kepala Program ..."). Dipakai di halaman jurusan & Profil Guru
export const kaprogOf = (code: string) =>
    [...kaprogs, ...teachers].find((teacher) => teacher.major === code && teacher.role.startsWith("Kepala Program"));

// Label kelompok guru, tampil sebagai eyebrow di halaman profil.
// Guru yang mata pelajarannya belum diisi diberi label umum dulu supaya tidak salah kelompok
export function teacherGroup(teacher: Teacher) {
    if (leaders.includes(teacher)) return "Pimpinan Sekolah";
    if (teacher.major) return `Guru Produktif ${teacher.major}`;
    return teacher.subjects?.length ? "Guru Mata Pelajaran Umum" : "Tenaga Pendidik";
}
