import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import { FaBell } from "react-icons/fa";

import ChatBubble from "../chatbot/ChatBubble";
import ChatWindow from "../chatbot/ChatWindow";
import { sendMessage } from "../../services/chatbotService";

function DashboardLayout({ children }) {
    // Mobile Sidebar state
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Chatbot state
    const [chatOpen, setChatOpen] = useState(false);

    const [messages, setMessages] = useState([
        {
            sender: "assistant",
            text: "Hello! I'm Krishi AI. How can I help you today?"
        }
    ]);

    const [loading, setLoading] = useState(false);

    // Notification state
    const [toast, setToast] = useState(null);

    useEffect(() => {
        const handleNotif = () => {
            const saved = localStorage.getItem("farmverse_notifications");

            if (saved) {
                try {
                    const parsed = JSON.parse(saved);

                    if (parsed.length > 0 && !parsed[0].read) {
                        setToast(parsed[0]);

                        setTimeout(() => {
                            setToast(null);
                        }, 4000);
                    }
                } catch (e) {
                    console.error("Failed to parse notifications", e);
                }
            }
        };

        window.addEventListener("farmverse_notif_update", handleNotif);

        return () => {
            window.removeEventListener(
                "farmverse_notif_update",
                handleNotif
            );
        };
    }, []);

    // Chatbot
    const handleSend = async (message) => {
        setMessages((prev) => [
            ...prev,
            {
                sender: "user",
                text: message
            }
        ]);

        setLoading(true);

        try {
            const response = await sendMessage(message);

            setMessages((prev) => [
                ...prev,
                {
                    sender: "assistant",
                    text: response.response
                }
            ]);
        } catch (error) {
            console.error(error);

            setMessages((prev) => [
                ...prev,
                {
                    sender: "assistant",
                    text:
                        error.response?.data?.message ||
                        error.message
                }
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen overflow-hidden flex bg-slate-50 transition-colors duration-300">

            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <Sidebar isOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

            {/* Main Section */}
            <div className="flex-1 flex flex-col min-w-0">

                {/* Navbar */}
                <Navbar onMenuClick={() => setIsSidebarOpen(true)} />

                {/* Page Content */}
                <main className="flex-1 p-4 pb-24 md:p-8 md:pb-8 overflow-auto relative">
                    <div className="absolute inset-0 bg-[url('/leafy_bg.jpg')] bg-cover bg-center opacity-[0.03] pointer-events-none z-0"></div>
                    <div className="relative z-10">
                        {children}
                    </div>

                    {/* Toast Notification */}
                    {toast && (
                        <div className="fixed bottom-10 right-10 bg-white border-l-4 border-emerald-500 shadow-2xl rounded-r-xl rounded-l-sm p-4 pr-12 animate-in slide-in-from-right-10 fade-in duration-300 z-50 flex items-start gap-4 max-w-sm">

                            <div className="bg-emerald-100 p-2 rounded-full text-emerald-600 mt-0.5">
                                <FaBell />
                            </div>

                            <div>
                                <h4 className="font-bold text-gray-800 mb-1">
                                    New Notification
                                </h4>

                                <p className="text-gray-600 text-sm">
                                    {toast.message}
                                </p>
                            </div>

                            <button
                                onClick={() => setToast(null)}
                                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                            >
                                ×
                            </button>
                        </div>
                    )}
                </main>

            </div>

            {/* Chatbot */}
            <ChatBubble onClick={() => setChatOpen(true)} />

            <ChatWindow
                isOpen={chatOpen}
                onClose={() => setChatOpen(false)}
                messages={messages}
                onSend={handleSend}
                loading={loading}
            />

        </div>
    );
}

export default DashboardLayout;