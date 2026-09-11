"use client";

import {
  FilePlus2,
  Search,
  CheckCheck,
  Calendar,
  Clock,
  CheckCircle,
  FileText,
  Download,
  Bold,
  Italic,
  List,
  Code,
  Paperclip,
  CalendarPlus,
  ShieldQuestion,
  Send,
  Building2,
  IdCard,
  BadgeCheck,
  ShieldCheck,
  ClipboardCheck,
  Handshake,
  ExternalLink,
  Sparkles,
  PanelRightOpen,
  Zap,
  Video,
  MessageSquare,
} from "lucide-react";
import { useState, useTransition, useEffect } from "react";
import { sendMessage } from "@/lib/actions/messageActions";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import type { MessageData } from "@/types/student-portal";

interface MessagingPageProps {
  currentUserId: string;
  initialMessages?: MessageData[];
}

export function MessagingClient({ currentUserId, initialMessages = [] }: MessagingPageProps) {
  const [messages, setMessages] = useState<MessageData[]>(initialMessages);
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

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
          const { data: senderData } = await supabase
            .from('user_profiles')
            .select('full_name, role')
            .eq('id', payload.new.sender_id)
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
  
  const currentChatMessages = selectedContact ? [...selectedContact.messages].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()) : [];

  return (
    <div className="flex flex-col gap-4 w-full h-[calc(100vh-6rem)] overflow-hidden pb-4">
      
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-card p-6 rounded-2xl shadow-sm border border-border/40 shrink-0">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-bold text-[10px] uppercase tracking-wider text-primary">Enterprise Communications</span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
            <span className="font-semibold text-[10px] text-muted-foreground uppercase tracking-wider">Live Synchronized Stream</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Recruiter Communications Suite</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Direct candidate engagement, interview scheduling, and university placement cell correspondence</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center bg-muted/50 border border-border/40 px-3 py-1.5 rounded-xl shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mr-2"></span>
            <span className="text-xs font-mono font-bold text-foreground">Avg. Response: 24m</span>
          </div>
          <button className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-xl text-sm font-bold shadow-sm transition-all">
            <FilePlus2 className="w-4 h-4" />
            <span>Compose New</span>
          </button>
        </div>
      </section>

      {/* Main Messaging Interface */}
      <section className="flex flex-1 rounded-2xl overflow-hidden bg-card border border-border/40 shadow-sm min-h-0">
        
        {/* Left Pane: Conversation Channels & Threads */}
        <aside className="w-[320px] flex-shrink-0 flex flex-col bg-muted/10 border-r border-border/40">
          
          {/* Search & Filter */}
          <div className="p-4 bg-card shadow-sm flex flex-col gap-3 shrink-0 z-10 border-b border-border/40">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <input className="w-full pl-9 pr-3 py-2 text-sm font-semibold bg-muted/50 border border-border/40 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-all" placeholder="Search conversations..." type="text" />
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
              <button className="px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap bg-primary text-primary-foreground shadow-sm transition-all">
                All (14)
              </button>
              <button className="px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap bg-background border border-border/40 text-muted-foreground hover:bg-muted transition-all">
                Candidates (9)
              </button>
              <button className="px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap bg-background border border-border/40 text-muted-foreground hover:bg-muted transition-all flex items-center gap-1.5">
                <span>Unread</span>
                <span className="px-1.5 py-0.5 rounded-md bg-destructive text-destructive-foreground text-[10px] font-bold">4</span>
              </button>
            </div>
          </div>

          {/* Thread List */}
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            
            {CONTACTS.length === 0 ? (
              <div className="p-4 text-center text-sm text-muted-foreground">No conversations yet</div>
            ) : (
              CONTACTS.map((contact) => (
                <div 
                  key={contact.id}
                  onClick={() => setSelectedContactId(contact.id)}
                  className={`cursor-pointer p-3 rounded-xl border transition-all flex items-start gap-3 relative overflow-hidden ${selectedContactId === contact.id ? 'bg-primary/5 border-primary/20 shadow-sm' : 'hover:bg-muted/50 border-transparent hover:border-border/40'}`}
                >
                  {selectedContactId === contact.id && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
                  )}
                  <div className="relative flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center font-bold text-sm border border-border/60 shadow-sm">
                      {contact.avatar}
                    </div>
                    {contact.status === 'online' && (
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-background"></span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <span className="text-sm font-bold text-foreground truncate">{contact.name}</span>
                      <span className="text-[10px] font-mono font-semibold text-muted-foreground">{contact.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <span className="bg-muted text-muted-foreground text-[9px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded truncate">{contact.role}</span>
                    </div>
                    <p className={`text-xs truncate ${contact.unread > 0 ? 'font-semibold text-foreground' : 'text-muted-foreground'}`}>{contact.lastMessage}</p>
                  </div>
                  {contact.unread > 0 && (
                    <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                  )}
                </div>
              ))
            )}
          </div>
        </aside>

        {/* Center Pane: Active Conversation Thread */}
        <div className="flex-1 flex flex-col bg-card overflow-hidden">
          
          {/* Thread Header */}
          <div className="px-6 py-4 bg-muted/10 border-b border-border/40 shadow-sm flex items-center justify-between gap-4 z-10 shrink-0">
            <div className="flex items-center gap-4 min-w-0">
              <div className="relative">
                <img className="w-12 h-12 rounded-full object-cover border border-border/60 shadow-sm" alt="Rohan Verma" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200" />
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-background"></span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-foreground truncate">Rohan Verma</h2>
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    96% Match
                  </span>
                  <span className="flex items-center gap-1 text-[10px] font-bold text-blue-500 uppercase tracking-wider">
                    <BadgeCheck className="w-3.5 h-3.5" />
                    IIT Madras Verified
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-semibold text-muted-foreground">B.Tech CS & Data Science • Cohort 2025</span>
                  <a className="text-primary hover:underline text-xs font-bold flex items-center gap-1" href="#">
                    github.com/rohan-v-ml
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
            
            {/* Quick Action Buttons */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-background border border-border/40 hover:bg-muted text-foreground text-sm font-bold shadow-sm transition-all">
                <Video className="w-4 h-4 text-primary" />
                <span>Start Call</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-bold shadow-sm transition-all">
                <CalendarPlus className="w-4 h-4" />
                <span>Schedule Round 2</span>
              </button>
              <button className="p-2 rounded-xl bg-background border border-border/40 text-muted-foreground hover:text-foreground hover:bg-muted shadow-sm transition-all ml-2" title="Toggle candidate info">
                <PanelRightOpen className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Response Templates Strip */}
          <div className="px-6 py-3 bg-muted/30 border-b border-border/40 flex items-center gap-2 overflow-x-auto text-muted-foreground shrink-0 scrollbar-hide">
            <span className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 whitespace-nowrap mr-2">
              <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
              Quick Insert:
            </span>
            <button className="px-3 py-1.5 rounded-lg bg-background border border-border/40 hover:bg-muted text-foreground text-xs font-bold shadow-sm whitespace-nowrap transition-all">
              Send Assessment Link
            </button>
            <button className="px-3 py-1.5 rounded-lg bg-background border border-border/40 hover:bg-muted text-foreground text-xs font-bold shadow-sm whitespace-nowrap transition-all">
              Schedule Interview
            </button>
            <button className="px-3 py-1.5 rounded-lg bg-background border border-border/40 hover:bg-muted text-foreground text-xs font-bold shadow-sm whitespace-nowrap transition-all">
              Request Transcripts
            </button>
            <button className="px-3 py-1.5 rounded-lg bg-background border border-border/40 hover:bg-muted text-primary text-xs font-bold shadow-sm whitespace-nowrap transition-all border-primary/20 bg-primary/5">
              Extend Formal Offer
            </button>
          </div>

          {/* Message History Canvas */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-muted/5 flex flex-col">
            {currentChatMessages.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-sm text-muted-foreground gap-4">
                <MessageSquare className="w-12 h-12 opacity-20" />
                <p>This is the beginning of your conversation history with {selectedContact?.name}.</p>
              </div>
            ) : (
              currentChatMessages.map((msg: any) => {
                const isMine = msg.sender_id === currentUserId;
                return (
                  <div key={msg.id} className={`flex flex-col gap-1.5 max-w-2xl ${isMine ? 'items-end ml-auto' : 'items-start mr-auto'}`}>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                        {isMine ? 'You' : selectedContact?.name} • {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div className={`p-4 rounded-2xl shadow-sm text-sm leading-relaxed space-y-3 ${isMine ? 'bg-primary text-primary-foreground rounded-tr-sm' : 'bg-background border border-border/40 text-foreground rounded-tl-sm'}`}>
                      <p>{msg.content}</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Message Composer */}
          <div className="p-4 bg-card border-t border-border/40 shadow-sm flex flex-col gap-3 shrink-0">
            {/* Text Formatting Toolbar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-muted-foreground">
                <button className="p-1.5 rounded-lg hover:bg-muted hover:text-foreground transition-all"><Bold className="w-4 h-4" /></button>
                <button className="p-1.5 rounded-lg hover:bg-muted hover:text-foreground transition-all"><Italic className="w-4 h-4" /></button>
                <button className="p-1.5 rounded-lg hover:bg-muted hover:text-foreground transition-all"><List className="w-4 h-4" /></button>
                <button className="p-1.5 rounded-lg hover:bg-muted hover:text-foreground transition-all"><Code className="w-4 h-4" /></button>
                <div className="h-4 w-px bg-border/60 mx-1"></div>
                <button className="p-1.5 rounded-lg hover:bg-muted hover:text-foreground transition-all"><Paperclip className="w-4 h-4" /></button>
                <button className="p-1.5 rounded-lg hover:bg-muted hover:text-foreground transition-all"><CalendarPlus className="w-4 h-4" /></button>
                <button className="p-1.5 rounded-lg hover:bg-muted hover:text-foreground transition-all"><ShieldQuestion className="w-4 h-4" /></button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-wider bg-muted/50 px-2 py-1 rounded-md">Markdown enabled</span>
              </div>
            </div>

            {/* Input Area */}
            <div className="relative">
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
                          const tempMessage: MessageData = {
                            id: Date.now().toString(),
                            sender_id: currentUserId,
                            receiver_id: selectedContactId,
                            content: currentMessage,
                            is_read: false,
                            created_at: new Date().toISOString(),
                            other_user: {
                              full_name: selectedContact?.name || "User",
                              role: selectedContact?.role || "user"
                            }
                          };
                          setMessages(prev => [...prev, tempMessage]);
                          await sendMessage(selectedContactId, currentMessage);
                        } catch (err: any) {
                          toast.error(err.message || "Failed to send");
                          setMessage(currentMessage);
                        }
                      });
                    }
                  }
                }}
                className="w-full p-4 text-sm font-semibold bg-muted/30 border border-border/40 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary shadow-sm resize-none transition-all" 
                placeholder="Type an executive response, insert quick templates, or attach interview notes..." 
                rows={3}
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold">
                  <input defaultChecked className="rounded accent-primary w-3.5 h-3.5" type="checkbox" />
                  <span>Notify via WhatsApp</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold">
                  <input defaultChecked className="rounded accent-primary w-3.5 h-3.5" type="checkbox" />
                  <span>CC Placement Coordinator</span>
                </label>
              </div>
              <button 
                disabled={!message.trim() || isPending || !selectedContactId}
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
                          full_name: selectedContact?.name || "User",
                          role: selectedContact?.role || "user"
                        }
                      };
                      setMessages(prev => [...prev, tempMessage]);
                      await sendMessage(selectedContactId, currentMessage);
                    } catch (e: any) {
                      toast.error(e.message || "Failed to send");
                      setMessage(currentMessage);
                    }
                  });
                }}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm ${message.trim() && !isPending && selectedContactId ? 'bg-primary hover:bg-primary/90 text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
              >
                <span>Send Message</span>
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Context Drawer: Candidate Dossier */}
        <aside className="w-[300px] flex-shrink-0 bg-muted/10 border-l border-border/40 overflow-y-auto flex flex-col hidden lg:flex">
          {/* Profile Card Header */}
          <div className="p-6 bg-card border-b border-border/40 flex flex-col items-center text-center">
            <div className="relative mb-3">
              <img className="w-20 h-20 rounded-full object-cover border border-border/60 shadow-sm" alt="Rohan Verma" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200" />
              <span className="absolute bottom-0 right-1 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-background"></span>
            </div>
            <h3 className="text-xl font-bold text-foreground">Rohan Verma</h3>
            <p className="text-xs font-semibold text-muted-foreground mt-1">B.Tech, Dual Major • 4th Year</p>
            <div className="mt-2 flex items-center gap-1.5 text-primary bg-primary/5 px-2.5 py-1 rounded-md border border-primary/20">
              <Building2 className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold uppercase tracking-wider">IIT Madras (NIRF #1)</span>
            </div>
            
            {/* ATS Stage */}
            <div className="w-full mt-5 p-3 rounded-xl bg-muted/50 border border-border/40 flex items-center justify-between shadow-sm">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">ATS Status</span>
              <span className="px-2 py-1 rounded-md text-[10px] bg-primary text-primary-foreground font-bold uppercase tracking-wider">Round 2: Interviewing</span>
            </div>
          </div>

          <div className="p-5 flex flex-col gap-5">
            {/* AI Match Score Breakdown */}
            <div className="p-4 rounded-2xl bg-card border border-border/40 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-border/40 pb-3">
                <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">AI Skill Index Match</span>
                <span className="text-lg font-mono font-bold text-emerald-500">96 <span className="text-xs text-muted-foreground">/ 100</span></span>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs font-bold text-foreground mb-1.5">
                    <span>PyTorch / CUDA Kernels</span>
                    <span className="font-mono text-primary">98%</span>
                  </div>
                  <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full w-[98%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-bold text-foreground mb-1.5">
                    <span>Distributed LLM Serving</span>
                    <span className="font-mono text-primary">92%</span>
                  </div>
                  <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full w-[92%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-bold text-foreground mb-1.5">
                    <span>Academic Transcript (9.4)</span>
                    <span className="font-mono text-primary">97%</span>
                  </div>
                  <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full w-[97%]"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Academic Verification */}
            <div className="p-4 rounded-2xl bg-card border border-border/40 shadow-sm space-y-3">
              <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest block mb-2">Institutional Verification</span>
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-emerald-500 w-4 h-4 shrink-0" />
                <span className="text-xs font-bold text-foreground">IIT-M Dean of Academic Courses</span>
              </div>
              <div className="flex items-center gap-3">
                <ClipboardCheck className="text-emerald-500 w-4 h-4 shrink-0" />
                <span className="text-xs font-bold text-foreground">Zero Backlogs • Conduct Cleared</span>
              </div>
              <div className="flex items-center gap-3">
                <Handshake className="text-emerald-500 w-4 h-4 shrink-0" />
                <span className="text-xs font-bold text-foreground">Placement NOC Granted</span>
              </div>
            </div>

            {/* Review Panel */}
            <div className="p-4 rounded-2xl bg-card border border-border/40 shadow-sm space-y-3">
              <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest block mb-2">Review Panel</span>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-bold text-primary">VN</div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-bold text-foreground truncate">Dr. V. Narayanan</span>
                  <span className="text-[10px] font-semibold text-muted-foreground">Head of Applied NLP</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-bold text-primary">PS</div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-bold text-foreground truncate">Priya Sharma</span>
                  <span className="text-[10px] font-semibold text-muted-foreground">Campus Talent Lead</span>
                </div>
              </div>
            </div>

            <button className="w-full py-2.5 px-4 rounded-xl bg-background border border-border/40 hover:bg-muted text-foreground text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm">
              <IdCard className="w-4 h-4 text-primary" />
              <span>View Full 4-Tab Dossier</span>
            </button>
          </div>
        </aside>

      </section>
    </div>
  );
}
