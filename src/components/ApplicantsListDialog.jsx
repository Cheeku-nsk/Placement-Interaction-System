import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const ApplicantsListDialog = ({ drive, open, onOpenChange }) => {
    if (!drive) return null;

    // Mock applicants data
    const applicants = [
        { id: 1, name: "Arjun Patel", branch: "CSE", cgpa: "8.5", status: "Shortlisted" },
        { id: 2, name: "Sneha Gupta", branch: "ECE", cgpa: "9.1", status: "Pending" },
        { id: 3, name: "Vikram Singh", branch: "CSE", cgpa: "7.8", status: "Rejected" },
        { id: 4, name: "Meera Reddy", branch: "IT", cgpa: "8.2", status: "Shortlisted" },
        { id: 5, name: "Rahul Kumar", branch: "CSE", cgpa: "8.9", status: "Pending" },
    ];

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[800px]">
                <DialogHeader>
                    <DialogTitle>Applicants for {drive.company}</DialogTitle>
                    <DialogDescription>
                        {drive.role} - {drive.registered || drive.applicants || 0} Total Applicants
                    </DialogDescription>
                </DialogHeader>

                <div className="flex items-center justify-between py-4">
                    <div className="relative w-64">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search applicants..." className="pl-8 bg-background/50" />
                    </div>
                    <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" /> Export List
                    </Button>
                </div>

                <div className="border rounded-md">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Branch</TableHead>
                                <TableHead>CGPA</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {applicants.map((applicant) => (
                                <TableRow key={applicant.id}>
                                    <TableCell className="font-medium">{applicant.name}</TableCell>
                                    <TableCell>{applicant.branch}</TableCell>
                                    <TableCell>{applicant.cgpa}</TableCell>
                                    <TableCell>
                                        <Badge variant={
                                            applicant.status === 'Shortlisted' ? 'default' :
                                                applicant.status === 'Rejected' ? 'destructive' : 'secondary'
                                        }>
                                            {applicant.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm">View Profile</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <div className="flex justify-end pt-4">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ApplicantsListDialog;
