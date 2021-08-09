export interface ClientOptions {
    onReady?: () => void;
    onRefresh?: () => void;
    refreshToken?: boolean | string;
    token?: string;
}