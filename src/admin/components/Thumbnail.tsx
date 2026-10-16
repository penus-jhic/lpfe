import AdminIcon from "./AdminIcon";

// Foto kecil di daftar admin; ikon gambar kalau belum ada foto. className = ukuran
export default function Thumbnail({ src, className = "h-12 w-16" }: { src: string | null; className?: string }) {
    return(
        <span className={`flex shrink-0 items-center justify-center overflow-hidden rounded-xl border border-brand-ink/10 bg-brand-softmist text-brand-muted ${className}`}>
            {src ? <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" /> : <AdminIcon name="image" className="w-5 h-5" />}
        </span>
    )
}
