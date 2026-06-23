import { useState } from 'react';
import PageHeader from '../../components/ui/PageHeader';
import Table from '../../components/ui/Table';
import Pagination from '../../components/ui/Pagination';
import Search from '../../components/ui/Search';
import { Transaction } from './payments.types';
import { MOCK_TRANSACTIONS } from './payments.data';

const WalletPayments = () => {
    const [transactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
    const [search, setSearch] = useState('');
    const [typeFilter, setTypeFilter] = useState('All');
    const [page, setPage] = useState(1);
    const pageSize = 5;

    // Stats
    const totalRevenue      = '$347K';
    const platformCommission = '$34.7K';
    const totalWithdrawals  = transactions.filter(t => t.type === 'Withdrawal').length;
    const pendingCount      = transactions.filter(t => t.status === 'Pending').length;

    const stats = [
        { label: 'Total Revenue',        value: totalRevenue },
        { label: 'Platform Commission',  value: platformCommission },
        { label: 'Withdrawals',          value: totalWithdrawals },
        { label: 'Pending Transactions', value: pendingCount },
    ];

    const typeOptions = [
        { value: 'All',            label: 'All Types' },
        { value: 'Wallet Top-up',  label: 'Wallet Top-up' },
        { value: 'Withdrawal',     label: 'Withdrawal' },
        { value: 'Gift Payment',   label: 'Gift Payment' },
    ];

    const paginatedTxns = transactions.slice((page - 1) * pageSize, page * pageSize);

    const columns = [
        {
            title: 'Transaction ID',
            key: 'txnId',
            render: (record: Transaction) => (
                <div>
                    <span className="text-white text-sm font-semibold block">{record.txnId}</span>
                    <span className="text-white/40 text-[10px] block mt-0.5">{record.date}</span>
                </div>
            )
        },
        {
            title: 'User / Vendor',
            dataIndex: 'partyName',
            key: 'partyName',
            render: (val: string) => <span className="text-white text-sm font-medium">{val}</span>
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            render: (val: string) => (
                <span className="bg-white/[0.05] border border-white/10 text-white rounded-full px-2.5 py-0.5 text-xs font-semibold inline-block">
                    {val}
                </span>
            )
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
            render: (status: string) => (
                <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold inline-block uppercase tracking-wider ${
                        status === 'Completed'
                            ? 'bg-green-500/10 text-[#10b981] border border-green-500/20'
                            : 'bg-yellow-500/10 text-[#fbbf24] border border-yellow-500/20'
                    }`}
                >
                    {status}
                </span>
            )
        }
    ];

    return (
        <div className="space-y-6 pb-6 relative">
            <PageHeader title="Wallet & Payments" subtitle="Manage all financial transactions on the platform" />

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
                <h3 className="text-white text-lg font-bold font-sans">Recent Transactions</h3>

                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                    <Search
                        value={search}
                        onChange={(val) => {
                            setSearch(val);
                            setPage(1);
                        }}
                        placeholder="Search by transaction ID, user, or vendor..."
                    />
                    <select
                        value={typeFilter}
                        onChange={(e) => {
                            setTypeFilter(e.target.value);
                            setPage(1);
                        }}
                        className="h-11 px-4 bg-white/[0.03] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#ff4b72] transition-colors cursor-pointer"
                    >
                        {typeOptions.map(opt => (
                            <option key={opt.value} value={opt.value} className="bg-[#23090a] text-white">
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="overflow-x-auto">
                    <Table
                        dataSource={paginatedTxns}
                        columns={columns}
                        rowKey="key"
                    />
                </div>

                <Pagination
                    current={page}
                    pageSize={pageSize}
                    total={transactions.length}
                    onChange={(p) => setPage(p)}
                />
            </div>
        </div>
    );
};

export default WalletPayments;
