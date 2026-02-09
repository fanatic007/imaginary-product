import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import ErrorBoundary from "@/components/ErrorBoundary";
import ProductAssessmentDashboard from '@/pages/product-assessment-dashboard';
import ProductDetailView from '@/pages/product-detail-view';
import UserAuthentication from '@/pages/user-authentication';
import ShoppingCartManagement from '@/pages/shopping-cart-management';
import Ebook from '@/pages/e-book';
import Library from "@/pages/library";
import { AssessmentProgressProvider } from '@/components/ui/AssessmentProgress';

const Routes = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ErrorBoundary>
      <AssessmentProgressProvider>
      <ScrollToTop />
      <RouterRoutes>
        <Route path="/" element={<ProductAssessmentDashboard />} />
        <Route path="/product-assessment-dashboard" element={<ProductAssessmentDashboard />} />
        <Route path="/product-detail-view" element={<ProductDetailView />} />
        <Route path="/user-authentication" element={<UserAuthentication />} />
        <Route path="/shopping-cart-management" element={<ShoppingCartManagement />} />
        <Route path="/e-book" element={<Ebook />} />
        <Route path="/Library" element={<Library />} />
      </RouterRoutes>
      </AssessmentProgressProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;