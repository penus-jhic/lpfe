import { Link } from "react-router-dom";
import Icon from "./Icon";
import { SketchArrow, SketchRule } from "./SketchFrame";
import type { Major } from "../data/majors";
import logoSekolah from "../assets/images/logosmkpenus.png";

export default function MajorCard({ major }: { major: Major }) {
    const name = `${major.highlight} ${major.rest}`.trim();

    return(
        // aspect-3/5: kartu potret setinggi foto siswa, isi kartu ditumpuk di atas foto
        <Link
            to={`/jurusan/${major.slug}`}
            aria-label={`${name} (${major.code})`}
            className="group relative block aspect-3/5 overflow-hidden rounded-[1.25rem] bg-brand-ink shadow-softpill transition-transform duration-300 hover:-translate-y-1"
        >
            {/* object-top supaya kepala tidak terpotong kalau foto harus dipotong atas-bawah.
                scale-105: foto PNG-nya sudah punya sudut membulat berlatar putih, diperbesar sedikit supaya tidak terlihat */}
            {major.image ? (
                <img
                    src={major.image}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover object-top scale-105 transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                />
            ) : (
                <div className="absolute inset-0 flex items-center justify-center text-white/15">
                    <Icon name={major.icon} className="w-16 h-16" />
                </div>
            )}

            {/* Foto sedikit digelapkan, lebih pekat di atas & bawah supaya teks putih tetap terbaca */}
            <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/15 to-black/70 transition-colors duration-300 group-hover:via-black/5" />

            {/* Logo, garis pemisah coretan, lalu kode & nama jurusan */}
            <div className="absolute inset-x-0 top-0 flex items-stretch gap-2.5 p-4 text-left text-white">
                <img
                    src={major.logo ?? logoSekolah}
                    alt=""
                    className="w-9 h-9 shrink-0 self-center object-contain drop-shadow-md"
                    loading="lazy"
                />
                <span className="relative w-3 shrink-0">
                    <SketchRule bold vertical className="inset-0 text-white/80" />
                </span>
                <span className="min-w-0 drop-shadow-md">
                    <span className="block text-xl font-extrabold leading-tight">{major.code}</span>
                    <span className="block text-xs italic leading-snug text-white/85">{name}</span>
                </span>
            </div>

            <span className="absolute bottom-4 right-4 flex items-center gap-1.5 text-sm font-semibold text-white">
                See More
                <span className="text-brand-warmred">
                    <SketchArrow className="w-7 h-3.5 transition-transform group-hover:translate-x-1" />
                </span>
            </span>
        </Link>
    )
}
