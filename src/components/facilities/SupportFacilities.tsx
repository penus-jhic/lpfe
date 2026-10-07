import SketchFrame, { SketchArrow, SketchBox, SketchRule } from "../SketchFrame";
import FacilityCarousel from "./FacilityCarousel";
import FacilityPhotos from "./FacilityPhotos";
import FacilityListState from "./FacilityListState";
import type { Facility } from "../../data/facilities";
import { useFacilities } from "../../lib/content";

export default function SupportFacilities() {
    const { facilities, error, reload } = useFacilities();
    const supportFacilities = (facilities ?? []).filter((f) => f.category === "penunjang");

    return(
        <section id="sarana-penunjang" className="relative z-10 scroll-mt-6 bg-brand-softmist text-brand-ink px-6 py-20 md:py-28">
            <div className="max-w-6xl mx-auto">
                <div className="grid gap-4 md:grid-cols-2 md:items-end">
                    <div>
                        <p className="text-xs uppercase tracking-[0.25em] font-semibold text-brand-darkred">
                            Sarana Penunjang
                        </p>
                        <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold uppercase tracking-wide leading-tight text-left">
                            {/* -ml-4 md:-ml-5: teks judul tetap sejajar eyebrow di atasnya, garis sikunya yang menjorok ke kiri */}
                            <SketchFrame className="-ml-4 md:-ml-5">Untuk Belajar, Ibadah, dan Mengembangkan Diri</SketchFrame>
                        </h2>
                    </div>
                    <p className="text-base md:text-lg leading-relaxed text-brand-ink/70 md:max-w-md md:justify-self-end">
                        Selain ruang praktik jurusan, sarana berikut bisa dipakai oleh siswa dari semua kompetensi
                        keahlian.
                    </p>
                </div>

                <FacilityListState loaded={facilities !== undefined} error={error} onRetry={reload} />

                {/* HP: carousel, digeser dengan panah */}
                {supportFacilities.length > 0 && (
                    <FacilityCarousel
                        items={supportFacilities}
                        className="mt-10"
                        renderSlide={(facility) => <SupportCard facility={facility} />}
                    />
                )}

                {/* Tablet & desktop: grid. gap-6: ujung bingkai coretan kebablasan ±8px, jadi kartu bersebelahan tidak saling tabrak */}
                <ul className="mt-16 hidden md:grid gap-6 grid-cols-2 lg:grid-cols-4">
                    {supportFacilities.map((facility, i) => (
                        <li key={facility.id}>
                            <SupportCard facility={facility} delay={(i % 4) * 150} />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}

// Bingkai coretan penuh menggantikan border & rounded-card, sama seperti kartu "Mengapa Memilih" di beranda.
// text-left: kartu sempit, teks yang terbungkus jadi renggang kalau ikut justify dari body
function SupportCard({ facility, delay = 0 }: { facility: Facility; delay?: number }) {
    return(
        <article className="relative h-full flex flex-col bg-white p-3 text-left transition-transform duration-300 hover:-translate-y-1">
            <SketchBox delay={delay} />
            <FacilityPhotos facility={facility} className="aspect-video" iconSize="w-16 h-16" />

            <div className="flex-1 px-2 pt-5 pb-3 md:px-3">
                <h3 className="text-lg font-semibold">{facility.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-ink/70">{facility.description}</p>

                <div className="relative mt-5 pt-5">
                    {/* bold: goresan ganda tebal + tipis, senada dengan bingkai SketchBox kartunya */}
                    <SketchRule bold delay={delay + 1000} className="text-brand-darkred -left-1 -right-1 -top-1.5 h-3" />
                    {/* Panah coretan sebagai penanda poin, sama seperti daftar misi di beranda */}
                    <ul className="space-y-2">
                        {facility.features.map((feature, i) => (
                            <li key={feature} className="flex items-start gap-2.5 text-sm">
                                <span className="shrink-0 mt-1 text-brand-darkred">
                                    <SketchArrow delay={delay + i * 200} className="w-6 h-3" />
                                </span>
                                {feature}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </article>
    )
}
