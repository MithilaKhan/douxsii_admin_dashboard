import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const MOCK_SALES_DATA = [
    { name: 'Mon', sales: 4000 },
    { name: 'Tue', sales: 5000 },
    { name: 'Wed', sales: 4700 },
    { name: 'Thu', sales: 6300 },
    { name: 'Fri', sales: 7600 },
    { name: 'Sat', sales: 9000 },
    { name: 'Sun', sales: 6700 },
];

const EarningChart = () => {
    return (
        <div 
            className="flex flex-col gap-4 p-6 rounded-2xl"
            style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
        >
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <h2 className="text-lg font-bold text-white">Daily Sales</h2>
            </div>
            
            <div className="h-64 mt-2">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={MOCK_SALES_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" />
                        <XAxis 
                            dataKey="name" 
                            stroke="rgba(255, 255, 255, 0.4)" 
                            fontSize={12} 
                            tickLine={false} 
                            axisLine={false} 
                        />
                        <YAxis 
                            stroke="rgba(255, 255, 255, 0.4)" 
                            fontSize={12} 
                            tickLine={false} 
                            axisLine={false} 
                            domain={[0, 10000]}
                        />
                        <Tooltip 
                            contentStyle={{ 
                                borderRadius: '12px', 
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                background: '#23090a',
                                color: '#fff',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="sales"
                            name="Sales"
                            stroke="#ff4b72"
                            strokeWidth={3}
                            dot={{ fill: '#ff4b72', stroke: '#fff', strokeWidth: 1.5, r: 4 }}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default EarningChart;
