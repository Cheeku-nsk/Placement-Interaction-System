import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Download, Eye, CheckCircle, XCircle, Clock, Star, GraduationCap, MapPin, Mail, Phone, Calendar } from "lucide-react";
const ApplicantManagement = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [selectedJob, setSelectedJob] = useState("all");
    const applicants = [
        {
            id: 1,
            name: "Priya Sharma",
            email: "priya.sharma@college.edu",
            phone: "+91 9876543210",
            university: "IIT Delhi",
            branch: "Computer Science",
            cgpa: "8.9",
            graduationYear: "2024",
            position: "Senior Software Engineer",
            appliedDate: "2024-01-12",
            status: "pending",
            resumeScore: 92,
            skills: ["React", "Node.js", "Python", "AWS"],
            experience: "2 internships",
            projects: 4,
            location: "Delhi"
        },
        {
            id: 2,
            name: "Rahul Kumar",
            email: "rahul.kumar@college.edu",
            phone: "+91 8765432109",
            university: "NIT Trichy",
            branch: "Information Technology",
            cgpa: "8.7",
            graduationYear: "2024",
            position: "Senior Software Engineer",
            appliedDate: "2024-01-11",
            status: "shortlisted",
            resumeScore: 88,
            skills: ["Java", "Spring", "MySQL", "Docker"],
            experience: "1 internship",
            projects: 3,
            location: "Chennai"
        },
        {
            id: 3,
            name: "Anjali Patel",
            email: "anjali.patel@college.edu",
            phone: "+91 7654321098",
            university: "BITS Pilani",
            branch: "Computer Science",
            cgpa: "9.1",
            graduationYear: "2024",
            position: "Product Manager",
            appliedDate: "2024-01-10",
            status: "interviewed",
            resumeScore: 95,
            skills: ["Strategy", "Analytics", "Figma", "SQL"],
            experience: "3 internships",
            projects: 5,
            location: "Rajasthan"
        },
        {
            id: 4,
            name: "Vikram Singh",
            email: "vikram.singh@college.edu",
            phone: "+91 6543210987",
            university: "IIT Mumbai",
            branch: "Electronics",
            cgpa: "8.4",
            graduationYear: "2024",
            position: "Data Scientist",
            appliedDate: "2024-01-09",
            status: "rejected",
            resumeScore: 78,
            skills: ["Python", "TensorFlow", "Statistics", "R"],
            experience: "2 internships",
            projects: 3,
            location: "Mumbai"
        }
    ];
    const jobs = [
        { id: "all", title: "All Positions" },
        { id: "1", title: "Senior Software Engineer" },
        { id: "2", title: "Product Manager" },
        { id: "3", title: "Data Scientist" }
    ];
    const updateApplicantStatus = (applicantId, newStatus) => {
        // Handle status update
        console.log(`Updating applicant ${applicantId} status to ${newStatus}`);
    };
    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return 'status-pending';
            case 'shortlisted':
            case 'interviewed':
                return 'status-approved';
            case 'rejected':
                return 'status-rejected';
            case 'selected':
                return 'status-approved';
            default:
                return 'status-pending';
        }
    };
    const getStatusIcon = (status) => {
        switch (status) {
            case 'pending':
                return <Clock className="w-4 h-4"/>;
            case 'shortlisted':
            case 'interviewed':
            case 'selected':
                return <CheckCircle className="w-4 h-4"/>;
            case 'rejected':
                return <XCircle className="w-4 h-4"/>;
            default:
                return <Clock className="w-4 h-4"/>;
        }
    };
    const filteredApplicants = applicants.filter(applicant => {
        const matchesSearch = applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            applicant.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
            applicant.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesStatus = statusFilter === "all" || applicant.status === statusFilter;
        const matchesJob = selectedJob === "all" || applicant.position === jobs.find(j => j.id === selectedJob)?.title;
        return matchesSearch && matchesStatus && matchesJob;
    });
    return (<div className="space-y-6">
      {/* Header */}
      <Card className="card-elevated p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold">Applicant Management</h2>
            <p className="text-muted-foreground">
              Manage and review applications for your job postings
            </p>
          </div>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2"/>
            Export Data
          </Button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground"/>
            <input type="text" placeholder="Search applicants..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-smooth"/>
          </div>

          <select value={selectedJob} onChange={(e) => setSelectedJob(e.target.value)} className="p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-smooth">
            {jobs.map(job => (<option key={job.id} value={job.id}>{job.title}</option>))}
          </select>

          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-smooth">
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="shortlisted">Shortlisted</option>
            <option value="interviewed">Interviewed</option>
            <option value="selected">Selected</option>
            <option value="rejected">Rejected</option>
          </select>

          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2"/>
            More Filters
          </Button>
        </div>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {[
            { label: "Total Applications", value: applicants.length, color: "text-primary" },
            { label: "Pending Review", value: applicants.filter(a => a.status === "pending").length, color: "text-warning" },
            { label: "Shortlisted", value: applicants.filter(a => a.status === "shortlisted").length, color: "text-success" },
            { label: "Interviewed", value: applicants.filter(a => a.status === "interviewed").length, color: "text-accent" },
            { label: "Selected", value: applicants.filter(a => a.status === "selected").length, color: "text-success" }
        ].map((stat, index) => (<Card key={index} className="card-elevated p-4 text-center">
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </Card>))}
      </div>

      {/* Applicants Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredApplicants.map((applicant) => (<Card key={applicant.id} className="card-elevated p-6 hover:shadow-glow transition-smooth">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {applicant.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">{applicant.name}</h3>
                  <p className="text-primary font-medium">{applicant.position}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                    <div className="flex items-center gap-1">
                      <GraduationCap className="w-4 h-4"/>
                      {applicant.university}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4"/>
                      {applicant.location}
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-4 h-4 text-warning"/>
                  <span className="font-medium">{applicant.resumeScore}%</span>
                </div>
                <Badge className={getStatusColor(applicant.status)}>
                  {getStatusIcon(applicant.status)}
                  <span className="ml-1 capitalize">{applicant.status}</span>
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div>
                <p className="text-muted-foreground">Branch</p>
                <p className="font-medium">{applicant.branch}</p>
              </div>
              <div>
                <p className="text-muted-foreground">CGPA</p>
                <p className="font-medium">{applicant.cgpa}/10</p>
              </div>
              <div>
                <p className="text-muted-foreground">Experience</p>
                <p className="font-medium">{applicant.experience}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Projects</p>
                <p className="font-medium">{applicant.projects}</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-2">Skills</p>
              <div className="flex flex-wrap gap-1">
                {applicant.skills.slice(0, 4).map((skill) => (<Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>))}
                {applicant.skills.length > 4 && (<Badge variant="secondary" className="text-xs">
                    +{applicant.skills.length - 4}
                  </Badge>)}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3"/>
                Applied: {new Date(applicant.appliedDate).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Mail className="w-3 h-3"/>
                  {applicant.email}
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="w-3 h-3"/>
                  {applicant.phone}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-2"/>
                View Profile
              </Button>
              
              <div className="flex items-center gap-2">
                {applicant.status === "pending" && (<>
                    <Button variant="outline" size="sm" onClick={() => updateApplicantStatus(applicant.id, "rejected")} className="text-destructive hover:text-destructive">
                      <XCircle className="w-4 h-4 mr-1"/>
                      Reject
                    </Button>
                    <Button size="sm" onClick={() => updateApplicantStatus(applicant.id, "shortlisted")} className="btn-gradient">
                      <CheckCircle className="w-4 h-4 mr-1"/>
                      Shortlist
                    </Button>
                  </>)}
                
                {applicant.status === "shortlisted" && (<>
                    <Button variant="outline" size="sm" onClick={() => updateApplicantStatus(applicant.id, "rejected")} className="text-destructive hover:text-destructive">
                      Reject
                    </Button>
                    <Button size="sm" onClick={() => updateApplicantStatus(applicant.id, "interviewed")} className="btn-gradient">
                      Interview
                    </Button>
                  </>)}
                
                {applicant.status === "interviewed" && (<>
                    <Button variant="outline" size="sm" onClick={() => updateApplicantStatus(applicant.id, "rejected")} className="text-destructive hover:text-destructive">
                      Reject
                    </Button>
                    <Button size="sm" onClick={() => updateApplicantStatus(applicant.id, "selected")} className="btn-gradient">
                      Select
                    </Button>
                  </>)}
              </div>
            </div>
          </Card>))}
      </div>

      {filteredApplicants.length === 0 && (<Card className="card-elevated p-8 text-center">
          <Search className="w-12 h-12 mx-auto mb-4 text-muted-foreground"/>
          <h3 className="text-lg font-medium mb-2">No applicants found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search criteria or filters
          </p>
        </Card>)}
    </div>);
};
export default ApplicantManagement;
