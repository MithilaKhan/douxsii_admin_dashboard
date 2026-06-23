import { Modal } from 'antd';
import { FiUser, FiShoppingBag, FiMapPin, FiCreditCard, FiTruck, FiGift } from 'react-icons/fi';
import { Order } from '../../pages/orders/orders.types';
import ModalHeader from './ModalHeader';
import InfoBlock from './InfoBlock';

interface OrderDetailsModalProps {
    open: boolean;
    order: Order | null;
    onClose: () => void;
}

export const OrderDetailsModal = ({ open, order, onClose }: OrderDetailsModalProps) => {
    if (!order) return null;

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
                    <ModalHeader title="Order Details" onClose={onClose} />

                    {/* Order ID, Date & Status Summary */}
                    <div className="flex items-center justify-between border-b border-white/5 pb-4 mt-2">
                        <div>
                            <h3 className="text-white text-2xl font-bold m-0 font-sans tracking-wide">
                                {order.orderId}
                            </h3>
                            <span 
                                className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider inline-block mt-2 ${
                                    order.status === 'Delivered' 
                                        ? 'bg-green-500/10 text-[#10b981] border border-green-500/20' 
                                        : order.status === 'Processing'
                                        ? 'bg-blue-500/10 text-[#38bdf8] border border-blue-500/20'
                                        : order.status === 'Pending'
                                        ? 'bg-yellow-500/10 text-[#fbbf24] border border-yellow-500/20'
                                        : 'bg-red-500/10 text-[#ef4444] border border-red-500/20'
                                }`}
                            >
                                {order.status}
                            </span>
                        </div>
                        <div className="text-right">
                            <span className="text-white/40 text-[11px] font-medium block">Order Date</span>
                            <span className="text-white text-lg font-bold block mt-1 font-sans">
                                {order.orderDate}
                            </span>
                        </div>
                    </div>

                    {/* Content Grid */}
                    <div className="flex flex-col gap-4">
                        {/* Customer & Vendor Details */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <InfoBlock 
                                label="Customer Information" 
                                icon={<FiUser size={16} />} 
                                value={
                                    <div className="mt-1">
                                        <div className="text-white text-sm font-semibold">{order.customerName}</div>
                                        <div className="text-white/40 text-xs mt-0.5">{order.customerEmail}</div>
                                        <div className="text-white/40 text-xs mt-0.5">{order.customerPhone}</div>
                                    </div>
                                }
                            />
                            <InfoBlock 
                                label="Vendor Information" 
                                icon={<FiShoppingBag size={16} />} 
                                value={
                                    <div className="mt-1">
                                        <div className="text-white text-sm font-semibold">{order.vendorName}</div>
                                    </div>
                                }
                            />
                        </div>

                        {/* Product Details */}
                        <InfoBlock 
                            label="Product Details" 
                            icon={<FiShoppingBag size={16} />} 
                            value={
                                <div className="flex items-center justify-between w-full mt-1">
                                    <div>
                                        <div className="text-white text-sm font-semibold">{order.productName}</div>
                                        <div className="text-white/40 text-xs mt-0.5">Quantity: {order.quantity}</div>
                                    </div>
                                    <div className="text-white text-2xl font-bold font-sans">
                                        {order.amount}
                                    </div>
                                </div>
                            }
                        />

                        {/* Delivery Address */}
                        <InfoBlock 
                            label="Delivery Address" 
                            icon={<FiMapPin size={16} />} 
                            value={order.address} 
                        />

                        {/* Payment & Tracking */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <InfoBlock 
                                label="Payment Method" 
                                icon={<FiCreditCard size={16} />} 
                                value={order.paymentMethod} 
                            />
                            <InfoBlock 
                                label="Tracking Number" 
                                icon={<FiTruck size={16} />} 
                                value={order.trackingNumber} 
                            />
                        </div>

                        {/* Gift Message (conditional) */}
                        {order.giftMessage && (
                            <InfoBlock 
                                label="Gift Message" 
                                icon={<FiGift size={16} />} 
                                value={`"${order.giftMessage}"`} 
                                className="bg-[#5A121D] border-red-500/20"
                                valueClassName="text-white/90 text-sm font-medium mt-1.5 italic"
                            />
                        )}
                    </div>
                </div>
            )}
        />
    );
};

export default OrderDetailsModal;
