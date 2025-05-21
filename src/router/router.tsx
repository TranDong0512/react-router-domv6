
import { PrivateLayout } from "../layout/privateLayout";
import { PublicLayout } from "../layout/publicLayout";
import { Dashboard, SlideAdmin } from "../Page/admin";
import { About, Contact, Home, Login, ProductDetail, Products } from "../Page/client";
import NotFound from "../Page/NotFound";
import { RouteObject } from "react-router-dom"
export const publicRouter: RouteObject[] = ([
    {
        path: "/",
        element: <PublicLayout />,
        children: [
            { index: true, element: <Home /> },
            { path: "products", element: <Products /> },
            { path: ":id", element: <ProductDetail /> },
            { path: "contact", element: <Contact /> },
            { path: "about", element: <About /> },
            { path: "auth/login", element: <Login /> },
        ]
    },
    {
        path: "*",
        element: <NotFound />
    }
])

export const privateRouter: RouteObject[] = ([
    {
        path: "/admin",
        element: <PrivateLayout />,
        children: [
            { path: "dashboard", element: <Dashboard /> },
            { path: "sidebar", element: <SlideAdmin /> },
        ]

    }
])

