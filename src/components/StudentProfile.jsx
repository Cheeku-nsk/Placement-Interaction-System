import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Calendar, GraduationCap, Award, Edit, Download, Upload } from "lucide-react";
const StudentProfile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const studentData = {
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
    return (<div className="space-y-6">
      {/* Profile Header */}
      <Card className="card-elevated p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {studentData.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">{studentData.name}</h2>
              <p className="text-primary font-medium mb-1">{studentData.branch}</p>
              <p className="text-muted-foreground mb-3">{studentData.year}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Mail className="w-4 h-4"/>
                  {studentData.email}
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="w-4 h-4"/>
                  {studentData.phone}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4"/>
                  {studentData.location}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2"/>
              Download Resume
            </Button>
            <Button className="btn-gradient" size="sm" onClick={() => setIsEditing(!isEditing)}>
              <Edit className="w-4 h-4 mr-2"/>
              Edit Profile
            </Button>
          </div>
        </div>

        {/* Academic Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-secondary/20 rounded-lg">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <GraduationCap className="w-6 h-6 text-primary"/>
            </div>
            <p className="text-sm text-muted-foreground">Current CGPA</p>
            <p className="text-2xl font-bold text-primary">{studentData.cgpa}</p>
          </div>
          
          <div className="text-center p-4 bg-secondary/20 rounded-lg">
            <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <Calendar className="w-6 h-6 text-success"/>
            </div>
            <p className="text-sm text-muted-foreground">Academic Year</p>
            <p className="text-lg font-semibold">{studentData.year}</p>
          </div>
          
          <div className="text-center p-4 bg-secondary/20 rounded-lg">
            <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <Award className="w-6 h-6 text-warning"/>
            </div>
            <p className="text-sm text-muted-foreground">Achievements</p>
            <p className="text-lg font-semibold">{studentData.achievements.length}</p>
          </div>
        </div>
      </Card>

      {/* Skills & Expertise */}
      <Card className="card-elevated p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Skills & Expertise</h3>
          <Button variant="outline" size="sm">
            <Edit className="w-4 h-4 mr-2"/>
            Edit Skills
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {studentData.skills.map((skill) => (<Badge key={skill} variant="secondary" className="px-3 py-1">
              {skill}
            </Badge>))}
        </div>
      </Card>

      {/* Projects */}
      <Card className="card-elevated p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Projects</h3>
          <Button variant="outline" size="sm">
            <Edit className="w-4 h-4 mr-2"/>
            Add Project
          </Button>
        </div>
        <div className="space-y-4">
          {studentData.projects.map((project, index) => (<div key={index} className="p-4 border border-border rounded-lg">
              <h4 className="font-semibold mb-2">{project.name}</h4>
              <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
              <div className="flex flex-wrap gap-1">
                {project.tech.map((tech) => (<Badge key={tech} variant="outline" className="text-xs">
                    {tech}
                  </Badge>))}
              </div>
            </div>))}
        </div>
      </Card>

      {/* Achievements */}
      <Card className="card-elevated p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Achievements</h3>
          <Button variant="outline" size="sm">
            <Edit className="w-4 h-4 mr-2"/>
            Add Achievement
          </Button>
        </div>
        <div className="space-y-2">
          {studentData.achievements.map((achievement, index) => (<div key={index} className="flex items-center gap-3 p-3 bg-secondary/20 rounded-lg">
              <Award className="w-5 h-5 text-warning"/>
              <span className="font-medium">{achievement}</span>
            </div>))}
        </div>
      </Card>

      {/* Resume Upload */}
      <Card className="card-elevated p-6">
        <h3 className="text-xl font-bold mb-4">Resume</h3>
        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
          <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground"/>
          <p className="text-lg font-medium mb-2">Upload New Resume</p>
          <p className="text-sm text-muted-foreground mb-4">
            Drag and drop your resume here, or click to browse
          </p>
          <Button variant="outline">
            Choose File
          </Button>
        </div>
      </Card>
    </div>);
};
export default StudentProfile;
