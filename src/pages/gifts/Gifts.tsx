import { useState } from 'react';
import { FiEye } from 'react-icons/fi';
import PageHeader from '../../components/ui/PageHeader';
import Table from '../../components/ui/Table';
import Pagination from '../../components/ui/Pagination';
import Search from '../../components/ui/Search';
import GiftDetailsModal from '../../components/ui/GiftDetailsModal';
import { Gift } from './gifts.types';
import { MOCK_GIFTS } from './gifts.data';

const STATUS_RENDER: Record<string, JSX.Element> = {
    Redeemed: (
        <span className="px-3 py-1 rounded-full text-xs font-semibold inline-block uppercase tracking-wider bg-green-500/10 text-[#10b981] border border-green-500/20">
            Redeemed
        </span>
    ),
    Pending: (
        <span className="px-3 py-1 rounded-full text-xs font-semibold inline-block uppercase tracking-wider bg-yellow-500/10 text-[#fbbf24] border border-yellow-500/20">
            Pending
        </span>
    ),
    Expired: (
        <span className="px-3 py-1 rounded-full text-xs font-semibold inline-block uppercase tracking-wider bg-red-500/10 text-[#ef4444] border border-red-500/20">
            Expired
        </span>
    ),
};

const Gifts = () => {
    const [gifts] = useState<Gift[]>(MOCK_GIFTS);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [page, setPage] = useState(1);
    const pageSize = 4;

    // Modal state
    const [selectedGift, setSelectedGift] = useState<Gift | null>(null);
    const [detailsOpen, setDetailsOpen] = useState(false);

    const handleOpenDetails = (gift: Gift) => {
        setSelectedGift(gift);
        setDetailsOpen(true);
    };

    // Stats
    const totalGifts    = gifts.length;
    const redeemedGifts = gifts.filter(g => g.status === 'Redeemed').length;
    const pendingGifts  = gifts.filter(g => g.status === 'Pending').length;
    const expiredGifts  = gifts.filter(g => g.status === 'Expired').length;

    const stats = [
        { label: 'Total Gifts', value: totalGifts },
        { label: 'Redeemed',   value: redeemedGifts },
        { label: 'Pending',    value: pendingGifts },
        { label: 'Expired',    value: expiredGifts },
    ];

    const statusOptions = [
        { value: 'All',      label: 'All Status' },
        { value: 'Redeemed', label: 'Redeemed' },
        { value: 'Pending',  label: 'Pending' },
        { value: 'Expired',  label: 'Expired' },
    ];

    const paginatedGifts = gifts.slice((page - 1) * pageSize, page * pageSize);

    const columns = [
        {
            title: 'Gift ID',
            key: 'giftId',
            render: (record: Gift) => (
                <div
                    className="cursor-pointer select-none"
                    onClick={() => handleOpenDetails(record)}
                >
                    <span className="text-white text-sm font-semibold hover:text-[#ff4b72] transition-colors block">
                        {record.giftId}
                    </span>
                    <span className="text-white/40 text-[10px] block mt-0.5">{record.sentDate}</span>
                </div>
            )
        },
        {
            title: 'Sender',
            key: 'sender',
            render: (record: Gift) => (
                <div>
                    <span className="text-white text-sm font-medium block">{record.senderName}</span>
                    <span className="text-white/40 text-[10px] block mt-0.5">{record.senderEmail}</span>
                </div>
            )
        },
        {
            title: 'Receiver',
            key: 'receiver',
            render: (record: Gift) => (
                <div>
                    <span className="text-white text-sm font-medium block">{record.receiverName}</span>
                    <span className="text-white/40 text-[10px] block mt-0.5">{record.receiverEmail}</span>
                </div>
            )
        },
        {
            title: 'Product',
            dataIndex: 'productName',
            key: 'productName',
            render: (val: string) => <span className="text-white text-sm">{val}</span>
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            render: (val: string) => <span className="text-white text-sm font-medium">{val}</span>
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => STATUS_RENDER[status] ?? null
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (record: Gift) => (
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
            <PageHeader title="Gift System" subtitle="Track all gifts sent and received on the platform" />

            {/* Stats Cards */}
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
                        placeholder="Search gifts by ID, sender, or receiver..."
                    />
                    <select
                        value={statusFilter}
                        onChange={(e) => {
                            setStatusFilter(e.target.value);
                            setPage(1);
                        }}
                        className="h-11 px-4 bg-white/[0.03] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#ff4b72] transition-colors cursor-pointer"
                    >
                        {statusOptions.map(opt => (
                            <option key={opt.value} value={opt.value} className="bg-[#23090a] text-white">
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="overflow-x-auto">
                    <Table
                        dataSource={paginatedGifts}
                        columns={columns}
                        rowKey="key"
                    />
                </div>

                <Pagination
                    current={page}
                    pageSize={pageSize}
                    total={gifts.length}
                    onChange={(p) => setPage(p)}
                />
            </div>

            {/* Details Modal */}
            <GiftDetailsModal
                open={detailsOpen}
                gift={selectedGift}
                onClose={() => setDetailsOpen(false)}
            />
        </div>
    );
};

export default Gifts;
