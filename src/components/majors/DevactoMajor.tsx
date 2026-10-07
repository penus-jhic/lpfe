import { SketchBox, SketchRule, SketchSparks, SketchUnderline } from "../SketchFrame";
import type { Major } from "../../data/majors";

export default function DevactoMajor({ major }: { major: Major }) {
    const { paragraphs, schedule, topics } = major.devacto;

    const info = [
        { label: "Jadwal", value: schedule },
        { label: "Peserta", value: `Terbuka untuk semua siswa ${major.code}, tidak wajib` },
        { label: "Suasana", value: "Seperti komunitas, siswa saling berbagi ilmu" },
    ];

    return(
        // Satu-satunya section gelap setelah hero, supaya Devacto terasa sebagai kegiatan istimewa
        <section id="devacto" className="relative z-10 scroll-mt-6 overflow-hidden bg-brand-ink bg-[radial-gradient(ellipse_at_top_right,var(--color-brand-deepred),transparent_65%)] text-white px-6 py-20 md:py-28">
            {/* Dekorasi titik-titik */}
            <div aria-hidden="true" className="pointer-events-none absolute right-6 top-10 hidden md:block w-40 h-28 bg-[radial-gradient(circle,rgb(255_255_255/0.1)_2px,transparent_2.5px)] bg-size-[22px_22px]" />

            <div className="relative max-w-6xl mx-auto grid gap-14 lg:gap-16 lg:grid-cols-[6fr_5fr] lg:items-center">
                <div>
                    <p className="text-xs uppercase tracking-[0.25em] font-semibold text-brand-warmred">
                        <SketchSparks tone="text-brand-warmred">Devacto {major.code}</SketchSparks>
                    </p>
                    <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold uppercase tracking-wide leading-tight text-left">
                        {/* Coretan hanya di kata terakhir supaya garisnya tidak melebar saat judul terlipat */}
                        Belajar Lebih Dalam Setelah Jam <SketchUnderline tone="text-brand-signal">Sekolah</SketchUnderline>
                    </h2>

                    {/* mt-8: memberi ruang untuk garis coretan yang menggantung di bawah judul */}
                    <p className="mt-8 text-base md:text-lg leading-relaxed text-white">
                        Devacto adalah kegiatan pendalaman keahlian setelah jam sekolah. Tidak wajib, tetapi terbuka
                        untuk semua siswa {major.code}, dan suasananya seperti komunitas: siswa saling berbagi ilmu
                        dan keahlian yang mereka punya.
                    </p>
                    <div className="mt-4 space-y-4">
                        {paragraphs.map((paragraph) => (
                            <p key={paragraph} className="text-base leading-relaxed text-brand-mist/80">{paragraph}</p>
                        ))}
                    </div>
                </div>

                {/* Tabel info berbingkai coretan penuh, putih tipis karena latarnya gelap.
                    text-left: kolom sempit, teks yang terbungkus jadi renggang kalau ikut justify dari body */}
                <div className="relative bg-white/5 p-6 md:p-8 text-left backdrop-blur">
                    <SketchBox tone="text-white/40" delay={200} />
                    <h3 className="font-display text-lg font-bold uppercase tracking-wide">Info Kegiatan</h3>

                    <dl className="mt-4">
                        {info.map((row, i) => (
                            <div key={row.label} className="relative grid grid-cols-[6rem_1fr] gap-4 py-4">
                                {/* Garis pemisah baris coretan, pengganti divide-y */}
                                {i > 0 && <SketchRule delay={400 + i * 100} className="text-white/20 -left-1 -right-1 -top-1.5 h-3" />}
                                <dt className="text-sm text-brand-mist/60">{row.label}</dt>
                                <dd className="text-sm font-semibold leading-relaxed">{row.value}</dd>
                            </div>
                        ))}
                    </dl>

                    {topics.length > 0 && (
                        <div className="relative pt-6">
                            <SketchRule delay={800} className="text-white/20 -left-1 -right-1 -top-1.5 h-3" />
                            <p className="text-sm text-brand-mist/60">Yang didalami</p>
                            <ul className="mt-3 flex flex-wrap gap-2">
                                {topics.map((topic) => (
                                    <li key={topic} className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">
                                        {topic}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
