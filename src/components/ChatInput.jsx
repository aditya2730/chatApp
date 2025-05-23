import React, { useState, useEffect, useRef } from 'react';
import ChatContainer from './ChatContainer';
import { simulateAssistantResponse } from '../utls/chatUtils';
import { v4 as uuidv4 } from 'uuid';
import { handleInput } from '../utls/dispatcher';


const CHAT_HISTORY_STORAGE_KEY = 'chatHistory';

const ChatInput = () => {
    const [userTextContent, setUserTextContent] = useState('');
    const [chatHistory, setChatHistory] = useState(() => {
        const saved = localStorage.getItem(CHAT_HISTORY_STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    });
    const timeoutRef = useRef(null);

    useEffect(() => {
        localStorage.setItem(CHAT_HISTORY_STORAGE_KEY, JSON.stringify(chatHistory));
    }, [chatHistory]);

    useEffect(() => {
        simulateAssistantResponse({
            responseContent: 'Hi there, How can I help you today?',
            setChatHistory,
            timeoutRef,
        });
        const currentTimeout = timeoutRef.current;

        return () => {
            if (currentTimeout) {
                clearTimeout(currentTimeout);
            }
        };
    }, []);


    const handleEnterMessage = async () => {
        if (!userTextContent.trim()) return;

        const userMessage = {
            id: uuidv4(),
            sender: 'user',
            content: userTextContent.trim(),
            type: 'text',
            timestamp: new Date().toISOString(),
        };

        setChatHistory((prev) => [...prev, userMessage]);
        const input = userTextContent.trim();
        setUserTextContent('');
        handleInput(input, setChatHistory, timeoutRef);
    }


    return (
        <div className="flex flex-col w-[800px] mx-auto my-8 bg-gray-100 rounded-lg shadow-md overflow-hidden">
            <ChatContainer chatHistory={chatHistory} />
            <div className="px-4 py-3 bg-white border-t">
                <input
                    type="text"
                    placeholder="Type your message..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={userTextContent}
                    onChange={(e) => setUserTextContent(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleEnterMessage();
                        }
                    }}
                />
            </div>
        </div>
    );
};

export default ChatInput;
