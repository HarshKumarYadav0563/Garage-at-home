import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import { initializeAnalytics, trackPageView } from "@/lib/analytics";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { MobileAppShell } from "@/components/MobileAppShell";
import { Footer } from "@/components/Footer";
import { Toast } from "@/components/Toast";

// Pages
import Home from "@/pages/home";
import Services from "@/pages/services";
import ServicesDynamic from "@/pages/services-dynamic";
import LocationStep from "@/pages/location-step";
import MechanicStep from "@/pages/mechanic-step";
import DetailsStep from "@/pages/details-step";
import OTPStep from "@/pages/otp-step";
import Track from "@/pages/track";
import Contact from "@/pages/contact";
import Pricing from "@/pages/pricing";
import HowItWorks from "@/pages/how-it-works";
import CityLanding from "@/pages/city-landing";
import Admin from "@/pages/admin";
import Privacy from "@/pages/privacy";
import Terms from "@/pages/terms";
import Refund from "@/pages/refund";
import Blog from "@/pages/blog";
import BlogPost from "@/pages/blog-post";
import Videos from "@/pages/videos";
import Testimonials from "@/pages/testimonials";
import NotFound from "@/pages/not-found";

function Router() {
  const [location] = useLocation();

  // Initialize analytics on app start
  useEffect(() => {
    initializeAnalytics();
  }, []);

  // Scroll to top when route changes and track page view
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    trackPageView(location, document.title);
  }, [location]);

  return (
    <MobileAppShell>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/services/:vehicle/:city" component={ServicesDynamic} />
        <Route path="/services" component={Services} />
        <Route path="/location" component={LocationStep} />
        <Route path="/mechanic" component={MechanicStep} />
        <Route path="/details" component={DetailsStep} />
        <Route path="/otp" component={OTPStep} />
        <Route path="/pricing" component={Pricing} />
        <Route path="/track/:trackingId?" component={Track} />
        <Route path="/contact" component={Contact} />
        <Route path="/how-it-works" component={HowItWorks} />
        <Route path="/bike-service/:city" component={CityLanding} />
        <Route path="/admin" component={Admin} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/terms" component={Terms} />
        <Route path="/refund" component={Refund} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:slug" component={BlogPost} />
        <Route path="/videos" component={Videos} />
        <Route path="/testimonials" component={Testimonials} />
        <Route component={NotFound} />
      </Switch>
      <div className="hidden lg:block">
        <Footer />
      </div>
      <Toast />
    </MobileAppShell>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;
