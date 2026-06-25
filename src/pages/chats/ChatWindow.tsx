import { useState } from 'react';
import { FiSend, FiPaperclip } from 'react-icons/fi';
import { ChatWindowProps } from './chats.types';
import EmptyChatState from './EmptyChatState';

export const ChatWindow = ({
    selectedChat,
    onStatusChange,
    onSendMessage,
    showToast,
    messagesEndRef,
    getAvatarBg,
}: ChatWindowProps) => {
    const [inputText, setInputText] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputText.trim()) return;
        onSendMessage(inputText.trim());
        setInputText('');
    };

    if (!selectedChat) {
        return <EmptyChatState />;
    }

    const isElena = selectedChat.userName === 'Elena Gilbert';
    const isChatActiveOrWaiting = selectedChat.status === 'In Progress' || selectedChat.status === 'Open';

    return (
        <div className="flex-1 flex flex-col bg-white rounded-2xl border border-[#FFD2D6]/40 shadow-[0_4px_20px_rgba(86,0,12,0.03)] overflow-hidden min-h-0">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-100 bg-[#FFEAEA] flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {isElena ? (
                        <div className="relative">
                            <img 
                                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=128" 
                                alt="Elena Gilbert" 
                                className="w-10 h-10 rounded-full object-cover border border-[#56000c]/20"
                            />
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#FFEAEA] rounded-full" />
                        </div>
                    ) : (
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white relative ${getAvatarBg(selectedChat.userName)}`}>
                            {selectedChat.userName.split(' ').map(n => n[0]).join('').toUpperCase()}
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#FFEAEA] rounded-full" />
                        </div>
                    )}
                    <div>
                        <h3 className="font-bold text-sm text-[#242424] m-0">
                            {selectedChat.userName}
                        </h3>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    {selectedChat.status !== 'Resolved' && selectedChat.status !== 'Closed' ? (
                        <button
                            onClick={() => onStatusChange('Resolved')}
                            className="px-4 py-1.5 text-xs bg-[#56000c] hover:bg-[#7d1522] text-white font-bold rounded-lg transition"
                        >
                            Mark as Solve
                        </button>
                    ) : (
                        <span className="px-4 py-1.5 text-xs bg-[#FFF0F2] text-[#56000c] font-bold rounded-lg border border-[#FFD2D6]/40 select-none">
                            Solved
                        </span>
                    )}
                </div>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar bg-white flex flex-col">
                <div className="flex justify-center my-2">
                    <span className="bg-gray-50 border border-gray-200 text-[10px] text-gray-500 font-semibold px-4 py-1 rounded-full uppercase tracking-wider">
                        Today, 10:42 AM
                    </span>
                </div>

                {selectedChat.messages.map((msg) => {
                    const isAgent = msg.sender === 'agent';
                    return (
                        <div
                            key={msg.id}
                            className={`flex gap-3 items-end ${isAgent ? 'justify-end' : 'justify-start'}`}
                        >
                            {!isAgent && (
                                <img 
                                    src={isElena ? 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=128' : '/user.svg'} 
                                    alt="User" 
                                    className="w-8 h-8 rounded-full object-cover border border-gray-100 self-end mb-4 shrink-0"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = "/user.svg";
                                    }}
                                />
                            )}
                            <div className="flex flex-col max-w-[70%]">
                                <div className={`rounded-2xl px-4 py-2.5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] ${
                                    isAgent 
                                        ? 'bg-[#56000c] text-white rounded-tr-none' 
                                        : 'bg-[#e9ecef] text-[#242424] rounded-tl-none'
                                }`}>
                                    <p className="text-sm leading-relaxed m-0">{msg.text}</p>
                                </div>
                                <span className={`text-[9px] text-gray-400 mt-1 ${isAgent ? 'text-right' : 'text-left'}`}>
                                    {msg.time}
                                </span>
                            </div>
                        </div>
                    );
                })}

                {/* Animated Typing Indicator for Elena Gilbert */}
                {isElena && isChatActiveOrWaiting && (
                    <div className="flex items-center gap-3">
                        <img 
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=128" 
                            alt="User" 
                            className="w-8 h-8 rounded-full object-cover border border-gray-100 self-end shrink-0"
                        />
                        <div className="flex items-center gap-2">
                            <div className="bg-[#e9ecef] rounded-full px-4 py-2 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                            <span className="text-xs text-gray-400 font-semibold select-none">Elena is typing...</span>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input Footer Composer */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-gray-100 bg-white">
                <div className="border border-gray-200 rounded-xl p-3 flex flex-col gap-2 bg-gray-50">
                    <textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Type your message here..."
                        rows={3}
                        className="w-full bg-transparent text-sm text-[#242424] placeholder:text-gray-400 focus:outline-none resize-none"
                    />
                    <div className="flex justify-between items-center mt-2 border-t border-gray-100/50 pt-2">
                        {/* Attachment button */}
                        <button
                            type="button"
                            className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg transition hover:bg-gray-100"
                            onClick={() => showToast('Attachment support is a placeholder')}
                        >
                            <FiPaperclip size={18} />
                        </button>
                        {/* Send button */}
                        <button
                            type="submit"
                            disabled={!inputText.trim()}
                            className="flex items-center gap-1.5 px-4 py-2 bg-[#56000c] hover:bg-[#7d1522] text-white rounded-lg text-xs font-bold transition disabled:opacity-40 cursor-pointer"
                        >
                            <span>Send</span>
                            <FiSend size={12} />
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ChatWindow;
