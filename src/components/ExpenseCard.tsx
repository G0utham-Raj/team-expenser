import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X, MessageSquare } from "lucide-react";
import { useState } from "react";
import { CommentDialog } from "./CommentDialog";

export type ExpenseStatus = "pending" | "approved" | "rejected";

export interface Expense {
  id: string;
  employeeName: string;
  amount: number;
  category: string;
  date: string;
  description: string;
  status: ExpenseStatus;
  approverComment?: string;
}

interface ExpenseCardProps {
  expense: Expense;
  onApprove: (id: string) => void;
  onReject: (id: string, comment: string) => void;
}

export const ExpenseCard = ({ expense, onApprove, onReject }: ExpenseCardProps) => {
  const [showCommentDialog, setShowCommentDialog] = useState(false);

  const getStatusColor = (status: ExpenseStatus) => {
    switch (status) {
      case "approved":
        return "bg-success text-success-foreground";
      case "rejected":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-warning text-warning-foreground";
    }
  };

  const handleReject = (comment: string) => {
    onReject(expense.id, comment);
    setShowCommentDialog(false);
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-xl">{expense.employeeName}</CardTitle>
            <CardDescription>{expense.category}</CardDescription>
          </div>
          <Badge className={getStatusColor(expense.status)}>
            {expense.status.charAt(0).toUpperCase() + expense.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-primary">
              ${expense.amount.toLocaleString()}
            </span>
            <span className="text-sm text-muted-foreground">
              {new Date(expense.date).toLocaleDateString()}
            </span>
          </div>
          
          <p className="text-sm text-foreground">{expense.description}</p>

          {expense.approverComment && (
            <div className="p-3 bg-muted rounded-lg">
              <div className="flex items-start gap-2">
                <MessageSquare className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">
                    Approver Comment
                  </p>
                  <p className="text-sm">{expense.approverComment}</p>
                </div>
              </div>
            </div>
          )}

          {expense.status === "pending" && (
            <div className="flex gap-2 pt-2">
              <Button
                onClick={() => onApprove(expense.id)}
                className="flex-1 bg-success hover:bg-success/90"
              >
                <Check className="mr-2 h-4 w-4" />
                Approve
              </Button>
              <Button
                onClick={() => setShowCommentDialog(true)}
                variant="destructive"
                className="flex-1"
              >
                <X className="mr-2 h-4 w-4" />
                Reject
              </Button>
            </div>
          )}
        </div>
      </CardContent>

      <CommentDialog
        open={showCommentDialog}
        onOpenChange={setShowCommentDialog}
        onSubmit={handleReject}
      />
    </Card>
  );
};
