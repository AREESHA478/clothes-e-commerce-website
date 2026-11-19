import React, { useState, useEffect, useRef } from 'react';
import { useShop } from '../context/ShopContext';
import { articlesData } from '../data/articles';
import { Search, X, ArrowRight, Sparkles, BookOpen } from 'lucide-react';
import './SearchModal.css';

const SearchModal = () => {
  const { 
    isSearchOpen, 
    setIsSearchOpen, 
    products, 
    setQuickViewProduct, 
    formatPrice 
  } = useShop();

  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const popularSearches = [
    'French Linen Trench',
    'Silk Kurta Co-ord',
    'Olive Safari Jacket',
    'Capsule Wardrobe',
    'Normandy Linen Care',
    'Wide-Leg Trousers'
  ];

  const searchResults = query.trim() === '' ? [] : products.filter((p) => {
    const q = query.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  });

  const matchingArticles = query.trim() === '' ? [] : articlesData.filter((art) => {
    const q = query.toLowerCase();
    return (
      art.title.toLowerCase().includes(q) ||
      art.category.toLowerCase().includes(q) ||
      art.excerpt.toLowerCase().includes(q)
    );
  });

  const handleSelectProduct = (product) => {
    setIsSearchOpen(false);
    setQuickViewProduct(product);
  };

  const handleSelectArticle = () => {
    setIsSearchOpen(false);
    window.location.hash = 'articles';
  };

  return (
    <div className="search-overlay overlay-backdrop" onClick={() => setIsSearchOpen(false)}>
      <div className="search-modal-box" onClick={(e) => e.stopPropagation()}>
        {/* Search Input Bar */}
        <div className="search-input-header">
          <Search size={20} className="search-bar-icon" />
          <input 
            ref={inputRef}
            type="text" 
            placeholder="Search luxury linen, silk kurtas, jackets, or journal guides..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search garments and articles"
          />
          {query && (
            <button onClick={() => setQuery('')} className="search-clear-btn" aria-label="Clear query">
              <X size={16} />
            </button>
          )}
          <button 
            className="search-close-text-btn"
            onClick={() => setIsSearchOpen(false)}
          >
            ESC
          </button>
        </div>

        {/* Popular Tags */}
        {query.trim() === '' && (
          <div className="popular-searches-box">
            <span className="popular-label">
              <Sparkles size={13} />
              Trending in Atelier:
            </span>
            <div className="popular-tags-list">
              {popularSearches.map((tag) => (
                <button 
                  key={tag}
                  className="popular-tag-btn"
                  onClick={() => setQuery(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Live Search Results */}
        {query.trim() !== '' && (
          <div className="search-results-container">
            {/* Products Results */}
            <div className="search-results-section">
              <span className="results-status">
                Found {searchResults.length} {searchResults.length === 1 ? 'creation' : 'creations'} for "{query}"
              </span>

              {searchResults.length > 0 ? (
                <div className="search-results-list">
                  {searchResults.map((product) => (
                    <div 
                      key={product.id} 
                      className="search-result-item"
                      onClick={() => handleSelectProduct(product)}
                    >
                      <img src={product.images[0]} alt={product.name} />
                      <div className="result-info">
                        <span className="result-cat">{product.gender} &bull; {product.category}</span>
                        <h4 className="result-name">{product.name}</h4>
                        <span className="result-price">{formatPrice(product.price)}</span>
                      </div>
                      <ArrowRight size={16} className="result-arrow" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-search-results">
                  <p>No products found matching "{query}".</p>
                </div>
              )}
            </div>

            {/* Articles Results */}
            {matchingArticles.length > 0 && (
              <div className="search-articles-section">
                <span className="results-status articles-status">
                  <BookOpen size={13} />
                  Found {matchingArticles.length} Editorial {matchingArticles.length === 1 ? 'Story' : 'Stories'}
                </span>
                <div className="search-articles-list">
                  {matchingArticles.map((article) => (
                    <div 
                      key={article.id} 
                      className="search-article-item"
                      onClick={handleSelectArticle}
                    >
                      <img src={article.coverImage} alt={article.title} />
                      <div className="result-info">
                        <span className="result-cat">{article.category} &bull; {article.readTime}</span>
                        <h4 className="result-name">{article.title}</h4>
                      </div>
                      <ArrowRight size={16} className="result-arrow" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchModal;
