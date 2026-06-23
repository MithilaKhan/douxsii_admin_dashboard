import { useState } from 'react';
import { FiEye, FiEdit2, FiTrash2, FiStar } from 'react-icons/fi';
import { AiOutlinePlus } from 'react-icons/ai';
import PageHeader from '../../components/ui/PageHeader';
import Table from '../../components/ui/Table';
import Pagination from '../../components/ui/Pagination';
import Search from '../../components/ui/Search';
import Toast from '../../components/ui/Toast';
import StatsCards from '../../components/ui/StatsCards';
import ConfirmModal from '../../components/ui/ConfirmModal';
import SupportAgentModal, { AgentFormValues } from '../../components/ui/SupportAgentModal';
import { SupportAgent } from './support.types';
import { MOCK_AGENTS } from './support.data';

const STATUS_DOT: Record<string, string> = {
    Online:  'bg-[#10b981]',
    Busy:    'bg-[#fbbf24]',
    Offline: 'bg-white/30',
};

const STATUS_TEXT: Record<string, string> = {
    Online:  'text-[#10b981]',
    Busy:    'text-[#fbbf24]',
    Offline: 'text-white/50',
};

const SupportTeam = () => {
    const [search, setSearch]           = useState('');
    const [page, setPage]               = useState(1);
    const pageSize = 7;

    // Modal states
    const [modalOpen, setModalOpen]     = useState(false);
    const [editingAgent, setEditingAgent] = useState<SupportAgent | null>(null);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deletingKey, setDeletingKey] = useState<string | null>(null);
    const [toast, setToast]             = useState('');

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(''), 2500);
    };

    // Stats — static mocks, will come from API on backend integration
    const stats = [
        { label: 'Total Support Agents', value: MOCK_AGENTS.length },
        { label: 'Active Chats',          value: 48 },
        { label: 'Avg Response Time',     value: '2.5 m' },
        { label: 'Avg. Rating',           value: 4.8 },
    ];

    const paginatedAgents = MOCK_AGENTS.slice((page - 1) * pageSize, page * pageSize);

    const handleAdd = () => {
        setEditingAgent(null);
        setModalOpen(true);
    };

    const handleEdit = (agent: SupportAgent) => {
        setEditingAgent(agent);
        setModalOpen(true);
    };

    const handleDeleteRequest = (key: string) => {
        setDeletingKey(key);
        setConfirmOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (deletingKey) {
            showToast('Agent removed successfully');
        }
        setConfirmOpen(false);
        setDeletingKey(null);
    };

    const handleSubmit = (values: AgentFormValues, avatar: string | null) => {
        // TODO: call API on backend integration
        console.log('Agent submit payload:', values, 'avatar:', avatar);
        if (editingAgent) {
            showToast('Agent updated successfully');
        } else {
            showToast('Agent created successfully');
        }
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'agentId',
            key: 'agentId',
            render: (val: string) => <span className="text-white/70 text-sm font-mono">{val}</span>
        },
        {
            title: 'Agent',
            key: 'agent',
            render: (record: SupportAgent) => (
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#ff4b72]/15 border border-[#ff4b72]/20 flex items-center justify-center text-white text-sm font-bold shrink-0 overflow-hidden">
                        {record.avatar
                            ? <img src={record.avatar} alt={record.name} className="w-full h-full object-cover" />
                            : record.name.charAt(0)
                        }
                    </div>
                    <div>
                        <span className="text-white text-sm font-semibold block">{record.name}</span>
                        <span className="text-white/40 text-xs block">{record.email}</span>
                    </div>
                </div>
            )
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
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
                <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full inline-block ${STATUS_DOT[status]}`} />
                    <span className={`text-sm font-medium ${STATUS_TEXT[status]}`}>{status}</span>
                </div>
            )
        },
        {
            title: 'Avg Rating',
            dataIndex: 'avgRating',
            key: 'avgRating',
            render: (val: number) => (
                <div className="flex items-center gap-1">
                    <FiStar className="text-[#fbbf24]" size={13} />
                    <span className="text-white text-sm font-medium">{val}</span>
                </div>
            )
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (record: SupportAgent) => (
                <div className="flex items-center gap-3">
                    <FiEye
                        className="text-[#38bdf8] hover:text-[#7dd3fc] cursor-pointer"
                        size={17}
                        onClick={() => handleEdit(record)}
                    />
                    <FiEdit2
                        className="text-white/40 hover:text-white cursor-pointer"
                        size={15}
                        onClick={() => handleEdit(record)}
                    />
                    <FiTrash2
                        className="text-[#ff4b72]/60 hover:text-[#ff4b72] cursor-pointer"
                        size={15}
                        onClick={() => handleDeleteRequest(record.key)}
                    />
                </div>
            )
        },
    ];

    return (
        <div className="space-y-6 pb-6 relative">
            <Toast message={toast} />

            <PageHeader
                title="Support Team Management"
                subtitle="Manage and monitor support team for the customers"
                extra={
                    <button
                        onClick={handleAdd}
                        className="h-11 px-5 rounded-xl text-white text-sm font-semibold flex items-center gap-2 transition-all hover:opacity-90 active:scale-95 cursor-pointer border-0 outline-none"
                        style={{ background: '#5e000d' }}
                    >
                        <AiOutlinePlus size={16} />
                        Add New Agent
                    </button>
                }
            />

            <StatsCards stats={stats} />

            {/* Table */}
            <div
                className="p-6 rounded-2xl flex flex-col gap-6"
                style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.08)'
                }}
            >
                <Search
                    value={search}
                    onChange={(val) => { setSearch(val); setPage(1); }}
                    placeholder="Search agents by name, email, or role..."
                />

                <div className="overflow-x-auto">
                    <Table dataSource={paginatedAgents} columns={columns} rowKey="key" />
                </div>

                <Pagination
                    current={page}
                    pageSize={pageSize}
                    total={MOCK_AGENTS.length}
                    onChange={(p) => setPage(p)}
                />
            </div>

            <SupportAgentModal
                open={modalOpen}
                editingAgent={editingAgent}
                onClose={() => setModalOpen(false)}
                onSubmit={handleSubmit}
            />

            <ConfirmModal
                open={confirmOpen}
                title="Remove Agent"
                description="This support agent will be permanently removed. Are you sure?"
                type="danger"
                onConfirm={handleDeleteConfirm}
                onCancel={() => setConfirmOpen(false)}
            />
        </div>
    );
};

export default SupportTeam;
