//react router
//router/index.js
import { createBrowserRouter } from 'react-router-dom'

import Login from '../pages/Login/Login'
import Test from '../pages/Test/Test'
import Index from '../pages/Index/Index'
import NotFound from '../pages/NotFound/NotFound'
import Admin from '../pages/Admin/Admin'
import Dictionary from '../pages/Dictionary/Dictionary'
import Book from '../pages/Book/Book'
import Collect from '../pages/Collect/Collect'
import Welcome from '../pages/Welcome/Welcome'
import Uploadnewbooks from '../pages/Admin/Uploadnewbooks'
import Uploadexistingbooks from '../pages/Admin/Uploadexistingbooks'
import Singlecut from '../pages/Admin/SingleCut'
import BookDetail from '../pages/Book/BookDetail'
import BookVersionDetail from '../pages/Book/BookVersionDetail'
import CollectDisplay from '../pages/Collect/CollectDisplay'
import CollectionDisplay from '../pages/Collect/CollectionDisplay'
import Reconition from '../pages/Regonition/Regonition'



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
                element: <Book />,
            },
            {
                path: '/book/detail/:boid',
                element: <BookDetail />, 
            },
            {
                path: '/collect',
                element: <Collect />
            },
            {
                path:'/collectdisplay',
                element: <CollectDisplay />
            },
            {
                path:'/collectiondisplay/:coid',
                element: <CollectionDisplay />
            },
            {
                path:'/regonition',
                element: <Reconition />
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
        path:'/book/detail/:boid/:vername',
        element: <BookVersionDetail />
    },
    {
        path: '/admin',
        element: <Admin />,
        children:[
            {
                path: '/admin/uploadnewbooks',
                element: <Uploadnewbooks />
            },
            {
                path: '/admin/uploadexisitngbooks',
                element: <Uploadexistingbooks />
            },
            {
                path: '/admin/singlecut',
                element: <Singlecut />
            },
        ]
    },

])

export default router