import { Modal } from 'antd';
import { FiMail, FiCalendar, FiMapPin, FiStar } from 'react-icons/fi';
import { Campaign } from '../../pages/advertisement/advertisement.types';
import ModalHeader from './ModalHeader';
import InfoBlock from './InfoBlock';

interface CampaignDetailsModalProps {
    open: boolean;
    campaign: Campaign | null;
    onClose: () => void;
}

const STATUS_STYLES: Record<string, { bg: string; text: string; border: string }> = {
    Active:   { bg: 'bg-green-500/10',  text: 'text-[#10b981]', border: 'border-green-500/20' },
    Expired:  { bg: 'bg-yellow-500/10', text: 'text-[#fbbf24]', border: 'border-yellow-500/20' },
    Pending:  { bg: 'bg-blue-500/10',   text: 'text-[#38bdf8]', border: 'border-blue-500/20' },
    Rejected: { bg: 'bg-red-500/10',    text: 'text-[#ef4444]', border: 'border-red-500/20' },
};

export const CampaignDetailsModal = ({ open, campaign, onClose }: CampaignDetailsModalProps) => {
    if (!campaign) return null;
    const s = STATUS_STYLES[campaign.status] ?? STATUS_STYLES['Pending'];

    return (
        <Modal
            open={open}
            onCancel={onClose}
            footer={null}
            closeIcon={null}
            centered
            width={580}
            modalRender={() => (
                <div
                    className="p-6 rounded-2xl flex flex-col gap-5 border border-white/5"
                    style={{ background: '#46000B' }}
                >
                    <ModalHeader title="Campaign Details" onClose={onClose} />

                    {/* Campaign Card Preview */}
                    <div
                        className="rounded-xl p-3 border border-white/[0.06]"
                        style={{ background: 'rgba(255,255,255,0.03)' }}
                    >
                        <p className="text-white/40 text-[10px] font-medium uppercase tracking-wider mb-2">
                            Campaign Card Preview
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-[#560e18]">
                                <img
                                    src={campaign.image}
                                    alt={campaign.title}
                                    className="w-full h-full object-cover"
                                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <span className="text-[10px] font-bold bg-white/10 text-white/60 px-2 py-0.5 rounded uppercase tracking-wider">
                                    SPONSORED
                                </span>
                                <p className="text-white font-bold text-sm mt-1 truncate">{campaign.title}</p>
                                <p className="text-white/50 text-xs mt-0.5 truncate">{campaign.offer}</p>
                                <div className="flex items-center justify-between mt-1.5">
                                    <div className="flex items-center gap-1">
                                        <FiStar size={11} className="text-[#fbbf24]" />
                                        <span className="text-white/60 text-xs">{campaign.rating} ({campaign.reviewCount} reviews)</span>
                                    </div>
                                    <span className="text-white font-bold text-sm">AED {campaign.price}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ID + Status + Revenue row */}
                    <div className="grid grid-cols-3 gap-4">
                        <div
                            className="p-4 rounded-xl flex flex-col gap-1 border border-white/[0.05]"
                            style={{ background: 'rgba(255,255,255,0.03)' }}
                        >
                            <p className="text-white/40 text-[11px] font-medium">ID</p>
                            <p className="text-white font-bold text-sm font-mono">{campaign.adId}</p>
                            <span className={`mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border self-start ${s.bg} ${s.text} ${s.border}`}>
                                {campaign.status}
                            </span>
                        </div>
                        <div
                            className="p-4 rounded-xl flex flex-col gap-1 border border-white/[0.05]"
                            style={{ background: 'rgba(255,255,255,0.03)' }}
                        >
                            <p className="text-white/40 text-[11px] font-medium">Total Revenue</p>
                            <p className="text-white font-bold text-xl font-sans mt-1">{campaign.totalRevenue}</p>
                        </div>
                        <div
                            className="p-4 rounded-xl flex flex-col gap-1 border border-white/[0.05]"
                            style={{ background: 'rgba(255,255,255,0.03)' }}
                        >
                            <p className="text-white/40 text-[11px] font-medium">Daily Average</p>
                            <p className="text-white font-bold text-xl font-sans mt-1">{campaign.dailyAverage}</p>
                        </div>
                    </div>

                    {/* Info Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <InfoBlock
                            label="Creator"
                            value={
                                <span>
                                    <span className="block text-sm font-semibold">{campaign.vendorName}</span>
                                    <span className="block text-xs text-white/40 mt-0.5">{campaign.vendorEmail}</span>
                                </span>
                            }
                            icon={<FiMapPin size={15} />}
                        />
                        <InfoBlock
                            label="Remaining Days"
                            value={`${campaign.remainingDays} days`}
                            icon={<FiCalendar size={15} />}
                        />
                        <InfoBlock
                            label="Placement Section"
                            value={
                                <span>
                                    <span className="block text-sm font-semibold">{campaign.placementSection}</span>
                                    <span className="block text-xs text-white/40 mt-0.5">{campaign.placementEmail}</span>
                                </span>
                            }
                            icon={<FiMail size={15} />}
                        />
                        <InfoBlock
                            label="Duration"
                            value={`${campaign.startDate} → ${campaign.endDate}`}
                            icon={<FiCalendar size={15} />}
                        />
                    </div>
                </div>
            )}
        />
    );
};

export default CampaignDetailsModal;
