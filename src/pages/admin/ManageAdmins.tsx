import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Plus, MoreVertical, Trash2, Edit, X, Lock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useNotification } from "../../components/NotificationProvider";

const admins = [
    { id: 1, name: "Sujay Kumar", email: "sujay@company.com", role: "Super Admin", avatar: "https://github.com/shadcn.png" },
    { id: 2, name: "John Doe", email: "john@company.com", role: "HR Admin", avatar: "" },
];

// Mock current admin ID for demo
const CURRENT_ADMIN_ID = 1;

const ManageAdmins: React.FC = () => {
    const { showSuccess, showError } = useNotification();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    // --- Add Admin Form State ---
    // --- Add Admin Form State ---
    const [newAdmin, setNewAdmin] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    // --- Remove Admin State ---
    // --- Remove Admin State ---
    const [adminToRemove, setAdminToRemove] = useState<number | null>(null);
    const [removePassword, setRemovePassword] = useState("");

    // --- Verification & Edit State ---
    const [verifyPasswordOpen, setVerifyPasswordOpen] = useState(false);
    const [passwordInput, setPasswordInput] = useState("");
    const [pendingAddAdmin, setPendingAddAdmin] = useState(false);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const [editingAdmin, setEditingAdmin] = useState({ id: 0, name: "", email: "", password: "", confirmPassword: "" });

    const handleAddAdmin = () => {
        if (!newAdmin.name || !newAdmin.email || !newAdmin.password) {
            showError("Please fill in all required fields.");
            return;
        }
        if (newAdmin.password !== newAdmin.confirmPassword) {
            showError("Passwords do not match.");
            return;
        }
        setPendingAddAdmin(true);
        setVerifyPasswordOpen(true);
        setPasswordInput("");
    };

    const handleVerifyPassword = () => {
        if (passwordInput !== "password123") {
            showError("Incorrect password.");
            return;
        }

        if (pendingAddAdmin) {
            showSuccess("New admin added successfully!");
            setIsAddModalOpen(false);
            setNewAdmin({
                name: "", email: "", password: "", confirmPassword: ""
            });
            setPendingAddAdmin(false);
        }

        setVerifyPasswordOpen(false);
        setPasswordInput("");
    };

    const initiateEditAdmin = (admin: typeof admins[0]) => {
        setEditingAdmin({ id: admin.id, name: admin.name, email: admin.email, password: "", confirmPassword: "" });
        setIsEditModalOpen(true);
    };

    const initiateRemoveAdmin = (id: number) => {
        if (id === CURRENT_ADMIN_ID) {
            showError("You cannot delete your own account.");
            return;
        }
        setAdminToRemove(id);
    };

    const handleEditAdmin = () => {
        if (editingAdmin.password && editingAdmin.password !== editingAdmin.confirmPassword) {
            showError("Passwords do not match.");
            return;
        }
        // API call to update admin would go here
        showSuccess("Admin details updated successfully!");
        setIsEditModalOpen(false);
    };

    const confirmRemoveAdmin = () => {
        if (removePassword !== "password123") { // Mock password check
            showError("Incorrect password.");
            return;
        }
        showSuccess("Admin removed successfully.");
        setAdminToRemove(null);
        setRemovePassword("");
    };
    return (
        <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 p-6 lg:p-10 animate-in fade-in duration-500">
            <div className="max-w-6xl mx-auto space-y-8">

                <div className="sticky top-0 z-20 bg-slate-50/95 dark:bg-slate-950/95 backdrop-blur support-[backdrop-filter]:bg-slate-50/50 py-4 -mx-6 px-6 lg:-mx-10 lg:px-10 -mt-6 lg:-mt-6 border-b border-slate-200/50 dark:border-slate-800/50 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                            Manage Admins
                        </h1>
                        <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 mt-1">
                            Control system access and manage administrative roles.
                        </p>
                    </div>
                    <Button
                        onClick={() => setIsAddModalOpen(true)}
                        className="bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-slate-900 cursor-pointer"
                    >
                        <Plus className="mr-2 h-4 w-4" /> Add New Admin
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {admins.map((admin) => (
                        <Card key={admin.id} className="p-6 border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900/50 flex flex-col items-center text-center space-y-4 relative group">
                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button variant="ghost" size="icon" className="h-8 w-8 cursor-pointer">
                                    <MoreVertical className="h-4 w-4 text-slate-500" />
                                </Button>
                            </div>

                            <Avatar className="h-20 w-20 border-4 border-slate-50 dark:border-slate-800 shadow-lg">
                                <AvatarImage src={admin.avatar} />
                                <AvatarFallback className="text-xl bg-slate-100 text-slate-500">{admin.name.charAt(0)}</AvatarFallback>
                            </Avatar>

                            <div>
                                <h3 className="font-bold text-lg text-slate-900 dark:text-white">{admin.name}</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400">{admin.email}</p>
                            </div>

                            <div className="flex items-center gap-2 mt-2">
                                <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 flex items-center">
                                    <Shield className="w-3 h-3 mr-1" /> {admin.role}
                                </span>
                            </div>

                            <div className="w-full pt-4 mt-2 border-t border-slate-100 dark:border-slate-800 flex gap-2">
                                <Button
                                    variant="outline"
                                    className={`flex-1 text-xs h-9 dark:text-white cursor-pointer ${admin.id !== CURRENT_ADMIN_ID ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    onClick={() => admin.id === CURRENT_ADMIN_ID && initiateEditAdmin(admin)}
                                    disabled={admin.id !== CURRENT_ADMIN_ID}
                                >
                                    <Edit className="w-3 h-3 mr-2" /> Edit
                                </Button>
                                <Button
                                    variant="outline"
                                    className={`flex-1 text-xs h-9 cursor-pointer ${admin.id === CURRENT_ADMIN_ID ? 'opacity-50 cursor-not-allowed text-slate-400' : 'text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20'}`}
                                    onClick={() => initiateRemoveAdmin(admin.id)}
                                >
                                    <Trash2 className="w-3 h-3 mr-2" /> Remove
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>

            </div>

            {/* --- Add Admin Modal --- */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <Card className="w-full max-w-lg p-6 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 shadow-2xl relative animate-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Add New Admin</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Invite a new administrator to the platform.</p>
                            </div>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800" onClick={() => setIsAddModalOpen(false)}>
                                <X className="h-4 w-4 text-slate-500" />
                            </Button>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Display Name</label>
                                <Input
                                    placeholder="e.g. Sarah Connor"
                                    value={newAdmin.name}
                                    onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                                    className="text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</label>
                                <Input
                                    type="email"
                                    placeholder="sarah@company.com"
                                    value={newAdmin.email}
                                    onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                                    className="text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
                                <Input
                                    type="password"
                                    placeholder="Enter secure password"
                                    value={newAdmin.password}
                                    onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                                    className="text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Confirm Password</label>
                                <Input
                                    type="password"
                                    placeholder="Re-enter password"
                                    value={newAdmin.confirmPassword}
                                    onChange={(e) => setNewAdmin({ ...newAdmin, confirmPassword: e.target.value })}
                                    className="text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 mt-8">
                            <Button variant="outline" onClick={() => setIsAddModalOpen(false)} className="cursor-pointer border-slate-200 dark:border-slate-800 dark:text-white">Cancel</Button>
                            <Button onClick={handleAddAdmin} className="bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-slate-900 cursor-pointer">Add Admin</Button>
                        </div>
                    </Card>
                </div>
            )}

            {/* --- Verify Password Modal (Generic) --- */}
            {verifyPasswordOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <Card className="w-full max-w-md p-6 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 shadow-2xl relative animate-in zoom-in-95 duration-200">
                        <div className="text-center mb-6">
                            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 mx-auto flex items-center justify-center mb-4">
                                <Lock className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Authorize Action</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                                Please enter your admin password to authorize this action.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <Input
                                type="password"
                                placeholder="Enter your password"
                                value={passwordInput}
                                onChange={(e) => setPasswordInput(e.target.value)}
                                className="text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-center"
                            />
                        </div>
                        <div className="flex gap-3 mt-6">
                            <Button variant="outline" onClick={() => setVerifyPasswordOpen(false)} className="flex-1 cursor-pointer border-slate-200 dark:border-slate-800 dark:text-white">Cancel</Button>
                            <Button onClick={handleVerifyPassword} className="flex-1 bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-slate-900 cursor-pointer">Verify</Button>
                        </div>
                    </Card>
                </div>
            )}

            {/* --- Edit Admin Modal --- */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <Card className="w-full max-w-lg p-6 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 shadow-2xl relative animate-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Edit Admin</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Update administrator details.</p>
                            </div>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800" onClick={() => setIsEditModalOpen(false)}>
                                <X className="h-4 w-4 text-slate-500" />
                            </Button>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Display Name</label>
                                <Input
                                    value={editingAdmin.name}
                                    onChange={(e) => setEditingAdmin({ ...editingAdmin, name: e.target.value })}
                                    className="text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</label>
                                <Input
                                    type="email"
                                    value={editingAdmin.email}
                                    onChange={(e) => setEditingAdmin({ ...editingAdmin, email: e.target.value })}
                                    className="text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                                />
                            </div>
                            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 mt-2">
                                <p className="text-xs text-slate-500 mb-3">Leave blank to keep current password</p>
                                <div className="space-y-3">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">New Password</label>
                                        <Input
                                            type="password"
                                            placeholder="Enter new password"
                                            value={editingAdmin.password}
                                            onChange={(e) => setEditingAdmin({ ...editingAdmin, password: e.target.value })}
                                            className="text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Confirm New Password</label>
                                        <Input
                                            type="password"
                                            placeholder="Confirm new password"
                                            value={editingAdmin.confirmPassword}
                                            onChange={(e) => setEditingAdmin({ ...editingAdmin, confirmPassword: e.target.value })}
                                            className="text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 mt-8">
                            <Button variant="outline" onClick={() => setIsEditModalOpen(false)} className="cursor-pointer border-slate-200 dark:border-slate-800 dark:text-white">Cancel</Button>
                            <Button onClick={handleEditAdmin} className="bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-slate-900 cursor-pointer">Save Changes</Button>
                        </div>
                    </Card>
                </div>
            )}

            {/* --- Remove Admin Confirmation Modal (Final Step) --- */}
            {adminToRemove !== null && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <Card className="w-full max-w-md p-6 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 shadow-2xl relative animate-in zoom-in-95 duration-200">
                        <div className="text-center mb-6">
                            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400 mx-auto flex items-center justify-center mb-4">
                                <Trash2 className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Confirm Removal</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                                Please enter your password to confirm removing this administrator.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <Input
                                type="password"
                                placeholder="Enter your password"
                                value={removePassword}
                                onChange={(e) => setRemovePassword(e.target.value)}
                                className="text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-center"
                            />
                        </div>
                        <div className="flex gap-3 mt-6">
                            <Button variant="outline" onClick={() => { setAdminToRemove(null); setRemovePassword(""); }} className="flex-1 cursor-pointer border-slate-200 dark:border-slate-800 dark:text-white">Cancel</Button>
                            <Button onClick={confirmRemoveAdmin} className="flex-1 bg-red-600 hover:bg-red-700 text-white cursor-pointer dark:bg-red-600 dark:hover:bg-red-700">Remove Admin</Button>
                        </div>
                    </Card>
                </div>
            )}

        </div>
    );
};

export default ManageAdmins;
