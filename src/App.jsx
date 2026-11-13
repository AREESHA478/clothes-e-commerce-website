import React, { useState } from 'react';
import { ShopProvider } from './context/ShopContext';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import CategoriesSection from './components/CategoriesSection';
import ProductGrid from './components/ProductGrid';
import LookbookSection from './components/LookbookSection';
import FeaturesSection from './components/FeaturesSection';
import TestimonialsSection from './components/TestimonialsSection';
import NewsletterSection from './components/NewsletterSection';
import Footer from './components/Footer';

// Modals & Drawers
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import QuickViewModal from './components/QuickViewModal';
import CheckoutModal from './components/CheckoutModal';
import SizeGuideModal from './components/SizeGuideModal';
import SearchModal from './components/SearchModal';
import AuthModal from './components/AuthModal';
import AccountModal from './components/AccountModal';
import OrderTrackingModal from './components/OrderTrackingModal';
import MobileBottomNav from './components/MobileBottomNav';
import ToastNotification from './components/ToastNotification';

const AppContent = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const scrollToCatalog = (category = null) => {
    if (category) {
      setActiveCategory(category);
    }
    const catalogEl = document.getElementById('catalog-section');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app-root">
      {/* Navigation Header */}
      <Header onNavigateCategory={scrollToCatalog} />

      <main>
        {/* Editorial Hero Banner */}
        <HeroBanner onShopNowClick={() => scrollToCatalog('All')} />

        {/* Curated Categories Showcase */}
        <CategoriesSection onSelectCategory={scrollToCatalog} />

        {/* Full-Featured Clothes Catalog */}
        <ProductGrid 
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory} 
        />

        {/* Editorial Lookbook Feature */}
        <LookbookSection />

        {/* Brand Guarantees & Features */}
        <FeaturesSection />

        {/* Client Reviews & Testimonials */}
        <TestimonialsSection />

        {/* VIP Privé Club Newsletter */}
        <NewsletterSection />
      </main>

      {/* Footer */}
      <Footer onSelectCategory={scrollToCatalog} />

      {/* Drawers, Modals & Notifications */}
      <CartDrawer />
      <WishlistDrawer />
      <QuickViewModal />
      <CheckoutModal />
      <SizeGuideModal />
      <SearchModal />
      <AuthModal />
      <AccountModal />
      <OrderTrackingModal />
      <ToastNotification />

      {/* Responsive Mobile Bottom Navigation Bar */}
      <MobileBottomNav onHomeClick={() => scrollToCatalog('All')} />
    </div>
  );
};


function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}

export default App;
