import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home/Home";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Pages/Auth/login/Login";
import Register from "../Pages/Auth/Register/Register";
import RolePage from "../Pages/RolePage";
import DashboardLayout from "../Layout/DashbordLayout";
import EmployeeList from "../Pages/Dashboard/HrManager/EmployeeList";
import UpgradePackage from "../Pages/Dashboard/HrManager/UpgradePackage";
import MyAssets from "../Pages/Dashboard/Employer/MyAssets";
import MyTeam from "../Pages/Dashboard/Employer/MyTeam";

import RequestAsset from "../Pages/Dashboard/Employer/RequestAsset";


import AllRequestsPage from "../Pages/Dashboard/HrManager/AllRequestsPage";
import AddAssetPage from "../Pages/Dashboard/HrManager/AddAssetPage";
import Profile from "../Pages/Dashboard/Profile/Profile";
import AssetListPage from "../Pages/Dashboard/HrManager/AssetListPage";
import PaymentSuccess from "../Pages/Dashboard/Payment/PaymentSuccess";
import PaymentCancel from "../Pages/Dashboard/Payment/PaymentCancel";
import PrivateRoute from "./PrivateRoute";
import EmployeeRoute from "./EmployeeRoute";
import HRRoute from "./HRRoute";


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
    // {
    //     path:"/hr-dashboard",
    //     Component: DashboardLayout,
    //     children: [
    //         {
    //             index:true,
    //             Component: AssetListPage
    //         },
    //         {
    //             path: 'add-asset',
    //             Component: AddAssetPage
    //         },
    //         {
    //             path: 'all-requests',
    //             Component: AllRequestsPage
    //         },
    //         {
    //             path: 'employee-list',
    //             Component: EmployeeList
    //         },
    //         {
    //             path: 'upgrade-package',
    //             Component: UpgradePackage
    //         },
    //         {
    //             path: 'profile',
    //             Component: Profile
    //         },
    //         {
    //             path: 'em-dashboard',
    //             Component: MyAssets
    //         },
    //         {
    //             path: 'request-asset',
    //             Component: RequestAsset
    //         },
    //         {
    //             path: 'my-team',
    //             Component: MyTeam
    //         },
    //         {
    //             path: 'success',
    //             Component: PaymentSuccess
    //         },
    //         {
    //             path: 'cancel',
    //             Component: PaymentCancel
    //         }
                    


    //     ]
        
    // }

  {
    path: "/hr-dashboard",
    element: (
      <PrivateRoute>
        <HRRoute>
          <DashboardLayout />
        </HRRoute>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <HRRoute>
              <AssetListPage />
            </HRRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "add-asset",
        element: (
          <PrivateRoute>
            <HRRoute>
              <AddAssetPage />
            </HRRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "all-requests",
        element: (
          <PrivateRoute>
            <HRRoute>
              <AllRequestsPage />
            </HRRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "employee-list",
        element: (
          <PrivateRoute>
            <HRRoute>
              <EmployeeList />
            </HRRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "upgrade-package",
        element: (
          <PrivateRoute>
            <HRRoute>
              <UpgradePackage />
            </HRRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <HRRoute>
              <Profile />
            </HRRoute>
          </PrivateRoute>
        ),
      },
              {
          path: "success",
          element: (
            <PrivateRoute>
              <HRRoute>
                <PaymentSuccess />
              </HRRoute>
            </PrivateRoute>
          )
        },
        {
          path: "cancel",
          element: (
            <PrivateRoute>
              <HRRoute>
                <PaymentCancel />
              </HRRoute>
            </PrivateRoute>
          )
        }
    ],
  },


  {
    path: "/em-dashboard",
    element: (
      <PrivateRoute>
        <EmployeeRoute>
          <DashboardLayout />
        </EmployeeRoute>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <EmployeeRoute>
              <MyAssets />
            </EmployeeRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "request-asset",
        element: (
          <PrivateRoute>
            <EmployeeRoute>
              <RequestAsset />
            </EmployeeRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "my-team",
        element: (
          <PrivateRoute>
            <EmployeeRoute>
              <MyTeam />
            </EmployeeRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <EmployeeRoute>
              <Profile />
            </EmployeeRoute> 
          </PrivateRoute> 
        ),
      },
    ],
  }

    
  
    
]);