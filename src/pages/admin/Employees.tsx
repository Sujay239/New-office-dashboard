import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Search, Filter, Mail, Phone, MapPin, X, Edit, Eye, Trash2, AlertTriangle, KeyRound } from "lucide-react";
import { useNotification } from "../../components/NotificationProvider";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";



const Employees: React.FC = () => {
    const { showSuccess, showError } = useNotification();
    const [employeesList, setEmployeesList] = useState([
        {
            id: 1,
            name: "Alice Johnson",
            role: "Software Engineer",
            department: "Engineering",
            status: "Active",
            email: "alice@company.com",
            phone: "+1 234 567 890",
            location: "New York, USA",
            avatar: "https://github.com/shadcn.png",
            skills: ["React.js", "TypeScript", "Node.js"],
            employmentType: "Full Time",
            joiningDate: "2023-01-15",
            salary: "120000"
        },
        {
            id: 2,
            name: "Bob Smith",
            role: "Product Manager",
            department: "Product",
            status: "Active",
            email: "bob@company.com",
            phone: "+1 987 654 321",
            location: "London, UK",
            avatar: "",
            skills: ["SEO", "Content Writing"],
            employmentType: "Full Time",
            joiningDate: "2022-11-01",
            salary: "110000"
        },
        // Add more mock data with full fields as needed...
    ]);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);

    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [viewingEmployee, setViewingEmployee] = useState<any>(null);

    const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
    const [removingEmployee, setRemovingEmployee] = useState<any>(null);
    const [removalReason, setRemovalReason] = useState("");
    const [adminPassword, setAdminPassword] = useState("");

    const openRemoveModal = (employee: any) => {
        setRemovingEmployee(employee);
        setRemovalReason("");
        setAdminPassword("");
        setIsRemoveModalOpen(true);
    };

    const handleConfirmRemove = () => {
        if (!adminPassword || !removalReason) {
            showError("Please provide both a reason and your admin password to confirm.");
            return;
        }

        // Mock Password Verification (Simple check for demo)
        if (adminPassword !== "1234") {
            showError("Incorrect Admin Password! (Try 1234)");
            return;
        }

        setEmployeesList(prev => prev.filter(emp => emp.id !== removingEmployee.id));
        showSuccess(`Employee ${removingEmployee.name} has been removed.`);
        setIsRemoveModalOpen(false);
    };

    const initialFormState = {
        name: "",
        email: "",
        phone: "",
        role: "",
        department: "",
        location: "",
        skills: [] as string[],
        employmentType: "Full Time",
        joiningDate: "",
        salary: ""
    };

    const [newEmployee, setNewEmployee] = useState(initialFormState);

    const availableSkills = [
        "React.js", "Node.js", "Next.js", "Postgres", "Docker", "TypeScript",
        "WordPress", "PHP", "SEO", "Content Writing",
        "Photoshop", "Illustrator", "Adobe XD", "Figma", "Video Editing"
    ];

    const toggleSkill = (skill: string) => {
        setNewEmployee(prev => {
            const skills = prev.skills.includes(skill)
                ? prev.skills.filter(s => s !== skill)
                : [...prev.skills, skill];
            return { ...prev, skills };
        });
    };

    const handleSaveEmployee = () => {
        if (editingId) {
            // Edit Mode
            setEmployeesList(prev => prev.map(emp =>
                emp.id === editingId
                    ? { ...emp, ...newEmployee, status: emp.status, avatar: emp.avatar } // Preserve status/avatar for now or add fields
                    : emp
            ));
            showSuccess("Employee updated successfully!");
        } else {
            // Add Mode
            const newId = Math.max(...employeesList.map(e => e.id), 0) + 1;
            setEmployeesList(prev => [...prev, {
                id: newId,
                ...newEmployee,
                status: "Active",
                avatar: ""
            }]);
            showSuccess("Employee added successfully!");
        }
        setIsAddModalOpen(false);
        setNewEmployee(initialFormState);
        setEditingId(null);
    };

    const openAddModal = () => {
        setNewEmployee(initialFormState);
        setEditingId(null);
        setIsAddModalOpen(true);
    };

    const openEditModal = (employee: any) => {
        setNewEmployee({
            name: employee.name,
            email: employee.email,
            phone: employee.phone,
            role: employee.role,
            department: employee.department,
            location: employee.location,
            skills: employee.skills || [],
            employmentType: employee.employmentType || "Full Time",
            joiningDate: employee.joiningDate || "",
            salary: employee.salary || ""
        });
        setEditingId(employee.id);
        setIsAddModalOpen(true);
    };

    const openViewModal = (employee: any) => {
        setViewingEmployee(employee);
        setIsViewModalOpen(true);
    };
    return (
        <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 p-6 lg:p-10 animate-in fade-in duration-500">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* --- Header --- */}
                <div className="sticky top-0 z-20 bg-slate-50/95 dark:bg-slate-950/95 backdrop-blur support-[backdrop-filter]:bg-slate-50/50 py-4 -mx-6 px-6 lg:-mx-10 lg:px-10 -mt-6 lg:-mt-6 border-b border-slate-200/50 dark:border-slate-800/50 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                            Employees
                        </h1>
                        <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 mt-1">
                            Manage your team members and their roles.
                        </p>
                    </div>
                    <Button
                        onClick={openAddModal}
                        className="bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-slate-900 shadow-lg cursor-pointer"
                    >
                        <Plus className="mr-2 h-4 w-4" /> Add Employee
                    </Button>
                </div>

                {/* --- Filters & Search --- */}
                <div className="flex flex-col md:flex-row gap-4 items-center bg-white dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input placeholder="Search employees..." className="pl-10 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 dark:text-white dark:placeholder:text-slate-500" />
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                        <Button variant="outline" className="flex-1 md:flex-none dark:text-white cursor-pointer">
                            <Filter className="mr-2 h-4 w-4" /> Department
                        </Button>
                        <Button variant="outline" className="flex-1 md:flex-none dark:text-white cursor-pointer">
                            <Filter className="mr-2 h-4 w-4" /> Status
                        </Button>
                    </div>
                </div>

                {/* --- Employee Grid --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {employeesList.map((employee) => (
                        <Card key={employee.id} className="group relative overflow-hidden border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:shadow-md transition-all">



                            <div className="p-6">
                                <div className="flex items-start gap-4">
                                    <Avatar className="h-16 w-16 border-2 border-white dark:border-slate-800 shadow-sm">
                                        <AvatarImage src={employee.avatar} />
                                        <AvatarFallback className="bg-slate-100 text-slate-600 text-lg dark:bg-slate-800 dark:text-slate-400">{employee.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h3 className="font-bold text-lg text-slate-900 dark:text-white">{employee.name}</h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{employee.role}</p>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-normal hover:bg-slate-200">
                                                {employee.department}
                                            </Badge>
                                            <Badge variant="outline" className={`
                                        ${employee.status === 'Active' ? 'text-green-600 border-green-200 bg-green-50 dark:bg-green-900/10' : ''}
                                        ${employee.status === 'On Leave' ? 'text-amber-600 border-amber-200 bg-amber-50 dark:bg-amber-900/10' : ''}
                                        ${employee.status === 'Probation' ? 'text-blue-600 border-blue-200 bg-blue-50 dark:bg-blue-900/10' : ''}
                                     `}>
                                                {employee.status}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800">
                                    <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                                        <Mail className="h-4 w-4 mr-3 text-slate-400" /> {employee.email}
                                    </div>
                                    <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                                        <Phone className="h-4 w-4 mr-3 text-slate-400" /> {employee.phone}
                                    </div>
                                    <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                                        <MapPin className="h-4 w-4 mr-3 text-slate-400" /> {employee.location}
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Action Footer */}
                            <div className="flex items-center justify-between p-3 bg-slate-50/50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800">
                                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium ml-2">Actions</span>
                                <div className="flex gap-1">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 hover:bg-white dark:hover:bg-slate-800 rounded-full text-slate-500 hover:text-blue-600 cursor-pointer"
                                        onClick={() => openViewModal(employee)}
                                    >
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 hover:bg-white dark:hover:bg-slate-800 rounded-full text-slate-500 hover:text-blue-600 cursor-pointer"
                                        onClick={() => openEditModal(employee)}
                                    >
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 hover:bg-white dark:hover:bg-slate-800 rounded-full text-slate-500 hover:text-red-600 cursor-pointer"
                                        onClick={() => openRemoveModal(employee)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

            </div>
            {/* --- Add Employee Modal --- */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <Card className="w-full max-w-lg p-6 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 shadow-2xl relative animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">

                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{editingId ? "Edit Employee" : "Add New Employee"}</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400">{editingId ? "Update employee details and information." : "Enter the details of the new team member."}</p>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 rounded-full cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800"
                                onClick={() => setIsAddModalOpen(false)}
                            >
                                <X className="h-4 w-4 text-slate-500" />
                            </Button>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Full Name</label>
                                <Input
                                    placeholder="e.g. John Doe"
                                    value={newEmployee.name}
                                    onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                                    className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</label>
                                    <Input
                                        type="email"
                                        placeholder="john@company.com"
                                        value={newEmployee.email}
                                        onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                                        className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Phone</label>
                                    <Input
                                        type="tel"
                                        placeholder="+1 234 567 890"
                                        value={newEmployee.phone}
                                        onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })}
                                        className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Role / Designation</label>
                                    <Input
                                        placeholder="e.g. Senior Frontend Dev"
                                        value={newEmployee.role}
                                        onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value })}
                                        className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Department</label>
                                    <Input
                                        placeholder="e.g. Engineering"
                                        value={newEmployee.department}
                                        onChange={(e) => setNewEmployee({ ...newEmployee, department: e.target.value })}
                                        className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Office Location</label>
                                <Input
                                    placeholder="e.g. New York, USA or Remote"
                                    value={newEmployee.location}
                                    onChange={(e) => setNewEmployee({ ...newEmployee, location: e.target.value })}
                                    className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Employment Type</label>
                                    <Select
                                        value={newEmployee.employmentType}
                                        onValueChange={(value) => setNewEmployee({ ...newEmployee, employmentType: value })}
                                    >
                                        <SelectTrigger className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white">
                                            <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                                            <SelectItem value="Full Time" className="text-slate-900 dark:text-white focus:bg-slate-100 dark:focus:bg-slate-800 cursor-pointer">Full Time</SelectItem>
                                            <SelectItem value="Part Time" className="text-slate-900 dark:text-white focus:bg-slate-100 dark:focus:bg-slate-800 cursor-pointer">Part Time</SelectItem>
                                            <SelectItem value="Contract" className="text-slate-900 dark:text-white focus:bg-slate-100 dark:focus:bg-slate-800 cursor-pointer">Contract</SelectItem>
                                            <SelectItem value="Intern" className="text-slate-900 dark:text-white focus:bg-slate-100 dark:focus:bg-slate-800 cursor-pointer">Intern</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Salary (Annual)</label>
                                    <Input
                                        type="number"
                                        placeholder="e.g. 1200000"
                                        value={newEmployee.salary}
                                        onChange={(e) => setNewEmployee({ ...newEmployee, salary: e.target.value })}
                                        className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Joining Date</label>
                                <Input
                                    type="date"
                                    value={newEmployee.joiningDate}
                                    onChange={(e) => setNewEmployee({ ...newEmployee, joiningDate: e.target.value })}
                                    className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Skills</label>
                                <div className="flex flex-wrap gap-2">
                                    {availableSkills.map((skill) => (
                                        <Badge
                                            key={skill}
                                            variant={newEmployee.skills.includes(skill) ? "default" : "outline"}
                                            className={`cursor-pointer px-3 py-1 text-sm transition-colors
                                                ${newEmployee.skills.includes(skill)
                                                    ? "bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
                                                    : "bg-slate-50 text-slate-600 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 border-dashed"
                                                }
                                            `}
                                            onClick={() => toggleSkill(skill)}
                                        >
                                            {skill}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 mt-8">
                            <Button
                                variant="outline"
                                onClick={() => setIsAddModalOpen(false)}
                                className="cursor-pointer border-slate-200 dark:border-slate-800 dark:text-white"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSaveEmployee}
                                className="bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-slate-900 cursor-pointer"
                            >
                                {editingId ? "Save Changes" : "Add Employee"}
                            </Button>
                        </div>
                    </Card>
                </div>
            )}

            {/* --- View Employee Modal --- */}
            {isViewModalOpen && viewingEmployee && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <Card className="w-full max-w-lg p-0 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 shadow-2xl relative animate-in zoom-in-95 duration-200 overflow-hidden">

                        {/* Header Banner */}
                        <div className="bg-slate-100 dark:bg-slate-900 h-32 w-full relative">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="absolute top-4 right-4 h-8 w-8 p-0 rounded-full cursor-pointer bg-white/50 hover:bg-white dark:bg-black/20 dark:hover:bg-black/40 backdrop-blur-md"
                                onClick={() => setIsViewModalOpen(false)}
                            >
                                <X className="h-4 w-4 text-slate-700 dark:text-slate-200" />
                            </Button>
                        </div>

                        <div className="px-6 pb-6 -mt-12 relative">
                            {/* Profile Header */}
                            <div className="flex flex-col items-center text-center">
                                <Avatar className="h-24 w-24 border-4 border-white dark:border-slate-950 shadow-lg mb-4">
                                    <AvatarImage src={viewingEmployee.avatar} />
                                    <AvatarFallback className="text-3xl bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400">{viewingEmployee.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{viewingEmployee.name}</h2>
                                <p className="text-slate-500 dark:text-slate-400 font-medium">{viewingEmployee.role}</p>
                                <div className="flex gap-2 mt-3">
                                    <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                                        {viewingEmployee.department}
                                    </Badge>
                                    <Badge variant="outline" className={`
                                        ${viewingEmployee.status === 'Active' ? 'text-green-600 border-green-200 bg-green-50 dark:bg-green-900/10' : ''}
                                        ${viewingEmployee.status === 'On Leave' ? 'text-amber-600 border-amber-200 bg-amber-50 dark:bg-amber-900/10' : ''}
                                        ${viewingEmployee.status === 'Probation' ? 'text-blue-600 border-blue-200 bg-blue-50 dark:bg-blue-900/10' : ''}
                                    `}>
                                        {viewingEmployee.status}
                                    </Badge>
                                </div>
                            </div>

                            {/* Details Grid */}
                            <div className="grid grid-cols-2 gap-x-8 gap-y-6 mt-8">
                                <div>
                                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email</label>
                                    <div className="flex items-center mt-1 text-slate-700 dark:text-slate-300 font-medium">
                                        <Mail className="w-3.5 h-3.5 mr-2 text-slate-400" /> {viewingEmployee.email}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Phone</label>
                                    <div className="flex items-center mt-1 text-slate-700 dark:text-slate-300 font-medium">
                                        <Phone className="w-3.5 h-3.5 mr-2 text-slate-400" /> {viewingEmployee.phone}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Location</label>
                                    <div className="flex items-center mt-1 text-slate-700 dark:text-slate-300 font-medium">
                                        <MapPin className="w-3.5 h-3.5 mr-2 text-slate-400" /> {viewingEmployee.location}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Type</label>
                                    <div className="mt-1 text-slate-700 dark:text-slate-300 font-medium">
                                        {viewingEmployee.employmentType}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Joining Date</label>
                                    <div className="mt-1 text-slate-700 dark:text-slate-300 font-medium">
                                        {viewingEmployee.joiningDate || "N/A"}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Salary</label>
                                    <div className="mt-1 text-slate-700 dark:text-slate-300 font-medium">
                                        {viewingEmployee.salary ? `₹${Number(viewingEmployee.salary).toLocaleString()}` : "N/A"}
                                    </div>
                                </div>
                            </div>

                            {/* Skills Section */}
                            <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 block">Skills</label>
                                <div className="flex flex-wrap gap-2">
                                    {viewingEmployee.skills && viewingEmployee.skills.length > 0 ? (
                                        viewingEmployee.skills.map((skill: string) => (
                                            <Badge key={skill} variant="secondary" className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                                                {skill}
                                            </Badge>
                                        ))
                                    ) : (
                                        <span className="text-sm text-slate-400 italic">No skills listed</span>
                                    )}
                                </div>
                            </div>

                            <div className="mt-8">
                                <Button
                                    className="w-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 cursor-pointer"
                                    onClick={() => { setIsViewModalOpen(false); openEditModal(viewingEmployee); }}
                                >
                                    <Edit className="w-4 h-4 mr-2" /> Edit Profile
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            )}

            {/* --- Remove Confirmation Modal --- */}
            {isRemoveModalOpen && removingEmployee && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <Card className="w-full max-w-md p-6 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 shadow-2xl relative animate-in zoom-in-95 duration-200">

                        <div className="flex flex-col items-center text-center mb-6">
                            <div className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mb-4">
                                <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-500" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Remove Employee?</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                                You are about to remove <span className="font-semibold text-slate-900 dark:text-white">{removingEmployee.name}</span>. This action cannot be undone immediately.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Reason for Removal</label>
                                <Input
                                    placeholder="e.g. Resignation, Termination..."
                                    value={removalReason}
                                    onChange={(e) => setRemovalReason(e.target.value)}
                                    className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                    <KeyRound className="h-3 w-3" /> Admin Password (2FA)
                                </label>
                                <Input
                                    type="password"
                                    placeholder="Enter admin password (use 1234)"
                                    value={adminPassword}
                                    onChange={(e) => setAdminPassword(e.target.value)}
                                    className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                                />
                                <p className="text-xs text-slate-400">Security check required to proceed.</p>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-8">
                            <Button
                                variant="outline"
                                className="flex-1 cursor-pointer dark:text-white dark:border-slate-700"
                                onClick={() => setIsRemoveModalOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="destructive"
                                className="flex-1 cursor-pointer bg-red-600 hover:bg-red-700 text-white"
                                onClick={handleConfirmRemove}
                                disabled={!removalReason || !adminPassword}
                            >
                                Confirm
                            </Button>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default Employees;
