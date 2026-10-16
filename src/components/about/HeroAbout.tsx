// TODO: ganti dengan foto gedung sekolah
import fotoGedung from "../../assets/images/about/fotogedung.jpg";
import { SketchUnderline } from "../SketchFrame";

export default function HeroAbout() {
    return(
        <section className="relative flex items-end justify-center h-[70svh] min-h-112 overflow-hidden bg-brand-ink px-6 pb-20 md:pb-28 text-white">
            <img src={fotoGedung} alt="" className="absolute inset-0 size-full object-cover" fetchPriority="high" />
            {/* Makin gelap ke bawah supaya tulisan tetap terbaca di atas foto */}
            <div aria-hidden="true" className="absolute inset-0 bg-linear-to-b from-brand-ink/30 via-brand-ink/40 to-brand-ink/85" />

            <div className="relative max-w-6xl animate-fade-up">
                <h1 className="sr-only">Tentang SMK Plus Pelita Nusantara</h1>
                <p className="flex flex-col md:flex-row md:flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center font-display text-3xl md:text-4xl font-bold uppercase tracking-wide leading-tight">
                    {/* Coretan hanya di satu kata: kalau seluruh frasa, di HP frasanya terlipat dua baris dan
                        garisnya ikut melebar selebar layar. delay: mulai setelah teks selesai muncul (fade 0,5 detik). */}
                    <span>
                        Succeeded By <SketchUnderline tone="text-brand-signal" delay={500}>Character</SketchUnderline>
                    </span>{" "}
                    <span className="hidden md:inline">-</span>{" "}
                    <span className="mt-2 md:mt-0">We Are Different</span>{" "}
                    <span className="hidden md:inline">-</span>{" "}
                    <span>The Future Is Ours!</span>
                </p>
            </div>
        </section>
    )
}
