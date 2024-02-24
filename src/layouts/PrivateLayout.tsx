import {Navigate, Outlet} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../state/store.ts";


const PrivateLayout = () => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    if (isAuthenticated) {
        return <Navigate to="/" replace/>
    }

    return (
        <Outlet/>
    )

};

export default PrivateLayout;