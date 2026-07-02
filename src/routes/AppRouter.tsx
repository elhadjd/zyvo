import { Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import IndustryLandingTemplate from '../components/IndustryLandingTemplate';
import { industryLandings } from '../data/industry-landings';
import HomePage from '../pages/HomePage';
import FeaturesPage from '../pages/FeaturesPage';
import PricingPage from '../pages/PricingPage';
import AboutPage from '../pages/AboutPage';
import ContactPage from '../pages/ContactPage';
import SecurityPage from '../pages/SecurityPage';
import SolutionsIndexPage from '../pages/SolutionsIndexPage';
import SolutionPage from '../pages/SolutionPage';
import IndustriesIndexPage from '../pages/IndustriesIndexPage';
import IndustryPage from '../pages/IndustryPage';
import BlogIndexPage from '../pages/BlogIndexPage';
import BlogPostPage from '../pages/BlogPostPage';
import GettingStartedPage from '../pages/GettingStartedPage';
import HelpCenterPage from '../pages/HelpCenterPage';
import PrivacyPage from '../pages/PrivacyPage';
import TermsPage from '../pages/TermsPage';
import CookiesPage from '../pages/CookiesPage';
import RefundPage from '../pages/RefundPage';
import IntegrationsPage from '../pages/IntegrationsPage';
import DemoPage from '../pages/DemoPage';
import FAQPage from '../pages/FAQPage';
import NotFoundPage from '../pages/NotFoundPage';

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="features" element={<FeaturesPage />} />
        <Route path="pricing" element={<PricingPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="security" element={<SecurityPage />} />
        <Route path="demo" element={<DemoPage />} />
        <Route path="faq" element={<FAQPage />} />
        <Route path="solutions" element={<SolutionsIndexPage />} />
        <Route path="solutions/:slug" element={<SolutionPage />} />
        <Route path="industries" element={<IndustriesIndexPage />} />
        <Route path="industries/:slug" element={<IndustryPage />} />
        {industryLandings.map((landing) => (
          <Route
            key={landing.slug}
            path={landing.slug}
            element={<IndustryLandingTemplate landing={landing} />}
          />
        ))}
        <Route path="blog" element={<BlogIndexPage />} />
        <Route path="blog/:slug" element={<BlogPostPage />} />
        <Route path="integrations" element={<IntegrationsPage />} />
        <Route path="getting-started" element={<GettingStartedPage />} />
        <Route path="help-center" element={<HelpCenterPage />} />
        <Route path="privacy-policy" element={<PrivacyPage />} />
        <Route path="terms-of-service" element={<TermsPage />} />
        <Route path="refund-policy" element={<RefundPage />} />
        <Route path="cookie-policy" element={<CookiesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
