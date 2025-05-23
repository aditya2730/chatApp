import React, { useEffect, useRef } from 'react'

const ChatContainer = ({ chatHistory }) => {

    const scrollRef = useRef(null);

    useEffect(() => {
        const container = scrollRef.current;
        if (container) {
            container.scrollTop = container.scrollHeight;
        }
    }, [chatHistory]);

    return (
        <div>
            <div className="px-4 py-3 bg-white shadow-sm border-b">
                <h2 className="text-lg font-semibold text-gray-800">AI Chat</h2>
            </div>
            <div
                ref={scrollRef}
                className="flex-1 h-[400px] overflow-y-auto p-4 bg-gray-50 space-y-2"
            >
                {chatHistory.map(msg => (
                    <div key={msg.id} className={`text-sm ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                        <div className={`inline-block max-w-[70%] px-4 py-2 rounded-lg ${msg.sender === 'user'
                            ? 'bg-green-100 text-gray-900'
                            : msg.loading
                                ? 'bg-gray-200 text-gray-500 italic animate-pulse'
                                : 'bg-blue-100 text-gray-800'
                            }`}>
                            {msg.loading ? 'Assistant is typing...' : msg.content}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                            {new Date(msg.timestamp).toLocaleTimeString()}
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
}

export default ChatContainer
