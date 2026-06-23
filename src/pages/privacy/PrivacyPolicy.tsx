import { useState } from 'react';
import PageHeader from '../../components/ui/PageHeader';
import Toast from '../../components/ui/Toast';
import RichTextEditor from '../../components/ui/RichTextEditor';

const PrivacyPolicy = () => {
    const [content, setContent] = useState('<p>Write your Privacy Policy content here...</p>');
    const [toast, setToast] = useState('');

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(''), 2500);
    };

    const handleSave = () => {
        showToast('Privacy Policy saved successfully');
    };

    return (
        <div className="space-y-6 pb-6">
            <Toast message={toast} />

            <PageHeader
                title="Privacy Policy"
                subtitle="Manage the privacy policy visible to all users on the platform."
            />

            <RichTextEditor value={content} onChange={setContent} />

            <button
                onClick={handleSave}
                className="h-11 px-6 rounded-xl text-white text-sm font-semibold transition-all hover:opacity-90 active:scale-95 cursor-pointer border-0 outline-none"
                style={{ background: '#5e000d' }}
            >
                Save Changes
            </button>
        </div>
    );
};

export default PrivacyPolicy;
