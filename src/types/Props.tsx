import { Blog, LogedInUser, PreviewData } from "./Data";

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
    data?:{
        avatar:string;
        email:string;
        id:number;
        name:string;
        username:string;
    };
    isLoading:boolean;
    setShowSideNav:React.Dispatch<React.SetStateAction<boolean>>;
    showSideNav:boolean;
    handleLogout:()=> void;
}

export interface ColorProps{
    textColor:string;
    fillColor:string;
    darkModeColor?:string;
}

export interface BlogLayoutProps{
    data?:PreviewData | null;
    loading:boolean;
    preview:boolean;
    id?: string;
}

export interface TiptapProps {
    data?:PreviewData | null;
    loading:boolean;
    id?: string;
}

export interface BlogCardProps{
    blog:Blog;
}

export interface ShareButtonProps{
    id?:string;
}

export interface SocialButtonsProps{
    url:string;
}

export interface SavedDataProps{
    content:string;
    created_at:string;
    id:number;
    title:string;
    cover_img:string;
}

export interface BookMarkProps{
    data:SavedDataProps
    refetch:()=>void;
}

export interface NameModalProps{
    setShowNameModal?:React.Dispatch<React.SetStateAction<boolean>>;
    setShowEmailModal?:React.Dispatch<React.SetStateAction<boolean>>;
    setShowPasswordModal?:React.Dispatch<React.SetStateAction<boolean>>;
    refetch:()=> void;
}

export interface ProfileComponentProps{
    data:LogedInUser
    setShowNameModal?:React.Dispatch<React.SetStateAction<boolean>>;
    setShowEmailModal?:React.Dispatch<React.SetStateAction<boolean>>;
    setShowPasswordModal?:React.Dispatch<React.SetStateAction<boolean>>;
    type:string;
    isLoading:boolean;
    refetch?:()=> void;
}
