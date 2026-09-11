"use client";

import { useState } from "react";
import { 
  Bell, 
  Briefcase, 
  Terminal, 
  Award, 
  CheckCircle2, 
  MoreHorizontal,
  Mail,
  UserPlus
} from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { markNotificationAsRead, markAllNotificationsAsRead } from "@/lib/actions/notificationActions";

export function NotificationsClient({ initialNotifications }: { initialNotifications: any[] }) {
  const [activeTab, setActiveTab] = useState("all");
  const [notifications, setNotifications] = useState(initialNotifications);
  const [isPending, startTransition] = useTransition();

  const handleMarkAllAsRead = () => {
    startTransition(async () => {
      try {
        await markAllNotificationsAsRead();
        setNotifications(prev => prev.map(n => ({ ...n, is_unread: false })));
        toast.success("All notifications marked as read");
      } catch (e: any) {
        toast.error("Failed to mark notifications as read");
      }
    });
  };

  const handleMarkAsRead = (id: string) => {
    startTransition(async () => {
      try {
        await markNotificationAsRead(id);
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_unread: false } : n));
      } catch (e: any) {
        toast.error("Failed to mark notification as read");
      }
    });
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case 'job': return Briefcase;
      case 'assessment': return Terminal;
      case 'badge': return Award;
      case 'message': return Mail;
      case 'network': return UserPlus;
      default: return Bell;
    }
  };

  const getColorForType = (type: string) => {
    switch (type) {
      case 'job': return { color: "text-blue-500", bg: "bg-blue-500/10" };
      case 'assessment': return { color: "text-emerald-500", bg: "bg-emerald-500/10" };
      case 'badge': return { color: "text-purple-500", bg: "bg-purple-500/10" };
      case 'message': return { color: "text-amber-500", bg: "bg-amber-500/10" };
      case 'network': return { color: "text-indigo-500", bg: "bg-indigo-500/10" };
      default: return { color: "text-muted-foreground", bg: "bg-muted" };
    }
  };

  const filteredNotifs = notifications.filter(n => {
    if (activeTab === "unread") return n.is_unread;
    return true;
  });

  return (
    <div className="flex flex-col gap-6 py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-foreground flex items-center gap-3">
            <Bell className="w-8 h-8 text-primary" />
            Notifications
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Stay updated with your latest alerts and matches.</p>
        </div>
        <button 
          onClick={handleMarkAllAsRead}
          disabled={isPending}
          className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 bg-primary/10 px-3 py-1.5 rounded-md transition-colors hover:bg-primary/20 disabled:opacity-50">
          <CheckCircle2 className="w-3.5 h-3.5" />
          Mark all as read
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-border/40 pb-px">
        <button 
          onClick={() => setActiveTab("all")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === "all" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
        >
          All
        </button>
        <button 
          onClick={() => setActiveTab("unread")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === "unread" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
        >
          Unread
        </button>
      </div>

      {/* List */}
      <div className="bg-card border border-border/60 rounded-2xl shadow-sm overflow-hidden flex flex-col">
        {filteredNotifs.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center">
            <Bell className="w-12 h-12 text-muted-foreground/30 mb-3" />
            <h3 className="text-lg font-bold text-foreground">You're all caught up!</h3>
            <p className="text-sm text-muted-foreground mt-1">No new notifications at the moment.</p>
          </div>
        ) : (
          filteredNotifs.map((notif) => {
            const Icon = getIconForType(notif.type);
            const { color, bg } = getColorForType(notif.type);
            
            // Just format the date a bit
            const dateObj = new Date(notif.created_at);
            const timeString = dateObj.toLocaleDateString() + ' ' + dateObj.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

            return (
              <div key={notif.id} className={`flex items-start gap-4 p-5 border-b border-border/40 last:border-0 hover:bg-muted/30 transition-colors ${notif.is_unread ? 'bg-primary/5' : ''}`}>
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${bg} ${color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className={`text-sm font-bold ${notif.is_unread ? 'text-foreground' : 'text-foreground/80'}`}>
                      {notif.title}
                    </h4>
                    <span className="text-[11px] font-medium text-muted-foreground whitespace-nowrap">
                      {timeString}
                    </span>
                  </div>
                  <p className={`text-xs mt-1 leading-relaxed ${notif.is_unread ? 'text-foreground/90 font-medium' : 'text-muted-foreground'}`}>
                    {notif.description}
                  </p>
                </div>
                {notif.is_unread && (
                  <button 
                    onClick={() => handleMarkAsRead(notif.id)}
                    disabled={isPending}
                    className="text-primary hover:text-primary/80 p-1 rounded-md transition-colors shrink-0" 
                    title="Mark as read">
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
