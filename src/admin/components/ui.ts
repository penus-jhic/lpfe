// Kelas Tailwind yang dipakai berulang di panel admin. Bentuk & warnanya sama dengan panel admin BKK & PPDB
// (tombol pil, kartu rounded-card, token warna brand-* dari .dash-theme)

export const inputClass =
    "block w-full rounded-xl border border-brand-ink/15 bg-white px-4 py-2.5 text-sm text-brand-ink placeholder:text-brand-muted transition focus:border-brand-darkred focus:outline-none focus:ring-4 focus:ring-brand-darkred/10 disabled:bg-brand-paper";

export const buttonPrimary =
    "inline-flex items-center justify-center gap-2 rounded-full py-2.5 bg-linear-to-r from-brand-signal to-brand-darkred px-5 text-sm font-semibold text-white shadow-[0_4px_14px_0_rgba(122,16,24,0.25)] transition-all hover:-translate-y-px hover:shadow-[0_6px_20px_0_rgba(122,16,24,0.35)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-darkred disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60";

export const buttonSecondary =
    "inline-flex items-center justify-center gap-2 rounded-full py-2.5 border border-brand-ink/15 bg-white px-5 text-sm font-semibold text-brand-ink transition-colors hover:bg-brand-softmist focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-ink disabled:cursor-not-allowed disabled:opacity-60";

export const buttonDanger =
    "inline-flex items-center justify-center gap-2 rounded-full py-2.5 bg-red-600 px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:cursor-not-allowed disabled:opacity-60";

// Tombol ikon kecil di baris tabel/kartu (edit, hapus, naik, turun)
export const iconButton =
    "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-brand-muted transition-colors hover:bg-brand-softmist hover:text-brand-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-darkred disabled:pointer-events-none disabled:opacity-30";

export const cardClass = "rounded-card border border-brand-ink/10 bg-white shadow-card";
