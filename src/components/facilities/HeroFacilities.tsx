import { Link } from "react-router-dom";
import fotoGedung from "../../assets/images/fotogedung.jpg";
import { SketchArrow, SketchBox, SketchUnderline } from "../SketchFrame";
import { facts } from "../../data/profile";

const chevron = (
    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m9 6 6 6-6 6" />
    </svg>
);

export default function HeroFacilities() {
    // Angka resmi Dapodik dari profile.ts
    const stats = facts.filter((fact) => ["Ruang kelas", "Laboratorium", "Luas lahan", "Perpustakaan"].includes(fact.label));

    const scrollToSection = (id: string) => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    };

    return(
        <section className="relative overflow-hidden bg-brand-ink text-white px-6 pt-36 pb-28 md:pt-40 md:pb-32">
            <img src={fotoGedung} alt="" className="absolute inset-0 size-full object-cover" />
            {/* Gelap di sisi teks supaya tetap terbaca (di HP teks & statistik menumpuk, jadi gelap merata),
                lalu rona merah di kanan atas seperti latar sebelumnya */}
            <div aria-hidden="true" className="absolute inset-0 bg-brand-ink/80 lg:bg-transparent lg:bg-linear-to-r lg:from-brand-ink/95 lg:via-brand-ink/80 lg:to-brand-ink/50" />
            <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--color-brand-deepred),transparent_65%)] opacity-70" />

            {/* Dekorasi titik-titik */}
            <div aria-hidden="true" className="pointer-events-none absolute left-6 bottom-20 hidden md:block w-40 h-28 bg-[radial-gradient(circle,rgb(255_255_255/0.1)_2px,transparent_2.5px)] bg-size-[22px_22px]" />

            <div className="relative max-w-6xl mx-auto grid gap-12 lg:gap-16 lg:grid-cols-[1fr_auto] lg:items-center">
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
                                <span aria-current="page" className="font-medium text-white">Fasilitas</span>
                            </li>
                        </ol>
                    </nav>

                    <p className="mt-8 text-xs sm:text-sm md:text-base uppercase tracking-[0.25em] font-semibold text-brand-mist/80">
                        Sarana &amp; Prasarana
                    </p>
                    <h1 className="mt-3 font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold uppercase tracking-wide leading-none">
                        <span className="block text-brand-warmred">Fasilitas</span>
                        {/* Coretan hanya di satu kata, sama seperti hero Tentang. delay: mulai setelah teks selesai muncul */}
                        <span className="block">
                            <SketchUnderline size="lg" tone="text-brand-signal" delay={500}>Sekolah</SketchUnderline>
                        </span>
                    </h1>

                    {/* mt-8 md:mt-10: memberi ruang untuk garis coretan yang menggantung di bawah judul */}
                    <p className="mt-8 md:mt-10 max-w-xl text-base md:text-lg leading-relaxed text-brand-mist/80">
                        Setiap kompetensi keahlian punya ruang praktik sendiri dengan peralatan standar industri,
                        didukung laboratorium, perpustakaan, dan masjid yang bisa dipakai seluruh siswa.
                    </p>

                    <div className="mt-10 flex flex-wrap gap-3">
                        <button
                            type="button"
                            onClick={() => scrollToSection("ruang-praktik")}
                            className="group inline-flex items-center gap-3 rounded-full bg-linear-to-r from-brand-signal to-brand-darkred px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-brand-darkred/30 transition-transform hover:-translate-y-0.5"
                        >
                            Ruang Praktik
                            <SketchArrow direction="down" className="w-3 h-6 -my-0.5 transition-transform group-hover:translate-y-0.5" />
                        </button>
                        <button
                            type="button"
                            onClick={() => scrollToSection("sarana-penunjang")}
                            className="inline-flex items-center rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                        >
                            Sarana Penunjang
                        </button>
                    </div>
                </div>

                {/* gap-6: ujung bingkai coretan kebablasan ±8px, jadi kotak bersebelahan tidak saling tabrak.
                    text-left: kotak sempit, label yang terbungkus jadi renggang kalau ikut justify dari body */}
                <dl className="grid grid-cols-2 gap-6 text-left lg:w-104 animate-fade-up [animation-delay:150ms]">
                    {stats.map((item, i) => (
                        <div
                            key={item.label}
                            className="relative flex flex-col-reverse justify-end bg-white/5 p-4 sm:p-5 md:p-6 backdrop-blur"
                        >
                            {/* Bingkai coretan penuh seperti kotak "Sekolah dalam Angka" di halaman Tentang, putih tipis karena latarnya gelap */}
                            <SketchBox tone="text-white/40" delay={300 + i * 150} />
                            <dt className="mt-2 text-sm text-brand-mist/70">{item.label}</dt>
                            {/* Tanpa "uppercase" supaya satuan m² tidak berubah jadi M². whitespace-nowrap: di HP "m²" tidak turun baris */}
                            <dd className={`whitespace-nowrap font-display text-3xl md:text-4xl font-bold tracking-wide leading-none ${i === 0 ? "text-brand-warmred" : "text-white"}`}>
                                {item.value}
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    )
}
