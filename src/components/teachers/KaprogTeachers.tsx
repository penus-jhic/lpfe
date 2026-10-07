import { useRef, useState, type KeyboardEvent } from "react";
import { Link } from "react-router-dom";
import { SketchArrow, SketchLoop, SketchRule, SketchSparks, SketchUnderline } from "../SketchFrame";
import { TeacherPhoto } from "../TeacherCard";
import { kaprogOf } from "../../data/teachers";
import { majors } from "../../data/majors";

// Satu kepala program per jurusan, urut sesuai daftar jurusan. Jurusan yang belum punya kepala program dilewati
const programs = majors.flatMap((major) => {
    const kaprog = kaprogOf(major.code);
    return kaprog ? [{ major, kaprog, name: `${major.highlight} ${major.rest}`.trim() }] : [];
});

// Tombol panah pindah ke tab sebelum/sesudahnya, sesuai pola tab yang dikenali pembaca layar
const arrowSteps: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };

export default function KaprogTeachers() {
    const [active, setActive] = useState(0);
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

    const current = programs[active];
    if (!current) return null;
    const { major, kaprog, name } = current;

    const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
        const step = arrowSteps[e.key];
        if (!step) return;
        e.preventDefault();
        const next = (active + step + programs.length) % programs.length;
        setActive(next);
        tabRefs.current[next]?.focus();
    };

    return(
        // Section gelap di antara Struktur Pimpinan (putih) & Daftar Guru (abu-abu), seperti section Devacto di halaman jurusan
        <section id="kepala-program" className="relative z-10 scroll-mt-6 overflow-hidden bg-brand-ink bg-[radial-gradient(ellipse_at_top_right,var(--color-brand-deepred),transparent_65%)] text-white px-6 py-20 md:py-28">
            {/* Dekorasi titik-titik */}
            <div aria-hidden="true" className="pointer-events-none absolute left-6 bottom-20 hidden md:block w-40 h-28 bg-[radial-gradient(circle,rgb(255_255_255/0.1)_2px,transparent_2.5px)] bg-size-[22px_22px]" />

            <div className="relative max-w-6xl mx-auto">
                <div className="grid gap-4 md:grid-cols-2 md:items-end">
                    <div>
                        <p className="text-xs uppercase tracking-[0.25em] font-semibold text-brand-warmred">
                            <SketchSparks tone="text-brand-warmred">Kepala Program Keahlian</SketchSparks>
                        </p>
                        <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold uppercase tracking-wide leading-tight text-left">
                            {/* Coretan hanya di kata terakhir supaya garisnya tidak melebar saat judul terlipat */}
                            Kepala Setiap <SketchUnderline tone="text-brand-signal">Jurusan</SketchUnderline>
                        </h2>
                    </div>
                    <p className="text-base md:text-lg leading-relaxed text-brand-mist/80 md:max-w-md md:justify-self-end">
                        Setiap kompetensi keahlian dipimpin seorang kepala program yang menyusun materi praktik
                        bersama industri, membina Devacto, dan mendampingi siswa hingga PKL.
                    </p>
                </div>

                <div className="mt-12 md:mt-16 grid gap-10 lg:gap-16 lg:grid-cols-[16rem_1fr] lg:items-center">
                    {/* Pilihan jurusan: deretan kode di HP, daftar bergaris coretan lengkap dengan nama jurusan di desktop.
                        py-2.5 di HP memberi ruang untuk coretan bawah (daftar ini overflow-x-auto, jadi yang keluar kotak terpotong) */}
                    <div
                        role="tablist"
                        aria-label="Pilih jurusan"
                        className="flex gap-1 overflow-x-auto -mx-6 px-6 [scrollbar-width:none] lg:flex-col lg:gap-0 lg:mx-0 lg:px-0 lg:overflow-visible"
                    >
                        {programs.map((program, i) => {
                            const selected = i === active;

                            return(
                                <button
                                    key={program.major.code}
                                    ref={(el) => { tabRefs.current[i] = el; }}
                                    type="button"
                                    role="tab"
                                    id={`kaprog-tab-${program.major.code}`}
                                    aria-selected={selected}
                                    aria-controls="kaprog-panel"
                                    tabIndex={selected ? 0 : -1}
                                    onClick={() => setActive(i)}
                                    onKeyDown={onKeyDown}
                                    className={`relative shrink-0 flex items-center gap-4 px-3 py-2.5 text-left transition-colors lg:w-full lg:px-0 lg:py-5 ${
                                        selected ? "text-white" : "text-white/50 hover:text-white"
                                    }`}
                                >
                                    {/* Garis pemisah coretan antar jurusan (desktop), pengganti divide-y */}
                                    {i > 0 && <SketchRule delay={i * 100} className="hidden lg:block text-white/20 -left-1 -right-1 -top-1.5 h-3" />}

                                    <span className={`font-display text-lg lg:text-3xl font-bold uppercase tracking-wide leading-none lg:w-16 lg:shrink-0 ${selected ? "text-brand-warmred" : ""}`}>
                                        {selected ? <SketchUnderline size="sm" tone="text-brand-warmred">{program.major.code}</SketchUnderline> : program.major.code}
                                    </span>
                                    <span className="hidden lg:block flex-1 text-sm font-medium leading-snug">{program.name}</span>

                                    {/* Panah menunjuk ke profil kepala program di sebelah kanan. Tempatnya selalu disediakan
                                        (w-8) supaya nama jurusan tidak terlipat ulang saat panahnya muncul */}
                                    <span className="hidden lg:block w-8 shrink-0 text-brand-warmred">
                                        {selected && <SketchArrow className="w-8 h-4" />}
                                    </span>
                                </button>
                            )
                        })}
                    </div>

                    {/* key: animasi & coretan diulang setiap kali jurusan diganti */}
                    <div
                        key={major.code}
                        role="tabpanel"
                        id="kaprog-panel"
                        aria-labelledby={`kaprog-tab-${major.code}`}
                        className="grid gap-12 md:grid-cols-[2fr_3fr] md:items-center animate-fade-up"
                    >
                        <div className="relative w-full max-w-60 sm:max-w-xs mx-auto md:max-w-none">
                            {/* Lingkaran coretan yang "mengorbit" di belakang foto, sama seperti kartu di hero jurusan.
                                Ditaruh sebelum foto supaya bagian tengahnya tertutup foto */}
                            <SketchLoop delay={200} className="-left-8 -right-8 top-[30%] h-[38%] text-brand-warmred -rotate-12" />
                            <TeacherPhoto
                                teacher={kaprog}
                                className="aspect-4/5 rounded-card ring-1 ring-white/10 shadow-2xl shadow-black/40"
                                initialsSize="text-8xl"
                            />
                        </div>

                        {/* text-left: nama & kutipan yang terlipat jadi renggang antar katanya kalau ikut justify dari body */}
                        <div className="text-left">
                            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-brand-warmred">
                                Kepala Program {major.code}
                            </p>
                            {/* Tanpa "uppercase" supaya gelar seperti S.Kom. tidak berubah jadi S.KOM., sama seperti halaman profil guru */}
                            <h3 className="mt-3 font-display text-3xl md:text-4xl font-bold tracking-wide leading-tight">
                                {kaprog.name}
                            </h3>
                            <p className="mt-2 text-sm text-brand-mist/70">{name}</p>

                            {kaprog.quote && (
                                // Garis tegak coretan di kiri kutipan, sama seperti kutipan di halaman berita
                                <figure className="relative mt-8 py-1 pl-8 md:pl-10">
                                    <SketchRule bold vertical delay={300} className="text-brand-warmred -top-1 -bottom-1 left-0 w-3" />
                                    <blockquote className="text-lg font-semibold leading-snug">&ldquo;{kaprog.quote}&rdquo;</blockquote>
                                </figure>
                            )}

                            {kaprog.bio?.[0] && (
                                <p className="mt-6 text-base leading-relaxed text-brand-mist/80">{kaprog.bio[0]}</p>
                            )}

                            <div className="mt-8 flex flex-wrap gap-3">
                                <Link
                                    to={`/profil-guru/${kaprog.id}`}
                                    className="group inline-flex items-center gap-3 rounded-full bg-linear-to-r from-brand-signal to-brand-darkred px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-brand-darkred/30 transition-transform hover:-translate-y-0.5"
                                >
                                    Lihat Profil
                                    <SketchArrow className="w-8 h-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                                <Link
                                    to={`/jurusan/${major.slug}`}
                                    className="inline-flex items-center rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                                >
                                    Jurusan {major.code}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
