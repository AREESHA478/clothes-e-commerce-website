import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  X, 
  Clock, 
  Calendar, 
  Share2, 
  Sparkles, 
  ArrowRight
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import ProductCard from './ProductCard';
import './ArticleReaderModal.css';

const ArticleReaderModal = ({ article, onClose, onSelectArticle, allArticles = [] }) => {
  const { products } = useShop();

  useEffect(() => {
    if (article) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [article]);

  if (!article) return null;

  // Find related products
  const relatedProducts = (article.relatedProductIds || [])
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean);

  // Other suggested articles
  const otherArticles = allArticles
    .filter((a) => a.id !== article.id)
    .slice(0, 2);

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert('Article link copied to clipboard.');
    }
  };

  const modalNode = (
    <div className="article-modal-backdrop" onClick={onClose}>
      <div 
        className="article-modal-shell" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Top Bar */}
        <div className="article-modal-topbar">
          <span className="article-modal-category-badge">{article.category}</span>
          
          <div className="article-modal-top-actions">
            <button 
              className="article-icon-action" 
              onClick={handleCopyLink}
              title="Share Article"
              aria-label="Share Article"
            >
              <Share2 size={16} />
              <span className="action-label">Share</span>
            </button>
            <button 
              className="article-close-btn" 
              onClick={onClose}
              aria-label="Close article"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Scroll Content */}
        <div className="article-modal-scroll-body">
          {/* Header Title & Metadata */}
          <div className="article-header-area">
            <h1 className="article-main-title">{article.title}</h1>
            <p className="article-lead-subtitle">{article.subtitle}</p>

            <div className="article-byline">
              <img 
                src={article.author.avatar} 
                alt={article.author.name} 
                className="article-author-img"
              />
              <div className="article-author-meta">
                <span className="author-name">{article.author.name}</span>
                <span className="author-role">{article.author.role}</span>
              </div>
              <div className="article-meta-divider"></div>
              <div className="article-timing">
                <span><Calendar size={13} /> {article.date}</span>
                <span>&bull;</span>
                <span><Clock size={13} /> {article.readTime}</span>
              </div>
            </div>
          </div>

          {/* Large Hero Image */}
          <div className="article-hero-figure">
            <img 
              src={article.coverImage} 
              alt={article.title} 
              className="article-full-cover"
            />
            <span className="article-caption">OLIVÉRA Sartorial Archives &bull; Normandy Flax & Handloom Weaves</span>
          </div>

          {/* Main Article Prose */}
          <div className="article-prose">
            {article.content && article.content.map((paragraph, idx) => (
              <p key={idx} className="article-paragraph">
                {paragraph}
              </p>
            ))}

            {/* Editorial Pull Quote */}
            {article.pullQuote && (
              <blockquote className="article-pull-quote">
                <p>&ldquo;{article.pullQuote}&rdquo;</p>
              </blockquote>
            )}

            {/* Styling Guide Section */}
            {article.stylingTips && article.stylingTips.length > 0 && (
              <div className="article-styling-box">
                <div className="styling-box-header">
                  <Sparkles size={16} className="styling-icon" />
                  <h3>Atelier Styling Notes</h3>
                </div>
                <ul className="styling-list">
                  {article.stylingTips.map((tip, index) => (
                    <li key={index}>
                      <span className="tip-bullet">&bull;</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Care Guidance */}
            {article.careAdvice && (
              <div className="article-care-box">
                <h4>Fabric Longevity & Preservation</h4>
                <p>{article.careAdvice}</p>
              </div>
            )}
          </div>

          {/* Featured Garments in this Story */}
          {relatedProducts.length > 0 && (
            <div className="article-shop-section">
              <div className="article-shop-header">
                <div>
                  <span className="shop-eyebrow">The Wardrobe Edit</span>
                  <h3 className="shop-title">Featured in this Story</h3>
                </div>
                <span className="shop-desc">Handcrafted pieces showcased in this editorial. Click any item for quick view & tailoring details.</span>
              </div>

              <div className="article-products-grid">
                {relatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}

          {/* Next Stories to Read */}
          {otherArticles.length > 0 && (
            <div className="article-next-reads">
              <h3 className="next-reads-title">Continue Reading</h3>
              <div className="next-reads-grid">
                {otherArticles.map((nextArt) => (
                  <div 
                    key={nextArt.id} 
                    className="next-read-card"
                    onClick={() => onSelectArticle(nextArt)}
                  >
                    <img src={nextArt.coverImage} alt={nextArt.title} />
                    <div className="next-read-info">
                      <span className="next-read-cat">{nextArt.category}</span>
                      <h4>{nextArt.title}</h4>
                      <span className="next-read-link">
                        Read Story <ArrowRight size={13} />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined'
    ? createPortal(modalNode, document.body)
    : modalNode;
};

export default ArticleReaderModal;
