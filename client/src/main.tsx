import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { Landing } from './pages/landing/index.tsx';
import { DashBoard } from './pages/dashboard/index.tsx';
import { Layout } from './components/layout/index.tsx';
import { Signin } from './pages/signin/index.tsx';
import { Signup } from './pages/signup/index.tsx';
import { Transaction } from './pages/transaction/index.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Landing /> },
    ]
  },
  {
    path: "/dashboard",
    element: <Layout />,
    children: [
      { index: true, element: <DashBoard /> }
    ]
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/send",
    element: <Transaction />
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
