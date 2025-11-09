import { useState } from "react";
import { Search, Download, FileText, TrendingUp, TrendingDown } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Ledger {
  id: string;
  customer: string;
  openingBalance: number;
  totalInvoices: number;
  totalPayments: number;
  outstanding: number;
  lastTransaction: string;
}

const mockLedgers: Ledger[] = [
  {
    id: "1",
    customer: "Rajesh Kumar",
    openingBalance: 5000,
    totalInvoices: 9440,
    totalPayments: 9440,
    outstanding: 5000,
    lastTransaction: "2025-11-08",
  },
  {
    id: "2",
    customer: "Priya Sharma",
    openingBalance: 0,
    totalInvoices: 17700,
    totalPayments: 0,
    outstanding: 17700,
    lastTransaction: "2025-11-05",
  },
  {
    id: "3",
    customer: "Tech Solutions Ltd",
    openingBalance: 10000,
    totalInvoices: 21240,
    totalPayments: 15000,
    outstanding: 16240,
    lastTransaction: "2025-10-25",
  },
  {
    id: "4",
    customer: "Global Enterprises",
    openingBalance: 0,
    totalInvoices: 12500,
    totalPayments: 6250,
    outstanding: 6250,
    lastTransaction: "2025-11-06",
  },
  {
    id: "5",
    customer: "Sunrise Industries",
    openingBalance: 2000,
    totalInvoices: 8500,
    totalPayments: 10500,
    outstanding: 0,
    lastTransaction: "2025-11-07",
  },
];

export default function Ledgers() {
  const [ledgers] = useState<Ledger[]>(mockLedgers);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLedgers = ledgers.filter((ledger) =>
    ledger.customer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleExport = (ledger: Ledger) => {
    toast.success(`Exporting ledger for ${ledger.customer}...`);
  };

  const handleExportAll = () => {
    toast.success("Exporting all ledgers to Excel...");
  };

  const stats = {
    totalOutstanding: ledgers.reduce((sum, l) => sum + l.outstanding, 0),
    totalInvoices: ledgers.reduce((sum, l) => sum + l.totalInvoices, 0),
    totalPayments: ledgers.reduce((sum, l) => sum + l.totalPayments, 0),
    customersWithBalance: ledgers.filter((l) => l.outstanding > 0).length,
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Ledgers</h1>
          <p className="text-muted-foreground mt-1">Track customer accounts and balances</p>
        </div>
        <Button onClick={handleExportAll} className="gap-2">
          <Download className="h-4 w-4" />
          Export All
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Outstanding</p>
              <h3 className="text-2xl font-bold mt-1 text-red-600">
                ₹{stats.totalOutstanding.toLocaleString()}
              </h3>
            </div>
            <TrendingUp className="h-8 w-8 text-red-600/20" />
          </div>
        </Card>
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Invoiced</p>
              <h3 className="text-2xl font-bold mt-1">₹{stats.totalInvoices.toLocaleString()}</h3>
            </div>
            <FileText className="h-8 w-8 text-primary/20" />
          </div>
        </Card>
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Received</p>
              <h3 className="text-2xl font-bold mt-1 text-green-600">
                ₹{stats.totalPayments.toLocaleString()}
              </h3>
            </div>
            <TrendingDown className="h-8 w-8 text-green-600/20" />
          </div>
        </Card>
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Customers with Balance</p>
              <h3 className="text-2xl font-bold mt-1">{stats.customersWithBalance}</h3>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by customer name..."
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
                <TableHead>Customer</TableHead>
                <TableHead>Opening Balance</TableHead>
                <TableHead>Total Invoices</TableHead>
                <TableHead>Total Payments</TableHead>
                <TableHead>Outstanding</TableHead>
                <TableHead>Last Transaction</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLedgers.map((ledger) => (
                <TableRow key={ledger.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell className="font-medium">{ledger.customer}</TableCell>
                  <TableCell>₹{ledger.openingBalance.toLocaleString()}</TableCell>
                  <TableCell>₹{ledger.totalInvoices.toLocaleString()}</TableCell>
                  <TableCell className="text-green-600 font-semibold">
                    ₹{ledger.totalPayments.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {ledger.outstanding > 0 ? (
                      <Badge variant="destructive">
                        ₹{ledger.outstanding.toLocaleString()}
                      </Badge>
                    ) : (
                      <Badge variant="default">Cleared</Badge>
                    )}
                  </TableCell>
                  <TableCell>{new Date(ledger.lastTransaction).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-primary/10"
                        title="View Details"
                      >
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleExport(ledger)}
                        className="hover:bg-primary/10"
                        title="Export"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
