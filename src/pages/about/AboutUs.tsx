import PageHeader from '../../components/ui/PageHeader';

const AboutUs = () => {
    const content = `
        <div class="space-y-6">
            <p class="text-gray-700 leading-relaxed">
                Welcome to <strong>Douxsii Support Panel</strong>, the centralized hub dedicated to monitoring, managing, and resolving customer support tickets and platform interactions in real-time.
            </p>
            <h3 class="text-lg font-bold text-[#56000c] mt-4">Our Mission</h3>
            <p class="text-gray-700 leading-relaxed">
                Our mission is to enable seamless communication between support agents, managers, vendors, and customers. By maintaining high-efficiency tracking systems and robust analytics, we aim to ensure all customer issues are resolved swiftly, with the highest standards of support quality.
            </p>
            <h3 class="text-lg font-bold text-[#56000c] mt-4">Core Principles</h3>
            <ul class="list-disc pl-5 text-gray-700 space-y-2">
                <li><strong>Responsiveness:</strong> Addressing queries and tickets in under two minutes.</li>
                <li><strong>Transparency:</strong> Clear visibility into ticket status and agent workloads.</li>
                <li><strong>Collaboration:</strong> Facilitating immediate ticket reassignments and manager supervision.</li>
            </ul>
        </div>
    `;

    return (
        <div className="space-y-6 pb-6">
            <PageHeader
                title="About Us"
                subtitle="Information about the platform and support goals."
            />

            <div 
                className="bg-white rounded-2xl p-8 border border-[#FFD2D6]/40 shadow-[0_4px_20px_rgba(86,0,12,0.03)] text-[#242424]"
                dangerouslySetInnerHTML={{ __html: content }}
            />
        </div>
    );
};

export default AboutUs;
