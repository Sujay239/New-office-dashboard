import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Users,
    FileText,
    Wallet,
    TrendingUp,
    UserPlus,
    Megaphone,
    Play,
    Search,
    Bell,
    MoreVertical,
    Calendar,
    Clock,
    CheckCircle2,
    XCircle,
    BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const AdminDashboard: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 p-6 lg:p-10 animate-in fade-in duration-500">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* --- Header with Search --- */}
                <div className="sticky top-0 z-20 bg-slate-50/95 dark:bg-slate-950/95 backdrop-blur support-[backdrop-filter]:bg-slate-50/50 py-4 -mx-6 px-6 lg:-mx-10 lg:px-10 -mt-6 lg:-mt-6 border-b border-slate-200/50 dark:border-slate-800/50 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                            Admin Dashboard
                        </h1>
                        <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 mt-1">
                            Welcome back, Admin. Here's what's happening today.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative hidden md:block">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                            <Input
                                placeholder="Search employees..."
                                className="pl-9 w-64 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-500"
                            />
                        </div>
                        <Button variant="outline" size="icon" className="rounded-full border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-200 cursor-pointer">
                            <Bell className="h-4 w-4" />
                        </Button>

                    </div>
                </div>

                {/* --- Top Metrics Grid (3 Columns now) --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Total Employees */}
                    <Card className="p-6 border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900/50 hover:shadow-md transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Staff</span>
                            <div className="p-2 bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 rounded-lg">
                                <Users className="h-5 w-5" />
                            </div>
                        </div>
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">124</h2>
                            <div className="flex items-center mt-1 text-xs">
                                <span className="text-green-600 dark:text-green-400 flex items-center font-medium">
                                    <TrendingUp className="h-3 w-3 mr-1" /> +4%
                                </span>
                                <span className="text-slate-400 dark:text-slate-500 ml-2">from last month</span>
                            </div>
                        </div>
                    </Card>

                    {/* Payroll */}
                    <Card className="p-6 border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900/50 hover:shadow-md transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Payroll Cost</span>
                            <div className="p-2 bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400 rounded-lg">
                                <Wallet className="h-5 w-5" />
                            </div>
                        </div>
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">₹12.4L</h2>
                            <div className="flex items-center mt-1 text-xs">
                                <span className="text-slate-500 dark:text-slate-400">Next run: </span>
                                <span className="text-slate-900 dark:text-white font-medium ml-1">Nov 30</span>
                            </div>
                        </div>
                    </Card>

                    {/* Attendance */}
                    <Card className="p-6 border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900/50 hover:shadow-md transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Attendance</span>
                            <div className="p-2 bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400 rounded-lg">
                                <Clock className="h-5 w-5" />
                            </div>
                        </div>
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">96%</h2>
                            <div className="flex items-center mt-1 text-xs">
                                <span className="text-red-500 dark:text-red-400 flex items-center font-medium">
                                    <TrendingUp className="h-3 w-3 mr-1 rotate-180" /> -2%
                                </span>
                                <span className="text-slate-400 dark:text-slate-500 ml-2">vs yesterday</span>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* --- Main Content Grid --- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column (Charts & Lists) - Spans 2 columns */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* 1. Payroll History Chart (Simulated) */}
                        <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white">Payroll Expenses (6 Months)</CardTitle>
                                <Button variant="ghost" size="sm" className="text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer">
                                    <MoreVertical className="h-4 w-4" />
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <div className="h-64 flex items-end justify-between gap-4 mt-4 px-2">
                                    {/* Simple CSS Bars */}
                                    {[
                                        { m: 'Jun', h: '65%', v: '10.2L' }, { m: 'Jul', h: '50%', v: '9.8L' },
                                        { m: 'Aug', h: '75%', v: '11.5L' }, { m: 'Sep', h: '60%', v: '10.5L' },
                                        { m: 'Oct', h: '85%', v: '12.1L' }, { m: 'Nov', h: '95%', v: '12.4L' }
                                    ].map((bar, i) => (
                                        <div key={i} className="flex flex-col items-center gap-2 w-full group cursor-pointer">
                                            <div className="text-xs font-bold text-slate-700 dark:text-white opacity-0 group-hover:opacity-100 transition-opacity mb-1">{bar.v}</div>
                                            <div
                                                className="w-full bg-slate-100 dark:bg-slate-800 rounded-t-md relative overflow-hidden"
                                                style={{ height: '200px' }}
                                            >
                                                <div
                                                    className={`absolute bottom-0 w-full rounded-t-md transition-all duration-500 ${i === 5 ? 'bg-slate-900 dark:bg-slate-100' : 'bg-blue-500/80 hover:bg-blue-500 dark:bg-blue-600 dark:hover:bg-blue-500'}`}
                                                    style={{ height: bar.h }}
                                                />
                                            </div>
                                            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{bar.m}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* 2. Leave Requests Table (Actionable) */}
                        <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                                        <FileText className="h-5 w-5 text-amber-500" /> Pending Leave Requests
                                        <Badge variant="secondary" className="ml-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">3 New</Badge>
                                    </CardTitle>
                                    <Button variant="link" className="text-sm text-blue-600 dark:text-blue-400 cursor-pointer">View All</Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {[
                                        { name: "Alice Johnson", role: "UX Designer", type: "Sick Leave", date: "Nov 24 - Nov 26", days: "3 Days" },
                                        { name: "Robert Fox", role: "Backend Dev", type: "Casual Leave", date: "Dec 01 - Dec 02", days: "2 Days" },
                                        { name: "Sarah Miller", role: "HR Manager", type: "Paid Leave", date: "Dec 10", days: "1 Day" },
                                    ].map((req, i) => (
                                        <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
                                            <div className="flex items-center gap-4">
                                                <Avatar className="h-10 w-10 border border-slate-200 dark:border-slate-700">
                                                    <AvatarImage src={`https://i.pravatar.cc/150?u=${req.name}`} />
                                                    <AvatarFallback className="text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800">{req.name[0]}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-medium text-slate-900 dark:text-white">{req.name}</p>
                                                    <p className="text-xs text-slate-500 dark:text-slate-400">{req.role} • <span className="text-amber-600 dark:text-amber-500 font-medium">{req.type}</span></p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4 justify-between sm:justify-end w-full sm:w-auto">
                                                <div className="text-right mr-4">
                                                    <p className="text-sm font-medium text-slate-900 dark:text-slate-200">{req.date}</p>
                                                    <p className="text-xs text-slate-500 dark:text-slate-500">{req.days}</p>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button size="icon" variant="ghost" className="h-8 w-8 text-green-600 dark:text-green-500 hover:text-green-700 hover:bg-green-100 dark:hover:bg-green-900/30 cursor-pointer">
                                                        <CheckCircle2 className="h-5 w-5" />
                                                    </Button>
                                                    <Button size="icon" variant="ghost" className="h-8 w-8 text-red-600 dark:text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/30 cursor-pointer">
                                                        <XCircle className="h-5 w-5" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                    </div>

                    {/* Right Column (Widgets) */}
                    <div className="space-y-8">

                        {/* 1. Department Distribution */}
                        <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50">
                            <CardHeader>
                                <CardTitle className="text-base font-semibold text-slate-900 dark:text-white">Department Headcount</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-5">
                                {[
                                    { name: "Engineering", count: 42, color: "bg-blue-500" },
                                    { name: "Marketing", count: 24, color: "bg-purple-500" },
                                    { name: "Design", count: 18, color: "bg-pink-500" },
                                    { name: "Sales", count: 30, color: "bg-orange-500" },
                                    { name: "HR & Admin", count: 10, color: "bg-slate-500" },
                                ].map((dept) => (
                                    <div key={dept.name}>
                                        <div className="flex justify-between text-sm mb-1.5">
                                            <span className="text-slate-700 dark:text-slate-300 font-medium">{dept.name}</span>
                                            <span className="text-slate-500 dark:text-slate-400">{dept.count}</span>
                                        </div>
                                        <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                            <div className={`h-full ${dept.color}`} style={{ width: `${(dept.count / 124) * 100}%` }}></div>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>


                        {/* 3. Quick Actions (Condensed) */}
                        <Card className="border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/20 py-2 h-[48%] max-sm:mb-[52px]">
                            <CardHeader className="pb-2 flex items-center mt-4 ">
                                <CardTitle className="text-base font-semibold text-slate-900 dark:text-white">Shortcuts</CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-2 gap-3">
                                <Button variant="outline" className="h-20 flex-col gap-2 hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 cursor-pointer">
                                    <Megaphone className="h-5 w-5 text-blue-500" />
                                    <span className="text-xs">Announcement</span>
                                </Button>
                                <Button variant="outline" className="h-20 flex-col gap-2 hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 cursor-pointer">
                                    <Play className="h-5 w-5 text-green-500" />
                                    <span className="text-xs">Run Payroll</span>
                                </Button>
                                <Button variant="outline" className="h-20 flex-col gap-2 hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 cursor-pointer">
                                    <BarChart3 className="h-5 w-5 text-purple-500" />
                                    <span className="text-xs">Reports</span>
                                </Button>
                                <Button variant="outline" className="h-20 flex-col gap-2 hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 cursor-pointer">
                                    <Calendar className="h-5 w-5 text-orange-500" />
                                    <span className="text-xs">Holidays</span>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
