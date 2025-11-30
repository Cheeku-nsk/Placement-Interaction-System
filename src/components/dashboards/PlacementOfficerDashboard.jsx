import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PlacementReports from "@/components/PlacementReports";
import DriveManagement from "@/components/DriveManagement";
import DriveDetailsDialog from "@/components/DriveDetailsDialog";
import { BarChart3, TrendingUp, Users, Building2, Calendar, Download, FileText, CheckCircle, Clock, AlertTriangle, Filter, Plus, Eye } from "lucide-react";
const PlacementOfficerDashboard = ({ activeTab = "dashboard", onTabChange }) => {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  // activeTab is now a prop
  const [selectedDrive, setSelectedDrive] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const placementStats = [
    { label: "Total Placements", value: "127", change: "+15%", icon: CheckCircle, color: "text-success" },
    { label: "Active Drives", value: "8", change: "+2", icon: Calendar, color: "text-primary" },
    { label: "Participating Companies", value: "24", change: "+6", icon: Building2, color: "text-accent" },
    { label: "Average Package", value: "₹8.2 LPA", change: "+12%", icon: TrendingUp, color: "text-warning" }
  ];
  const upcomingDrives = [
    {
      id: 1,
      company: "Microsoft",
      role: "Software Engineer",
      date: "2024-01-20",
      time: "10:00 AM",
      venue: "Auditorium A",
      registered: 156,
      status: "confirmed"
    },
    {
      id: 2,
      company: "Amazon",
      role: "SDE Intern",
      date: "2024-01-22",
      time: "2:00 PM",
      venue: "Hall B",
      registered: 203,
      status: "confirmed"
    },
    {
      id: 3,
      company: "Google",
      role: "Product Manager",
      date: "2024-01-25",
      time: "11:00 AM",
      venue: "Conference Room",
      registered: 89,
      status: "pending"
    }
  ];
  const recentPlacements = [
    { id: 1, student: "Arjun Patel", company: "TCS", package: "₹7.5 LPA", date: "2024-01-15" },
    { id: 2, student: "Sneha Gupta", company: "Infosys", package: "₹6.8 LPA", date: "2024-01-14" },
    { id: 3, student: "Vikram Singh", company: "Wipro", package: "₹7.2 LPA", date: "2024-01-13" },
    { id: 4, student: "Meera Reddy", company: "Cognizant", package: "₹6.5 LPA", date: "2024-01-12" }
  ];
  const pendingTasks = [
    { id: 1, task: "Review student profiles for Microsoft drive", priority: "high", dueDate: "2024-01-18" },
    { id: 2, task: "Coordinate with Amazon HR for venue setup", priority: "medium", dueDate: "2024-01-19" },
    { id: 3, task: "Generate placement report for December", priority: "low", dueDate: "2024-01-20" },
    { id: 4, task: "Update company database", priority: "medium", dueDate: "2024-01-21" }
  ];
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
  const renderContent = () => {
    switch (activeTab) {
      case "reports":
        return <PlacementReports />;
      case "drives":
        return <DriveManagement />;
      default:
        return renderDashboardContent();
    }
  };
  const renderDashboardContent = () => (<div className="space-y-6">
    {/* Header */}
    <div className="p-6 gradient-hero rounded-lg shadow-card relative overflow-hidden">
      <div className="relative z-10">
        <h1 className="text-3xl font-bold mb-2 text-primary-foreground">Placement Officer Dashboard</h1>
        <p className="text-primary-foreground/90 mb-4">Track placement records, manage drives, and facilitate employer-student interactions.</p>
        <div className="flex items-center gap-4">
          <Button className="bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground border-primary-foreground/30">
            <Plus className="w-4 h-4 mr-2" />
            Schedule Drive
          </Button>
          <Button className="bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground border-primary-foreground/30" onClick={() => onTabChange && onTabChange("reports")}>
            <FileText className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary-foreground/10 rounded-full -translate-y-32 translate-x-32"></div>
    </div>

    {/* Statistics */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {placementStats.map((stat, index) => {
        const Icon = stat.icon;
        return (<Card key={index} className="card-elevated p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className={`text-sm ${stat.color}`}>{stat.change}</p>
            </div>
            <div className={`w-12 h-12 ${stat.color.replace('text-', 'bg-')}/10 rounded-lg flex items-center justify-center`}>
              <Icon className={`w-6 h-6 ${stat.color}`} />
            </div>
          </div>
        </Card>);
      })}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Upcoming Placement Drives */}
      <div className="lg:col-span-2 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Upcoming Placement Drives</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              Calendar View
            </Button>
            <Button className="btn-gradient" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Schedule
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {upcomingDrives.map((drive) => (<Card key={drive.id} className="card-elevated p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-semibold">{drive.company}</h3>
                  <Badge className={drive.status === 'confirmed' ? 'status-approved' : 'status-pending'}>
                    {drive.status}
                  </Badge>
                </div>
                <p className="text-primary font-medium mb-2">{drive.role}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(drive.date).toLocaleDateString()} at {drive.time}
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    {drive.venue}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    {drive.registered} registered
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <span className="font-medium text-primary">{drive.registered}</span>
                <span className="text-muted-foreground ml-1">students registered</span>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => {
                  setSelectedDrive(drive);
                  setDetailsOpen(true);
                }}>
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </Button>
                <Button className="btn-gradient" size="sm">
                  Manage
                </Button>
              </div>
            </div>
          </Card>))}
        </div>
      </div>

      {/* Pending Tasks */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Pending Tasks</h2>

        <div className="space-y-3">
          {pendingTasks.map((task) => (<Card key={task.id} className="card-elevated p-4">
            <div className="flex items-start gap-3">
              <div className="mt-1">
                {task.priority === 'high' ? (<AlertTriangle className="w-4 h-4 text-destructive" />) : (<Clock className="w-4 h-4 text-warning" />)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{task.task}</p>
                <div className="flex items-center justify-between mt-2">
                  <Badge className={getPriorityColor(task.priority)}>
                    {task.priority} priority
                  </Badge>
                  <p className="text-xs text-muted-foreground">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </Card>))}
        </div>

        <Button variant="outline" className="w-full">
          View All Tasks
        </Button>
      </div>
    </div>

    {/* Recent Placements */}
    <Card className="card-elevated p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Recent Placements</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-2 font-medium text-muted-foreground">Student</th>
              <th className="text-left py-3 px-2 font-medium text-muted-foreground">Company</th>
              <th className="text-left py-3 px-2 font-medium text-muted-foreground">Package</th>
              <th className="text-left py-3 px-2 font-medium text-muted-foreground">Date</th>
              <th className="text-right py-3 px-2 font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {recentPlacements.map((placement) => (<tr key={placement.id} className="border-b border-border/50 hover:bg-secondary/20 transition-smooth">
              <td className="py-4 px-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    {placement.student.split(' ').map(n => n[0]).join('')}
                  </div>
                  <span className="font-medium">{placement.student}</span>
                </div>
              </td>
              <td className="py-4 px-2 font-medium text-primary">{placement.company}</td>
              <td className="py-4 px-2 font-semibold text-success">{placement.package}</td>
              <td className="py-4 px-2 text-muted-foreground">
                {new Date(placement.date).toLocaleDateString()}
              </td>
              <td className="py-4 px-2 text-right">
                <Button variant="ghost" size="sm">
                  <Eye className="w-4 h-4" />
                </Button>
              </td>
            </tr>))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-4">
        <Button variant="outline">
          View All Placements
        </Button>
      </div>
    </Card>
  </div>);
  return (<div className="container mx-auto p-6">


    {renderContent()}

    <DriveDetailsDialog
      drive={selectedDrive}
      open={detailsOpen}
      onOpenChange={setDetailsOpen}
    />
  </div>);
};
export default PlacementOfficerDashboard;
