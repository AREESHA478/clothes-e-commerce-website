import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import ProductCard from './ProductCard';
import { 
  SlidersHorizontal, 
  Search, 
  ArrowUpDown, 
  Grid3X3, 
  LayoutGrid, 
  X, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import './ProductGrid.css';

const ProductGrid = ({ activeCategory, setActiveCategory }) => {
  const { products, formatPrice } = useShop();

  // Internal Filter & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured'); // 'featured', 'price-asc', 'price-desc', 'rating', 'newest'
  const [selectedGender, setSelectedGender] = useState('All');
  const [selectedSize, setSelectedSize] = useState('All');
  const [maxPrice, setMaxPrice] = useState(35000);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [gridColumns, setGridColumns] = useState(4); // 3 or 4 columns

  // Categories list
  const categoryTabs = [
    { label: 'All Collections', value: 'All' },
    { label: 'Women', value: 'Women' },
    { label: 'Men', value: 'Men' },
    { label: 'Co-ords & Sets', value: 'Co-ords' },
    { label: 'Outerwear', value: 'Outerwear' },
    { label: 'Festive & Formal', value: 'Festive' },
    { label: 'Essentials', value: 'Essentials' },
    { label: 'Sale %', value: 'Sale' }
  ];

  // Filtering & Sorting Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((item) => {
        // Tab Category filter
        if (activeCategory === 'Sale') {
          if (!item.isSale) return false;
        } else if (activeCategory === 'Women' || activeCategory === 'Men') {
          if (item.gender !== activeCategory && item.gender !== 'Unisex') return false;
        } else if (activeCategory !== 'All') {
          if (item.category !== activeCategory) return false;
        }

        // Sub Gender Filter
        if (selectedGender !== 'All' && item.gender !== selectedGender && item.gender !== 'Unisex') {
          return false;
        }

        // Search Query filter
        if (searchQuery.trim() !== '') {
          const query = searchQuery.toLowerCase();
          const matchesName = item.name.toLowerCase().includes(query);
          const matchesDesc = item.description.toLowerCase().includes(query);
          const matchesCat = item.category.toLowerCase().includes(query);
          if (!matchesName && !matchesDesc && !matchesCat) return false;
        }

        // Size Filter
        if (selectedSize !== 'All') {
          if (!item.sizes || !item.sizes.includes(selectedSize)) return false;
        }

        // Max Price Filter
        if (item.price > maxPrice) return false;

        // In Stock Filter
        if (inStockOnly && item.stock <= 0) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        return 0; // featured default
      });
  }, [products, activeCategory, selectedGender, searchQuery, selectedSize, maxPrice, inStockOnly, sortBy]);

  // Reset all filters helper
  const handleResetFilters = () => {
    setActiveCategory('All');
    setSelectedGender('All');
    setSelectedSize('All');
    setMaxPrice(35000);
    setSearchQuery('');
    setInStockOnly(false);
    setSortBy('featured');
  };

  const isFiltered = activeCategory !== 'All' || selectedGender !== 'All' || selectedSize !== 'All' || maxPrice < 35000 || searchQuery !== '' || inStockOnly;

  return (
    <section id="catalog-section" className="section-padding catalog-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-eyebrow">The Atelier Catalog</span>
          <h2 className="section-title">The Olive & Cream Wardrobe</h2>
          <p className="section-subtitle">
            Impeccably tailored silhouettes engineered for all seasons. Filter by cut, 
            natural fabric, size, and style.
          </p>
        </div>

        {/* Category Tabs Navigation */}
        <div className="category-tabs-scroll">
          <div className="category-tabs">
            {categoryTabs.map((tab) => (
              <button
                key={tab.value}
                className={`tab-btn ${activeCategory === tab.value ? 'active-tab' : ''} ${tab.value === 'Sale' ? 'sale-tab' : ''}`}
                onClick={() => setActiveCategory(tab.value)}
              >
                {tab.value === 'Sale' && <Sparkles size={13} />}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Control Toolbar (Search, Filter Drawer Button, Sort, Layout Switch) */}
        <div className="catalog-toolbar">
          {/* Left: Quick Search Bar */}
          <div className="toolbar-search-box">
            <Search size={17} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search by linen, jacket, dress, silk..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Filter catalog products"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="clear-search-btn">
                <X size={14} />
              </button>
            )}
          </div>

          {/* Right Controls */}
          <div className="toolbar-right-controls">
            {/* Filter Toggle Button */}
            <button 
              className={`toolbar-btn ${showFilterDrawer ? 'toolbar-btn-active' : ''}`}
              onClick={() => setShowFilterDrawer(!showFilterDrawer)}
            >
              <SlidersHorizontal size={16} />
              <span>Filters</span>
              {isFiltered && <span className="filter-active-dot"></span>}
            </button>

            {/* Sort Selector */}
            <div className="sort-select-wrapper">
              <ArrowUpDown size={15} className="sort-icon" />
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort products by"
              >
                <option value="featured">Featured / Curated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">New Arrivals</option>
              </select>
            </div>

            {/* Grid Layout Toggle */}
            <div className="grid-toggle-btns">
              <button 
                className={`grid-view-btn ${gridColumns === 4 ? 'active' : ''}`}
                onClick={() => setGridColumns(4)}
                title="4 Column Grid"
              >
                <LayoutGrid size={17} />
              </button>
              <button 
                className={`grid-view-btn ${gridColumns === 3 ? 'active' : ''}`}
                onClick={() => setGridColumns(3)}
                title="3 Column Grid"
              >
                <Grid3X3 size={17} />
              </button>
            </div>
          </div>
        </div>

        {/* Expandable Filter Drawer Box */}
        {showFilterDrawer && (
          <div className="filter-drawer-panel glass-panel animate-fade">
            <div className="filter-panel-header">
              <h4 className="filter-panel-title">Refine Your Selection</h4>
              <button 
                className="btn-reset-all" 
                onClick={handleResetFilters}
              >
                <RotateCcw size={14} />
                <span>Reset All Filters</span>
              </button>
            </div>

            <div className="filter-drawer-grid">
              {/* Filter 1: Gender */}
              <div className="filter-group">
                <label className="filter-label">Department</label>
                <div className="filter-pills-row">
                  {['All', 'Women', 'Men', 'Unisex'].map((gen) => (
                    <button
                      key={gen}
                      className={`filter-pill ${selectedGender === gen ? 'active' : ''}`}
                      onClick={() => setSelectedGender(gen)}
                    >
                      {gen}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filter 2: Size */}
              <div className="filter-group">
                <label className="filter-label">Size</label>
                <div className="filter-pills-row">
                  {['All', 'XS', 'S', 'M', 'L', 'XL', 'XXL'].map((sz) => (
                    <button
                      key={sz}
                      className={`filter-pill ${selectedSize === sz ? 'active' : ''}`}
                      onClick={() => setSelectedSize(sz)}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filter 3: Max Price Slider */}
              <div className="filter-group">
                <div className="filter-label-between">
                  <label className="filter-label">Max Price</label>
                  <span className="price-slider-value">{formatPrice(maxPrice)}</span>
                </div>
                <input 
                  type="range" 
                  min="4000" 
                  max="35000" 
                  step="1000"
                  value={maxPrice} 
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="price-slider"
                />
                <div className="price-slider-marks">
                  <span>{formatPrice(4000)}</span>
                  <span>{formatPrice(35000)}</span>
                </div>
              </div>

              {/* Filter 4: In Stock Toggle */}
              <div className="filter-group filter-checkbox-group">
                <label className="filter-checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={inStockOnly} 
                    onChange={(e) => setInStockOnly(e.target.checked)}
                  />
                  <span>Show In-Stock Garments Only</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Result Summary Bar */}
        <div className="results-summary-row">
          <p className="results-count">
            Showing <strong>{filteredProducts.length}</strong> of <strong>{products.length}</strong> creations
            {activeCategory !== 'All' && <span> in <em>{activeCategory}</em></span>}
          </p>

          {isFiltered && (
            <button onClick={handleResetFilters} className="clear-active-filters-link">
              Clear all filters ({filteredProducts.length})
            </button>
          )}
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className={`catalog-products-grid cols-${gridColumns}`}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="catalog-empty-state">
            <div className="empty-state-icon">🌿</div>
            <h3 className="empty-state-title">No matching pieces found</h3>
            <p className="empty-state-desc">
              We couldn't find any garments matching your current filters or search term "{searchQuery}".
            </p>
            <button className="btn btn-primary" onClick={handleResetFilters}>
              Reset Filters & Show All
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;
