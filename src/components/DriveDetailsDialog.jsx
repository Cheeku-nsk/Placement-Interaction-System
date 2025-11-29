import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Calendar, Building2, Users, MapPin, Clock, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const DriveDetailsDialog = ({ drive, open, onOpenChange }) => {
    if (!drive) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <div className="flex items-center gap-4 mb-2">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center text-xl font-bold text-primary">
                            {drive.logo || drive.company.charAt(0)}
                        </div>
                        <div>
                            <DialogTitle className="text-xl">{drive.company}</DialogTitle>
                            <DialogDescription>{drive.role}</DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <div className="grid gap-6 py-4">
                    <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-sm">
                            {drive.type || "On-Campus"}
                        </Badge>
                        <Badge className={
                            drive.status === 'confirmed' || drive.status === 'Open' ? 'status-approved' :
                                drive.status === 'Upcoming' ? 'bg-blue-100 text-blue-800' : 'status-pending'
                        }>
                            {drive.status}
                        </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 text-sm">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <div>
                                <p className="font-medium">Date</p>
                                <p className="text-muted-foreground">{new Date(drive.date).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <div>
                                <p className="font-medium">Time</p>
                                <p className="text-muted-foreground">{drive.time || "10:00 AM"}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            <div>
                                <p className="font-medium">Venue</p>
                                <p className="text-muted-foreground">{drive.venue || "TBD"}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                            <Users className="w-4 h-4 text-muted-foreground" />
                            <div>
                                <p className="font-medium">Applicants</p>
                                <p className="text-muted-foreground">{drive.registered || drive.applicants || 0} Registered</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h4 className="font-medium flex items-center gap-2">
                            <FileText className="w-4 h-4" /> Description
                        </h4>
                        <p className="text-sm text-muted-foreground">
                            This is a placement drive for the position of {drive.role}.
                            Eligible students from Computer Science and related branches can apply.
                            Please ensure your profile is updated before applying.
                        </p>
                    </div>
                </div>

                <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
                    <Button className="btn-gradient">Edit Drive</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default DriveDetailsDialog;
