/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_REACT_APP_BASE_API: string;
  readonly VITE_STRIPE_SECRET_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
