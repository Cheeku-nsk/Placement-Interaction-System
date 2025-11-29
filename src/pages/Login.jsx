import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { ArrowLeft, LogIn } from "lucide-react";
import { toast } from "sonner";

const Login = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const role = searchParams.get("role") || "student";

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);

    // Format role label
    const roleLabel = role.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate login delay
        setTimeout(() => {
            setLoading(false);
            if (formData.email && formData.password) {
                toast.success(`Welcome back, ${roleLabel}!`);
                navigate(`/dashboard/${role}`);
            } else {
                toast.error("Please fill in all fields");
            }
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/20 rounded-full blur-3xl" />

            <Card className="w-full max-w-md relative z-10 border-border/50 shadow-glow">
                <CardHeader className="space-y-2">
                    <Button
                        variant="ghost"
                        className="w-fit -ml-2 mb-2 text-muted-foreground hover:text-foreground"
                        onClick={() => navigate("/")}
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Roles
                    </Button>
                    <CardTitle className="text-2xl font-bold text-center">
                        Login as {roleLabel}
                    </CardTitle>
                    <CardDescription className="text-center">
                        Enter your credentials to access your dashboard
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleLogin}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email ID</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                                className="bg-background/50"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required
                                className="bg-background/50"
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button
                            type="submit"
                            className="w-full btn-gradient"
                            disabled={loading}
                        >
                            {loading ? (
                                "Logging in..."
                            ) : (
                                <>
                                    <LogIn className="w-4 h-4 mr-2" />
                                    Login
                                </>
                            )}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default Login;
