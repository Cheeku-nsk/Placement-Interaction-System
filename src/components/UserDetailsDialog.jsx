import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Building2, Calendar, Shield, Activity } from "lucide-react";

const UserDetailsDialog = ({ user, open, onOpenChange }) => {
    if (!user) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <div className="flex items-center gap-4 mb-2">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl font-bold text-white">
                            {user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                            <DialogTitle className="text-xl">{user.name}</DialogTitle>
                            <DialogDescription className="flex items-center gap-2">
                                <Badge variant="outline">{user.role}</Badge>
                                <Badge className={user.status === 'active' ? 'status-approved' : 'status-rejected'}>
                                    {user.status}
                                </Badge>
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-muted-foreground">Department</p>
                            <div className="flex items-center gap-2">
                                <Building2 className="w-4 h-4 text-primary" />
                                <span>{user.department}</span>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-muted-foreground">Last Login</p>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-primary" />
                                <span>{new Date(user.lastLogin).toLocaleDateString()}</span>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-muted-foreground">Email</p>
                            <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-primary" />
                                <span>{user.email || "user@example.com"}</span>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-muted-foreground">User ID</p>
                            <div className="flex items-center gap-2">
                                <Shield className="w-4 h-4 text-primary" />
                                <span>#{user.id}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-secondary/20 p-4 rounded-lg">
                        <h4 className="font-medium mb-2 flex items-center gap-2">
                            <Activity className="w-4 h-4" /> Recent Activity
                        </h4>
                        <ul className="text-sm text-muted-foreground space-y-2">
                            <li>• Logged in from new device</li>
                            <li>• Updated profile information</li>
                            <li>• Changed password 3 months ago</li>
                        </ul>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
                    <Button variant="destructive">Deactivate User</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default UserDetailsDialog;
