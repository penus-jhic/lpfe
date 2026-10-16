import type { AuthStatus } from "./auth-context";
import { getToken } from "../../lib/api";
import type { MenuLink } from "../../data/navigation";

// Tujuan tombol "Dashboard" di situs: Admin, Kepala Sekolah & TU ke panel admin. Sesi lain (siswa/alumni)
// diarahkan BKK lewat /bkk/akun ke /bkk/me, yang belum masuk ke halaman login
export function dashboardLink(status: AuthStatus): MenuLink {
    if (status !== "guest") return { label: "Dashboard", href: "/admin" };
    if (getToken()) return { label: "Dashboard", href: "/bkk/akun", external: true };
    return { label: "Dashboard", href: "/login" };
}

// Sudah masuk (sebagai admin maupun pengguna portal lain), jadi tombol Dashboard layak tampil di navbar
export function hasSession(status: AuthStatus): boolean {
    return status !== "guest" || Boolean(getToken());
}
