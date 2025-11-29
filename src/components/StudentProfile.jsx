import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Calendar, GraduationCap, Award, Edit, Download, Upload, Save, X } from "lucide-react";
import { storage } from "@/services/storage";
import { toast } from "sonner";

const StudentProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Default data structure to ensure UI doesn't break if storage user is minimal
  const defaultData = {
    name: "Alex Kumar",
    email: "alex.kumar@college.edu",
    phone: "+91 9876543210",
    location: "Mumbai, Maharashtra",
    branch: "Computer Science Engineering",
    year: "Final Year (4th)",
    cgpa: "8.5",
    skills: ["React", "Node.js", "Python", "Machine Learning", "AWS", "Docker"],
    achievements: ["Dean's List 2023", "Hackathon Winner", "Google Summer of Code"],
    projects: [
      {
        name: "E-commerce Platform",
        tech: ["React", "Node.js", "MongoDB"],
        description: "Full-stack web application with payment integration"
      },
      {
        name: "ML Price Predictor",
        tech: ["Python", "TensorFlow", "Flask"],
        description: "Machine learning model for real estate price prediction"
      }
    ]
  };

  const [profileData, setProfileData] = useState(defaultData);

  useEffect(() => {
    const currentUser = storage.getCurrentUser();
    if (currentUser) {
      // Merge stored user data with default structure
      // This ensures we have the ID and Role from storage, but rich data for the UI
      // If the stored user already has these fields (after an edit), they will take precedence
      setProfileData(prev => ({ ...prev, ...currentUser }));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      // Update in storage
      // Note: We need to ensure we are updating the correct user. 
      // If profileData came from storage, it has an ID.
      if (profileData.id) {
        storage.updateUser(profileData);
        // Also update current user session
        localStorage.setItem("placement_sys_current_user", JSON.stringify(profileData));
      } else {
        // Fallback for demo mode without real login
        console.warn("No user ID found, changes only local to component state");
      }

      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update profile: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    // Revert changes by re-fetching from storage or just toggling off (if we want to discard unsaved)
    // For simplicity, we'll just re-fetch to be safe
    const currentUser = storage.getCurrentUser();
    if (currentUser) {
      setProfileData(prev => ({ ...defaultData, ...currentUser }));
    }
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="card-elevated p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start gap-6 w-full">
            <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white text-2xl font-bold shrink-0">
              {profileData.name.split(' ').map(n => n[0]).join('')}
            </div>

            <div className="flex-1 space-y-4">
              {isEditing ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" name="name" value={profileData.name} onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="branch">Branch</Label>
                    <Input id="branch" name="branch" value={profileData.branch} onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="year">Year</Label>
                    <Input id="year" name="year" value={profileData.year} onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" name="location" value={profileData.location} onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" value={profileData.email} onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" name="phone" value={profileData.phone} onChange={handleInputChange} />
                  </div>
                </div>
              ) : (
                <div>
                  <h2 className="text-2xl font-bold mb-2">{profileData.name}</h2>
                  <p className="text-primary font-medium mb-1">{profileData.branch}</p>
                  <p className="text-muted-foreground mb-3">{profileData.year}</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      {profileData.email}
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="w-4 h-4" />
                      {profileData.phone}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {profileData.location}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 ml-4">
            {!isEditing ? (
              <>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Resume
                </Button>
                <Button className="btn-gradient" size="sm" onClick={() => setIsEditing(true)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={handleCancel} disabled={loading}>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button className="btn-gradient" size="sm" onClick={handleSave} disabled={loading}>
                  <Save className="w-4 h-4 mr-2" />
                  {loading ? "Saving..." : "Save"}
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Academic Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-secondary/20 rounded-lg">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <GraduationCap className="w-6 h-6 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">Current CGPA</p>
            {isEditing ? (
              <Input
                name="cgpa"
                value={profileData.cgpa}
                onChange={handleInputChange}
                className="text-center font-bold mt-1 w-24 mx-auto"
              />
            ) : (
              <p className="text-2xl font-bold text-primary">{profileData.cgpa}</p>
            )}
          </div>

          <div className="text-center p-4 bg-secondary/20 rounded-lg">
            <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <Calendar className="w-6 h-6 text-success" />
            </div>
            <p className="text-sm text-muted-foreground">Academic Year</p>
            <p className="text-lg font-semibold">{profileData.year}</p>
          </div>

          <div className="text-center p-4 bg-secondary/20 rounded-lg">
            <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <Award className="w-6 h-6 text-warning" />
            </div>
            <p className="text-sm text-muted-foreground">Achievements</p>
            <p className="text-lg font-semibold">{profileData.achievements?.length || 0}</p>
          </div>
        </div>
      </Card>

      {/* Skills & Expertise */}
      <Card className="card-elevated p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Skills & Expertise</h3>
          <Button variant="outline" size="sm">
            <Edit className="w-4 h-4 mr-2" />
            Edit Skills
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {profileData.skills?.map((skill) => (
            <Badge key={skill} variant="secondary" className="px-3 py-1">
              {skill}
            </Badge>
          ))}
        </div>
      </Card>

      {/* Projects */}
      <Card className="card-elevated p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Projects</h3>
          <Button variant="outline" size="sm">
            <Edit className="w-4 h-4 mr-2" />
            Add Project
          </Button>
        </div>
        <div className="space-y-4">
          {profileData.projects?.map((project, index) => (
            <div key={index} className="p-4 border border-border rounded-lg">
              <h4 className="font-semibold mb-2">{project.name}</h4>
              <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
              <div className="flex flex-wrap gap-1">
                {project.tech.map((tech) => (
                  <Badge key={tech} variant="outline" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Achievements */}
      <Card className="card-elevated p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Achievements</h3>
          <Button variant="outline" size="sm">
            <Edit className="w-4 h-4 mr-2" />
            Add Achievement
          </Button>
        </div>
        <div className="space-y-2">
          {profileData.achievements?.map((achievement, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-secondary/20 rounded-lg">
              <Award className="w-5 h-5 text-warning" />
              <span className="font-medium">{achievement}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Resume Upload */}
      <Card className="card-elevated p-6">
        <h3 className="text-xl font-bold mb-4">Resume</h3>
        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
          <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-lg font-medium mb-2">Upload New Resume</p>
          <p className="text-sm text-muted-foreground mb-4">
            Drag and drop your resume here, or click to browse
          </p>
          <Button variant="outline">
            Choose File
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default StudentProfile;
