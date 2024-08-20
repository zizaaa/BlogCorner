import { createBrowserRouter } from "react-router-dom";
import 
    { 
        Bookmark,
        FormLayout,
        Home,
        Login,
        Register,
        RootLayout,
        ViewBlog
    } from '../components/links'

export const router = createBrowserRouter([
    {
        path:'/',
        element:<RootLayout/>,
        children:[
            {
                path:'/',
                element:<Home/>
            },
            {
                path:'bookmark',
                element:<Bookmark/>
            },
            {
                path:'blog/:id',
                element:<ViewBlog/>
            }
        ]
    },
    {
        path:'/form',
        element:<FormLayout/>,
        children:[
            {
                path:'login',
                element:<Login/>
            },
            {
                path:'register',
                element:<Register/>
            }
        ]
    }
])