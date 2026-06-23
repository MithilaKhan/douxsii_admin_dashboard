import { useState } from 'react';
import { FiEye } from 'react-icons/fi';
import PageHeader from '../../components/ui/PageHeader';
import StatsCards from '../../components/ui/StatsCards';
import Table from '../../components/ui/Table';
import Pagination from '../../components/ui/Pagination';
import Search from '../../components/ui/Search';
import Toast from '../../components/ui/Toast';
import ConfirmModal from '../../components/ui/ConfirmModal';
import CampaignDetailsModal from '../../components/ui/CampaignDetailsModal';
import { Campaign } from './advertisement.types';
import { MOCK_CAMPAIGNS } from './advertisement.data';

import CampaignCard from './CampaignCard';

type Tab = 'pending' | 'active';

const STATUS_STYLES: Record<string, { dot: string; text: string }> = {
    Active:  { dot: 'bg-[#10b981]', text: 'text-[#10b981]' },
    Expired: { dot: 'bg-[#fbbf24]', text: 'text-[#fbbf24]' },
};

// Stats — static mocks, will come from API on backend integration
const stats = [
    { label: 'Total Active Campaigns', value: 124 },
    { label: 'Pending Request',        value: 12 },
    { label: 'Total Ads Revenue',      value: 'AED 2,134' },
];

const Advertisement = () => {
    const [activeTab, setActiveTab]       = useState<Tab>('pending');
    const [search, setSearch]             = useState('');
    const [page, setPage]                 = useState(1);
    const pageSize = 6;
    const [detailsOpen, setDetailsOpen]   = useState(false);
    const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
    const [confirmOpen, setConfirmOpen]   = useState(false);
    const [confirmType, setConfirmType]   = useState<'approve' | 'reject'>('approve');
    const [toast, setToast]               = useState('');

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(''), 2500);
    };

    const pendingCampaigns = MOCK_CAMPAIGNS.filter(c => c.status === 'Pending');
    const activeCampaigns  = MOCK_CAMPAIGNS.filter(c => c.status === 'Active' || c.status === 'Expired');

    const paginatedPending = pendingCampaigns.slice((page - 1) * pageSize, page * pageSize);
    const paginatedActive  = activeCampaigns.slice((page - 1) * pageSize, page * pageSize);

    const openDetails = (c: Campaign) => {
        setSelectedCampaign(c);
        setDetailsOpen(true);
    };

    const requestConfirm = (key: string, type: 'approve' | 'reject') => { 
        console.log(key, type);
        setConfirmType(type);
        setConfirmOpen(true);
    };

    const handleConfirm = () => {
        // TODO: call API on backend integration
        showToast(confirmType === 'approve' ? 'Campaign approved successfully' : 'Campaign rejected');
        setConfirmOpen(false);
    };

    const activeCampaignColumns = [
        {
            title: 'Campaign',
            key: 'campaign',
            render: (r: Campaign) => (
                <div>
                    <p className="text-white text-sm font-semibold">{r.title}</p>
                    <p className="text-white/40 text-xs">ID {r.adId}</p>
                </div>
            ),
        },
        {
            title: 'Vendor',
            dataIndex: 'vendorName',
            key: 'vendorName',
            render: (v: string) => <span className="text-white/80 text-sm">{v}</span>,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (s: string) => {
                const style = STATUS_STYLES[s] ?? { dot: 'bg-white/30', text: 'text-white/50' };
                return (
                    <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${style.dot}`} />
                        <span className={`text-sm font-medium ${style.text}`}>{s}</span>
                    </div>
                );
            },
        },
        {
            title: 'Sales',
            dataIndex: 'sales',
            key: 'sales',
            render: (v: string) => <span className="text-white text-sm font-medium">{v}</span>,
        },
        {
            title: 'Remaining',
            dataIndex: 'remainingDays',
            key: 'remainingDays',
            render: (v: number) => (
                <span className="text-white/60 text-sm">{v} days left</span>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (r: Campaign) => (
                <FiEye
                    className="text-[#38bdf8] hover:text-[#7dd3fc] cursor-pointer"
                    size={17}
                    onClick={() => openDetails(r)}
                />
            ),
        },
    ];

    const tabs: { key: Tab; label: string }[] = [
        { key: 'pending', label: 'Pending Approval' },
        { key: 'active',  label: 'Active Campaigns' },
    ];

    return (
        <div className="space-y-6 pb-6">
            <Toast message={toast} />

            <PageHeader
                title="Advertisement Management"
                subtitle="Manage premium placements and vendor campaign approvals."
            />

            <StatsCards stats={stats} cols={3} />

            {/* Tabs */}
            <div className="flex items-center gap-6 border-b border-white/10 pb-0">
                {tabs.map(tab => (
                    <button
                        key={tab.key}
                        onClick={() => { setActiveTab(tab.key); setPage(1); }}
                        className={`pb-3 text-sm font-semibold transition-all cursor-pointer bg-transparent border-0 outline-none border-b-2 -mb-[1px]
                            ${activeTab === tab.key
                                ? 'text-[#ff4b72] border-[#ff4b72]'
                                : 'text-white/40 border-transparent hover:text-white/70'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Pending Approval — Card Grid */}
            {activeTab === 'pending' && (
                <div className="space-y-4">
                    <Search
                        value={search}
                        onChange={(v) => { setSearch(v); setPage(1); }}
                        placeholder="Search campaigns..."
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {paginatedPending.map(c => (
                            <CampaignCard
                                key={c.key}
                                campaign={c}
                                onApprove={(key) => requestConfirm(key, 'approve')}
                                onReject={(key) => requestConfirm(key, 'reject')}
                            />
                        ))}
                    </div>
                    <Pagination current={page} pageSize={pageSize} total={pendingCampaigns.length} onChange={setPage} />
                </div>
            )}

            {/* Active Campaigns — Table */}
            {activeTab === 'active' && (
                <div
                    className="p-6 rounded-2xl flex flex-col gap-6"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                >
                    <Search
                        value={search}
                        onChange={(v) => { setSearch(v); setPage(1); }}
                        placeholder="Search campaigns..."
                    />
                    <div className="overflow-x-auto">
                        <Table dataSource={paginatedActive} columns={activeCampaignColumns} rowKey="key" />
                    </div>
                    <Pagination current={page} pageSize={pageSize} total={activeCampaigns.length} onChange={setPage} />
                </div>
            )}

            <CampaignDetailsModal
                open={detailsOpen}
                campaign={selectedCampaign}
                onClose={() => setDetailsOpen(false)}
            />

            <ConfirmModal
                open={confirmOpen}
                title={confirmType === 'approve' ? 'Approve Campaign' : 'Reject Campaign'}
                description={
                    confirmType === 'approve'
                        ? 'This campaign will be published and made visible to users. Confirm?'
                        : 'This campaign will be rejected and the vendor will be notified. Confirm?'
                }
                type={confirmType === 'approve' ? 'warning' : 'danger'}
                onConfirm={handleConfirm}
                onCancel={() => setConfirmOpen(false)}
            />
        </div>
    );
};

export default Advertisement;
