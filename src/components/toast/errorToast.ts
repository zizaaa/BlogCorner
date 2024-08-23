import toast from "react-hot-toast";

const errorToast = (message:string)=>{
    toast.error(`${message}`);
}

export default errorToast