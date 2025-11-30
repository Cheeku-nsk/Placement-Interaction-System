import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AddUserDialog from "@/components/AddUserDialog";
import UserDetailsDialog from "@/components/UserDetailsDialog";
import { storage } from "@/services/storage";
import { toast } from "sonner";
import { Users, Building2, GraduationCap, UserCheck, BriefcaseIcon, Settings, Shield, BarChart3, Plus, Eye, Edit, Trash2 } from "lucide-react";

const AdminDashboard = ({ activeTab = "dashboard", onTabChange }) => {
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userDetailsOpen, setUserDetailsOpen] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(storage.getUsers());
  }, []);

  const handleDeleteUser = (userId) => {
    if (confirm("Are you sure you want to delete this user?")) {
      storage.deleteUser(userId);
      setUsers(storage.getUsers());
      toast.success("User deleted successfully");
    }
  };

  const systemStats = [
    { label: "Total Students", value: "1,247", icon: GraduationCap, color: "text-primary" },
    { label: "Active Employers", value: "89", icon: Building2, color: "text-success" },
    { label: "Job Postings", value: "156", icon: BriefcaseIcon, color: "text-warning" },
    { label: "Successful Placements", value: "342", icon: UserCheck, color: "text-accent" }
  ];
  const recentActivity = [
    { id: 1, type: "job_posted", user: "TechCorp Inc.", action: "posted a new job", time: "2 hours ago" },
    { id: 2, type: "student_registered", user: "Amit Kumar", action: "registered as student", time: "4 hours ago" },
    { id: 3, type: "application_submitted", user: "Priya Sharma", action: "applied for Software Engineer", time: "6 hours ago" },
    { id: 4, type: "employer_verified", user: "InnovateLabs", action: "employer account verified", time: "8 hours ago" }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'job_posted':
        return <BriefcaseIcon className="w-4 h-4 text-primary" />;
      case 'student_registered':
        return <GraduationCap className="w-4 h-4 text-success" />;
      case 'application_submitted':
        return <UserCheck className="w-4 h-4 text-warning" />;
      case 'employer_verified':
        return <Building2 className="w-4 h-4 text-accent" />;
      default:
        return <Users className="w-4 h-4" />;
    }
  };

  const renderUsersContent = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">User Management</h2>
        <Button className="btn-gradient" size="sm" onClick={() => setAddUserOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      <div className="space-y-3">
        {users.map((user) => (<Card key={user.id} className="card-elevated p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-semibold">
                {user.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h4 className="font-semibold">{user.name}</h4>
                <p className="text-sm text-muted-foreground">{user.department || user.company || user.role}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary">{user.role}</Badge>
                  <Badge className="status-approved">Active</Badge>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => {
                setSelectedUser(user);
                setUserDetailsOpen(true);
              }}>
                <Eye className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Edit className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={() => handleDeleteUser(user.id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Email: {user.email}
            </p>
          </div>
        </Card>))}
      </div>
    </div>
  );

  const renderActivityContent = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Recent Activity</h2>

      <div className="space-y-3">
        {recentActivity.map((activity) => (<Card key={activity.id} className="card-elevated p-4">
          <div className="flex items-start gap-3">
            <div className="mt-1">
              {getActivityIcon(activity.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm">
                <span className="font-medium">{activity.user}</span>
                {' '}
                <span className="text-muted-foreground">{activity.action}</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
            </div>
          </div>
        </Card>))}
      </div>
    </div>
  );

  const renderDashboardContent = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 gradient-hero rounded-lg shadow-card relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2 text-primary-foreground">Admin Dashboard</h1>
          <p className="text-primary-foreground/90 mb-4">Manage the entire placement system, users, and monitor performance.</p>
          <div className="flex items-center gap-4">
            <Button className="bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground border-primary-foreground/30">
              <Settings className="w-4 h-4 mr-2" />
              System Settings
            </Button>
            <Button className="bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground border-primary-foreground/30">
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </Button>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-foreground/10 rounded-full -translate-y-32 translate-x-32"></div>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {systemStats.map((stat, index) => {
          const Icon = stat.icon;
          return (<Card key={index} className="card-elevated p-6 text-center">
            <div className={`w-16 h-16 mx-auto mb-4 ${stat.color.replace('text-', 'bg-')}/10 rounded-full flex items-center justify-center`}>
              <Icon className={`w-8 h-8 ${stat.color}`} />
            </div>
            <h3 className="text-2xl font-bold mb-2">{stat.value}</h3>
            <p className="text-muted-foreground">{stat.label}</p>
          </Card>);
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Management Preview */}
        <div className="lg:col-span-2">
          {renderUsersContent()}
          <Button variant="outline" className="w-full mt-4" onClick={() => onTabChange && onTabChange("users")}>
            View All Users
          </Button>
        </div>

        {/* Recent Activity Preview */}
        <div>
          {renderActivityContent()}
          <Button variant="outline" className="w-full mt-4" onClick={() => onTabChange && onTabChange("activity")}>
            View All Activity
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <Card className="card-elevated p-6">
        <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="outline" className="justify-start h-auto p-4">
            <Shield className="w-5 h-5 mr-3" />
            <div className="text-left">
              <p className="font-medium">Manage Permissions</p>
              <p className="text-xs text-muted-foreground">Configure user roles and access</p>
            </div>
          </Button>

          <Button variant="outline" className="justify-start h-auto p-4">
            <BarChart3 className="w-5 h-5 mr-3" />
            <div className="text-left">
              <p className="font-medium">Generate Reports</p>
              <p className="text-xs text-muted-foreground">Placement statistics and analytics</p>
            </div>
          </Button>

          <Button variant="outline" className="justify-start h-auto p-4">
            <Settings className="w-5 h-5 mr-3" />
            <div className="text-left">
              <p className="font-medium">System Configuration</p>
              <p className="text-xs text-muted-foreground">Update system settings</p>
            </div>
          </Button>
        </div>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "users":
        return renderUsersContent();
      case "activity":
        return renderActivityContent();
      default:
        return renderDashboardContent();
    }
  };

  return (<div className="container mx-auto p-6 space-y-6">


    {renderContent()}

    <AddUserDialog
      open={addUserOpen}
      onOpenChange={setAddUserOpen}
    />

    <UserDetailsDialog
      user={selectedUser}
      open={userDetailsOpen}
      onOpenChange={setUserDetailsOpen}
    />
  </div>);
};
export default AdminDashboard;
