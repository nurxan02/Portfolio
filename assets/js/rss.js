// RSS Feed Handler
class RSSFeedHandler {
  constructor() {
    this.corsProxies = [
      "https://cors-anywhere.herokuapp.com/",
      "https://api.allorigins.win/raw?url=",
      "https://api.codetabs.com/v1/proxy?quest=",
    ];
    this.rssUrls = [
      "https://stackoverflow.blog/feed/",
      "https://feeds.feedburner.com/oreilly/radar",
      "https://www.codesimplicity.com/feed/",
      "https://dev.to/feed",
      "https://css-tricks.com/feed/",
      "https://www.smashingmagazine.com/feed/",
      "https://blog.logrocket.com/feed/",
      "https://www.freecodecamp.org/news/rss/",
      "https://martinfowler.com/feed.atom",
      "https://feeds.feedburner.com/alistapart/main",
      "https://blog.angular.io/feed",
      "https://reactjs.org/feed.xml",
      "https://nodejs.org/en/feed/blog.xml",
      "https://blog.github.com/feed.xml",
      "https://medium.com/feed/javascript-scene",
      "https://hackernoon.com/feed",
      "https://blog.codinghorror.com/rss/",
      "https://www.paulgraham.com/rss.html",
      "https://feeds.feedburner.com/tweakers/mixed",
      "https://blog.mozilla.org/feed/",
    ];
    this.currentProxyIndex = 0;
    this.currentUrlIndex = 0;
    this.currentPage = 1;
    this.articlesPerPage = 4;
    this.allArticles = [];
    this.filteredArticles = [];
    this.currentFilter = "all";
    this.currentSearch = "";
    this.availableCategories = [];
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.loadRSSFeed();
  }

  setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById("rssSearch");
    const clearSearchBtn = document.getElementById("clearRssSearch");

    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.handleSearch(e.target.value);
      });
    }

    if (clearSearchBtn) {
      clearSearchBtn.addEventListener("click", () => {
        this.clearSearch();
      });
    }
  }

  handleSearch(searchTerm) {
    this.currentSearch = searchTerm.toLowerCase();
    const clearBtn = document.getElementById("clearRssSearch");

    if (clearBtn) {
      clearBtn.style.display = searchTerm ? "block" : "none";
    }

    this.applyFilters();
  }

  clearSearch() {
    const searchInput = document.getElementById("rssSearch");
    const clearBtn = document.getElementById("clearRssSearch");

    if (searchInput) {
      searchInput.value = "";
    }

    if (clearBtn) {
      clearBtn.style.display = "none";
    }

    this.currentSearch = "";
    this.applyFilters();
  }

  handleCategoryFilter(category) {
    this.currentFilter = category;
    this.currentPage = 1;

    // Update active filter button
    document.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.classList.remove("active");
    });

    document
      .querySelector(`[data-filter="${category}"]`)
      .classList.add("active");

    this.applyFilters();
  }

  applyFilters() {
    let filtered = [...this.allArticles];

    // Apply search filter
    if (this.currentSearch) {
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(this.currentSearch) ||
          article.description.toLowerCase().includes(this.currentSearch) ||
          article.category.toLowerCase().includes(this.currentSearch)
      );
    }

    // Apply category filter
    if (this.currentFilter !== "all") {
      filtered = filtered.filter(
        (article) =>
          article.category.toLowerCase() === this.currentFilter.toLowerCase()
      );
    }

    this.filteredArticles = filtered;
    this.currentPage = 1;
    this.displayArticles();
    this.updateArticleCount();
  }

  updateArticleCount() {
    const countEl = document.getElementById("rssCount");
    if (countEl) {
      const count = this.filteredArticles.length;
      const term = count === 1 ? "article" : "articles";
      countEl.textContent = `${count} ${term} found`;
    }
  }

  generateFilterCategories() {
    // Extract unique categories from articles
    const categories = [
      ...new Set(this.allArticles.map((article) => article.category)),
    ];
    this.availableCategories = categories;

    // Generate filter buttons
    const filterContainer = document.getElementById("rssFilterButtons");
    if (filterContainer) {
      filterContainer.innerHTML = `
        <button class="filter-btn active" data-filter="all">
          <i class="fas fa-th"></i>
          All Articles
        </button>
        ${categories
          .map(
            (category) => `
          <button class="filter-btn" data-filter="${category.toLowerCase()}">
            <i class="fas fa-${this.getCategoryIcon(category)}"></i>
            ${category}
          </button>
        `
          )
          .join("")}
      `;

      // Add click listeners to filter buttons
      filterContainer.querySelectorAll(".filter-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          this.handleCategoryFilter(btn.dataset.filter);
        });
      });
    }
  }

  getCategoryIcon(category) {
    const iconMap = {
      "Web Development": "code",
      Programming: "laptop-code",
      JavaScript: "js-square",
      Python: "python",
      React: "react",
      "Node.js": "node-js",
      Database: "database",
      DevOps: "tools",
      "UI/UX": "palette",
      Mobile: "mobile-alt",
      Security: "shield-alt",
      Cloud: "cloud",
      "AI/ML": "brain",
      Tutorial: "graduation-cap",
      News: "newspaper",
      Opinion: "comment",
      Review: "star",
      General: "file-alt",
    };

    return iconMap[category] || "file-alt";
  }

  determineCategory(item) {
    const title = item.title.toLowerCase();
    const description = item.description.toLowerCase();
    const content = `${title} ${description}`;

    // Check for specific technology keywords
    if (
      content.includes("javascript") ||
      content.includes("js ") ||
      content.includes("node")
    ) {
      return "JavaScript";
    } else if (
      content.includes("python") ||
      content.includes("django") ||
      content.includes("flask")
    ) {
      return "Python";
    } else if (
      content.includes("react") ||
      content.includes("vue") ||
      content.includes("angular")
    ) {
      return "React";
    } else if (
      content.includes("database") ||
      content.includes("sql") ||
      content.includes("mongodb")
    ) {
      return "Database";
    } else if (
      content.includes("security") ||
      content.includes("vulnerability") ||
      content.includes("auth")
    ) {
      return "Security";
    } else if (
      content.includes("cloud") ||
      content.includes("aws") ||
      content.includes("azure")
    ) {
      return "Cloud";
    } else if (
      content.includes("ai") ||
      content.includes("machine learning") ||
      content.includes("ml ")
    ) {
      return "AI/ML";
    } else if (
      content.includes("tutorial") ||
      content.includes("how to") ||
      content.includes("guide")
    ) {
      return "Tutorial";
    } else if (
      content.includes("ui") ||
      content.includes("ux") ||
      content.includes("design")
    ) {
      return "UI/UX";
    } else if (
      content.includes("mobile") ||
      content.includes("ios") ||
      content.includes("android")
    ) {
      return "Mobile";
    } else if (
      content.includes("devops") ||
      content.includes("deployment") ||
      content.includes("ci/cd")
    ) {
      return "DevOps";
    } else if (
      content.includes("programming") ||
      content.includes("coding") ||
      content.includes("software")
    ) {
      return "Programming";
    } else if (
      content.includes("web") ||
      content.includes("html") ||
      content.includes("css")
    ) {
      return "Web Development";
    } else {
      return "General";
    }
  }

  async loadRSSFeed() {
    const statusEl = document.getElementById("rssStatus");
    const contentEl = document.getElementById("rssContent");
    const errorEl = document.getElementById("rssError");

    try {
      // Show loading state
      this.showLoading();

      // Update status
      statusEl.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> Loading articles...';

      // Collect articles from multiple sources
      const allArticles = [];
      const maxArticlesPerSource = 20; // Maximum articles per RSS source
      const maxTotalArticles = 30; // Maximum total articles

      for (
        let urlIndex = 0;
        urlIndex < this.rssUrls.length && allArticles.length < maxTotalArticles;
        urlIndex++
      ) {
        let success = false;

        for (
          let proxyIndex = 0;
          proxyIndex < this.corsProxies.length && !success;
          proxyIndex++
        ) {
          try {
            const currentUrl = this.rssUrls[urlIndex];
            const currentProxy = this.corsProxies[proxyIndex];

            console.log(`Trying: ${currentProxy}${currentUrl}`);

            const response = await fetch(currentProxy + currentUrl, {
              headers: {
                "X-Requested-With": "XMLHttpRequest",
              },
              timeout: 10000,
            });

            if (response.ok) {
              const rssText = await response.text();

              // Parse RSS XML
              const parser = new DOMParser();
              const rssDoc = parser.parseFromString(rssText, "text/xml");

              // Check for parsing errors
              const parserError = rssDoc.querySelector("parsererror");
              if (!parserError) {
                // Extract articles
                const items = rssDoc.querySelectorAll("item");
                if (items.length > 0) {
                  const sourceArticles = Array.from(items)
                    .slice(0, maxArticlesPerSource) // Limit articles per source
                    .map((item) => this.parseRSSItem(item))
                    .filter((article) => article.title && article.link); // Filter valid articles

                  allArticles.push(...sourceArticles);
                  success = true;

                  // Update status with progress
                  statusEl.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Loaded ${
                    allArticles.length
                  } articles from ${urlIndex + 1} sources...`;

                  console.log(
                    `Successfully loaded ${sourceArticles.length} articles from ${currentUrl}`
                  );
                }
              }
            }
          } catch (proxyError) {
            console.warn(
              `Proxy ${proxyIndex} failed for ${this.rssUrls[urlIndex]}:`,
              proxyError
            );
          }
        }

        if (!success) {
          console.warn(`Failed to load from ${this.rssUrls[urlIndex]}`);
        }
      }

      if (allArticles.length === 0) {
        throw new Error("No articles could be loaded from any RSS source");
      }

      // Remove duplicates based on title and link
      const uniqueArticles = allArticles.filter(
        (article, index, self) =>
          index ===
          self.findIndex(
            (a) => a.title === article.title || a.link === article.link
          )
      );

      // Sort articles by date (newest first)
      uniqueArticles.sort((a, b) => {
        const dateA = new Date(a.pubDate || 0);
        const dateB = new Date(b.pubDate || 0);
        return dateB - dateA;
      });

      // Limit to maximum total articles
      this.allArticles = uniqueArticles.slice(0, maxTotalArticles);

      // Initialize filtered articles with all articles
      this.filteredArticles = [...this.allArticles];

      // Generate filter categories based on actual articles
      this.generateFilterCategories();

      // Update status
      statusEl.innerHTML = `<i class="fas fa-check-circle"></i> ${this.allArticles.length} articles loaded from multiple sources`;
      statusEl.className = "rss-status success";

      // Hide error if visible
      errorEl.style.display = "none";

      // Display articles and update count
      this.displayArticles();
      this.updateArticleCount();
    } catch (error) {
      console.error("RSS Feed Error:", error);
      this.showError(error.message);
    }
  }

  parseRSSItem(item) {
    const getTextContent = (selector) => {
      try {
        const element = item.querySelector(selector);
        return element ? element.textContent.trim() : "";
      } catch (error) {
        return "";
      }
    };

    const getCDATA = (selector) => {
      try {
        const element = item.querySelector(selector);
        if (element) {
          const cdataContent = element.textContent || element.innerHTML;
          return cdataContent.trim();
        }
        return "";
      } catch (error) {
        return "";
      }
    };

    // Extract image from content - more robust approach
    const extractImage = (content) => {
      if (!content) return null;
      try {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = content;
        const img = tempDiv.querySelector("img");
        return img ? img.src : null;
      } catch (error) {
        return null;
      }
    };

    // Try multiple content selectors
    const content =
      getCDATA("content\\:encoded") ||
      getCDATA("description") ||
      getCDATA("summary") ||
      getTextContent("description");

    const image = extractImage(content) || this.getPlaceholderImage();

    const articleData = {
      title: getTextContent("title") || "Untitled Article",
      description: this.cleanDescription(
        getCDATA("description") || getTextContent("description")
      ),
      link: getTextContent("link") || "#",
      pubDate: getTextContent("pubDate") || getTextContent("dc\\:date"),
      author:
        getTextContent("author") ||
        getTextContent("dc\\:creator") ||
        getTextContent("creator") ||
        "Stack Overflow",
      guid: getTextContent("guid") || getTextContent("id"),
      formattedDate: this.formatDate(
        getTextContent("pubDate") || getTextContent("dc\\:date")
      ),
      image: image,
      category: getTextContent("category") || "Technology",
    };

    // Use RSS category if available, otherwise determine from content
    if (
      !getTextContent("category") ||
      getTextContent("category") === "Technology"
    ) {
      articleData.category = this.determineCategory(articleData);
    }

    return articleData;
  }

  cleanDescription(description) {
    if (!description) return "No description available.";

    try {
      // Remove HTML tags and clean up the description
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = description;
      let cleanText = tempDiv.textContent || tempDiv.innerText || "";

      // Remove extra whitespace
      cleanText = cleanText.replace(/\s+/g, " ").trim();

      // Limit length
      if (cleanText.length > 150) {
        cleanText = cleanText.substring(0, 150) + "...";
      }

      return cleanText || "No description available.";
    } catch (error) {
      return "No description available.";
    }
  }

  getPlaceholderImage() {
    const placeholders = [
      "https://images.unsplash.com/photo-1518773553398-650c184e0bb3?w=400&h=250&fit=crop",
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop",
      "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=250&fit=crop",
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&h=250&fit=crop",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop",
      "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400&h=250&fit=crop",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=250&fit=crop",
      "https://images.unsplash.com/photo-1605379399642-870262d3d051?w=400&h=250&fit=crop",
      "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=400&h=250&fit=crop",
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&h=250&fit=crop",
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop",
      "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=250&fit=crop",
      "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&h=250&fit=crop",
      "https://images.unsplash.com/photo-1607706189992-eae578626c86?w=400&h=250&fit=crop",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=250&fit=crop",
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop",
      "https://images.unsplash.com/photo-1581276879432-15e50529f34b?w=400&h=250&fit=crop",
    ];
    return placeholders[Math.floor(Math.random() * placeholders.length)];
  }

  formatDate(dateString) {
    if (!dateString) return "";

    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffTime = Math.abs(now - date);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        return "Yesterday";
      } else if (diffDays < 7) {
        return `${diffDays} days ago`;
      } else if (diffDays < 30) {
        const weeks = Math.floor(diffDays / 7);
        return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
      } else {
        return date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
      }
    } catch (error) {
      return dateString;
    }
  }

  displayArticles() {
    const contentEl = document.getElementById("rssContent");
    const startIndex = (this.currentPage - 1) * this.articlesPerPage;
    const endIndex = startIndex + this.articlesPerPage;
    const articlesToShow = this.filteredArticles.slice(startIndex, endIndex);

    if (articlesToShow.length === 0) {
      contentEl.innerHTML = this.createNoResultsHTML();
      return;
    }

    const articlesHTML = articlesToShow
      .map((article) => this.createArticleHTML(article))
      .join("");

    contentEl.innerHTML = `
      <div class="news-grid">
        ${articlesHTML}
      </div>
      ${this.createPaginationHTML()}
    `;

    // Add click events to articles
    this.addArticleClickEvents();
  }

  createNoResultsHTML() {
    const searchTerm = this.currentSearch;
    const filterText =
      this.currentFilter === "all" ? "" : ` in ${this.currentFilter}`;

    return `
      <div class="no-results">
        <div class="no-results-content">
          <i class="fas fa-search"></i>
          <h3>No articles found</h3>
          <p>
            ${
              searchTerm
                ? `No articles found for "${searchTerm}"${filterText}.`
                : `No articles found${filterText}.`
            }
            Try adjusting your search or filter.
          </p>
        </div>
      </div>
    `;
  }

  createArticleHTML(article) {
    return `
      <article class="news-card" data-url="${article.link}">
        <div class="news-image">
          <img src="${article.image}" alt="${article.title}" loading="lazy" />
          <div class="news-category">${article.category}</div>
          <div class="news-overlay">
            <i class="fas fa-external-link-alt"></i>
          </div>
        </div>
        <div class="news-content">
          <div class="news-header">
            <h3 class="news-title">${article.title}</h3>
            <div class="news-meta">
              <span class="news-date">
                <i class="fas fa-calendar-alt"></i>
                ${article.formattedDate}
              </span>
              <span class="news-author">
                <i class="fas fa-user"></i>
                ${article.author}
              </span>
            </div>
          </div>
          <div class="news-description">${article.description}</div>
          <div class="news-footer">
            <a href="${article.link}" class="read-more-btn" target="_blank" rel="noopener noreferrer">
              <span>Read Full Article</span>
              <i class="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </article>
    `;
  }

  createPaginationHTML() {
    const totalPages = Math.ceil(
      this.filteredArticles.length / this.articlesPerPage
    );

    if (totalPages <= 1) return "";

    return `
      <div class="rss-pagination">
        <button class="pagination-btn" onclick="rssHandler.goToPage(${
          this.currentPage - 1
        })" ${this.currentPage === 1 ? "disabled" : ""}>
          <i class="fas fa-chevron-left"></i> Previous
        </button>
        <div class="pagination-info">
          Page ${this.currentPage} of ${totalPages}
        </div>
        <button class="pagination-btn" onclick="rssHandler.goToPage(${
          this.currentPage + 1
        })" ${this.currentPage === totalPages ? "disabled" : ""}>
          Next <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    `;
  }

  addArticleClickEvents() {
    const articles = document.querySelectorAll(".news-card");
    articles.forEach((article) => {
      article.addEventListener("click", (e) => {
        // Don't trigger if clicking on the read more button
        if (e.target.closest(".read-more-btn")) return;

        const url = article.dataset.url;
        if (url) {
          window.open(url, "_blank", "noopener,noreferrer");
        }
      });
    });
  }

  goToPage(page) {
    const totalPages = Math.ceil(
      this.filteredArticles.length / this.articlesPerPage
    );

    if (page < 1 || page > totalPages) return;

    this.currentPage = page;
    this.displayArticles();

    // Scroll to RSS section
    document.getElementById("rss-feed").scrollIntoView({ behavior: "smooth" });
  }

  showLoading() {
    const contentEl = document.getElementById("rssContent");
    contentEl.innerHTML = `
      <div class="rss-loading">
        <div class="loading-spinner">
          <i class="fas fa-spinner fa-spin"></i>
        </div>
        <p>Fetching latest articles...</p>
      </div>
    `;
  }

  showError(message) {
    const statusEl = document.getElementById("rssStatus");
    const contentEl = document.getElementById("rssContent");
    const errorEl = document.getElementById("rssError");

    statusEl.innerHTML =
      '<i class="fas fa-exclamation-triangle"></i> Error loading articles';
    statusEl.className = "rss-status error";

    contentEl.style.display = "none";
    errorEl.style.display = "block";

    const errorMessage = errorEl.querySelector("p");
    if (errorMessage) {
      errorMessage.textContent = `Unable to load RSS feed. This might be due to CORS restrictions or network issues. Please try again later.`;
    }
  }

  retry() {
    const contentEl = document.getElementById("rssContent");
    const errorEl = document.getElementById("rssError");

    contentEl.style.display = "block";
    errorEl.style.display = "none";

    this.loadRSSFeed();
  }
}

// Global function for retry button
function loadRSSFeed() {
  if (window.rssHandler) {
    window.rssHandler.retry();
  }
}

// Initialize RSS handler when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize RSS handler
  window.rssHandler = new RSSFeedHandler();
});

// Export for global access
window.loadRSSFeed = loadRSSFeed;
