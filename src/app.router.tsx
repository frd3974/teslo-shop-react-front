import {createBrowserRouter, createHashRouter, Navigate} from "react-router";
import {ShopLayout} from "./shop/layouts/ShopLayout.tsx";
import {HomePage} from "./shop/pages/home/homePage.tsx";
import {ProductPage} from "./shop/pages/product/productPage.tsx";
import {GenderPage} from "./shop/pages/gender/GenderPage.tsx";
// import {AuthLayout} from "./auth/layouts/AuthLayout.tsx";
import {LoginPage} from "./auth/page/login/LoginPage.tsx";
import {RegisterPage} from "./auth/page/register/RegisterPage.tsx";
// import {AdminLayout} from "./admin/layouts/AdminLayout.tsx";
import {DashboardPage} from "./admin/pages/dashboard/DashboardPage.tsx";
import {AdminProductsPage} from "./admin/pages/products/AdminProductsPage.tsx";
import {AdminProductPage} from "./admin/pages/product/AdminProductPage.tsx";
import {lazy} from "react";
import {AdminRoute, NotAuthenticatedRoute} from "@/components/routes/ProtectedRoutes.tsx";

const AuthLayout = lazy(() => import('./auth/layouts/AuthLayout'));
const AdminLayout = lazy(() => import('./admin/layouts/AdminLayout.tsx'));

export const appRouter = createHashRouter([
    {
        path: '/',
        element: <ShopLayout />,
        children: [
            {
                index: true,
                element: <HomePage/>
            },
            {
                path: 'product/:idSlug',
                element: <ProductPage/>
            },
            {
                path: 'gender/:gender',
                element: <GenderPage/>
            }
        ]
    },
    {
        path: '/auth',
        element: <NotAuthenticatedRoute>
            <AuthLayout/>
        </NotAuthenticatedRoute>,
        children: [
            {
                index: true,
                element: <Navigate to='/auth/login'/>
            },
            {
                path: 'login',
                element: <LoginPage/>
            },
            {
                path: 'register',
                element: <RegisterPage/>
            }
        ]
    },
    {
        path: '/admin',
        element: <AdminRoute>
            <AdminLayout/>
        </AdminRoute>,
        children: [
            {
                index: true,
                element: <DashboardPage/>
            },
            {
                path: 'products',
                element: <AdminProductsPage/>
            },
            {
                path: 'products/:id',
                element: <AdminProductPage/>
            }
        ]
    },
    {
        path: '*',
        element: <Navigate to='/'/>
    }
]);