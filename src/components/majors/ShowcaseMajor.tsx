import Icon from "../Icon";
import { SketchCircle, SketchUnderline } from "../SketchFrame";
import type { Major, ShowcaseItem } from "../../data/majors";

export default function ShowcaseMajor({ major }: { major: Major }) {
    if (major.showcase.length === 0) return null;

    return(
        <section id="showroom" className="relative z-10 scroll-mt-6 bg-brand-softmist text-brand-ink px-6 py-20 md:py-28">
            <div className="max-w-6xl mx-auto">
                <div className="text-center max-w-2xl mx-auto">
                    <p className="text-xs uppercase tracking-[0.25em] font-semibold text-brand-darkred">
                        Galeri Showroom
                    </p>
                    <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold uppercase tracking-wide leading-tight">
                        {/* Lingkaran coretan di satu kata, sama seperti judul "Mengapa Memilih" di beranda */}
                        Portofolio <SketchCircle>Karya</SketchCircle> Siswa {major.code}
                    </h2>
                    <p className="mt-4 text-base md:text-lg leading-relaxed text-brand-ink/70">
                        Hasil tugas praktik, proyek Teaching Factory, dan karya pribadi siswa yang menunjukkan
                        apa yang benar-benar bisa mereka kerjakan.
                    </p>
                </div>

                {/* Desktop: karya pertama 2x2, dua karya di kanannya, sisanya sebaris di bawah (pas untuk 6 karya).
                    Tablet 2 kolom & HP 1 kolom: semua karya sama besar */}
                <ul className="mt-12 md:mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {major.showcase.map((item, i) => (
                        <li key={item.title} className={i === 0 ? "lg:col-span-2 lg:row-span-2" : undefined}>
                            <ShowcaseCard item={item} featured={i === 0} />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}

function ShowcaseCard({ item, featured }: { item: ShowcaseItem; featured: boolean }) {
    return(
        // Karya utama mengisi tinggi dua baris di desktop, jadi rasionya dilepas di sana
        <figure className={`group relative overflow-hidden rounded-card bg-brand-ink/5 ring-1 ring-black/10 shadow-lg shadow-brand-ink/15 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-brand-ink/25 aspect-4/3 ${
            featured ? "lg:aspect-auto lg:h-full" : ""
        }`}>
            {item.image ? (
                // alt kosong: judul karya sudah ada di figcaption
                <img
                    src={item.image}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-108 group-hover:brightness-105"
                    loading="lazy"
                />
            ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-brand-signal to-brand-deepred text-white/15 transition-transform duration-500 group-hover:scale-110">
                    <Icon name={item.icon} className={featured ? "w-16 h-16 lg:w-36 lg:h-36" : "w-16 h-16"} />
                </div>
            )}

            {/* Overlay gradien halus & kontras untuk teks */}
            <div className="absolute inset-0 bg-linear-to-t from-brand-ink/95 via-brand-ink/35 to-transparent transition-opacity duration-300 group-hover:from-brand-ink/98" />

            {/* Aksen garis highlight di atas saat di-hover */}
            <div className="absolute top-0 inset-x-0 h-0.5 bg-linear-to-r from-transparent via-brand-warmred to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* text-left: kartu sempit, teks yang terbungkus jadi renggang kalau ikut justify dari body */}
            <figcaption className={`absolute inset-x-0 bottom-0 text-left text-white ${featured ? "p-5 lg:p-8" : "p-4 md:p-5"}`}>
                {/* Label besar hanya saat kartunya besar (desktop), sama seperti label "Newest" di kartu berita */}
                {featured && (
                    <p aria-hidden="true" className="hidden lg:block mb-6 font-display text-4xl md:text-5xl font-bold uppercase tracking-wide leading-none">
                        <SketchUnderline tone="text-brand-warmred">Pilihan</SketchUnderline>
                    </p>
                )}
                <span className={`block font-semibold leading-snug drop-shadow-sm ${featured ? "text-base lg:text-xl" : "text-base"}`}>{item.title}</span>
                <span className="mt-1 block text-sm text-white/75">{item.by}</span>
            </figcaption>
        </figure>
    )
}
