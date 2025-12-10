import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Construction, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md mx-4 text-center overflow-hidden border-none shadow-xl">
        <div className="h-2 bg-primary w-full"></div>
        <CardContent className="pt-12 pb-12 px-8 flex flex-col items-center">
          <div className="h-24 w-24 bg-secondary/20 rounded-full flex items-center justify-center mb-6 animate-bounce">
            <Construction className="h-12 w-12 text-primary" />
          </div>
          
          <h1 className="text-4xl font-heading font-bold text-gray-900 mb-2">Whoops!</h1>
          <h2 className="text-xl font-medium text-gray-600 mb-6">Off the Beaten Path</h2>
          
          <p className="text-muted-foreground mb-8 text-lg">
            Looks like you've run faster than our developers! This page hasn't been built yet.
          </p>

          <div className="bg-secondary/10 p-4 rounded-lg w-full mb-8 text-sm text-left border border-secondary/20">
            <p className="font-mono text-xs text-muted-foreground mb-2">DEBUG_INFO:</p>
            <p className="font-mono text-primary">Error 404: Route_Not_Constructed</p>
            <p className="font-mono text-muted-foreground mt-1">Status: Still paving the road...</p>
          </div>

          <Link href="/">
            <Button size="lg" className="w-full font-bold">
              <Map className="mr-2 h-4 w-4" />
              Return to Safety (Home)
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
