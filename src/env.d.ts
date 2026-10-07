interface ImportMetaEnv {
    // Alamat API yang dipanggil browser, biarkan "/api" supaya lewat proxy (lihat .env.example)
    readonly VITE_API_URL?: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
