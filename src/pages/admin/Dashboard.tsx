import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Receipt, DollarSign, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Customers",
      value: "248",
      change: "+12% from last month",
      icon: Users,
      color: "text-primary",
    },
    {
      title: "Pending Invoices",
      value: "23",
      change: "5 due this week",
      icon: Receipt,
      color: "text-warning",
    },
    {
      title: "Total Revenue",
      value: "₹12.5L",
      change: "+18% from last month",
      icon: DollarSign,
      color: "text-success",
    },
    {
      title: "Growth Rate",
      value: "24%",
      change: "Yearly growth",
      icon: TrendingUp,
      color: "text-accent",
    },
  ];

  const recentInvoices = [
    { id: "INV-001", customer: "Rajesh Kumar", amount: "₹25,000", status: "Paid", date: "2025-01-07" },
    { id: "INV-002", customer: "Priya Sharma", amount: "₹18,500", status: "Pending", date: "2025-01-06" },
    { id: "INV-003", customer: "Tech Solutions Pvt Ltd", amount: "₹45,000", status: "Paid", date: "2025-01-05" },
    { id: "INV-004", customer: "Anita Desai", amount: "₹12,000", status: "Overdue", date: "2025-01-03" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-success/10 text-success";
      case "Pending":
        return "bg-warning/10 text-warning";
      case "Overdue":
        return "bg-destructive/10 text-destructive";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back, Admin</h1>
        <p className="text-muted-foreground">Here's what's happening with your CA practice today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-medium transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Link to="/admin/customers">
            <Button>Add Customer</Button>
          </Link>
          <Link to="/admin/invoices">
            <Button variant="outline">Create Invoice</Button>
          </Link>
          <Link to="/admin/quotations">
            <Button variant="outline">New Quotation</Button>
          </Link>
          <Link to="/admin/services">
            <Button variant="outline">Manage Services</Button>
          </Link>
        </CardContent>
      </Card>

      {/* Recent Invoices */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentInvoices.map((invoice) => (
              <div
                key={invoice.id}
                className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-medium text-foreground">{invoice.id}</p>
                    <p className="text-sm text-muted-foreground">{invoice.customer}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-semibold">{invoice.amount}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                    {invoice.status}
                  </span>
                  <span className="text-sm text-muted-foreground w-24 text-right">{invoice.date}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link to="/admin/invoices">
              <Button variant="link">View All Invoices →</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
