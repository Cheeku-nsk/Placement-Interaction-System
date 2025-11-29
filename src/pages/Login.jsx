import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { ArrowLeft, LogIn } from "lucide-react";
import { toast } from "sonner";
import { storage } from "@/services/storage";

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

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            const user = storage.login(formData.email, formData.password);

            toast.success(`Welcome back, ${user.name}!`);

            // Redirect based on role
            switch (user.role) {
                case "admin":
                    navigate("/admin-dashboard");
                    break;
                case "student":
                    navigate("/student-dashboard");
                    break;
                case "employer":
                    navigate("/employer-dashboard");
                    break;
                case "placement-officer":
                    navigate("/placement-officer-dashboard");
                    break;
                default:
                    navigate("/dashboard");
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
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

                        {/* Demo Credentials Section */}
                        <div className="p-3 bg-secondary/20 rounded-lg border border-border/50 text-sm">
                            <p className="font-medium mb-2 text-muted-foreground">Demo Credentials:</p>
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-xs font-mono bg-background px-1 rounded">
                                    {role === 'admin' ? 'admin@example.com' :
                                        role === 'employer' ? 'employer@example.com' :
                                            role === 'placement-officer' ? 'officer@example.com' :
                                                'student@example.com'}
                                </span>
                                <span className="text-xs font-mono bg-background px-1 rounded">password123</span>
                            </div>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="w-full mt-2 h-7 text-xs"
                                onClick={() => setFormData({
                                    email: role === 'admin' ? 'admin@example.com' :
                                        role === 'employer' ? 'employer@example.com' :
                                            role === 'placement-officer' ? 'officer@example.com' :
                                                'student@example.com',
                                    password: 'password123'
                                })}
                            >
                                Auto-fill Credentials
                            </Button>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
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
                        <div className="text-center text-sm">
                            <p className="text-muted-foreground">
                                Don't have an account?{" "}
                                <Link to="/register" className="text-primary hover:underline font-medium">
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default Login;
