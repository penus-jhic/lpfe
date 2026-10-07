import fotoKepsek from "../../assets/images/Kepsek.png"
import SketchFrame from "../SketchFrame";

export default function PrincipalHome() {
    return(
        <section className="relative z-10 text-brand-ink px-6 py-20 md:py-28 bg-brand-softmist">
            <div className="max-w-6xl mx-auto">
                <div className="mt-12 md:mt-16 grid gap-10 md:gap-16 md:grid-cols-[2fr_3fr] items-start">
                    <figure className="w-full max-w-sm mx-auto md:max-w-none">
                        <img
                            src={fotoKepsek}
                            alt="Kepala Sekolah SMK Plus Pelita Nusantara"
                            className="w-full aspect-auto object-cover "
                            loading="lazy"
                        />
                    </figure>

                    <div className="space-y-8">
                        <h2 className="text-center md:text-justify font-display text-3xl md:text-4xl font-bold uppercase tracking-wide leading-tight">
                            {/* md:-ml-5: saat rata kiri, teks tetap sejajar paragraf di bawahnya */}
                            <SketchFrame className="md:-ml-5">Sambutan Kepala Sekolah</SketchFrame>
                        </h2>
                        <p className="text-base md:text-lg leading-relaxed text-brand-ink/80">
                            SMK Plus Pelita Nusantara berkomitmen mencetak generasi vokasi yang terampil dan
                            berakhlak. Melalui Bursa Kerja Khusus (BKK), kami menjembatani siswa dan alumni dengan
                            peluang Praktik Kerja Lapangan serta karier di berbagai industri mitra.
                        </p>
                        <figcaption className="mt-4 text-center md:text-justify">
                            <span className="block font-semibold">Ibu Sri Mildawati, M.Pd</span>
                            <span className="text-sm text-brand-ink/60">Kepala Sekolah SMK Plus Pelita Nusantara</span>
                        </figcaption>
                    </div>
                </div>
            </div>
        </section>
    )
}