import MajorsCarousel from "../MajorsCarousel";
import SketchFrame from "../SketchFrame";
import { majors } from "../../data/majors";

export default function MajorsHome() {
    return(
        <section className="relative z-10 overflow-hidden bg-white text-brand-ink px-6 py-20 md:py-24">
            {/* Dekorasi titik-titik */}
            <div aria-hidden="true" className="pointer-events-none absolute right-6 top-8 hidden md:block w-32 h-24 bg-[radial-gradient(circle,var(--color-brand-mist)_3px,transparent_3.5px)] bg-size-[34px_34px]" />
            <div aria-hidden="true" className="pointer-events-none absolute left-0 top-40 hidden md:block w-24 h-56 bg-[radial-gradient(circle,var(--color-brand-mist)_1.5px,transparent_2px)] bg-size-[14px_14px] mask-[linear-gradient(to_bottom,black,transparent)]" />

            <div className="relative max-w-6xl mx-auto">
                <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-wide leading-tight">
                    {/* Margin negatif supaya teks tetap sejajar kartu, garisnya menjorok ke kiri */}
                    <SketchFrame className="-ml-4 md:-ml-5">Jurusan</SketchFrame>
                </h2>

                <MajorsCarousel majors={majors} />
            </div>
        </section>
    )
}
