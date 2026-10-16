import { useState, type ReactNode } from "react";
import { Swiper, SwiperSlide, type SwiperClass } from "swiper/react";
import { A11y } from "swiper/modules";
import "swiper/css";
import SlideArrow from "../SlideArrow";
import type { Facility } from "../../data/facilities";

const pad = (n: number) => String(n).padStart(2, "0");

const phoneBreakpoints = { 640: { slidesPerView: 1.6 } };
const wideBreakpoints = { ...phoneBreakpoints, 768: { slidesPerView: 1.8 }, 1024: { slidesPerView: 2.5, spaceBetween: 32 } };

// Pengganti daftar panjang di HP (di bawah md): satu kartu di tengah, kartu di sampingnya mengintip & memudar,
// digeser dengan swipe atau panah seperti carousel jurusan di beranda. Tidak geser otomatis karena kartunya berisi
// teks yang perlu waktu dibaca (foto di dalam kartu sudah berganti sendiri). renderSlide = isi tiap kartu.
// allSizes = tetap jadi carousel di tablet & desktop (kartu samping lebih banyak terlihat), bukan hanya di HP
export default function FacilityCarousel({ items, renderSlide, allSizes = false, className = "" }: {
    items: Facility[];
    renderSlide: (facility: Facility, index: number) => ReactNode;
    allSizes?: boolean;
    className?: string;
}) {
    const [swiper, setSwiper] = useState<SwiperClass | null>(null);
    const [active, setActive] = useState(0);

    return(
        <div className={`${allSizes ? "" : "md:hidden"} ${className}`}>
            <Swiper
                modules={[A11y]}
                loop
                centeredSlides
                // spaceBetween 24 = gap-6, jarak minimal supaya ujung bingkai coretan kartu bersebelahan tidak bertabrakan
                slidesPerView={1.25}
                spaceBetween={24}
                breakpoints={allSizes ? wideBreakpoints : phoneBreakpoints}
                onSwiper={setSwiper}
                onRealIndexChange={(s) => setActive(s.realIndex)}
                // "!" menimpa margin & padding bawaan swiper.css. -mx-6 = selebar layar,
                // padding atas-bawah supaya ujung bingkai coretan yang kebablasan tidak terpotong
                className="-mx-6! py-3!"
            >
                {items.map((facility, i) => (
                    // "h-auto!" menimpa height 100% bawaan Swiper supaya semua kartu sama tinggi
                    <SwiperSlide key={facility.id} className="h-auto!">
                        <div className="h-full scale-95 opacity-50 transition duration-300 in-[.swiper-slide-active]:scale-100 in-[.swiper-slide-active]:opacity-100 motion-reduce:transition-none">
                            {renderSlide(facility, i)}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="mt-4 flex items-center justify-center gap-4 sm:gap-6">
                <SlideArrow direction="left" label="Fasilitas sebelumnya" onClick={() => swiper?.slidePrev()} />

                {/* Penghitung, bukan titik-titik: sepuluh titik tidak muat di antara dua panah di layar HP.
                    aria-hidden: posisi slide sudah dibacakan oleh live region Swiper */}
                <p aria-hidden="true" className="min-w-20 text-center font-display text-lg font-bold tracking-wide">
                    <span className="text-brand-darkred">{pad(active + 1)}</span>
                    <span className="text-brand-ink/40"> / {pad(items.length)}</span>
                </p>

                <SlideArrow direction="right" label="Fasilitas berikutnya" onClick={() => swiper?.slideNext()} />
            </div>
        </div>
    )
}
