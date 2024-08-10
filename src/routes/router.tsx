import { createBrowserRouter } from "react-router-dom";
import 
    { 
        Bookmark,
        Home,
        RootLayout 
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
            }
        ]
    }
])