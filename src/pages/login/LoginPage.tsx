import { useState, type FormEvent, type ReactNode } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../admin/auth/auth-context";
import AdminIcon from "../../admin/components/AdminIcon";
import Spinner from "../../admin/components/Spinner";
import { useDocumentTitle } from "../../admin/lib/format";
import Icon, { type IconName } from "../../components/Icon";
import { SketchArrow, SketchBox, SketchRule, SketchSparks, SketchUnderline } from "../../components/SketchFrame";
import { ApiError } from "../../lib/api";
import logoSekolah from "../../assets/images/logosmkpenus.png";
import fotoGedung from "../../assets/images/fotogedung.jpg";

// Isi yang bisa dikelola dari panel admin, tampil sebagai daftar berpanah coretan di panel kiri
const features = [
    "Tulis dan terbitkan berita sekolah",
    "Atur program unggulan di beranda",
    "Unggah foto ruang praktik & sarana penunjang",
];

export default function LoginPage() {
    useDocumentTitle("Masuk Administrator");
    const { status, login } = useAuth();
    const location = useLocation();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string[]>>({});
    const [message, setMessage] = useState<string | null>(null);

    // Kembali ke halaman yang sebelumnya ingin dibuka sebelum diarahkan ke /login
    const from = (location.state as { from?: string } | null)?.from ?? "/admin";

    // Jika sudah terotentikasi, alihkan langsung ke panel admin
    if (status === "authenticated") {
        return <Navigate to={from} replace />;
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setErrors({});
        setMessage(null);

        try {
            // Melakukan request login POST ke /api/user/login dengan JSON Payload { username, password }
            // access_token disimpan sebagai Cookie secara otomatis
            await login(username.trim(), password);
        } catch (error) {
            if (error instanceof ApiError && error.status === 422) {
                setErrors(error.errors);
            } else {
                setMessage(error instanceof ApiError ? error.message : "Gagal masuk. Coba lagi.");
            }
        } finally {
            setSubmitting(false);
        }
    };

    return(
        // text-left menimpa justify dari body untuk seluruh halaman
        <main className="min-h-svh grid lg:grid-cols-2 bg-white text-brand-ink text-left">
            {/* Kiri (desktop): panel merek gelap di atas foto gedung sekolah */}
            <section className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-brand-ink p-12 xl:p-16 text-white">
                <img src={fotoGedung} alt="" className="absolute inset-0 w-full h-full object-cover" />
                <div aria-hidden="true" className="absolute inset-0 bg-linear-to-br from-brand-deepred/90 via-brand-ink/90 to-brand-ink" />
                {/* Dekorasi titik-titik, sama seperti halaman 404 */}
                <div aria-hidden="true" className="pointer-events-none absolute right-10 top-12 w-40 h-28 bg-[radial-gradient(circle,rgb(255_255_255/0.12)_2px,transparent_2.5px)] bg-size-[22px_22px]" />

                <SchoolBrand tone="text-white" taglineTone="text-brand-warmred" />

                <div className="relative max-w-lg">
                    <p className="text-xs uppercase tracking-[0.25em] font-semibold text-brand-mist/80">
                        <SketchSparks tone="text-brand-warmred">Panel Administrator</SketchSparks>
                    </p>
                    <h1 className="mt-5 font-display text-4xl xl:text-5xl font-bold uppercase tracking-wide leading-tight">
                        {/* Coretan hanya di kata terakhir supaya garisnya tidak melebar saat judul terlipat */}
                        Kelola Isi Situs{" "}
                        <span className="text-brand-warmred">
                            <SketchUnderline tone="text-brand-warmred" delay={400}>Sekolah</SketchUnderline>
                        </span>
                    </h1>
                    {/* mt-8: memberi ruang untuk garis coretan yang menggantung di bawah judul */}
                    <p className="mt-8 text-base leading-relaxed text-brand-mist/75">
                        Semua perubahan dari panel ini langsung tampil di landing page SMK Plus Pelita Nusantara.
                    </p>

                    <ul className="mt-8 space-y-3.5">
                        {features.map((feature, i) => (
                            <li key={feature} className="flex items-start gap-3 text-sm font-medium text-white/90">
                                <span className="shrink-0 mt-1 text-brand-warmred">
                                    <SketchArrow delay={700 + i * 200} className="w-7 h-3.5" />
                                </span>
                                {feature}
                            </li>
                        ))}
                    </ul>
                </div>

                <p className="relative text-xs text-brand-mist/50">
                    &copy; {new Date().getFullYear()} SMK Plus Pelita Nusantara
                </p>
            </section>

            {/* Kanan: formulir masuk */}
            <section className="relative flex items-center justify-center overflow-hidden bg-brand-softmist/50 px-6 py-16">
                <div aria-hidden="true" className="pointer-events-none absolute left-0 bottom-10 w-24 h-56 bg-[radial-gradient(circle,var(--color-brand-mist)_1.5px,transparent_2px)] bg-size-[14px_14px] mask-[linear-gradient(to_top,black,transparent)]" />

                <div className="relative w-full max-w-md animate-fade-up">
                    {/* HP & tablet: panel kiri disembunyikan, jadi identitas sekolah tampil di atas formulir */}
                    <div className="mb-10 flex justify-center lg:hidden">
                        <SchoolBrand tone="text-brand-ink" taglineTone="text-brand-darkred" />
                    </div>

                    {/* Bingkai coretan penuh menggantikan border & rounded-card, sama seperti kartu di beranda */}
                    <div className="relative bg-white px-6 py-9 sm:px-10 sm:py-11">
                        <SketchBox delay={200} />

                        <p className="text-xs uppercase tracking-[0.25em] font-semibold text-brand-darkred">
                            Akses Khusus Pengelola
                        </p>
                        <h2 className="mt-3 font-display text-3xl font-bold uppercase tracking-wide leading-tight">
                            Masuk ke Panel
                        </h2>
                        <p className="mt-2 text-sm leading-relaxed text-brand-ink/60">
                            Gunakan akun pengelola sekolah (Admin, Kepala Sekolah, atau TU).
                        </p>

                        {message && (
                            // Garis tegak coretan di kiri pesan, pengganti kotak berborder
                            <div role="alert" className="relative mt-6 flex items-start gap-2.5 bg-brand-signal/5 py-3 pl-7 pr-4 text-sm leading-relaxed text-brand-deepred">
                                <SketchRule bold vertical className="text-brand-signal -top-1 -bottom-1 left-0 w-3" />
                                <AdminIcon name="alert" className="mt-0.5 w-4 h-4 shrink-0 text-brand-signal" />
                                <span>{message}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-7">
                            <SketchField id="username" label="Username" icon="user" error={errors.username?.[0]}>
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    autoComplete="username"
                                    required
                                    autoFocus
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    aria-invalid={errors.username ? true : undefined}
                                    aria-describedby={errors.username ? "username-error" : undefined}
                                    placeholder="Contoh: admin"
                                    className={inputClass}
                                />
                            </SketchField>

                            <SketchField id="password" label="Kata Sandi" icon="shield" error={errors.password?.[0]}>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    aria-invalid={errors.password ? true : undefined}
                                    aria-describedby={errors.password ? "password-error" : undefined}
                                    placeholder="••••••••"
                                    className={`${inputClass} pr-10`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                                    aria-pressed={showPassword}
                                    className="absolute right-0 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center text-brand-ink/40 transition-colors hover:text-brand-darkred"
                                >
                                    <AdminIcon name={showPassword ? "eyeOff" : "eye"} className="w-4 h-4" />
                                </button>
                            </SketchField>

                            {/* Tombol utama sama seperti tombol "Kembali ke Beranda" di halaman 404 */}
                            <button
                                type="submit"
                                disabled={submitting}
                                className="group mt-2 flex w-full items-center justify-center gap-3 rounded-full bg-linear-to-r from-brand-signal to-brand-darkred px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-brand-darkred/25 transition-transform hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-60"
                            >
                                {submitting ? <Spinner className="w-4 h-4" label="Sedang masuk" /> : null}
                                {submitting ? "Sedang Masuk..." : "Masuk ke Panel Admin"}
                                {!submitting && <SketchArrow className="w-8 h-4 transition-transform group-hover:translate-x-1" />}
                            </button>
                        </form>
                    </div>

                    <p className="mt-8 text-center">
                        <Link
                            to="/"
                            className="group inline-flex items-center gap-2.5 text-sm font-semibold text-brand-darkred"
                        >
                            <SketchArrow className="w-7 h-3.5 -scale-x-100 transition-transform group-hover:-translate-x-1" />
                            Kembali ke Beranda Situs
                        </Link>
                    </p>
                </div>
            </section>
        </main>
    );
}

// Kolom isian bergaris coretan seperti menulis di buku (sama seperti kolom cari di Direktori Guru),
// garisnya makin tegas saat sedang diketik dan berubah merah saat isiannya salah
const inputClass = "w-full bg-transparent py-2.5 pl-7 text-sm placeholder:text-brand-ink/35 focus:outline-none";

function SketchField({ id, label, icon, error, children }: {
    id: string;
    label: string;
    icon: IconName;
    error?: string;
    children: ReactNode;
}) {
    return(
        <div>
            <label htmlFor={id} className="block text-xs font-semibold uppercase tracking-wider text-brand-ink/70">
                {label}
            </label>
            <div className="group relative mt-1.5">
                <Icon name={icon} className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-darkred" />
                {children}
                <SketchRule
                    bold
                    className={`-left-1 -right-1 -bottom-1.5 h-3 transition-colors ${
                        error ? "text-brand-signal" : "text-brand-darkred/35 group-focus-within:text-brand-darkred"
                    }`}
                />
            </div>
            {error && <p id={`${id}-error`} className="mt-3 text-sm text-brand-signal">{error}</p>}
        </div>
    );
}

// Logo & nama sekolah, sama seperti di footer. Mengarah ke beranda
function SchoolBrand({ tone, taglineTone }: { tone: string; taglineTone: string }) {
    return(
        <Link to="/" className="group relative flex w-fit items-center gap-3">
            <img src={logoSekolah} alt="" className="h-12 w-12 shrink-0 object-contain transition-transform group-hover:scale-105" />
            <span className="flex flex-col">
                <span className={`font-display text-base font-bold uppercase tracking-wide leading-tight ${tone}`}>
                    SMK Plus Pelita Nusantara
                </span>
                <span className={`mt-0.5 text-[10px] uppercase font-semibold tracking-wider ${taglineTone}`}>
                    We Are Different
                </span>
            </span>
        </Link>
    );
}
