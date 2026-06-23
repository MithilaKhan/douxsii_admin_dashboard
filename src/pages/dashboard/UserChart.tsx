import { LuTrendingUp } from 'react-icons/lu';

const UserChart = () => {
    const vendors = [
        { id: 1, name: 'Blossom Flowers', orders: '342 orders', amount: '$45,200' },
        { id: 2, name: 'Sweet Delights', orders: '289 orders', amount: '$38,900' },
        { id: 3, name: 'Luxury Gifts Co', orders: '215 orders', amount: '$32,500' },
        { id: 4, name: 'Sweet Delights', orders: '289 orders', amount: '$38,900' },
        { id: 5, name: 'Luxury Gifts Co', orders: '215 orders', amount: '$32,500' },
    ];

    return (
        <div 
            className="flex flex-col gap-4 p-6 rounded-2xl h-full justify-between"
            style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
        >
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <h2 className="text-lg font-bold text-white">Top Vendors</h2>
                <LuTrendingUp className="text-[#ff4b72]" size={20} />
            </div>

            <div className="flex flex-col gap-3.5 mt-2">
                {vendors.map((vendor, index) => (
                    <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#ff4b72] flex items-center justify-center text-white text-sm font-semibold shrink-0">
                                {vendor.id}
                            </div>
                            <div>
                                <h4 className="text-white text-sm font-medium leading-snug">{vendor.name}</h4>
                                <p className="text-white/60 text-xs mt-0.5">{vendor.orders}</p>
                            </div>
                        </div>
                        <span className="text-white text-sm font-semibold">{vendor.amount}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserChart;
