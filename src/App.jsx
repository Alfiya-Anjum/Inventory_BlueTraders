import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ThemeProvider } from "@/contexts/theme-context";

import Layout from "@/routes/layout";
import DashboardPage from "@/routes/dashboard/page";
import SalesPage from "@/routes/sales/page";
import InvoiceForm from "@/routes/invoices/InvoiceForm";
import CustomerInfo from "@/routes/customer/page";
import Creditors from "@/routes/customer/creditors";



function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <DashboardPage />,
                },
                {
                    path: "sales",
                    element: <SalesPage />,
                },
                {
                    path: "invoices",
                    element: <InvoiceForm />,
                },

                {
                    path: "customers",
                    element: <CustomerInfo/>,
                },
                {
                   path: "creditors",
                    element: <Creditors />,
                },
                {
                    path: "verified-customers",
                    element: <h1 className="title">Verified Customers</h1>,
                },
                {
                    path: "products",
                    element: <h1 className="title">Products</h1>,
                },
                {
                    path: "new-product",
                    element: <h1 className="title">New Product</h1>,
                },
                {
                    path: "inventory",
                    element: <h1 className="title">Inventory</h1>,
                },
                {
                    path: "settings",
                    element: <h1 className="title">Settings</h1>,
                },
            ],
        },
    ]);

    return (
        <ThemeProvider storageKey="theme">
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}

export default App;