import { Campaign } from './advertisement.types';

interface CampaignCardProps {
    campaign: Campaign;
    onApprove: (key: string) => void;
    onReject: (key: string) => void;
}

export const CampaignCard = ({ campaign, onApprove, onReject }: CampaignCardProps) => {
    return (
        <div
            className="rounded-2xl overflow-hidden transition-all hover:scale-[1.01]"
            style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)'
            }}
        >
            {/* Image */}
            <div className="relative w-full h-44 bg-[#560e18]">
                <img
                    src={campaign.image}
                    alt={campaign.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                    }}
                />
                <span
                    className="absolute top-3 left-3 text-[10px] font-bold tracking-wider px-2 py-1 rounded text-white"
                    style={{ background: 'rgba(0,0,0,0.55)' }}
                >
                    {campaign.badge}
                </span>
            </div>

            {/* Info */}
            <div className="p-4 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                    <div>
                        <p className="text-white text-sm font-bold leading-tight">{campaign.title}</p>
                        <p className="text-white/40 text-xs mt-0.5">by {campaign.vendorName}</p>
                    </div>
                    <div className="text-right shrink-0">
                        <p className="text-white font-bold text-sm">${campaign.price.toLocaleString()}</p>
                        <p className="text-white/40 text-xs">{campaign.duration} Days</p>
                    </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                    <span className="text-white/40">Payment Status</span>
                    <span className="text-[#10b981] font-semibold">{campaign.paymentStatus}</span>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => onApprove(campaign.key)}
                        className="flex-1 h-9 rounded-xl text-white text-sm font-semibold cursor-pointer border-0 outline-none transition-all hover:opacity-90 active:scale-95"
                        style={{ background: '#7a0015' }}
                    >
                        Approve
                    </button>
                    <button
                        onClick={() => onReject(campaign.key)}
                        className="flex-1 h-9 rounded-xl text-white text-sm font-semibold cursor-pointer bg-transparent outline-none transition-all hover:bg-white/5 active:scale-95"
                        style={{ border: '1px solid rgba(255,255,255,0.15)' }}
                    >
                        Reject
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CampaignCard;
