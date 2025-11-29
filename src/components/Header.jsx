import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users, GraduationCap, Building2, ClipboardList, Menu, X, Bell, Search, LogOut } from "lucide-react";

const Header = ({ currentRole, activeTab, onNavigate }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const roles = [
    { id: 'admin', label: 'Admin', icon: Users },
    { id: 'student', label: 'Student', icon: GraduationCap },
    { id: 'employer', label: 'Employer', icon: Building2 },
    { id: 'placement-officer', label: 'Placement Officer', icon: ClipboardList }
  ];

  const currentRoleData = roles.find(role => role.id === currentRole);
  const Icon = currentRoleData?.icon || GraduationCap;

  const roleLinks = {
    student: [
      { id: "dashboard", label: "Jobs" },
      { id: "applications", label: "My Applications" },
      { id: "profile", label: "Profile" },
      { id: "notifications", label: "Notifications" },
    ],
    employer: [
      { id: "dashboard", label: "Dashboard" },
      { id: "post-job", label: "Post Job" },
      { id: "applicants", label: "Candidates" },
    ],
    "placement-officer": [
      { id: "dashboard", label: "Dashboard" },
      { id: "drives", label: "Drives" },
      { id: "reports", label: "Reports" },
    ],
    admin: [
      { id: "dashboard", label: "Overview" },
      { id: "users", label: "User Management" },
      { id: "activity", label: "Activity" },
    ],
  };

  const currentLinks = roleLinks[currentRole] || [];

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <header className="card-elevated sticky top-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onNavigate && onNavigate("dashboard")}>
          <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center shadow-glow">
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              PlacementHub
            </h1>
            <p className="text-xs text-muted-foreground">
              {currentRoleData?.label || "Campus Placement System"} Dashboard
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 mx-4">
          {currentLinks.map((link, index) => (
            <Button
              key={index}
              variant={activeTab === link.id ? "default" : "ghost"}
              size="sm"
              className="text-[15px] px-4 py-0 font-medium hover:bg-secondary/50"
              onClick={() => onNavigate && onNavigate(link.id)}
            >
              {link.label}
            </Button>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-3 ml-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input type="text" placeholder="Quick search..." className="pl-10 pr-4 py-2 bg-background/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-smooth" />
          </div>
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full"></span>
          </Button>
          <Button variant="outline" size="sm" onClick={handleLogout} className="ml-2">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center md:hidden space-x-2 ml-auto">
          <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-card/95 backdrop-blur-sm">
          <div className="container mx-auto p-4 space-y-4">
            <div className="space-y-2">
              {currentLinks.map((link, index) => (
                <Button
                  key={index}
                  variant={activeTab === link.id ? "default" : "ghost"}
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => {
                    onNavigate && onNavigate(link.id);
                    setIsMenuOpen(false);
                  }}
                >
                  {link.label}
                </Button>
              ))}
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type="text" placeholder="Quick search..." className="w-full pl-10 pr-4 py-2 bg-background/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-smooth" />
            </div>
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <Bell className="w-4 h-4 mr-3" />
              Notifications
            </Button>
            <Button variant="destructive" size="sm" className="w-full justify-start" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-3" />
              Logout
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
