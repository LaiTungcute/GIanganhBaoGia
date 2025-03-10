import Profile from "../pages/Profile/Profile";
import DefaultLayout from "../layouts/DefaultLayout/DefaultLayout";
import Product from "../pages/Product/Product";
import Quote from "../pages/Quote/Quote";
import HomePage from "../pages/HomePage/HomePage";
import { FormAddQuote } from "../pages/FormAddQuote";
import FormEditQuote from "../pages/FormEditQuote/FormEditQuote";
import Task from "../pages/Task/Task";
import { DetailsQuotes } from "../pages/DetailsQuotes";

// định tuyến route chỉ khi đăng nhâp mới vào trang đc
export const private_routers = [
    {
        path: '/',
        component: HomePage, // Sử dụng HomePage thay vì DefaultLayout
        layout: DefaultLayout,
    },
    {
        path: '/profile',
        component: Profile,
        layout: DefaultLayout,
    },
    {
        path: '/product',
        component: Product,
        layout: DefaultLayout,
    },
    {
        path: '/quote',
        component: Quote,
        layout: DefaultLayout,
    },
    {
        path: '/add-quote',
        component: FormAddQuote,
        layout: DefaultLayout,
    },
    {
        // dynamic route
        path: '/edit-quote/:id',
        component: FormEditQuote,
        layout: DefaultLayout,
    },
    {
        path: '/details-quote/:id',
        component: DetailsQuotes,
        layout: DefaultLayout,
    },
    {
        path: '/task',
        component: Task,
        layout: DefaultLayout
    }
];