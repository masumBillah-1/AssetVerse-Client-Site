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
import Profile from "../Pages/Dashboard/HrManager/HrProfile";
import MyAssets from "../Pages/Dashboard/Employer/MyAssets";
import MyTeam from "../Pages/Dashboard/Employer/MyTeam";
import HrProfile from "../Pages/Dashboard/HrManager/HrProfile";
import RequestAsset from "../Pages/Dashboard/Employer/RequestAsset";
import EmProfile from "../Pages/Dashboard/Employer/EmProfile";


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
                path: 'hr-profile',
                Component: HrProfile
            },
            {
                path: 'my-assets',
                Component: MyAssets
            },
            {
                path: 'request-asset',
                Component: RequestAsset
            },
            {
                path: 'my-team',
                Component: MyTeam
            },
            {
                path: 'em-profile',
                Component: EmProfile
            },


        ]
        
    }
    
  
    
]);