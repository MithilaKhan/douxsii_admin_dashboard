import PageHeader from '../../components/ui/PageHeader';
import DashboardStats from './DashboardStats';
import EarningChart from './EarningChart';
import UserChart from './UserChart';
import { Link } from 'react-router-dom';

const MOCK_VENDOR_REQUESTS = [
    { id: '1', name: 'Elegant Perfumes', contact: 'David Lee • david@elegantperfumes.com', date: 'Applied on 2026-06-01' },
    { id: '2', name: 'Flower Paradise', contact: 'Lisa Wang • lisa@flowerparadise.com', date: 'Applied on 2026-06-03' }
];

const Dashboard = () => {
    return (
        <div className="space-y-6 pb-6">
            {/* Title & Subtitle Primitive component */}
            <PageHeader 
                title="Dashboard Overview" 
                subtitle="Welcome back! Here's what's happening today." 
            />

            {/* Stats Cards */}
            <DashboardStats />

            {/* Daily Sales & Top Vendors */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mt-6">
                <div className="lg:col-span-3">
                    <EarningChart />
                </div>
                <div className="lg:col-span-2">
                    <UserChart />
                </div>
            </div>

            {/* New Vendor Requests */}
            <div 
                className="p-6 rounded-2xl flex flex-col gap-5"
                style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.08)'
                }}
            >
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white m-0">New Vendor Requests</h3>
                    <Link to="/vendors" className="text-[#ff4b72] hover:text-[#ff4b72]/80 transition-colors text-sm font-semibold">
                        View All
                    </Link>
                </div>

                <div className="flex flex-col gap-4">
                    {MOCK_VENDOR_REQUESTS.map((req) => (
                        <div 
                            key={req.id} 
                            className="p-4 rounded-xl flex items-center justify-between transition-all duration-300 hover:bg-white/[0.04]"
                            style={{
                                background: 'rgba(255, 255, 255, 0.02)',
                                border: '1px solid rgba(255, 255, 255, 0.05)'
                            }}
                        >
                            <div className="flex flex-col gap-1">
                                <h4 className="text-white text-base font-semibold m-0">{req.name}</h4>
                                <span className="text-white/60 text-sm">{req.contact}</span>
                                <span className="text-white/40 text-[11px] mt-0.5">{req.date}</span>
                            </div>
                            <button 
                                className="h-9 px-5 rounded-lg text-black font-semibold text-sm transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                                style={{
                                    background: '#ffab73'
                                }}
                            >
                                Review
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
