import { Button } from "@/components/ui/button";
import Logo from "../assets/logo.jpg";
import { ArrowRight, Shield, FileText, BarChart3, Users } from "lucide-react";

const Index = () => {
  const handleAccessPanel = () => {
    // Navigate to admin login - replace with your navigation logic
    window.location.href = "/admin/login";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated background pattern */}
      {/* <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" /> */}

      {/* Content */}
      <div className="relative flex min-h-screen flex-col items-center justify-center px-4">
        {/* Main card */}
        <div className="w-full max-w-4xl">
          {/* Logo/Brand section */}
          <div className="text-center mb-12 space-y-4">
            {/* <div className="">
              <img
                src={Logo}
                alt="Logo"
                className="w-100 h-100 object-contain"
              />
            </div> */}
            <h1 className="text-6xl font-bold text-white tracking-tight">
              CS A Associates
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Professional Chartered Accountant Administration System
            </p>
          </div>

          {/* Features grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:bg-slate-800/70 transition-all duration-300 hover:scale-105">
              <FileText className="w-8 h-8 text-amber-400 mb-3" />
              <h3 className="text-white font-semibold mb-2">
                Document Management
              </h3>
              <p className="text-slate-400 text-sm">
                Secure and organized client documentation
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:bg-slate-800/70 transition-all duration-300 hover:scale-105">
              <BarChart3 className="w-8 h-8 text-amber-400 mb-3" />
              <h3 className="text-white font-semibold mb-2">
                Analytics & Reports
              </h3>
              <p className="text-slate-400 text-sm">
                Comprehensive financial insights and reporting
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:bg-slate-800/70 transition-all duration-300 hover:scale-105">
              <Users className="w-8 h-8 text-amber-400 mb-3" />
              <h3 className="text-white font-semibold mb-2">Client Portal</h3>
              <p className="text-slate-400 text-sm">
                Seamless client communication and collaboration
              </p>
            </div>
          </div>

          {/* CTA section */}
          <div className="bg-gradient-to-r from-slate-800/80 to-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 text-center shadow-2xl">
            <p className="text-slate-300 mb-6 text-lg">
              Access your secure administration panel
            </p>
            <Button
              size="lg"
              onClick={handleAccessPanel}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold px-8 py-6 text-lg shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/40 transition-all duration-300 hover:scale-105"
            >
              Access Admin Panel
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-slate-400 text-sm">
          <p>© 2024 CS A Associates. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
