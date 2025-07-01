// Web Tools Functionality
class WebTools {
  constructor() {
    console.log("WebTools constructor called");
    this.modal = document.getElementById("toolModal");
    this.modalTitle = document.getElementById("toolModalTitle");
    this.modalBody = document.getElementById("toolModalBody");
    this.closeBtn = document.getElementById("closeModal");

    console.log("Modal elements:", {
      modal: this.modal,
      modalTitle: this.modalTitle,
      modalBody: this.modalBody,
      closeBtn: this.closeBtn,
    });

    this.init();
  }

  init() {
    console.log("WebTools init called");
    // Add event listeners for tool cards
    const toolCards = document.querySelectorAll(".tool-card");
    console.log("Found tool cards:", toolCards.length);

    toolCards.forEach((card, index) => {
      console.log(`Tool card ${index}:`, card.getAttribute("data-tool"));
      card.addEventListener("click", (e) => {
        const toolType = card.getAttribute("data-tool");
        console.log("Tool clicked:", toolType);
        this.openTool(toolType);
      });
    });

    // Close modal event listeners
    if (this.closeBtn) {
      this.closeBtn.addEventListener("click", () => this.closeModal());
    }

    if (this.modal) {
      this.modal.addEventListener("click", (e) => {
        if (e.target === this.modal) this.closeModal();
      });
    }

    // ESC key to close modal
    document.addEventListener("keydown", (e) => {
      if (
        e.key === "Escape" &&
        this.modal &&
        this.modal.classList.contains("show")
      ) {
        this.closeModal();
      }
    });
  }

  openTool(toolType) {
    console.log("openTool called with:", toolType);
    const tools = {
      gradient: {
        title: "CSS Gradient Generator",
        content: this.createGradientGenerator(),
      },
      "border-radius": {
        title: "Border Radius Generator",
        content: this.createBorderRadiusGenerator(),
      },
      "box-shadow": {
        title: "Box Shadow Generator",
        content: this.createBoxShadowGenerator(),
      },
      "file-compressor": {
        title: "Image Size Reducer",
        content: this.createFileCompressor(),
      },
      "css-units": {
        title: "CSS Units Converter",
        content: this.createCSSUnitsConverter(),
      },
      "json-editor": {
        title: "JSON Editor",
        content: this.createJSONEditor(),
      },
      "qr-generator": {
        title: "QR Code Generator",
        content: this.createQRGenerator(),
      },
      "color-palette": {
        title: "Color Palette Generator",
        content: this.createColorPaletteGenerator(),
      },
      "filter-generator": {
        title: "Filter Generator",
        content: this.createFilterGenerator(),
      },
      "grid-generator": {
        title: "Grid Generator",
        content: this.createGridGenerator(),
      },
      "base64-encoder": {
        title: "Base64 Encoder/Decoder",
        content: this.createBase64Encoder(),
      },
      "scss-converter": {
        title: "SCSS ↔ CSS Converter",
        content: this.createSCSSConverter(),
      },
      "glass-effect": {
        title: "Glass Effect Generator",
        content: this.createGlassEffectGenerator(),
      },
    };

    const tool = tools[toolType];
    console.log("Tool found:", tool);
    if (tool) {
      if (this.modalTitle) this.modalTitle.textContent = tool.title;
      if (this.modalBody) this.modalBody.innerHTML = tool.content;
      if (this.modal) this.modal.classList.add("show");
      document.body.style.overflow = "hidden";

      // Initialize tool-specific functionality
      this.initToolFunctionality(toolType);
    } else {
      console.error("Tool not found:", toolType);
    }
  }

  closeModal() {
    console.log("closeModal called");
    if (this.modal) this.modal.classList.remove("show");
    document.body.style.overflow = "auto";
  }

  createGradientGenerator() {
    return `
      <div class="gradient-generator">
        <div class="gradient-controls">
          <div class="control-group">
            <label for="gradientType">Gradient Type</label>
            <select id="gradientType">
              <option value="linear">Linear Gradient</option>
              <option value="radial">Radial Gradient</option>
            </select>
          </div>
          
          <div class="control-group">
            <label for="gradientDirection">Direction (deg)</label>
            <input type="range" id="gradientDirection" min="0" max="360" value="45">
            <span id="directionValue">45°</span>
          </div>
          
          <div class="control-group">
            <label for="color1">Color 1</label>
            <input type="color" id="color1" value="#007aff">
          </div>
          
          <div class="control-group">
            <label for="color2">Color 2</label>
            <input type="color" id="color2" value="#4ba1fc">
          </div>
          
          <div class="control-group">
            <label for="color1Stop">Color 1 Stop (%)</label>
            <input type="range" id="color1Stop" min="0" max="100" value="0">
            <span id="stop1Value">0%</span>
          </div>
          
          <div class="control-group">
            <label for="color2Stop">Color 2 Stop (%)</label>
            <input type="range" id="color2Stop" min="0" max="100" value="100">
            <span id="stop2Value">100%</span>
          </div>
        </div>
        
        <div>
          <div class="gradient-preview" id="gradientPreview"></div>
          <div class="gradient-output">
            <label>CSS Code:</label>
            <textarea id="gradientCSS" readonly></textarea>
            <button class="copy-btn" onclick="webTools.copyToClipboard('gradientCSS')">Copy CSS</button>
          </div>
        </div>
      </div>
    `;
  }

  createBorderRadiusGenerator() {
    return `
      <div class="border-radius-generator">
        <div class="gradient-controls">
          <div class="border-controls">
            <div class="control-group">
              <label for="topLeft">Top Left</label>
              <input type="range" id="topLeft" min="0" max="100" value="0">
              <span id="topLeftValue">0px</span>
            </div>
            
            <div class="control-group">
              <label for="topRight">Top Right</label>
              <input type="range" id="topRight" min="0" max="100" value="0">
              <span id="topRightValue">0px</span>
            </div>
            
            <div class="control-group">
              <label for="bottomLeft">Bottom Left</label>
              <input type="range" id="bottomLeft" min="0" max="100" value="0">
              <span id="bottomLeftValue">0px</span>
            </div>
            
            <div class="control-group">
              <label for="bottomRight">Bottom Right</label>
              <input type="range" id="bottomRight" min="0" max="100" value="0">
              <span id="bottomRightValue">0px</span>
            </div>
          </div>
          
          <div class="control-group">
            <button class="copy-btn" style="width: 100%;" onclick="webTools.resetBorderRadius()">Reset All</button>
          </div>
        </div>
        
        <div>
          <div class="border-preview" id="borderPreview">Preview</div>
          <div class="gradient-output">
            <label>CSS Code:</label>
            <textarea id="borderRadiusCSS" readonly></textarea>
            <button class="copy-btn" onclick="webTools.copyToClipboard('borderRadiusCSS')">Copy CSS</button>
          </div>
        </div>
      </div>
    `;
  }

  createBoxShadowGenerator() {
    return `
      <div class="shadow-generator">
        <div class="gradient-controls">
          <div class="control-group">
            <label for="shadowX">Horizontal Offset</label>
            <input type="range" id="shadowX" min="-50" max="50" value="0">
            <span id="shadowXValue">0px</span>
          </div>
          
          <div class="control-group">
            <label for="shadowY">Vertical Offset</label>
            <input type="range" id="shadowY" min="-50" max="50" value="4">
            <span id="shadowYValue">4px</span>
          </div>
          
          <div class="control-group">
            <label for="shadowBlur">Blur Radius</label>
            <input type="range" id="shadowBlur" min="0" max="100" value="20">
            <span id="shadowBlurValue">20px</span>
          </div>
          
          <div class="control-group">
            <label for="shadowSpread">Spread Radius</label>
            <input type="range" id="shadowSpread" min="-50" max="50" value="0">
            <span id="shadowSpreadValue">0px</span>
          </div>
          
          <div class="control-group">
            <label for="shadowColor">Shadow Color</label>
            <input type="color" id="shadowColor" value="#000000">
          </div>
          
          <div class="control-group">
            <label for="shadowOpacity">Opacity</label>
            <input type="range" id="shadowOpacity" min="0" max="100" value="20">
            <span id="shadowOpacityValue">0.2</span>
          </div>
          
          <div class="control-group">
            <label>
              <input type="checkbox" id="shadowInset"> Inset Shadow
            </label>
          </div>
        </div>
        
        <div>
          <div class="shadow-preview" id="shadowPreview">Preview</div>
          <div class="gradient-output">
            <label>CSS Code:</label>
            <textarea id="shadowCSS" readonly></textarea>
            <button class="copy-btn" onclick="webTools.copyToClipboard('shadowCSS')">Copy CSS</button>
          </div>
        </div>
      </div>
    `;
  }

  createFileCompressor() {
    return `
      <div class="file-compressor">
        <div class="upload-area" id="uploadArea">
          <div class="upload-icon">
            <i class="fas fa-cloud-upload-alt"></i>
          </div>
          <div class="upload-text">Drop your image here or click to browse</div>
          <div class="upload-subtext">Supports JPG, PNG, WebP (Max 10MB)</div>
          <input type="file" id="fileInput" class="file-input" accept="image/*">
        </div>
        
        <div class="compression-result" id="compressionResult">
          <div class="file-info">
            <div class="file-stat">
              <div class="stat-value" id="originalSize">0 KB</div>
              <div class="stat-label">Original Size</div>
            </div>
            <div class="file-stat">
              <div class="stat-value" id="compressedSize">0 KB</div>
              <div class="stat-label">Compressed Size</div>
            </div>
          </div>
          
          <div class="file-stat" style="margin-bottom: 20px;">
            <div class="stat-value" id="compressionRatio" style="color: #34c759;">0%</div>
            <div class="stat-label">Size Reduction</div>
          </div>
          
          <button class="download-btn" id="downloadBtn">
            <i class="fas fa-download"></i> Download Compressed Image
          </button>
        </div>
      </div>
    `;
  }

  createCSSUnitsConverter() {
    return `
      <div class="units-converter">
        <div class="unit-input-group">
          <h3>Input Value</h3>
          <div class="unit-input-row">
            <input type="number" id="inputValue" class="unit-input" value="16" step="0.1">
            <select id="inputUnit" class="unit-select">
              <option value="px">px</option>
              <option value="rem">rem</option>
              <option value="em">em</option>
              <option value="vh">vh</option>
              <option value="vw">vw</option>
              <option value="pt">pt</option>
              <option value="pc">pc</option>
              <option value="in">in</option>
              <option value="cm">cm</option>
              <option value="mm">mm</option>
              <option value="%">%</option>
            </select>
          </div>
          <div class="control-group">
            <label for="baseSize">Base Font Size (for rem/em)</label>
            <input type="number" id="baseSize" class="unit-input" value="16" step="0.1">
          </div>
          <div class="control-group">
            <label for="viewportWidth">Viewport Width (for vw/vh)</label>
            <input type="number" id="viewportWidth" class="unit-input" value="1920" step="1">
          </div>
          <div class="control-group">
            <label for="viewportHeight">Viewport Height (for vw/vh)</label>
            <input type="number" id="viewportHeight" class="unit-input" value="1080" step="1">
          </div>
        </div>
        
        <div class="unit-input-group">
          <h3>Converted Values</h3>
          <div id="conversionResults"></div>
        </div>
      </div>
    `;
  }

  createJSONEditor() {
    return `
      <div class="json-editor">
        <div class="json-input-section">
          <h3>Input JSON</h3>
          <textarea id="jsonInput" class="json-textarea" placeholder="Paste your JSON here..."></textarea>
          <div class="json-actions">
            <button class="json-btn primary" onclick="webTools.formatJSON()">Format</button>
            <button class="json-btn secondary" onclick="webTools.minifyJSON()">Minify</button>
            <button class="json-btn secondary" onclick="webTools.validateJSON()">Validate</button>
            <button class="json-btn secondary" onclick="webTools.clearJSON()">Clear</button>
          </div>
        </div>
        
        <div class="json-output-section">
          <h3>Output</h3>
          <textarea id="jsonOutput" class="json-textarea" readonly></textarea>
          <div class="json-actions">
            <button class="json-btn primary" onclick="webTools.copyJSON()">Copy Output</button>
          </div>
          <div id="jsonValidation" style="margin-top: 10px; padding: 10px; border-radius: 5px; display: none;"></div>
        </div>
      </div>
    `;
  }

  createQRGenerator() {
    return `
      <div class="qr-generator">
        <div class="qr-input-section">
          <div class="control-group">
            <label for="qrText">Text or URL</label>
            <textarea id="qrText" class="qr-text-input" placeholder="Enter text, URL, or any data to generate QR code..."></textarea>
          </div>
          
          <div class="qr-size-control">
            <label for="qrSize">Size:</label>
            <input type="range" id="qrSize" min="100" max="500" value="200" step="50">
            <span id="qrSizeValue">200px</span>
          </div>
          
          <div class="control-group">
            <button class="copy-btn" onclick="webTools.generateQR()" style="width: 100%;">Generate QR Code</button>
          </div>
        </div>
        
        <div class="qr-output-section">
          <div class="qr-canvas-container">
            <canvas id="qrCanvas"></canvas>
          </div>
          <button class="copy-btn" onclick="webTools.downloadQR()" id="downloadQRBtn" style="display: none;">Download QR Code</button>
        </div>
      </div>
    `;
  }

  createColorPaletteGenerator() {
    return `
      <div class="palette-generator">
        <div class="palette-controls">
          <div class="control-group">
            <label>Palette Type</label>
            <div class="palette-type-selector">
              <button class="palette-type-btn active" data-type="complementary">Complementary</button>
              <button class="palette-type-btn" data-type="analogous">Analogous</button>
              <button class="palette-type-btn" data-type="triadic">Triadic</button>
              <button class="palette-type-btn" data-type="monochromatic">Monochromatic</button>
            </div>
          </div>
          
          <div class="base-color-control">
            <label for="baseColor">Base Color:</label>
            <input type="color" id="baseColor" value="#007aff">
          </div>
          
          <button class="copy-btn" onclick="webTools.generatePalette()" style="width: 100%;">Generate Palette</button>
        </div>
        
        <div class="palette-output">
          <div class="color-swatches" id="colorSwatches"></div>
          <div class="palette-codes">
            <h4>Color Codes</h4>
            <textarea id="paletteCodesOutput" readonly></textarea>
            <button class="copy-btn" onclick="webTools.copyPaletteCodes()">Copy All Codes</button>
          </div>
        </div>
      </div>
    `;
  }

  createFilterGenerator() {
    return `
      <div class="filter-generator">
        <div class="filter-controls">
          <div class="filter-control">
            <label for="brightness">Brightness</label>
            <input type="range" id="brightness" class="filter-slider" min="0" max="200" value="100">
            <span class="filter-value" id="brightnessValue">100%</span>
          </div>
          
          <div class="filter-control">
            <label for="contrast">Contrast</label>
            <input type="range" id="contrast" class="filter-slider" min="0" max="200" value="100">
            <span class="filter-value" id="contrastValue">100%</span>
          </div>
          
          <div class="filter-control">
            <label for="saturation">Saturation</label>
            <input type="range" id="saturation" class="filter-slider" min="0" max="200" value="100">
            <span class="filter-value" id="saturationValue">100%</span>
          </div>
          
          <div class="filter-control">
            <label for="hue">Hue Rotate</label>
            <input type="range" id="hue" class="filter-slider" min="0" max="360" value="0">
            <span class="filter-value" id="hueValue">0deg</span>
          </div>
          
          <div class="filter-control">
            <label for="blur">Blur</label>
            <input type="range" id="blur" class="filter-slider" min="0" max="10" value="0" step="0.1">
            <span class="filter-value" id="blurValue">0px</span>
          </div>
          
          <div class="filter-control">
            <label for="grayscale">Grayscale</label>
            <input type="range" id="grayscale" class="filter-slider" min="0" max="100" value="0">
            <span class="filter-value" id="grayscaleValue">0%</span>
          </div>
          
          <div class="filter-control">
            <label for="sepia">Sepia</label>
            <input type="range" id="sepia" class="filter-slider" min="0" max="100" value="0">
            <span class="filter-value" id="sepiaValue">0%</span>
          </div>
          
          <button class="filter-upload-btn" onclick="document.getElementById('filterUpload').click()">Upload Image</button>
          <input type="file" id="filterUpload" class="filter-upload" accept="image/*">
          
          <div class="gradient-output">
            <label>CSS Filter Code:</label>
            <textarea id="filterCSS" readonly></textarea>
            <button class="copy-btn" onclick="webTools.copyToClipboard('filterCSS')">Copy CSS</button>
          </div>
        </div>
        
        <div class="filter-preview">
          <div class="filter-image-container">
            <img id="filterPreviewImage" class="filter-preview-image" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200'%3E%3Crect width='100%25' height='100%25' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23999'%3EUpload an image or use this placeholder%3C/text%3E%3C/svg%3E" alt="Filter Preview">
          </div>
        </div>
      </div>
    `;
  }

  createGridGenerator() {
    return `
      <div class="grid-generator">
        <div class="grid-controls">
          <div class="grid-control-group">
            <label>Grid Template Columns</label>
            <div class="grid-control-row">
              <input type="number" id="gridCols" min="1" max="12" value="3" class="unit-input">
              <select id="gridColUnit" class="unit-select">
                <option value="fr">fr</option>
                <option value="px">px</option>
                <option value="auto">auto</option>
                <option value="minmax">minmax</option>
              </select>
            </div>
          </div>
          
          <div class="grid-control-group">
            <label>Grid Template Rows</label>
            <div class="grid-control-row">
              <input type="number" id="gridRows" min="1" max="12" value="3" class="unit-input">
              <select id="gridRowUnit" class="unit-select">
                <option value="fr">fr</option>
                <option value="px">px</option>
                <option value="auto">auto</option>
                <option value="minmax">minmax</option>
              </select>
            </div>
          </div>
          
          <div class="grid-control-group">
            <label for="gridGap">Gap</label>
            <div class="grid-control-row">
              <input type="number" id="gridGap" min="0" max="50" value="10" class="unit-input">
              <select id="gridGapUnit" class="unit-select">
                <option value="px">px</option>
                <option value="rem">rem</option>
                <option value="em">em</option>
              </select>
            </div>
          </div>
          
          <div class="grid-control-group">
            <label for="justifyItems">Justify Items</label>
            <select id="justifyItems" class="unit-select" style="width: 100%;">
              <option value="stretch">stretch</option>
              <option value="start">start</option>
              <option value="end">end</option>
              <option value="center">center</option>
            </select>
          </div>
          
          <div class="grid-control-group">
            <label for="alignItems">Align Items</label>
            <select id="alignItems" class="unit-select" style="width: 100%;">
              <option value="stretch">stretch</option>
              <option value="start">start</option>
              <option value="end">end</option>
              <option value="center">center</option>
            </select>
          </div>
        </div>
        
        <div class="grid-preview">
          <div class="grid-visual" id="gridVisual"></div>
          <div class="grid-code">
            <h4>CSS Grid Code</h4>
            <pre id="gridCSS"></pre>
            <button class="copy-btn" onclick="webTools.copyGridCSS()">Copy CSS</button>
          </div>
        </div>
      </div>
    `;
  }

  createBase64Encoder() {
    return `
      <div class="base64-encoder">
        <div class="base64-input-section">
          <h3>Text Input</h3>
          <textarea id="textInput" class="base64-textarea" placeholder="Enter text to encode or Base64 to decode..."></textarea>
          <div class="base64-actions">
            <button class="base64-btn primary" onclick="webTools.encodeToBase64()">Encode to Base64</button>
            <button class="base64-btn secondary" onclick="webTools.decodeFromBase64()">Decode from Base64</button>
            <button class="base64-btn secondary" onclick="webTools.clearBase64()">Clear</button>
          </div>
        </div>
        
        <div class="base64-output-section">
          <h3>Output</h3>
          <textarea id="base64Output" class="base64-textarea" readonly></textarea>
          <div class="base64-actions">
            <button class="base64-btn primary" onclick="webTools.copyBase64Output()">Copy Output</button>
          </div>
          <div id="base64Status" style="margin-top: 10px; padding: 10px; border-radius: 5px; display: none;"></div>
        </div>
        
        <div class="base64-info">
          <h4>About Base64 Encoding</h4>
          <p>Base64 is a encoding scheme that converts binary data into text format. It's commonly used for:</p>
          <ul>
            <li>Embedding images in HTML/CSS</li>
            <li>Data transmission over protocols that only support text</li>
            <li>Storing binary data in text-based formats like JSON or XML</li>
            <li>URL-safe data encoding</li>
          </ul>
        </div>
      </div>
    `;
  }

  createSCSSConverter() {
    return `
      <div class="scss-converter">
        <div class="scss-input-section">
          <h3>Input Code</h3>
          <div class="format-selector">
            <button class="format-btn active" id="inputFormatCSS" onclick="webTools.setInputFormat('css')">CSS Input</button>
            <button class="format-btn" id="inputFormatSCSS" onclick="webTools.setInputFormat('scss')">SCSS Input</button>
          </div>
          <textarea id="scssInput" class="scss-textarea" placeholder="Paste your CSS or SCSS code here..."></textarea>
          <div class="scss-actions">
            <button class="scss-btn primary" onclick="webTools.convertToSCSS()" id="convertToSCSSBtn">Convert to SCSS</button>
            <button class="scss-btn primary" onclick="webTools.convertToCSS()" id="convertToCSSBtn" style="display: none;">Convert to CSS</button>
            <button class="scss-btn secondary" onclick="webTools.clearSCSS()">Clear</button>
          </div>
        </div>
        
        <div class="scss-output-section">
          <h3>Output</h3>
          <div class="output-format-info">
            <span id="outputFormatLabel">SCSS Output</span>
          </div>
          <textarea id="scssOutput" class="scss-textarea" readonly></textarea>
          <div class="scss-actions">
            <button class="scss-btn primary" onclick="webTools.copySCSSOutput()">Copy Output</button>
            <button class="scss-btn secondary" onclick="webTools.downloadSCSS()">Download File</button>
          </div>
          <div id="scssStatus" style="margin-top: 10px; padding: 10px; border-radius: 5px; display: none;"></div>
        </div>
        
        <div class="scss-info">
          <h4>About SCSS/CSS Conversion</h4>
          <p>This tool helps you convert between SCSS (Sass) and CSS formats:</p>
          <ul>
            <li><strong>CSS to SCSS:</strong> Converts regular CSS to nested SCSS format</li>
            <li><strong>SCSS to CSS:</strong> Compiles SCSS with nesting to standard CSS</li>
            <li><strong>Automatic Detection:</strong> Smart detection of input format</li>
            <li><strong>Syntax Highlighting:</strong> Easy to read formatted output</li>
          </ul>
        </div>
      </div>
    `;
  }

  initToolFunctionality(toolType) {
    switch (toolType) {
      case "gradient":
        this.initGradientGenerator();
        break;
      case "border-radius":
        this.initBorderRadiusGenerator();
        break;
      case "box-shadow":
        this.initBoxShadowGenerator();
        break;
      case "file-compressor":
        this.initFileCompressor();
        break;
      case "css-units":
        this.initCSSUnitsConverter();
        break;
      case "json-editor":
        this.initJSONEditor();
        break;
      case "qr-generator":
        this.initQRGenerator();
        break;
      case "color-palette":
        this.initColorPaletteGenerator();
        break;
      case "filter-generator":
        this.initFilterGenerator();
        break;
      case "grid-generator":
        this.initGridGenerator();
        break;
      case "base64-encoder":
        this.initBase64Encoder();
        break;
      case "scss-converter":
        this.initSCSSConverter();
        break;
      case "glass-effect":
        this.initGlassEffectGenerator();
        break;
    }
  }

  initGradientGenerator() {
    const updateGradient = () => {
      const type = document.getElementById("gradientType").value;
      const direction = document.getElementById("gradientDirection").value;
      const color1 = document.getElementById("color1").value;
      const color2 = document.getElementById("color2").value;
      const stop1 = document.getElementById("color1Stop").value;
      const stop2 = document.getElementById("color2Stop").value;

      let gradient;
      if (type === "linear") {
        gradient = `linear-gradient(${direction}deg, ${color1} ${stop1}%, ${color2} ${stop2}%)`;
      } else {
        gradient = `radial-gradient(circle, ${color1} ${stop1}%, ${color2} ${stop2}%)`;
      }

      document.getElementById("gradientPreview").style.background = gradient;
      document.getElementById("gradientCSS").value = `background: ${gradient};`;

      // Update value displays
      document.getElementById("directionValue").textContent = direction + "°";
      document.getElementById("stop1Value").textContent = stop1 + "%";
      document.getElementById("stop2Value").textContent = stop2 + "%";
    };

    // Add event listeners
    [
      "gradientType",
      "gradientDirection",
      "color1",
      "color2",
      "color1Stop",
      "color2Stop",
    ].forEach((id) => {
      document.getElementById(id).addEventListener("input", updateGradient);
    });

    updateGradient();
  }

  initBorderRadiusGenerator() {
    const updateBorderRadius = () => {
      const topLeft = document.getElementById("topLeft").value;
      const topRight = document.getElementById("topRight").value;
      const bottomLeft = document.getElementById("bottomLeft").value;
      const bottomRight = document.getElementById("bottomRight").value;

      const borderRadius = `${topLeft}px ${topRight}px ${bottomRight}px ${bottomLeft}px`;

      document.getElementById("borderPreview").style.borderRadius =
        borderRadius;
      document.getElementById(
        "borderRadiusCSS"
      ).value = `border-radius: ${borderRadius};`;

      // Update value displays
      document.getElementById("topLeftValue").textContent = topLeft + "px";
      document.getElementById("topRightValue").textContent = topRight + "px";
      document.getElementById("bottomLeftValue").textContent =
        bottomLeft + "px";
      document.getElementById("bottomRightValue").textContent =
        bottomRight + "px";
    };

    ["topLeft", "topRight", "bottomLeft", "bottomRight"].forEach((id) => {
      document.getElementById(id).addEventListener("input", updateBorderRadius);
    });

    updateBorderRadius();
  }

  resetBorderRadius() {
    ["topLeft", "topRight", "bottomLeft", "bottomRight"].forEach((id) => {
      document.getElementById(id).value = 0;
    });

    if (document.getElementById("topLeft")) {
      const event = new Event("input");
      document.getElementById("topLeft").dispatchEvent(event);
    }
  }

  initBoxShadowGenerator() {
    const updateShadow = () => {
      const x = document.getElementById("shadowX").value;
      const y = document.getElementById("shadowY").value;
      const blur = document.getElementById("shadowBlur").value;
      const spread = document.getElementById("shadowSpread").value;
      const color = document.getElementById("shadowColor").value;
      const opacity = document.getElementById("shadowOpacity").value / 100;
      const inset = document.getElementById("shadowInset").checked;

      // Convert hex to rgba
      const r = parseInt(color.substr(1, 2), 16);
      const g = parseInt(color.substr(3, 2), 16);
      const b = parseInt(color.substr(5, 2), 16);

      const rgbaColor = `rgba(${r}, ${g}, ${b}, ${opacity})`;
      const insetText = inset ? "inset " : "";
      const boxShadow = `${insetText}${x}px ${y}px ${blur}px ${spread}px ${rgbaColor}`;

      document.getElementById("shadowPreview").style.boxShadow = boxShadow;
      document.getElementById("shadowCSS").value = `box-shadow: ${boxShadow};`;

      // Update value displays
      document.getElementById("shadowXValue").textContent = x + "px";
      document.getElementById("shadowYValue").textContent = y + "px";
      document.getElementById("shadowBlurValue").textContent = blur + "px";
      document.getElementById("shadowSpreadValue").textContent = spread + "px";
      document.getElementById("shadowOpacityValue").textContent =
        opacity.toFixed(1);
    };

    [
      "shadowX",
      "shadowY",
      "shadowBlur",
      "shadowSpread",
      "shadowColor",
      "shadowOpacity",
      "shadowInset",
    ].forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        element.addEventListener("input", updateShadow);
        element.addEventListener("change", updateShadow);
      }
    });

    updateShadow();
  }

  initFileCompressor() {
    const uploadArea = document.getElementById("uploadArea");
    const fileInput = document.getElementById("fileInput");
    const compressionResult = document.getElementById("compressionResult");

    // Click to upload
    uploadArea.addEventListener("click", () => {
      fileInput.click();
    });

    // Drag and drop
    uploadArea.addEventListener("dragover", (e) => {
      e.preventDefault();
      uploadArea.classList.add("dragover");
    });

    uploadArea.addEventListener("dragleave", () => {
      uploadArea.classList.remove("dragover");
    });

    uploadArea.addEventListener("drop", (e) => {
      e.preventDefault();
      uploadArea.classList.remove("dragover");
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        this.handleFileUpload(files[0]);
      }
    });

    fileInput.addEventListener("change", (e) => {
      if (e.target.files.length > 0) {
        this.handleFileUpload(e.target.files[0]);
      }
    });
  }

  handleFileUpload(file) {
    // Validate file
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      // 10MB
      alert("File size must be less than 10MB");
      return;
    }

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      // Calculate new dimensions (compress to 80% quality)
      const maxWidth = 1920;
      const maxHeight = 1080;
      let { width, height } = img;

      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width *= ratio;
        height *= ratio;
      }

      canvas.width = width;
      canvas.height = height;

      // Draw and compress
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          const originalSize = file.size;
          const compressedSize = blob.size;
          const reduction = Math.round(
            ((originalSize - compressedSize) / originalSize) * 100
          );

          // Update UI
          document.getElementById("originalSize").textContent =
            this.formatFileSize(originalSize);
          document.getElementById("compressedSize").textContent =
            this.formatFileSize(compressedSize);
          document.getElementById("compressionRatio").textContent =
            reduction + "%";

          // Store compressed blob for download
          this.compressedBlob = blob;
          this.originalFileName = file.name;

          document.getElementById("compressionResult").style.display = "block";

          // Setup download
          document.getElementById("downloadBtn").onclick = () => {
            this.downloadCompressedFile();
          };
        },
        "image/jpeg",
        0.8
      );
    };

    img.src = URL.createObjectURL(file);
  }

  downloadCompressedFile() {
    if (this.compressedBlob) {
      const url = URL.createObjectURL(this.compressedBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download =
        "compressed_" + this.originalFileName.replace(/\.[^/.]+$/, "") + ".jpg";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  }

  formatFileSize(bytes) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }

  copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    element.select();
    document.execCommand("copy");

    // Show feedback
    const originalText = element.nextElementSibling.textContent;
    element.nextElementSibling.textContent = "Copied!";
    element.nextElementSibling.style.background = "#34c759";

    setTimeout(() => {
      element.nextElementSibling.textContent = originalText;
      element.nextElementSibling.style.background = "#007aff";
    }, 2000);
  }

  initCSSUnitsConverter() {
    const convert = () => {
      const value =
        parseFloat(document.getElementById("inputValue").value) || 0;
      const unit = document.getElementById("inputUnit").value;
      const baseSize =
        parseFloat(document.getElementById("baseSize").value) || 16;
      const vpWidth =
        parseFloat(document.getElementById("viewportWidth").value) || 1920;
      const vpHeight =
        parseFloat(document.getElementById("viewportHeight").value) || 1080;

      // Convert to pixels first
      let pxValue = value;
      switch (unit) {
        case "rem":
          pxValue = value * baseSize;
          break;
        case "em":
          pxValue = value * baseSize;
          break;
        case "vh":
          pxValue = (value * vpHeight) / 100;
          break;
        case "vw":
          pxValue = (value * vpWidth) / 100;
          break;
        case "pt":
          pxValue = value * 1.333;
          break;
        case "pc":
          pxValue = value * 16;
          break;
        case "in":
          pxValue = value * 96;
          break;
        case "cm":
          pxValue = value * 37.8;
          break;
        case "mm":
          pxValue = value * 3.78;
          break;
        case "%":
          pxValue = value;
          break;
      }

      // Convert from pixels to all units
      const results = {
        px: pxValue.toFixed(2),
        rem: (pxValue / baseSize).toFixed(4),
        em: (pxValue / baseSize).toFixed(4),
        vh: ((pxValue * 100) / vpHeight).toFixed(4),
        vw: ((pxValue * 100) / vpWidth).toFixed(4),
        pt: (pxValue / 1.333).toFixed(2),
        pc: (pxValue / 16).toFixed(4),
        in: (pxValue / 96).toFixed(4),
        cm: (pxValue / 37.8).toFixed(4),
        mm: (pxValue / 3.78).toFixed(2),
        "%": pxValue.toFixed(2),
      };

      let html = "";
      Object.entries(results).forEach(([unit, val]) => {
        html += `
          <div class="unit-input-row">
            <input type="text" class="unit-input" value="${val}" readonly>
            <span class="unit-select" style="background: #f0f0f0;">${unit}</span>
          </div>
        `;
      });

      document.getElementById("conversionResults").innerHTML = html;
    };

    [
      "inputValue",
      "inputUnit",
      "baseSize",
      "viewportWidth",
      "viewportHeight",
    ].forEach((id) => {
      document.getElementById(id).addEventListener("input", convert);
      document.getElementById(id).addEventListener("change", convert);
    });

    convert(); // Initial conversion
  }

  initJSONEditor() {
    // Auto-format on input
    document.getElementById("jsonInput").addEventListener("input", () => {
      this.validateJSON();
    });
  }

  formatJSON() {
    const input = document.getElementById("jsonInput").value;
    const output = document.getElementById("jsonOutput");

    try {
      const parsed = JSON.parse(input);
      output.value = JSON.stringify(parsed, null, 2);
      this.showValidation("Valid JSON formatted successfully!", "success");
    } catch (e) {
      this.showValidation("Invalid JSON: " + e.message, "error");
    }
  }

  minifyJSON() {
    const input = document.getElementById("jsonInput").value;
    const output = document.getElementById("jsonOutput");

    try {
      const parsed = JSON.parse(input);
      output.value = JSON.stringify(parsed);
      this.showValidation("JSON minified successfully!", "success");
    } catch (e) {
      this.showValidation("Invalid JSON: " + e.message, "error");
    }
  }

  validateJSON() {
    const input = document.getElementById("jsonInput").value;

    if (!input.trim()) {
      this.hideValidation();
      return;
    }

    try {
      JSON.parse(input);
      this.showValidation("✓ Valid JSON", "success");
    } catch (e) {
      this.showValidation("✗ Invalid JSON: " + e.message, "error");
    }
  }

  clearJSON() {
    document.getElementById("jsonInput").value = "";
    document.getElementById("jsonOutput").value = "";
    this.hideValidation();
  }

  copyJSON() {
    const output = document.getElementById("jsonOutput");
    output.select();
    document.execCommand("copy");
    this.showValidation("Copied to clipboard!", "success");
  }

  showValidation(message, type) {
    const validation = document.getElementById("jsonValidation");
    validation.textContent = message;
    validation.style.display = "block";
    validation.style.background = type === "success" ? "#d4edda" : "#f8d7da";
    validation.style.color = type === "success" ? "#155724" : "#721c24";
    validation.style.border =
      type === "success" ? "1px solid #c3e6cb" : "1px solid #f5c6cb";
  }

  hideValidation() {
    document.getElementById("jsonValidation").style.display = "none";
  }

  initQRGenerator() {
    document.getElementById("qrSize").addEventListener("input", (e) => {
      document.getElementById("qrSizeValue").textContent =
        e.target.value + "px";
      if (document.getElementById("qrText").value) {
        this.generateQR();
      }
    });

    document.getElementById("qrText").addEventListener("input", () => {
      if (document.getElementById("qrText").value) {
        this.generateQR();
      }
    });
  }

  generateQR() {
    const text = document.getElementById("qrText").value;
    const size = parseInt(document.getElementById("qrSize").value);
    const canvas = document.getElementById("qrCanvas");

    if (!text.trim()) {
      // Clear canvas if no text
      const ctx = canvas.getContext("2d");
      canvas.width = size;
      canvas.height = size;
      ctx.clearRect(0, 0, size, size);
      document.getElementById("downloadQRBtn").style.display = "none";
      return;
    }

    // Use QRious library to generate real QR code
    try {
      const qr = new QRious({
        element: canvas,
        value: text,
        size: size,
        background: "#ffffff",
        foreground: "#000000",
        level: "M", // Error correction level
      });

      document.getElementById("downloadQRBtn").style.display = "block";
    } catch (error) {
      console.error("QR Code generation failed:", error);
      // Fallback to simple pattern if QRious fails
      this.createQRCode(canvas, text, size);
      document.getElementById("downloadQRBtn").style.display = "block";
    }
  }

  createQRCode(canvas, text, size) {
    const ctx = canvas.getContext("2d");
    canvas.width = size;
    canvas.height = size;

    // Create QR code background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, size, size);

    ctx.fillStyle = "#000000";
    const gridSize = 21; // Standard QR code size
    const cellSize = size / gridSize;
    const margin = cellSize; // Add margin

    // Create a more realistic QR-like pattern
    const hash = this.simpleHash(text);
    const pattern = this.generateQRPattern(text, gridSize);

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        if (pattern[i][j] === 1) {
          ctx.fillRect(
            j * cellSize + margin / 2,
            i * cellSize + margin / 2,
            cellSize * 0.9,
            cellSize * 0.9
          );
        }
      }
    }
  }

  generateQRPattern(text, size) {
    const pattern = Array(size)
      .fill()
      .map(() => Array(size).fill(0));
    const hash = this.simpleHash(text);

    // Add finder patterns (corners)
    this.addFinderPattern(pattern, 0, 0);
    this.addFinderPattern(pattern, 0, size - 7);
    this.addFinderPattern(pattern, size - 7, 0);

    // Add timing patterns
    for (let i = 8; i < size - 8; i++) {
      pattern[6][i] = i % 2;
      pattern[i][6] = i % 2;
    }

    // Fill data area with pseudo-random pattern based on text
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (pattern[i][j] === 0 && !this.isReservedArea(i, j, size)) {
          const index = i * size + j;
          pattern[i][j] = (hash + index * text.length) % 2;
        }
      }
    }

    return pattern;
  }

  addFinderPattern(pattern, startRow, startCol) {
    // 7x7 finder pattern
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 7; j++) {
        if (i === 0 || i === 6 || j === 0 || j === 6) {
          pattern[startRow + i][startCol + j] = 1;
        } else if (i >= 2 && i <= 4 && j >= 2 && j <= 4) {
          pattern[startRow + i][startCol + j] = 1;
        }
      }
    }
  }

  isReservedArea(i, j, size) {
    // Finder patterns
    if (
      (i < 9 && j < 9) ||
      (i < 9 && j >= size - 8) ||
      (i >= size - 8 && j < 9)
    ) {
      return true;
    }
    // Timing patterns
    if (i === 6 || j === 6) {
      return true;
    }
    return false;
  }

  simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }

  downloadQR() {
    const canvas = document.getElementById("qrCanvas");
    const link = document.createElement("a");
    link.download = "qrcode.png";
    link.href = canvas.toDataURL();
    link.click();
  }

  initColorPaletteGenerator() {
    document.querySelectorAll(".palette-type-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        document
          .querySelectorAll(".palette-type-btn")
          .forEach((b) => b.classList.remove("active"));
        e.target.classList.add("active");
        this.generatePalette();
      });
    });

    document.getElementById("baseColor").addEventListener("input", () => {
      this.generatePalette();
    });

    this.generatePalette(); // Initial generation
  }

  generatePalette() {
    const baseColor = document.getElementById("baseColor").value;
    const type = document.querySelector(".palette-type-btn.active").dataset
      .type;
    const colors = this.createColorPalette(baseColor, type);

    this.displayPalette(colors);
  }

  createColorPalette(baseColor, type) {
    const hsl = this.hexToHsl(baseColor);
    let colors = [baseColor];

    switch (type) {
      case "complementary":
        colors.push(this.hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l));
        colors.push(this.hslToHex(hsl.h, hsl.s * 0.7, hsl.l * 1.2));
        colors.push(
          this.hslToHex((hsl.h + 180) % 360, hsl.s * 0.7, hsl.l * 1.2)
        );
        break;
      case "analogous":
        colors.push(this.hslToHex((hsl.h + 30) % 360, hsl.s, hsl.l));
        colors.push(this.hslToHex((hsl.h - 30 + 360) % 360, hsl.s, hsl.l));
        colors.push(this.hslToHex((hsl.h + 60) % 360, hsl.s, hsl.l));
        colors.push(this.hslToHex((hsl.h - 60 + 360) % 360, hsl.s, hsl.l));
        break;
      case "triadic":
        colors.push(this.hslToHex((hsl.h + 120) % 360, hsl.s, hsl.l));
        colors.push(this.hslToHex((hsl.h + 240) % 360, hsl.s, hsl.l));
        break;
      case "monochromatic":
        colors.push(this.hslToHex(hsl.h, hsl.s, Math.min(hsl.l * 1.3, 1)));
        colors.push(this.hslToHex(hsl.h, hsl.s, hsl.l * 0.7));
        colors.push(this.hslToHex(hsl.h, hsl.s * 0.5, hsl.l));
        colors.push(this.hslToHex(hsl.h, hsl.s, hsl.l * 0.4));
        break;
    }

    return colors;
  }

  displayPalette(colors) {
    const swatches = document.getElementById("colorSwatches");
    const codes = document.getElementById("paletteCodesOutput");

    swatches.innerHTML = "";
    let codeText = "";

    colors.forEach((color, index) => {
      const swatch = document.createElement("div");
      swatch.className = "color-swatch";
      swatch.style.backgroundColor = color;
      swatch.textContent = color.toUpperCase();
      swatch.onclick = () => this.copyColorToClipboard(color);
      swatches.appendChild(swatch);

      codeText += `Color ${index + 1}: ${color.toUpperCase()}\n`;
    });

    codes.value = codeText;
  }

  copyColorToClipboard(color) {
    navigator.clipboard.writeText(color);
  }

  copyPaletteCodes() {
    const codes = document.getElementById("paletteCodesOutput");
    codes.select();
    document.execCommand("copy");
  }

  hexToHsl(hex) {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h,
      s,
      l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return { h: h * 360, s, l };
  }

  hslToHex(h, s, l) {
    h = h / 360;
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    let r, g, b;
    if (s === 0) {
      r = g = b = l;
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    const toHex = (c) => {
      const hex = Math.round(c * 255).toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  initFilterGenerator() {
    const filters = [
      "brightness",
      "contrast",
      "saturation",
      "hue",
      "blur",
      "grayscale",
      "sepia",
    ];

    const updateFilter = () => {
      const image = document.getElementById("filterPreviewImage");
      const filterValues = [];

      filters.forEach((filter) => {
        const value = parseFloat(document.getElementById(filter).value);
        const valueSpan = document.getElementById(filter + "Value");

        // Skip filters that are at their default values
        let shouldInclude = false;

        switch (filter) {
          case "brightness":
          case "contrast":
          case "saturation":
            shouldInclude = value !== 100;
            filterValues.push(`${filter}(${value}%)`);
            valueSpan.textContent = value + "%";
            break;
          case "hue":
            shouldInclude = value !== 0;
            filterValues.push(`hue-rotate(${value}deg)`);
            valueSpan.textContent = value + "deg";
            break;
          case "blur":
            shouldInclude = value !== 0;
            filterValues.push(`blur(${value}px)`);
            valueSpan.textContent = value + "px";
            break;
          case "grayscale":
          case "sepia":
            shouldInclude = value !== 0;
            filterValues.push(`${filter}(${value}%)`);
            valueSpan.textContent = value + "%";
            break;
        }

        // Remove the last added filter if it shouldn't be included
        if (!shouldInclude && filterValues.length > 0) {
          filterValues.pop();
        }
      });

      const filterString = filterValues.join(" ");
      image.style.filter = filterString;
      document.getElementById("filterCSS").value = filterString
        ? `filter: ${filterString};`
        : `filter: none;`;
    };

    filters.forEach((filter) => {
      document.getElementById(filter).addEventListener("input", updateFilter);
    });

    document.getElementById("filterUpload").addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          document.getElementById("filterPreviewImage").src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    });

    updateFilter(); // Initial update
  }

  initGridGenerator() {
    const updateGrid = () => {
      const cols = document.getElementById("gridCols").value;
      const rows = document.getElementById("gridRows").value;
      const colUnit = document.getElementById("gridColUnit").value;
      const rowUnit = document.getElementById("gridRowUnit").value;
      const gap = document.getElementById("gridGap").value;
      const gapUnit = document.getElementById("gridGapUnit").value;
      const justifyItems = document.getElementById("justifyItems").value;
      const alignItems = document.getElementById("alignItems").value;

      const gridVisual = document.getElementById("gridVisual");
      const gridCSS = document.getElementById("gridCSS");

      // Generate grid template values
      let colTemplate, rowTemplate;
      if (colUnit === "minmax") {
        colTemplate = `repeat(${cols}, minmax(100px, 1fr))`;
      } else {
        colTemplate = `repeat(${cols}, 1${colUnit})`;
      }

      if (rowUnit === "minmax") {
        rowTemplate = `repeat(${rows}, minmax(100px, 1fr))`;
      } else {
        rowTemplate = `repeat(${rows}, 1${rowUnit})`;
      }

      // Update visual grid
      gridVisual.style.gridTemplateColumns = colTemplate;
      gridVisual.style.gridTemplateRows = rowTemplate;
      gridVisual.style.gap = gap + gapUnit;
      gridVisual.style.justifyItems = justifyItems;
      gridVisual.style.alignItems = alignItems;

      // Clear and populate grid items
      gridVisual.innerHTML = "";
      for (let i = 1; i <= cols * rows; i++) {
        const item = document.createElement("div");
        item.className = "grid-item";
        item.textContent = i;
        gridVisual.appendChild(item);
      }

      // Update CSS code
      const cssCode = `.grid-container {
  display: grid;
  grid-template-columns: ${colTemplate};
  grid-template-rows: ${rowTemplate};
  gap: ${gap}${gapUnit};
  justify-items: ${justifyItems};
  align-items: ${alignItems};
}`;

      gridCSS.textContent = cssCode;
    };

    [
      "gridCols",
      "gridRows",
      "gridColUnit",
      "gridRowUnit",
      "gridGap",
      "gridGapUnit",
      "justifyItems",
      "alignItems",
    ].forEach((id) => {
      document.getElementById(id).addEventListener("change", updateGrid);
      document.getElementById(id).addEventListener("input", updateGrid);
    });

    updateGrid(); // Initial update
  }

  copyGridCSS() {
    const cssCode = document.getElementById("gridCSS").textContent;
    navigator.clipboard.writeText(cssCode);
  }

  initBase64Encoder() {
    // Auto-validate on input
    document.getElementById("textInput").addEventListener("input", () => {
      this.validateBase64Input();
    });
  }

  encodeToBase64() {
    const input = document.getElementById("textInput").value;
    const output = document.getElementById("base64Output");

    if (!input.trim()) {
      this.showBase64Status("Please enter some text to encode", "error");
      return;
    }

    try {
      // Encode text to Base64
      const encoded = btoa(unescape(encodeURIComponent(input)));
      output.value = encoded;
      this.showBase64Status("Text successfully encoded to Base64!", "success");
    } catch (error) {
      this.showBase64Status("Error encoding text: " + error.message, "error");
    }
  }

  decodeFromBase64() {
    const input = document.getElementById("textInput").value;
    const output = document.getElementById("base64Output");

    if (!input.trim()) {
      this.showBase64Status("Please enter Base64 text to decode", "error");
      return;
    }

    try {
      // Validate if input looks like Base64
      if (!this.isValidBase64(input.trim())) {
        this.showBase64Status(
          "Input doesn't appear to be valid Base64",
          "error"
        );
        return;
      }

      // Decode Base64 to text
      const decoded = decodeURIComponent(escape(atob(input.trim())));
      output.value = decoded;
      this.showBase64Status("Base64 successfully decoded to text!", "success");
    } catch (error) {
      this.showBase64Status("Error decoding Base64: Invalid format", "error");
    }
  }

  isValidBase64(str) {
    // Basic Base64 validation
    const base64Regex = /^[A-Za-z0-9+\/]*={0,2}$/;
    return base64Regex.test(str) && str.length % 4 === 0;
  }

  validateBase64Input() {
    const input = document.getElementById("textInput").value;

    if (!input.trim()) {
      this.hideBase64Status();
      return;
    }

    // Check if input looks like Base64
    if (this.isValidBase64(input.trim())) {
      this.showBase64Status(
        "✓ Looks like valid Base64 - ready to decode",
        "info"
      );
    } else {
      this.showBase64Status("✓ Text input - ready to encode", "info");
    }
  }

  clearBase64() {
    document.getElementById("textInput").value = "";
    document.getElementById("base64Output").value = "";
    this.hideBase64Status();
  }

  copyBase64Output() {
    const output = document.getElementById("base64Output");
    if (!output.value.trim()) {
      this.showBase64Status("Nothing to copy - output is empty", "error");
      return;
    }

    output.select();
    document.execCommand("copy");
    this.showBase64Status("Output copied to clipboard!", "success");
  }

  showBase64Status(message, type) {
    const status = document.getElementById("base64Status");
    status.textContent = message;
    status.style.display = "block";

    // Set colors based on type
    switch (type) {
      case "success":
        status.style.background = "#d4edda";
        status.style.color = "#155724";
        status.style.border = "1px solid #c3e6cb";
        break;
      case "error":
        status.style.background = "#f8d7da";
        status.style.color = "#721c24";
        status.style.border = "1px solid #f5c6cb";
        break;
      case "info":
        status.style.background = "#d1ecf1";
        status.style.color = "#0c5460";
        status.style.border = "1px solid #bee5eb";
        break;
    }
  }

  hideBase64Status() {
    document.getElementById("base64Status").style.display = "none";
  }

  createGlassEffectGenerator() {
    return `
      <div class="glass-effect-generator">
        <div class="glass-controls">
          <div class="control-section">
            <h3>Glass Effect Controls</h3>
            
            <div class="control-group">
              <label for="glassBlur">Backdrop Blur</label>
              <div class="range-control">
                <input type="range" id="glassBlur" min="0" max="50" value="10" step="1">
                <span id="glassBlurValue">10px</span>
              </div>
            </div>
            
            <div class="control-group">
              <label for="glassOpacity">Background Opacity</label>
              <div class="range-control">
                <input type="range" id="glassOpacity" min="0" max="100" value="20" step="1">
                <span id="glassOpacityValue">0.20</span>
              </div>
            </div>
            
            <div class="control-group">
              <label for="glassBorderOpacity">Border Opacity</label>
              <div class="range-control">
                <input type="range" id="glassBorderOpacity" min="0" max="100" value="30" step="1">
                <span id="glassBorderOpacityValue">0.30</span>
              </div>
            </div>
            
            <div class="control-group">
              <label for="glassBorderRadius">Border Radius</label>
              <div class="range-control">
                <input type="range" id="glassBorderRadius" min="0" max="50" value="16" step="1">
                <span id="glassBorderRadiusValue">16px</span>
              </div>
            </div>
            
            <div class="control-group">
              <label for="glassSaturation">Saturation</label>
              <div class="range-control">
                <input type="range" id="glassSaturation" min="50" max="200" value="100" step="1">
                <span id="glassSaturationValue">100%</span>
              </div>
            </div>
            
            <div class="control-group">
              <label for="glassContrast">Contrast</label>
              <div class="range-control">
                <input type="range" id="glassContrast" min="50" max="200" value="100" step="1">
                <span id="glassContrastValue">100%</span>
              </div>
            </div>
            
            <div class="control-group">
              <label for="glassBrightness">Brightness</label>
              <div class="range-control">
                <input type="range" id="glassBrightness" min="50" max="150" value="100" step="1">
                <span id="glassBrightnessValue">100%</span>
              </div>
            </div>
          </div>
          
          <div class="control-section">
            <h3>Shadow & Border</h3>
            
            <div class="control-group">
              <label for="glassShadowX">Shadow X</label>
              <div class="range-control">
                <input type="range" id="glassShadowX" min="-50" max="50" value="0" step="1">
                <span id="glassShadowXValue">0px</span>
              </div>
            </div>
            
            <div class="control-group">
              <label for="glassShadowY">Shadow Y</label>
              <div class="range-control">
                <input type="range" id="glassShadowY" min="-50" max="50" value="8" step="1">
                <span id="glassShadowYValue">8px</span>
              </div>
            </div>
            
            <div class="control-group">
              <label for="glassShadowBlur">Shadow Blur</label>
              <div class="range-control">
                <input type="range" id="glassShadowBlur" min="0" max="100" value="32" step="1">
                <span id="glassShadowBlurValue">32px</span>
              </div>
            </div>
            
            <div class="control-group">
              <label for="glassShadowOpacity">Shadow Opacity</label>
              <div class="range-control">
                <input type="range" id="glassShadowOpacity" min="0" max="100" value="37" step="1">
                <span id="glassShadowOpacityValue">0.37</span>
              </div>
            </div>
          </div>
          
          <div class="control-section">
            <h3>Color & Style</h3>
            
            <div class="control-group">
              <label for="glassBackgroundColor">Background Color</label>
              <input type="color" id="glassBackgroundColor" value="#ffffff">
            </div>
            
            <div class="control-group">
              <label for="glassBorderColor">Border Color</label>
              <input type="color" id="glassBorderColor" value="#ffffff">
            </div>
            
            <div class="control-group">
              <label for="glassPreset">Glass Presets</label>
              <select id="glassPreset">
                <option value="custom">Custom</option>
                <option value="frosted">Frosted Glass</option>
                <option value="clear">Clear Glass</option>
                <option value="tinted">Tinted Glass</option>
                <option value="colorful">Colorful Glass</option>
                <option value="dark">Dark Glass</option>
                <option value="minimal">Minimal Glass</option>
              </select>
            </div>
          </div>
        </div>
        
        <div class="glass-preview-section">
          <h3>Preview</h3>
          <div class="glass-preview-container">
            <div class="glass-background">
              <div class="glass-element" id="glassPreview">
                <h4>Glass Effect</h4>
                <p class="shimmer">This is a preview of your glass effect. The blur and transparency create a realistic glass appearance.</p>
                <button class="glass-demo-btn">Demo Button</button>
              </div>
            </div>
          </div>
          
          <div class="glass-code-section">
            <h4>Generated CSS</h4>
            <textarea id="glassCSS" readonly></textarea>
            <div class="glass-actions">
              <button class="glass-btn primary" onclick="webTools.copyGlassCSS()">Copy CSS</button>
              <button class="glass-btn secondary" onclick="webTools.downloadGlassCSS()">Download CSS</button>
              <button class="glass-btn secondary" onclick="webTools.resetGlassEffect()">Reset</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  initSCSSConverter() {
    this.inputFormat = "css"; // Default to CSS input

    // Set initial UI state
    this.setInputFormat("css");

    // Auto-detect format on input
    document.getElementById("scssInput").addEventListener("input", () => {
      this.autoDetectFormat();
    });
  }

  setInputFormat(format) {
    this.inputFormat = format;

    // Update UI - with element existence checks
    const cssBtn = document.getElementById("inputFormatCSS");
    const scssBtn = document.getElementById("inputFormatSCSS");
    const convertToSCSSBtn = document.getElementById("convertToSCSSBtn");
    const convertToCSSBtn = document.getElementById("convertToCSSBtn");
    const outputLabel = document.getElementById("outputFormatLabel");

    if (
      !cssBtn ||
      !scssBtn ||
      !convertToSCSSBtn ||
      !convertToCSSBtn ||
      !outputLabel
    ) {
      console.error("SCSS converter elements not found");
      return;
    }

    // Remove active class from all buttons
    document
      .querySelectorAll(".format-btn")
      .forEach((btn) => btn.classList.remove("active"));

    if (format === "css") {
      cssBtn.classList.add("active");
      convertToSCSSBtn.style.display = "block";
      convertToCSSBtn.style.display = "none";
      outputLabel.textContent = "SCSS Output";
    } else {
      scssBtn.classList.add("active");
      convertToSCSSBtn.style.display = "none";
      convertToCSSBtn.style.display = "block";
      outputLabel.textContent = "CSS Output";
    }
  }

  autoDetectFormat() {
    const input = document.getElementById("scssInput").value;

    if (!input.trim()) {
      this.hideSCSSStatus();
      return;
    }

    // Simple detection: if contains & or nesting-like syntax, it's SCSS
    const hasNesting = /\{\s*[\w-]+\s*:\s*[^;}]+;\s*[\w-]+\s*\{/.test(input);
    const hasAmpersand = /&[\w-]*/.test(input);
    const hasVariables = /\$[\w-]+/.test(input);
    const hasMixins = /@mixin|@include/.test(input);

    if (hasNesting || hasAmpersand || hasVariables || hasMixins) {
      if (this.inputFormat !== "scss") {
        this.setInputFormat("scss");
        this.showSCSSStatus("✓ SCSS format detected", "info");
      }
    } else {
      if (this.inputFormat !== "css") {
        this.setInputFormat("css");
        this.showSCSSStatus("✓ CSS format detected", "info");
      }
    }
  }

  convertToSCSS() {
    const inputElement = document.getElementById("scssInput");
    const outputElement = document.getElementById("scssOutput");

    if (!inputElement || !outputElement) {
      console.error("SCSS converter elements not found");
      return;
    }

    const input = inputElement.value;

    if (!input.trim()) {
      this.showSCSSStatus("Please enter some CSS code to convert", "error");
      return;
    }

    try {
      const scssOutput = this.cssToScss(input);
      outputElement.value = scssOutput;
      this.showSCSSStatus("CSS successfully converted to SCSS!", "success");
    } catch (error) {
      this.showSCSSStatus("Error converting CSS: " + error.message, "error");
    }
  }

  convertToCSS() {
    const inputElement = document.getElementById("scssInput");
    const outputElement = document.getElementById("scssOutput");

    if (!inputElement || !outputElement) {
      console.error("SCSS converter elements not found");
      return;
    }

    const input = inputElement.value;

    if (!input.trim()) {
      this.showSCSSStatus("Please enter some SCSS code to convert", "error");
      return;
    }

    try {
      const cssOutput = this.scssToCss(input);
      outputElement.value = cssOutput;
      this.showSCSSStatus("SCSS successfully converted to CSS!", "success");
    } catch (error) {
      this.showSCSSStatus("Error converting SCSS: " + error.message, "error");
    }
  }

  cssToScss(css) {
    try {
      if (!css || !css.trim()) return "";

      // Simple but reliable CSS to SCSS conversion
      let result = css;

      // Remove comments
      result = result.replace(/\/\*[\s\S]*?\*\//g, "");

      // Split into rules
      const rules = this.extractCssRules(result);

      // Convert to nested SCSS
      return this.convertToNestedScss(rules);
    } catch (error) {
      console.error("CSS to SCSS conversion error:", error);
      return css; // Return original if conversion fails
    }
  }

  extractCssRules(css) {
    const rules = [];
    const ruleRegex = /([^{}]+)\{([^{}]*)\}/g;
    let match;

    while ((match = ruleRegex.exec(css)) !== null) {
      const selector = match[1].trim();
      const declarations = match[2].trim();

      if (selector && declarations) {
        // Split multiple selectors
        const selectors = selector.split(",").map((s) => s.trim());

        // Parse declarations
        const props = declarations
          .split(";")
          .map((d) => d.trim())
          .filter((d) => d && d.includes(":"))
          .map((d) => {
            const [prop, ...valueParts] = d.split(":");
            return {
              property: prop.trim(),
              value: valueParts.join(":").trim(),
            };
          });

        for (const sel of selectors) {
          rules.push({
            selector: sel,
            declarations: props,
          });
        }
      }
    }

    return rules;
  }

  convertToNestedScss(rules) {
    const grouped = this.groupRulesByHierarchy(rules);
    return this.formatNestedScss(grouped);
  }

  groupRulesByHierarchy(rules) {
    const hierarchy = new Map();

    // Sort by selector complexity (simpler first)
    rules.sort((a, b) => {
      const aDepth = a.selector.split(/\s+/).length;
      const bDepth = b.selector.split(/\s+/).length;
      return aDepth - bDepth;
    });

    for (const rule of rules) {
      const parts = rule.selector.split(/\s+/).filter((p) => p);
      this.addRuleToHierarchy(hierarchy, parts, rule.declarations);
    }

    return hierarchy;
  }

  addRuleToHierarchy(hierarchy, parts, declarations) {
    if (parts.length === 0) return;

    const [current, ...remaining] = parts;

    if (!hierarchy.has(current)) {
      hierarchy.set(current, {
        declarations: [],
        children: new Map(),
      });
    }

    const node = hierarchy.get(current);

    if (remaining.length === 0) {
      // Leaf node
      node.declarations.push(...declarations);
    } else {
      // Continue nesting
      this.addRuleToHierarchy(node.children, remaining, declarations);
    }
  }

  formatNestedScss(hierarchy, indent = 0) {
    let result = "";
    const spaces = "  ".repeat(indent);

    for (const [selector, node] of hierarchy) {
      if (node.declarations.length === 0 && node.children.size === 0) continue;

      result += `${spaces}${selector} {\n`;

      // Add declarations
      for (const decl of node.declarations) {
        result += `${spaces}  ${decl.property}: ${decl.value};\n`;
      }

      // Add nested rules
      if (node.children.size > 0) {
        if (node.declarations.length > 0) result += "\n";
        result += this.formatNestedScss(node.children, indent + 1);
      }

      result += `${spaces}}\n`;
      if (indent === 0) result += "\n";
    }

    return result.trim();
  }

  parseCssRules(css) {
    const rules = [];
    let current = "";
    let braceLevel = 0;
    let inString = false;
    let stringChar = "";

    for (let i = 0; i < css.length; i++) {
      const char = css[i];

      if (!inString && (char === '"' || char === "'")) {
        inString = true;
        stringChar = char;
      } else if (inString && char === stringChar && css[i - 1] !== "\\") {
        inString = false;
      }

      if (!inString) {
        if (char === "{") {
          braceLevel++;
        } else if (char === "}") {
          braceLevel--;
          if (braceLevel === 0) {
            current += char;
            const rule = this.parseRule(current.trim());
            if (rule) rules.push(rule);
            current = "";
            continue;
          }
        }
      }

      current += char;
    }

    return rules;
  }

  parseRule(ruleText) {
    // Handle media queries and other at-rules
    if (ruleText.trim().startsWith("@")) {
      return null; // Skip at-rules for now
    }

    const match = ruleText.match(/^(.+?)\s*\{(.+)\}$/s);
    if (!match) return null;

    const selectors = match[1]
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s);
    const declarations = this.parseDeclarations(match[2]);

    if (selectors.length === 0 || declarations.length === 0) {
      return null;
    }

    return { selectors, declarations };
  }

  parseDeclarations(declText) {
    const declarations = [];

    // Handle complex declarations with nested braces (like CSS functions)
    let current = "";
    let braceLevel = 0;
    let inString = false;
    let stringChar = "";

    for (let i = 0; i < declText.length; i++) {
      const char = declText[i];

      if (!inString && (char === '"' || char === "'")) {
        inString = true;
        stringChar = char;
      } else if (inString && char === stringChar && declText[i - 1] !== "\\") {
        inString = false;
      }

      if (!inString) {
        if (char === "(") braceLevel++;
        else if (char === ")") braceLevel--;
        else if (char === ";" && braceLevel === 0) {
          if (current.trim()) {
            const decl = this.parseDeclaration(current.trim());
            if (decl) declarations.push(decl);
          }
          current = "";
          continue;
        }
      }

      current += char;
    }

    // Handle last declaration if no trailing semicolon
    if (current.trim()) {
      const decl = this.parseDeclaration(current.trim());
      if (decl) declarations.push(decl);
    }

    return declarations;
  }

  parseDeclaration(declText) {
    const colonIndex = declText.indexOf(":");
    if (colonIndex === -1) return null;

    const property = declText.substring(0, colonIndex).trim();
    const value = declText.substring(colonIndex + 1).trim();

    if (!property || !value) return null;

    return { property, value };
  }

  buildNestedStructure(rules) {
    const structure = new Map();

    // Sort rules by selector specificity to handle nesting better
    const sortedRules = rules.sort((a, b) => {
      const aDepth = Math.max(...a.selectors.map((s) => s.split(/\s+/).length));
      const bDepth = Math.max(...b.selectors.map((s) => s.split(/\s+/).length));
      return aDepth - bDepth;
    });

    // Group rules by common base selectors
    for (const rule of sortedRules) {
      for (const selector of rule.selectors) {
        this.addSelectorToStructure(
          structure,
          selector.trim(),
          rule.declarations
        );
      }
    }

    return structure;
  }

  addSelectorToStructure(structure, selector, declarations) {
    // Handle simple selectors first
    const parts = this.parseComplexSelector(selector);
    if (parts.length === 1) {
      const key = parts[0];
      if (!structure.has(key)) {
        structure.set(key, { declarations: [], children: new Map() });
      }
      structure.get(key).declarations.push(...declarations);
      return;
    }

    // Handle nested selectors
    this.addNestedSelector(structure, parts, declarations);
  }

  parseComplexSelector(selector) {
    // Split by space but preserve pseudo-classes and pseudo-elements
    return selector
      .split(/\s+(?![^:]*::?[^:\s]*$)/)
      .map((part) => part.trim())
      .filter((part) => part.length > 0);
  }

  addNestedSelector(structure, parts, declarations) {
    if (parts.length === 0) return;

    const [head, ...tail] = parts;

    if (!structure.has(head)) {
      structure.set(head, { declarations: [], children: new Map() });
    }

    const node = structure.get(head);

    if (tail.length === 0) {
      node.declarations.push(...declarations);
    } else {
      this.addNestedSelector(node.children, tail, declarations);
    }
  }

  formatAsScss(structure, indent = 0) {
    let result = "";
    const spaces = "  ".repeat(indent);

    for (const [selector, node] of structure) {
      // Skip empty nodes
      if (node.declarations.length === 0 && node.children.size === 0) {
        continue;
      }

      result += `${spaces}${selector} {\n`;

      // Add declarations first
      for (const decl of node.declarations) {
        result += `${spaces}  ${decl.property}: ${decl.value};\n`;
      }

      // Add a blank line between declarations and nested rules if both exist
      if (node.declarations.length > 0 && node.children.size > 0) {
        result += "\n";
      }

      // Add nested rules
      const nestedScss = this.formatAsScss(node.children, indent + 1);
      if (nestedScss) {
        result += nestedScss;
      }

      result += `${spaces}}\n`;

      // Add blank line between top-level rules
      if (indent === 0) {
        result += "\n";
      }
    }

    return result;
  }

  scssToCss(scss) {
    try {
      if (!scss || !scss.trim()) return "";

      // Simple but reliable SCSS to CSS conversion
      let result = scss;

      // Remove comments
      result = result.replace(/\/\/.*$/gm, ""); // Line comments
      result = result.replace(/\/\*[\s\S]*?\*\//g, ""); // Block comments

      // Remove SCSS variables
      result = result.replace(/\$[\w-]+\s*:\s*[^;]+;\s*/g, "");

      // Flatten nested structures
      const flattened = this.flattenScssToRules(result);

      // Format as CSS
      return this.formatAsCss(flattened);
    } catch (error) {
      console.error("SCSS to CSS conversion error:", error);
      return scss; // Return original if conversion fails
    }
  }

  flattenScssToRules(scss) {
    const rules = [];
    const lines = scss
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line);

    let i = 0;
    while (i < lines.length) {
      const result = this.parseScssBlock(lines, i, []);
      if (result.rules) {
        rules.push(...result.rules);
      }
      i = result.nextIndex;
    }

    return rules;
  }

  parseScssBlock(lines, startIndex, parentSelectors) {
    const rules = [];
    let i = startIndex;

    while (i < lines.length) {
      const line = lines[i].trim();

      if (!line || line.startsWith("//") || line.startsWith("/*")) {
        i++;
        continue;
      }

      if (line.includes("{")) {
        // Selector line
        const selector = line.substring(0, line.indexOf("{")).trim();
        const currentSelectors = this.combineSelectors(
          parentSelectors,
          selector
        );

        i++;
        const declarations = [];
        let braceLevel = 1;

        while (i < lines.length && braceLevel > 0) {
          const currentLine = lines[i].trim();

          if (currentLine.includes("{")) {
            // Nested rule
            const result = this.parseScssBlock(lines, i, currentSelectors);
            rules.push(...result.rules);
            i = result.nextIndex;
            continue;
          } else if (currentLine === "}") {
            braceLevel--;
            if (braceLevel === 0) break;
          } else if (currentLine.includes(":") && currentLine.endsWith(";")) {
            // Declaration
            const [prop, ...valueParts] = currentLine.slice(0, -1).split(":");
            declarations.push({
              property: prop.trim(),
              value: valueParts.join(":").trim(),
            });
          }

          i++;
        }

        // Add rule if it has declarations
        if (declarations.length > 0) {
          for (const sel of currentSelectors) {
            rules.push({ selector: sel, declarations });
          }
        }

        i++; // Skip closing brace
      } else {
        i++;
      }
    }

    return { rules, nextIndex: i };
  }

  combineSelectors(parentSelectors, currentSelector) {
    if (parentSelectors.length === 0) {
      return [currentSelector];
    }

    const result = [];
    for (const parent of parentSelectors) {
      if (currentSelector.includes("&")) {
        result.push(currentSelector.replace(/&/g, parent));
      } else {
        result.push(`${parent} ${currentSelector}`);
      }
    }

    return result;
  }

  formatAsCss(rules) {
    let result = "";

    for (const rule of rules) {
      if (rule.declarations.length === 0) continue;

      result += `${rule.selector} {\n`;
      for (const decl of rule.declarations) {
        result += `  ${decl.property}: ${decl.value};\n`;
      }
      result += "}\n\n";
    }

    return result.trim();
  }

  clearSCSS() {
    document.getElementById("scssInput").value = "";
    document.getElementById("scssOutput").value = "";
    this.hideSCSSStatus();
    this.setInputFormat("css"); // Reset to default
  }

  copySCSSOutput() {
    const output = document.getElementById("scssOutput");
    if (!output.value.trim()) {
      this.showSCSSStatus("Nothing to copy - output is empty", "error");
      return;
    }

    output.select();
    document.execCommand("copy");
    this.showSCSSStatus("Output copied to clipboard!", "success");
  }

  downloadSCSS() {
    const output = document.getElementById("scssOutput").value;
    if (!output.trim()) {
      this.showSCSSStatus("Nothing to download - output is empty", "error");
      return;
    }

    const fileName =
      this.inputFormat === "css" ? "converted.scss" : "converted.css";
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    this.showSCSSStatus(`File downloaded as ${fileName}!`, "success");
  }

  showSCSSStatus(message, type) {
    const status = document.getElementById("scssStatus");
    status.textContent = message;
    status.style.display = "block";

    // Set colors based on type
    switch (type) {
      case "success":
        status.style.background = "#d4edda";
        status.style.color = "#155724";
        status.style.border = "1px solid #c3e6cb";
        break;
      case "error":
        status.style.background = "#f8d7da";
        status.style.color = "#721c24";
        status.style.border = "1px solid #f5c6cb";
        break;
      case "info":
        status.style.background = "#d1ecf1";
        status.style.color = "#0c5460";
        status.style.border = "1px solid #bee5eb";
        break;
    }
  }

  hideSCSSStatus() {
    document.getElementById("scssStatus").style.display = "none";
  }

  initGlassEffectGenerator() {
    const updateGlassEffect = () => {
      const blur = document.getElementById("glassBlur").value;
      const opacity = document.getElementById("glassOpacity").value / 100;
      const borderOpacity =
        document.getElementById("glassBorderOpacity").value / 100;
      const borderRadius = document.getElementById("glassBorderRadius").value;
      const saturation = document.getElementById("glassSaturation").value;
      const contrast = document.getElementById("glassContrast").value;
      const brightness = document.getElementById("glassBrightness").value;
      const shadowX = document.getElementById("glassShadowX").value;
      const shadowY = document.getElementById("glassShadowY").value;
      const shadowBlur = document.getElementById("glassShadowBlur").value;
      const shadowOpacity =
        document.getElementById("glassShadowOpacity").value / 100;
      const bgColor = document.getElementById("glassBackgroundColor").value;
      const borderColor = document.getElementById("glassBorderColor").value;

      // Convert hex to rgba
      const hexToRgba = (hex, alpha) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
      };

      const glassElement = document.getElementById("glassPreview");
      const cssOutput = document.getElementById("glassCSS");

      // Build CSS properties
      const backdropFilter = `blur(${blur}px) saturate(${saturation}%) contrast(${contrast}%) brightness(${brightness}%)`;
      const backgroundColor = hexToRgba(bgColor, opacity);
      const borderColorRgba = hexToRgba(borderColor, borderOpacity);
      const boxShadow = `${shadowX}px ${shadowY}px ${shadowBlur}px ${hexToRgba(
        "#000000",
        shadowOpacity
      )}`;

      // Apply styles to preview
      glassElement.style.backdropFilter = backdropFilter;
      glassElement.style.webkitBackdropFilter = backdropFilter; // Safari support
      glassElement.style.backgroundColor = backgroundColor;
      glassElement.style.border = `1px solid ${borderColorRgba}`;
      glassElement.style.borderRadius = borderRadius + "px";
      glassElement.style.boxShadow = boxShadow;

      // Generate CSS code
      const cssCode = `.glass-effect {
  /* Glass effect properties */
  backdrop-filter: ${backdropFilter};
  -webkit-backdrop-filter: ${backdropFilter}; /* Safari support */
  background: ${backgroundColor};
  border: 1px solid ${borderColorRgba};
  border-radius: ${borderRadius}px;
  box-shadow: ${boxShadow};
  
  /* Additional properties for better glass effect */
  position: relative;
  overflow: hidden;
}

/* Optional: Add a subtle inner glow */
.glass-effect::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, ${hexToRgba(
    borderColor,
    0.1
  )} 0%, transparent 50%);
  pointer-events: none;
}`;

      cssOutput.value = cssCode;

      // Update value displays
      document.getElementById("glassBlurValue").textContent = blur + "px";
      document.getElementById("glassOpacityValue").textContent =
        opacity.toFixed(2);
      document.getElementById("glassBorderOpacityValue").textContent =
        borderOpacity.toFixed(2);
      document.getElementById("glassBorderRadiusValue").textContent =
        borderRadius + "px";
      document.getElementById("glassSaturationValue").textContent =
        saturation + "%";
      document.getElementById("glassContrastValue").textContent =
        contrast + "%";
      document.getElementById("glassBrightnessValue").textContent =
        brightness + "%";
      document.getElementById("glassShadowXValue").textContent = shadowX + "px";
      document.getElementById("glassShadowYValue").textContent = shadowY + "px";
      document.getElementById("glassShadowBlurValue").textContent =
        shadowBlur + "px";
      document.getElementById("glassShadowOpacityValue").textContent =
        shadowOpacity.toFixed(2);
    };

    // Add event listeners for all controls
    const controls = [
      "glassBlur",
      "glassOpacity",
      "glassBorderOpacity",
      "glassBorderRadius",
      "glassSaturation",
      "glassContrast",
      "glassBrightness",
      "glassShadowX",
      "glassShadowY",
      "glassShadowBlur",
      "glassShadowOpacity",
      "glassBackgroundColor",
      "glassBorderColor",
    ];

    controls.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        element.addEventListener("input", updateGlassEffect);
      }
    });

    // Preset handling
    document.getElementById("glassPreset").addEventListener("change", (e) => {
      this.applyGlassPreset(e.target.value);
    });

    // Initial update
    updateGlassEffect();
  }

  applyGlassPreset(preset) {
    const presets = {
      frosted: {
        blur: 10,
        opacity: 20,
        borderOpacity: 30,
        borderRadius: 16,
        saturation: 100,
        contrast: 100,
        brightness: 100,
        shadowX: 0,
        shadowY: 8,
        shadowBlur: 32,
        shadowOpacity: 37,
        bgColor: "#ffffff",
        borderColor: "#ffffff",
      },
      clear: {
        blur: 6,
        opacity: 10,
        borderOpacity: 20,
        borderRadius: 12,
        saturation: 100,
        contrast: 110,
        brightness: 110,
        shadowX: 0,
        shadowY: 4,
        shadowBlur: 16,
        shadowOpacity: 20,
        bgColor: "#ffffff",
        borderColor: "#ffffff",
      },
      tinted: {
        blur: 12,
        opacity: 25,
        borderOpacity: 40,
        borderRadius: 20,
        saturation: 120,
        contrast: 95,
        brightness: 95,
        shadowX: 0,
        shadowY: 8,
        shadowBlur: 24,
        shadowOpacity: 30,
        bgColor: "#007aff",
        borderColor: "#007aff",
      },
      colorful: {
        blur: 15,
        opacity: 30,
        borderOpacity: 50,
        borderRadius: 24,
        saturation: 150,
        contrast: 90,
        brightness: 105,
        shadowX: 0,
        shadowY: 12,
        shadowBlur: 40,
        shadowOpacity: 40,
        bgColor: "#ff6b6b",
        borderColor: "#4ecdc4",
      },
      dark: {
        blur: 8,
        opacity: 40,
        borderOpacity: 60,
        borderRadius: 16,
        saturation: 80,
        contrast: 120,
        brightness: 80,
        shadowX: 0,
        shadowY: 8,
        shadowBlur: 32,
        shadowOpacity: 60,
        bgColor: "#1a1a1a",
        borderColor: "#333333",
      },
      minimal: {
        blur: 4,
        opacity: 8,
        borderOpacity: 15,
        borderRadius: 8,
        saturation: 100,
        contrast: 100,
        brightness: 100,
        shadowX: 0,
        shadowY: 2,
        shadowBlur: 8,
        shadowOpacity: 15,
        bgColor: "#ffffff",
        borderColor: "#ffffff",
      },
    };

    const config = presets[preset];
    if (config) {
      Object.keys(config).forEach((key) => {
        const element = document.getElementById(
          "glass" + key.charAt(0).toUpperCase() + key.slice(1)
        );
        if (element) {
          element.value = config[key];
        }
      });

      // Trigger update
      const event = new Event("input");
      document.getElementById("glassBlur").dispatchEvent(event);
    }
  }

  copyGlassCSS() {
    const cssCode = document.getElementById("glassCSS");
    cssCode.select();
    document.execCommand("copy");

    // Show feedback
    const button = event.target;
    const originalText = button.textContent;
    button.textContent = "Copied!";
    button.style.background = "#34c759";

    setTimeout(() => {
      button.textContent = originalText;
      button.style.background = "";
    }, 2000);
  }

  downloadGlassCSS() {
    const cssCode = document.getElementById("glassCSS").value;
    const blob = new Blob([cssCode], { type: "text/css" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "glass-effect.css";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  resetGlassEffect() {
    document.getElementById("glassPreset").value = "frosted";
    this.applyGlassPreset("frosted");
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded, initializing WebTools");
  window.webTools = new WebTools();
  console.log("WebTools initialized:", window.webTools);
});
