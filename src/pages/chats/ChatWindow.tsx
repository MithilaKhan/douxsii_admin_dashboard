import { useState } from 'react';
import { FiSend, FiCheckCircle, FiArchive, FiInfo, FiPaperclip } from 'react-icons/fi';
import {  ChatWindowProps } from './chats.types';
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

    return (
        <div 
            className="flex-1 flex flex-col rounded-2xl overflow-hidden min-h-0"
            style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)'
            }}
        >
            {/* Chat Header */}
            <div className="p-4 border-b border-white/5 bg-white/5 flex flex-wrap gap-3 items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${getAvatarBg(selectedChat.userName)}`}>
                        {selectedChat.userName.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </div>
                    <div>
                        <h3 className="font-semibold text-sm text-white flex items-center gap-2">
                            {selectedChat.userName}
                            <span className="text-xs text-white/40 font-normal">({selectedChat.chatId})</span>
                        </h3>
                        <p className="text-xs text-white/50">{selectedChat.userEmail}</p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    {selectedChat.status !== 'Resolved' && selectedChat.status !== 'Closed' ? (
                        <>
                            {selectedChat.status === 'Open' && (
                                <button
                                    onClick={() => onStatusChange('In Progress')}
                                    className="px-3 py-1.5 text-xs bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 border border-yellow-500/20 rounded-lg transition flex items-center gap-1.5"
                                >
                                    <FiInfo size={14} /> Accept Ticket
                                </button>
                            )}
                            <button
                                onClick={() => onStatusChange('Resolved')}
                                className="px-3 py-1.5 text-xs bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/20 rounded-lg transition flex items-center gap-1.5"
                            >
                                <FiCheckCircle size={14} /> Mark Resolved
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => onStatusChange('In Progress')}
                            className="px-3 py-1.5 text-xs bg-white/5 hover:bg-white/10 text-white/80 border border-white/10 rounded-lg transition flex items-center gap-1.5"
                        >
                            <FiArchive size={14} /> Reopen Ticket
                        </button>
                    )}
                </div>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar bg-black/10">
                <div className="text-center py-2">
                    <span className="bg-white/5 text-[10px] text-white/40 px-3 py-1 rounded-full border border-white/5">
                        Ticket Subject: {selectedChat.subject}
                    </span>
                </div>

                {selectedChat.messages.map((msg) => {
                    const isAgent = msg.sender === 'agent';
                    return (
                        <div
                            key={msg.id}
                            className={`flex ${isAgent ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`max-w-[70%] rounded-2xl px-4 py-2.5 shadow-sm ${
                                isAgent 
                                    ? 'bg-[#560e18] text-white rounded-tr-none' 
                                    : 'bg-white/10 text-white rounded-tl-none border border-white/5'
                            }`}>
                                <p className="text-sm leading-relaxed">{msg.text}</p>
                                <span className="block text-[9px] text-white/40 text-right mt-1">
                                    {msg.time}
                                </span>
                            </div>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Footer */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-white/5 bg-white/5 flex gap-3 items-center">
                <button
                    type="button"
                    className="p-2 text-white/40 hover:text-white rounded-lg transition hover:bg-white/5"
                    onClick={() => showToast('Attachment support is a placeholder')}
                >
                    <FiPaperclip size={18} />
                </button>
                <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Type your response..."
                    className="flex-1 bg-white/5 border border-white/10 text-white rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-white/20 transition"
                />
                <button
                    type="submit"
                    disabled={!inputText.trim()}
                    className="p-2.5 bg-[#560e18] hover:bg-[#6b1420] text-white rounded-lg transition disabled:opacity-40 disabled:hover:bg-[#560e18]"
                >
                    <FiSend size={16} />
                </button>
            </form>
        </div>
    );
};

export default ChatWindow;
