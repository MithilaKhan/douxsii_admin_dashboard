import { Modal } from 'antd';
import { FiShoppingBag, FiDollarSign, FiStar, FiCalendar, FiTrendingUp } from 'react-icons/fi';
import { Product } from '../../pages/products/products.types';
import ModalHeader from './ModalHeader';
import InfoBlock from './InfoBlock';

interface ProductDetailsModalProps {
    open: boolean;
    product: Product | null;
    onClose: () => void;
}

export const ProductDetailsModal = ({ open, product, onClose }: ProductDetailsModalProps) => {
    if (!product) return null;

    return (
        <Modal
            open={open}
            onCancel={onClose}
            footer={null}
            closeIcon={null}
            centered
            width={600}
            modalRender={() => (
                <div 
                    className="p-6 rounded-2xl flex flex-col gap-6 relative border border-white/5"
                    style={{
                        background: '#46000B',
                    }}
                >
                    {/* Header */}
                    <ModalHeader title="Product Details" onClose={onClose} />

                    {/* Product Summary Header */}
                    <div className="flex gap-4 border-b border-white/5 pb-4 mt-2">
                        <img 
                            src={product.productImage} 
                            alt={product.productName} 
                            className="w-24 h-24 rounded-2xl object-cover shrink-0 border border-white/10"
                        />
                        <div className="flex flex-col justify-center">
                            <h3 className="text-white text-xl font-bold m-0 font-sans">
                                {product.productName}
                            </h3>
                            <p className="text-white/60 text-xs m-0 mt-1 font-sans leading-relaxed">
                                {product.description}
                            </p>
                            <div className="mt-2">
                                <span className="bg-white/[0.05] border border-white/10 text-white/80 rounded-full px-2.5 py-0.5 text-xs font-semibold inline-block">
                                    {product.categoryName}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Details Content Grid */}
                    <div className="flex flex-col gap-4">
                        {/* Vendor & Price */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <InfoBlock 
                                label="Vendor" 
                                icon={<FiShoppingBag size={16} />} 
                                value={product.vendorName} 
                            />
                            <InfoBlock 
                                label="Price" 
                                icon={<FiDollarSign size={16} />} 
                                value="$89.99" 
                                valueClassName="text-2xl font-bold mt-1 font-sans"
                            />
                        </div>

                        {/* In Stock, Total Sold, Rating */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <InfoBlock 
                                label="In Stock" 
                                icon={<FiShoppingBag size={16} />} 
                                value={product.stock} 
                                className="bg-[#311F53] border-blue-500/20"
                                valueClassName="text-2xl font-bold mt-1 font-sans"
                            />
                            <InfoBlock 
                                label="Total Sold" 
                                icon={<FiTrendingUp size={16} />} 
                                value="234" 
                                className="bg-[#1A3020] border-green-500/20"
                                valueClassName="text-2xl font-bold mt-1 font-sans"
                            />
                            <InfoBlock 
                                label="Rating" 
                                icon={<FiStar size={16} className="text-yellow-500 fill-yellow-500" />} 
                                value={
                                    <div className="flex items-baseline justify-between w-full mt-1">
                                        <span className="text-2xl font-bold font-sans">
                                            {product.rating.toFixed(1)}
                                        </span>
                                        <span className="text-white/40 text-[10px]">
                                            {product.reviewsCount} reviews
                                        </span>
                                    </div>
                                } 
                                className="bg-[#592D1A] border-yellow-500/20"
                            />
                        </div>

                        {/* Added Date */}
                        <InfoBlock 
                            label="Added Date" 
                            icon={<FiCalendar size={16} />} 
                            value={product.addedDate} 
                        />
                    </div>
                </div>
            )}
        />
    );
};

export default ProductDetailsModal;
