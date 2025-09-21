import { Bug, UserPlus, Activity, Circle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useDashboardStore } from '@/store/dashboardStore';
import { cn } from '@/lib/utils';

export function NotificationPanel() {
  const { notifications, activities, contacts } = useDashboardStore();
  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'bug':
        return <Bug className="h-4 w-4 text-destructive" />;
      case 'user':
        return <UserPlus className="h-4 w-4 text-primary" />;
      case 'activity':
        return <Activity className="h-4 w-4 text-success" />;
      default:
        return <Circle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-success';
      case 'away':
        return 'bg-warning';
      case 'offline':
        return 'bg-muted-foreground';
      default:
        return 'bg-muted-foreground';
    }
  };

  return (
    <div className="w-80 border-l border-border bg-card/30 backdrop-blur-sm">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="h-5 w-5 p-0 text-xs">
              {unreadCount}
            </Badge>
          )}
        </div>
      </div>

      <ScrollArea className="h-64">
        <div className="p-4 space-y-3">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={cn(
                "flex items-start gap-3 p-3 rounded-lg transition-colors",
                !notification.read && "bg-primary/5 border border-primary/20",
                "hover:bg-muted/50"
              )}
            >
              <div className="flex-shrink-0 mt-0.5">
                {notification.avatar ? (
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={notification.avatar} />
                    <AvatarFallback className="text-xs">
                      {notification.title.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  getNotificationIcon(notification.type)
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {notification.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {notification.description}
                </p>
              </div>
              {!notification.read && (
                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      <Separator />

      <div className="p-4 border-b border-border">
        <h3 className="font-semibold mb-4">Activities</h3>
        <ScrollArea className="h-64">
          <div className="space-y-3">
            {activities.map((activity) => (
              <div key={activity.id} className="activity-item">
                <Avatar className="h-6 w-6 flex-shrink-0">
                  <AvatarImage src={activity.user.avatar} />
                  <AvatarFallback className="text-xs">
                    {activity.user.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-xs">
                    <span className="font-medium">{activity.user.name}</span>{' '}
                    {activity.action}
                  </p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div className="p-4">
        <h3 className="font-semibold mb-4">Contacts</h3>
        <ScrollArea className="h-64">
          <div className="space-y-3">
            {contacts.map((contact) => (
              <div key={contact.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="relative">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={contact.avatar} />
                    <AvatarFallback className="text-xs">
                      {contact.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className={cn(
                    "absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background",
                    getStatusColor(contact.status)
                  )} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{contact.name}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}