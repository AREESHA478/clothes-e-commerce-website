import React from 'react';
import { articlesData } from '../data/articles';
import { ArrowRight, BookOpen, Clock } from 'lucide-react';
import './HomeArticlesSection.css';

const HomeArticlesSection = ({ onNavigateArticles, onReadArticle }) => {
  // Take top 3 articles for homepage preview
  const featuredStories = articlesData.slice(0, 3);

  return (
    <section className="home-articles-section">
      <div className="container">
        <div className="home-articles-header">
          <div className="home-articles-title-block">
            <span className="home-articles-eyebrow">
              <BookOpen size={13} />
              The Editorial Journal
            </span>
            <h2 className="home-articles-title">Read From Our Atelier</h2>
          </div>

          <button 
            className="view-all-articles-btn"
            onClick={onNavigateArticles}
          >
            <span>View All Stories</span>
            <ArrowRight size={15} />
          </button>
        </div>

        <div className="home-articles-grid">
          {featuredStories.map((article) => (
            <div 
              key={article.id} 
              className="home-article-card"
              onClick={() => onReadArticle(article)}
            >
              <div className="home-article-img-wrap">
                <img 
                  src={article.coverImage} 
                  alt={article.title} 
                  loading="lazy"
                />
                <span className="home-article-cat">{article.category}</span>
              </div>

              <div className="home-article-body">
                <div className="home-article-meta">
                  <span>{article.date}</span>
                  <span>&bull;</span>
                  <span><Clock size={12} /> {article.readTime}</span>
                </div>

                <h3 className="home-article-name">{article.title}</h3>
                <p className="home-article-excerpt">{article.excerpt}</p>

                <div className="home-article-cta">
                  <span>Read Article</span>
                  <ArrowRight size={14} className="cta-arrow" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeArticlesSection;
