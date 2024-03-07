import Login from '../pages/Login/Login'
import Test from '../pages/Test/Test'
import Index from '../pages/Index/Index'
import NotFound from '../pages/NotFound/NotFound'
import Admin from '../pages/Admin/Admin'

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

])

export default router