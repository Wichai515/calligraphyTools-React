//react router
import { createBrowserRouter } from 'react-router-dom'

import Login from '../pages/Login/Login'
import Test from '../pages/Test/Test'
import Index from '../pages/Index/Index'
import NotFound from '../pages/NotFound/NotFound'
import Admin from '../pages/Admin/Admin'
import Dictionary from '../pages/Dictionary/Dictionary'
import Book from '../pages/Book/book'
import Collect from '../pages/Collect/Collect'
import Welcome from '../pages/Welcome/Welcome'




const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/',
        element: <Index />,
        children: [
            {
                index: true,
                element: <Welcome />
            },
            {
                path: '/dictionary',
                element: <Dictionary />
            },
            {
                path: '/book',
                element: <Book />
            },
            {
                path: '/collect',
                element: <Collect />
            },
        ]
    },
    {
        path: '/test',
        element: <Test />
    },
    {
        path: '*',
        element: <NotFound />
    },
    {
        path: '/admin',
        element: <Admin />
    },

])

export default router