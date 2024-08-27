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