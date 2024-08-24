export interface ProtectedRouteProps{
    isAuthorized:boolean;
}

export interface userData{
    id:number;
    username:string;
    firstname:string;
    lastname:string;
    middlename?:string;
    email:string;
    avatar?:string;
}

export interface propsType{
    isError:boolean;
    data?:userData;
    isLoading:boolean;
}

export interface ColorProps{
    textColor:string;
    fillColor:string;
    darkModeColor?:string;
}