import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ShoppingBag, Sparkles, ArrowRight } from 'lucide-react';
import './LookbookSection.css';

const LookbookSection = () => {
  const { products, setQuickViewProduct, addToCart, formatPrice } = useShop();
  const [activeHotspot, setActiveHotspot] = useState(1);

  const featuredTrench = products.find((p) => p.id === 'olv-001');
  const featuredDress = products.find((p) => p.id === 'olv-006');

  return (
    <section id="lookbook" className="section-padding lookbook-section">
      <div className="container">
        <div className="lookbook-wrapper glass-panel">
          {/* Left Editorial Visual with Hotspots */}
          <div className="lookbook-visual-frame">
            <img 
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1100&q=80" 
              alt="The Olive and Cream Autumn Lookbook" 
              className="lookbook-img"
            />
            
            {/* Interactive Hotspot 1 */}
            <div 
              className={`lookbook-hotspot hotspot-1 ${activeHotspot === 1 ? 'is-active' : ''}`}
              onClick={() => setActiveHotspot(1)}
            >
              <div className="hotspot-pulse"></div>
              <span className="hotspot-dot">1</span>
              
              <div className="hotspot-tooltip">
                <span className="tooltip-tag">Look 01</span>
                <p className="tooltip-title">{featuredTrench?.name || 'French Linen Trench'}</p>
                <span className="tooltip-price">{formatPrice(featuredTrench?.price || 14500)}</span>
              </div>
            </div>

            {/* Interactive Hotspot 2 */}
            <div 
              className={`lookbook-hotspot hotspot-2 ${activeHotspot === 2 ? 'is-active' : ''}`}
              onClick={() => setActiveHotspot(2)}
            >
              <div className="hotspot-pulse"></div>
              <span className="hotspot-dot">2</span>

              <div className="hotspot-tooltip">
                <span className="tooltip-tag">Look 02</span>
                <p className="tooltip-title">{featuredDress?.name || 'Pleated Olive Maxi Dress'}</p>
                <span className="tooltip-price">{formatPrice(featuredDress?.price || 15400)}</span>
              </div>
            </div>
          </div>

          {/* Right Editorial Story & Featured Product Spotlight */}
          <div className="lookbook-story">
            <div className="lookbook-badge">
              <Sparkles size={14} />
              <span>Editorial Lookbook &bull; Vol. 04</span>
            </div>

            <h2 className="lookbook-headline">
              The Olive & Cream Chapter: <br />
              <em>Quiet Luxury In Every Thread.</em>
            </h2>

            <p className="lookbook-narrative">
              Shot on location amidst misty Mediterranean olive groves and sun-bleached stone villas. 
              This edit marries earthy forest tones with pure ivory silk. Designed to be mixed, matched, 
              and passed down through generations.
            </p>

            {/* Active Featured Look Card */}
            <div className="lookbook-featured-card">
              <span className="featured-card-label">Spotlight Piece {activeHotspot === 1 ? '#01' : '#02'}</span>
              
              <div className="featured-card-content">
                <img 
                  src={activeHotspot === 1 ? featuredTrench?.images[0] : featuredDress?.images[0]} 
                  alt="Spotlight Garment" 
                  className="spotlight-thumb"
                />
                <div className="spotlight-details">
                  <h4 className="spotlight-name">
                    {activeHotspot === 1 ? featuredTrench?.name : featuredDress?.name}
                  </h4>
                  <p className="spotlight-price">
                    {formatPrice(activeHotspot === 1 ? featuredTrench?.price || 14500 : featuredDress?.price || 15400)}
                  </p>
                  <div className="spotlight-actions">
                    <button 
                      className="btn btn-primary btn-sm"
                      onClick={() => {
                        const targetProd = activeHotspot === 1 ? featuredTrench : featuredDress;
                        if (targetProd) addToCart(targetProd, targetProd.sizes[0], targetProd.colors[0]?.name, 1);
                      }}
                    >
                      <ShoppingBag size={14} />
                      <span>Add Look to Bag</span>
                    </button>

                    <button 
                      className="btn btn-cream btn-sm"
                      onClick={() => {
                        const targetProd = activeHotspot === 1 ? featuredTrench : featuredDress;
                        if (targetProd) setQuickViewProduct(targetProd);
                      }}
                    >
                      <span>Inspect Details</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Lookbook Footer Quote */}
            <div className="lookbook-quote">
              <p>“True luxury does not shout; it drapes effortlessly.”</p>
              <span>— OLIVÉRA Design Atelier, Paris & Lahore</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LookbookSection;
