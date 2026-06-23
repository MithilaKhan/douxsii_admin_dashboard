import Search from '../../components/ui/Search';
import { ChatSidebarProps } from './chats.types';

export const ChatSidebar = ({
    filteredChats,
    selectedChatKey,
    onSelectChat,
    searchQuery,
    onSearchChange,
    activeTab,
    onTabChange,
    getAvatarBg,
    statusBadge,
}: ChatSidebarProps) => {
    return (
        <div 
            className="w-full lg:w-80 xl:w-96 flex flex-col rounded-2xl overflow-hidden flex-shrink-0"
            style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)'
            }}
        >
            {/* Search Section using UI Search component */}
            <div className="p-4 border-b border-white/5">
                <Search
                    value={searchQuery}
                    onChange={onSearchChange}
                    placeholder="Search by name, ID, or subject..."
                    className="!max-w-none"
                />
            </div>

            {/* Tab Switcher */}
            <div className="flex px-4 py-3 gap-2 border-b border-white/5">
                <button
                    onClick={() => onTabChange('active')}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition ${
                        activeTab === 'active'
                            ? 'bg-[#560e18] text-white'
                            : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                >
                    Active
                </button>
                <button
                    onClick={() => onTabChange('resolved')}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition ${
                        activeTab === 'resolved'
                            ? 'bg-[#560e18] text-white'
                            : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                >
                    Resolved & Closed
                </button>
            </div>

            {/* Chats scroll area */}
            <div className="flex-1 overflow-y-auto divide-y divide-white/5 custom-scrollbar">
                {filteredChats.length === 0 ? (
                    <div className="p-8 text-center text-white/40 text-sm">
                        No conversations found
                    </div>
                ) : (
                    filteredChats.map((chat) => {
                        const isSelected = chat.key === selectedChatKey;
                        const avatarBg = getAvatarBg(chat.userName);
                        return (
                            <div
                                key={chat.key}
                                onClick={() => onSelectChat(chat.key)}
                                className={`p-4 cursor-pointer transition flex gap-3 items-start ${
                                    isSelected ? 'bg-white/10' : 'hover:bg-white/5'
                                }`}
                            >
                                {/* User Initials Avatar */}
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${avatarBg}`}>
                                    {chat.userName.split(' ').map(n => n[0]).join('').toUpperCase()}
                                </div>

                                {/* Content info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h4 className="font-semibold text-sm truncate pr-2 text-white">
                                            {chat.userName}
                                        </h4>
                                        <span className="text-[10px] text-white/40 whitespace-nowrap">
                                            {chat.lastMessageTime}
                                        </span>
                                    </div>
                                    <p className="text-xs text-white/50 truncate mb-1.5">
                                        {chat.subject}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${statusBadge[chat.status]}`}>
                                            {chat.status}
                                        </span>
                                        {chat.unreadCount && chat.unreadCount > 0 && !isSelected && (
                                            <span className="bg-[#560e18] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                                                {chat.unreadCount}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default ChatSidebar;
