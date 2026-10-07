import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import Icon, { type IconName } from "./Icon";
import { ppdbLink, whatsappUrl, type MenuLink } from "../data/navigation";
import { newsCategories } from "../data/news";
import logoSekolah from "../assets/images/logosmkpenus.png";
import logoPartner from "../assets/images/logofooter.webp";
import fotoTalentaVokasi from "../assets/images/TalentaVokasi.png";
import { SketchArrow, SketchBox, SketchSparks } from "./SketchFrame";

const brochureUrl = "https://images.lekar.co.id/file/pelita/infografis_pelita_nusantara.pdf";
const mapsQuery = "SMK+Plus+Pelita+Nusantara+Cibinong+Bogor";

const contacts: { icon: IconName; label: string; value: string; href?: string }[] = [
    { icon: "mail", label: "Email", value: "informasi@smkpluspnb.sch.id", href: "mailto:informasi@smkpluspnb.sch.id" },
    { icon: "phoneCall", label: "Telepon", value: "0812-1086-8958 / (021) 875-4321", href: "tel:081210868958" },
    { icon: "mapPin", label: "Alamat", value: "Gg. Olahraga No.20, Ciriung, Kec. Cibinong, Kabupaten Bogor, Jawa Barat 16918" },
];

const socials: { icon: IconName; label: string; href: string }[] = [
    { icon: "globe", label: "Website Resmi", href: "https://smkpluspnb.sch.id" },
    { icon: "instagram", label: "Instagram", href: "https://instagram.com/smkpelitanusantara" },
    { icon: "facebook", label: "Facebook", href: "https://facebook.com/smkpelitanusantara" },
    { icon: "whatsapp", label: "WhatsApp", href: whatsappUrl },
    { icon: "youtube", label: "YouTube", href: "https://youtube.com/@smkpelitanusantara" },
];

// Halaman PPDB ada di aplikasi terpisah, jadi ikut ppdbLink supaya cukup diganti di satu tempat
const mainLinks: MenuLink[] = [
    { label: "Formulir PPDB Online", href: ppdbLink.href, external: true },
    { label: "Detail Akomodasi & Asrama", href: `${ppdbLink.href}/akomodasi`, external: true },
    { label: "Daftar Pengumuman Seleksi", href: `${ppdbLink.href}/pengumuman`, external: true },
    { label: "Cek Status Pendaftar (NISN)", href: `${ppdbLink.href}/cek-status`, external: true },
    { label: "Profil Sekolah Resmi", href: "https://smkpluspnb.sch.id" },
];

// TODO: isi dengan URL aplikasi siswa
const studentApps: MenuLink[] = ["DigiYouth", "MyLms", "SiAkad", "Invert"].map((label) => ({ label, href: "#" }));

// ?kategori= bisa dibaca halaman /berita nanti untuk langsung memfilter
const newsLinks: MenuLink[] = newsCategories.map((category) => ({
    label: category,
    href: `/berita?kategori=${encodeURIComponent(category)}`,
}));

// TODO: angka masih statis, sambungkan ke penghitung pengunjung
const visitorStats = [
    { label: "Pengunjung Hari ini", value: "30" },
    { label: "Pengunjung Bulan ini", value: "1.596" },
    { label: "Pengunjung Tahun ini", value: "42.831" },
];

export default function Footer() {
    return(
        // "relative z-10" + background supaya menutupi video hero yang sticky (makanya jaraknya pakai padding, bukan margin)
        // text-left menimpa justify dari body untuk seluruh footer
        <footer className="relative z-10 bg-white pt-20 sm:pt-28 text-left">
            {/* Banner ajakan daftar: teks di kiri, foto siswa di kanan (di HP & tablet di bawah teks) */}
            <div className="px-6 mb-14">
                <div className="relative max-w-6xl mx-auto overflow-hidden rounded-4xl border border-white/10 bg-linear-135 from-brand-darkred to-brand-deepred p-8 sm:p-12 lg:p-14 text-white shadow-softpill">
                    {/* Dekorasi orbit di kanan atas: dua lingkaran coretan miring, di belakang teks & foto.
                        Sengaja tidak terlalu keluar dari banner supaya tetap cukup terlihat untuk mulai digambar. */}

                    <div className="relative grid gap-8 lg:grid-cols-2 lg:gap-6">
                        <div className="lg:self-center">
                            <p className="mb-3 text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-[#F5C2C7]">
                                Siap Menjadi Talenta Vokasi <SketchSparks tone="text-[#F5C2C7]">Terbaik?</SketchSparks>
                            </p>
                            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-[2rem] font-bold uppercase tracking-wide leading-snug text-white drop-shadow-sm text-left">
                                Langkah Nyata Membangun Masa Depan Gemilang Bersama SMK Plus Pelita Nusantara.
                            </h2>

                            <div className="mt-8 flex flex-wrap items-center gap-4">
                                <a
                                    href={whatsappUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-brand-signal to-brand-darkred px-7 py-3 text-sm font-bold text-white shadow-md shadow-brand-darkred/25 transition-all duration-200 hover:from-brand-warmred hover:to-brand-deepred active:scale-95"
                                >
                                    Hubungi CS PPDB
                                    <Icon name="phoneCall" className="w-4 h-4" />
                                </a>
                                <a
                                    href={brochureUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="group inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/30 px-7 py-3 text-sm font-semibold text-white transition-all hover:border-white hover:bg-white/10 active:scale-95"
                                >
                                    Unduh Brosur
                                    <SketchArrow className="w-7 h-3.5 transition-transform group-hover:translate-x-1" />
                                </a>
                            </div>
                        </div>

                        {/* Margin negatif = padding banner, supaya foto menempel ke tepi bawah banner (dan tepi kiri-kanan
                            di HP & tablet), jadi potongan tubuh siswa tidak kelihatan. Di desktop sisi kirinya tidak
                            menempel ke tepi, jadi dipudarkan. */}
                        <div className="relative self-end -mx-8 -mb-8 sm:-mx-12 sm:-mb-12 lg:ml-0 lg:-mr-14 lg:-mb-14">
                            {/* aspect 1326/588 = gambar asli (1326x748) tanpa 160px bagian atas, yang kosong dan
                                masih menyisakan bercak bekas hapus background */}
                            <img
                                src={fotoTalentaVokasi}
                                alt="Siswa SMK Plus Pelita Nusantara dari berbagai jurusan"
                                className="relative w-full aspect-1326/588 object-cover object-bottom lg:mask-[linear-gradient(to_right,transparent,black_12%)]"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t border-brand-ink/10 px-6 pt-16 pb-12 text-brand-ink">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
                    {/* Identitas sekolah, kontak, media sosial */}
                    <div className="lg:col-span-4 space-y-4">
                        <Link to="/" className="group flex w-fit items-center gap-3">
                            <img src={logoSekolah} alt="" className="h-12 w-12 shrink-0 object-contain transition-transform group-hover:scale-105" loading="lazy" />
                            <span className="flex flex-col">
                                <span className="font-display text-base font-bold uppercase tracking-wide leading-tight text-brand-ink transition-colors group-hover:text-brand-darkred">
                                    SMK PLUS PELITA NUSANTARA
                                </span>
                                <span className="mt-0.5 text-[10px] uppercase font-semibold tracking-wider text-brand-darkred">
                                    We Are Different
                                </span>
                            </span>
                        </Link>

                        <p className="max-w-sm text-xs sm:text-[13px] leading-relaxed text-brand-ink/75">
                            Bersama SMK Plus Pelita Nusantara, jadilah generasi tangguh, berakhlak, dan berwawasan teknologi vokasi unggul.
                        </p>

                        <address className="space-y-2.5 pt-1 text-xs not-italic text-brand-ink/80">
                            {contacts.map((contact) => (
                                <div key={contact.label} className="flex items-start gap-2.5">
                                    <Icon name={contact.icon} className="w-4 h-4 shrink-0 text-brand-signal" />
                                    {contact.href ? (
                                        <a href={contact.href} className="transition-colors hover:text-brand-darkred hover:underline">
                                            <span className="sr-only">{contact.label}: </span>
                                            {contact.value}
                                        </a>
                                    ) : (
                                        <p className="leading-snug">
                                            <span className="sr-only">{contact.label}: </span>
                                            {contact.value}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </address>

                        <ul className="flex items-center gap-4 pt-2" aria-label="Media sosial">
                            {socials.map((social) => (
                                <li key={social.label}>
                                    <a
                                        href={social.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label={social.label}
                                        title={social.label}
                                        className="block text-brand-signal transition-colors hover:text-brand-darkred"
                                    >
                                        <Icon name={social.icon} className="w-4 h-4" />
                                    </a>
                                </li>
                            ))}
                        </ul>

                        {/* Gambarnya punya ruang kosong lebar di atas & bawah, jadi ukurannya diatur dari lebar
                            (bukan h-8 seperti desain) supaya logo-logonya tetap terbaca */}
                        <img
                            src={logoPartner}
                            alt="Partner & kolaborator: Jagoan Hosting Infra Competition, Jagoan Hosting, Komdigi, Maspion IT, Garuda Spark Innovation Hub"
                            width={3727}
                            height={592}
                            className="h-auto w-full max-w-xs opacity-90 transition-opacity hover:opacity-100"
                            loading="lazy"
                        />

                        <p className="pt-2 text-[11px] sm:text-xs font-medium text-brand-ink/60">
                            Copyright &copy; {new Date().getFullYear()} All right reserved | PENUS
                        </p>
                    </div>

                    <div className="lg:col-span-2 space-y-6">
                        <FooterMenu title="Menu Utama" links={mainLinks} />
                        <FooterMenu title="Aplikasi Siswa" links={studentApps} />
                    </div>

                    <div className="lg:col-span-3 space-y-6">
                        <FooterMenu title="Berita Sekolah" links={newsLinks} />

                        <div>
                            <FooterHeading>Pengunjung Website</FooterHeading>
                            <dl className="mt-3.5 space-y-1.5 text-xs sm:text-[13px] text-brand-ink/75">
                                {visitorStats.map((stat) => (
                                    <div key={stat.label} className="flex gap-1">
                                        <dt>{stat.label} :</dt>
                                        <dd className="font-medium text-brand-ink">{stat.value}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>

                    <div className="lg:col-span-3">
                        <FooterHeading>Lokasi Sekolah</FooterHeading>

                        <div className="relative mt-3 h-55 w-full overflow-hidden rounded-card border border-brand-ink/15 shadow-sm">
                            <a
                                href={`https://maps.google.com/?q=${mapsQuery}`}
                                target="_blank"
                                rel="noreferrer"
                                className="absolute top-2.5 left-2.5 z-10 inline-flex items-center gap-1.5 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-blue-600 shadow-sm transition-all hover:bg-slate-50 hover:shadow-md"
                            >
                                Buka di Maps
                                <Icon name="externalLink" className="w-3.5 h-3.5" />
                            </a>

                            <iframe
                                title="Peta Lokasi SMK Plus Pelita Nusantara"
                                src={`https://maps.google.com/maps?q=${mapsQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                                className="h-full w-full border-0"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>

                        <p className="mt-3 text-[11px] leading-tight text-brand-ink/60">
                            Lokasi strategis dekat pusat pemerintahan Cibinong, Kabupaten Bogor.
                        </p>
                    </div>
                </div>

                {/* KHUSUS TESTING: jalan pintas ke panel admin supaya juri lomba bisa mencoba unggah berita, program,
                    & fasilitas. Hapus blok ini sebelum situs dipakai di production */}
                <div className="relative max-w-6xl mx-auto mt-12 flex flex-col gap-4 bg-brand-darkred/5 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <SketchBox tone="text-brand-darkred/50" />
                    <p role="note" className="text-xs sm:text-[13px] leading-relaxed text-brand-ink/70">
                        <span className="font-semibold text-brand-darkred">Khusus testing, bukan untuk production.</span>{" "}
                        Navigasi ke panel admin ini disediakan sementara agar juri dapat mencoba fitur pengelolaan
                        konten (unggah berita, program, dan fasilitas). Tautan ini akan dihapus saat situs dirilis resmi.
                    </p>
                    <Link
                        to="/admin"
                        className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-brand-darkred px-5 py-2.5 text-xs sm:text-sm font-semibold text-white transition-colors hover:bg-brand-deepred"
                    >
                        Buka Panel Admin
                        <SketchArrow className="w-6 h-3 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </footer>
    )
}

function FooterMenu({ title, links }: { title: string; links: MenuLink[] }) {
    return(
        <div>
            <FooterHeading>{title}</FooterHeading>
            <ul className="mt-3.5 space-y-2 text-xs sm:text-[13px] font-medium text-brand-ink/75">
                {links.map((link) => (
                    <li key={link.label}>
                        <FooterLink link={link} />
                    </li>
                ))}
            </ul>
        </div>
    )
}

function FooterHeading({ children }: { children: ReactNode }) {
    return(
        <h2 className="font-display text-sm sm:text-base font-bold uppercase tracking-wide text-brand-ink">
            {children}
        </h2>
    )
}

function FooterLink({ link }: { link: MenuLink }) {
    const className = "transition-colors hover:text-brand-darkred";

    // Situs lain dibuka di tab baru; "#" = link yang belum punya tujuan
    if (!link.href.startsWith("/")) {
        const otherSite = link.href.startsWith("http");
        return(
            <a
                href={link.href}
                target={otherSite ? "_blank" : undefined}
                rel={otherSite ? "noreferrer" : undefined}
                className={className}
            >
                {link.label}
            </a>
        )
    }

    return(
        <Link to={link.href} reloadDocument={link.external} className={className}>
            {link.label}
        </Link>
    )
}
