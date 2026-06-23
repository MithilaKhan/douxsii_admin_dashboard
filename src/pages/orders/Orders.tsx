import { useState } from 'react';
import { FiEye } from 'react-icons/fi';
import PageHeader from '../../components/ui/PageHeader';
import Table from '../../components/ui/Table';
import Pagination from '../../components/ui/Pagination';
import Search from '../../components/ui/Search';
import OrderDetailsModal from '../../components/ui/OrderDetailsModal';
import { Order } from './orders.types';
import { MOCK_ORDERS } from './orders.data';

const Orders = () => {
    const [orders] = useState<Order[]>(MOCK_ORDERS);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [page, setPage] = useState(1);
    const pageSize = 4;

    // Modals State
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [detailsOpen, setDetailsOpen] = useState(false);

    // Dynamic Stats computation
    const totalOrders = orders.length;
    const pendingOrders = orders.filter(o => o.status === 'Pending').length;
    const completedOrders = orders.filter(o => o.status === 'Delivered').length;
    const giftOrders = orders.filter(o => o.isGift).length;

    const paginatedOrders = orders.slice((page - 1) * pageSize, page * pageSize);

    const handleOpenDetails = (order: Order) => {
        setSelectedOrder(order);
        setDetailsOpen(true);
    };

    const stats = [
        { label: 'Total Orders', value: totalOrders },
        { label: 'Pending', value: pendingOrders },
        { label: 'Completed', value: completedOrders },
        { label: 'Gift Orders', value: giftOrders }
    ];

    const columns = [
        {
            title: 'Order ID',
            key: 'orderId',
            render: (record: Order) => (
                <div 
                    className="cursor-pointer select-none"
                    onClick={() => handleOpenDetails(record)}
                >
                    <span className="text-white text-sm font-semibold hover:text-[#ff4b72] transition-colors block">
                        {record.orderId}
                    </span>
                    <span className="text-white/40 text-[10px] block mt-0.5">
                        {record.orderDate}
                    </span>
                </div>
            )
        },
        {
            title: 'Customer',
            dataIndex: 'customerName',
            key: 'customerName',
            render: (val: string) => <span className="text-white text-sm font-medium">{val}</span>
        },
        {
            title: 'Product',
            dataIndex: 'productName',
            key: 'productName',
            render: (val: string) => <span className="text-white text-sm">{val}</span>
        },
        {
            title: 'Vendor',
            dataIndex: 'vendorName',
            key: 'vendorName',
            render: (val: string) => <span className="text-white text-sm">{val}</span>
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            render: (val: string) => <span className="text-white text-sm font-medium">{val}</span>
        },
        {
            title: 'Payment',
            dataIndex: 'paymentMethod',
            key: 'paymentMethod',
            render: (val: string) => (
                <span className="bg-white/[0.05] border border-white/10 text-white rounded-full px-2.5 py-0.5 text-xs font-semibold inline-block">
                    {val}
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
                        status === 'Delivered' 
                            ? 'bg-green-500/10 text-[#10b981] border border-green-500/20' 
                            : status === 'Processing'
                            ? 'bg-blue-500/10 text-[#38bdf8] border border-blue-500/20'
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
            render: (record: Order) => (
                <div className="flex items-center gap-3">
                    <FiEye 
                        className="text-[#38bdf8] hover:text-[#7dd3fc] cursor-pointer" 
                        size={18} 
                        onClick={() => handleOpenDetails(record)}
                    />
                </div>
            )
        }
    ];

    return (
        <div className="space-y-6 pb-6 relative">
            <PageHeader title="Order Management" subtitle="Manage all customer and gift orders" />

            {/* Stats Cards Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                        placeholder="Search orders by ID, customer, or product..."
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
                            { value: 'Delivered', label: 'Delivered' },
                            { value: 'Processing', label: 'Processing' },
                            { value: 'Pending', label: 'Pending' },
                            { value: 'Cancelled', label: 'Cancelled' }
                        ].map(opt => (
                            <option key={opt.value} value={opt.value} className="bg-[#23090a] text-white">
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="overflow-x-auto">
                    <Table 
                        dataSource={paginatedOrders} 
                        columns={columns} 
                        rowKey="key"
                    />
                </div>

                <Pagination 
                    current={page}
                    pageSize={pageSize}
                    total={orders.length}
                    onChange={(p) => setPage(p)}
                />
            </div>

            {/* Details Modal */}
            <OrderDetailsModal
                open={detailsOpen}
                order={selectedOrder}
                onClose={() => setDetailsOpen(false)}
            />
        </div>
    );
};

export default Orders;
