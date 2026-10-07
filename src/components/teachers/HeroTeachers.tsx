import { Link } from "react-router-dom";
import { SketchArrow, SketchBox, SketchSparks, SketchUnderline } from "../SketchFrame";
import { allTeachers } from "../../data/teachers";
import { majors } from "../../data/majors";
import fotoGedung from "../../assets/images/fotogedung.jpg";

const chevron = (
    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m9 6 6 6-6 6" />
    </svg>
);

// Dihitung dari data, jadi otomatis ikut berubah saat data guru diganti
const stats = [
    { label: "Tenaga Pendidik", value: allTeachers.length },
    { label: "Guru Produktif", value: allTeachers.filter((teacher) => teacher.major).length },
    { label: "Kompetensi Keahlian", value: majors.length },
];

export default function HeroTeachers() {
    const scrollToSection = (id: string) => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    };

    return(
        <section className="relative overflow-hidden bg-brand-ink text-white px-6 pt-36 pb-28 md:pt-40 md:pb-32">
            {/* Foto gedung sekolah sebagai latar, diblur tipis seperti hero jurusan.
                scale-105 supaya tepi blur yang memudar tidak terlihat di pinggir section */}
            <img
                src={fotoGedung}
                alt=""
                className="absolute inset-0 size-full object-cover scale-105 blur-xs"
            />
            {/* Lapisan gelap + gradasi merah di kanan atas supaya tulisan tetap terbaca di atas foto */}
            <div aria-hidden="true" className="absolute inset-0 bg-brand-ink/75" />
            <div aria-hidden="true" className="absolute inset-0 bg-radial-[ellipse_at_top_right] from-brand-deepred/70 to-transparent to-65%" />

            {/* Dekorasi titik-titik */}
            <div aria-hidden="true" className="pointer-events-none absolute left-6 bottom-20 hidden md:block w-40 h-28 bg-[radial-gradient(circle,rgb(255_255_255/0.1)_2px,transparent_2.5px)] bg-size-[22px_22px]" />

            <div className="relative max-w-6xl mx-auto">
                <div className="animate-fade-up">
                    <nav aria-label="Breadcrumb">
                        <ol className="flex flex-wrap items-center gap-2 text-sm text-brand-mist/60">
                            <li>
                                <Link to="/" className="transition-colors hover:text-white">Beranda</Link>
                            </li>
                            <li className="flex items-center gap-2">
                                {chevron}
                                Profil
                            </li>
                            <li className="flex items-center gap-2">
                                {chevron}
                                <span aria-current="page" className="font-medium text-white">Profil Guru</span>
                            </li>
                        </ol>
                    </nav>

                    <p className="mt-8 text-xs sm:text-sm md:text-base uppercase tracking-[0.25em] font-semibold text-brand-mist/80">
                        <SketchSparks tone="text-brand-warmred">Guru &amp; Pimpinan</SketchSparks>
                    </p>
                    <h1 className="mt-3 font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold uppercase tracking-wide leading-none">
                        <span className="block text-brand-warmred">Profil</span>
                        {/* Coretan hanya di satu kata, sama seperti hero Fasilitas. delay: mulai setelah teks selesai muncul */}
                        <span className="block">
                            <SketchUnderline size="lg" tone="text-brand-signal" delay={500}>Guru</SketchUnderline>
                        </span>
                    </h1>

                    {/* mt-8 md:mt-10: memberi ruang untuk garis coretan yang menggantung di bawah judul */}
                    <p className="mt-8 md:mt-10 max-w-xl text-base md:text-lg leading-relaxed text-brand-mist/80">
                        Kenali para pendidik yang membimbing siswa SMK Plus Pelita Nusantara, mulai dari pimpinan
                        sekolah, guru mata pelajaran umum, hingga guru produktif di setiap kompetensi keahlian.
                    </p>

                    <div className="mt-10 flex flex-wrap gap-3">
                        <button
                            type="button"
                            onClick={() => scrollToSection("daftar-guru")}
                            className="group inline-flex items-center gap-3 rounded-full bg-linear-to-r from-brand-signal to-brand-darkred px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-brand-darkred/30 transition-transform hover:-translate-y-0.5"
                        >
                            Cari Guru
                            <SketchArrow direction="down" className="w-3 h-6 -my-0.5 transition-transform group-hover:translate-y-0.5" />
                        </button>
                        <button
                            type="button"
                            onClick={() => scrollToSection("pimpinan")}
                            className="inline-flex items-center rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                        >
                            Pimpinan Sekolah
                        </button>
                    </div>

                    {/* gap-6: ujung bingkai coretan kebablasan ±8px, jadi kotak bersebelahan tidak saling tabrak.
                        text-left: kotak sempit, label yang terbungkus jadi renggang kalau ikut justify dari body */}
                    <dl className="mt-14 grid max-w-xl grid-cols-3 gap-6 text-left">
                        {stats.map((stat, i) => (
                            <div key={stat.label} className="relative flex flex-col-reverse justify-end bg-white/5 p-3 sm:p-5 backdrop-blur">
                                {/* Bingkai coretan penuh seperti kotak angka di hero Fasilitas, putih tipis karena latarnya gelap */}
                                <SketchBox tone="text-white/40" delay={300 + i * 150} />
                                <dt className="mt-2 text-sm text-brand-mist/70">{stat.label}</dt>
                                <dd className={`font-display text-3xl md:text-4xl font-bold uppercase tracking-wide leading-none ${i === 0 ? "text-brand-warmred" : "text-white"}`}>
                                    {stat.value}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </section>
    )
}
