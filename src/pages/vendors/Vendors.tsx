import { useState } from 'react';
import { FiEye, FiCheckCircle, FiXCircle, FiAlertCircle } from 'react-icons/fi';
import PageHeader from '../../components/ui/PageHeader';
import Table from '../../components/ui/Table';
import Pagination from '../../components/ui/Pagination';
import Search from '../../components/ui/Search';
import Toast from '../../components/ui/Toast';
import ConfirmModal from '../../components/ui/ConfirmModal';
import VendorDetailsModal from '../../components/ui/VendorDetailsModal';
import { Vendor } from './vendors.types';
import { MOCK_VENDORS } from './vendors.data';

const Vendors = () => {
    const [vendors, setVendors] = useState<Vendor[]>(MOCK_VENDORS);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [page, setPage] = useState(1);
    const pageSize = 4;

    // Modals & Toast State
    const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [confirmType, setConfirmType] = useState<'approve' | 'suspend' | 'reject'>('approve');
    const [vendorToConfirm, setVendorToConfirm] = useState<Vendor | null>(null);
    const [toast, setToast] = useState('');

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(''), 3000);
    };

    // Calculate dynamic stats
    const totalVendors = vendors.length;
    const pendingApproval = vendors.filter(v => v.status === 'Pending').length;
    const totalRevenue = '$425.8K'; // Static total revenue matching mockup

    const paginatedVendors = vendors.slice((page - 1) * pageSize, page * pageSize);

    // Modal Actions
    const handleOpenDetails = (vendor: Vendor) => {
        setSelectedVendor(vendor);
        setDetailsOpen(true);
    };

    const triggerApproveConfirm = (vendor: Vendor) => {
        setVendorToConfirm(vendor);
        setConfirmType('approve');
        setDetailsOpen(false);
        setConfirmOpen(true);
    };

    const triggerSuspendConfirm = (vendor: Vendor) => {
        setVendorToConfirm(vendor);
        setConfirmType('suspend');
        setDetailsOpen(false);
        setConfirmOpen(true);
    };

    const triggerRejectConfirm = (vendor: Vendor) => {
        setVendorToConfirm(vendor);
        setConfirmType('reject');
        setDetailsOpen(false);
        setConfirmOpen(true);
    };

    const handleConfirmAction = () => {
        if (!vendorToConfirm) return;

        if (confirmType === 'approve') {
            setVendors(prev => prev.map(v => v.key === vendorToConfirm.key ? { ...v, status: 'Approved' } : v));
            showToast('Vendor approved successfully');
        } else if (confirmType === 'suspend') {
            setVendors(prev => prev.map(v => v.key === vendorToConfirm.key ? { ...v, status: 'Suspended' } : v));
            showToast('Vendor suspended successfully');
        } else if (confirmType === 'reject') {
            setVendors(prev => prev.filter(v => v.key !== vendorToConfirm.key));
            showToast('Vendor application rejected');
        }

        setConfirmOpen(false);
        setVendorToConfirm(null);
    };

    const stats = [
        { label: 'Total Vendors', value: totalVendors },
        { label: 'Pending Approval', value: pendingApproval },
        { label: 'Total Revenue', value: totalRevenue }
    ];

    const columns = [
        {
            title: 'Store',
            key: 'store',
            render: (record: Vendor) => (
                <div 
                    className="flex items-center gap-3 cursor-pointer select-none"
                    onClick={() => handleOpenDetails(record)}
                >
                    <div className="w-8 h-8 rounded-full bg-[#ff4b72] flex items-center justify-center text-white text-sm font-bold shrink-0">
                        {record.avatarLetter}
                    </div>
                    <div>
                        <span className="text-white text-sm font-medium hover:text-[#ff4b72] transition-colors block">
                            {record.storeName}
                        </span>
                        <span className="text-white/40 text-[10px] block mt-0.5">
                            {record.productsCount} products
                        </span>
                    </div>
                </div>
            )
        },
        {
            title: 'Owner',
            key: 'owner',
            render: (record: Vendor) => (
                <div>
                    <div className="text-white text-sm">{record.ownerName}</div>
                    <div className="text-white/40 text-xs mt-0.5">{record.ownerEmail}</div>
                </div>
            )
        },
        {
            title: 'Products',
            dataIndex: 'productsInList',
            key: 'productsInList',
            render: (val: number) => <span className="text-white text-sm">{val}</span>
        },
        {
            title: 'Revenue',
            dataIndex: 'revenue',
            key: 'revenue',
            render: (val: string) => <span className="text-white text-sm">{val}</span>
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            key: 'rating',
            render: (val: number | null) => (
                <span className="text-white text-sm">
                    {val ? `★ ${val.toFixed(1)}` : 'No reviews'}
                </span>
            )
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => (
                <span 
                    className={`px-3 py-1 rounded-full text-xs font-semibold inline-block uppercase tracking-wider ${
                        status === 'Approved' 
                            ? 'bg-green-500/10 text-[#10b981] border border-green-500/20' 
                            : status === 'Pending'
                            ? 'bg-yellow-500/10 text-[#fbbf24] border border-yellow-500/20'
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
            render: (record: Vendor) => (
                <div className="flex items-center gap-3.5">
                    <FiEye 
                        className="text-[#38bdf8] hover:text-[#7dd3fc] cursor-pointer" 
                        size={18} 
                        onClick={() => handleOpenDetails(record)}
                    />
                    {record.status === 'Approved' && (
                        <FiAlertCircle 
                            className="text-[#fbbf24] hover:text-[#fde047] cursor-pointer" 
                            size={18} 
                            onClick={() => triggerSuspendConfirm(record)}
                        />
                    )}
                    {record.status === 'Pending' && (
                        <>
                            <FiCheckCircle 
                                className="text-[#10b981] hover:text-green-400 cursor-pointer" 
                                size={18} 
                                onClick={() => triggerApproveConfirm(record)}
                            />
                            <FiXCircle 
                                className="text-[#f87171] hover:text-[#fca5a5] cursor-pointer" 
                                size={18} 
                                onClick={() => triggerRejectConfirm(record)}
                            />
                        </>
                    )}
                    {record.status === 'Suspended' && (
                        <FiCheckCircle 
                            className="text-[#10b981] hover:text-green-400 cursor-pointer" 
                            size={18} 
                            onClick={() => triggerApproveConfirm(record)}
                        />
                    )}
                </div>
            )
        }
    ];

    return (
        <div className="space-y-6 pb-6 relative">
            <Toast message={toast} />

            <PageHeader title="Vendor Management" subtitle="Manage all vendors and stores" />

            {/* Stats Cards Section */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {stats.map((stat, idx) => (
                    <div 
                        key={idx} 
                        className="rounded-2xl p-6 flex flex-col justify-center transition-all duration-300 hover:scale-[1.02]"
                        style={{
                            background: 'rgba(255, 255, 255, 0.04)',
                            border: '1px solid rgba(255, 255, 255, 0.08)'
                        }}
                    >
                        <span className="text-white/60 text-sm font-medium">{stat.label}</span>
                        <h2 className="text-white text-4xl font-bold mt-2 font-sans">{stat.value}</h2>
                    </div>
                ))}
            </div>

            {/* Content Table Area */}
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
                        placeholder="Search vendors by name, email, or store..."
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
                            { value: 'Approved', label: 'Approved' },
                            { value: 'Pending', label: 'Pending' },
                            { value: 'Suspended', label: 'Suspended' }
                        ].map(opt => (
                            <option key={opt.value} value={opt.value} className="bg-[#23090a] text-white">
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="overflow-x-auto">
                    <Table 
                        dataSource={paginatedVendors} 
                        columns={columns} 
                        rowKey="key"
                    />
                </div>

                <Pagination 
                    current={page}
                    pageSize={pageSize}
                    total={vendors.length}
                    onChange={(p) => setPage(p)}
                />
            </div>

            {/* Details Modal */}
            <VendorDetailsModal
                open={detailsOpen}
                vendor={selectedVendor}
                onClose={() => setDetailsOpen(false)}
                onStatusToggle={(vendor, next) => {
                    if (next === 'Approved') triggerApproveConfirm(vendor);
                    else triggerSuspendConfirm(vendor);
                }}
                onReject={triggerRejectConfirm}
            />

            {/* Confirm Actions Modal */}
            <ConfirmModal
                open={confirmOpen}
                title={
                    confirmType === 'approve' 
                        ? 'Approve Vendor' 
                        : confirmType === 'suspend' 
                        ? 'Suspend Vendor' 
                        : 'Reject Vendor'
                }
                description={
                    confirmType === 'approve'
                        ? 'Are you sure you want to approve this vendor? They will be able to list products and receive orders.'
                        : confirmType === 'suspend'
                        ? 'Are you sure you want to suspend this vendor? They will not be able to receive new orders.'
                        : 'Are you sure you want to reject this vendor application?'
                }
                type={confirmType === 'reject' ? 'danger' : 'warning'}
                onConfirm={handleConfirmAction}
                onCancel={() => setConfirmOpen(false)}
            />
        </div>
    );
};

export default Vendors;
