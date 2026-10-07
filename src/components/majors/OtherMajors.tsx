import MajorsCarousel from "../MajorsCarousel";
import SketchFrame from "../SketchFrame";
import { majors, type Major } from "../../data/majors";

export default function OtherMajors({ current }: { current: Major }) {
    const others = majors.filter((major) => major.slug !== current.slug);

    if (others.length === 0) return null;

    return(
        // Abu-abu supaya terpisah dari Prospek Karier (putih) di atasnya dan footer (putih) di bawahnya
        <section id="jurusan-lainnya" className="relative z-10 scroll-mt-6 overflow-hidden bg-brand-softmist text-brand-ink px-6 py-20 md:py-24">
            {/* Dekorasi titik-titik, putih karena latarnya abu-abu */}
            <div aria-hidden="true" className="pointer-events-none absolute right-6 top-8 hidden md:block w-32 h-24 bg-[radial-gradient(circle,white_3px,transparent_3.5px)] bg-size-[34px_34px]" />
            <div aria-hidden="true" className="pointer-events-none absolute left-0 top-40 hidden md:block w-24 h-56 bg-[radial-gradient(circle,white_1.5px,transparent_2px)] bg-size-[14px_14px] mask-[linear-gradient(to_bottom,black,transparent)]" />

            <div className="relative max-w-6xl mx-auto">
                <div className="grid gap-4 md:grid-cols-2 md:items-end">
                    <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-wide leading-tight text-left">
                        {/* Margin negatif supaya teks tetap sejajar kartu, garisnya menjorok ke kiri, sama seperti judul "Jurusan" di beranda */}
                        <SketchFrame className="-ml-4 md:-ml-5">Jurusan Lainnya</SketchFrame>
                    </h2>
                    <p className="text-base md:text-lg leading-relaxed text-brand-ink/70 md:max-w-md md:justify-self-end">
                        Masih menimbang pilihan? Bandingkan dengan kompetensi keahlian lain di SMK Plus Pelita Nusantara.
                    </p>
                </div>

                {/* Kartu sama persis dengan bagian "Jurusan" di beranda, hanya tanpa jurusan yang sedang dibuka */}
                <MajorsCarousel majors={others} />
            </div>
        </section>
    )
}
