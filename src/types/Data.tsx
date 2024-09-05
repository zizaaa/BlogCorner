export interface BlogData{
    cover:File | null;
    title:string;
    content:string;
}
export interface BlogUpdateData{
    cover:File | string ;
    title:string;
    content:string;
    path?:string;
}
export interface BlogUpdateData2{
    title:string;
    content:string;
    path?:string;
}

export interface PreviewData {
    cover:string | null;
    title:string;
    content:string;
    timestamp:string;
    owner:number;
}

export interface Blog {
    id:number;
    cover_img:string;
    title:string;
    content:string;
    created_at:string;
    owner:number;

}

export interface PopularBlogData {
    id:number;
    title:string;
    created_at:string;
}

export interface LogedInUser{
    name:string;
    id:number;
    username:string;
    avatar?:string;
    email:string;
}