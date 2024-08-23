import { create } from "zustand";
import Cookies from 'js-cookie'
import { CookieStoreState } from "../../types/States";

const cookieStore = create<CookieStoreState>((set)=>({
    token:null,

    storeCookie:(token:string)=>{
        Cookies.set('token', token, {expires: 7})
    },

    getToken:()=>{
        set({
            token:Cookies.get('token')
        })
    },

    deleteCookie: ()=>{
        Cookies.remove('token');
        set({token:null})
    }
}))

export default cookieStore;