import { useState, useRef, useEffect } from 'react';
import PageHeader from '../../components/ui/PageHeader';
import Toast from '../../components/ui/Toast';
import { SupportChat, ChatMessage } from './chats.types';
import { MOCK_CHATS } from './chats.data';
import ChatSidebar from './ChatSidebar';
import ChatWindow from './ChatWindow';

const STATUS_BADGE: Record<string, string> = {
    'Open': 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
    'In Progress': 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20',
    'Resolved': 'bg-green-500/10 text-green-400 border border-green-500/20',
    'Closed': 'bg-white/10 text-white/50 border border-white/10',
};

// Generates avatar background color based on name length or character code
const getAvatarBg = (name: string) => {
    const colors = [
        'bg-[#560e18]', 'bg-[#1e3a8a]', 'bg-[#115e59]', 
        'bg-[#7c2d12]', 'bg-[#581c87]', 'bg-[#0369a1]'
    ];
    let sum = 0;
    for (let i = 0; i < name.length; i++) {
        sum += name.charCodeAt(i);
    }
    return colors[sum % colors.length];
};

const Chats = () => {
    const [chats, setChats] = useState<SupportChat[]>(MOCK_CHATS);
    const [selectedChatKey, setSelectedChatKey] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState<'active' | 'resolved'>('active');
    const [toast, setToast] = useState('');

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const showToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => setToast(''), 2500);
    };

    const selectedChat = chats.find(c => c.key === selectedChatKey);

    // Scroll to bottom when messages or selected chat changes
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [selectedChat?.messages, selectedChatKey]);

    const handleSendMessage = (text: string) => {
        if (!selectedChatKey) return;

        const newMsg: ChatMessage = {
            id: Date.now().toString(),
            sender: 'agent',
            text: text,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setChats(prevChats =>
            prevChats.map(c => {
                if (c.key === selectedChatKey) {
                    return {
                        ...c,
                        lastMessage: newMsg.text,
                        lastMessageTime: 'Just now',
                        messages: [...c.messages, newMsg],
                    };
                }
                return c;
            })
        );
    };

    const handleStatusChange = (status: SupportChat['status']) => {
        if (!selectedChatKey) return;
        setChats(prevChats =>
            prevChats.map(c => {
                if (c.key === selectedChatKey) {
                    return { ...c, status };
                }
                return c;
            })
        );
        showToast(`Chat marked as ${status}`);
    };

    // Filter chats based on tab and search query
    const filteredChats = chats.filter(chat => {
        const matchesTab = activeTab === 'active' 
            ? (chat.status === 'Open' || chat.status === 'In Progress')
            : (chat.status === 'Resolved' || chat.status === 'Closed');

        const matchesSearch = 
            chat.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            chat.chatId.toLowerCase().includes(searchQuery.toLowerCase()) ||
            chat.subject.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesTab && matchesSearch;
    });

    return (
        <div className="flex flex-col h-[calc(100vh-140px)] text-white">
            <PageHeader 
                title="Support Chats" 
                subtitle="Provide real-time help to users and vendors." 
            />

            {/* Main Layout Container */}
            <div className="flex flex-col lg:flex-row gap-6 mt-6 flex-1 overflow-hidden min-h-0">
                <ChatSidebar
                    filteredChats={filteredChats}
                    selectedChatKey={selectedChatKey}
                    onSelectChat={setSelectedChatKey}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    getAvatarBg={getAvatarBg}
                    statusBadge={STATUS_BADGE}
                />

                <ChatWindow
                    selectedChat={selectedChat}
                    onStatusChange={handleStatusChange}
                    onSendMessage={handleSendMessage}
                    showToast={showToast}
                    messagesEndRef={messagesEndRef}
                    getAvatarBg={getAvatarBg}
                />
            </div>

            {toast && <Toast message={toast} />}
        </div>
    );
};

export default Chats;
