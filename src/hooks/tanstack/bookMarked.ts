import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from 'js-cookie'
import { serverURL } from "../serverUrl";

export const bookMarked = (blogId:number) => {
    return useQuery({
        queryKey:['bookmarked',blogId],
        queryFn: async () => {
            const token = Cookies.get('token')
            try {
                const { data } = await axios.get(
                    `${serverURL}/api/bookmark/saved?blogId=${blogId}`,
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
                        throw new Error("Please log in");
                    } else {
                        throw new Error(error.response?.data.message);
                    }
                } else {
                    throw new Error('Something went wrong.');
                }
            }
        }
    });
};