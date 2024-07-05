import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const PrivateRoute = ({ children }) => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
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