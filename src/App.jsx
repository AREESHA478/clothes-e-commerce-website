import React, { useState, useEffect } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import CategoriesSection from './components/CategoriesSection';
import ProductGrid from './components/ProductGrid';
import ProductCard from './components/ProductCard';
import HomeArticlesSection from './components/HomeArticlesSection';
import ArticlesPage from './components/ArticlesPage';
import ArticleReaderModal from './components/ArticleReaderModal';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import LoginPage from './components/LoginPage';
import FeaturesSection from './components/FeaturesSection';
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
import { articlesData } from './data/articles';
import { ArrowRight, Sparkles } from 'lucide-react';

const AppContent = () => {
  const { products } = useShop();

  // Simple Page Navigation State: 'home' | 'shop' | 'articles' | 'about' | 'contact'
  const [currentPage, setCurrentPage] = useState('home');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeArticleForReader, setActiveArticleForReader] = useState(null);

  // Sync hash routing on mount and hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (['home', 'shop', 'articles', 'about', 'contact', 'login', 'register'].includes(hash)) {
        setCurrentPage(hash);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Smooth Scroll Reveal Animation Observer
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

      const observerCallback = (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      };

      const observer = new IntersectionObserver(observerCallback, {
        threshold: 0.08,
        rootMargin: '0px 0px -25px 0px'
      });

      const targets = document.querySelectorAll(
        '.product-card, .category-card, .home-article-card, .feature-card, .section-header, .atelier-quote-card'
      );
      targets.forEach((el) => observer.observe(el));
    }, 50);

    return () => clearTimeout(timer);
  }, [currentPage, activeCategory]);

  const navigateToPage = (pageName) => {
    setCurrentPage(pageName);
    window.location.hash = pageName;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToCategory = (category = 'All') => {
    setActiveCategory(category);
    setCurrentPage('shop');
    window.location.hash = 'shop';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReadArticle = (article) => {
    setActiveArticleForReader(article);
  };

  // Curated featured 4 pieces for the home page showcase
  const featuredCuratedProducts = products.slice(0, 4);

  return (
    <div className="app-root">
      {/* Navigation Header */}
      <Header 
        currentPage={currentPage}
        onNavigatePage={navigateToPage}
        onNavigateCategory={navigateToCategory} 
      />

      <main className="main-content-flow">
        {/* ================= PAGE 1: HOME ================= */}
        {currentPage === 'home' && (
          <div className="page-view animate-fade">
            {/* Minimalist Aesthetic Hero */}
            <HeroBanner 
              onShopNowClick={() => navigateToPage('shop')} 
              onArticlesClick={() => navigateToPage('articles')}
            />

            {/* Curated Categories Showcase */}
            <CategoriesSection onSelectCategory={navigateToCategory} />

            {/* Curated Highlights Section */}
            <section className="home-curated-showcase container section-padding">
              <div className="section-header">
                <span className="section-eyebrow">
                  <Sparkles size={12} />
                  Atelier Selection
                </span>
                <h2 className="section-title">New In & Curated Essentials</h2>
                <p className="section-subtitle">
                  Tailored in micro-runs from certified Normandy flax linen, raw handloom silk, and soft organic cotton.
                </p>
              </div>

              <div className="catalog-products-grid cols-4">
                {featuredCuratedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              <div className="home-view-all-row">
                <button 
                  className="btn btn-outline-olive btn-lg"
                  onClick={() => navigateToPage('shop')}
                >
                  <span>Explore Complete Catalog ({products.length} Designs)</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </section>

            {/* Editorial Atelier Philosophy Quote Section */}
            <section className="atelier-quote-section">
              <div className="container">
                <div className="atelier-quote-card">
                  <span className="quote-tagline">Atelier Principle &bull; Mindful Production</span>
                  <blockquote className="atelier-quote-text">
                    &ldquo;True elegance is never hurried. We measure each cut not in fast industrial quotas, 
                    but in decades of enduring grace, breathable comfort, and reverent craftsmanship.&rdquo;
                  </blockquote>
                  <div className="atelier-quote-footer">
                    <span className="quote-author-name">Tariq Mansoor</span>
                    <span className="quote-author-sub">&bull; Master Pattern Maker &bull; Lahore Atelier</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Dedicated Editorial Articles / Journal Section Preview */}
            <HomeArticlesSection 
              onNavigateArticles={() => navigateToPage('articles')}
              onReadArticle={handleReadArticle}
            />

            {/* Brand Guarantees & Features */}
            <FeaturesSection />

            {/* VIP Newsletter */}
            <NewsletterSection />
          </div>
        )}

        {/* ================= PAGE 2: SHOP ================= */}
        {currentPage === 'shop' && (
          <div className="page-view animate-fade">
            <ProductGrid 
              activeCategory={activeCategory} 
              setActiveCategory={setActiveCategory} 
            />
          </div>
        )}

        {/* ================= PAGE 3: ARTICLES (EDITORIAL JOURNAL) ================= */}
        {currentPage === 'articles' && (
          <div className="page-view animate-fade">
            <ArticlesPage 
              onSelectCategory={navigateToCategory} 
              onReadArticle={handleReadArticle}
            />
          </div>
        )}

        {/* ================= PAGE 4: ABOUT THE ATELIER ================= */}
        {currentPage === 'about' && (
          <div className="page-view animate-fade">
            <AboutPage onShopClick={() => navigateToPage('shop')} />
          </div>
        )}

        {/* ================= PAGE 5: CONTACT & CONCIERGE ================= */}
        {currentPage === 'contact' && (
          <div className="page-view animate-fade">
            <ContactPage />
          </div>
        )}

        {/* ================= PAGE 6: AUTHENTICATION (LOGIN & SIGN UP) ================= */}
        {(currentPage === 'login' || currentPage === 'register') && (
          <div className="page-view animate-fade">
            <LoginPage 
              key={currentPage}
              initialTab={currentPage} 
              onNavigatePage={navigateToPage} 
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer 
        onNavigatePage={navigateToPage} 
        onSelectCategory={navigateToCategory} 
      />

      {/* Global Drawers, Modals & Notifications */}
      {/* Global Drawers, Modals & Notifications */}
      <CartDrawer />
      <WishlistDrawer />
      <CheckoutModal />
      <SearchModal />
      <AuthModal />
      <AccountModal />
      <OrderTrackingModal />
      <ToastNotification />

      {/* Full Article Reader Modal (opens when clicked from homepage, articles page, or related stories) */}
      {activeArticleForReader && (
        <ArticleReaderModal 
          article={activeArticleForReader}
          onClose={() => setActiveArticleForReader(null)}
          onSelectArticle={(art) => setActiveArticleForReader(art)}
          allArticles={articlesData}
        />
      )}

      {/* Global Quick View Product Modal (Topmost priority - opens on top of all pages and article reader) */}
      <QuickViewModal />

      {/* Global Sizing Guide Modal (Opens on top of everything) */}
      <SizeGuideModal />

      {/* Responsive Mobile Bottom Navigation Bar */}
      <MobileBottomNav 
        currentPage={currentPage}
        onNavigatePage={navigateToPage} 
      />
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
