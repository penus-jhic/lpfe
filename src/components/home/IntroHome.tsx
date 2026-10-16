import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { visi, misiHighlights } from "../../data/profile";
import Icon from "../Icon";
import SketchFrame, { SketchArrow, SketchCorner } from "../SketchFrame";

export default function IntroHome() {
    const videoRef = useRef<HTMLVideoElement>(null);
    // Diisi dari event play/pause video, jadi tetap akurat walau autoplay diblokir browser
    const [playing, setPlaying] = useState(false);

    function togglePlay() {
        const video = videoRef.current;
        if (!video) return;
        if (video.paused) void video.play();
        else video.pause();
    }

    return(
        <section className="relative z-10 bg-brand-softmist text-brand-ink rounded-t-[2.5rem] px-6 py-20 md:py-28">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-center font-display text-3xl md:text-4xl font-bold uppercase tracking-wide leading-tight">
                    <SketchFrame>Mengenal SMK Plus Pelita Nusantara</SketchFrame>
                </h2>

                <div className="mt-12 md:mt-16 grid gap-10 lg:gap-14 lg:grid-cols-[5fr_6fr] lg:items-center">
                    {/* Video di kanan pada desktop, di atas teks pada HP & tablet */}
                    <div data-speed="-0.05" className="relative lg:order-last">
                        {/* aspect-video = rasio asli video (16:9), jadi video tampil utuh tanpa terpotong */}
                        <video
                            ref={videoRef}
                            className="w-full aspect-video object-contain rounded-card bg-brand-softmist shadow-2xl"
                            src="https://cld.c8nayrntn2.qzz.io/header-content-small.mp4"
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="auto"
                            aria-hidden="true"
                            onPlay={() => setPlaying(true)}
                            onPause={() => setPlaying(false)}
                        />

                        <button
                            type="button"
                            onClick={togglePlay}
                            aria-llabel={playing ? "Jeda video" : "Putar video"}
                            className="absolute bottom-3 right-3 md:bottom-4 md:right-4 w-11 h-11 rounded-full bg-brand-ink/60 text-white ring-1 ring-white/20 backdrop-blur flex items-center justify-center transition-colors hover:bg-brand-darkred focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-darkred"
                        >
                            <Icon name={playing ? "pause" : "play"} className="w-5 h-5 fill-current" />
                        </button>

                        {/* Garis siku coretan tangan di pojok kanan atas & kiri bawah video, sama seperti bingkai judul.
                            Offset dibuat cukup jauh supaya goresan tipis bagian dalam tidak menempel ke video;
                            di HP lebih kecil karena ruang di tepi layar hanya 24px. */}
                        <SketchCorner className="-top-5 -right-5 w-16 h-16 md:-top-8 md:-right-8 md:w-28 md:h-28 rotate-90" />
                        <SketchCorner delay={350} className="-bottom-5 -left-5 w-16 h-16 md:-bottom-8 md:-left-8 md:w-28 md:h-28 -rotate-90" />
                    </div>

                    <div className="space-y-8">
                        <div>
                            <h3 className="text-xs uppercase tracking-[0.25em] font-semibold text-brand-darkred">Visi</h3>
                            <p className="mt-3 text-lg font-semibold leading-snug">{visi}</p>
                        </div>

                        <div>
                            <h3 className="text-xs uppercase tracking-[0.25em] font-semibold text-brand-darkred">Misi</h3>
                            {/* Hanya sebagian misi, jadi pakai panah coretan, bukan nomor, supaya tidak rancu dengan urutan resmi.
                                Panah digambar bergantian dari atas ke bawah. */}
                            <ul className="mt-4 space-y-3">
                                {misiHighlights.map((item, i) => (
                                    <li key={item} className="flex gap-3">
                                        <span className="shrink-0 mt-1.5 text-brand-darkred">
                                            <SketchArrow delay={i * 200} className="w-8 h-4" />
                                        </span>
                                        <span className="leading-relaxed text-brand-ink/80">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <Link
                            to="/tentang"
                            className="group inline-flex items-center gap-3 rounded-full bg-linear-to-r  px-7 py-3.5 text-sm font-semibold text-brand-darkred transition-transform hover:-translate-y-0.5"
                        >
                            <SketchFrame>
                                {/* SketchArrow berupa block, jadi teks & panah dijejerkan dengan inline-flex supaya tidak turun baris */}
                                <span className="inline-flex items-center gap-3">
                                    Lihat Profil Selengkapnya <SketchArrow className="w-8 h-4 transition-transform group-hover:translate-x-1" />
                                </span>
                            </SketchFrame>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
