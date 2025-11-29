import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, DollarSign, Clock, Building2, Briefcase } from "lucide-react";

const JobDetailsDialog = ({ job, open, onOpenChange, onApply }) => {
    if (!job) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <div className="flex items-center gap-4 mb-2">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center text-xl font-bold text-primary">
                            <Building2 className="w-6 h-6" />
                        </div>
                        <div>
                            <DialogTitle className="text-xl">{job.title}</DialogTitle>
                            <DialogDescription className="flex items-center gap-2">
                                {job.company} • {job.department || "Engineering"}
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <div className="grid gap-6 py-4">
                    <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" /> {job.location}
                        </Badge>
                        <Badge variant="secondary" className="flex items-center gap-1">
                            <DollarSign className="w-3 h-3" /> {job.salary}
                        </Badge>
                        <Badge variant="secondary" className="flex items-center gap-1">
                            <Briefcase className="w-3 h-3" /> {job.type || "Full-time"}
                        </Badge>
                        <Badge variant="secondary" className="flex items-center gap-1">
                            <Clock className="w-3 h-3" /> Posted: {job.posted ? new Date(job.posted).toLocaleDateString() : "Recently"}
                        </Badge>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <h4 className="font-medium mb-2">About the Role</h4>
                            <p className="text-sm text-muted-foreground">
                                We are looking for a talented {job.title} to join our team.
                                You will be responsible for developing high-quality software solutions
                                and working with cross-functional teams to deliver exceptional results.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-medium mb-2">Requirements</h4>
                            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                                <li>Bachelor's degree in Computer Science or related field</li>
                                <li>Strong proficiency in {job.skills ? job.skills.join(", ") : "relevant technologies"}</li>
                                <li>Excellent problem-solving and communication skills</li>
                                <li>Ability to work in a fast-paced environment</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <DialogFooter className="flex gap-2 sm:justify-end">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
                    {onApply && (
                        <Button className="btn-gradient" onClick={() => {
                            onOpenChange(false);
                            onApply(job);
                        }}>
                            Apply Now
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default JobDetailsDialog;
