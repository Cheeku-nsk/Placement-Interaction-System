import { useParams, Navigate } from "react-router-dom";
import Header from "@/components/Header";
import StudentDashboard from "@/components/dashboards/StudentDashboard";
import EmployerDashboard from "@/components/dashboards/EmployerDashboard";
import AdminDashboard from "@/components/dashboards/AdminDashboard";
import PlacementOfficerDashboard from "@/components/dashboards/PlacementOfficerDashboard";

const Index = () => {
    const { role } = useParams();

    // Validate role
    const validRoles = ["admin", "student", "employer", "placement-officer"];
    if (!role || !validRoles.includes(role)) {
        return <Navigate to="/" replace />;
    }

    const renderDashboard = () => {
        switch (role) {
            case "admin":
                return <AdminDashboard />;
            case "student":
                return <StudentDashboard />;
            case "employer":
                return <EmployerDashboard />;
            case "placement-officer":
                return <PlacementOfficerDashboard />;
            default:
                return <StudentDashboard />;
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <Header currentRole={role} />
            <main>
                {renderDashboard()}
            </main>
        </div>
    );
};

export default Index;
