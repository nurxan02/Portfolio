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
      "https://dev.to/feed",
      "https://yusufipek.me/rss",
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
        <button class="show-more-categories" id="showMoreCategories">
          <span>Show More</span>
          <i class="fas fa-chevron-down"></i>
        </button>
      `;

      // Add click listeners to filter buttons
      filterContainer.querySelectorAll(".filter-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          this.handleCategoryFilter(btn.dataset.filter);
        });
      });

      // Add show more functionality
      this.setupShowMoreCategories();
    }
  }

  getCategoryIcon(category) {
    const iconMap = {
      // Web Development & Programming
      "Web Development": "code",
      webdev: "code",
      Programming: "laptop-code",
      programming: "laptop-code",
      JavaScript: "js-square fab",
      Python: "python fab",
      React: "react fab",
      "Node.js": "node-js fab",
      Java: "java fab",
      java: "java fab",

      // Infrastructure & Tools
      Database: "database",
      DevOps: "tools",
      Cloud: "cloud",
      aws: "aws fab",
      virtualmachine: "server",

      // Design & UX
      "UI/UX": "palette",
      Design: "palette",

      // Mobile & Platforms
      Mobile: "mobile-alt",
      iOS: "apple fab",
      Android: "android fab",

      // Security & Privacy
      Security: "shield-alt",

      // AI & Data Science
      "AI/ML": "brain",
      ai: "brain",
      data: "chart-bar",
      ChatGPT: "robot",
      "Chat GPT": "robot",
      chatgpt: "robot",
      OpenAI: "robot",
      openai: "robot",
      GPT: "robot",
      gpt: "robot",
      "GPT-3": "robot",
      "GPT-4": "robot",
      "Large Language Model": "brain",
      LLM: "brain",
      "Machine Learning": "brain",
      "Deep Learning": "brain",
      "Neural Network": "brain",
      "Artificial Intelligence": "brain",

      // Business & Management
      Business: "briefcase",
      business: "briefcase",
      Management: "tasks",

      // Community & Culture
      Community: "users",
      community: "users",
      "Internet Culture": "globe",

      // Learning & Education
      Tutorial: "graduation-cap",
      Education: "graduation-cap",

      // News & Media
      News: "newspaper",
      Podcast: "podcast",
      podcast: "podcast",

      // Development Practices
      "vibe-coding": "code",
      "rapid-prototyping": "rocket",
      "stack-overflow-for-business": "stack-overflow fab",
      "knowledge-management": "brain",
      "se-stackoverflow": "stack-overflow fab",
      "se-tech": "microchip",

      // Browsers & Technology
      Firefox: "firefox fab",
      Chrome: "chrome fab",
      Safari: "safari fab",
      Edge: "edge fab",
      Opera: "opera fab",
      Internet: "internet-explorer fab",

      // Professional Development
      "leaders-of-code": "user-tie",
      "Developer Experience": "code",
      Career: "user-tie",

      // Content Types
      Essays: "file-text",
      Articles: "file-alt",
      Opinion: "comment",
      Review: "star",

      // Organizational
      Administrative: "cog",
      "ai-coding": "brain",
      Anonym: "user-secret",

      // Software & Tools
      "Internet Policy": "gavel",
      "Laws of Software": "balance-scale",

      // General Categories
      General: "file-alt",
      Technology: "microchip",
      Uncategorized: "question-circle",

      // Programming Languages & Frameworks
      TypeScript: "js-square fab",
      Vue: "vuejs fab",
      Angular: "angular fab",
      Laravel: "laravel fab",
      Symfony: "symfony fab",
      Bootstrap: "bootstrap fab",
      Sass: "sass fab",
      Less: "less fab",
      PHP: "php fab",
      Swift: "swift fab",
      Unity: "unity fab",
      Docker: "docker fab",

      // Cloud & Hosting Platforms
      AWS: "aws fab",
      Azure: "microsoft fab",
      "Google Cloud": "google fab",
      Google: "google fab",
      Apple: "apple fab",
      Microsoft: "microsoft fab",
      IBM: "microsoft fab",
      Oracle: "database",
      Salesforce: "salesforce fab",
      Shopify: "shopify fab",
      WordPress: "wordpress fab",
      Drupal: "drupal fab",
      Joomla: "joomla fab",
      DigitalOcean: "digital-ocean fab",
      Heroku: "cloud",
      Netlify: "cloud",
      Vercel: "cloud",
      Cloudflare: "cloudflare fab",

      // Version Control & Code Hosting
      GitHub: "github fab",
      GitLab: "gitlab fab",
      Git: "git-alt fab",
      Bitbucket: "bitbucket fab",
      CodePen: "codepen fab",

      // Social Media & Communication
      Slack: "slack fab",
      Discord: "discord fab",
      Teams: "microsoft fab",
      Skype: "skype fab",
      Telegram: "telegram fab",
      WhatsApp: "whatsapp fab",
      LinkedIn: "linkedin fab",
      Twitter: "twitter fab",
      Facebook: "facebook fab",
      Instagram: "instagram fab",
      YouTube: "youtube fab",
      TikTok: "tiktok fab",
      Reddit: "reddit fab",
      Medium: "medium fab",
      Dev: "dev fab",
      Hashnode: "hashnode fab",

      // Design & Creative Tools
      Figma: "figma fab",
      Sketch: "sketch fab",
      Adobe: "adobe fab",
      Photoshop: "adobe fab",
      Illustrator: "adobe fab",
      "After Effects": "adobe fab",
      Dribbble: "dribbble fab",
      Behance: "behance fab",

      // E-commerce & CMS
      Magento: "shopping-bag",
      WooCommerce: "wordpress fab",
      Opencart: "shopping-cart",
      Prestashop: "shopping-bag",

      // Databases & Storage
      MongoDB: "envira fab",
      Redis: "database",
      PostgreSQL: "database",
      MySQL: "database",
      MariaDB: "database",
      SQLite: "database",
      Firebase: "google fab",

      // Operating Systems
      Windows: "windows fab",
      macOS: "apple fab",
      Linux: "linux fab",
      Ubuntu: "ubuntu fab",
      CentOS: "centos fab",
      Debian: "linux fab",
      RedHat: "redhat fab",
      SUSE: "suse fab",
      FreeBSD: "freebsd fab",

      // Payment & Financial
      PayPal: "paypal fab",
      Stripe: "stripe fab",
      Square: "square fab",
      Visa: "cc-visa fab",
      MasterCard: "cc-mastercard fab",
      "American Express": "cc-amex fab",
      Bitcoin: "bitcoin fab",
      Ethereum: "ethereum fab",

      // Gaming & Entertainment
      Steam: "steam fab",
      PlayStation: "playstation fab",
      Xbox: "xbox fab",
      Nintendo: "gamepad",
      Twitch: "twitch fab",

      // Analytics & Marketing Tools
      "Google Analytics": "google fab",
      "Google Ads": "google fab",
      "Facebook Ads": "facebook fab",
      Mailchimp: "mailchimp fab",
      HubSpot: "hubspot fab",

      // Additional Tech Categories
      Frontend: "desktop",
      Backend: "server",
      Fullstack: "layer-group",
      API: "plug",
      Framework: "cubes",
      Library: "books",

      // DevOps & Operations
      Kubernetes: "dharmachakra",
      CI: "sync-alt",
      CD: "arrow-right",

      // Methodologies
      Agile: "sync",
      Scrum: "circle",
      Testing: "vial",

      // Data & Analytics
      Analytics: "chart-line",
      "Big Data": "database",
      Visualization: "chart-pie",

      // Emerging Tech
      Blockchain: "link",
      IoT: "wifi",
      VR: "vr-cardboard",
      AR: "eye",

      // Software Architecture
      Microservices: "cubes",
      Monolith: "cube",
      Serverless: "cloud",

      // Quality & Standards
      "Code Quality": "check-double",
      Performance: "tachometer-alt",
      Optimization: "sliders-h",

      // Learning Resources
      Course: "chalkboard-teacher",
      Workshop: "tools",
      Certification: "certificate",

      // Industry
      Startup: "rocket",
      Enterprise: "building",
      Freelance: "handshake",

      // Miscellaneous
      "Open Source": "code-branch",
      License: "certificate",
      Documentation: "book",
      Research: "search",

      // Additional Brands
      Spotify: "spotify fab",
      Netflix: "film",
      Uber: "uber fab",
      Lyft: "lyft fab",
      Airbnb: "airbnb fab",
      Pinterest: "pinterest fab",
      Snapchat: "snapchat fab",
      Zoom: "video",
      Notion: "book",
      Trello: "trello fab",
      Asana: "tasks",
      Jira: "tasks",
      Confluence: "confluence fab",
      Jenkins: "tools",
      TeamCity: "tools",
      Bamboo: "tools",
      CircleCI: "circle",
      Travis: "travis fab",
      Ansible: "cube",
      Terraform: "cube",
      Vagrant: "vagrant fab",
      VirtualBox: "box",
      VMware: "box",
      Grafana: "chart-line",
      Prometheus: "chart-area",
      ElasticSearch: "search",
      Kibana: "chart-pie",
      Logstash: "list",
      Splunk: "chart-line",
      Datadog: "chart-line",
      NewRelic: "chart-line",
      Sentry: "bug",
      RollBar: "bug",
      BugSnag: "bug",
      Mixpanel: "chart-pie",
      Amplitude: "chart-line",
      Segment: "chart-pie",
      Hotjar: "chart-area",
      FullStory: "video",
      LogRocket: "video",
      Intercom: "comment",
      Zendesk: "headset",
      Freshdesk: "headset",
      ServiceNow: "cog",
      Okta: "key",
      Auth0: "key",
      Cognito: "key",
      OneLogin: "key",
      Duo: "shield-alt",
      "1Password": "key",
      LastPass: "key",
      Bitwarden: "key",
      KeePass: "key",
      Dashlane: "key",
      Postman: "paper-plane",
      Insomnia: "moon",
      Swagger: "book",
      Stoplight: "traffic-light",
      Apiary: "bee",
      "API Blueprint": "file-code",
      OpenAPI: "file-code",
      GraphQL: "project-diagram",
      Apollo: "rocket",
      Prisma: "database",
      Hasura: "database",
      Strapi: "cms",
      Contentful: "cms fab",
      Sanity: "cms",
      Ghost: "ghost",
      Jekyll: "gem",
      Hugo: "rocket",
      Gatsby: "gatsby fab",
      Next: "react fab",
      Nuxt: "vuejs fab",
      Svelte: "fire",
      Elm: "leaf",
      Rust: "rust fab",
      Go: "golang fab",
      Kotlin: "android fab",
      Dart: "google fab",
      Flutter: "google fab",
      Xamarin: "microsoft fab",
      Ionic: "ionic fab",
      Cordova: "mobile-alt",
      PhoneGap: "mobile-alt",
      Electron: "desktop",
      Tauri: "desktop",
      PWA: "mobile-alt",
      WebAssembly: "cube",
      Deno: "javascript fab",
      Bun: "javascript fab",

      // More Programming Languages
      "C++": "code",
      "C#": "microsoft fab",
      Perl: "code",
      Ruby: "gem",
      Scala: "code",
      Haskell: "code",
      Clojure: "code",
      Erlang: "code",
      Elixir: "code",
      Lua: "code",
      R: "chart-line",
      Julia: "code",
      Matlab: "chart-line",
      Assembly: "microchip",
      COBOL: "code",
      Fortran: "code",
      Pascal: "code",
      Ada: "code",

      // More Frameworks & Libraries
      Express: "node-js fab",
      Koa: "node-js fab",
      Fastify: "rocket",
      NestJS: "node-js fab",
      Django: "python fab",
      Flask: "python fab",
      FastAPI: "python fab",
      Rails: "gem",
      Sinatra: "gem",
      Spring: "leaf",
      Hibernate: "database",
      Struts: "cubes",
      Quarkus: "cube",
      "Spring Boot": "leaf",
      Micronaut: "microchip",
      Vert: "cube",

      // CSS Frameworks & Preprocessors
      Tailwind: "wind fab",
      Bulma: "cubes",
      Foundation: "building",
      Materialize: "layers",
      SemanticUI: "th-large",
      UIKit: "mobile-alt",
      Ant: "ant-design fab",
      Chakra: "cube",
      Mantine: "cube",
      Styled: "palette",
      Emotion: "heart",
      PostCSS: "css3-alt fab",
      Stylus: "palette",

      // More Cloud Providers
      Linode: "server",
      Vultr: "server",
      OVH: "server",
      Hetzner: "server",
      UpCloud: "cloud",
      Scaleway: "server",
      Rackspace: "server",
      "Alibaba Cloud": "cloud",
      Tencent: "cloud",
      Baidu: "cloud",

      // More Databases
      CouchDB: "database",
      Cassandra: "database",
      Neo4j: "project-diagram",
      InfluxDB: "chart-line",
      TimescaleDB: "clock",
      DynamoDB: "aws fab",
      RethinkDB: "database",
      ArangoDB: "database",
      OrientDB: "database",
      CockroachDB: "bug",
      YugabyteDB: "database",
      TiDB: "database",
      FoundationDB: "database",
      FaunaDB: "database",
      PlanetScale: "planet-scale fab",

      // Message Queues & Streaming
      RabbitMQ: "exchange-alt",
      Kafka: "stream",
      ActiveMQ: "exchange-alt",
      ZeroMQ: "exchange-alt",
      NATS: "paper-plane",
      Pulsar: "star",
      EventStore: "database",

      // More Testing Tools
      Jest: "vial",
      Mocha: "coffee",
      Jasmine: "flower",
      Cypress: "cypress fab",
      Selenium: "robot",
      Playwright: "theater-masks",
      Puppeteer: "robot",
      TestCafe: "vial",
      Karma: "vial",
      Protractor: "search",
      Cucumber: "seedling",
      SpecFlow: "seedling",

      // More DevOps Tools
      GitOps: "git-alt fab",
      ArgoCD: "rocket",
      Flux: "wave-square",
      Helm: "steering-wheel",
      Kustomize: "wrench",
      Istio: "network-wired",
      Linkerd: "link",
      Consul: "network-wired",
      Vault: "vault",
      Nomad: "cube",
      Packer: "box",
      Pulumi: "cloud",
      CDK: "aws fab",
      CloudFormation: "aws fab",

      // More Monitoring & Observability
      Jaeger: "search",
      Zipkin: "search",
      OpenTelemetry: "eye",
      Honeycomb: "hexagon",
      LightStep: "lightbulb",
      Dynatrace: "chart-line",
      AppDynamics: "chart-line",
      Splunk: "chart-line",
      Elastic: "search",
      Fluentd: "tint",
      Fluent: "tint",
      Vector: "arrow-right",

      // More IDEs & Editors
      IntelliJ: "code",
      PyCharm: "python fab",
      WebStorm: "code",
      PhpStorm: "php fab",
      CLion: "code",
      RubyMine: "gem",
      GoLand: "golang fab",
      DataGrip: "database",
      Rider: "microsoft fab",
      AppCode: "apple fab",
      NetBeans: "code",
      Eclipse: "circle",
      Atom: "atom fab",
      Sublime: "code",
      Brackets: "code",
      Emacs: "code",
      Vim: "code",
      Neovim: "code",

      // More Design Tools
      "Adobe XD": "adobe fab",
      "After Effects": "adobe fab",
      Premiere: "adobe fab",
      Lightroom: "adobe fab",
      InDesign: "adobe fab",
      Framer: "framer fab",
      Principle: "palette",
      Zeplin: "palette",
      InVision: "palette",
      Marvel: "palette",
      Miro: "palette",
      Whimsical: "palette",
      Lucidchart: "sitemap",

      // More Business Tools
      Monday: "calendar",
      ClickUp: "tasks",
      Linear: "tasks",
      Height: "tasks",
      Basecamp: "mountain",
      Wrike: "tasks",
      Smartsheet: "table",
      Airtable: "table",
      "Google Workspace": "google fab",
      "Microsoft 365": "microsoft fab",
      Zoom: "video",
      WebEx: "video",
      GoToMeeting: "video",

      // More E-commerce Platforms
      BigCommerce: "shopping-cart",
      Squarespace: "square fab",
      Wix: "wix fab",
      Weebly: "building",
      Ecwid: "shopping-cart",
      "3dcart": "shopping-cart",
      Volusion: "shopping-cart",

      // More CRM & Marketing
      Salesforce: "salesforce fab",
      Pipedrive: "funnel-dollar",
      Hubspot: "hubspot fab",
      Marketo: "bullhorn",
      Pardot: "salesforce fab",
      Eloqua: "bullhorn",
      Mailgun: "envelope",
      SendGrid: "envelope",
      Mandrill: "envelope",

      // More Streaming & Media
      OBS: "video",
      Streamlabs: "video",
      "Final Cut": "video",
      "DaVinci Resolve": "video",
      Audacity: "microphone",
      "Pro Tools": "microphone",
      Logic: "apple fab",
      Ableton: "music",

      // More Collaboration Tools
      Figma: "figma fab",
      Miro: "palette",
      Conceptboard: "chalkboard",
      Lucidspark: "lightbulb",
      Jamboard: "google fab",
      Padlet: "sticky-note",

      // More Security Tools
      Burp: "shield-alt",
      OWASP: "shield-alt",
      Nessus: "shield-alt",
      Metasploit: "shield-alt",
      Wireshark: "network-wired",
      Nmap: "network-wired",
      Kali: "linux fab",
      Parrot: "linux fab",

      // More API Tools
      Insomnia: "moon",
      HTTPie: "globe",
      Paw: "paw",
      Hoppscotch: "rocket",
      Bruno: "rocket",

      // Cryptocurrency & Blockchain
      Solana: "coins",
      Cardano: "coins",
      Polkadot: "coins",
      Chainlink: "link",
      Polygon: "polygon fab",
      Avalanche: "mountain",
      Cosmos: "star",
      Algorand: "coins",

      // More Productivity Tools
      Obsidian: "brain",
      Roam: "brain",
      LogSeq: "list",
      RemNote: "sticky-note",
      Anki: "graduation-cap",
      Todoist: "check",
      "Things 3": "check",
      OmniFocus: "focus",

      // More Code Quality Tools
      SonarQube: "code",
      CodeClimate: "chart-line",
      Codacy: "code",
      DeepCode: "code",
      Snyk: "shield-alt",
      WhiteSource: "shield-alt",

      // More Package Managers
      npm: "node-js fab",
      yarn: "yarn fab",
      pnpm: "package",
      pip: "python fab",
      conda: "python fab",
      composer: "php fab",
      gradle: "cube",
      maven: "cube",

      // More Build Tools
      Webpack: "cube",
      Rollup: "cube",
      Parcel: "package",
      Vite: "lightning-bolt",
      Turbo: "rocket",
      esbuild: "rocket",
      SWC: "rocket",

      // More Linters & Formatters
      ESLint: "check",
      Prettier: "magic",
      TSLint: "check",
      StyleLint: "palette",
      JSHint: "exclamation-triangle",
      JSLint: "exclamation-triangle",
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
      content.includes("node") ||
      content.includes("typescript")
    ) {
      return "JavaScript";
    } else if (
      content.includes("python") ||
      content.includes("django") ||
      content.includes("flask") ||
      content.includes("pytorch") ||
      content.includes("tensorflow")
    ) {
      return "Python";
    } else if (
      content.includes("react") ||
      content.includes("vue") ||
      content.includes("angular") ||
      content.includes("frontend") ||
      content.includes("component")
    ) {
      return "React";
    } else if (
      (content.includes("java") && !content.includes("javascript")) ||
      content.includes("spring") ||
      content.includes("jvm")
    ) {
      return "java";
    } else if (
      content.includes("database") ||
      content.includes("sql") ||
      content.includes("mongodb") ||
      content.includes("mysql") ||
      content.includes("postgresql")
    ) {
      return "Database";
    } else if (
      content.includes("security") ||
      content.includes("vulnerability") ||
      content.includes("auth") ||
      content.includes("encryption") ||
      content.includes("cybersecurity")
    ) {
      return "Security";
    } else if (
      content.includes("cloud") ||
      content.includes("aws") ||
      content.includes("azure") ||
      content.includes("gcp") ||
      content.includes("serverless")
    ) {
      return "Cloud";
    } else if (
      content.includes("ai") ||
      content.includes("machine learning") ||
      content.includes("ml ") ||
      content.includes("artificial intelligence") ||
      content.includes("neural network")
    ) {
      return "AI/ML";
    } else if (
      content.includes("tutorial") ||
      content.includes("how to") ||
      content.includes("guide") ||
      content.includes("learn") ||
      content.includes("course")
    ) {
      return "Tutorial";
    } else if (
      content.includes("ui") ||
      content.includes("ux") ||
      content.includes("design") ||
      content.includes("user experience") ||
      content.includes("interface")
    ) {
      return "UI/UX";
    } else if (
      content.includes("mobile") ||
      content.includes("ios") ||
      content.includes("android") ||
      content.includes("react native") ||
      content.includes("flutter")
    ) {
      return "Mobile";
    } else if (
      content.includes("devops") ||
      content.includes("deployment") ||
      content.includes("ci/cd") ||
      content.includes("docker") ||
      content.includes("kubernetes")
    ) {
      return "DevOps";
    } else if (
      content.includes("programming") ||
      content.includes("coding") ||
      content.includes("software") ||
      content.includes("algorithm") ||
      content.includes("data structure")
    ) {
      return "Programming";
    } else if (
      content.includes("web") ||
      content.includes("html") ||
      content.includes("css") ||
      content.includes("frontend") ||
      content.includes("backend")
    ) {
      return "Web Development";
    } else if (
      content.includes("business") ||
      content.includes("management") ||
      content.includes("strategy") ||
      content.includes("leadership")
    ) {
      return "Business";
    } else if (
      content.includes("community") ||
      content.includes("culture") ||
      content.includes("social") ||
      content.includes("collaboration")
    ) {
      return "Community";
    } else if (
      content.includes("data") ||
      content.includes("analytics") ||
      content.includes("visualization") ||
      content.includes("statistics")
    ) {
      return "data";
    } else if (content.includes("firefox") || content.includes("mozilla")) {
      return "Firefox";
    } else if (
      content.includes("podcast") ||
      content.includes("audio") ||
      content.includes("interview")
    ) {
      return "podcast";
    } else if (
      content.includes("career") ||
      content.includes("job") ||
      content.includes("interview") ||
      content.includes("professional")
    ) {
      return "Career";
    } else if (
      content.includes("news") ||
      content.includes("announcement") ||
      content.includes("update")
    ) {
      return "News";
    } else if (
      content.includes("opinion") ||
      content.includes("thoughts") ||
      content.includes("perspective")
    ) {
      return "Opinion";
    } else if (
      content.includes("review") ||
      content.includes("analysis") ||
      content.includes("comparison")
    ) {
      return "Review";
    } else if (
      content.includes("stack overflow") ||
      content.includes("stackoverflow")
    ) {
      return "se-stackoverflow";
    } else if (
      content.includes("prototype") ||
      content.includes("rapid") ||
      content.includes("mvp")
    ) {
      return "rapid-prototyping";
    } else if (
      content.includes("knowledge") ||
      content.includes("documentation") ||
      content.includes("wiki")
    ) {
      return "knowledge-management";
    } else if (
      content.includes("law") ||
      content.includes("legal") ||
      content.includes("policy") ||
      content.includes("regulation")
    ) {
      return "Internet Policy";
    } else if (
      content.includes("essay") ||
      content.includes("opinion") ||
      content.includes("thought")
    ) {
      return "Essays";
    } else if (
      content.includes("admin") ||
      content.includes("administration") ||
      content.includes("management")
    ) {
      return "Administrative";
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
      const maxArticlesPerSource = 30; // Maximum articles per RSS source
      const maxTotalArticles = 60; // Maximum total articles

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

  setupShowMoreCategories() {
    const showMoreBtn = document.getElementById("showMoreCategories");
    const filterContainer = document.getElementById("rssFilterButtons");

    if (showMoreBtn && filterContainer) {
      showMoreBtn.addEventListener("click", () => {
        const isExpanded = filterContainer.classList.contains("show-all");

        if (isExpanded) {
          // Collapse categories
          filterContainer.classList.remove("show-all");
          showMoreBtn.classList.remove("expanded");
          showMoreBtn.querySelector("span").textContent = "Show More";
        } else {
          // Expand categories
          filterContainer.classList.add("show-all");
          showMoreBtn.classList.add("expanded");
          showMoreBtn.querySelector("span").textContent = "Show Less";
        }
      });
    }
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
