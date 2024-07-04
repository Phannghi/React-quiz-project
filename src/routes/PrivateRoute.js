import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
const PrivateRoute = ({ children }) => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const navigate = useNavigate();
    //console.log('isAuthenticated', isAuthenticated);
    //console.log('check props: ', children);

    if (!isAuthenticated) {
        return <Navigate to='/login' />;
    }

    return (
        <>{children}</>
    )
}
export default PrivateRoute;