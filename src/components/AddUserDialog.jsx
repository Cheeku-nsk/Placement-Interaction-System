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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const AddUserDialog = ({ open, onOpenChange }) => {
    const [role, setRole] = useState("student");

    const handleSubmit = (e) => {
        e.preventDefault();
        onOpenChange(false);
        // Logic to add user would go here
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Add New User</DialogTitle>
                        <DialogDescription>
                            Create a new account for a student, employer, or placement officer.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" placeholder="John Doe" required />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" type="email" placeholder="john@example.com" required />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="role">Role</Label>
                            <Select value={role} onValueChange={setRole}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="student">Student</SelectItem>
                                    <SelectItem value="employer">Employer</SelectItem>
                                    <SelectItem value="placement-officer">Placement Officer</SelectItem>
                                    <SelectItem value="admin">Admin</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {role === 'student' && (
                            <div className="grid gap-2">
                                <Label htmlFor="department">Department</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select department" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="cse">Computer Science</SelectItem>
                                        <SelectItem value="ece">Electronics</SelectItem>
                                        <SelectItem value="mech">Mechanical</SelectItem>
                                        <SelectItem value="civil">Civil</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}

                        {role === 'employer' && (
                            <div className="grid gap-2">
                                <Label htmlFor="company">Company Name</Label>
                                <Input id="company" placeholder="TechCorp Inc." />
                            </div>
                        )}
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                        <Button type="submit" className="btn-gradient">Create User</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddUserDialog;
