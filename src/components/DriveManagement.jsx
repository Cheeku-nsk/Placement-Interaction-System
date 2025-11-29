import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
    Search,
    Plus,
    Filter,
    Calendar,
    Building2,
    Users,
    MoreVertical,
    Edit,
    Trash2,
    Eye
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DriveDetailsDialog from "@/components/DriveDetailsDialog";
import ApplicantsListDialog from "@/components/ApplicantsListDialog";

const DriveManagement = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [selectedDrive, setSelectedDrive] = useState(null);
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [applicantsOpen, setApplicantsOpen] = useState(false);

    // Mock data for drives
    const drives = [
        {
            id: 1,
            company: "Microsoft",
            role: "Software Engineer",
            date: "2024-01-20",
            type: "On-Campus",
            status: "Upcoming",
            applicants: 156,
            logo: "M"
        },
        {
            id: 2,
            company: "Amazon",
            role: "SDE Intern",
            date: "2024-01-22",
            type: "Virtual",
            status: "Open",
            applicants: 203,
            logo: "A"
        },
        {
            id: 3,
            company: "Google",
            role: "Product Manager",
            date: "2024-01-25",
            type: "On-Campus",
            status: "Draft",
            applicants: 0,
            logo: "G"
        },
        {
            id: 4,
            company: "TCS",
            role: "System Engineer",
            date: "2024-01-15",
            type: "On-Campus",
            status: "Completed",
            applicants: 450,
            logo: "T"
        }
    ];

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'upcoming': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'open': return 'bg-green-100 text-green-800 border-green-200';
            case 'completed': return 'bg-gray-100 text-gray-800 border-gray-200';
            case 'draft': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold">Drive Management</h2>
                    <p className="text-muted-foreground">Manage placement drives, schedules, and applications</p>
                </div>
                <Button className="btn-gradient">
                    <Plus className="w-4 h-4 mr-2" />
                    Schedule New Drive
                </Button>
            </div>

            {/* Filters and Search */}
            <Card className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Search drives by company or role..."
                            className="pl-10 bg-background/50"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" className="w-full md:w-auto">
                            <Filter className="w-4 h-4 mr-2" />
                            Filter
                        </Button>
                        <Button variant="outline" className="w-full md:w-auto">
                            <Calendar className="w-4 h-4 mr-2" />
                            Date
                        </Button>
                    </div>
                </div>
            </Card>

            {/* Drives Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {drives.map((drive) => (
                    <Card key={drive.id} className="card-elevated group hover:border-primary/50 transition-all duration-300">
                        <div className="p-6 space-y-4">
                            {/* Card Header */}
                            <div className="flex justify-between items-start">
                                <div className="flex gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center text-xl font-bold text-primary">
                                        {drive.logo}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">{drive.company}</h3>
                                        <p className="text-sm text-muted-foreground">{drive.role}</p>
                                    </div>
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <MoreVertical className="w-4 h-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={() => {
                                            setSelectedDrive(drive);
                                            setDetailsOpen(true);
                                        }}>
                                            <Eye className="w-4 h-4 mr-2" /> View Details
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Edit className="w-4 h-4 mr-2" /> Edit Drive
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="text-destructive">
                                            <Trash2 className="w-4 h-4 mr-2" /> Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>

                            {/* Status Badge */}
                            <div>
                                <Badge variant="outline" className={`${getStatusColor(drive.status)} border`}>
                                    {drive.status}
                                </Badge>
                            </div>

                            {/* Drive Details */}
                            <div className="space-y-2 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>{new Date(drive.date).toLocaleDateString()}</span>
                                    <span className="text-xs px-2 py-0.5 bg-secondary rounded-full">{drive.type}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users className="w-4 h-4" />
                                    <span>{drive.applicants} Applicants</span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="pt-4 border-t border-border/50 flex gap-2">
                                <Button variant="outline" className="flex-1" onClick={() => {
                                    setSelectedDrive(drive);
                                    setApplicantsOpen(true);
                                }}>
                                    View Applicants
                                </Button>
                                <Button className="flex-1 bg-secondary hover:bg-secondary/80 text-secondary-foreground">
                                    Manage
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <DriveDetailsDialog
                drive={selectedDrive}
                open={detailsOpen}
                onOpenChange={setDetailsOpen}
            />

            <ApplicantsListDialog
                drive={selectedDrive}
                open={applicantsOpen}
                onOpenChange={setApplicantsOpen}
            />
        </div>
    );
};

export default DriveManagement;
