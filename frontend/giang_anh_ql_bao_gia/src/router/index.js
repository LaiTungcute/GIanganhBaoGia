import Profile from "../pages/Profile/Profile";
import DefaultLayout from "../layouts/DefaultLayout/DefaultLayout";
import Product from "../pages/Product/Product";
import Quote from "../pages/Quote/Quote";

// định tuyến route chỉ khi đăng nhâp mới vào trang đc
export const private_routers = [
    {
        path: '/',
        component: DefaultLayout,
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
];