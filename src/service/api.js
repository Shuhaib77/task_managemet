import axios from "axios";
import { BASE_URL } from "../baseUrl";



const api=axios.create({
    baseURL:BASE_URL
})

api.interceptors.request.use(
    (config)=>{
        const token=sessionStorage.getItem("token")
        if(token){
            config.headers['Authorization']=`Bearer ${token}`
        }
        return config
    },(error)=>{
        return Promise.reject(error)
    }
)

api.interceptors.response.use(
    (response)=>{
        return response
    },
    (error)=>{
        if(error.response){
            const status=error.response.status
            switch (status) {
                case 400:
                    console.error('Bad Request');
                    break;
                case 401:
                    console.error('Unauthorized: Please log in to continue.');
                    window.location.replace('/auth');
                    break;
                case 500:
                    console.error('Internal Server Error');
                    break;
                default:
                    console.error(`Error: ${status}`);
            }
        }
    }
)
export default api