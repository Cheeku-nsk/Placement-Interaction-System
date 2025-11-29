import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import JobPostForm from "@/components/JobPostForm";
import ApplicantManagement from "@/components/ApplicantManagement";
import JobDetailsDialog from "@/components/JobDetailsDialog";
import CandidateDetailsDialog from "@/components/CandidateDetailsDialog";
import { storage } from "@/services/storage";
import { toast } from "sonner";
import { Plus, Users, Eye, Clock, CheckCircle, Star, MapPin, Calendar, Download, Filter, Search, Trash2 } from "lucide-react";
const EmployerDashboard = ({ activeTab = "dashboard", onTabChange }) => {
  // activeTab is now a prop
  const [showJobForm, setShowJobForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [jobDetailsOpen, setJobDetailsOpen] = useState(false);
  const [candidateDetailsOpen, setCandidateDetailsOpen] = useState(false);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    setJobs(storage.getJobs());
  }, []);

  const handleDeleteJob = (jobId) => {
    if (confirm("Are you sure you want to delete this job?")) {
      storage.deleteJob(jobId);
      setJobs(storage.getJobs());
      toast.success("Job deleted successfully");
    }
  };

  const handlePostJob = (jobData) => {
    storage.addJob(jobData);
    setJobs(storage.getJobs());
    setShowJobForm(false);
    toast.success("Job posted successfully");
  };

  const candidates = [
    {
      id: 1,
      name: "Priya Sharma",
      position: "Senior Software Engineer",
      university: "IIT Delhi",
      gpa: "8.9",
      skills: ["React", "Node.js", "Python", "AWS"],
      status: "pending",
      appliedDate: "2024-01-12",
      resumeScore: 92
    },
    {
      id: 2,
      name: "Rahul Kumar",
      position: "Senior Software Engineer",
      university: "NIT Trichy",
      gpa: "8.7",
      skills: ["Java", "Spring", "MySQL", "Docker"],
      status: "shortlisted",
      appliedDate: "2024-01-11",
      resumeScore: 88
    },
    {
      id: 3,
      name: "Anjali Patel",
      position: "Product Manager",
      university: "BITS Pilani",
      gpa: "9.1",
      skills: ["Strategy", "Analytics", "Figma", "SQL"],
      status: "interviewed",
      appliedDate: "2024-01-10",
      resumeScore: 95
    }
  ];
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'status-pending';
      case 'shortlisted':
      case 'interviewed':
        return 'status-approved';
      case 'rejected':
        return 'status-rejected';
      case 'active':
        return 'status-approved';
      case 'closed':
        return 'status-rejected';
      default:
        return 'status-pending';
    }
  };
  const renderContent = () => {
    if (showJobForm) {
      return <JobPostForm onClose={() => setShowJobForm(false)} onSubmit={handlePostJob} />;
    }
    switch (activeTab) {
      case "applicants":
        return <ApplicantManagement />;
      case "post-job":
        return <JobPostForm onClose={() => onTabChange && onTabChange("dashboard")} onSubmit={handlePostJob} />;
      default:
        return renderDashboardContent();
    }
  };
  const renderDashboardContent = () => (<div className="space-y-6">
    {/* Header */}
    <div className="p-6 gradient-hero rounded-lg shadow-card relative overflow-hidden">
      <div className="relative z-10">
        <h1 className="text-3xl font-bold mb-2 text-primary-foreground">Employer Dashboard</h1>
        <p className="text-primary-foreground/90 mb-4">Manage your job postings and connect with top talent.</p>
        <Button className="bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground border-primary-foreground/30" onClick={() => setShowJobForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Post New Job
        </Button>
      </div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary-foreground/10 rounded-full -translate-y-32 translate-x-32"></div>
    </div>

    {/* Stats Overview */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="card-elevated p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Active Jobs</p>
            <p className="text-2xl font-bold text-primary">8</p>
          </div>
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <Eye className="w-6 h-6 text-primary" />
          </div>
        </div>
      </Card>

      <Card className="card-elevated p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Total Applications</p>
            <p className="text-2xl font-bold text-success">247</p>
          </div>
          <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
            <Users className="w-6 h-6 text-success" />
          </div>
        </div>
      </Card>

      <Card className="card-elevated p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Shortlisted</p>
            <p className="text-2xl font-bold text-warning">43</p>
          </div>
          <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-warning" />
          </div>
        </div>
      </Card>

      <Card className="card-elevated p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Hired</p>
            <p className="text-2xl font-bold text-success">12</p>
          </div>
          <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
            <Star className="w-6 h-6 text-success" />
          </div>
        </div>
      </Card>
    </div>

    {/* Main Content */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Job Postings */}
      <div className="lg:col-span-2 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Job Postings</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button className="btn-gradient" size="sm" onClick={() => setShowJobForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              New Job
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {jobs.map((job) => (<Card key={job.id} className="card-elevated p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-semibold">{job.title}</h3>
                  <Badge className={getStatusColor(job.status)}>
                    {job.status}
                  </Badge>
                </div>
                <p className="text-muted-foreground mb-3">{job.department}</p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Posted: {new Date(job.posted).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    Ends: {new Date(job.deadline).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{job.applications}</p>
                  <p className="text-xs text-muted-foreground">Applications</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold">{job.salary}</p>
                  <p className="text-xs text-muted-foreground">Salary Range</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => {
                  setSelectedJob(job);
                  setJobDetailsOpen(true);
                }}>
                  <Eye className="w-4 h-4 mr-2" />
                  View
                </Button>
                <Button variant="outline" size="sm" className="text-destructive hover:text-destructive" onClick={() => handleDeleteJob(job.id)}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
                <Button className="btn-gradient" size="sm" onClick={() => onTabChange && onTabChange("applicants")}>
                  Manage
                </Button>
              </div>
            </div>
          </Card>))}
        </div>
      </div>

      {/* Recent Applications */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Recent Applications</h2>
          <Button variant="outline" size="sm" onClick={() => onTabChange && onTabChange("applicants")}>
            <Search className="w-4 h-4 mr-2" />
            View All
          </Button>
        </div>

        <div className="space-y-3">
          {candidates.slice(0, 3).map((candidate) => (<Card key={candidate.id} className="card-elevated p-4">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-semibold">
                {candidate.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium truncate">{candidate.name}</h4>
                <p className="text-sm text-muted-foreground truncate">{candidate.university}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="text-xs">
                    GPA: {candidate.gpa}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    Score: {candidate.resumeScore}%
                  </Badge>
                </div>
              </div>
            </div>

            <div className="mb-3">
              <p className="text-sm font-medium mb-1">Applied for:</p>
              <p className="text-sm text-muted-foreground">{candidate.position}</p>
            </div>

            <div className="flex flex-wrap gap-1 mb-3">
              {candidate.skills.slice(0, 3).map((skill) => (<Badge key={skill} variant="outline" className="text-xs">
                {skill}
              </Badge>))}
              {candidate.skills.length > 3 && (<Badge variant="outline" className="text-xs">
                +{candidate.skills.length - 3}
              </Badge>)}
            </div>

            <div className="flex items-center justify-between">
              <Badge className={getStatusColor(candidate.status)}>
                {candidate.status}
              </Badge>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm">
                  <Download className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => {
                  setSelectedCandidate(candidate);
                  setCandidateDetailsOpen(true);
                }}>
                  View
                </Button>
              </div>
            </div>
          </Card>))}
        </div>

        <Button variant="outline" className="w-full" onClick={() => onTabChange && onTabChange("applicants")}>
          View All Candidates
        </Button>
      </div>
    </div>
  </div>);
  return (<div className="container mx-auto p-6">
    {/* Navigation Tabs */}
    <div className="flex items-center gap-2 mb-6 p-2 bg-secondary/20 rounded-lg">
      {[
        { id: "dashboard", label: "Dashboard", icon: Eye },
        { id: "post-job", label: "Post Job", icon: Plus },
        { id: "applicants", label: "Manage Applicants", icon: Users },
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
      open={jobDetailsOpen}
      onOpenChange={setJobDetailsOpen}
    />

    <CandidateDetailsDialog
      candidate={selectedCandidate}
      open={candidateDetailsOpen}
      onOpenChange={setCandidateDetailsOpen}
    />
  </div>);
};
export default EmployerDashboard;
