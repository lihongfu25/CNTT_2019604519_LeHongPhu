import { toast } from "react-toastify";

const notify = (type, message) =>
    toast[type](message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
    });

export default notify;
