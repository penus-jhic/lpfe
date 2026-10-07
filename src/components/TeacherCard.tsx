import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { SketchArrow, SketchBox } from "./SketchFrame";
import type { Teacher } from "../data/teachers";

// "Drs. Ahmad Fauzi, M.Pd." -> "AF": gelar di depan (berakhiran titik) & setelah koma dilewati
function initials(name: string) {
    return name
        .split(",")[0]
        .split(" ")
        .filter((word) => word && !word.endsWith("."))
        .slice(0, 2)
        .map((word) => word[0])
        .join("");
}

// Foto potret guru, atau inisial nama di atas gradasi selama belum ada foto. Dipakai di kartu guru, halaman profil
// guru, & sambutan kepala program. className = rasio, sudut & bayangan; initialsSize = ukuran huruf inisial.
// zoom = foto membesar saat kartu induknya (".group") di-hover. children = label yang ditumpuk di atas foto.
export function TeacherPhoto({ teacher, className, initialsSize = "text-5xl", alt = "", zoom = false, children }: {
    teacher: Teacher;
    className: string;
    initialsSize?: string;
    alt?: string;
    zoom?: boolean;
    children?: ReactNode;
}) {
    return(
        <div className={`relative overflow-hidden bg-linear-to-b from-brand-rose to-brand-ink ${className}`}>
            {teacher.image ? (
                <img
                    src={teacher.image}
                    alt={alt}
                    className={`absolute inset-0 size-full object-cover ${zoom ? "transition-transform duration-500 group-hover:scale-105" : ""}`}
                    loading="lazy"
                />
            ) : (
                <span
                    aria-hidden="true"
                    className={`absolute inset-0 flex items-center justify-center font-display font-bold uppercase tracking-wide text-white/30 ${initialsSize}`}
                >
                    {initials(teacher.name)}
                </span>
            )}
            {children}
        </div>
    )
}

// Kartu guru berbingkai coretan penuh, membuka halaman profil guru. Beri jarak antar kartu minimal gap-6
// karena ujung bingkainya kebablasan ±8px. featured = kartu kepala sekolah di bagan pimpinan.
export default function TeacherCard({ teacher, featured = false, delay = 0 }: {
    teacher: Teacher;
    featured?: boolean;
    delay?: number;
}) {
    return(
        // text-left: kartu sempit, nama yang terbungkus jadi renggang kalau ikut justify dari body
        <Link
            to={`/profil-guru/${teacher.id}`}
            className="group relative h-full flex flex-col p-3 text-left transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-darkred"
        >
            <SketchBox delay={delay} />

            <TeacherPhoto teacher={teacher} zoom className="aspect-4/5 rounded-card" initialsSize={featured ? "text-7xl" : "text-5xl"} />

            <div className="flex-1 flex flex-col px-1 pt-4 pb-1">
                <h3 className={`font-semibold leading-snug ${featured ? "text-lg" : "text-base"}`}>{teacher.name}</h3>
                <p className="mt-1 text-sm leading-relaxed text-brand-ink/60">{teacher.role}</p>

                {/* mt-auto: di baris yang tingginya disamakan, tautan menempel di bawah kartu */}
                <span className="mt-auto pt-4 flex items-center gap-2 text-sm font-semibold text-brand-darkred">
                    Lihat Profil
                    <SketchArrow className="w-6 h-3 transition-transform group-hover:translate-x-1" />
                </span>
            </div>
        </Link>
    )
}
