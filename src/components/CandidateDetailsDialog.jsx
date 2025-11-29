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
import { GraduationCap, Mail, Phone, MapPin, Download, FileText } from "lucide-react";

const CandidateDetailsDialog = ({ candidate, open, onOpenChange }) => {
    if (!candidate) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <div className="flex items-center gap-4 mb-2">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl font-bold text-white">
                            {candidate.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                            <DialogTitle className="text-xl">{candidate.name}</DialogTitle>
                            <DialogDescription>
                                {candidate.position} Applicant
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <div className="grid gap-6 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-muted-foreground">University</p>
                            <div className="flex items-center gap-2">
                                <GraduationCap className="w-4 h-4 text-primary" />
                                <span>{candidate.university}</span>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-muted-foreground">GPA</p>
                            <p className="font-semibold">{candidate.gpa} / 10.0</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-muted-foreground">Email</p>
                            <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-primary" />
                                <span>{candidate.email || "email@example.com"}</span>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-muted-foreground">Location</p>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-primary" />
                                <span>{candidate.location || "Bangalore, India"}</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-medium mb-2">Skills</h4>
                        <div className="flex flex-wrap gap-2">
                            {candidate.skills.map((skill) => (
                                <Badge key={skill} variant="secondary">{skill}</Badge>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-medium mb-2">Resume Analysis</h4>
                        <div className="bg-secondary/20 p-4 rounded-lg space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium">Match Score</span>
                                <Badge variant={candidate.resumeScore >= 90 ? "default" : "secondary"}>
                                    {candidate.resumeScore}%
                                </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Strong match for the {candidate.position} role. Excellent academic record and relevant project experience.
                            </p>
                        </div>
                    </div>
                </div>

                <DialogFooter className="flex gap-2 sm:justify-end">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
                    <Button variant="outline">
                        <Download className="w-4 h-4 mr-2" /> Resume
                    </Button>
                    <Button className="btn-gradient">Schedule Interview</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CandidateDetailsDialog;
