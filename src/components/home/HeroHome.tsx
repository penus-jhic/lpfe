import { useEffect, useRef, useState } from "react";
import { SketchArrow, SketchUnderline } from "../SketchFrame";
import { smoothScrollTo, stopSmoothScroll, useScrollFrame } from "../../lib/smoothScroll";

export default function HeroHome() {
    const endRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const hintRef = useRef<HTMLButtonElement>(null);
    const pausedByScroll = useRef(false);
    const [shown, setShown] = useState(false);

    const nextSectionTop = () =>
        (endRef.current?.getBoundingClientRect().top ?? window.innerHeight) + window.scrollY;

    useEffect(() => {
        const frame = requestAnimationFrame(() => setShown(true));
        return () => cancelAnimationFrame(frame);
    }, []);

    useEffect(() => {
        const DELAY = 3000;
        let cancelled = false;
        let animating = false;

        // Pengguna mulai scroll/klik/tekan tombol sendiri: batalkan scroll otomatis
        const cancel = () => {
            cancelled = true;
            window.clearTimeout(timer);
            if (animating) {
                animating = false;
                stopSmoothScroll();
            }
        };

        const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

        const timer = window.setTimeout(() => {
            if (cancelled || window.scrollY > 0) return;
            animating = true;
            smoothScrollTo(nextSectionTop(), { duration: 1.6, easing: ease, onComplete: () => (animating = false) });
        }, DELAY);

        const events = ["wheel", "touchstart", "keydown", "mousedown"] as const;
        events.forEach((e) => window.addEventListener(e, cancel, { passive: true }));
        return () => {
            cancel();
            events.forEach((e) => window.removeEventListener(e, cancel));
        };
    }, []);

    // Efek "tirai": saat section berikutnya naik menutupi hero, video pelan-pelan membesar & menggelap,
    // judul ikut naik lalu memudar. Begitu hero tertutup penuh, hero disembunyikan & videonya dijeda,
    // supaya browser tidak terus menggambar video di belakang seluruh halaman (sumber utama scroll terasa berat).
    useScrollFrame(({ scroll }) => {
        const section = sectionRef.current;
        const video = videoRef.current;
        if (!section || !video) return;

        const height = section.offsetHeight;
        // +48: sudut membulat section berikutnya masih memperlihatkan sedikit hero
        const covered = scroll > height + 48;
        section.style.visibility = covered ? "hidden" : "";
        // Hanya putar lagi video yang tadi dijeda di sini (bukan yang autoplay-nya diblokir browser)
        if (covered && !video.paused) {
            video.pause();
            pausedByScroll.current = true;
        } else if (!covered && pausedByScroll.current) {
            pausedByScroll.current = false;
            void video.play().catch(() => {});
        }

        if (covered || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const p = Math.min(Math.max(scroll / height, 0), 1);
        video.style.transform = `scale(${(1 + p * 0.12).toFixed(4)})`;
        if (overlayRef.current) overlayRef.current.style.opacity = (0.55 + p * 0.3).toFixed(3);
        if (contentRef.current) {
            contentRef.current.style.transform = `translate3d(0, ${(p * -22).toFixed(2)}vh, 0) scale(${(1 - p * 0.06).toFixed(4)})`;
            contentRef.current.style.opacity = Math.max(1 - p * 1.6, 0).toFixed(3);
        }
        if (hintRef.current) {
            hintRef.current.style.opacity = Math.max(1 - p * 4, 0).toFixed(3);
            hintRef.current.style.visibility = p > 0.25 ? "hidden" : "";
        }
    });

    return(
        <>
            {/* Video menempel di layar, lalu ditutup oleh section berikutnya */}
            <section ref={sectionRef} className="sticky top-0 h-screen w-full overflow-hidden bg-brand-ink">
                <video
                    ref={videoRef}
                    className="absolute inset-0 w-full h-full object-cover will-change-transform"
                    src="https://cld.c8nayrntn2.qzz.io/header-content-small.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    aria-hidden="true"
                />

                <div ref={overlayRef} className="absolute inset-0 bg-brand-ink opacity-55" />

                <div ref={contentRef} className="absolute inset-0 flex items-center justify-center px-4 will-change-transform">
                    <div
                        className={`text-center transition-all duration-1000 ease-out motion-reduce:transition-none ${
                            shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                        }`}
                    >
                        <p className="text-xs sm:text-sm md:text-base uppercase tracking-[0.25em] font-semibold text-brand-mist/80">
                            Selamat Datang di
                        </p>
                        <h1 className="mt-3 font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold uppercase tracking-wide leading-none text-white">
                            SMK PLUS
                            <br />
                            {/* delay: coretan mulai setelah judul selesai muncul (fade 1 detik) */}
                            PELITA NUSANTARA
                        </h1>
                        <p className="text-xs sm:text-sm md:text-base uppercase tracking-[0.25em] font-semibold text-brand-mist/80">
                            <SketchUnderline size="lg" tone="text-brand-signal" delay={700}>Terampil, Entrepreneur, Religius</SketchUnderline>
                        </p>
                    </div>
                </div>

                {/* Petunjuk scroll ke bawah */}
                <button
                    ref={hintRef}
                    type="button"
                    onClick={() => smoothScrollTo(nextSectionTop())}
                    aria-label="Scroll ke bawah"
                    className="group absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/80 transition-colors hover:text-white"
                >
                    <span className="text-xs font-semibold uppercase tracking-[0.25em]">Scroll Down</span>
                    <SketchArrow direction="down" className="w-3.5 h-7 animate-bounce motion-reduce:animate-none" />
                </button>
            </section>

            {/* Penanda awal section berikutnya */}
            <div ref={endRef} aria-hidden="true" />
        </>
    )
}
