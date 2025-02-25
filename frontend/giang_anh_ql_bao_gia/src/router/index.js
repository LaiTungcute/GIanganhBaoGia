import Profile from "../pages/Profile/Profile";
import DefaultLayout from "../layouts/DefaultLayout/DefaultLayout";
import Product from "../pages/Product/Product";
import Quote from "../pages/Quote/Quote";
import HomePage from "../pages/HomePage/HomePage";
import { FormAddQuote } from "../pages/FormAddQuote";
import FormEditQuote from "../pages/FormEditQuote/FormEditQuote";

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
        path: '/edit-quote',
        component: FormEditQuote,
        layout: DefaultLayout,
    },
];