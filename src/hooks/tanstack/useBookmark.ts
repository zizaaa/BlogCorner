import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Cookies from 'js-cookie'
import { serverURL } from "../serverUrl";
import { errorToast } from "../../components/links";

export const useBookmark = () => {
    return useMutation({
        mutationFn: async ( blogId:number ) => {
            const token = Cookies.get('token')
            try {
                const { data } = await axios.post(
                    `${serverURL}/api/bookmark/save`,
                    { blogId },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                return data;
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    if (error.response?.data === 'Unauthorized') {
                        errorToast("Please log in");
                        return;
                    } else {
                        errorToast(error.response?.data.message);
                        return;
                    }
                } else {
                    errorToast('Something went wrong.');
                    return;
                }
            }
        }
    });
};