import React, { useState, useEffect, useRef } from 'react';
import { useShop } from '../context/ShopContext';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
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
    'Cream Cashmere Knit',
    'Double Breasted Suit',
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

  const handleSelectProduct = (product) => {
    setIsSearchOpen(false);
    setQuickViewProduct(product);
  };

  return (
    <div className="search-overlay overlay-backdrop" onClick={() => setIsSearchOpen(false)}>
      <div className="search-modal-box" onClick={(e) => e.stopPropagation()}>
        {/* Search Input Bar */}
        <div className="search-input-header">
          <Search size={22} className="search-bar-icon" />
          <input 
            ref={inputRef}
            type="text" 
            placeholder="Search luxury linen, jackets, kurtas, co-ords, silk..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search garments"
          />
          {query && (
            <button onClick={() => setQuery('')} className="search-clear-btn">
              <X size={18} />
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
              <Sparkles size={14} />
              Trending In Atelier:
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
            <span className="results-status">
              Found {searchResults.length} matching {searchResults.length === 1 ? 'creation' : 'creations'} for "{query}"
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
                    <ArrowRight size={18} className="result-arrow" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-search-results">
                <p>No results found matching "{query}". Try browsing our linen or outerwear catalog.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchModal;
