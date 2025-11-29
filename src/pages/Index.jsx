import { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import Header from "@/components/Header";
import StudentDashboard from "@/components/dashboards/StudentDashboard";
import EmployerDashboard from "@/components/dashboards/EmployerDashboard";
import AdminDashboard from "@/components/dashboards/AdminDashboard";
import PlacementOfficerDashboard from "@/components/dashboards/PlacementOfficerDashboard";

const Index = ({ role: propRole }) => {
    const { role: paramRole } = useParams();
    const role = propRole || paramRole;
    const [activeTab, setActiveTab] = useState("dashboard");

    // Validate role
    const validRoles = ["admin", "student", "employer", "placement-officer"];
    if (!role || !validRoles.includes(role)) {
        return <Navigate to="/" replace />;
    }

    const renderDashboard = () => {
        const commonProps = {
            activeTab,
            onTabChange: setActiveTab
        };

        switch (role) {
            case "admin":
                return <AdminDashboard {...commonProps} />;
            case "student":
                return <StudentDashboard {...commonProps} />;
            case "employer":
                return <EmployerDashboard {...commonProps} />;
            case "placement-officer":
                return <PlacementOfficerDashboard {...commonProps} />;
            default:
                return <StudentDashboard {...commonProps} />;
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <Header currentRole={role} activeTab={activeTab} onNavigate={setActiveTab} />
            <main>
                {renderDashboard()}
            </main>
        </div>
    );
};

export default Index;
