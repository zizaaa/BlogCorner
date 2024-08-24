import toast from "react-hot-toast";

const successToast = (message:string)=>{
    toast.success(`${message}`,{
        duration: 5000,
    });
}

export default successToast