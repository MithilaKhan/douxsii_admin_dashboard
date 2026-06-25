import { useNavigate } from 'react-router-dom';
import { IoArrowBackOutline } from 'react-icons/io5';
import { FiBell } from 'react-icons/fi';

const MOCK_NOTIFICATIONS = [
    {
        id: '1',
        title: "Summer Sale - 30% Off",
        text: "Don't miss our biggest summer sale! Get 30% off on all flower bouquets.",
        recipient: "All Users",
        time: "2026-06-05 10:30 AM",
        delivered: "8,542 delivered"
    },
    {
        id: '2',
        title: "New Vendor Approved",
        text: "Your vendor account has been approved. Start listing your products now!",
        recipient: "Luxury Gifts Co",
        time: "2026-06-04 03:15 PM",
        delivered: "1 delivered"
    }
];

const Notification = () => {  
    const navigate = useNavigate();

    return (
        <div className="space-y-6">
            {/* Custom Back Arrow PageHeader */}
            <div className="flex items-start gap-3">
                <button 
                    onClick={() => navigate(-1)} 
                    className="text-[#56000c] hover:text-[#7d1522] transition-colors p-1 mt-0.5 cursor-pointer bg-transparent border-0 outline-none"
                >
                    <IoArrowBackOutline size={26} />
                </button>
                <div>
                    <h1 
                        className="text-[#333333] font-bold m-0 font-sans" 
                        style={{ 
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '30px',
                            lineHeight: '36px',
                            letterSpacing: '0px'
                        }}
                    >
                        Notifications
                    </h1>
                    <p 
                        className="text-gray-500 m-0 mt-1.5 font-sans" 
                        style={{ 
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '16px',
                            lineHeight: '24px',
                            letterSpacing: '0px'
                        }}
                    >
                        See all system notifications
                    </p>
                </div>
            </div>

            {/* Notifications Cards Container */}
            <div className="flex flex-col gap-4">
                {MOCK_NOTIFICATIONS.map((item) => (
                    <div 
                        key={item.id} 
                        className="p-5 rounded-2xl flex items-start justify-between gap-4 transition-all duration-300 hover:scale-[1.002] bg-white border border-[#FFD2D6]/40 shadow-[0_4px_20px_rgba(86,0,12,0.03)]"
                    >
                        <div className="flex flex-col gap-1.5">
                            <h3 className="text-[#242424] text-base font-bold m-0">{item.title}</h3>
                            <p className="text-gray-600 text-sm m-0 leading-relaxed max-w-2xl">{item.text}</p>
                            <div className="text-gray-400 text-xs mt-1 flex flex-wrap items-center gap-1.5">
                                <span>To: {item.recipient}</span>
                                <span>•</span>
                                <span>{item.time}</span>
                                <span>•</span>
                                <span className="text-[#10b981] font-medium">{item.delivered}</span>
                            </div>
                        </div>
                        <div className="shrink-0 mt-1">
                            <FiBell className="text-[#56000c]" size={20} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Notification;
