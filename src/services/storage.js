import { toast } from "sonner";

const STORAGE_KEYS = {
    USERS: "placement_sys_users",
    JOBS: "placement_sys_jobs",
    APPLICATIONS: "placement_sys_applications",
    DRIVES: "placement_sys_drives",
    CURRENT_USER: "placement_sys_current_user",
};

// Mock Data Initialization
const initializeStorage = () => {
    if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
        const mockUsers = [
            { id: 1, name: "Admin User", email: "admin@example.com", password: "password123", role: "admin", department: "IT" },
            { id: 2, name: "Student User", email: "student@example.com", password: "password123", role: "student", department: "CSE" },
            { id: 3, name: "Employer User", email: "employer@example.com", password: "password123", role: "employer", company: "TechCorp" },
            { id: 4, name: "Placement Officer", email: "officer@example.com", password: "password123", role: "placement-officer", department: "CSE" },
        ];
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(mockUsers));
    }

    if (!localStorage.getItem(STORAGE_KEYS.JOBS)) {
        const mockJobs = [
            {
                id: 1,
                title: "Senior Software Engineer",
                company: "TechCorp",
                department: "Engineering",
                posted: "2024-01-10",
                applications: 45,
                status: "active",
                deadline: "2024-01-25",
                location: "Bangalore",
                salary: "₹12-18 LPA",
                type: "Full-time",
                description: "We are looking for a senior developer...",
                skills: ["React", "Node.js", "AWS"]
            },
            {
                id: 2,
                title: "Product Manager",
                company: "InnovateLabs",
                department: "Product",
                posted: "2024-01-08",
                applications: 32,
                status: "active",
                deadline: "2024-01-22",
                location: "Mumbai",
                salary: "₹15-22 LPA",
                type: "Full-time",
                description: "Lead our product team...",
                skills: ["Product Management", "Agile", "JIRA"]
            }
        ];
        localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(mockJobs));
    }

    if (!localStorage.getItem(STORAGE_KEYS.DRIVES)) {
        const mockDrives = [
            {
                id: 1,
                company: "Microsoft",
                role: "Software Engineer",
                date: "2024-01-20",
                type: "On-Campus",
                status: "Upcoming",
                applicants: 156,
                logo: "M",
                description: "Annual recruitment drive for freshers."
            },
            {
                id: 2,
                company: "Amazon",
                role: "SDE Intern",
                date: "2024-01-22",
                type: "Virtual",
                status: "Open",
                applicants: 203,
                logo: "A",
                description: "Internship opportunity for 3rd year students."
            }
        ];
        localStorage.setItem(STORAGE_KEYS.DRIVES, JSON.stringify(mockDrives));
    }
    if (!localStorage.getItem(STORAGE_KEYS.APPLICATIONS)) {
        const mockApplications = [
            {
                id: 1,
                jobId: 1,
                studentId: 2,
                studentName: "Student User",
                jobTitle: "Senior Software Engineer",
                company: "TechCorp",
                status: "pending",
                date: "2024-01-15T10:00:00.000Z",
                position: "Senior Software Engineer",
                lastUpdate: "Application received"
            },
            {
                id: 2,
                jobId: 2,
                studentId: 2,
                studentName: "Student User",
                jobTitle: "Product Manager",
                company: "InnovateLabs",
                status: "shortlisted",
                date: "2024-01-12T14:30:00.000Z",
                position: "Product Manager",
                lastUpdate: "Shortlisted for interview"
            }
        ];
        localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(mockApplications));
    }
};

// Initialize on load
initializeStorage();

export const storage = {
    // User Operations
    getUsers: () => JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || "[]"),

    addUser: (user) => {
        const users = storage.getUsers();
        if (users.find(u => u.email === user.email)) {
            throw new Error("User with this email already exists");
        }
        const newUser = { ...user, id: Date.now() };
        users.push(newUser);
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
        return newUser;
    },

    updateUser: (updatedUser) => {
        const users = storage.getUsers();
        const index = users.findIndex(u => u.id === updatedUser.id);
        if (index !== -1) {
            users[index] = updatedUser;
            localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
            return updatedUser;
        }
        throw new Error("User not found");
    },

    login: (email, password) => {
        const users = storage.getUsers();
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
            return user;
        }
        throw new Error("Invalid email or password");
    },

    logout: () => {
        localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    },
    getCurrentUser: () => {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.CURRENT_USER));
    },

    // Job Operations
    getJobs: () => JSON.parse(localStorage.getItem(STORAGE_KEYS.JOBS) || "[]"),

    addJob: (job) => {
        const jobs = storage.getJobs();
        const newJob = { ...job, id: Date.now(), posted: new Date().toISOString(), applications: 0, status: 'active' };
        jobs.push(newJob);
        localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(jobs));
        return newJob;
    },

    deleteJob: (jobId) => {
        const jobs = storage.getJobs().filter(j => j.id !== jobId);
        localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(jobs));
    },

    // Drive Operations
    getDrives: () => JSON.parse(localStorage.getItem(STORAGE_KEYS.DRIVES) || "[]"),

    addDrive: (drive) => {
        const drives = storage.getDrives();
        const newDrive = { ...drive, id: Date.now(), applicants: 0 };
        drives.push(newDrive);
        localStorage.setItem(STORAGE_KEYS.DRIVES, JSON.stringify(drives));
        return newDrive;
    },

    updateDrive: (updatedDrive) => {
        const drives = storage.getDrives();
        const index = drives.findIndex(d => d.id === updatedDrive.id);
        if (index !== -1) {
            drives[index] = updatedDrive;
            localStorage.setItem(STORAGE_KEYS.DRIVES, JSON.stringify(drives));
            return updatedDrive;
        }
    },

    deleteDrive: (driveId) => {
        const drives = storage.getDrives().filter(d => d.id !== driveId);
        localStorage.setItem(STORAGE_KEYS.DRIVES, JSON.stringify(drives));
    },

    // Application Operations
    getApplications: () => JSON.parse(localStorage.getItem(STORAGE_KEYS.APPLICATIONS) || "[]"),

    addApplication: (application) => {
        const apps = storage.getApplications();
        // Check for duplicate application
        if (apps.find(a => a.jobId === application.jobId && a.studentId === application.studentId)) {
            throw new Error("You have already applied for this job");
        }
        const newApp = { ...application, id: Date.now(), date: new Date().toISOString(), status: 'pending' };
        apps.push(newApp);
        localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(apps));

        // Update job application count
        const jobs = storage.getJobs();
        const jobIndex = jobs.findIndex(j => j.id === application.jobId);
        if (jobIndex !== -1) {
            jobs[jobIndex].applications += 1;
            localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(jobs));
        }

        return newApp;
    }
};
