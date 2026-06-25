import PageHeader from '../../components/ui/PageHeader';
import { getFromLocalStorage } from '../../utils/localStorage';
import ManagerStats from './ManagerStats';
import ManagerProductivity from './ManagerProductivity';
import ManagerTickets from './ManagerTickets';
import AgentStats from './AgentStats';
import AgentPerformance from './AgentPerformance';
import AgentTickets from './AgentTickets';

const Dashboard = () => {
    const role = getFromLocalStorage('userRole') || 'Support Agent';

    return (
        <div className="space-y-6 pb-6">
            {/* Title & Subtitle */}
            <PageHeader 
                title="Dashboard Overview" 
                subtitle="Real time performance monitoring and support health." 
            />

            {role === 'Support Manager' ? (
                <>
                    {/* Support Manager Dashboard Sections */}
                    <ManagerStats />
                    <ManagerProductivity />
                    <ManagerTickets />
                </>
            ) : (
                <>
                    {/* Support Agent Dashboard Sections */}
                    <AgentStats />
                    <AgentPerformance />
                    <AgentTickets />
                </>
            )}
        </div>
    );
};

export default Dashboard;
