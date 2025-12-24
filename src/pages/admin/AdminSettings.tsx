import React, { useState } from "react";
import {
    Camera,
    LayoutDashboard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/hooks/use-theme";
import { useNotification } from "../../components/NotificationProvider";
import { useUser } from "../../components/UserProvider";

const AdminSettings: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const { showSuccess } = useNotification();
    const { user, updateUser } = useUser();
    const [isLoading, setIsLoading] = useState(false);

    // -- Form State --
    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email,
        role: user.role,
        bio: user.bio,
        phone: user.phone,
        location: user.location,
    });

    React.useEffect(() => {
        setFormData({
            name: user.name,
            email: user.email,
            role: user.role,
            bio: user.bio,
            phone: user.phone,
            location: user.location,
        });
    }, [user]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        setIsLoading(true);
        setTimeout(() => {
            updateUser(formData);
            setIsLoading(false);
            showSuccess("Settings updated successfully.");
        }, 800);
    };

    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                updateUser({ avatar: reader.result as string });
                showSuccess("Avatar updated.");
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 p-6 lg:p-10 animate-in fade-in duration-500">
            <div className="max-w-5xl mx-auto space-y-6">

                {/* --- Main Header --- */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Settings</h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-1">
                            Manage your account settings and preferences.
                        </p>
                    </div>
                </div>

                <Tabs defaultValue="general" className="w-full">
                    <TabsList className="grid w-full grid-cols-4 lg:w-[400px] mb-8 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1">
                        <TabsTrigger value="general" className="text-slate-500 dark:text-slate-400 data-[state=active]:text-slate-900 dark:data-[state=active]:text-white data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm">General</TabsTrigger>
                        <TabsTrigger value="security" className="text-slate-500 dark:text-slate-400 data-[state=active]:text-slate-900 dark:data-[state=active]:text-white data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm">Security</TabsTrigger>
                        <TabsTrigger value="notifications" className="text-slate-500 dark:text-slate-400 data-[state=active]:text-slate-900 dark:data-[state=active]:text-white data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm">Notifs</TabsTrigger>
                        <TabsTrigger value="appearance" className="text-slate-500 dark:text-slate-400 data-[state=active]:text-slate-900 dark:data-[state=active]:text-white data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm">Appearance</TabsTrigger>
                    </TabsList>

                    {/* --- GENERAL TAB --- */}
                    <TabsContent value="general" className="space-y-6 animate-in slide-in-from-bottom-2 duration-300">
                        <div className="grid gap-6">
                            <Card className="border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-950">
                                <CardHeader>
                                    <CardTitle className="dark:text-white">Profile Information</CardTitle>
                                    <CardDescription className="dark:text-slate-400">Update your photo and personal details here.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-8">
                                    {/* Avatar Row */}
                                    <div className="flex items-center gap-6">
                                        <div
                                            className="relative group cursor-pointer"
                                            onClick={() => fileInputRef.current?.click()}
                                        >
                                            <Avatar className="w-20 h-20 border border-slate-200 dark:border-slate-700">
                                                <AvatarImage src={user.avatar} />
                                                <AvatarFallback className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white">AD</AvatarFallback>
                                            </Avatar>
                                            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Camera className="text-white h-6 w-6" />
                                            </div>
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                className="hidden"
                                                accept="image/*"
                                                onChange={handleAvatarUpload}
                                            />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-slate-900 dark:text-white">Profile Photo</h3>
                                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">Click to upload a new avatar.</p>
                                        </div>
                                    </div>

                                    <Separator className="dark:bg-slate-800" />

                                    {/* Form Grid */}
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Full Name</label>
                                            <Input name="name" value={formData.name} onChange={handleInputChange} className="text-slate-900 dark:text-white dark:bg-slate-900 dark:border-slate-800" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email (Read Only)</label>
                                            <Input value={formData.email} readOnly className="bg-slate-50 dark:bg-slate-900/50 border-dashed dark:border-slate-800 text-slate-500 dark:text-slate-400" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Job Title</label>
                                            <Input name="role" value={formData.role} onChange={handleInputChange} className="text-slate-900 dark:text-white dark:bg-slate-900 dark:border-slate-800" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Phone</label>
                                            <Input name="phone" value={formData.phone} onChange={handleInputChange} className="text-slate-900 dark:text-white dark:bg-slate-900 dark:border-slate-800" />
                                        </div>
                                        <div className="col-span-2 space-y-2">
                                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Location</label>
                                            <Input name="location" value={formData.location} onChange={handleInputChange} className="text-slate-900 dark:text-white dark:bg-slate-900 dark:border-slate-800" />
                                        </div>
                                    </div>

                                    <div className="flex justify-end pt-4">
                                        <Button onClick={handleSave} disabled={isLoading} className="bg-slate-900 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200">
                                            {isLoading ? "Saving..." : "Save Changes"}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* --- SECURITY TAB --- */}
                    <TabsContent value="security" className="space-y-6 animate-in slide-in-from-bottom-2 duration-300">
                        <Card className="border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-950">
                            <CardHeader>
                                <CardTitle className="dark:text-white">Security Settings</CardTitle>
                                <CardDescription className="dark:text-slate-400">Manage your password and account security preferences.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">

                                <div className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-800 rounded-lg bg-slate-50/50 dark:bg-slate-900/50">
                                    <div className="space-y-1">
                                        <h4 className="text-sm font-medium text-slate-900 dark:text-white">Password</h4>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">Changed 3 months ago</p>
                                    </div>
                                    <Button variant="outline" className="h-9 text-sm dark:bg-slate-800 dark:text-white dark:border-slate-700">Change Password</Button>
                                </div>

                                <div className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-800 rounded-lg bg-slate-50/50 dark:bg-slate-900/50">
                                    <div className="space-y-1">
                                        <h4 className="text-sm font-medium text-slate-900 dark:text-white">Two-Factor Authentication</h4>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">Add an extra layer of security to your account.</p>
                                    </div>
                                    <Switch
                                        className="
                                                data-[state=checked]:bg-black
                                                data-[state=unchecked]:bg-gray-300

                                                dark:data-[state=checked]:bg-white
                                                dark:data-[state=unchecked]:bg-gray-700
                                            "
                                    />

                                </div>



                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* --- NOTIFICATIONS TAB --- */}
                    <TabsContent value="notifications" className="space-y-6 animate-in slide-in-from-bottom-2 duration-300">
                        <Card className="border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-950">
                            <CardHeader>
                                <CardTitle className="dark:text-white">Notifications</CardTitle>
                                <CardDescription className="dark:text-slate-400">Configure how you receive alerts.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-4">Email Notifications</h4>
                                    {[
                                        { label: "Daily Digest", desc: "Get a summary of daily activities." },
                                        { label: "New Employee Signups", desc: "When a new employee joins the platform." },
                                        { label: "Leave Requests", desc: "When an employee applies for leave." },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-start space-x-3">
                                            <Checkbox id={`notif-${i}`} defaultChecked className="mt-1" />
                                            <div className="grid gap-1.5 leading-none">
                                                <label htmlFor={`notif-${i}`} className="text-sm font-medium text-slate-900 dark:text-white leading-none cursor-pointer">
                                                    {item.label}
                                                </label>
                                                <p className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <Separator className="dark:bg-slate-800" />
                                <div className="space-y-4">
                                    <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-4">Push Notifications</h4>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-slate-700 dark:text-slate-300">Enable Push Notifications</span>
                                        <Switch />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* --- APPEARANCE TAB --- */}
                    <TabsContent value="appearance" className="space-y-6 animate-in slide-in-from-bottom-2 duration-300">
                        <Card className="border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-950">
                            <CardHeader>
                                <CardTitle className="dark:text-white">Appearance</CardTitle>
                                <CardDescription className="dark:text-slate-400">Customize the interface theme.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-900 dark:text-white">Theme Preference</label>
                                    <div className="grid grid-cols-3 gap-4 max-w-md">
                                        <div
                                            className={`cursor-pointer rounded-lg border-2 p-1 hover:border-slate-900 dark:hover:border-slate-400 transition-all ${theme === 'light' ? 'border-slate-900 dark:border-white' : 'border-transparent'}`}
                                            onClick={() => theme === 'dark' && toggleTheme()}
                                        >
                                            <div className="space-y-2 rounded-md bg-slate-100 p-2">
                                                <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                                                    <div className="h-2 w-[80px] rounded-lg bg-slate-200" />
                                                    <div className="h-2 w-[100px] rounded-lg bg-slate-200" />
                                                </div>
                                                <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                                                    <div className="h-4 w-4 rounded-full bg-slate-200" />
                                                    <div className="h-2 w-[100px] rounded-lg bg-slate-200" />
                                                </div>
                                            </div>
                                            <span className="block w-full text-center font-normal text-xs mt-2 text-slate-900 dark:text-white">Light</span>
                                        </div>
                                        <div
                                            className={`cursor-pointer rounded-lg border-2 p-1 hover:border-slate-900 dark:hover:border-slate-400 transition-all ${theme === 'dark' ? 'border-slate-900 dark:border-white' : 'border-transparent'}`}
                                            onClick={() => theme === 'light' && toggleTheme()}
                                        >
                                            <div className="space-y-2 rounded-md bg-slate-950 p-2">
                                                <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                                                    <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                                                    <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                                                </div>
                                                <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                                                    <div className="h-4 w-4 rounded-full bg-slate-400" />
                                                    <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                                                </div>
                                            </div>
                                            <span className="block w-full text-center font-normal text-xs mt-2 text-slate-900 dark:text-white">Dark</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>

            </div>
        </div>
    );
};

export default AdminSettings;
