import type { CSSProperties } from "react";
import TeacherCard from "../TeacherCard";
import SketchFrame, { SketchBox, SketchRule } from "../SketchFrame";
import { leaders } from "../../data/teachers";

const [head, ...deputies] = leaders;

// Garis datar bagan dari tengah kartu wakasek pertama ke tengah kartu terakhir: setengah lebar kartu dari tiap sisi.
// 1.5rem = gap-6 antar kartu
const cols = deputies.length;
const lineInset = `calc((100% - ${cols - 1} * 1.5rem) / ${cols * 2})`;

export default function LeadersTeachers() {
    return(
        // "-mt-10" + rounded-t supaya menumpuk di atas hero, seperti section pertama di beranda
        <section id="pimpinan" className="relative z-10 -mt-10 scroll-mt-6 overflow-hidden bg-white text-brand-ink rounded-t-[2.5rem] px-6 py-20 md:py-28">
            {/* Dekorasi titik-titik */}
            <div aria-hidden="true" className="pointer-events-none absolute right-6 top-10 hidden md:block w-40 h-28 bg-[radial-gradient(circle,var(--color-brand-mist)_2px,transparent_2.5px)] bg-size-[22px_22px]" />

            <div className="relative max-w-6xl mx-auto">
                <div className="grid gap-4 md:grid-cols-2 md:items-end">
                    <div>
                        <p className="text-xs uppercase tracking-[0.25em] font-semibold text-brand-darkred">
                            Pimpinan Sekolah
                        </p>
                        <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold uppercase tracking-wide leading-tight text-left">
                            {/* -ml-4 md:-ml-5: teks judul tetap sejajar eyebrow di atasnya, garis sikunya yang menjorok ke kiri */}
                            <SketchFrame className="-ml-4 md:-ml-5">Struktur Pimpinan</SketchFrame>
                        </h2>
                    </div>
                    <p className="text-base md:text-lg leading-relaxed text-brand-ink/70 md:max-w-md md:justify-self-end">
                        Kepala sekolah dibantu para wakil kepala sekolah yang mengelola kurikulum, kesiswaan,
                        sarana prasarana, dan hubungan dengan dunia industri.
                    </p>
                </div>

                {/* Disclaimer: foto pimpinan diambil acak dari folder guru, nama & isi profil masih data contoh.
                    Hapus setelah data asli dari sekolah diisi di data/teachers.ts */}
                <p role="note" className="relative mt-8 bg-brand-darkred/5 px-5 py-4 text-left text-sm leading-relaxed text-brand-ink/70">
                    <SketchBox tone="text-brand-darkred/50" />
                    <span className="font-semibold text-brand-darkred">Disclaimer: bukan data sebenarnya.</span>{" "}
                    Nama, jabatan, foto, dan isi profil guru serta pimpinan di halaman ini hanya data contoh untuk
                    keperluan demo. Foto pimpinan dipasang secara acak dan bukan foto orang yang bersangkutan.
                </p>

                {/* Bagan: kepala sekolah di atas, wakil kepala sekolah berjajar di bawahnya.
                    Garis penghubung coretan (desktop) digambar berurutan: turun dari kepala sekolah, mendatar, lalu turun ke tiap kartu */}
                <div className="mt-12 md:mt-16">
                    {head && (
                        <div className="mx-auto max-w-60 sm:max-w-64">
                            <TeacherCard teacher={head} featured />
                        </div>
                    )}

                    {cols > 0 && (
                        <>
                            {/* mt-1: mulai di bawah ujung bingkai coretan kartu yang kebablasan ke bawah */}
                            <div className="relative hidden md:block mx-auto mt-1 h-9 w-3">
                                <SketchRule vertical scale={1.6} className="inset-0 text-brand-darkred/50" />
                            </div>

                            <div className="relative mt-10 md:mt-0 md:pt-10">
                                <div className="absolute top-0 hidden md:block h-3 -translate-y-1/2" style={{ left: lineInset, right: lineInset }}>
                                    <SketchRule scale={1.6} delay={250} className="inset-0 text-brand-darkred/50" />
                                </div>

                                <ul
                                    style={{ "--cols": cols } as CSSProperties}
                                    className="grid grid-cols-2 gap-6 md:grid-cols-[repeat(var(--cols),minmax(0,1fr))]"
                                >
                                    {deputies.map((leader, i) => (
                                        <li key={leader.id} className="relative">
                                            {/* h-9: berhenti di atas ujung bingkai coretan kartu yang kebablasan ke atas */}
                                            <SketchRule vertical scale={1.6} delay={500 + i * 120} className="hidden md:block -top-10 h-9 left-1/2 -translate-x-1/2 w-3 text-brand-darkred/50" />
                                            <TeacherCard teacher={leader} delay={i * 150} />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    )
}
