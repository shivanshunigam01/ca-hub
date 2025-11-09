import { useState } from "react";
import { Plus, Search, Eye, Pencil, Trash2, FileText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Quotation {
  id: string;
  quotationNo: string;
  customer: string;
  date: string;
  services: string[];
  subTotal: number;
  tax: number;
  total: number;
  status: "draft" | "sent" | "accepted" | "rejected";
}

const mockQuotations: Quotation[] = [
  {
    id: "1",
    quotationNo: "QT-2025-001",
    customer: "Rajesh Kumar",
    date: "2025-11-01",
    services: ["GST Registration", "Income Tax Filing"],
    subTotal: 8000,
    tax: 18,
    total: 9440,
    status: "sent",
  },
  {
    id: "2",
    quotationNo: "QT-2025-002",
    customer: "Priya Sharma",
    date: "2025-11-05",
    services: ["Audit Services"],
    subTotal: 15000,
    tax: 18,
    total: 17700,
    status: "accepted",
  },
  {
    id: "3",
    quotationNo: "QT-2025-003",
    customer: "Tech Solutions Ltd",
    date: "2025-11-08",
    services: ["Company Registration", "Accounting Services"],
    subTotal: 18000,
    tax: 18,
    total: 21240,
    status: "draft",
  },
];

export default function Quotations() {
  const [quotations, setQuotations] = useState<Quotation[]>(mockQuotations);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingQuotation, setEditingQuotation] = useState<Quotation | null>(null);

  const filteredQuotations = quotations.filter(
    (q) =>
      q.quotationNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.customer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenDialog = (quotation?: Quotation) => {
    setEditingQuotation(quotation || null);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setQuotations(quotations.filter((q) => q.id !== id));
    toast.success("Quotation deleted successfully!");
  };

  const convertToInvoice = (quotation: Quotation) => {
    toast.success(`Converting quotation ${quotation.quotationNo} to invoice...`);
    // In real app, this would navigate to invoice creation with pre-filled data
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted":
        return "default";
      case "sent":
        return "secondary";
      case "rejected":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Quotations</h1>
          <p className="text-muted-foreground mt-1">Manage quotations and proposals</p>
        </div>
        <Button onClick={() => handleOpenDialog()} className="gap-2">
          <Plus className="h-4 w-4" />
          Create Quotation
        </Button>
      </div>

      <Card className="p-6">
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search quotations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Quotation No</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Services</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredQuotations.map((quotation) => (
                <TableRow key={quotation.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell className="font-medium">{quotation.quotationNo}</TableCell>
                  <TableCell>{quotation.customer}</TableCell>
                  <TableCell>{new Date(quotation.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-1 flex-wrap">
                      {quotation.services.slice(0, 2).map((service, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                      {quotation.services.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{quotation.services.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold">
                    ₹{quotation.total.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(quotation.status)}>
                      {quotation.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-primary/10"
                        title="View"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-primary/10"
                        title="Download PDF"
                      >
                        <FileText className="h-4 w-4" />
                      </Button>
                      {quotation.status === "accepted" && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => convertToInvoice(quotation)}
                          className="hover:bg-green-500/10 hover:text-green-600"
                          title="Convert to Invoice"
                        >
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleOpenDialog(quotation)}
                        className="hover:bg-primary/10"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(quotation.id)}
                        className="hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {editingQuotation ? "Edit Quotation" : "Create New Quotation"}
            </DialogTitle>
            <DialogDescription>
              {editingQuotation ? "Update quotation details" : "Generate a quotation for customer"}
            </DialogDescription>
          </DialogHeader>
          <div className="text-center py-8 text-muted-foreground">
            <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Quotation form will be implemented with full calculations</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
