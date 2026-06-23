import { Layout, Badge, Dropdown } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../providers/UserProvider';
import { useContext, useState } from 'react';
import { IoNotificationsOutline } from 'react-icons/io5';
import { AiOutlineLogout, AiOutlineUser } from 'react-icons/ai';
import { removeFromLocalStorage } from '../../utils/localStorage';

const { Header } = Layout;

const HeaderDashboard = () => {
    const user = useContext(UserContext);
    const [notificationCount] = useState(5);
    const navigate = useNavigate();

    const handleLogout = () => {
        removeFromLocalStorage('accessToken');
        removeFromLocalStorage('userData');
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
                background: 'linear-gradient(to right, #46000B, #6B000F)',
                width: '100%',
                padding: '0 24px',
                borderBottom: '1.5px solid rgba(255, 255, 255, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
            }}
        >
            <div className="flex items-center gap-5">
                {/* Notifications */}
                <Link to="/notification" className="flex items-center justify-center">
                    <div className="flex items-center justify-center cursor-pointer relative transition-opacity hover:opacity-85">
                        <Badge count={notificationCount} size="small" offset={[2, -2]} color="#ff4d4f">
                            <IoNotificationsOutline size={24} className="text-white" />
                        </Badge>
                    </div>
                </Link>

                {/* Vertical Divider */}
                <div className="w-[1.5px] h-6 bg-white/20 self-center" />

                {/* Profile dropdown */}
                <Dropdown menu={{ items: profileMenuItems }} placement="bottomRight" trigger={['click']}>
                    <div className="flex items-center gap-3 cursor-pointer select-none py-1 px-2 rounded-lg hover:bg-white/5 transition-colors">
                        <img
                            src={user?.image || "/user.svg"}
                            style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                border: '1.5px solid rgba(255, 255, 255, 0.8)',
                                objectFit: 'cover',
                            }}
                            alt="Profile"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = "/user.svg";
                            }}
                        />
                        <div className="hidden sm:block text-left">
                            <h2 className="text-white text-sm font-semibold leading-tight">
                                {user?.name || "Admin Portfolio"}
                            </h2>
                            <p className="text-xs text-white/60 capitalize leading-none mt-0.5">
                                {user?.role ? user.role.toLowerCase().replace('_', ' ') : "Observatory Lead"}
                            </p>
                        </div>
                    </div>
                </Dropdown>
            </div>
        </Header>
    );
};

export default HeaderDashboard;
