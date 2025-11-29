import { useState } from "react";
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
import { storage } from "@/services/storage";
import { toast } from "sonner";

const AddUserDialog = ({ open, onOpenChange }) => {
    const [role, setRole] = useState("student");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "password123", // Default password
        department: "",
        company: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            storage.addUser({
                ...formData,
                role,
                department: role === 'student' || role === 'placement_officer' ? formData.department : undefined,
                company: role === 'employer' ? formData.company : undefined
            });
            toast.success("User added successfully");
            onOpenChange(false);
            window.location.reload(); // Simple refresh to show new user
        } catch (error) {
            toast.error(error.message);
        }
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
                            <Input id="name" placeholder="John Doe" required value={formData.name} onChange={handleChange} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" type="email" placeholder="john@example.com" required value={formData.email} onChange={handleChange} />
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
                                    <SelectItem value="placement_officer">Placement Officer</SelectItem>
                                    <SelectItem value="admin">Admin</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {(role === 'student' || role === 'placement_officer') && (
                            <div className="grid gap-2">
                                <Label htmlFor="department">Department</Label>
                                <Select onValueChange={(val) => setFormData({ ...formData, department: val })}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select department" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="CSE">Computer Science</SelectItem>
                                        <SelectItem value="ECE">Electronics</SelectItem>
                                        <SelectItem value="MECH">Mechanical</SelectItem>
                                        <SelectItem value="IT">Information Technology</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}

                        {role === 'employer' && (
                            <div className="grid gap-2">
                                <Label htmlFor="company">Company Name</Label>
                                <Input id="company" placeholder="TechCorp Inc." value={formData.company} onChange={handleChange} />
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
