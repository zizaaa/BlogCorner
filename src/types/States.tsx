export interface credentials{
    username:string;
    password:string;
}

export interface CookieStoreState {
    token: string | null;
    storeCookie: (token: string) => void;
    getToken: () => void;
    deleteCookie: () => void;
}