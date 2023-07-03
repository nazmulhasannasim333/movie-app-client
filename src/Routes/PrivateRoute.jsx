import { Navigate, useLocation } from "react-router";
import Loading from "../components/Loading/Loading";
import useAuth from "../hooks/useAuth";


const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth()
    const location = useLocation();

    if(loading){
        return <Loading />
    }

    if (user) {
        return children;
    }
    return <Navigate to="/login" state={{from: location}} replace></Navigate>
};

export default PrivateRoute;