import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import StudentProfile from "@/components/StudentProfile";
import NotificationCenter from "@/components/NotificationCenter";
import JobDetailsDialog from "@/components/JobDetailsDialog";
import ApplicationDialog from "@/components/ApplicationDialog";
import { storage } from "@/services/storage";
import { toast } from "sonner";
import { Search, Filter, MapPin, Clock, Building2, CheckCircle, XCircle, AlertCircle, BriefcaseIcon, ChevronRight, Bookmark, User, Bell, BookOpen, TrendingUp, Calendar } from "lucide-react";
const StudentDashboard = ({ activeTab = "dashboard", onTabChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  // activeTab is now a prop
  const [selectedJob, setSelectedJob] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [applicationOpen, setApplicationOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    setJobs(storage.getJobs());
    setApplications(storage.getApplications());
    setCurrentUser(storage.getCurrentUser());
  }, []);

  const handleApply = (job) => {
    setSelectedJob(job);
    setApplicationOpen(true);
  };

  const onApplicationSubmit = (applicationData) => {
    try {
      storage.addApplication({
        ...applicationData,
        jobId: selectedJob.id,
        studentId: currentUser?.id || 999, // Fallback for demo if no user logged in
        studentName: currentUser?.name || "Demo Student",
        jobTitle: selectedJob.title,
        company: selectedJob.company
      });
      setApplications(storage.getApplications());
      setApplicationOpen(false);
      toast.success("Application submitted successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };
  const mockJobs = [
    {
      id: 1,
      title: "Software Developer",
      company: "TechCorp Inc.",
      location: "Bangalore, India",
      salary: "₹6-8 LPA",
      type: "Full-time",
      posted: "2 days ago",
      deadline: "2024-01-15",
      skills: ["React", "Node.js", "Python"],
      status: "applied"
    },
    {
      id: 2,
      title: "Data Analyst",
      company: "DataFlow Solutions",
      location: "Mumbai, India",
      salary: "₹5-7 LPA",
      type: "Full-time",
      posted: "1 day ago",
      deadline: "2024-01-20",
      skills: ["SQL", "Python", "Tableau"],
      status: "new"
    },
    {
      id: 3,
      title: "Frontend Developer",
      company: "DesignHub",
      location: "Pune, India",
      salary: "₹4-6 LPA",
      type: "Full-time",
      posted: "3 days ago",
      deadline: "2024-01-18",
      skills: ["React", "CSS", "JavaScript"],
      status: "new"
    }
  ];
  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <AlertCircle className="w-4 h-4" />;
      case 'approved':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };
  const filteredJobs = mockJobs.filter(job => job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()));
  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <StudentProfile />;
      case "notifications":
        return <NotificationCenter />;
      case "applications":
        return (<div className="space-y-4">
          <h2 className="text-2xl font-bold">My Applications</h2>
          <div className="space-y-3">
            {applications.map((app) => (<Card key={app.id} className="card-elevated p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-1">{app.position}</h3>
                  <p className="text-primary font-medium mb-3">{app.company}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <span>Applied: {new Date(app.appliedDate).toLocaleDateString()}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{app.lastUpdate}</p>
                </div>
                <Badge className={`${app.status === 'pending' ? 'status-pending' :
                  app.status === 'approved' ? 'status-approved' : 'status-rejected'
                  } `}>
                  {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                </Badge>
              </div>
            </Card>))}
          </div>
        </div>);
      default:
        return renderDashboardContent();
    }
  };
  const renderDashboardContent = () => (<div className="space-y-6">
    {/* Welcome Section */}
    <div className="p-6 gradient-hero rounded-lg shadow-card relative overflow-hidden">
      <div className="relative z-10">
        <h1 className="text-3xl font-bold mb-2 text-primary-foreground">Welcome back, Alex!</h1>
        <p className="text-primary-foreground/90 mb-4">Ready to find your dream job? Let's explore new opportunities.</p>
        <div className="flex flex-wrap gap-4 text-sm text-primary-foreground">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            <span>Computer Science Engineering</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            <span>CGPA: 8.5</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>Final Year</span>
          </div>
        </div>
      </div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary-foreground/10 rounded-full -translate-y-32 translate-x-32"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-foreground/5 rounded-full translate-y-24 -translate-x-24"></div>
    </div>

    {/* Quick Stats */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="card-elevated p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Applications</p>
            <p className="text-2xl font-bold text-primary">12</p>
          </div>
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <Building2 className="w-6 h-6 text-primary" />
          </div>
        </div>
      </Card>

      <Card className="card-elevated p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Interviews</p>
            <p className="text-2xl font-bold text-success">3</p>
          </div>
          <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-success" />
          </div>
        </div>
      </Card>

      <Card className="card-elevated p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Pending</p>
            <p className="text-2xl font-bold text-warning">5</p>
          </div>
          <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
            <AlertCircle className="w-6 h-6 text-warning" />
          </div>
        </div>
      </Card>

      <Card className="card-elevated p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Offers</p>
            <p className="text-2xl font-bold text-success">1</p>
          </div>
          <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-success" />
          </div>
        </div>
      </Card>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Job Listings */}
      <div className="lg:col-span-2 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Available Jobs</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input type="text" placeholder="Search jobs, companies, skills..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-smooth" />
        </div>

        {/* Job Cards */}
        <div className="space-y-4">
          {jobs.map((job) => (<Card key={job.id} className="card-elevated p-6 hover:border-primary/50 transition-colors cursor-pointer" onClick={() => {
            setSelectedJob(job);
            setDetailsOpen(true);
          }}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center p-2">
                  <Building2 className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{job.title}</h3>
                  <p className="text-muted-foreground">{job.company}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                <Bookmark className="w-5 h-5" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary" className="font-normal">
                <MapPin className="w-3 h-3 mr-1" />
                {job.location}
              </Badge>
              <Badge variant="secondary" className="font-normal">
                <BriefcaseIcon className="w-3 h-3 mr-1" />
                {job.type}
              </Badge>
              <Badge variant="secondary" className="font-normal">
                <Clock className="w-3 h-3 mr-1" />
                {job.salary}
              </Badge>
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Posted {new Date(job.posted).toLocaleDateString()}
              </p>
              <Button className="btn-gradient" size="sm" onClick={(e) => {
                e.stopPropagation();
                handleApply(job);
              }}>
                Apply Now
              </Button>
            </div>
          </Card>))}
        </div>
      </div>

      {/* Application Status */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Application Status</h2>
          <Button variant="outline" size="sm" onClick={() => onTabChange && onTabChange("applications")}>
            View All
          </Button>
        </div>
        <div className="space-y-3">
          {applications.slice(0, 3).map((app) => (<Card key={app.id} className="card-elevated p-4">
            <div className="flex items-start gap-3">
              <div className={`mt - 1 ${app.status === 'pending' ? 'text-warning' :
                app.status === 'approved' ? 'text-success' : 'text-destructive'
                } `}>
                {getStatusIcon(app.status)}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium truncate">{app.position}</h4>
                <p className="text-sm text-muted-foreground truncate">{app.company}</p>
                <div className={`inline - flex mt - 2 ${app.status === 'pending' ? 'status-pending' :
                  app.status === 'approved' ? 'status-approved' : 'status-rejected'
                  } `}>
                  {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                </div>
                <p className="text-xs text-muted-foreground mt-2">{app.lastUpdate}</p>
              </div>
            </div>
          </Card>))}
        </div>

        <Button variant="outline" className="w-full" onClick={() => onTabChange && onTabChange("applications")}>
          View All Applications
        </Button>
      </div>
    </div>
  </div>);
  return (<div className="container mx-auto p-6">
    {/* Navigation Tabs */}
    <div className="flex items-center gap-2 mb-6 p-2 bg-secondary/20 rounded-lg">
      {[
        { id: "dashboard", label: "Dashboard", icon: Building2 },
        { id: "applications", label: "My Applications", icon: BriefcaseIcon },
        { id: "profile", label: "Profile", icon: User },
        { id: "notifications", label: "Notifications", icon: Bell }
      ].map((tab) => {
        const Icon = tab.icon;
        return (<Button key={tab.id} variant={activeTab === tab.id ? "default" : "ghost"} size="sm" onClick={() => onTabChange && onTabChange(tab.id)} className="flex items-center gap-2">
          <Icon className="w-4 h-4" />
          {tab.label}
        </Button>);
      })}
    </div>

    {renderContent()}

    <JobDetailsDialog
      job={selectedJob}
      open={detailsOpen}
      onOpenChange={setDetailsOpen}
      onApply={(job) => {
        setSelectedJob(job);
        setApplicationOpen(true);
      }}
    />

    <ApplicationDialog
      job={selectedJob}
      open={applicationOpen}
      onOpenChange={setApplicationOpen}
      onSubmit={onApplicationSubmit}
    />
  </div>);
};
export default StudentDashboard;
