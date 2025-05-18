import { Header } from "@/components/header/Header";
import env from "@/config/env.config";
import { Navigate, Outlet } from "react-router-dom";


export const PrivateLayout = () => {
    const { NODE_ENV } = env
    console.log('NODE_ENV', NODE_ENV);

    const isAuth = true

    return (
        <div>
            {isAuth ? (
                <>
                    <Header />
                    <Outlet></Outlet>
                </>
            ) : <Navigate to="/login" />}
        </div>
    )
};
