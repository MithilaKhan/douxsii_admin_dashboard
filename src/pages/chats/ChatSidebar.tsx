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
    activeChatsCount,
}: ChatSidebarProps) => {
    return (
        <div className="w-full lg:w-80 xl:w-96 flex flex-col bg-white rounded-2xl border border-[#FFD2D6]/40 shadow-[0_4px_20px_rgba(86,0,12,0.03)] flex-shrink-0 overflow-hidden">
            {/* Header Section */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-lg font-bold text-[#242424] m-0">Inbox</h3>
                {activeChatsCount > 0 && (
                    <span className="bg-[#56000c] text-white text-[10px] px-2.5 py-0.5 rounded-full font-bold">
                        {activeChatsCount} Active
                    </span>
                )}
            </div>

            {/* Search Section */}
            <div className="p-4 border-b border-gray-100">
                <Search
                    value={searchQuery}
                    onChange={onSearchChange}
                    placeholder="Search by name, ID, or subject..."
                    className="!max-w-none text-xs"
                />
            </div>

            {/* Tab Switcher */}
            <div className="flex border-b border-gray-100 justify-around text-xs font-semibold text-gray-500">
                <button
                    onClick={() => onTabChange('active')}
                    className={`py-3 px-2 flex-1 text-center border-b-2 transition ${activeTab === 'active'
                            ? 'border-[#56000c] text-[#56000c]'
                            : 'border-transparent text-gray-400 hover:text-gray-600 hover:bg-gray-50/50'
                        }`}
                >
                    Active
                </button>
                <button
                    onClick={() => onTabChange('waiting')}
                    className={`py-3 px-2 flex-1 text-center border-b-2 transition ${activeTab === 'waiting'
                            ? 'border-[#56000c] text-[#56000c]'
                            : 'border-transparent text-gray-400 hover:text-gray-600 hover:bg-gray-50/50'
                        }`}
                >
                    Waiting
                </button>
                <button
                    onClick={() => onTabChange('resolved')}
                    className={`py-3 px-2 flex-1 text-center border-b-2 transition ${activeTab === 'resolved'
                            ? 'border-[#56000c] text-[#56000c]'
                            : 'border-transparent text-gray-400 hover:text-gray-600 hover:bg-gray-50/50'
                        }`}
                >
                    Solved
                </button>
            </div>

            {/* Chats scroll area */}
            <div className="flex-1 overflow-y-auto divide-y divide-gray-100 custom-scrollbar">
                {filteredChats.length === 0 ? (
                    <div className="p-8 text-center text-gray-400 text-sm">
                        No conversations found
                    </div>
                ) : (
                    filteredChats.map((chat) => {
                        const isSelected = chat.key === selectedChatKey;
                        const avatarBg = getAvatarBg(chat.userName);
                        const isElena = chat.userName === 'Elena Gilbert';
                        const isChatActiveOrWaiting = chat.status === 'In Progress' || chat.status === 'Open';

                        return (
                            <div
                                key={chat.key}
                                onClick={() => onSelectChat(chat.key)}
                                className={`p-4 cursor-pointer transition flex gap-3 items-start border-b border-gray-100 ${isSelected ? 'bg-[#FFF0F2] border-l-4 border-l-[#56000c] pl-3' : 'hover:bg-gray-50 bg-white'
                                    }`}
                            >
                                {/* User Initials Avatar */}
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 text-white ${avatarBg}`}>
                                    {chat.userName.split(' ').map(n => n[0]).join('').toUpperCase()}
                                </div>

                                {/* Content info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h4 className="font-semibold text-sm truncate pr-2 text-[#242424]">
                                            {chat.userName}
                                        </h4>
                                        <span className="text-[10px] text-gray-400 whitespace-nowrap">
                                            {chat.lastMessageTime}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-500 truncate mb-1.5">
                                        {chat.subject}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        {isElena && isChatActiveOrWaiting ? (
                                            <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1 mt-1 select-none">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping inline-block" />
                                                Typing...
                                            </span>
                                        ) : (
                                            <span className="text-[10px] text-gray-400 font-medium select-none">
                                                ID: {chat.chatId}
                                            </span>
                                        )}
                                        {chat.unreadCount && chat.unreadCount > 0 && !isSelected && (
                                            <span className="bg-[#56000c] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
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
