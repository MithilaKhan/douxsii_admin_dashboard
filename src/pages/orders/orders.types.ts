export interface Order {
    key: string;
    orderId: string;
    orderDate: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    productName: string;
    quantity: number;
    vendorName: string;
    amount: string;
    paymentMethod: string;
    status: 'Delivered' | 'Processing' | 'Pending' | 'Cancelled';
    address: string;
    trackingNumber: string;
    giftMessage?: string;
    isGift: boolean;
}
