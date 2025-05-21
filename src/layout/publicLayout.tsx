import { Outlet } from "react-router-dom";
import { Header } from "../components/header/Header";

export const PublicLayout = () => {
    return <div>
        <Header></Header>
        <Outlet />
    </div>;
};
