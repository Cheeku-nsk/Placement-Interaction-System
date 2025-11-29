import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Save, Send, Plus, X, MapPin, DollarSign, Calendar, Users, GraduationCap } from "lucide-react";
const JobPostForm = ({ onClose }) => {
    const [formData, setFormData] = useState({
        title: "",
        department: "",
        location: "",
        jobType: "Full-time",
        salaryMin: "",
        salaryMax: "",
        description: "",
        requirements: "",
        skills: [],
        eligibility: {
            branches: [],
            minCGPA: "",
            graduationYear: "",
        },
        applicationDeadline: "",
        interviewDate: "",
        positions: "1"
    });
    const [currentSkill, setCurrentSkill] = useState("");
    const [currentBranch, setCurrentBranch] = useState("");
    const availableBranches = [
        "Computer Science", "Information Technology", "Electronics & Communication",
        "Mechanical", "Civil", "Electrical", "Chemical", "Biotechnology"
    ];
    const addSkill = () => {
        if (currentSkill.trim() && !formData.skills.includes(currentSkill.trim())) {
            setFormData(prev => ({
                ...prev,
                skills: [...prev.skills, currentSkill.trim()]
            }));
            setCurrentSkill("");
        }
    };
    const removeSkill = (skill) => {
        setFormData(prev => ({
            ...prev,
            skills: prev.skills.filter(s => s !== skill)
        }));
    };
    const addBranch = (branch) => {
        if (!formData.eligibility.branches.includes(branch)) {
            setFormData(prev => ({
                ...prev,
                eligibility: {
                    ...prev.eligibility,
                    branches: [...prev.eligibility.branches, branch]
                }
            }));
        }
    };
    const removeBranch = (branch) => {
        setFormData(prev => ({
            ...prev,
            eligibility: {
                ...prev.eligibility,
                branches: prev.eligibility.branches.filter(b => b !== branch)
            }
        }));
    };
    const handleSubmit = (isDraft = false) => {
        // Handle form submission
        console.log("Submitting job post:", { ...formData, isDraft });
        if (onClose)
            onClose();
    };
    return (<div className="space-y-6">
      <Card className="card-elevated p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Post New Job</h2>
            <p className="text-muted-foreground">Create a new job posting for students</p>
          </div>
          {onClose && (<Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4"/>
            </Button>)}
        </div>

        {/* Basic Information */}
        <div className="space-y-4 mb-6">
          <h3 className="text-lg font-semibold">Basic Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Job Title *</label>
              <input type="text" value={formData.title} onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))} className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-smooth" placeholder="e.g. Software Engineer"/>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Department</label>
              <input type="text" value={formData.department} onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))} className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-smooth" placeholder="e.g. Engineering"/>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Location *</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground"/>
                <input type="text" value={formData.location} onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))} className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-smooth" placeholder="City, State"/>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Job Type *</label>
              <select value={formData.jobType} onChange={(e) => setFormData(prev => ({ ...prev, jobType: e.target.value }))} className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-smooth">
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Internship">Internship</option>
                <option value="Contract">Contract</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Positions</label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground"/>
                <input type="number" value={formData.positions} onChange={(e) => setFormData(prev => ({ ...prev, positions: e.target.value }))} className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-smooth" placeholder="Number of positions"/>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Salary Range (₹ LPA)</label>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground"/>
                  <input type="number" value={formData.salaryMin} onChange={(e) => setFormData(prev => ({ ...prev, salaryMin: e.target.value }))} className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-smooth" placeholder="Min"/>
                </div>
                <span className="text-muted-foreground">to</span>
                <div className="relative flex-1">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground"/>
                  <input type="number" value={formData.salaryMax} onChange={(e) => setFormData(prev => ({ ...prev, salaryMax: e.target.value }))} className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-smooth" placeholder="Max"/>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Application Deadline *</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground"/>
                <input type="date" value={formData.applicationDeadline} onChange={(e) => setFormData(prev => ({ ...prev, applicationDeadline: e.target.value }))} className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-smooth"/>
              </div>
            </div>
          </div>
        </div>

        {/* Job Description */}
        <div className="space-y-4 mb-6">
          <h3 className="text-lg font-semibold">Job Details</h3>
          
          <div>
            <label className="block text-sm font-medium mb-2">Job Description *</label>
            <textarea value={formData.description} onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))} rows={6} className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-smooth" placeholder="Describe the role, responsibilities, and what you're looking for..."/>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Requirements</label>
            <textarea value={formData.requirements} onChange={(e) => setFormData(prev => ({ ...prev, requirements: e.target.value }))} rows={4} className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-smooth" placeholder="List specific requirements, qualifications, and experience needed..."/>
          </div>
        </div>

        {/* Skills */}
        <div className="space-y-4 mb-6">
          <h3 className="text-lg font-semibold">Required Skills</h3>
          
          <div className="flex items-center gap-2">
            <input type="text" value={currentSkill} onChange={(e) => setCurrentSkill(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())} className="flex-1 p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-smooth" placeholder="Add a skill..."/>
            <Button onClick={addSkill} size="sm">
              <Plus className="w-4 h-4"/>
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {formData.skills.map((skill) => (<Badge key={skill} variant="secondary" className="px-3 py-1">
                {skill}
                <button onClick={() => removeSkill(skill)} className="ml-2 hover:text-destructive">
                  <X className="w-3 h-3"/>
                </button>
              </Badge>))}
          </div>
        </div>

        {/* Eligibility Criteria */}
        <div className="space-y-4 mb-6">
          <h3 className="text-lg font-semibold">Eligibility Criteria</h3>
          
          <div>
            <label className="block text-sm font-medium mb-2">Eligible Branches</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {availableBranches.map((branch) => (<Button key={branch} variant={formData.eligibility.branches.includes(branch) ? "default" : "outline"} size="sm" onClick={() => formData.eligibility.branches.includes(branch)
                ? removeBranch(branch)
                : addBranch(branch)}>
                  {branch}
                </Button>))}
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.eligibility.branches.map((branch) => (<Badge key={branch} className="status-approved">
                  <GraduationCap className="w-3 h-3 mr-1"/>
                  {branch}
                  <button onClick={() => removeBranch(branch)} className="ml-2 hover:text-destructive">
                    <X className="w-3 h-3"/>
                  </button>
                </Badge>))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Minimum CGPA</label>
              <input type="number" step="0.1" min="0" max="10" value={formData.eligibility.minCGPA} onChange={(e) => setFormData(prev => ({
            ...prev,
            eligibility: { ...prev.eligibility, minCGPA: e.target.value }
        }))} className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-smooth" placeholder="e.g. 7.0"/>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Graduation Year</label>
              <input type="text" value={formData.eligibility.graduationYear} onChange={(e) => setFormData(prev => ({
            ...prev,
            eligibility: { ...prev.eligibility, graduationYear: e.target.value }
        }))} className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-smooth" placeholder="e.g. 2024"/>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-4 pt-6 border-t border-border">
          <Button variant="outline" onClick={() => handleSubmit(true)}>
            <Save className="w-4 h-4 mr-2"/>
            Save as Draft
          </Button>
          <Button className="btn-gradient" onClick={() => handleSubmit(false)}>
            <Send className="w-4 h-4 mr-2"/>
            Post Job
          </Button>
        </div>
      </Card>
    </div>);
};
export default JobPostForm;
