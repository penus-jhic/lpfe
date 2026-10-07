import { useEffect, useRef, useState } from "react";
import heroVideo from "../../assets/videos/header-content-small.mp4";
import { SketchArrow, SketchUnderline } from "../SketchFrame";

export default function HeroHome() {
    const endRef = useRef<HTMLDivElement>(null);
    const [shown, setShown] = useState(false);

    const nextSectionTop = () =>
        (endRef.current?.getBoundingClientRect().top ?? window.innerHeight) + window.scrollY;

    useEffect(() => {
        const frame = requestAnimationFrame(() => setShown(true));
        return () => cancelAnimationFrame(frame);
    }, []);

    useEffect(() => {
        const DELAY = 3000;
        let frame = 0;
        let cancelled = false;

        const cancel = () => {
            cancelled = true;
            window.clearTimeout(timer);
            cancelAnimationFrame(frame);
        };

        const scrollTo = (target: number) => {
            if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
                window.scrollTo(0, target);
                return;
            }

            const from = window.scrollY;
            const duration = 1600;
            const start = performance.now();
            const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

            const step = (now: number) => {
                if (cancelled) return;
                const t = Math.min((now - start) / duration, 1);
                window.scrollTo(0, from + (target - from) * ease(t));
                if (t < 1) frame = requestAnimationFrame(step);
            };
            frame = requestAnimationFrame(step);
        };

        const timer = window.setTimeout(() => {
            if (cancelled || window.scrollY > 0) return;
            scrollTo(nextSectionTop());
        }, DELAY);

        const events = ["wheel", "touchstart", "keydown", "mousedown"] as const;
        events.forEach((e) => window.addEventListener(e, cancel, { passive: true }));
        return () => {
            cancel();
            events.forEach((e) => window.removeEventListener(e, cancel));
        };
    }, []);

    return(
        <>
            {/* Video menempel di layar, lalu ditutup oleh section berikutnya */}
            <section className="sticky top-0 h-screen w-full overflow-hidden bg-brand-ink">
                <video
                    className="absolute inset-0 w-full h-full object-cover"
                    src={heroVideo}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    aria-hidden="true"
                />

                <div className="absolute inset-0 bg-brand-ink opacity-55" />

                <div className="absolute inset-0 flex items-center justify-center px-4">
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
                    type="button"
                    onClick={() => {
                        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
                        window.scrollTo({ top: nextSectionTop(), behavior: reduce ? "auto" : "smooth" });
                    }}
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
