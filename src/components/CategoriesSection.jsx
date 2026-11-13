import React from 'react';
import { categoriesData } from '../data/products';
import { ArrowUpRight } from 'lucide-react';
import './CategoriesSection.css';

const CategoriesSection = ({ onSelectCategory }) => {
  return (
    <section className="section-padding categories-section">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Curated Collections</span>
          <h2 className="section-title">Designed for Distinction</h2>
          <p className="section-subtitle">
            Explore meticulously tailored edits crafted from breathable Belgian flax, 
            natural cotton twills, and raw handloom silks.
          </p>
        </div>

        <div className="categories-grid">
          {categoriesData.map((category) => (
            <div 
              key={category.id} 
              className="category-card"
              onClick={() => onSelectCategory(
                category.id === 'cat-women' ? 'Women' :
                category.id === 'cat-men' ? 'Men' :
                category.id === 'cat-coords' ? 'Co-ords' : 'Festive'
              )}
            >
              <div className="category-image-wrap">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="category-img"
                  loading="lazy"
                />
                <div className="category-overlay"></div>
              </div>

              <div className="category-meta">
                <span className="category-count">{category.count}</span>
                <div className="category-title-row">
                  <h3 className="category-name">{category.name}</h3>
                  <div className="category-arrow-icon">
                    <ArrowUpRight size={18} />
                  </div>
                </div>
                <p className="category-desc">{category.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
