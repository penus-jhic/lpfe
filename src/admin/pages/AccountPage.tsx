import { useState, type FormEvent } from "react";
import { useAuth, type AdminUser } from "../auth/auth-context";
import Field from "../components/Field";
import PageHeader from "../components/PageHeader";
import Spinner from "../components/Spinner";
import { buttonPrimary, cardClass, inputClass } from "../components/ui";
import { useToast } from "../toast/toast-context";
import { useDocumentTitle } from "../lib/format";
import { scrollToFirstError } from "../lib/forms";
import { ApiError, apiRequest } from "../../lib/api";

type ApiResponse<T> = {
    success: boolean;
    message: string;
    data: T;
};

export default function AccountPage() {
    useDocumentTitle("Akun Administrator");
    const { user, setUser } = useAuth();
    const toast = useToast();

    // Data profil yang dapat diedit
    const [namaLengkap, setNamaLengkap] = useState(user?.nama_lengkap ?? user?.name ?? "");
    const [email, setEmail] = useState(user?.email ?? "");
    const [noHp, setNoHp] = useState(user?.no_hp ?? "");
    const [jenisKelamin, setJenisKelamin] = useState<string>(user?.jenis_kelamin ?? "");
    const [alamat, setAlamat] = useState(user?.alamat ?? "");

    // Data penggantian kata sandi
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");

    const [errors, setErrors] = useState<Record<string, string[]>>({});
    const [saving, setSaving] = useState(false);

    const err = (key: string) => errors[key]?.[0];

    const submit = async (e: FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setErrors({});

        const validationErrors: Record<string, string[]> = {};

        // Validasi frontend untuk ganti password jika diisi
        if (newPassword || oldPassword) {
            if (!oldPassword) {
                validationErrors.old_password = ["Kata sandi saat ini wajib diisi."];
            }
            if (!newPassword) {
                validationErrors.new_password = ["Kata sandi baru wajib diisi."];
            } else if (newPassword.length < 6) {
                validationErrors.new_password = ["Kata sandi baru minimal harus 6 karakter."];
            } else if (newPassword === oldPassword) {
                validationErrors.new_password = ["Kata sandi baru tidak boleh sama dengan kata sandi saat ini."];
            }

            if (newPassword !== newPasswordConfirmation) {
                validationErrors.new_password_confirmation = ["Konfirmasi kata sandi baru tidak cocok."];
            }
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            toast.error("Periksa kembali isian formulir yang ditandai merah.");
            scrollToFirstError();
            setSaving(false);
            return;
        }

        try {
            let updatedUser = user;

            // 1. Perbarui Profil Pengguna jika ada perubahan
            const profilePayload: Record<string, string | null> = {};
            if (namaLengkap.trim() !== (user?.nama_lengkap ?? "")) profilePayload.nama_lengkap = namaLengkap.trim();
            if ((email.trim() || null) !== user?.email) profilePayload.email = email.trim() || null;
            if ((noHp.trim() || null) !== user?.no_hp) profilePayload.no_hp = noHp.trim() || null;
            if ((jenisKelamin || null) !== user?.jenis_kelamin) profilePayload.jenis_kelamin = jenisKelamin || null;
            if ((alamat.trim() || null) !== user?.alamat) profilePayload.alamat = alamat.trim() || null;

            if (Object.keys(profilePayload).length > 0) {
                const profileRes = await apiRequest<ApiResponse<AdminUser>>("/user/profile", {
                    method: "PUT",
                    body: profilePayload,
                });
                updatedUser = { ...profileRes.data, name: profileRes.data.nama_lengkap };
                setUser(updatedUser);
            }

            // 2. Perbarui Kata Sandi jika diisi
            if (oldPassword && newPassword) {
                await apiRequest<{ success: boolean; message: string }>("/user/password", {
                    method: "PUT",
                    body: {
                        old_password: oldPassword,
                        new_password: newPassword,
                    },
                });
                setOldPassword("");
                setNewPassword("");
                setNewPasswordConfirmation("");
            }

            toast.success("Informasi akun berhasil disimpan.");
        } catch (error) {
            if (error instanceof ApiError) {
                if (error.errors && Object.keys(error.errors).length > 0) {
                    setErrors(error.errors);
                }
                toast.error(error.message);
                scrollToFirstError();
            } else {
                toast.error("Terjadi kegagalan saat menyimpan data akun.");
            }
        } finally {
            setSaving(false);
        }
    };

    return (
        <>
            <PageHeader
                title="Akun Administrator"
                description="Kelola informasi identitas, kontak profil, dan kata sandi akun warga sekolah Anda."
            />

            <form onSubmit={submit} noValidate className="max-w-3xl space-y-6">
                {/* Informasi Akun Terproteksi (Read-Only) */}
                <section className={`${cardClass} space-y-4 p-5 sm:p-6`} aria-labelledby="account-info-heading">
                    <div className="flex items-center justify-between border-b border-brand-charcoal/10 pb-3">
                        <div>
                            <h2 id="account-info-heading" className="font-semibold text-brand-ink">
                                Informasi Pengguna Sekolah
                            </h2>
                            <p className="text-xs text-brand-ink/55 mt-0.5">
                                Kolom identitas resmi dikunci dan dikelola oleh sistem pusat sekolah.
                            </p>
                        </div>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            <span>ROLE: {user?.role ?? "ADMIN"}</span>
                        </span>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 text-xs sm:text-sm">
                        <div className="rounded-xl bg-brand-paper p-3.5 border border-brand-ink/10">
                            <span className="block text-xs font-semibold uppercase tracking-wider text-brand-ink/60">
                                Username
                            </span>
                            <span className="mt-1 block tabular-nums font-medium text-brand-ink">
                                {user?.username ?? "-"}
                            </span>
                        </div>
                        <div className="rounded-xl bg-brand-paper p-3.5 border border-brand-ink/10">
                            <span className="block text-xs font-semibold uppercase tracking-wider text-brand-ink/60">
                                Nomor Induk (NIP / NIK)
                            </span>
                            <span className="mt-1 block tabular-nums font-medium text-brand-ink">
                                {user?.nomor_induk ?? "-"}
                            </span>
                        </div>
                    </div>
                </section>

                {/* Bagian Ubah Profil */}
                <section className={`${cardClass} space-y-5 p-5 sm:p-6`} aria-labelledby="profile-heading">
                    <div>
                        <h2 id="profile-heading" className="font-semibold text-brand-ink">
                            Profil & Kontak
                        </h2>
                        <p className="mt-0.5 text-xs text-brand-ink/55">
                            Perbarui nama lengkap, email, nomor kontak, dan alamat tempat tinggal Anda.
                        </p>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                        <Field label="Nama Lengkap" htmlFor="nama_lengkap" error={err("nama_lengkap")}>
                            <input
                                id="nama_lengkap"
                                value={namaLengkap}
                                onChange={(e) => setNamaLengkap(e.target.value)}
                                autoComplete="name"
                                maxLength={150}
                                aria-invalid={err("nama_lengkap") ? true : undefined}
                                className={inputClass}
                            />
                        </Field>

                        <Field label="Alamat Email" htmlFor="email" error={err("email")}>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="email"
                                maxLength={100}
                                aria-invalid={err("email") ? true : undefined}
                                className={inputClass}
                                placeholder="nama@sekolah.sch.id"
                            />
                        </Field>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                        <Field label="Nomor WhatsApp / HP" htmlFor="no_hp" error={err("no_hp")}>
                            <input
                                id="no_hp"
                                type="tel"
                                value={noHp}
                                onChange={(e) => setNoHp(e.target.value)}
                                autoComplete="tel"
                                maxLength={20}
                                aria-invalid={err("no_hp") ? true : undefined}
                                className={inputClass}
                                placeholder="081234567890"
                            />
                        </Field>

                        <Field label="Jenis Kelamin" htmlFor="jenis_kelamin" error={err("jenis_kelamin")}>
                            <select
                                id="jenis_kelamin"
                                value={jenisKelamin}
                                onChange={(e) => setJenisKelamin(e.target.value)}
                                aria-invalid={err("jenis_kelamin") ? true : undefined}
                                className={inputClass}
                            >
                                <option value="">-- Pilih Jenis Kelamin --</option>
                                <option value="LAKI_LAKI">Laki-Laki</option>
                                <option value="PEREMPUAN">Perempuan</option>
                            </select>
                        </Field>
                    </div>

                    <Field label="Alamat Domisili" htmlFor="alamat" error={err("alamat")}>
                        <textarea
                            id="alamat"
                            rows={2}
                            value={alamat}
                            onChange={(e) => setAlamat(e.target.value)}
                            aria-invalid={err("alamat") ? true : undefined}
                            className={inputClass}
                            placeholder="Alamat domisili lengkap..."
                        />
                    </Field>
                </section>

                {/* Bagian Ubah Kata Sandi */}
                <section className={`${cardClass} space-y-5 p-5 sm:p-6`} aria-labelledby="password-heading">
                    <div>
                        <h2 id="password-heading" className="font-semibold text-brand-ink">
                            Ganti Kata Sandi
                        </h2>
                        <p className="mt-0.5 text-xs text-brand-ink/55">
                            Kosongkan seluruh isian di bawah bila Anda tidak bermaksud mengganti kata sandi.
                        </p>
                    </div>

                    <Field
                        label="Kata Sandi Saat Ini"
                        htmlFor="old_password"
                        error={err("old_password")}
                    >
                        <input
                            id="old_password"
                            type="password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            autoComplete="current-password"
                            aria-invalid={err("old_password") ? true : undefined}
                            className={inputClass}
                        />
                    </Field>

                    <div className="grid gap-5 sm:grid-cols-2">
                        <Field
                            label="Kata Sandi Baru"
                            htmlFor="new_password"
                            error={err("new_password")}
                            hint="Minimal 6 karakter."
                        >
                            <input
                                id="new_password"
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                autoComplete="new-password"
                                aria-invalid={err("new_password") ? true : undefined}
                                className={inputClass}
                            />
                        </Field>

                        <Field
                            label="Ulangi Kata Sandi Baru"
                            htmlFor="new_password_confirmation"
                            error={err("new_password_confirmation")}
                        >
                            <input
                                id="new_password_confirmation"
                                type="password"
                                value={newPasswordConfirmation}
                                onChange={(e) => setNewPasswordConfirmation(e.target.value)}
                                autoComplete="new-password"
                                className={inputClass}
                            />
                        </Field>
                    </div>
                </section>

                <div className="flex justify-end pt-2">
                    <button type="submit" disabled={saving} className={buttonPrimary}>
                        {saving && <Spinner className="w-4 h-4" label="Menyimpan" />}
                        <span>Simpan Perubahan Akun</span>
                    </button>
                </div>
            </form>
        </>
    );
}
