import { Link } from "react-router-dom";
import { SketchBox, SketchCorner, SketchRule, SketchSparks, SketchUnderline } from "../SketchFrame";
import { TeacherPhoto } from "../TeacherCard";
import { teacherGroup, type Teacher } from "../../data/teachers";

const chevron = (
    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m9 6 6 6-6 6" />
    </svg>
);

export default function ProfileTeacher({ teacher }: { teacher: Teacher }) {
    const latest = teacher.education?.[0];

    // Hanya angka yang datanya ada, jadi profil yang belum lengkap tetap rapi
    const stats = [
        teacher.since ? { value: String(teacher.since), label: "Mengajar sejak" } : null,
        latest ? { value: latest.level, label: "Pendidikan terakhir" } : null,
        teacher.certifications?.length ? { value: String(teacher.certifications.length), label: "Sertifikasi" } : null,
    ].filter((stat) => stat !== null);

    return(
        // Kepala profil berlatar terang seperti halaman detail berita; pt besar supaya tidak tertutup navbar.
        // Section isi profil di bawahnya juga putih, jadi keduanya menyatu.
        <section className="relative bg-white text-brand-ink px-6 pt-32 md:pt-40">
            {/* Dekorasi titik-titik */}
            <div aria-hidden="true" className="pointer-events-none absolute right-6 top-28 hidden md:block w-40 h-28 bg-[radial-gradient(circle,var(--color-brand-mist)_2px,transparent_2.5px)] bg-size-[22px_22px]" />

            <div className="relative max-w-6xl mx-auto">
                <nav aria-label="Breadcrumb">
                    {/* Tanpa flex-wrap: nama guru yang menyusut & terpotong, supaya breadcrumb tetap satu baris di HP */}
                    <ol className="flex items-center gap-2 text-sm text-brand-ink/50">
                        <li className="shrink-0">
                            <Link to="/" className="transition-colors hover:text-brand-darkred">Beranda</Link>
                        </li>
                        <li className="flex shrink-0 items-center gap-2">
                            {chevron}
                            <Link to="/profil-guru" className="transition-colors hover:text-brand-darkred">Profil Guru</Link>
                        </li>
                        <li className="flex min-w-0 items-center gap-2">
                            {chevron}
                            <span aria-current="page" className="truncate font-medium text-brand-ink">{teacher.name}</span>
                        </li>
                    </ol>
                </nav>

                <div className="mt-12 md:mt-14 grid gap-14 md:gap-16 md:grid-cols-[2fr_3fr] md:items-center">
                    {/* max-w-60 di HP: nama guru tetap terlihat di layar pertama, tidak terdorong ke bawah oleh foto */}
                    <div className="relative w-full max-w-60 sm:max-w-xs mx-auto md:max-w-none animate-fade-up [animation-delay:150ms]">
                        <TeacherPhoto
                            teacher={teacher}
                            alt={`Foto ${teacher.name}`}
                            className="aspect-4/5 rounded-card shadow-2xl"
                            initialsSize="text-8xl md:text-9xl"
                        />

                        {/* Garis siku coretan di pojok kanan atas & kiri bawah foto, sama seperti foto sambutan kepala program */}
                        <SketchCorner className="-top-5 -right-5 w-16 h-16 md:-top-8 md:-right-8 md:w-28 md:h-28 rotate-90" />
                        <SketchCorner delay={350} className="-bottom-5 -left-5 w-16 h-16 md:-bottom-8 md:-left-8 md:w-28 md:h-28 -rotate-90" />
                    </div>

                    <div className="animate-fade-up">
                        <p className="text-xs sm:text-sm md:text-base uppercase tracking-[0.25em] font-semibold text-brand-darkred">
                            <SketchSparks>{teacherGroup(teacher)}</SketchSparks>
                        </p>
                        {/* Tanpa "uppercase" supaya gelar seperti M.Pd. tidak berubah jadi M.PD.
                            text-left: nama yang terlipat jadi renggang antar katanya kalau ikut justify dari body */}
                        <h1 className="mt-4 text-left font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-wide leading-tight">
                            {teacher.name}
                        </h1>

                        {/* Jabatan dengan coretan bawah, sama seperti tagline di hero jurusan. delay: mulai setelah teks selesai muncul */}
                        <p className="mt-5 text-left text-xs sm:text-sm md:text-base uppercase tracking-[0.25em] font-semibold">
                            <SketchUnderline size="lg" tone="text-brand-signal" delay={500}>{teacher.role}</SketchUnderline>
                        </p>

                        {teacher.quote && (
                            // mt-12: memberi ruang untuk garis coretan yang menggantung di bawah jabatan.
                            // Garis tegak coretan di kiri kutipan, sama seperti kutipan di halaman berita
                            <figure className="relative mt-12 py-1 pl-8 md:pl-10">
                                <SketchRule bold vertical delay={300} className="text-brand-darkred -top-1 -bottom-1 left-0 w-3" />
                                <blockquote className="text-lg font-semibold leading-snug">&ldquo;{teacher.quote}&rdquo;</blockquote>
                            </figure>
                        )}

                        {/* Keterangan untuk profil yang isinya masih contoh (lihat contoh() di data/teachers.ts) */}
                        {teacher.dummy && (
                            <p role="note" className={`${teacher.quote ? "mt-6" : "mt-12"} rounded-xl border border-dashed border-brand-darkred/40 bg-brand-darkred/5 px-4 py-3 text-left text-sm leading-relaxed text-brand-ink/70`}>
                                <span className="font-semibold text-brand-darkred">Data contoh.</span>{" "}
                                Pesan dan isi profil ini masih data sementara (dummy) dan akan diperbarui dengan
                                data asli dari sekolah.
                            </p>
                        )}

                        {stats.length > 0 && (
                            // gap-6: ujung bingkai coretan kebablasan ±8px, jadi kotak bersebelahan tidak saling tabrak.
                            // text-left: kotak sempit, label yang terbungkus jadi renggang kalau ikut justify dari body
                            <dl className={`grid grid-cols-3 gap-6 text-left ${teacher.quote || teacher.dummy ? "mt-10" : "mt-12"}`}>
                                {stats.map((stat, i) => (
                                    <div key={stat.label} className="relative flex flex-col-reverse justify-end p-3 sm:p-4 md:p-5">
                                        {/* Bingkai coretan penuh, sama seperti kotak "Sekolah dalam Angka" di halaman Tentang */}
                                        <SketchBox delay={i * 150} />
                                        <dt className="mt-1.5 text-sm text-brand-ink/70">{stat.label}</dt>
                                        <dd className="font-display text-3xl md:text-4xl font-bold uppercase tracking-wide leading-none text-brand-darkred">
                                            {stat.value}
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
