import { useState } from "react";
import { Save, Upload, Building2, Mail, Phone, MapPin, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import logo from "@/assets/logo.jpg";

export default function Settings() {
  const [firmDetails, setFirmDetails] = useState({
    name: "CS A Associates",
    email: "contact@csaassociates.com",
    phone: "+91 98765 43210",
    address: "123 Business District, Mumbai, Maharashtra 400001",
    gst: "27AAAAA0000A1Z5",
    pan: "AAAAA0000A",
  });

  const [invoiceSettings, setInvoiceSettings] = useState({
    prefix: "INV",
    nextNumber: "2025-005",
    taxRate: "18",
    terms: "Payment due within 15 days of invoice date.\nLate payments may incur additional charges.",
    bankDetails: "Bank: HDFC Bank\nAccount: 50200012345678\nIFSC: HDFC0001234",
  });

  const handleSaveFirm = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Firm details updated successfully!");
  };

  const handleSaveInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Invoice settings updated successfully!");
  };

  const handleLogoUpload = () => {
    toast.success("Logo upload functionality will be implemented");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Configure your admin panel and business details</p>
      </div>

      <Tabs defaultValue="firm" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="firm">Firm Details</TabsTrigger>
          <TabsTrigger value="invoice">Invoice</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
        </TabsList>

        <TabsContent value="firm" className="space-y-6">
          <Card className="p-6">
            <form onSubmit={handleSaveFirm} className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                  <Building2 className="h-5 w-5 text-primary" />
                  Business Information
                </h3>
                <Separator className="mb-4" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firmName">Firm Name *</Label>
                    <Input
                      id="firmName"
                      value={firmDetails.name}
                      onChange={(e) => setFirmDetails({ ...firmDetails, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      <Mail className="h-4 w-4 inline mr-2" />
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={firmDetails.email}
                      onChange={(e) => setFirmDetails({ ...firmDetails, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      <Phone className="h-4 w-4 inline mr-2" />
                      Phone *
                    </Label>
                    <Input
                      id="phone"
                      value={firmDetails.phone}
                      onChange={(e) => setFirmDetails({ ...firmDetails, phone: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gst">GST Number</Label>
                    <Input
                      id="gst"
                      value={firmDetails.gst}
                      onChange={(e) => setFirmDetails({ ...firmDetails, gst: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pan">PAN Number</Label>
                    <Input
                      id="pan"
                      value={firmDetails.pan}
                      onChange={(e) => setFirmDetails({ ...firmDetails, pan: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2 mt-4">
                  <Label htmlFor="address">
                    <MapPin className="h-4 w-4 inline mr-2" />
                    Address *
                  </Label>
                  <Textarea
                    id="address"
                    value={firmDetails.address}
                    onChange={(e) => setFirmDetails({ ...firmDetails, address: e.target.value })}
                    rows={3}
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit" className="gap-2">
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="invoice" className="space-y-6">
          <Card className="p-6">
            <form onSubmit={handleSaveInvoice} className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                  <FileText className="h-5 w-5 text-primary" />
                  Invoice Configuration
                </h3>
                <Separator className="mb-4" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="prefix">Invoice Prefix *</Label>
                    <Input
                      id="prefix"
                      value={invoiceSettings.prefix}
                      onChange={(e) =>
                        setInvoiceSettings({ ...invoiceSettings, prefix: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nextNumber">Next Invoice Number *</Label>
                    <Input
                      id="nextNumber"
                      value={invoiceSettings.nextNumber}
                      onChange={(e) =>
                        setInvoiceSettings({ ...invoiceSettings, nextNumber: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="taxRate">Default Tax Rate (%)</Label>
                    <Input
                      id="taxRate"
                      type="number"
                      value={invoiceSettings.taxRate}
                      onChange={(e) =>
                        setInvoiceSettings({ ...invoiceSettings, taxRate: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2 mt-4">
                  <Label htmlFor="terms">Payment Terms</Label>
                  <Textarea
                    id="terms"
                    value={invoiceSettings.terms}
                    onChange={(e) =>
                      setInvoiceSettings({ ...invoiceSettings, terms: e.target.value })
                    }
                    rows={4}
                  />
                </div>

                <div className="space-y-2 mt-4">
                  <Label htmlFor="bankDetails">Bank Details</Label>
                  <Textarea
                    id="bankDetails"
                    value={invoiceSettings.bankDetails}
                    onChange={(e) =>
                      setInvoiceSettings({ ...invoiceSettings, bankDetails: e.target.value })
                    }
                    rows={4}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit" className="gap-2">
                  <Save className="h-4 w-4" />
                  Save Settings
                </Button>
              </div>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="branding" className="space-y-6">
          <Card className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Company Logo</h3>
                <Separator className="mb-4" />
                <div className="flex items-center gap-6">
                  <div className="w-32 h-32 rounded-lg border-2 border-dashed border-border flex items-center justify-center bg-muted/20">
                    <img src={logo} alt="Company Logo" className="max-w-full max-h-full object-contain" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-3">
                      Upload your company logo. Recommended size: 400x400px
                    </p>
                    <Button onClick={handleLogoUpload} variant="outline" className="gap-2">
                      <Upload className="h-4 w-4" />
                      Upload New Logo
                    </Button>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Theme Colors</h3>
                <Separator className="mb-4" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label>Primary Color</Label>
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded bg-primary border" />
                      <span className="text-sm text-muted-foreground">#0C2340</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Accent Color</Label>
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded bg-accent border" />
                      <span className="text-sm text-muted-foreground">#FFD700</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Success Color</Label>
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded bg-green-600 border" />
                      <span className="text-sm text-muted-foreground">#16A34A</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Destructive Color</Label>
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded bg-destructive border" />
                      <span className="text-sm text-muted-foreground">#DC2626</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
