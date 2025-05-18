import { Header } from "@/components/header/Header";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
    // Component wapper bao bọc các component con

    // Tái sử dụng logic mà không cần viết lại nhiều lần trong các component con

    // Thực hiện 1 số logic dùng chung cho toàn bộ các component được nó bao bọc
    return (
        <>
            <Header></Header>
            <Outlet />
        </>
    );
};

export default PublicLayout;
