import {createBrowserRouter} from "react-router-dom";
import SignUp from "../pages/SignUp";
import Home from "../pages/Home.tsx";
import SignIn from "../pages/SignIn.tsx";
import AppLayout from "../layouts/AppLayout.tsx";
import PrivateLayout from "../layouts/PrivateLayout.tsx";

const router = createBrowserRouter([
    {
        id: 'root',
        path: '/',
        children: [
            {
                id: 'app',
                path: '/',
                element: <AppLayout/>,
                children: [
                    {
                        id: 'home',
                        path: '/',
                        element: <Home/>
                    },
                    {
                        id: 'private-layout-2',
                        path: '/',
                        element: <PrivateLayout/>,
                        children: [
                            {
                                id: 'sign-up',
                                path: '/sign-up',
                                element: <SignUp/>
                            },
                            {
                                id: 'sign-in',
                                path: '/sign-in',
                                element: <SignIn/>
                            }
                        ]
                    }
                ]
            },
        ]
    },
])

export default router;