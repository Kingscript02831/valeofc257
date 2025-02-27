
import { Bell, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { Notification } from "@/types/notifications";

interface NotifySystemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
}

const NotifySystem = ({ notification, onMarkAsRead }: NotifySystemProps) => {
  return (
    <div
      key={notification.id}
      className={cn(
        "group flex flex-col p-3 rounded-lg border transition-all",
        "hover:shadow-sm cursor-pointer",
        notification.read 
          ? "bg-muted/50 border-transparent"
          : "bg-background border-primary/10"
      )}
      onClick={() => onMarkAsRead(notification.id)}
    >
      <div className="flex items-start gap-3">
        <div className="mt-1">
          <Bell className="h-4 w-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <Badge
              variant={notification.read ? "outline" : "default"}
              className="bg-purple-500/10 text-purple-700"
            >
              Sistema
            </Badge>
            {!notification.read && (
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            )}
          </div>

          <h3 className={cn(
            "text-sm font-medium mb-0.5",
            !notification.read && "text-primary"
          )}>
            {notification.title}
          </h3>
          
          <p className="text-xs text-muted-foreground line-clamp-1">
            {notification.message}
          </p>

          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2">
              {notification.reference_id && (
                <Button
                  variant="link"
                  size="sm"
                  className="h-auto p-0 text-xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    onMarkAsRead(notification.id);
                  }}
                >
                  Ver detalhes
                  <ChevronRight className="ml-1 h-3 w-3" />
                </Button>
              )}
            </div>
            
            <div className="text-xs text-muted-foreground">
              {format(new Date(notification.created_at), "dd MMM HH:mm", { locale: ptBR })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotifySystem;
