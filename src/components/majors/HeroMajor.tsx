import { Link } from "react-router-dom";
import Icon from "../Icon";
import { SketchArrow, SketchUnderline } from "../SketchFrame";
import { ppdbLink } from "../../data/navigation";
import type { Major } from "../../data/majors";
import fotoGedung from "../../assets/images/about/fotogedung.jpg";

const chevron = (
    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m9 6 6 6-6 6" />
    </svg>
);

export default function HeroMajor({ major }: { major: Major }) {
    const name = `${major.highlight} ${major.rest}`.trim();

    const scrollToSection = (id: string) => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    };

    return(
        // pb lebih besar karena section materi di bawahnya naik menutupi 2.5rem bagian bawah hero
        <section className="relative overflow-hidden bg-brand-ink text-white px-6 pt-36 pb-28 md:pt-40 md:pb-32">
            {/* Foto latar diblur tipis. scale-105 supaya tepi blur yang memudar tidak terlihat di pinggir section */}
            <img
                src={major.heroImage ?? fotoGedung}
                alt=""
                className="absolute inset-0 size-full object-cover scale-105 blur-xs"
            />
            {/* Lapisan gelap + gradasi merah di kanan atas supaya tulisan tetap terbaca di atas foto */}
            <div aria-hidden="true" className="absolute inset-0 bg-brand-ink/75" />
            <div aria-hidden="true" className="absolute inset-0 bg-radial-[ellipse_at_top_right] from-brand-deepred/70 to-transparent to-65%" />

            {/* Dekorasi titik-titik */}
            <div aria-hidden="true" className="pointer-events-none absolute left-6 bottom-20 hidden md:block w-40 h-28 bg-[radial-gradient(circle,rgb(255_255_255/0.1)_2px,transparent_2.5px)] bg-size-[22px_22px]" />

            <div className="relative max-w-6xl mx-auto grid gap-14 md:gap-16 md:grid-cols-[1fr_auto] md:items-center">
                <div className="animate-fade-up">
                    <nav aria-label="Breadcrumb">
                        <ol className="flex flex-wrap items-center gap-2 text-sm text-brand-mist/60">
                            <li>
                                <Link to="/" className="transition-colors hover:text-white">Beranda</Link>
                            </li>
                            <li className="flex items-center gap-2">
                                {chevron}
                                Jurusan
                            </li>
                            <li className="flex items-center gap-2">
                                {chevron}
                                <span aria-current="page" className="font-medium text-white">{major.code}</span>
                            </li>
                        </ol>
                    </nav>

                    <p className="mt-8 text-xs sm:text-sm md:text-base uppercase tracking-[0.25em] font-semibold text-brand-mist/80">
                        Kompetensi Keahlian
                    </p>
                    <h1 className="mt-3 font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold uppercase tracking-wide leading-none">
                        <span className="block text-brand-warmred">{major.highlight}</span>
                        {major.rest && <span className="block">{major.rest}</span>}
                    </h1>

                    {/* Tagline dengan coretan bawah, sama seperti tagline di hero beranda.
                        text-left: di HP tagline terlipat dua baris dan jadi renggang antar kata kalau ikut justify dari body.
                        delay: coretan mulai setelah teks selesai muncul */}
                    <p className="mt-6 text-left text-xs sm:text-sm md:text-base uppercase tracking-[0.25em] font-semibold text-white">
                        <SketchUnderline size="lg" tone="text-brand-signal" delay={500}>{major.tagline}</SketchUnderline>
                    </p>

                    {/* mt-10 md:mt-12: memberi ruang untuk garis coretan yang menggantung di bawah tagline */}
                    <p className="mt-10 md:mt-12 max-w-xl text-base md:text-lg leading-relaxed text-brand-mist/80">
                        {major.desc}
                    </p>

                    <div className="mt-10 flex flex-wrap gap-3">
                        {/* PPDB aplikasi terpisah, jadi pakai <a> biasa (halaman dimuat ulang dari server) */}
                        <a
                            href={ppdbLink.href}
                            className="group inline-flex items-center gap-3 rounded-full bg-linear-to-r from-brand-signal to-brand-darkred px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-brand-darkred/30 transition-transform hover:-translate-y-0.5"
                        >
                            Daftar Jurusan {major.code}
                            <SketchArrow className="w-8 h-4 transition-transform group-hover:translate-x-1" />
                        </a>
                        <button
                            type="button"
                            onClick={() => scrollToSection("fokus")}
                            className="group inline-flex items-center gap-3 rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                        >
                            Lihat Materi Belajar
                            <SketchArrow direction="down" className="w-3 h-6 -my-0.5 transition-transform group-hover:translate-y-0.5" />
                        </button>
                    </div>
                </div>

                {/* Kartu jurusan, sama seperti di beranda */}
                <div className="relative w-full max-w-80 sm:max-w-96 mx-auto md:w-80 lg:w-104 xl:w-md md:max-w-none animate-fade-up [animation-delay:150ms]">
                    <div className="relative overflow-hidden transition-transform duration-500 md:rotate-2 md:hover:rotate-0">
                        {/* Tinggi kartu mengikuti rasio foto supaya foto tampil utuh tanpa terpotong */}
                        {major.heroCardImage ? (
                            <img
                                src={major.heroCardImage}
                                alt={`Siswa jurusan ${name}`}
                                className="block w-full h-auto"
                            />
                        ) : (
                            <div className="relative aspect-4/5 flex items-center justify-center text-white/30">
                                <Icon name={major.icon} className="w-24 h-24 md:w-28 md:h-28" />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
