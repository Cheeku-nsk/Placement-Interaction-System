import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart3, PieChart, TrendingUp, Download, Filter, Calendar, Building2, GraduationCap, DollarSign, Users, Award } from "lucide-react";
const PlacementReports = () => {
    const [selectedPeriod, setSelectedPeriod] = useState("current_year");
    const [selectedBranch, setSelectedBranch] = useState("all");
    // Mock data for charts and statistics
    const placementStats = {
        totalStudents: 1247,
        placedStudents: 892,
        placementPercentage: 71.5,
        averagePackage: 8.2,
        highestPackage: 45.0,
        companies: 89,
        activeOffers: 156
    };
    const branchWiseData = [
        { branch: "Computer Science", total: 280, placed: 245, percentage: 87.5, avgPackage: 12.4 },
        { branch: "Information Technology", total: 220, placed: 185, percentage: 84.1, avgPackage: 10.8 },
        { branch: "Electronics & Comm", total: 180, placed: 128, percentage: 71.1, avgPackage: 7.9 },
        { branch: "Mechanical", total: 200, placed: 135, percentage: 67.5, avgPackage: 6.8 },
        { branch: "Civil", total: 150, placed: 95, percentage: 63.3, avgPackage: 5.9 },
        { branch: "Electrical", total: 117, placed: 74, percentage: 63.2, avgPackage: 6.2 },
        { branch: "Chemical", total: 100, placed: 30, percentage: 30.0, avgPackage: 5.5 }
    ];
    const topCompanies = [
        { name: "TCS", hired: 45, package: "₹7.2 LPA", type: "Mass Recruiter" },
        { name: "Infosys", hired: 38, package: "₹6.8 LPA", type: "Mass Recruiter" },
        { name: "Microsoft", hired: 12, package: "₹18.5 LPA", type: "Dream Company" },
        { name: "Amazon", hired: 15, package: "₹16.2 LPA", type: "Dream Company" },
        { name: "Google", hired: 8, package: "₹22.4 LPA", type: "Super Dream" },
        { name: "Wipro", hired: 25, package: "₹6.5 LPA", type: "Mass Recruiter" },
        { name: "Cognizant", hired: 32, package: "₹5.8 LPA", type: "Mass Recruiter" },
        { name: "Goldman Sachs", hired: 6, package: "₹28.0 LPA", type: "Super Dream" }
    ];
    const monthlyTrends = [
        { month: "Aug 2023", applications: 120, placements: 25 },
        { month: "Sep 2023", applications: 280, placements: 65 },
        { month: "Oct 2023", applications: 450, placements: 125 },
        { month: "Nov 2023", applications: 380, placements: 145 },
        { month: "Dec 2023", applications: 320, placements: 180 },
        { month: "Jan 2024", applications: 280, placements: 200 },
        { month: "Feb 2024", applications: 150, placements: 152 }
    ];
    const getCompanyTypeColor = (type) => {
        switch (type) {
            case 'Super Dream':
                return 'status-approved';
            case 'Dream Company':
                return 'status-pending';
            case 'Mass Recruiter':
                return 'bg-secondary text-secondary-foreground';
            default:
                return 'status-pending';
        }
    };
    return (<div className="space-y-6">
      {/* Header */}
      <Card className="card-elevated p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold">Placement Reports & Analytics</h2>
            <p className="text-muted-foreground">
              Comprehensive placement statistics and performance metrics
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2"/>
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2"/>
              Export Report
            </Button>
          </div>
        </div>

        {/* Period Selector */}
        <div className="flex items-center gap-4">
          <Calendar className="w-5 h-5 text-muted-foreground"/>
          <div className="flex items-center gap-2">
            {["current_year", "last_year", "custom"].map((period) => (<Button key={period} variant={selectedPeriod === period ? "default" : "outline"} size="sm" onClick={() => setSelectedPeriod(period)}>
                {period === "current_year" ? "Current Year" :
                period === "last_year" ? "Last Year" : "Custom Range"}
              </Button>))}
          </div>
        </div>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="card-elevated p-6 text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-8 h-8 text-primary"/>
          </div>
          <h3 className="text-3xl font-bold text-primary mb-2">
            {placementStats.placementPercentage}%
          </h3>
          <p className="text-muted-foreground">Overall Placement Rate</p>
          <p className="text-sm text-success mt-1">+5.2% from last year</p>
        </Card>

        <Card className="card-elevated p-6 text-center">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-success"/>
          </div>
          <h3 className="text-3xl font-bold text-success mb-2">
            {placementStats.placedStudents}
          </h3>
          <p className="text-muted-foreground">Students Placed</p>
          <p className="text-sm text-muted-foreground mt-1">
            out of {placementStats.totalStudents} total
          </p>
        </Card>

        <Card className="card-elevated p-6 text-center">
          <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <DollarSign className="w-8 h-8 text-warning"/>
          </div>
          <h3 className="text-3xl font-bold text-warning mb-2">
            ₹{placementStats.averagePackage} LPA
          </h3>
          <p className="text-muted-foreground">Average Package</p>
          <p className="text-sm text-warning mt-1">
            Highest: ₹{placementStats.highestPackage} LPA
          </p>
        </Card>

        <Card className="card-elevated p-6 text-center">
          <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-8 h-8 text-accent"/>
          </div>
          <h3 className="text-3xl font-bold text-accent mb-2">
            {placementStats.companies}
          </h3>
          <p className="text-muted-foreground">Partner Companies</p>
          <p className="text-sm text-accent mt-1">
            {placementStats.activeOffers} active offers
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Branch-wise Performance */}
        <Card className="card-elevated p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">Branch-wise Placement Performance</h3>
            <BarChart3 className="w-5 h-5 text-muted-foreground"/>
          </div>
          
          <div className="space-y-4">
            {branchWiseData.map((branch, index) => (<div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{branch.branch}</p>
                    <p className="text-sm text-muted-foreground">
                      {branch.placed}/{branch.total} students • ₹{branch.avgPackage} LPA avg
                    </p>
                  </div>
                  <Badge className={branch.percentage >= 80 ? 'status-approved' :
                branch.percentage >= 60 ? 'status-pending' : 'status-rejected'}>
                    {branch.percentage}%
                  </Badge>
                </div>
                <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                  <div className={`h-full transition-all duration-300 ${branch.percentage >= 80 ? 'bg-success' :
                branch.percentage >= 60 ? 'bg-warning' : 'bg-destructive'}`} style={{ width: `${branch.percentage}%` }}/>
                </div>
              </div>))}
          </div>
        </Card>

        {/* Top Recruiting Companies */}
        <Card className="card-elevated p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">Top Recruiting Companies</h3>
            <Award className="w-5 h-5 text-muted-foreground"/>
          </div>
          
          <div className="space-y-4">
            {topCompanies.map((company, index) => (<div key={index} className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold">{company.name}</h4>
                    <p className="text-sm text-muted-foreground">{company.package}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={getCompanyTypeColor(company.type)}>
                    {company.type}
                  </Badge>
                  <p className="text-sm font-medium mt-1">{company.hired} hired</p>
                </div>
              </div>))}
          </div>
        </Card>
      </div>

      {/* Monthly Trends */}
      <Card className="card-elevated p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">Monthly Placement Trends</h3>
          <PieChart className="w-5 h-5 text-muted-foreground"/>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          {monthlyTrends.map((month, index) => (<div key={index} className="text-center p-4 bg-secondary/20 rounded-lg">
              <p className="text-xs text-muted-foreground mb-2">{month.month}</p>
              <div className="space-y-1">
                <div>
                  <p className="text-lg font-bold text-primary">{month.placements}</p>
                  <p className="text-xs text-muted-foreground">Placements</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-warning">{month.applications}</p>
                  <p className="text-xs text-muted-foreground">Applications</p>
                </div>
              </div>
              <div className="mt-2">
                <div className="w-full bg-secondary h-1 rounded-full overflow-hidden">
                  <div className="h-full bg-primary transition-all duration-300" style={{
                width: `${Math.min((month.placements / month.applications) * 100, 100)}%`
            }}/>
                </div>
              </div>
            </div>))}
        </div>
      </Card>

      {/* Summary Actions */}
      <Card className="card-elevated p-6">
        <h3 className="text-xl font-bold mb-4">Generate Detailed Reports</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="outline" className="justify-start h-auto p-4">
            <GraduationCap className="w-5 h-5 mr-3"/>
            <div className="text-left">
              <p className="font-medium">Student Performance Report</p>
              <p className="text-xs text-muted-foreground">Individual placement records</p>
            </div>
          </Button>
          
          <Button variant="outline" className="justify-start h-auto p-4">
            <Building2 className="w-5 h-5 mr-3"/>
            <div className="text-left">
              <p className="font-medium">Company Engagement Report</p>
              <p className="text-xs text-muted-foreground">Recruiter statistics</p>
            </div>
          </Button>
          
          <Button variant="outline" className="justify-start h-auto p-4">
            <BarChart3 className="w-5 h-5 mr-3"/>
            <div className="text-left">
              <p className="font-medium">Department Analysis</p>
              <p className="text-xs text-muted-foreground">Branch-wise deep dive</p>
            </div>
          </Button>
        </div>
      </Card>
    </div>);
};
export default PlacementReports;
