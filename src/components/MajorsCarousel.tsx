import { useState } from "react";
import { Swiper, SwiperSlide, type SwiperClass } from "swiper/react";
import { A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import MajorCard from "./MajorCard";
import SlideArrow from "./SlideArrow";
import type { Major } from "../data/majors";

// Mode loop Swiper butuh minimal 5 slide untuk pengaturan di bawah (1.6 / 2.6 kartu terlihat, kartu di tengah)
const MIN_LOOP_SLIDES = 5;

/** Daftar kartu jurusan: carousel di HP & tablet, berjajar di desktop. Dipakai di beranda dan halaman jurusan */
export default function MajorsCarousel({ majors }: { majors: Major[] }) {
    const [swiper, setSwiper] = useState<SwiperClass | null>(null);
    const [active, setActive] = useState(0);
    const activeMajor = majors[active];
    // Geser otomatis dimatikan untuk pengguna yang memilih "kurangi animasi" di perangkatnya
    const [reduceMotion] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);

    // Kalau kartunya kurang (mis. 4 di "Jurusan Lainnya"), daftar diulang supaya loop tetap mulus.
    // Indeks slide lalu dibagi sisa jumlah jurusan untuk titik penanda & nama jurusan aktif
    const slides = majors.length < MIN_LOOP_SLIDES ? [...majors, ...majors] : majors;

    return(
        <>
            {/* HP & tablet: carousel, kartu aktif di tengah dan kartu di sampingnya mengecil */}
            <div className="mt-10 lg:hidden">
                <Swiper
                    modules={[A11y, Autoplay]}
                    loop
                    // Geser sendiri tiap 4 detik. Tetap jalan setelah pengguna swipe / menekan panah
                    // (timer diulang dari awal), berhenti sementara saat kursor ada di atas carousel
                    autoplay={reduceMotion ? false : { delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
                    centeredSlides
                    slidesPerView={1.6}
                    spaceBetween={12}
                    breakpoints={{ 640: { slidesPerView: 2.6, spaceBetween: 20 } }}
                    onSwiper={setSwiper}
                    onRealIndexChange={(s) => setActive(s.realIndex % majors.length)}
                    // "!" menimpa margin & padding bawaan swiper.css. -mx-6 = selebar layar,
                    // padding atas-bawah supaya bayangan kartu tidak terpotong
                    className="-mx-6! pt-2! pb-8!"
                >
                    {slides.map((major, i) => (
                        <SwiperSlide key={`${major.code}-${i}`}>
                            <div className="scale-90 opacity-50 transition duration-300 in-[.swiper-slide-active]:scale-100 in-[.swiper-slide-active]:opacity-100 motion-reduce:transition-none">
                                <MajorCard major={major} />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Kartu hanya menampilkan kode, jadi nama lengkap jurusan aktif ditulis di bawahnya.
                    aria-hidden: nama lengkap sudah dibacakan dari link kartu, Swiper juga punya live region sendiri */}
                <p aria-hidden="true" className="text-center text-lg font-semibold">
                    {activeMajor && `${activeMajor.highlight} ${activeMajor.rest}`.trim()}
                </p>

                <div className="mt-3 flex items-center justify-center gap-4 sm:gap-6">
                    <SlideArrow direction="left" label="Jurusan sebelumnya" onClick={() => swiper?.slidePrev()} />

                    <div className="flex gap-3">
                        {majors.map((major, i) => (
                            <button
                                key={major.code}
                                type="button"
                                onClick={() => swiper?.slideToLoop(i)}
                                aria-label={`Tampilkan jurusan ${major.code}`}
                                aria-current={i === active ? "true" : undefined}
                                className={`h-2.5 rounded-full transition-all duration-300 ${
                                    i === active ? "w-8 bg-brand-darkred" : "w-2.5 bg-brand-ink/20 hover:bg-brand-ink/40"
                                }`}
                            />
                        ))}
                    </div>

                    <SlideArrow direction="right" label="Jurusan berikutnya" onClick={() => swiper?.slideNext()} />
                </div>
            </div>

            {/* Desktop: kartu berjajar. Lebar kartu selalu 1/5 baris (sama dengan beranda),
                kalau kartunya kurang dari 5 barisnya ditaruh di tengah */}
            <ul className="mt-12 hidden lg:flex lg:justify-center lg:gap-4">
                {majors.map((major) => (
                    <li key={major.code} className="w-[calc((100%-4rem)/5)]">
                        <MajorCard major={major} />
                    </li>
                ))}
            </ul>
        </>
    )
}
