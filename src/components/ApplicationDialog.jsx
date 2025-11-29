import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { CheckCircle } from "lucide-react";

const ApplicationDialog = ({ job, open, onOpenChange, onSubmit }) => {
    const [submitted, setSubmitted] = useState(false);

    if (!job) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit({
                resume: "resume.pdf", // Mock file
                coverLetter: e.target.coverLetter.value,
                portfolio: e.target.portfolio.value
            });
        } else {
            // Fallback simulation
            setTimeout(() => {
                setSubmitted(true);
            }, 1000);
        }
    };

    const handleClose = () => {
        setSubmitted(false);
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[500px]">
                {!submitted ? (
                    <form onSubmit={handleSubmit}>
                        <DialogHeader>
                            <DialogTitle>Apply for {job.title}</DialogTitle>
                            <DialogDescription>
                                Submit your application for the position at {job.company}.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="resume">Resume/CV</Label>
                                <Input id="resume" type="file" required />
                                <p className="text-xs text-muted-foreground">Upload your resume in PDF format (Max 5MB)</p>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="coverLetter">Cover Letter (Optional)</Label>
                                <Textarea id="coverLetter" placeholder="Why are you a good fit for this role?" />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="portfolio">Portfolio URL (Optional)</Label>
                                <Input id="portfolio" type="url" placeholder="https://..." />
                            </div>
                        </div>

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={handleClose}>Cancel</Button>
                            <Button type="submit" className="btn-gradient">Submit Application</Button>
                        </DialogFooter>
                    </form>
                ) : (
                    <div className="py-6 text-center space-y-4">
                        <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
                            <CheckCircle className="w-8 h-8 text-success" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold">Application Submitted!</h3>
                            <p className="text-muted-foreground mt-2">
                                Your application for {job.title} at {job.company} has been sent successfully.
                            </p>
                        </div>
                        <Button onClick={handleClose} className="mt-4">Close</Button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default ApplicationDialog;
