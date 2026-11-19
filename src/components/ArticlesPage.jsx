import React, { useState } from 'react';
import { articlesData, articleCategories } from '../data/articles';
import ArticleReaderModal from './ArticleReaderModal';
import { 
  BookOpen, 
  Clock, 
  Calendar, 
  ArrowRight, 
  Sparkles, 
  Search
} from 'lucide-react';
import './ArticlesPage.css';

const ArticlesPage = ({ onReadArticle }) => {
  const [activeCategory, setActiveCategory] = useState('All Stories');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);

  const handleOpenArticle = (article) => {
    if (onReadArticle) {
      onReadArticle(article);
    } else {
      setSelectedArticle(article);
    }
  };

  // Filter articles
  const filteredArticles = articlesData.filter((article) => {
    // Category match
    if (activeCategory !== 'All Stories' && article.category !== activeCategory) {
      return false;
    }
    // Search query match
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchTitle = article.title.toLowerCase().includes(q);
      const matchExcerpt = article.excerpt.toLowerCase().includes(q);
      const matchCat = article.category.toLowerCase().includes(q);
      if (!matchTitle && !matchExcerpt && !matchCat) return false;
    }
    return true;
  });

  // Featured article is the first article or a chosen hero article
  const featuredArticle = articlesData[0];
  const regularArticles = filteredArticles.filter((a) => a.id !== featuredArticle.id || activeCategory !== 'All Stories' || searchQuery.trim() !== '');

  return (
    <div className="articles-page-root">
      {/* Editorial Header */}
      <section className="articles-hero-banner">
        <div className="container">
          <div className="articles-header-content">
            <span className="articles-eyebrow">
              <BookOpen size={14} className="eyebrow-icon" />
              The Atelier Journal &bull; Editorial Essays
            </span>
            <h1 className="articles-main-heading">
              Stories of Fabric, Form & Timeless Wardrobes
            </h1>
            <p className="articles-hero-lead">
              A serene journal dedicated to natural European flax, heritage silk weaves, 
              capsule wardrobe philosophy, and slow garment craftsmanship.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="articles-controls-bar">
            {/* Category Filter Pills */}
            <div className="articles-category-pills">
              {articleCategories.map((cat) => (
                <button
                  key={cat}
                  className={`category-pill-btn ${activeCategory === cat ? 'is-active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Quick Search in Articles */}
            <div className="articles-search-wrap">
              <Search size={16} className="articles-search-icon" />
              <input 
                type="text" 
                placeholder="Search articles & guides..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search articles"
              />
              {searchQuery && (
                <button 
                  className="clear-search-btn"
                  onClick={() => setSearchQuery('')}
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="container articles-content-container">
        {/* Featured Story Hero (Shown when on "All Stories" and no active search) */}
        {activeCategory === 'All Stories' && searchQuery.trim() === '' && featuredArticle && (
          <section className="featured-story-section">
            <div 
              className="featured-story-card"
              onClick={() => handleOpenArticle(featuredArticle)}
            >
              <div className="featured-story-media">
                <img 
                  src={featuredArticle.coverImage} 
                  alt={featuredArticle.title} 
                  className="featured-img"
                />
                <span className="featured-ribbon">
                  <Sparkles size={13} />
                  Featured Story
                </span>
              </div>

              <div className="featured-story-details">
                <div className="story-meta-row">
                  <span className="story-category-tag">{featuredArticle.category}</span>
                  <span className="story-read-time">
                    <Clock size={13} /> {featuredArticle.readTime}
                  </span>
                </div>

                <h2 className="featured-story-title">{featuredArticle.title}</h2>
                <p className="featured-story-excerpt">{featuredArticle.excerpt}</p>

                <div className="featured-author-row">
                  <img 
                    src={featuredArticle.author.avatar} 
                    alt={featuredArticle.author.name}
                    className="author-avatar-sm"
                  />
                  <div className="author-copy">
                    <span className="author-name-text">{featuredArticle.author.name}</span>
                    <span className="author-role-text">{featuredArticle.author.role}</span>
                  </div>
                  <button className="read-full-story-btn">
                    <span>Read Full Editorial</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Regular Articles Grid */}
        <section className="articles-grid-section">
          {filteredArticles.length === 0 ? (
            <div className="no-articles-found">
              <BookOpen size={40} className="empty-book-icon" />
              <h3>No articles found</h3>
              <p>Try searching with another keyword or resetting the category filter.</p>
              <button 
                className="btn btn-primary"
                onClick={() => {
                  setActiveCategory('All Stories');
                  setSearchQuery('');
                }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="articles-cards-grid">
              {(activeCategory === 'All Stories' && searchQuery.trim() === '' 
                ? regularArticles 
                : filteredArticles
              ).map((article) => (
                <article 
                  key={article.id} 
                  className="article-card"
                  onClick={() => handleOpenArticle(article)}
                >
                  <div className="article-card-image-wrap">
                    <img 
                      src={article.coverImage} 
                      alt={article.title} 
                      className="article-card-img"
                      loading="lazy"
                    />
                    <span className="article-card-cat-badge">{article.category}</span>
                  </div>

                  <div className="article-card-body">
                    <div className="article-card-meta">
                      <span><Calendar size={12} /> {article.date}</span>
                      <span>&bull;</span>
                      <span><Clock size={12} /> {article.readTime}</span>
                    </div>

                    <h3 className="article-card-title">{article.title}</h3>
                    <p className="article-card-excerpt">{article.excerpt}</p>

                    <div className="article-card-footer">
                      <div className="article-card-author">
                        <img 
                          src={article.author.avatar} 
                          alt={article.author.name} 
                          className="author-thumb"
                        />
                        <span className="author-name-sm">{article.author.name}</span>
                      </div>

                      <span className="read-more-link">
                        Read Story <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Editorial Journal Newsletter Callout */}
        <section className="journal-newsletter-banner">
          <div className="journal-newsletter-inner">
            <span className="journal-news-eyebrow">Atelier Dispatch</span>
            <h3 className="journal-news-title">Receive Our Fortnightly Essays</h3>
            <p className="journal-news-desc">
              Thoughtful writing on slow craftsmanship, seasonal textile care, and capsule wardrobes. 
              Delivered quietly to your inbox twice a month. No spam, ever.
            </p>
            <form 
              className="journal-news-form"
              onSubmit={(e) => {
                e.preventDefault();
                alert('Thank you for subscribing to the OLIVÉRA Atelier Dispatch.');
              }}
            >
              <input 
                type="email" 
                placeholder="Enter your email address..."
                required
                aria-label="Email for newsletter"
              />
              <button type="submit" className="btn btn-primary">
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </div>

      {/* Full Article Reader Modal (Local fallback if onReadArticle not passed) */}
      {!onReadArticle && selectedArticle && (
        <ArticleReaderModal 
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
          onSelectArticle={(art) => setSelectedArticle(art)}
          allArticles={articlesData}
        />
      )}
    </div>
  );
};

export default ArticlesPage;
