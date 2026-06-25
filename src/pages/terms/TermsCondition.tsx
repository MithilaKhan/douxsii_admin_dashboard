import PageHeader from '../../components/ui/PageHeader';

const TermsCondition = () => {
    const content = `
        <div class="space-y-6">
            <p class="text-gray-700 leading-relaxed">
                Welcome to <strong>Douxsii</strong>. These Terms & Conditions outline the rules and regulations for the use of Douxsii's Support Panel. By accessing this platform, we assume you accept these terms in full.
            </p>
            <h3 class="text-lg font-bold text-[#56000c] mt-4">1. Access and License</h3>
            <p class="text-gray-700 leading-relaxed">
                Unless otherwise stated, Douxsii and/or its licensors own the intellectual property rights for all material on the platform. All intellectual property rights are reserved. You must not republish, sell, rent, sub-license, or redistribute material from this platform.
            </p>
            <h3 class="text-lg font-bold text-[#56000c] mt-4">2. User Accounts and Security</h3>
            <p class="text-gray-700 leading-relaxed">
                You are responsible for safeguarding the password that you use to access the service and for any activities or actions under your password. You agree to notify us immediately of any unauthorized use of your account.
            </p>
            <h3 class="text-lg font-bold text-[#56000c] mt-4">3. Limitation of Liability</h3>
            <p class="text-gray-700 leading-relaxed">
                In no event shall Douxsii, nor any of its officers, directors, and employees, be held liable for anything arising out of or in any way connected with your use of this platform, whether such liability is under contract or tort.
            </p>
        </div>
    `;

    return (
        <div className="space-y-6 pb-6">
            <PageHeader
                title="Terms & Conditions"
                subtitle="Guidelines and rules for accessing and using the support panel."
            />

            <div 
                className="bg-white rounded-2xl p-8 border border-[#FFD2D6]/40 shadow-[0_4px_20px_rgba(86,0,12,0.03)] text-[#242424]"
                dangerouslySetInnerHTML={{ __html: content }}
            />
        </div>
    );
};

export default TermsCondition;
