import { useNavigate } from "react-router-dom";
import { Users, GraduationCap, Building2, ClipboardList } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const Landing = () => {
    const navigate = useNavigate();

    const roles = [
        {
            id: "student",
            label: "Student",
            icon: GraduationCap,
            description: "Access learning resources and placement opportunities",
            color: "from-blue-500 to-cyan-400",
        },
        {
            id: "employer",
            label: "Employer",
            icon: Building2,
            description: "Post jobs and find top talent",
            color: "from-purple-500 to-pink-400",
        },
        {
            id: "placement-officer",
            label: "Placement Officer",
            icon: ClipboardList,
            description: "Manage placement drives and student progress",
            color: "from-orange-500 to-red-400",
        },
        {
            id: "admin",
            label: "Admin",
            icon: Users,
            description: "System administration and configuration",
            color: "from-emerald-500 to-teal-400",
        },
    ];

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
            <div className="text-center mb-12 space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Welcome to PlacementHub
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Select your role to continue to the portal
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl w-full">
                {roles.map((role) => {
                    const Icon = role.icon;
                    return (
                        <Card
                            key={role.id}
                            className="group hover:shadow-glow transition-all duration-300 cursor-pointer border-border/50 hover:border-primary/50 bg-card/50 backdrop-blur-sm"
                            onClick={() => navigate(`/login?role=${role.id}`)}
                        >
                            <CardHeader className="text-center space-y-4 pb-2">
                                <div
                                    className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${role.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                                >
                                    <Icon className="w-8 h-8 text-white" />
                                </div>
                                <CardTitle className="text-2xl">{role.label}</CardTitle>
                            </CardHeader>
                            <CardContent className="text-center">
                                <CardDescription className="text-sm">
                                    {role.description}
                                </CardDescription>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
};

export default Landing;
