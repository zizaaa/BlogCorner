import toast from "react-hot-toast";

const successToast = (message:string)=>{
    toast.success(`${message}`);
}

export default successToast