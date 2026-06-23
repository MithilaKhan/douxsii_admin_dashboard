import { useState } from 'react';
import { FiEye, FiTrash2, FiUserMinus } from 'react-icons/fi';
import PageHeader from '../../components/ui/PageHeader';
import Table from '../../components/ui/Table';
import UserStats from '../../components/ui/UserStats';
import Pagination from '../../components/ui/Pagination';
import UserDetailsModal from '../../components/ui/UserDetailsModal';
import ConfirmModal from '../../components/ui/ConfirmModal';
import Toast from '../../components/ui/Toast';
import Search from '../../components/ui/Search'; 
import { User } from './users.types';
import { MOCK_USERS } from './users.data';

const Users = () => {
    const [users, setUsers] = useState<User[]>(MOCK_USERS);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [page, setPage] = useState(1);
    const pageSize = 4;

    // Modal & Toast States
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [confirmType, setConfirmType] = useState<'block' | 'unblock' | 'delete'>('block');
    const [userToConfirm, setUserToConfirm] = useState<User | null>(null);
    const [toast, setToast] = useState('');

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(''), 3000);
    };

    // Derived statistics counts
    const totalUsers = users.length;
    const activeUsers = users.filter(u => u.status === 'Active').length;
    const verifiedUsers = activeUsers; 
    const blockedUsers = users.filter(u => u.status === 'Blocked').length;

    const paginatedUsers = users.slice((page - 1) * pageSize, page * pageSize);

    // Modal triggers
    const handleOpenDetails = (user: User) => {
        setSelectedUser(user);
        setDetailsOpen(true);
    };

    const triggerBlockToggleConfirm = (user: User) => {
        setUserToConfirm(user);
        setConfirmType(user.status === 'Active' ? 'block' : 'unblock');
        setDetailsOpen(false);
        setConfirmOpen(true);
    };

    const triggerDeleteConfirm = (user: User) => {
        setUserToConfirm(user);
        setConfirmType('delete');
        setDetailsOpen(false);
        setConfirmOpen(true);
    };

    const handleConfirmAction = () => {
        if (!userToConfirm) return;

        if (confirmType === 'block') {
            setUsers(prev => prev.map(u => u.key === userToConfirm.key ? { ...u, status: 'Blocked' } : u));
            showToast('User blocked successfully');
        } else if (confirmType === 'unblock') {
            setUsers(prev => prev.map(u => u.key === userToConfirm.key ? { ...u, status: 'Active' } : u));
            showToast('User unblocked successfully');
        } else if (confirmType === 'delete') {
            setUsers(prev => prev.filter(u => u.key !== userToConfirm.key));
            showToast('User deleted successfully');
        }

        setConfirmOpen(false);
        setUserToConfirm(null);
    };

    const columns = [
        {
            title: 'User',
            dataIndex: 'name',
            key: 'name',
            render: (text: string, record: User) => (
                <div 
                    className="flex items-center gap-3 cursor-pointer select-none"
                    onClick={() => handleOpenDetails(record)}
                >
                    <div className="w-8 h-8 rounded-full bg-[#ff4b72] flex items-center justify-center text-white text-sm font-semibold shrink-0">
                        {text.charAt(0)}
                    </div>
                    <span className="text-white text-sm font-medium hover:text-[#ff4b72] transition-colors">{text}</span>
                </div>
            )
        },
        {
            title: 'Contact',
            key: 'contact',
            render: (record: User) => (
                <div>
                    <div className="text-white text-sm">{record.email}</div>
                    <div className="text-white/40 text-xs mt-0.5">{record.phone}</div>
                </div>
            )
        },
        {
            title: 'Orders',
            dataIndex: 'orders',
            key: 'orders',
            render: (orders: number) => <span className="text-white text-sm">{orders}</span>
        },
        {
            title: 'Total Spent',
            dataIndex: 'spent',
            key: 'spent',
            render: (spent: string) => <span className="text-white text-sm">{spent}</span>
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => (
                <span 
                    className={`px-3 py-1 rounded-full text-xs font-semibold inline-block ${
                        status === 'Active' 
                            ? 'bg-green-500/10 text-[#10b981] border border-green-500/20' 
                            : 'bg-red-500/10 text-[#ef4444] border border-red-500/20'
                    }`}
                >
                    {status}
                </span>
            )
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (record: User) => (
                <div className="flex items-center gap-3.5">
                    <FiEye 
                        className="text-[#38bdf8] hover:text-[#7dd3fc] cursor-pointer" 
                        size={18} 
                        onClick={() => handleOpenDetails(record)}
                    />
                    <FiUserMinus 
                        className="text-[#fbbf24] hover:text-[#fde047] cursor-pointer" 
                        size={18} 
                        onClick={() => triggerBlockToggleConfirm(record)}
                    />
                    <FiTrash2 
                        className="text-[#f87171] hover:text-[#fca5a5] cursor-pointer" 
                        size={18} 
                        onClick={() => triggerDeleteConfirm(record)}
                    />
                </div>
            )
        }
    ];

    return (
        <div className="space-y-6 pb-6 relative">
            {/* Reusable Toast Notification */}
            <Toast message={toast} />

            <PageHeader title="User Management" subtitle="Manage all customer accounts" />

            <UserStats total={totalUsers} active={activeUsers} verified={verifiedUsers} blocked={blockedUsers} />

            <div 
                className="p-6 rounded-2xl flex flex-col gap-6"
                style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.08)'
                }}
            >
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                    <Search 
                        value={search}
                        onChange={(val) => {
                            setSearch(val);
                            setPage(1);
                        }}
                        placeholder="Search users by name, email, or phone..."
                    />
                    <select 
                        value={statusFilter}
                        onChange={(e) => {
                            setStatusFilter(e.target.value);
                            setPage(1);
                        }}
                        className="h-11 px-4 bg-white/[0.03] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#ff4b72] transition-colors cursor-pointer"
                    >
                        {[
                            { value: 'All', label: 'All Status' },
                            { value: 'Active', label: 'Active' },
                            { value: 'Blocked', label: 'Block' }
                        ].map(opt => (
                            <option key={opt.value} value={opt.value} className="bg-[#23090a] text-white">
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="overflow-x-auto">
                    <Table 
                        dataSource={paginatedUsers} 
                        columns={columns} 
                        rowKey="key"
                    />
                </div>

                <Pagination 
                    current={page}
                    pageSize={pageSize}
                    total={users.length}
                    onChange={(p) => setPage(p)}
                />
            </div>

            {/* User Details Modal */}
            <UserDetailsModal
                open={detailsOpen}
                user={selectedUser}
                onClose={() => setDetailsOpen(false)}
                onBlockToggle={triggerBlockToggleConfirm}
                onDelete={triggerDeleteConfirm}
            />

            {/* Confirm Actions Modal */}
            <ConfirmModal
                open={confirmOpen}
                title={
                    confirmType === 'delete' 
                        ? 'Delete User' 
                        : confirmType === 'block' 
                        ? 'Block User' 
                        : 'Unblock User'
                }
                description={
                    confirmType === 'delete'
                        ? 'Are you sure you want to delete this user? This action cannot be undone.'
                        : confirmType === 'block'
                        ? 'Are you sure you want to block this user? They will not be able to access the platform.'
                        : 'Are you sure you want to unblock this user? They will regain access to the platform.'
                }
                type={confirmType === 'delete' ? 'danger' : 'warning'}
                onConfirm={handleConfirmAction}
                onCancel={() => setConfirmOpen(false)}
            />
        </div>
    );
};

export default Users;
