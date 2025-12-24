import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Filter, Search, DollarSign, Send, CheckCircle2, Clock, X } from "lucide-react";
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
import { useNotification } from "../../components/NotificationProvider";

// Mock Data for Admin View
const initialPayrollRecords = [
    { id: 1, name: "Alice Johnson", role: "Software Engineer", salary: 120000, allowances: 5000, deductions: 2000, netPay: 123000, status: "Paid", month: "Nov 2023", avatar: "https://github.com/shadcn.png" },
    { id: 2, name: "Bob Smith", role: "Product Manager", salary: 140000, allowances: 6000, deductions: 2500, netPay: 143500, status: "Pending", month: "Nov 2023", avatar: "" },
    { id: 3, name: "Charlie Brown", role: "Designer", salary: 95000, allowances: 4000, deductions: 1500, netPay: 97500, status: "Processing", month: "Nov 2023", avatar: "" },
    { id: 4, name: "David Wilson", role: "QA Engineer", salary: 105000, allowances: 4500, deductions: 1800, netPay: 107700, status: "Paid", month: "Nov 2023", avatar: "" },
    { id: 5, name: "Eve Davis", role: "HR Specialist", salary: 110000, allowances: 5000, deductions: 2000, netPay: 113000, status: "Paid", month: "Nov 2023", avatar: "" },
];

const AdminPayroll: React.FC = () => {
    const { showSuccess, showError } = useNotification();
    const [selectedMonth, setSelectedMonth] = useState("Nov 2023");
    const [searchQuery, setSearchQuery] = useState("");
    const [records, setRecords] = useState(initialPayrollRecords);

    // Payment Modal State
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [currentRecord, setCurrentRecord] = useState<typeof initialPayrollRecords[0] | null>(null);
    const [editSalary, setEditSalary] = useState("");
    const [editAllowances, setEditAllowances] = useState("");
    const [editDeductions, setEditDeductions] = useState("");
    const [netPayable, setNetPayable] = useState(0);

    const filteredRecords = records.filter(record =>
        (record.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            record.role.toLowerCase().includes(searchQuery.toLowerCase())) &&
        record.month === selectedMonth
    );

    const totalPayroll = filteredRecords.reduce((acc, curr) => acc + curr.netPay, 0);
    const paidCount = filteredRecords.filter(r => r.status === "Paid").length;
    const pendingCount = filteredRecords.filter(r => r.status === "Pending" || r.status === "Processing").length;

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
    };

    const handleOpenPaymentModal = (record: typeof initialPayrollRecords[0]) => {
        if (record.status === "Paid") {
            showSuccess("This employee has already been paid.");
            return;
        }
        setCurrentRecord(record);
        setCurrentRecord(record);
        setEditSalary("");
        setEditAllowances("");
        setEditDeductions("");
        setNetPayable(record.netPay);
        setIsPaymentModalOpen(true);
    };

    // Auto-calculate Net Pay when inputs change
    React.useEffect(() => {
        const s = parseFloat(editSalary) || 0;
        const a = parseFloat(editAllowances) || 0;
        const d = parseFloat(editDeductions) || 0;
        setNetPayable(s + a - d);
    }, [editSalary, editAllowances, editDeductions]);

    const handleConfirmPayment = () => {
        if (!currentRecord) return;

        const salary = parseFloat(editSalary);
        const allowances = parseFloat(editAllowances);
        const deductions = parseFloat(editDeductions);

        if (isNaN(salary) || salary < 0 || isNaN(allowances) || allowances < 0 || isNaN(deductions) || deductions < 0) {
            showError("Please enter valid positive amounts.");
            return;
        }

        setRecords(prev => prev.map(rec => {
            if (rec.id === currentRecord.id) {
                return {
                    ...rec,
                    status: "Paid",
                    salary: salary,
                    allowances: allowances,
                    deductions: deductions,
                    netPay: netPayable
                };
            }
            return rec;
        }));

        showSuccess(`Marked as Paid for ${currentRecord.name}. Net Pay: ${formatCurrency(netPayable)}`);
        setIsPaymentModalOpen(false);
        setCurrentRecord(null);
    };

    return (
        <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 p-6 lg:p-10 animate-in fade-in duration-500">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* --- Header --- */}
                <div className="sticky top-0 z-20 bg-slate-50/95 dark:bg-slate-950/95 backdrop-blur support-[backdrop-filter]:bg-slate-50/50 py-4 -mx-6 px-6 lg:-mx-10 lg:px-10 -mt-6 lg:-mt-6 border-b border-slate-200/50 dark:border-slate-800/50 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                            Payroll Management
                        </h1>
                        <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 mt-1">
                            Process salaries, view history, and manually update payment status.
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button className="bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-slate-900 cursor-pointer shadow-lg">
                            <Send className="mr-2 h-4 w-4" /> Run Payroll
                        </Button>
                        <Button variant="outline" className="dark:bg-slate-800 dark:text-white dark:border-slate-800 cursor-pointer">
                            <Download className="mr-2 h-4 w-4" /> Export Report
                        </Button>
                    </div>
                </div>

                {/* --- Stats Row --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="p-6 border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900/50 flex flex-col justify-between hover:shadow-md transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Payroll Cost</span>
                            <div className="p-2 bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 rounded-lg">
                                <DollarSign className="h-5 w-5" />
                            </div>
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{formatCurrency(totalPayroll)}</h2>
                            <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                                For {selectedMonth}
                            </p>
                        </div>
                    </Card>

                    <Card className="p-6 border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900/50 flex flex-col justify-between hover:shadow-md transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Employees Paid</span>
                            <div className="p-2 bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400 rounded-lg">
                                <CheckCircle2 className="h-5 w-5" />
                            </div>
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{paidCount} <span className="text-lg text-slate-400 font-normal">/ {filteredRecords.length}</span></h2>
                            <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                                All processed successfully
                            </p>
                        </div>
                    </Card>

                    <Card className="p-6 border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900/50 flex flex-col justify-between hover:shadow-md transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Pending Process</span>
                            <div className="p-2 bg-amber-100 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400 rounded-lg">
                                <Clock className="h-5 w-5" />
                            </div>
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{pendingCount}</h2>
                            <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
                                Action required
                            </p>
                        </div>
                    </Card>
                </div>

                {/* --- Filters & Search --- */}
                <div className="flex flex-col md:flex-row gap-4 items-center bg-white dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                            placeholder="Search by name or role..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 dark:text-white dark:placeholder:text-slate-500"
                        />
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                            <SelectTrigger className="w-[180px] bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 dark:text-white cursor-pointer">
                                <SelectValue placeholder="Select Month" />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-slate-900 dark:border-slate-800">
                                <SelectItem value="Nov 2023" className="cursor-pointer dark:text-white focus:bg-slate-100 dark:focus:bg-slate-800">November 2023</SelectItem>
                                <SelectItem value="Oct 2023" className="cursor-pointer dark:text-white focus:bg-slate-100 dark:focus:bg-slate-800">October 2023</SelectItem>
                                <SelectItem value="Sep 2023" className="cursor-pointer dark:text-white focus:bg-slate-100 dark:focus:bg-slate-800">September 2023</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button variant="outline" className="dark:text-white cursor-pointer">
                            <Filter className="mr-2 h-4 w-4" /> Status
                        </Button>
                    </div>
                </div>

                {/* --- Employee Payroll List --- */}
                <div className="space-y-4">
                    {/* Desktop Table */}
                    <Card className="hidden md:block border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900/50 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-slate-100 dark:border-slate-800 text-xs uppercase text-slate-500 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-900/20">
                                        <th className="px-6 py-4 font-medium">Employee</th>
                                        <th className="px-6 py-4 font-medium">Month</th>
                                        <th className="px-6 py-4 font-medium">Status</th>
                                        <th className="px-6 py-4 font-medium">Net Pay</th>
                                        <th className="px-6 py-4 font-medium text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredRecords.map((record) => (
                                        <tr key={record.id} className="border-b border-slate-100 dark:border-slate-800 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-9 w-9 border border-slate-200 dark:border-slate-700">
                                                        <AvatarImage src={record.avatar} />
                                                        <AvatarFallback className="bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">{record.name.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <div className="font-medium text-slate-900 dark:text-white text-sm">{record.name}</div>
                                                        <div className="text-xs text-slate-500 dark:text-slate-500">{record.role}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-slate-600 dark:text-slate-300 text-sm">{record.month}</td>
                                            <td className="px-6 py-4">
                                                <Badge
                                                    variant="outline"
                                                    className={`
                                            capitalize cursor-pointer
                                            ${record.status === 'Paid' ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900/30' : ''}
                                            ${record.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-900/30' : ''}
                                            ${record.status === 'Processing' ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-900/30' : ''}
                                        `}
                                                >
                                                    {record.status}
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white text-sm">
                                                {record.status === 'Paid' ? formatCurrency(record.netPay) : <span className="text-slate-400 text-xs italic">Not Disbursed</span>}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                {record.status !== "Paid" ? (
                                                    <Button
                                                        onClick={() => handleOpenPaymentModal(record)}
                                                        size="sm"
                                                        className="cursor-pointer bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow-lg hover:bg-slate-800 dark:hover:bg-slate-200"
                                                    >
                                                        Pay Now
                                                    </Button>
                                                ) : (
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full cursor-pointer">
                                                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                                                    </Button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>

                    {/* Mobile View: Cards */}
                    <div className="md:hidden space-y-4">
                        {filteredRecords.map((record) => (
                            <Card key={record.id} className="p-4 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 shadow-sm cursor-pointer hover:border-slate-300 dark:hover:border-slate-700 transition-all">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-10 w-10 border border-slate-200 dark:border-slate-700">
                                            <AvatarImage src={record.avatar} />
                                            <AvatarFallback className="bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">{record.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h3 className="font-bold text-slate-900 dark:text-white text-sm">{record.name}</h3>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">{record.role}</p>
                                        </div>
                                    </div>
                                    <Badge
                                        variant="outline"
                                        className={`
                                    capitalize
                                    ${record.status === 'Paid' ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900/30' : ''}
                                    ${record.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-900/30' : ''}
                                    ${record.status === 'Processing' ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-900/30' : ''}
                                `}
                                    >
                                        {record.status}
                                    </Badge>
                                </div>
                                <div className="grid grid-cols-2 gap-3 text-sm border-t border-slate-100 dark:border-slate-800 pt-3">
                                    <div>
                                        <p className="text-xs text-slate-500 dark:text-slate-500 mb-1">Month</p>
                                        <p className="font-medium text-slate-700 dark:text-slate-300">{record.month}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-slate-500 dark:text-slate-500 mb-1">Net Pay</p>
                                        <p className="font-bold text-slate-900 dark:text-white">
                                            {record.status === 'Paid' ? formatCurrency(record.netPay) : '-'}
                                        </p>
                                    </div>
                                </div>
                                {record.status !== "Paid" && (
                                    <div className="mt-4">
                                        <Button
                                            onClick={() => handleOpenPaymentModal(record)}
                                            className="w-full cursor-pointer bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200"
                                        >
                                            Process Payment
                                        </Button>
                                    </div>
                                )}
                            </Card>
                        ))}
                    </div>
                </div>

            </div>

            {/* --- Process Payment Modal --- */}
            {isPaymentModalOpen && currentRecord && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <Card className="w-full max-w-md p-6 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 shadow-2xl relative animate-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Process Payment</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Update payment status for {currentRecord.name}.</p>
                            </div>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800" onClick={() => setIsPaymentModalOpen(false)}>
                                <X className="h-4 w-4 text-slate-500" />
                            </Button>
                        </div>

                        <div className="space-y-4">
                            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800 space-y-3">
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-slate-500 uppercase">Base Salary</label>
                                    <Input
                                        type="number"
                                        value={editSalary}
                                        onChange={(e) => setEditSalary(e.target.value)}
                                        className="bg-white dark:bg-slate-950 dark:text-white"
                                        placeholder="Enter base salary"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-slate-500 uppercase">Allowances</label>
                                    <Input
                                        type="number"
                                        value={editAllowances}
                                        onChange={(e) => setEditAllowances(e.target.value)}
                                        className="bg-white dark:bg-slate-950 text-green-600 dark:text-green-400"
                                        placeholder="Enter allowances"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-slate-500 uppercase">Deductions</label>
                                    <Input
                                        type="number"
                                        value={editDeductions}
                                        onChange={(e) => setEditDeductions(e.target.value)}
                                        className="bg-white dark:bg-slate-950 text-red-500 dark:text-red-400"
                                        placeholder="Enter deductions"
                                    />
                                </div>
                            </div>

                            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                                <div className="flex justify-between items-center bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
                                    <span className="font-bold text-slate-700 dark:text-slate-300">Net Payable</span>
                                    <span className="text-xl font-bold text-slate-900 dark:text-white">{formatCurrency(netPayable)}</span>
                                </div>
                                <p className="text-xs text-slate-500 mt-2 text-center">
                                    Net Pay = Base Salary + Allowances - Deductions
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 mt-8">
                            <Button variant="outline" onClick={() => setIsPaymentModalOpen(false)} className="cursor-pointer border-slate-200 dark:border-slate-800 dark:text-white">Cancel</Button>
                            <Button onClick={handleConfirmPayment} className="bg-green-600 hover:bg-green-700 text-white cursor-pointer shadow-lg shadow-green-900/20">
                                <CheckCircle2 className="mr-2 h-4 w-4" /> Confirm & Pay
                            </Button>
                        </div>
                    </Card>
                </div>
            )}

        </div>
    );
};

export default AdminPayroll;
