import { useState } from "react";
import { Plus, Search, Eye, Pencil, Trash2, FileText, Download, Send } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Invoice {
  id: string;
  invoiceNo: string;
  customer: string;
  date: string;
  dueDate: string;
  amount: number;
  status: "paid" | "pending" | "overdue" | "partial";
}

const mockInvoices: Invoice[] = [
  {
    id: "1",
    invoiceNo: "INV-2025-001",
    customer: "Rajesh Kumar",
    date: "2025-11-01",
    dueDate: "2025-11-15",
    amount: 9440,
    status: "paid",
  },
  {
    id: "2",
    invoiceNo: "INV-2025-002",
    customer: "Priya Sharma",
    date: "2025-11-05",
    dueDate: "2025-11-20",
    amount: 17700,
    status: "pending",
  },
  {
    id: "3",
    invoiceNo: "INV-2025-003",
    customer: "Tech Solutions Ltd",
    date: "2025-10-25",
    dueDate: "2025-11-08",
    amount: 21240,
    status: "overdue",
  },
  {
    id: "4",
    invoiceNo: "INV-2025-004",
    customer: "Global Enterprises",
    date: "2025-11-06",
    dueDate: "2025-11-21",
    amount: 12500,
    status: "partial",
  },
];

export default function Invoices() {
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [viewInvoice, setViewInvoice] = useState<Invoice | null>(null);

  const filteredInvoices = invoices.filter(
    (inv) =>
      inv.invoiceNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.customer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setInvoices(invoices.filter((inv) => inv.id !== id));
    toast.success("Invoice deleted successfully!");
  };

  const handleSend = (invoice: Invoice) => {
    toast.success(`Invoice ${invoice.invoiceNo} sent to customer!`);
  };

  const handleDownload = (invoice: Invoice) => {
    toast.success(`Downloading invoice ${invoice.invoiceNo}...`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "default";
      case "pending":
        return "secondary";
      case "overdue":
        return "destructive";
      case "partial":
        return "outline";
      default:
        return "outline";
    }
  };

  const stats = {
    total: invoices.length,
    paid: invoices.filter((i) => i.status === "paid").length,
    pending: invoices.filter((i) => i.status === "pending").length,
    overdue: invoices.filter((i) => i.status === "overdue").length,
    totalRevenue: invoices
      .filter((i) => i.status === "paid")
      .reduce((sum, i) => sum + i.amount, 0),
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Invoices</h1>
          <p className="text-muted-foreground mt-1">Manage and track all invoices</p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Create Invoice
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Invoices</p>
              <h3 className="text-2xl font-bold mt-1">{stats.total}</h3>
            </div>
            <FileText className="h-8 w-8 text-primary/20" />
          </div>
        </Card>
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Paid</p>
              <h3 className="text-2xl font-bold mt-1 text-green-600">{stats.paid}</h3>
            </div>
            <Badge variant="default" className="h-8 px-3">Paid</Badge>
          </div>
        </Card>
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Pending</p>
              <h3 className="text-2xl font-bold mt-1 text-orange-600">{stats.pending}</h3>
            </div>
            <Badge variant="secondary" className="h-8 px-3">Pending</Badge>
          </div>
        </Card>
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
              <h3 className="text-2xl font-bold mt-1">₹{stats.totalRevenue.toLocaleString()}</h3>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search invoices..."
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
                <TableHead>Invoice No</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.map((invoice) => (
                <TableRow key={invoice.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell className="font-medium">{invoice.invoiceNo}</TableCell>
                  <TableCell>{invoice.customer}</TableCell>
                  <TableCell>{new Date(invoice.date).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(invoice.dueDate).toLocaleDateString()}</TableCell>
                  <TableCell className="font-semibold">
                    ₹{invoice.amount.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(invoice.status)}>
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setViewInvoice(invoice)}
                        className="hover:bg-primary/10"
                        title="View"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDownload(invoice)}
                        className="hover:bg-primary/10"
                        title="Download PDF"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleSend(invoice)}
                        className="hover:bg-blue-500/10 hover:text-blue-600"
                        title="Send to Customer"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-primary/10"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(invoice.id)}
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

      <Dialog open={viewInvoice !== null} onOpenChange={() => setViewInvoice(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Invoice Details</DialogTitle>
            <DialogDescription>View complete invoice information</DialogDescription>
          </DialogHeader>
          {viewInvoice && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Invoice No:</p>
                  <p className="font-semibold">{viewInvoice.invoiceNo}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Customer:</p>
                  <p className="font-semibold">{viewInvoice.customer}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Date:</p>
                  <p className="font-semibold">{new Date(viewInvoice.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Due Date:</p>
                  <p className="font-semibold">{new Date(viewInvoice.dueDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Amount:</p>
                  <p className="font-semibold text-lg">₹{viewInvoice.amount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Status:</p>
                  <Badge variant={getStatusColor(viewInvoice.status)} className="mt-1">
                    {viewInvoice.status}
                  </Badge>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
