import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../pages/DashboardLayout";


export const router = createBrowserRouter([

    {
        path : "/",
        element:(
            <DashboardLayout/>
         )
    }

    


]);