export interface BlogData{
    cover:File | null;
    title:string;
    content:string;
}

export interface PreviewData {
    cover:string | null;
    title:string;
    content:string;
    timestamp:string;
}

export interface Blog {
    id:number;
    cover_img:string;
    title:string;
    content:string;
    created_at:string;
    down_vote:number;
    up_vote:number;
    owner:number;

}

export interface PopularBlogData {
    id:number;
    title:string;
    created_at:string;
}