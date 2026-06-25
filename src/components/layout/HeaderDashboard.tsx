import { Layout, Badge, Dropdown } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../providers/UserProvider';
import { useContext, useState } from 'react';
import { IoNotificationsOutline } from 'react-icons/io5';
import { AiOutlineLogout, AiOutlineUser } from 'react-icons/ai';
import { getFromLocalStorage, removeFromLocalStorage } from '../../utils/localStorage';

const { Header } = Layout;

const HeaderDashboard = () => {
    const user = useContext(UserContext);
    const [notificationCount] = useState(5);
    const [status, setStatus] = useState('Online');
    const navigate = useNavigate();

    const role = getFromLocalStorage('userRole') || 'Support Agent';
    const displayName = user?.name && user.name !== "Mithila Admin" ? user.name : "Alex John";
    const displayRole = user?.role && user.role !== "SUPER_ADMIN" ? user.role : role;
    const profileImage = user?.image && user.image !== "/user.svg" ? user.image : "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=256";

    const handleLogout = () => {
        removeFromLocalStorage('accessToken');
        removeFromLocalStorage('userData');
        removeFromLocalStorage('userRole');
        navigate('/login');
        window.location.reload();
    };

    const profileMenuItems = [
        {
            key: 'profile',
            label: <Link to="/profile">My Profile</Link>,
            icon: <AiOutlineUser size={16} />,
        },
        {
            key: 'logout',
            label: <span className="text-red-500 font-medium">Log Out</span>,
            icon: <AiOutlineLogout size={16} className="text-red-500" />,
            onClick: handleLogout,
        },
    ];

    return (
        <Header
            style={{
                height: 80,
                background: '#FFE5E7',
                width: '100%',
                padding: '0 24px',
                borderBottom: '1px solid #FFD2D6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
            }}
        >
            <div className="flex items-center gap-5">
                {/* Change Status Dropdown for Support Agent */}
                {displayRole === 'Support Agent' && (
                    <div className="flex flex-col items-start mr-2">
                        <span className="text-[10px] text-gray-500 font-semibold leading-none mb-1">Change Status</span>
                        <select 
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="bg-white border border-[#FFD2D2] rounded-md px-2 py-0.5 text-xs text-[#333333] font-semibold focus:outline-none focus:ring-1 focus:ring-[#56000c] cursor-pointer"
                        >
                            <option value="Online">Online</option>
                            <option value="Offline">Offline</option>
                            <option value="Away">Away</option>
                        </select>
                    </div>
                )}

                {/* Notifications */}
                <Link to="/notification" className="flex items-center justify-center">
                    <div className="flex items-center justify-center cursor-pointer relative transition-opacity hover:opacity-85">
                        <Badge count={notificationCount} size="small" offset={[2, -2]} color="#ff4d4f">
                            <IoNotificationsOutline size={24} className="text-[#56000c]" />
                        </Badge>
                    </div>
                </Link>

                {/* Vertical Divider */}
                <div className="w-[1.5px] h-6 bg-[#56000c]/20 self-center" />

                {/* Profile dropdown */}
                <Dropdown menu={{ items: profileMenuItems }} placement="bottomRight" trigger={['click']}>
                    <div className="flex items-center gap-3 cursor-pointer select-none py-1 px-2 rounded-lg hover:bg-[#56000c]/5 transition-colors">
                        <img
                            src={profileImage}
                            style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                border: '1.5px solid #56000c',
                                objectFit: 'cover',
                            }}
                            alt="Profile"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = "/user.svg";
                            }}
                        />
                        <div className="hidden sm:block text-left">
                            <h2 className="text-[#333333] text-sm font-semibold leading-tight">
                                {displayName}
                            </h2>
                            <p className="text-xs text-gray-500 capitalize leading-none mt-0.5">
                                {displayRole}
                            </p>
                        </div>
                    </div>
                </Dropdown>
            </div>
        </Header>
    );
};

export default HeaderDashboard;
