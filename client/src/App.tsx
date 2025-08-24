import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Toast } from "@/components/Toast";

// Pages
import Home from "@/pages/home";
import Services from "@/pages/services";
import ServicesDynamic from "@/pages/services-dynamic";
import Book from "@/pages/book";
import Track from "@/pages/track";
import Contact from "@/pages/contact";
import Pricing from "@/pages/pricing";
import HowItWorks from "@/pages/how-it-works";
import CityLanding from "@/pages/city-landing";
import Admin from "@/pages/admin";
import Mechanic from "@/pages/mechanic";
import Privacy from "@/pages/privacy";
import Terms from "@/pages/terms";
import Refund from "@/pages/refund";
import NotFound from "@/pages/not-found";

function Router() {
  const [location] = useLocation();

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24 lg:pt-28">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/services/:vehicle/:city" component={ServicesDynamic} />
          <Route path="/services" component={Services} />
          <Route path="/pricing" component={Pricing} />
          <Route path="/book" component={Book} />
          <Route path="/track/:trackingId?" component={Track} />
          <Route path="/contact" component={Contact} />
          <Route path="/how-it-works" component={HowItWorks} />
          <Route path="/bike-service/:city" component={CityLanding} />
          <Route path="/admin" component={Admin} />
          <Route path="/mechanic" component={Mechanic} />
          <Route path="/privacy" component={Privacy} />
          <Route path="/terms" component={Terms} />
          <Route path="/refund" component={Refund} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      <Toast />
    </div>
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
