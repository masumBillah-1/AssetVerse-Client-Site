import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home/Home";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Pages/Auth/login/Login";
import Register from "../Pages/Auth/Register/Register";
import RolePage from "../Pages/RolePage";
import DashboardLayout from "../Layout/DashbordLayout";
import AddAsset from "../Pages/Dashboard/HrManager/AddAsset";
import AllRequest from "../Pages/Dashboard/HrManager/AllRequest";
import EmployeeList from "../Pages/Dashboard/HrManager/EmployeeList";
import UpgradePackage from "../Pages/Dashboard/HrManager/UpgradePackage";
import Profile from "../Pages/Dashboard/HrManager/Profile";


export const router = createBrowserRouter ([

    {
        path:"/",
        Component: RootLayout,
        children:[
            {
                index:true,
                Component: Home
                
            },

           

        
        
        ]



    },
    {
        path: '/',
        Component: AuthLayout,
        children: [
            {
                path:'login',
                Component: Login

            },
            {
                path: 'register',
                Component: Register
            }, 
            {
                path:'select-role',
                Component: RolePage
                
            }
           
            
        ]
    },
    {
        path:"/dashboard",
        Component: DashboardLayout,
        children: [
            {
                path: 'add-asset',
                Component: AddAsset
            },
            {
                path: 'all-requests',
                Component: AllRequest
            },
            {
                path: 'employee-list',
                Component: EmployeeList
            },
            {
                path: 'upgrade-package',
                Component: UpgradePackage
            },
            {
                path: 'profile',
                Component: Profile
            },
        ]
        
    }
    
  
    
]);