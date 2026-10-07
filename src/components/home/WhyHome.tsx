import type { ReactNode } from "react";
import { SketchBox, SketchCircle, SketchRule } from "../SketchFrame";

// TODO: ganti dengan data asli dari sekolah
const stats = [
    { value: "5", label: "Kompetensi keahlian" },
    { value: "6 bln", label: "Program PKL" },
];

const reasons: { title: string; desc: string; icon: ReactNode }[] = [
    {
        title: "Terakreditasi A & Terpercaya",
        desc: "Sekolah swasta terakreditasi A",
        icon: (
            <text
                x="12"
                y="19"
                textAnchor="middle"
                fill="currentColor"
                stroke="none"
                fontSize="20"
                className="font-display font-bold"
            >
                A
            </text>
        ),
    },
    {
        title: "Keahlian Bersertifikat LSP",
        desc: "Diajar oleh guru bersertifikat dan praktisi industri, siswa mengikuti uji kompetensi dan lulus dengan sertifikat keahlian yang diakui dunia kerja.",
        icon: (
            <>
                <circle cx="12" cy="9" r="5" />
                <path d="M9 13.5 8 21l4-2 4 2-1-7.5" />
            </>
        ),
    },
    {
        title: "Berkarakter & Terpantau",
        desc: "Pembinaan akhlak dan kedisiplinan berjalan setiap hari, dan orang tua rutin menerima laporan perkembangan serta mudah menghubungi wali kelas.",
        icon: (
            <>
                <path d="M12 3 4 6v6c0 4.5 3.4 8.2 8 9 4.6-.8 8-4.5 8-9V6l-8-3z" />
                <path d="m9 12 2 2 4-4" />
            </>
        ),
    },
];

export default function WhyHome() {
    return(
        <section className="relative z-10 bg-white text-brand-ink px-6 py-20 md:py-28">
            <div className="max-w-6xl mx-auto">
                <div className="text-center max-w-2xl mx-auto">
                    <p className="text-xs uppercase tracking-[0.25em] font-semibold text-brand-darkred">
                        Untuk Bapak &amp; Ibu Orang Tua
                    </p>
                    <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold uppercase tracking-wide leading-tight">
                        Mengapa <SketchCircle>Memilih</SketchCircle> SMK Plus Pelita Nusantara?
                    </h2>
                    <p className="mt-4 text-base md:text-lg leading-relaxed text-brand-ink/70">
                        Kami menyiapkan putra-putri Anda bukan hanya untuk lulus, tetapi untuk siap bekerja,
                        berwirausaha, atau melanjutkan kuliah dengan bekal keahlian yang nyata.
                    </p>
                </div>

                <dl className="mt-12 grid grid-cols-2 md:grid-cols-2 gap-y-6 rounded-card bg-white py-6 shadow-softpill">
                    {stats.map((stat, index) => (
                        <div key={stat.label} className="relative px-5 text-center">
                            {/* Garis pemisah kolom coretan di tepi kiri (desktop saja), sama seperti garis kolom tabel identitas */}
                            {index > 0 && (
                                <SketchRule vertical scale={1.6} delay={index * 150} className="hidden md:block text-brand-darkred/50 -top-1 -bottom-1 -left-1.5 w-3" />
                            )}
                            <dt className="sr-only">{stat.label}</dt>
                            <dd className="font-display text-3xl md:text-4xl font-bold uppercase tracking-wide text-brand-darkred">{stat.value}</dd>
                            <dd className="mt-1 text-sm text-brand-ink/70">{stat.label}</dd>
                        </div>
                    ))}
                </dl>

                {/* gap-6: ujung bingkai coretan kebablasan ±8px, jadi kartu bersebelahan tidak saling tabrak */}
                <div className="mt-12 grid gap-6 md:grid-cols-3">
                    {reasons.map((reason, index) => (
                        <article
                            key={reason.title}
                            className="group relative p-6 md:p-7 transition-transform duration-300 hover:-translate-y-1"
                        >
                            {/* Bingkai coretan penuh, sama seperti kartu "Sekolah dalam Angka" di halaman Tentang */}
                            <SketchBox delay={index * 150} />
                            <div className="w-12 h-12 rounded-xl bg-brand-darkred/10 text-brand-darkred flex items-center justify-center transition-colors group-hover:bg-brand-darkred group-hover:text-white">
                                <svg
                                    className="w-6 h-6"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                >
                                    {reason.icon}
                                </svg>
                            </div>
                            <h3 className="mt-5 text-lg font-semibold">{reason.title}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-brand-ink/70">{reason.desc}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}
