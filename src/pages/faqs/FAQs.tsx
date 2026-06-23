import { useState } from 'react';
import { GoQuestion } from 'react-icons/go';
import { CiEdit } from 'react-icons/ci';
import { RxCross2 } from 'react-icons/rx';
import { AiOutlinePlus } from 'react-icons/ai';
import PageHeader from '../../components/ui/PageHeader';
import Toast from '../../components/ui/Toast';
import ConfirmModal from '../../components/ui/ConfirmModal';
import FaqModal from '../../components/ui/FaqModal';
import { FaqItem } from './faqs.types';
import { MOCK_FAQS } from './faqs.data';

const FAQs = () => {
    const [faqs, setFaqs]             = useState<FaqItem[]>(MOCK_FAQS);
    const [modalOpen, setModalOpen]   = useState(false);
    const [editingFaq, setEditingFaq] = useState<FaqItem | null>(null);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [toast, setToast]           = useState('');

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(''), 2500);
    };

    const handleAdd = () => {
        setEditingFaq(null);
        setModalOpen(true);
    };

    const handleEdit = (item: FaqItem) => {
        setEditingFaq(item);
        setModalOpen(true);
    };

    const handleDeleteRequest = (id: string) => {
        setDeletingId(id);
        setConfirmOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (deletingId) {
            setFaqs(prev => prev.filter(f => f.id !== deletingId));
            showToast('FAQ deleted successfully');
        }
        setConfirmOpen(false);
        setDeletingId(null);
    };

    const handleSubmit = (values: { question: string; answer: string }) => {
        if (editingFaq) {
            setFaqs(prev => prev.map(f => f.id === editingFaq.id ? { ...f, ...values } : f));
            showToast('FAQ updated successfully');
        } else {
            setFaqs(prev => [{ id: Date.now().toString(), ...values }, ...prev]);
            showToast('FAQ added successfully');
        }
        setModalOpen(false);
    };

    return (
        <div className="space-y-6">
            <Toast message={toast} />

            <PageHeader
                title="Frequently Asked Questions"
                subtitle="Manage common questions and instructions visible to consumers."
                extra={
                    <button
                        onClick={handleAdd}
                        className="h-11 px-5 rounded-xl text-white text-sm font-semibold flex items-center gap-2 transition-all hover:opacity-90 active:scale-95 cursor-pointer border-0 outline-none"
                        style={{ background: '#5e000d' }}
                    >
                        <AiOutlinePlus size={16} />
                        Add FAQ
                    </button>
                }
            />

            {/* FAQ List */}
            <div className="space-y-4">
                {faqs.map((item) => (
                    <div
                        key={item.id}
                        className="rounded-2xl p-5 flex justify-between items-start gap-4 transition-all duration-300 hover:scale-[1.005]"
                        style={{
                            background: 'rgba(255, 255, 255, 0.04)',
                            border: '1px solid rgba(255, 255, 255, 0.08)'
                        }}
                    >
                        <div className="w-10 h-10 rounded-full bg-[#ff4b72]/10 border border-[#ff4b72]/20 flex items-center justify-center shrink-0 mt-0.5">
                            <GoQuestion color="#ff4b72" size={18} />
                        </div>

                        <div className="flex-1 min-w-0">
                            <h3 className="text-white text-base font-semibold m-0 break-words">{item.question}</h3>
                            <p className="text-white/50 text-sm leading-relaxed mt-2 break-words m-0">{item.answer}</p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 mt-0.5">
                            <button
                                onClick={() => handleEdit(item)}
                                className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-[#38bdf8] transition-colors cursor-pointer bg-transparent border border-white/10 outline-none"
                            >
                                <CiEdit size={17} />
                            </button>
                            <button
                                onClick={() => handleDeleteRequest(item.id)}
                                className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-[#ef4444] transition-colors cursor-pointer bg-transparent border border-white/10 outline-none"
                            >
                                <RxCross2 size={15} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <FaqModal
                open={modalOpen}
                editingFaq={editingFaq}
                onClose={() => setModalOpen(false)}
                onSubmit={handleSubmit}
            />

            <ConfirmModal
                open={confirmOpen}
                title="Delete FAQ"
                description="This FAQ entry will be removed permanently. Are you sure?"
                type="danger"
                onConfirm={handleDeleteConfirm}
                onCancel={() => setConfirmOpen(false)}
            />
        </div>
    );
};

export default FAQs;
