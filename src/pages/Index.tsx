import { useState } from "react";
import { ExpenseCard, Expense, ExpenseStatus } from "@/components/ExpenseCard";
import { StatsCard } from "@/components/StatsCard";
import { Clock, CheckCircle2, XCircle, DollarSign } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const Index = () => {
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: "1",
      employeeName: "Sarah Johnson",
      amount: 1250.00,
      category: "Travel",
      date: "2025-01-15",
      description: "Flight tickets for client meeting in San Francisco",
      status: "pending",
    },
    {
      id: "2",
      employeeName: "Michael Chen",
      amount: 450.00,
      category: "Office Supplies",
      date: "2025-01-14",
      description: "New ergonomic keyboard and mouse for workstation",
      status: "pending",
    },
    {
      id: "3",
      employeeName: "Emma Davis",
      amount: 890.00,
      category: "Marketing",
      date: "2025-01-13",
      description: "Social media advertising campaign for Q1 launch",
      status: "approved",
    },
    {
      id: "4",
      employeeName: "James Wilson",
      amount: 320.00,
      category: "Meals & Entertainment",
      date: "2025-01-12",
      description: "Team dinner with potential investors",
      status: "rejected",
      approverComment: "Missing itemized receipt. Please resubmit with detailed breakdown.",
    },
    {
      id: "5",
      employeeName: "Lisa Anderson",
      amount: 2100.00,
      category: "Software",
      date: "2025-01-11",
      description: "Annual subscription for design software suite",
      status: "pending",
    },
  ]);

  const handleApprove = (id: string) => {
    setExpenses((prev) =>
      prev.map((exp) =>
        exp.id === id ? { ...exp, status: "approved" as ExpenseStatus } : exp
      )
    );
    toast.success("Expense approved successfully");
  };

  const handleReject = (id: string, comment: string) => {
    setExpenses((prev) =>
      prev.map((exp) =>
        exp.id === id
          ? {
              ...exp,
              status: "rejected" as ExpenseStatus,
              approverComment: comment || "No comment provided",
            }
          : exp
      )
    );
    toast.error("Expense rejected");
  };

  const pendingExpenses = expenses.filter((exp) => exp.status === "pending");
  const approvedExpenses = expenses.filter((exp) => exp.status === "approved");
  const rejectedExpenses = expenses.filter((exp) => exp.status === "rejected");

  const totalPending = pendingExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  const totalApproved = approvedExpenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Expense Manager</h1>
          <p className="text-muted-foreground">
            Review and approve team expense submissions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard
            title="Pending Approval"
            value={pendingExpenses.length}
            icon={Clock}
            description={`$${totalPending.toLocaleString()} total`}
          />
          <StatsCard
            title="Approved"
            value={approvedExpenses.length}
            icon={CheckCircle2}
            description={`$${totalApproved.toLocaleString()} total`}
          />
          <StatsCard
            title="Rejected"
            value={rejectedExpenses.length}
            icon={XCircle}
          />
          <StatsCard
            title="All Expenses"
            value={expenses.length}
            icon={DollarSign}
            description={`$${(totalPending + totalApproved).toLocaleString()} total`}
          />
        </div>

        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="pending">
              Pending ({pendingExpenses.length})
            </TabsTrigger>
            <TabsTrigger value="approved">
              Approved ({approvedExpenses.length})
            </TabsTrigger>
            <TabsTrigger value="rejected">
              Rejected ({rejectedExpenses.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pendingExpenses.length > 0 ? (
                pendingExpenses.map((expense) => (
                  <ExpenseCard
                    key={expense.id}
                    expense={expense}
                    onApprove={handleApprove}
                    onReject={handleReject}
                  />
                ))
              ) : (
                <p className="col-span-full text-center text-muted-foreground py-12">
                  No pending expenses
                </p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="approved" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {approvedExpenses.length > 0 ? (
                approvedExpenses.map((expense) => (
                  <ExpenseCard
                    key={expense.id}
                    expense={expense}
                    onApprove={handleApprove}
                    onReject={handleReject}
                  />
                ))
              ) : (
                <p className="col-span-full text-center text-muted-foreground py-12">
                  No approved expenses
                </p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="rejected" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rejectedExpenses.length > 0 ? (
                rejectedExpenses.map((expense) => (
                  <ExpenseCard
                    key={expense.id}
                    expense={expense}
                    onApprove={handleApprove}
                    onReject={handleReject}
                  />
                ))
              ) : (
                <p className="col-span-full text-center text-muted-foreground py-12">
                  No rejected expenses
                </p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
