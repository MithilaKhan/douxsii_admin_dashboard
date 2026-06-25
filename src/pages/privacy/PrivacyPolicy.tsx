import PageHeader from '../../components/ui/PageHeader';

const PrivacyPolicy = () => {
    const content = `
        <div class="space-y-6">
            <p class="text-gray-700 leading-relaxed">
                At <strong>Douxsii</strong>, accessible from our customer support portal, one of our main priorities is the privacy of our visitors and users. This Privacy Policy document contains types of information that are collected and recorded by Douxsii and how we use it.
            </p>
            <h3 class="text-lg font-bold text-[#56000c] mt-4">1. Information We Collect</h3>
            <p class="text-gray-700 leading-relaxed">
                We collect personal information that you voluntarily provide to us when you register on the platform, express an interest in obtaining information about us, or contact support. This may include your name, email address, phone number, and conversation logs.
            </p>
            <h3 class="text-lg font-bold text-[#56000c] mt-4">2. How We Use Your Information</h3>
            <p class="text-gray-700 leading-relaxed">
                We use the information we collect or receive to facilitate account creation, manage support tickets, improve our support response times, and protect the security of our platform.
            </p>
            <h3 class="text-lg font-bold text-[#56000c] mt-4">3. Information Sharing</h3>
            <p class="text-gray-700 leading-relaxed">
                We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations. We do not sell or trade your personal information to third parties.
            </p>
        </div>
    `;

    return (
        <div className="space-y-6 pb-6">
            <PageHeader
                title="Privacy Policy"
                subtitle="Information about how we collect, use, and safeguard your data."
            />

            <div 
                className="bg-white rounded-2xl p-8 border border-[#FFD2D6]/40 shadow-[0_4px_20px_rgba(86,0,12,0.03)] text-[#242424]"
                dangerouslySetInnerHTML={{ __html: content }}
            />
        </div>
    );
};

export default PrivacyPolicy;
