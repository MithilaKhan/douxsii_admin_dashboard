import { useState } from 'react';
import { GoQuestion } from 'react-icons/go';
import PageHeader from '../../components/ui/PageHeader';
import { FaqItem } from './faqs.types';
import { MOCK_FAQS } from './faqs.data';

const FAQs = () => {
    const [faqs] = useState<FaqItem[]>(MOCK_FAQS);

    return (
        <div className="space-y-6">
            <PageHeader
                title="Frequently Asked Questions"
                subtitle="View common questions and instructions visible to consumers."
            />

            {/* FAQ List */}
            <div className="space-y-4">
                {faqs.map((item) => (
                    <div
                        key={item.id}
                        className="rounded-2xl p-5 flex justify-between items-start gap-4 transition-all duration-300 hover:scale-[1.002] bg-white border border-[#FFD2D6]/40 shadow-[0_4px_20px_rgba(86,0,12,0.03)]"
                    >
                        <div className="w-10 h-10 rounded-full bg-[#56000c]/10 border border-[#56000c]/20 flex items-center justify-center shrink-0 mt-0.5">
                            <GoQuestion color="#56000c" size={18} />
                        </div>

                        <div className="flex-1 min-w-0">
                            <h3 className="text-[#242424] text-base font-bold m-0 break-words">{item.question}</h3>
                            <p className="text-[#242424B2] text-sm leading-relaxed mt-2 break-words m-0">{item.answer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQs;
