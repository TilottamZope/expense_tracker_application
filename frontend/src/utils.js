import { toast } from 'react-toastify';
import.meta.env 
export const handleSuccess = (msg) => {
    toast.success(msg, {
        position: 'top-right'
    })
}

export const handleError = (msg) => {
    toast.error(msg, {
        position: 'top-right'
    })
}

export const APIUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:9000';