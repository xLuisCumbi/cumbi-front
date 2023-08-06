import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
//router
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';

//css
import './index.css';

//servises
// import userService from "./services/UserService"

//layouts
import AdminLayout from './pages/admin/adminLayout';
import CreateUser from './pages/admin/CreateUser';

// Lazy Loading to reduce chunk size for production
const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<h1>loading...</h1>}>
      <Component {...props} />
    </Suspense>
  );

//pages
const LoginPage = Loadable(lazy(() => import('./pages/auth/Login')));
const Dashboard = Loadable(lazy(() => import('./pages/admin/dashboard')));
const ErrorPage = Loadable(lazy(() => import('./pages/Error')));
const CreatePayment = Loadable(
  lazy(() => import('./pages/admin/CreatePayment'))
);
const PaymentHistory = Loadable(
  lazy(() => import('./pages/admin/PaymentHistory'))
);
const Settings = Loadable(lazy(() => import('./pages/admin/Settings')));
const ApiTokens = Loadable(lazy(() => import('./pages/admin/ApiTokens')));
const CreateToken = Loadable(lazy(() => import('./pages/admin/CreateToken')));
const ProtectedRoute = Loadable(lazy(() => import('./router/ProtectedRoute')));

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/admin',
    element: <ProtectedRoute component={<AdminLayout />} />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <Navigate to="dashboard" />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'create-payment',
        element: <CreatePayment />,
      },
      {
        path: 'create-user',
        element: <CreateUser />,
      },
      {
        path: 'payment-history',
        element: <PaymentHistory />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
      {
        path: 'tokens',
        element: <ApiTokens />,
      },
      {
        path: 'create-token',
        element: <CreateToken />,
      },
    ],
  },
  {
    path: '/error',
    element: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
