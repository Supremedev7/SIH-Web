"use client";

import { useState, useTransition, useEffect } from "react";
import { MessageSquare, Search, Phone, Video, MoreVertical, Send, Paperclip, Smile } from "lucide-react";
import { sendMessage } from "@/lib/actions/messageActions";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import type { MessagingPageProps, MessageData } from "@/types/student-portal";

export function MessagingClient({ currentUserId, initialMessages = [] }: MessagingPageProps) {
  const [messages, setMessages] = useState<MessageData[]>(initialMessages);
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  // Supabase Realtime Subscription
  useEffect(() => {
    const supabase = createClient();
    const channel = supabase
      .channel('messages_changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `receiver_id=eq.${currentUserId}`
        },
        async (payload) => {
          // Fetch the full message data including 'other_user' which might need a join,
          // but for now, we just reload the page or optimistically update.
          // In a real app, you'd fetch the specific message or use a more robust state pattern.
          // For prototype simplicity, we can fetch the user details of the sender or just add it.
          const { data: senderData } = await supabase
            .from('user_profiles')
            .select('full_name, role')
            .eq('auth_id', payload.new.sender_id)
            .single();

          const newMessage: MessageData = {
            id: payload.new.id,
            sender_id: payload.new.sender_id,
            receiver_id: payload.new.receiver_id,
            content: payload.new.content,
            is_read: payload.new.is_read,
            created_at: payload.new.created_at,
            other_user: senderData ? {
              full_name: senderData.full_name,
              role: senderData.role
            } : { full_name: "Unknown", role: "user" }
          };

          setMessages(prev => [...prev, newMessage]);
          toast.info(`New message from ${newMessage.other_user?.full_name}`);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentUserId]);
  
  // Group messages by contact
  const contactsMap = new Map();
  messages.forEach((msg: MessageData) => {
    const contactId = msg.sender_id === currentUserId ? msg.receiver_id : msg.sender_id;
    if (!contactsMap.has(contactId)) {
      const name = msg.other_user?.full_name || "Unknown";
      const initials = name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase();
      contactsMap.set(contactId, {
        id: contactId,
        name: name,
        role: msg.other_user?.role || "user",
        avatar: initials,
        status: "offline",
        lastMessage: msg.content,
        time: new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        unread: msg.receiver_id === currentUserId && !msg.is_read ? 1 : 0,
        messages: []
      });
    } else {
      if (msg.receiver_id === currentUserId && !msg.is_read) {
        contactsMap.get(contactId).unread += 1;
      }
    }
    contactsMap.get(contactId).messages.push(msg);
  });

  const CONTACTS = Array.from(contactsMap.values());
  const [selectedContactId, setSelectedContactId] = useState(CONTACTS.length > 0 ? CONTACTS[0].id : null);

  const selectedContact = CONTACTS.find(c => c.id === selectedContactId);
  
  // Sort messages oldest to newest for the chat view
  const currentChatMessages = selectedContact ? [...selectedContact.messages].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()) : [];


  return (
    <div className="h-[calc(100vh-80px)] flex flex-col p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      
      {/* Header */}
      <div className="mb-6 shrink-0">
        <h1 className="text-3xl font-black tracking-tight text-foreground flex items-center gap-3">
          <MessageSquare className="w-8 h-8 text-primary" />
          Messages
        </h1>
      </div>

      {/* Messaging Layout */}
      <div className="flex-1 bg-card border border-border/60 rounded-2xl shadow-sm overflow-hidden flex flex-col md:flex-row min-h-0">
        
        {/* Left Sidebar - Contacts */}
        <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-border/40 flex flex-col bg-muted/10 shrink-0 h-64 md:h-auto overflow-hidden">
          
          <div className="p-4 border-b border-border/40">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search messages..." 
                className="w-full h-10 pl-9 pr-3 text-sm bg-card border border-border/60 rounded-lg focus:outline-none focus:border-primary transition-colors" 
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {CONTACTS.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground text-sm">
                No active conversations.
              </div>
            ) : (
              CONTACTS.map((contact, index) => (
                <div 
                  key={contact.id} 
                  onClick={() => setSelectedContactId(contact.id)}
                  className={`p-4 flex items-start gap-3 cursor-pointer transition-colors border-l-2 ${selectedContactId === contact.id ? 'bg-primary/5 border-primary' : 'hover:bg-muted/30 border-transparent'}`}
                >
                  <div className="relative">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${index % 3 === 0 ? 'bg-blue-500/20 text-blue-500' : index % 3 === 1 ? 'bg-emerald-500/20 text-emerald-500' : 'bg-purple-500/20 text-purple-500'}`}>
                      {contact.avatar}
                    </div>
                    {contact.status === 'online' && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-card rounded-full"></span>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-0.5">
                      <h4 className={`text-sm font-bold truncate ${selectedContactId === contact.id ? 'text-foreground' : 'text-foreground/80'}`}>{contact.name}</h4>
                      <span className={`text-[10px] font-medium whitespace-nowrap ${contact.unread > 0 ? 'text-primary' : 'text-muted-foreground'}`}>{contact.time}</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground truncate mb-1 capitalize">{contact.role}</p>
                    <div className="flex justify-between items-center gap-2">
                      <p className={`text-xs truncate ${contact.unread > 0 ? 'text-foreground font-semibold' : 'text-muted-foreground'}`}>
                        {contact.lastMessage}
                      </p>
                      {contact.unread > 0 && (
                        <span className="bg-primary text-primary-foreground text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shrink-0">
                          {contact.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col min-h-0 bg-background/50">
          
          {selectedContact ? (
            <>
              {/* Chat Header */}
              <div className="h-16 border-b border-border/40 px-6 flex items-center justify-between bg-card shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center font-bold text-sm">
                    {selectedContact.avatar}
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-sm">{selectedContact.name}</h3>
                    <p className="text-[11px] text-muted-foreground font-medium capitalize">{selectedContact.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-muted-foreground hover:text-foreground rounded-md hover:bg-muted transition-colors hidden sm:block">
                    <Phone className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-muted-foreground hover:text-foreground rounded-md hover:bg-muted transition-colors hidden sm:block">
                    <Video className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-muted-foreground hover:text-foreground rounded-md hover:bg-muted transition-colors">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 flex flex-col justify-end">
                {currentChatMessages.length === 0 ? (
                  <div className="flex-1 flex items-center justify-center text-sm text-muted-foreground">
                    This is the beginning of your conversation history with {selectedContact.name}.
                  </div>
                ) : (
                  currentChatMessages.map((msg: any) => {
                    const isMine = msg.sender_id === currentUserId;
                    return (
                      <div key={msg.id} className={`flex items-end gap-2 max-w-[85%] ${isMine ? 'ml-auto justify-end' : ''}`}>
                        {!isMine && (
                          <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center font-bold text-xs shrink-0">
                            {selectedContact.avatar}
                          </div>
                        )}
                        <div className={`flex flex-col gap-1 ${isMine ? 'items-end' : ''}`}>
                          <div className={`${isMine ? 'bg-primary text-primary-foreground rounded-br-sm' : 'bg-card border border-border/60 text-foreground rounded-bl-sm'} text-sm p-3 rounded-2xl shadow-sm`}>
                            <p>{msg.content}</p>
                          </div>
                          <span className={`text-[10px] text-muted-foreground ${isMine ? 'mr-1' : 'ml-1'}`}>
                            {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Input Area */}
              <div className="p-4 bg-card border-t border-border/40 shrink-0">
                <div className="flex items-end gap-2 bg-muted/30 border border-border/60 rounded-xl p-2 focus-within:border-primary transition-colors">
                  <button className="p-2 text-muted-foreground hover:text-foreground shrink-0 transition-colors">
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <textarea 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        if (selectedContactId && message.trim() && !isPending) {
                          const currentMessage = message;
                          setMessage("");
                          startTransition(async () => {
                            try {
                              // Optimistically add the message to the UI
                              const tempMessage: MessageData = {
                                id: Date.now().toString(),
                                sender_id: currentUserId,
                                receiver_id: selectedContactId,
                                content: currentMessage,
                                is_read: false,
                                created_at: new Date().toISOString(),
                                other_user: {
                                  full_name: selectedContact.name,
                                  role: selectedContact.role
                                }
                              };
                              setMessages(prev => [...prev, tempMessage]);
                              await sendMessage(selectedContactId, currentMessage);
                            } catch (err: unknown) {
                              const errorMsg = err instanceof Error ? err.message : "Failed to send";
                              toast.error(errorMsg);
                              setMessage(currentMessage);
                            }
                          });
                        }
                      }
                    }}
                    placeholder="Type your message..." 
                    className="flex-1 bg-transparent border-none focus:ring-0 text-sm p-2 resize-none max-h-32 min-h-[40px]"
                    rows={1}
                  />
                  <button className="p-2 text-muted-foreground hover:text-foreground shrink-0 transition-colors hidden sm:block">
                    <Smile className="w-5 h-5" />
                  </button>
                  <button 
                    disabled={!message.trim() || isPending}
                    onClick={() => {
                      if (!selectedContactId || !message.trim()) return;
                      const currentMessage = message;
                      setMessage("");
                      startTransition(async () => {
                        try {
                          const tempMessage: MessageData = {
                            id: Date.now().toString(),
                            sender_id: currentUserId,
                            receiver_id: selectedContactId,
                            content: currentMessage,
                            is_read: false,
                            created_at: new Date().toISOString(),
                            other_user: {
                              full_name: selectedContact.name,
                              role: selectedContact.role
                            }
                          };
                          setMessages(prev => [...prev, tempMessage]);
                          await sendMessage(selectedContactId, currentMessage);
                        } catch (e: unknown) {
                          const errorMsg = e instanceof Error ? e.message : "Failed to send";
                          toast.error(errorMsg);
                          setMessage(currentMessage);
                        }
                      });
                    }}
                    className={`p-2 rounded-lg shrink-0 transition-all ${message.trim() && !isPending ? 'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90' : 'bg-muted text-muted-foreground'}`}
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground flex-col gap-4">
              <MessageSquare className="w-12 h-12 opacity-20" />
              <p>Select a conversation to start messaging</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
