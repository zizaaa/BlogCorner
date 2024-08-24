export interface credentials{
    username:string;
    password:string;
}

export interface SignUpCredentialsType{
    name:string;
    email:string;
    username:string;
    password:string;
    confirmPassword:string;
}

export interface RegisterData{
    name:string;
    email:string;
    username:string;
    password:string;
}

export interface CookieStoreState {
    token: string | null;
    storeCookie: (token: string) => void;
    getToken: () => void;
    deleteCookie: () => void;
}