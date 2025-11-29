import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, CheckCircle, XCircle, Calendar, BriefcaseIcon, Eye, Trash2, Filter, Check } from "lucide-react";
const NotificationCenter = () => {
    const [filter, setFilter] = useState("all");
    const notifications = [
        {
            id: 1,
            type: "application_update",
            title: "You've been shortlisted by Infosys",
            message: "Congratulations! Your application for Software Engineer position has been shortlisted. Interview scheduled for Jan 20, 2024.",
            timestamp: "2 hours ago",
            read: false,
            priority: "high"
        },
        {
            id: 2,
            type: "new_job",
            title: "New Job Posted: Data Scientist at Microsoft",
            message: "A new position matching your skills has been posted. Application deadline: Jan 25, 2024.",
            timestamp: "5 hours ago",
            read: false,
            priority: "medium"
        },
        {
            id: 3,
            type: "drive_reminder",
            title: "Placement Drive Reminder",
            message: "Google placement drive is scheduled for tomorrow at 10:00 AM in Auditorium A.",
            timestamp: "1 day ago",
            read: true,
            priority: "medium"
        },
        {
            id: 4,
            type: "application_rejected",
            title: "Application Update: Amazon",
            message: "Thank you for your interest. Unfortunately, we won't be moving forward with your application at this time.",
            timestamp: "2 days ago",
            read: true,
            priority: "low"
        },
        {
            id: 5,
            type: "profile_incomplete",
            title: "Complete Your Profile",
            message: "Your profile is 75% complete. Add your projects and skills to increase visibility to employers.",
            timestamp: "3 days ago",
            read: false,
            priority: "low"
        },
        {
            id: 6,
            type: "interview_scheduled",
            title: "Interview Scheduled: TechCorp",
            message: "Your interview for Senior Software Engineer position is confirmed for Jan 22, 2024 at 3:00 PM.",
            timestamp: "1 week ago",
            read: true,
            priority: "high"
        }
    ];
    const getNotificationIcon = (type) => {
        switch (type) {
            case 'application_update':
                return <CheckCircle className="w-5 h-5 text-success"/>;
            case 'application_rejected':
                return <XCircle className="w-5 h-5 text-destructive"/>;
            case 'new_job':
                return <BriefcaseIcon className="w-5 h-5 text-primary"/>;
            case 'drive_reminder':
            case 'interview_scheduled':
                return <Calendar className="w-5 h-5 text-warning"/>;
            default:
                return <Bell className="w-5 h-5 text-muted-foreground"/>;
        }
    };
    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high':
                return 'status-rejected';
            case 'medium':
                return 'status-pending';
            case 'low':
                return 'status-approved';
            default:
                return 'status-pending';
        }
    };
    const filteredNotifications = notifications.filter(notification => {
        if (filter === "unread")
            return !notification.read;
        if (filter === "read")
            return notification.read;
        return true;
    });
    const unreadCount = notifications.filter(n => !n.read).length;
    return (<div className="space-y-6">
      {/* Header */}
      <Card className="card-elevated p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Notifications</h2>
            <p className="text-muted-foreground">
              You have {unreadCount} unread notifications
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Check className="w-4 h-4 mr-2"/>
              Mark All Read
            </Button>
            <Button variant="outline" size="sm">
              <Trash2 className="w-4 h-4 mr-2"/>
              Clear All
            </Button>
          </div>
        </div>
      </Card>

      {/* Filters */}
      <Card className="card-elevated p-4">
        <div className="flex items-center gap-4">
          <Filter className="w-5 h-5 text-muted-foreground"/>
          <div className="flex items-center gap-2">
            {["all", "unread", "read"].map((filterType) => (<Button key={filterType} variant={filter === filterType ? "default" : "outline"} size="sm" onClick={() => setFilter(filterType)}>
                {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                {filterType === "unread" && unreadCount > 0 && (<Badge className="ml-2 status-rejected text-xs">
                    {unreadCount}
                  </Badge>)}
              </Button>))}
          </div>
        </div>
      </Card>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.map((notification) => (<Card key={notification.id} className={`card-elevated p-4 transition-smooth cursor-pointer hover:shadow-glow ${!notification.read ? 'border-l-4 border-l-primary bg-primary/5' : ''}`}>
            <div className="flex items-start gap-4">
              <div className="mt-1">
                {getNotificationIcon(notification.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <h4 className={`font-medium ${!notification.read ? 'font-semibold' : ''}`}>
                    {notification.title}
                  </h4>
                  <div className="flex items-center gap-2 ml-4">
                    <Badge className={getPriorityColor(notification.priority)}>
                      {notification.priority}
                    </Badge>
                    {!notification.read && (<div className="w-3 h-3 bg-primary rounded-full"></div>)}
                  </div>
                </div>
                
                <p className={`text-sm mb-3 ${notification.read ? 'text-muted-foreground' : 'text-foreground'}`}>
                  {notification.message}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {notification.timestamp}
                  </span>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4"/>
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="w-4 h-4"/>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>))}
      </div>

      {filteredNotifications.length === 0 && (<Card className="card-elevated p-8 text-center">
          <Bell className="w-12 h-12 mx-auto mb-4 text-muted-foreground"/>
          <h3 className="text-lg font-medium mb-2">No notifications found</h3>
          <p className="text-muted-foreground">
            {filter === "unread"
                ? "You have no unread notifications"
                : "All caught up! No notifications to show"}
          </p>
        </Card>)}
    </div>);
};
export default NotificationCenter;
