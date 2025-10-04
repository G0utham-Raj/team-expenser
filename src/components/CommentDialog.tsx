import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface CommentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (comment: string) => void;
}

export const CommentDialog = ({ open, onOpenChange, onSubmit }: CommentDialogProps) => {
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    onSubmit(comment);
    setComment("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reject Expense</DialogTitle>
          <DialogDescription>
            Please provide a reason for rejecting this expense. This will be visible to the employee.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <Label htmlFor="comment">Comment (optional)</Label>
          <Textarea
            id="comment"
            placeholder="Enter your reason for rejection..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleSubmit}>
            Reject Expense
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
