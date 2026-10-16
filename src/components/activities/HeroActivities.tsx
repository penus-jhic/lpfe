import { Link } from "react-router-dom";
import fotoProgram from "../../assets/images/programUnggulan/Basket.jpeg";
import { SketchArrow, SketchUnderline } from "../SketchFrame";
import { activityCategoryAnchors } from "../../data/activities";

const chevron = (
    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m9 6 6 6-6 6" />
    </svg>
);

// Hero halaman /kegiatan, sama seperti hero halaman Fasilitas: foto gelap di belakang, dua tombol ke section di bawahnya
export default function HeroActivities() {
    const scrollToSection = (id: string) => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    };

    return(
        <section className="relative overflow-hidden bg-brand-ink text-white px-6 pt-36 pb-28 md:pt-40 md:pb-32">
            <img src={fotoProgram} alt="" className="absolute inset-0 size-full object-cover" fetchPriority="high" />
            <div aria-hidden="true" className="absolute inset-0 bg-brand-ink/80 lg:bg-transparent lg:bg-linear-to-r lg:from-brand-ink/95 lg:via-brand-ink/80 lg:to-brand-ink/50" />
            <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--color-brand-deepred),transparent_65%)] opacity-70" />

            {/* Dekorasi titik-titik */}
            <div aria-hidden="true" className="pointer-events-none absolute left-6 bottom-20 hidden md:block w-40 h-28 bg-[radial-gradient(circle,rgb(255_255_255/0.1)_2px,transparent_2.5px)] bg-size-[22px_22px]" />

            <div className="relative max-w-6xl mx-auto animate-fade-up">
                <nav aria-label="Breadcrumb">
                    <ol className="flex flex-wrap items-center gap-2 text-sm text-brand-mist/60">
                        <li>
                            <Link to="/" className="transition-colors hover:text-white">Beranda</Link>
                        </li>
                        <li className="flex items-center gap-2">
                            {chevron}
                            <span aria-current="page" className="font-medium text-white">Kegiatan Siswa</span>
                        </li>
                    </ol>
                </nav>

                <p className="mt-8 text-xs sm:text-sm md:text-base uppercase tracking-[0.25em] font-semibold text-brand-mist/80">
                    Ekstrakurikuler &amp; Talent Day
                </p>
                <h1 className="mt-3 font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold uppercase tracking-wide leading-none">
                    <span className="block text-brand-warmred">Kegiatan</span>
                    {/* Coretan hanya di satu kata, sama seperti hero Fasilitas. delay: mulai setelah teks selesai muncul */}
                    <span className="block">
                        <SketchUnderline size="lg" tone="text-brand-signal" delay={500}>Siswa</SketchUnderline>
                    </span>
                </h1>

                {/* mt-8 md:mt-10: memberi ruang untuk garis coretan yang menggantung di bawah judul */}
                <p className="mt-8 md:mt-10 max-w-xl text-base md:text-lg leading-relaxed text-brand-mist/80">
                    Di luar pelajaran jurusan, siswa bebas memilih kegiatan sesuai minatnya: ekstrakurikuler olahraga,
                    keagamaan, dan pramuka, atau kelas minat Talent Day dari memasak hingga membuat game.
                </p>

                <div className="mt-10 flex flex-wrap gap-3">
                    <button
                        type="button"
                        onClick={() => scrollToSection(activityCategoryAnchors.ekskul)}
                        className="group inline-flex items-center gap-3 rounded-full bg-linear-to-r from-brand-signal to-brand-darkred px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-brand-darkred/30 transition-transform hover:-translate-y-0.5"
                    >
                        Ekstrakurikuler
                        <SketchArrow direction="down" className="w-3 h-6 -my-0.5 transition-transform group-hover:translate-y-0.5" />
                    </button>
                    <button
                        type="button"
                        onClick={() => scrollToSection(activityCategoryAnchors.talent_day)}
                        className="inline-flex items-center rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                    >
                        Talent Day
                    </button>
                </div>
            </div>
        </section>
    )
}
