import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Onboarding from "@/pages/Onboarding";
import Recommendation from "@/pages/Recommendation";
import Feedback from "@/pages/Feedback";
import GearCloset from "@/pages/GearCloset";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home}/>
        <Route path="/onboarding" component={Onboarding}/>
        <Route path="/recommendation" component={Recommendation}/>
        <Route path="/feedback" component={Feedback}/>
        <Route path="/gear-closet" component={GearCloset}/>
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
