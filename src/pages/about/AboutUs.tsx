import { useState } from 'react';
import PageHeader from '../../components/ui/PageHeader';
import Toast from '../../components/ui/Toast';
import RichTextEditor from '../../components/ui/RichTextEditor';

const AboutUs = () => {
    const [content, setContent] = useState('<p>Write your About Us content here...</p>');
    const [toast, setToast] = useState('');

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(''), 2500);
    };

    const handleSave = () => {
        // TODO: connect to API on backend integration
        showToast('About Us saved successfully');
    };

    return (
        <div className="space-y-6 pb-6">
            <Toast message={toast} />

            <PageHeader
                title="About Us"
                subtitle="Manage the about us content visible to all users on the platform."
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

export default AboutUs;
