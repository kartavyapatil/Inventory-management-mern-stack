import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import Index from "../pages/Home/Index";
import About from "../pages/About";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { Component  } from "react";
import Error from "../pages/Error";
import Orders from "../pages/Orders";
import User from "../pages/User";
import Product from "../pages/Product"

export const Routes=createBrowserRouter([
    {
        path:"/",
        Component:App,
        children:[
            {
                path:'/',
                Component:Index,
                
            },
            {
                path:"/about",
                Component:About
            },{
                path:"*",
                Component:Error
            },{
                path:"/product",
                Component:Product
            }
            ,{
                path:"/order",
                Component:Orders
            }
            ,{
                path:"/user",
                Component:User
            }
        ]
    },{
        path:"/login",
        Component:Login
    },{
        path:"/Register",
        Component:Register
    }
])