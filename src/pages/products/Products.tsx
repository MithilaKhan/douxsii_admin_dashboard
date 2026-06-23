import { useState } from 'react';
import { FiEye } from 'react-icons/fi';
import PageHeader from '../../components/ui/PageHeader';
import Table from '../../components/ui/Table';
import Pagination from '../../components/ui/Pagination';
import Search from '../../components/ui/Search';
import ProductDetailsModal from '../../components/ui/ProductDetailsModal';
import { Product } from './products.types';
import { MOCK_PRODUCTS } from './products.data';

const Products = () => {
    const [products] = useState<Product[]>(MOCK_PRODUCTS);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const pageSize = 4;

    // Modals State
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [detailsOpen, setDetailsOpen] = useState(false);

    // Dynamic stats computation
    const totalProducts = products.length;

    const paginatedProducts = products.slice((page - 1) * pageSize, page * pageSize);

    const handleOpenDetails = (product: Product) => {
        setSelectedProduct(product);
        setDetailsOpen(true);
    };

    const stats = [
        { label: 'Total Products', value: totalProducts }
    ];

    const columns = [
        {
            title: 'Products',
            key: 'products',
            render: (record: Product) => (
                <div 
                    className="flex items-center gap-3 cursor-pointer select-none"
                    onClick={() => handleOpenDetails(record)}
                >
                    <img 
                        src={record.productImage} 
                        alt={record.productName} 
                        className="w-10 h-10 rounded-lg object-cover shrink-0 border border-white/10"
                    />
                    <span className="text-white text-sm font-semibold hover:text-[#ff4b72] transition-colors block">
                        {record.productName}
                    </span>
                </div>
            )
        },
        {
            title: 'Category',
            dataIndex: 'categoryName',
            key: 'categoryName',
            render: (val: string) => <span className="text-white text-sm font-medium">{val}</span>
        },
        {
            title: 'Vendor',
            dataIndex: 'vendorName',
            key: 'vendorName',
            render: (val: string) => <span className="text-white text-sm">{val}</span>
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (val: string) => <span className="text-white text-sm font-medium">{val}</span>
        },
        {
            title: 'Stock',
            dataIndex: 'stock',
            key: 'stock',
            render: (val: number) => <span className="text-white text-sm">{val}</span>
        },
        {
            title: 'Sold',
            dataIndex: 'sold',
            key: 'sold',
            render: (val: number) => <span className="text-white text-sm">{val}</span>
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            key: 'rating',
            render: (val: number) => (
                <span className="text-white text-sm">
                    ★ {val.toFixed(1)}
                </span>
            )
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (record: Product) => (
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
            <PageHeader title="Product Management" subtitle="Manage all products from all vendors" />

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
                        onChange={(val) => setSearch(val)}
                        placeholder="Search products by name, email, or phone..."
                    />
                </div>

                <div className="overflow-x-auto">
                    <Table 
                        dataSource={paginatedProducts} 
                        columns={columns} 
                        rowKey="key"
                    />
                </div>

                <Pagination 
                    current={page}
                    pageSize={pageSize}
                    total={products.length}
                    onChange={(p) => setPage(p)}
                />
            </div>

            {/* Details Modal */}
            <ProductDetailsModal
                open={detailsOpen}
                product={selectedProduct}
                onClose={() => setDetailsOpen(false)}
            />
        </div>
    );
};

export default Products;
