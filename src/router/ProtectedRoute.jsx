import { Navigate } from "react-router-dom"
import UserService from "../services/UserService"

export default function ProtectedRoute(props) {

    if(!UserService.isLogin()) {

       return <Navigate to='/' />
       
    }
    
    return props.component;

}