import { PrivateLayout } from "../layout/PrivateLayout"

import { Home } from "../page/client/home/Home"
import { About } from "../page/client/about/About"
import { Contact } from "../page/client/contact/Contact"
import { NotFound } from "../page/NotFound"
import { ProductDetail } from "../page/client/productDetail/ProductDetail"
import { Products } from "../page/client/products/Product"
import { Login } from "../page/auth/Login"
import PublicLayout from "@/layout/PublicLayout"
import { Dashboard } from "@/page/admin/Dashboard/Dasboad"
import SlideAdmin from "@/page/admin/SlideAdmin/SlideAdmin"
import { RouteObject } from "react-router-dom"

export const privateRouter: RouteObject[] = [
    {
        path: "admin",
        element: <PrivateLayout />,
        children: [
            {
                index: true,
                element: <Dashboard />,
            },

            {
                path: 'dashboard',
                element: <Dashboard />,
            },
            {
                path: 'sidebar',
                element: <SlideAdmin />,
            },
        ]
    }
]

export const publicRouter: RouteObject[] = [
    {
        path: "/",
        element: <PublicLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: 'about',
                element: <About />
            }, {
                path: 'contact',
                element: <Contact />
            },
            {
                path: 'products',
                element: <Products />,
                loader: async () => { // get data from api
                    const res = await fetch('https://dummyjson.com/products');
                    if (!res.ok) {
                        throw new Error('Failed to fetch data');
                    }
                    return res.json();
                },

                // ok chưa
                // cần gửi code không
                // aloooooooooooooooooooooo
                // đc 
                // không giới hạn đâu 
                // Đám mây
                // ông thầy anh đến gần 400 repo 
                // đi dạy nhiều nơi

                action: async ({ request }) => { // post push delete
                    const formData = await request.formData();
                    const data = Object.fromEntries(formData);
                    console.log('data', data);
                    const res = await fetch('https://dummyjson.com/products', {
                        method: 'POST',
                        body: JSON.stringify(data),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    if (!res.ok) {
                        throw new Error('Failed to fetch data');
                    }
                    return res.json();
                }
            },
            {
                path: 'products/:id',
                element: <ProductDetail />,
            },
            {
                path: 'login',
                element: <Login />
            }
        ]
    },
    {
        path: '*',
        element: <NotFound />,
    },
]


