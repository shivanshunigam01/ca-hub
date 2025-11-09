import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary via-primary/95 to-primary/90">
      <div className="text-center space-y-6 p-8">
        <h1 className="text-5xl font-bold text-white mb-4">
          CS A Associates
        </h1>
        <p className="text-xl text-white/90 mb-8">
          Professional CA Admin Panel
        </p>
        <Link to="/admin/login">
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
            Access Admin Panel
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;
