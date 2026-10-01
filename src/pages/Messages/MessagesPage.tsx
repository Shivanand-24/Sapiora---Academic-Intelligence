import React, { useState } from 'react';
import { useLMS } from '../../context/LMSContext';
import { Send, Search, CheckCheck, Paperclip, Phone, Video, MoreVertical } from 'lucide-react';

interface ChatContact {
  id: string;
  name: string;
  role: string;
  avatar: string;
  online: boolean;
  lastMessage: string;
  time: string;
  unread: number;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'contact';
  text: string;
  time: string;
}

export const MessagesPage: React.FC = () => {
  const { user, showToast } = useLMS();

  const contacts: ChatContact[] = [
    {
      id: 'c1',
      name: 'Arun Kumar',
      role: 'Full Stack & MWP Instructor',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      online: true,
      lastMessage: 'Great work on the React component tree! Keep it up.',
      time: '10:45 AM',
      unread: 1,
    },
    {
      id: 'c2',
      name: 'Priya Sharma',
      role: 'Machine Learning Faculty',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      online: false,
      lastMessage: 'Remember to tune your hyperparameters before the quiz.',
      time: 'Yesterday',
      unread: 0,
    },
    {
      id: 'c3',
      name: 'Rahul Menon',
      role: 'Computer Networks Faculty',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      online: true,
      lastMessage: 'Wireshark traces should be captured on port 80 and 443.',
      time: 'Sep 29',
      unread: 0,
    },
  ];

  const [activeContact, setActiveContact] = useState<ChatContact>(contacts[0]);
  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>({
    c1: [
      { id: 'm1', sender: 'contact', text: 'Hello Shivanand! How is the React Dashboard MWP project coming along?', time: '10:30 AM' },
      { id: 'm2', sender: 'user', text: 'Good morning Prof. Arun! I completed the responsive UI with Tailwind and integrated the state filters.', time: '10:42 AM' },
      { id: 'm3', sender: 'contact', text: 'Great work on the React component tree! Keep it up.', time: '10:45 AM' },
    ],
    c2: [
      { id: 'm4', sender: 'contact', text: 'Remember to tune your hyperparameters before the quiz.', time: 'Yesterday' },
    ],
    c3: [
      { id: 'm5', sender: 'contact', text: 'Wireshark traces should be captured on port 80 and 443.', time: 'Sep 29' },
    ],
  });

  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMsg: ChatMessage = {
      id: 'm-' + Date.now(),
      sender: 'user',
      text: inputMessage.trim(),
      time: 'Just now',
    };

    setMessages((prev) => ({
      ...prev,
      [activeContact.id]: [...(prev[activeContact.id] || []), newMsg],
    }));

    setInputMessage('');

    // Simulated reply after 1s
    setTimeout(() => {
      const replyMsg: ChatMessage = {
        id: 'r-' + Date.now(),
        sender: 'contact',
        text: 'Received! Looking forward to reviewing the demo demonstration.',
        time: 'Just now',
      };
      setMessages((prev) => ({
        ...prev,
        [activeContact.id]: [...(prev[activeContact.id] || []), replyMsg],
      }));
    }, 1200);
  };

  const currentChat = messages[activeContact.id] || [];

  return (
    <div className="h-[calc(100vh-140px)] min-h-[550px] bg-white rounded-3xl border border-slate-200/80 shadow-xs flex overflow-hidden animate-in fade-in duration-300">
      {/* Contact list sidebar */}
      <div className="w-80 border-r border-slate-100 flex flex-col bg-slate-50/50 shrink-0">
        <div className="p-4 border-b border-slate-100">
          <h2 className="text-base font-bold text-slate-900">Faculty & Peer Chats</h2>
          <div className="mt-3 relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => setActiveContact(contact)}
              className={`p-3.5 flex items-start gap-3 cursor-pointer transition-colors ${
                activeContact.id === contact.id ? 'bg-indigo-50/70' : 'hover:bg-slate-100/60'
              }`}
            >
              <div className="relative">
                <img
                  src={contact.avatar}
                  alt={contact.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200"
                />
                {contact.online && (
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900 truncate">{contact.name}</h4>
                  <span className="text-[10px] text-slate-400">{contact.time}</span>
                </div>
                <p className="text-[11px] text-slate-500 truncate mt-0.5">{contact.lastMessage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-white">
        {/* Chat Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={activeContact.avatar}
                alt={activeContact.name}
                className="w-9 h-9 rounded-full object-cover border border-slate-200"
              />
              {activeContact.online && (
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white" />
              )}
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900">{activeContact.name}</h3>
              <p className="text-[10px] text-indigo-600 font-medium">{activeContact.role}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <button
              onClick={() => showToast('Voice Call', 'Connecting faculty audio channel...', 'info')}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              <Phone className="w-4 h-4" />
            </button>
            <button
              onClick={() => showToast('Video Call', 'Initiating video conferencing room...', 'info')}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              <Video className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Message Thread */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-50/30">
          {currentChat.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[75%] p-3 rounded-2xl text-xs sm:text-sm ${
                  msg.sender === 'user'
                    ? 'bg-indigo-600 text-white rounded-br-xs shadow-xs'
                    : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs shadow-xs'
                }`}
              >
                {msg.text}
              </div>
              <div className="flex items-center gap-1 mt-1 text-[10px] text-slate-400">
                <span>{msg.time}</span>
                {msg.sender === 'user' && <CheckCheck className="w-3 h-3 text-indigo-500" />}
              </div>
            </div>
          ))}
        </div>

        {/* Input Footer */}
        <form onSubmit={handleSendMessage} className="p-3.5 border-t border-slate-100 flex items-center gap-2">
          <input
            type="text"
            placeholder="Type your message to instructor..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-1 p-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
          <button
            type="submit"
            className="p-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
