import Login from '../pages/Login/Login'
import Test from '../pages/Test/Test'
import Index from '../pages/Index/Index'
import NotFound from '../pages/NotFound/NotFound'
import Admin from '../pages/Admin/Admin'
import Dictionary from '../pages/Dictionary/Dictionary'
import Book from '../pages/Book/book'
import Collect from '../pages/Collect/Collect'

//react router
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/',
        element: <Index />
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

])

export default router