// TODO: sementara pakai foto kepala sekolah, ganti dengan foto yang menggambarkan sejarah sekolah
import fotoKepsek from "../../assets/images/Kepsek.png";
import SketchFrame, { SketchLine } from "../SketchFrame";

export default function HistoryAbout() {
    return(
        <section id="sejarah" className="relative scroll-mt-6 bg-brand-mist text-brand-ink px-6 pt-20 pb-36 md:pt-28 md:pb-44">
            <div className="max-w-6xl mx-auto grid gap-14 lg:gap-16 lg:grid-cols-[2fr_3fr]">
                <div className="relative w-full max-w-sm mx-auto lg:max-w-none">
                    <img
                        src={fotoKepsek}
                        alt="Kepala Sekolah SMK Plus Pelita Nusantara"
                        className="w-full object-cover"
                        loading="lazy"
                    />
                </div>

                <div>
                    <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-wide leading-tight">
                        {/* -ml-4 md:-ml-5: teks judul tetap sejajar paragraf di bawahnya, garis sikunya yang menjorok ke kiri */}
                        <SketchFrame className="-ml-4 md:-ml-5">Sejarah Sekolah</SketchFrame>
                    </h2>
                    <div className="mt-6 space-y-4 text-base leading-relaxed text-brand-ink/80">
                        <p>
                            SMK Plus Pelita Nusantara merupakan Sekolah Menengah Kejuruan Swasta Terakreditasi A
                            (Unggul) yang berlokasi di Cibinong, Kabupaten Bogor. Berada di lingkungan belajar yang
                            modern dan kondusif, sekolah ini berfokus pada pembentukan sumber daya manusia yang
                            terampil, berjiwa wirausaha (entrepreneur), serta memiliki landasan keagamaan yang kuat.
                        </p>
                        <p>
                            Mengusung motto &ldquo;Success by Character&rdquo;, SMK Plus Pelita Nusantara berkomitmen
                            tidak hanya mencetak lulusan yang siap kerja di dunia usaha dan industri, tetapi juga
                            membentuk pribadi disiplin, berintegritas, serta berdaya saing nasional.
                        </p>
                    </div>
                </div>
            </div>

            {/* Dua garis coretan panjang yang saling bergeser di bawah section; garis kanan digambar dari kanan */}
            <SketchLine className="left-0 bottom-20 md:bottom-24 w-[78%] h-3" />
            <SketchLine delay={300} className="right-0 bottom-12 md:bottom-14 w-1/2 h-3 -scale-x-100" />
        </section>
    )
}
