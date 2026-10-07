// TODO: ganti dengan foto siswa berlatar transparan (PNG)
import fotoSiswa from "../../assets/images/about/fotoSiswa.png";
import { visi, misi } from "../../data/profile";
import { SketchCircle, SketchCorner } from "../SketchFrame";

export default function VisionAbout() {
    return(
        <section id="visi-misi" className="relative scroll-mt-6 bg-white text-brand-ink px-6 py-20 md:py-28">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-left font-display text-3xl md:text-4xl font-bold uppercase tracking-wide leading-tight">
                    <SketchCircle>Visi &amp; Misi</SketchCircle> Sekolah
                </h2>

                <div className="mt-12 md:mt-16 grid gap-14 lg:gap-16 lg:grid-cols-[6fr_5fr] lg:items-center">
                    <div className="relative px-4 py-6 md:p-10">
                        {/* Garis siku coretan di kanan atas & kiri bawah, sama seperti bingkai video di beranda */}
                        <SketchCorner className="top-0 right-0 w-16 h-16 md:w-28 md:h-28 rotate-90" />
                        <SketchCorner delay={350} className="bottom-0 left-0 w-16 h-16 md:w-28 md:h-28 -rotate-90" />

                        <h3 className="flex items-center gap-3 text-lg font-semibold leading-7">
                            <span aria-hidden="true" className="w-2.5 h-2.5 shrink-0 rounded-full bg-brand-ink" />
                            Visi Sekolah
                        </h3>
                        <p className="mt-3 text-base leading-relaxed text-brand-ink/80">{visi}</p>

                        <h3 className="mt-8 flex items-center gap-3 text-lg font-semibold leading-7 text-brand-darkred">
                            <span aria-hidden="true" className="w-2.5 h-2.5 shrink-0 rounded-full bg-brand-ink" />
                            Misi Sekolah
                        </h3>
                        <ol className="mt-3 list-decimal pl-5 space-y-1.5 text-base leading-relaxed text-brand-ink/80">
                            {misi.map((item) => (
                                <li key={item} className="pl-1">{item}</li>
                            ))}
                        </ol>
                    </div>

                    <img src={fotoSiswa} alt="" className="w-full max-w-md mx-auto lg:max-w-lg" />
                </div>
            </div>
        </section>
    )
}
