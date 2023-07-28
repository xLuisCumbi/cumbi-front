import React from "react";
import ReactDOM from "react-dom/client";
//router
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";

//css
import "./index.css";

//servises
import userService from "./services/userService"

//layouts
import AdminLayout from "./pages/admin/adminLayout";

//pages
import LoginPage from "./pages/auth/login";
import Dashboard from "./pages/admin/dashboard.jsx";
import ErrorPage from "./pages/error";
import CreatePayment from "./pages/admin/CreatePayment";
import PaymentHistory from "./pages/admin/PaymentHistory";
import Settings from "./pages/admin/Settings";
import ApiTokens from "./pages/admin/ApiTokens";
import CreateToken from "./pages/admin/CreateToken";
import ProtectedRoute from "./router/ProtectedRoute";



const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginPage />,
        errorElement: <ErrorPage />
    },
    {
        path: "/admin",
        element: <ProtectedRoute component={<AdminLayout />} />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "",
                element:   <Navigate to='dashboard' />,
            },
            {
                path: "dashboard",
                element: <Dashboard />,
            },
            {
                path: "create-payment",
                element: <CreatePayment />,
            },
            {
                path: "payment-history",
                element: <PaymentHistory />,
            },
            {
                path: "settings",
                element: <Settings />,
            },
            {
                path: "tokens",
                element: <ApiTokens />,
            },
            {
                path: "create-token",
                element: <CreateToken />,
            }
        ]
    },
    {
        path: "/error",
        element: <ErrorPage />,
    },

]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
