import {
  Outlet,
    useRoutes,
  } from "react-router-dom";
import { AdminLayout } from "../components/pages/AdminLayout";
import ProductForm from "../components/pages/ProductForm";
import ProductTable from "../components/pages/ProductTable";
import ProductEditForm from "../components/pages/ProductEditForm";
import LabTabs from "../components/pages/LabTabs";


export const AppRouter = () => { 
    const newRoutes = [
        {
          path: '',
          element: <AdminLayout />,
          children: [
            // {
            //   path: '/product',
            //   element: <Outlet />,
            //   children: [
            //     { path: 'add', element: <ProductForm /> },
            //     { path: 'edit/:id', element: <ProductEditForm/> },
            //     { path: 'list', element: <ProductTable/> }
            //   ]
            // }
            { path: '/', element: <LabTabs /> },
            { path: '/add', element: <ProductForm/> },
            { path: 'edit/:id', element: <ProductEditForm/> }
          ]
        }     
      ]

    const router = useRoutes(newRoutes)

    return <>{router}</>
}