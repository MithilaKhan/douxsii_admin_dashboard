import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Login from '../pages/auth/Login';
import ForgetPassword from '../pages/auth/ForgetPassword';
import VerifyOtp from '../pages/auth/VerifyOtp';
import NewPassword from '../pages/auth/NewPassword';
import Profile from '../pages/profile/Profile';
import Users from '../pages/users/Users';
import Vendors from '../pages/vendors/Vendors';
import Orders from '../pages/orders/Orders';
import Products from '../pages/products/Products';
import FAQs from '../pages/faqs/FAQs';
import ErrorPage from '../pages/error/ErrorPage';
import Notification from '../pages/notification/Notification';
import Dashboard from '../pages/dashboard/Dashboard';
import WalletPayments from '../pages/payments/WalletPayments';
import Gifts from '../pages/gifts/Gifts';
import PrivacyPolicy from '../pages/privacy/PrivacyPolicy';
import TermsCondition from '../pages/terms/TermsCondition';
import AboutUs from '../pages/about/AboutUs';
import SupportTeam from '../pages/support-team/SupportTeam';
import Advertisement from '../pages/advertisement/Advertisement';
import Chats from '../pages/chats/Chats';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            { path: '', element: <Dashboard /> },
            { path: 'users', element: <Users /> },
            { path: 'vendors', element: <Vendors /> },
            { path: 'orders', element: <Orders /> },
            { path: 'products', element: <Products /> },
            { path: 'payments', element: <WalletPayments /> },
            { path: 'gifts', element: <Gifts /> },
            { path: 'support-team', element: <SupportTeam /> },
            { path: 'advertisement', element: <Advertisement /> },
            { path: 'chats', element: <Chats /> },
            { path: 'faqs', element: <FAQs /> },
            { path: 'privacy', element: <PrivacyPolicy /> },
            { path: 'terms', element: <TermsCondition /> },
            { path: 'about', element: <AboutUs /> },
            { path: 'profile', element: <Profile /> },
            { path: 'notification', element: <Notification /> },
        ],
    },
    { path: '/login', element: <Login /> },
    { path: '/forget-password', element: <ForgetPassword /> },
    { path: '/verify-otp', element: <VerifyOtp /> },
    { path: '/new-password', element: <NewPassword /> },
]);



export default router;
