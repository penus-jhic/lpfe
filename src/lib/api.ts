// Alamat API Laravel. Menggunakan relative /api agar diteruskan lewat proxy Vite secara mulus.
export const API_URL = (import.meta.env.VITE_API_URL ?? "/api").replace(/\/+$/, "");

const TOKEN_KEY = "admin_token";

// Error dari API. errors = pesan validasi per isian (status 422), contoh { title: ["Judul wajib diisi."] }
export class ApiError extends Error {
    readonly status: number;
    readonly errors: Record<string, string[]>;

    constructor(status: number, message: string, errors: Record<string, string[]> = {}) {
        super(message);
        this.name = "ApiError";
        this.status = status;
        this.errors = errors;
    }
}

// Bentuk respons Laravel API Resource
export type Resource<T> = { data: T };

export type Paginated<T> = {
    data: T[];
    meta: { current_page: number; last_page: number; per_page: number; total: number; from: number | null; to: number | null };
};

export function parseExpiresInSeconds(expiresIn?: string | number): number {
    if (typeof expiresIn === "number") return expiresIn > 0 ? expiresIn : 86400;
    if (!expiresIn) return 86400;
    const trimmed = String(expiresIn).trim().toLowerCase();
    if (trimmed.endsWith("d")) {
        const d = parseFloat(trimmed);
        return isNaN(d) ? 86400 : Math.round(d * 86400);
    }
    if (trimmed.endsWith("h")) {
        const h = parseFloat(trimmed);
        return isNaN(h) ? 86400 : Math.round(h * 3600);
    }
    if (trimmed.endsWith("m")) {
        const m = parseFloat(trimmed);
        return isNaN(m) ? 86400 : Math.round(m * 60);
    }
    if (trimmed.endsWith("s")) {
        const s = parseFloat(trimmed);
        return isNaN(s) ? 86400 : Math.round(s);
    }
    const n = Number(trimmed);
    return isNaN(n) || n <= 0 ? 86400 : Math.round(n);
}

// Simpan cookie access_token dengan konfigurasi max-age dan SameSite=Lax
export function setAuthCookie(token: string, expiresIn?: string | number): void {
    if (typeof document === "undefined") return;
    const maxAge = parseExpiresInSeconds(expiresIn);
    const expiresDate = new Date(Date.now() + maxAge * 1000).toUTCString();
    document.cookie = `access_token=${encodeURIComponent(token)}; path=/; max-age=${maxAge}; expires=${expiresDate}; SameSite=Lax`;
}

export function getAuthCookie(): string | null {
    if (typeof document === "undefined") return null;
    const match = document.cookie.match(/(?:^|;\s*)access_token=([^;]+)/);
    return match ? decodeURIComponent(match[1]) : null;
}

export function removeAuthCookie(): void {
    if (typeof document === "undefined") return;
    document.cookie = "access_token=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
}

// Token panel admin disimpan di localStorage dan cookie supaya tetap masuk setelah halaman dimuat ulang.
// Sinkronisasi dengan cookie access_token memastikan kecocokan dengan VERIFY_MIDDLEWARE.md
export function getToken(): string | null {
    try {
        const stored = localStorage.getItem(TOKEN_KEY);
        if (stored) return stored;
        return getAuthCookie();
    } catch {
        return getAuthCookie();
    }
}

export function setToken(token: string | null, expiresIn?: string | number) {
    try {
        if (token) {
            localStorage.setItem(TOKEN_KEY, token);
            setAuthCookie(token, expiresIn);
        } else {
            localStorage.removeItem(TOKEN_KEY);
            removeAuthCookie();
        }
    } catch {
        // Fallback jika localStorage diblokir browser
        if (token) {
            setAuthCookie(token, expiresIn);
        } else {
            removeAuthCookie();
        }
    }
}

// Dipanggil saat token admin ditolak server (kedaluwarsa / dicabut), supaya panel admin kembali ke halaman masuk
const unauthorizedListeners = new Set<() => void>();

export function onUnauthorized(listener: () => void) {
    unauthorizedListeners.add(listener);
    return () => {
        unauthorizedListeners.delete(listener);
    };
}

const statusMessages: Record<number, string> = {
    403: "Anda tidak punya akses untuk melakukan ini.",
    404: "Data tidak ditemukan. Mungkin sudah dihapus.",
    413: "Ukuran berkas terlalu besar untuk diunggah.",
    419: "Sesi berakhir. Silakan muat ulang halaman.",
    429: "Terlalu banyak percobaan. Tunggu sebentar lalu coba lagi.",
};

type RequestOptions = {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    // FormData dikirim apa adanya (untuk unggah foto), selain itu dikirim sebagai JSON
    body?: FormData | object;
    signal?: AbortSignal;
};

// path relatif terhadap API_URL, contoh "/news?limit=6". Token admin dikirim ke endpoint /admin dan /user
export async function apiRequest<T>(path: string, { method = "GET", body, signal }: RequestOptions = {}): Promise<T> {
    const headers: Record<string, string> = { Accept: "application/json" };
    const token = (path.startsWith("/admin") || path.startsWith("/user")) ? getToken() : null;
    if (token) headers.Authorization = `Bearer ${token}`;

    let payload: BodyInit | undefined;
    if (body instanceof FormData) {
        payload = body;
    } else if (body !== undefined) {
        headers["Content-Type"] = "application/json";
        payload = JSON.stringify(body);
    }

    let response: Response;
    try {
        response = await fetch(`${API_URL}${path}`, {
            method,
            headers,
            body: payload,
            signal,
            credentials: "same-origin",
            // Lewati cache browser: Cloudflare menambahkan "max-age=14400" ke respons API, jadi tanpa ini pengunjung
            // bisa melihat data lama sampai 4 jam setelah admin menyimpan perubahan. Cache di memori ada di useApi
            cache: "no-store",
        });
    } catch (error) {
        if (signal?.aborted) throw error;
        console.error("API Request Failed:", { path, url: `${API_URL}${path}`, error });
        throw new ApiError(0, "Tidak dapat terhubung ke server. Periksa koneksi internet Anda lalu coba lagi.");
    }

    if (response.status === 204) return undefined as T;

    let data: { message?: string; errors?: Record<string, string[]> } | null = null;
    try {
        data = await response.json();
    } catch (parseError) {
        console.error("Failed to parse JSON response:", parseError);
    }

    if (!response.ok) {
        if (response.status === 401 && token && !path.includes("/login")) {
            unauthorizedListeners.forEach((listener) => listener());
        }

        const message = data?.message
            ?? statusMessages[response.status]
            ?? (response.status === 401 ? "Sesi Anda berakhir. Silakan masuk kembali." : "Terjadi kesalahan pada server. Coba lagi nanti.");
        throw new ApiError(response.status, message, data?.errors ?? {});
    }

    return data as T;
}
