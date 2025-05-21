import { Navigate, Outlet, } from "react-router-dom";
import { Header } from "../components/header/Header";

export const PrivateLayout = () => {
    const isAuth = false
    return <div>
        <Header></Header>
        {isAuth ? <Outlet /> : <Navigate to={'/auth/login'} />}
    </div>;
};
