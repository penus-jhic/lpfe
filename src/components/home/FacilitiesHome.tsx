import { useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide, type SwiperClass } from "swiper/react";
import { A11y, Keyboard } from "swiper/modules";
import "swiper/css";
import LoadError from "../LoadError";
import Skeleton from "../Skeleton";
import { SketchArrow } from "../SketchFrame";
import type { Facility } from "../../data/facilities";
import { useFacilities } from "../../lib/content";

export default function FacilitiesHome() {
    const [swiper, setSwiper] = useState<SwiperClass | null>(null);
    const [active, setActive] = useState(0);
    const { facilities, error, reload } = useFacilities();
    // Hanya fasilitas yang sudah punya foto, supaya slider beranda tidak berisi kotak ikon
    const photoFacilities = (facilities ?? []).filter((f) => (f.images?.length ?? 0) > 0);

    return(
        <section className="relative z-10 overflow-hidden bg-white text-brand-ink px-6 py-20 md:py-28">
            <div className="relative max-w-6xl mx-auto">
                <h2 className="text-center text-balance font-display text-3xl md:text-4xl font-bold uppercase tracking-wide leading-tight">
                    <span className="mx-auto mb-4 block h-1.5 w-20 bg-brand-warmred" aria-hidden="true" />
                    Fasilitas Penunjang{" "}
                    <span className="text-brand-darkred">Belajar &amp; Berkarya SMK Plus Pelita Nusantara</span>
                </h2>

                {error ? (
                    <LoadError message={error.message} onRetry={reload} className="mt-8" />
                ) : !facilities ? (
                    // Kerangka selama data dimuat, jumlah kolomnya sama dengan slider
                    <div role="status" aria-label="Memuat fasilitas" className="mt-12 md:mt-16 grid gap-4 sm:gap-5 lg:gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {[0, 1, 2].map((i) => (
                            <div key={i} className={`rounded-card border border-dashed border-brand-ink/20 overflow-hidden ${i === 1 ? "hidden sm:block" : i === 2 ? "hidden lg:block" : ""}`}>
                                <Skeleton className="aspect-4/3" />
                                <div className="p-5 md:p-6 space-y-3">
                                    <Skeleton className="h-5 w-2/3 rounded-full" />
                                    <Skeleton className="h-4 w-full rounded-full" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : photoFacilities.length > 0 && (
                    <>
                        <Swiper
                            modules={[A11y, Keyboard]}
                            loop
                            keyboard={{ enabled: true, onlyInViewport: true }}
                            slidesPerView={1.15}
                            spaceBetween={16}
                            breakpoints={{
                                640: { slidesPerView: 2, spaceBetween: 20 },
                                1024: { slidesPerView: 3, spaceBetween: 24 },
                            }}
                            onSwiper={setSwiper}
                            onRealIndexChange={(s) => setActive(s.realIndex)}
                            className="mt-12 md:mt-16"
                        >
                            {photoFacilities.map((facility) => (
                                // "h-auto!" menimpa height 100% bawaan Swiper supaya semua kartu sama tinggi
                                <SwiperSlide key={facility.id} className="h-auto!">
                                    <FacilityCard facility={facility} />
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        <div className="mt-8 flex items-center justify-between gap-4">
                            <SlideButton direction="left" onClick={() => swiper?.slidePrev()} />

                            <div className="flex flex-wrap justify-center gap-3">
                                {photoFacilities.map((facility, i) => (
                                    <button
                                        key={facility.id}
                                        type="button"
                                        onClick={() => swiper?.slideToLoop(i)}
                                        aria-label={`Tampilkan ${facility.title}`}
                                        aria-current={i === active ? "true" : undefined}
                                        className={`w-2.5 h-2.5 rounded-full transition-colors ${
                                            i === active ? "bg-brand-darkred" : "bg-brand-ink/20 hover:bg-brand-ink/40"
                                        }`}
                                    />
                                ))}
                            </div>

                            <SlideButton direction="right" onClick={() => swiper?.slideNext()} />
                        </div>
                    </>
                )}

                <div className="mt-10 text-center">
                    <Link
                        to="/fasilitas"
                        className="group inline-flex items-center gap-1.5 text-sm font-semibold text-brand-darkred"
                    >
                        Lihat Semua Fasilitas
                        <SketchArrow className="w-6 h-3 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </section>
    )
}

function FacilityCard({ facility }: { facility: Facility }) {
    return(
        // text-left: kartu sempit, teks yang terbungkus jadi renggang kalau ikut justify dari body
        <article className="group h-full flex flex-col overflow-hidden rounded-card border border-dashed border-brand-ink/20 bg-white text-left">
            {/* Foto sampul dibuat besar (4:3, selebar kartu) supaya fasilitas terlihat jelas */}
            <div className="relative aspect-4/3 overflow-hidden bg-linear-to-br from-brand-signal to-brand-deepred">
                <img
                    src={facility.images[0].url}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                />
            </div>

            <div className="flex-1 p-5 md:p-6">
                <h3 className="text-lg font-semibold">{facility.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-ink/70">{facility.description}</p>
            </div>
        </article>
    )
}

function SlideButton({ direction, onClick }: { direction: "left" | "right"; onClick: () => void }) {
    return(
        <button
            type="button"
            onClick={onClick}
            aria-label={direction === "left" ? "Fasilitas sebelumnya" : "Fasilitas berikutnya"}
            className="shrink-0 w-12 h-12 rounded-lg bg-brand-darkred text-white flex items-center justify-center shadow-lg shadow-brand-darkred/25 transition-colors hover:bg-brand-deepred"
        >
            <SketchArrow className={`w-7 h-3.5 ${direction === "left" ? "-scale-x-100" : ""}`} />
        </button>
    )
}
