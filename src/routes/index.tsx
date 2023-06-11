import { createBrowserRouter } from "react-router-dom";
const Router = createBrowserRouter([
    {
        path: '/login',
        lazy: () => import('../pages/login')
    },
    {
        path: '/',
        lazy: () => import('../pages/main')
    }
],)


export default Router