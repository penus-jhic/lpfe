import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import AdminIcon from "./AdminIcon";
import { SketchUnderline } from "../../components/SketchFrame";

// Judul halaman admin, sama dengan judul halaman panel BKK & PPDB (Oswald kapital + garis coretan).
// back = tautan kembali (mis. ke daftar), actions = tombol di kanan
export default function PageHeader({ title, description, back, actions }: {
    title: string;
    description?: ReactNode;
    back?: { to: string; label: string };
    actions?: ReactNode;
}) {
    return(
        <header className="mb-6 md:mb-8">
            {back && (
                <Link to={back.to} className="mb-3 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-ink/60 transition-colors hover:text-brand-darkred">
                    <AdminIcon name="chevronLeft" className="w-4 h-4" />
                    {back.label}
                </Link>
            )}
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div className="min-w-0">
                    <h1 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-wide text-brand-ink leading-tight">
                        <SketchUnderline size="md">{title}</SketchUnderline>
                    </h1>
                    {description && <p className="mt-4 max-w-2xl text-sm leading-relaxed text-brand-ink/60">{description}</p>}
                </div>
                {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
            </div>
        </header>
    )
}
