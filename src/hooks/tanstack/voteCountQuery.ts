import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { serverURL } from "../serverUrl";

const voteCountQuery = (id:number) =>{
    return useQuery({
        queryKey: ['votes', id],
        queryFn: async () => {
            const { data } = await axios.get<{ upVotes: string, downVotes: string }>(`${serverURL}/api/blogs/get/votes?blogId=${id}`);
            return data;
        },
        enabled: !!id
    })
}

export default voteCountQuery;