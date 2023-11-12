import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
// router
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';

// css
import './index.css';

// servises
// import userService from "./services/UserService"

// layouts
import AdminLayout from './pages/admin/adminLayout';
import CreateUser from './pages/admin/CreateUser';
import CreateBusiness from './pages/admin/CreateBusiness';
import CreateCountry from './pages/admin/CreateCountry';
import CreateCoin from './pages/admin/CreateCoin';
import CreateBank from './pages/admin/CreateBank';
import CreateBankAccount from './pages/admin/CreateBankAccount';
import ListUser from './pages/admin/ListUser';
import Register from './pages/auth/Register';

// Lazy Loading to reduce chunk size for production
const Loadable = (Component) => function (props) {
  return (
    <Suspense fallback={<h1>loading...</h1>}>
      <Component {...props} />
    </Suspense>
  );
};

// pages
const LoginPage = Loadable(lazy(() => import('./pages/auth/Login')));
const Dashboard = Loadable(lazy(() => import('./pages/admin/dashboard')));
const ErrorPage = Loadable(lazy(() => import('./pages/Error')));
const CreatePayment = Loadable(
  lazy(() => import('./pages/admin/CreatePayment')),
);
const PaymentHistory = Loadable(
  lazy(() => import('./pages/admin/PaymentHistory')),
);
const Profile = Loadable(lazy(() => import('./pages/admin/Profile')));
const SettingCumbi = Loadable(lazy(() => import('./pages/admin/SettingCumbi')));
const Mnemonic = Loadable(lazy(() => import('./pages/admin/Mnemonic')));
const ApiTokens = Loadable(lazy(() => import('./pages/admin/ApiTokens')));
const CreateToken = Loadable(lazy(() => import('./pages/admin/CreateToken')));
const ProtectedRoute = Loadable(lazy(() => import('./router/ProtectedRoute')));

const router = createBrowserRouter([
  {
    path: '/' || '/login',
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/register',
    element: <Register />,
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
        path: 'create-user/:id?',
        element: <CreateUser />,
      },
      {
        path: 'payment-history',
        element: <PaymentHistory />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'setting-cumbi',
        element: <SettingCumbi />,
      },
      {
        path: 'mnemonic',
        element: <Mnemonic />,
      },
      {
        path: 'create-business',
        element: <CreateBusiness />,
      },
      {
        path: 'tokens',
        element: <ApiTokens />,
      },
      {
        path: 'create-token',
        element: <CreateToken />,
      },
      {
        path: 'create-country',
        element: <CreateCountry />,
      },
      {
        path: 'create-coin',
        element: <CreateCoin />,
      },
      {
        path: 'create-bank',
        element: <CreateBank />,
      },
      {
        path: 'create-bank-account',
        element: <CreateBankAccount />,
      },
      // {
      //   path: 'list-user',
      //   element: <ListUser />,
      // },
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
  </React.StrictMode>,
);
