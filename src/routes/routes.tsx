import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Login from '../pages/auth/Login';
import ForgetPassword from '../pages/auth/ForgetPassword';
import VerifyOtp from '../pages/auth/VerifyOtp';
import NewPassword from '../pages/auth/NewPassword';
import Profile from '../pages/profile/Profile';
import Customer from '../pages/customer/Customer';
import AgentManagement from '../pages/agent-management/AgentManagement';
import FAQs from '../pages/faqs/FAQs';
import ErrorPage from '../pages/error/ErrorPage';
import Notification from '../pages/notification/Notification';
import Dashboard from '../pages/dashboard/Dashboard';
import Review from '../pages/review/Review';
import PrivacyPolicy from '../pages/privacy/PrivacyPolicy';
import TermsCondition from '../pages/terms/TermsCondition';
import AboutUs from '../pages/about/AboutUs';
import SupportTeam from '../pages/ticket-assignment/TicketAssignment';
import Chats from '../pages/chats/Chats';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            { path: '', element: <Dashboard /> },
            { path: 'customers', element: <Customer /> },
            { path: 'agent-management', element: <AgentManagement /> },
            { path: 'review', element: <Review /> },
            { path: 'ticket-assignment', element: <SupportTeam /> },
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
