// Web Tools Functionality
class WebTools {
  constructor() {
    this.modal = document.getElementById("toolModal");
    this.modalTitle = document.getElementById("toolModalTitle");
    this.modalBody = document.getElementById("toolModalBody");
    this.closeBtn = document.getElementById("closeModal");

    this.init();
  }

  init() {
    // Add event listeners for tool cards
    document.querySelectorAll(".tool-card").forEach((card) => {
      card.addEventListener("click", (e) => {
        const toolType = card.getAttribute("data-tool");
        this.openTool(toolType);
      });
    });

    // Close modal event listeners
    this.closeBtn.addEventListener("click", () => this.closeModal());
    this.modal.addEventListener("click", (e) => {
      if (e.target === this.modal) this.closeModal();
    });

    // ESC key to close modal
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.modal.classList.contains("show")) {
        this.closeModal();
      }
    });
  }

  openTool(toolType) {
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
    };

    const tool = tools[toolType];
    if (tool) {
      this.modalTitle.textContent = tool.title;
      this.modalBody.innerHTML = tool.content;
      this.modal.classList.add("show");
      document.body.style.overflow = "hidden";

      // Initialize tool-specific functionality
      this.initToolFunctionality(toolType);
    }
  }

  closeModal() {
    this.modal.classList.remove("show");
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
            <label>Colors & Stops</label>
            <div class="color-controls" id="colorControls">
              <div class="color-stop" data-index="0">
                <input type="color" value="#007aff" data-type="color">
                <input type="range" min="0" max="100" value="0" data-type="stop">
                <span class="stop-value">0%</span>
                <button type="button" class="remove-color" onclick="webTools.removeColor(0)" style="display: none;">×</button>
              </div>
              <div class="color-stop" data-index="1">
                <input type="color" value="#4ba1fc" data-type="color">
                <input type="range" min="0" max="100" value="100" data-type="stop">
                <span class="stop-value">100%</span>
                <button type="button" class="remove-color" onclick="webTools.removeColor(1)" style="display: none;">×</button>
              </div>
            </div>
            <button type="button" class="add-color-btn" onclick="webTools.addColor()">Add Color</button>
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
            <label style="display: flex; align-items: center; gap: 10px;">
              Inset Shadow
              <label class="switch">
                <input type="checkbox" id="shadowInset">
                <span class="slider"></span>
              </label>
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
    }
  }

  initGradientGenerator() {
    this.colorIndex = 2; // Start from index 2 since we have 0 and 1

    const updateGradient = () => {
      const type = document.getElementById("gradientType").value;
      const direction = document.getElementById("gradientDirection").value;

      // Get all color stops
      const colorStops = [];
      document.querySelectorAll(".color-stop").forEach((stop) => {
        const color = stop.querySelector('input[data-type="color"]').value;
        const position = stop.querySelector('input[data-type="stop"]').value;
        colorStops.push({ color, position: parseInt(position) });
      });

      // Sort by position
      colorStops.sort((a, b) => a.position - b.position);

      // Create gradient string
      const colorString = colorStops
        .map((stop) => `${stop.color} ${stop.position}%`)
        .join(", ");

      let gradient;
      if (type === "linear") {
        gradient = `linear-gradient(${direction}deg, ${colorString})`;
      } else {
        gradient = `radial-gradient(circle, ${colorString})`;
      }

      document.getElementById("gradientPreview").style.background = gradient;
      document.getElementById("gradientCSS").value = `background: ${gradient};`;

      // Update direction display
      document.getElementById("directionValue").textContent = direction + "°";
    };

    const updateStopValues = () => {
      document.querySelectorAll(".color-stop").forEach((stop) => {
        const range = stop.querySelector('input[data-type="stop"]');
        const valueSpan = stop.querySelector(".stop-value");
        valueSpan.textContent = range.value + "%";
      });
    };

    // Add event listeners
    document
      .getElementById("gradientType")
      .addEventListener("change", updateGradient);
    document
      .getElementById("gradientDirection")
      .addEventListener("input", updateGradient);

    // Add listeners to existing color stops
    document.querySelectorAll(".color-stop input").forEach((input) => {
      input.addEventListener("input", () => {
        updateStopValues();
        updateGradient();
      });
    });

    updateStopValues();
    updateGradient();
  }

  addColor() {
    const colorControls = document.getElementById("colorControls");
    const newColorDiv = document.createElement("div");
    newColorDiv.className = "color-stop";
    newColorDiv.setAttribute("data-index", this.colorIndex);

    // Calculate a good default position
    const existingStops = document.querySelectorAll(".color-stop");
    const defaultPosition = Math.round(
      (100 / (existingStops.length + 1)) * existingStops.length
    );

    newColorDiv.innerHTML = `
      <input type="color" value="#ff6b6b" data-type="color">
      <input type="range" min="0" max="100" value="${defaultPosition}" data-type="stop">
      <span class="stop-value">${defaultPosition}%</span>
      <button type="button" class="remove-color" onclick="webTools.removeColor(${this.colorIndex})">×</button>
    `;

    colorControls.appendChild(newColorDiv);

    // Add event listeners to new inputs
    newColorDiv.querySelectorAll("input").forEach((input) => {
      input.addEventListener("input", () => {
        this.updateStopValues();
        this.updateGradient();
      });
    });

    this.colorIndex++;
    this.updateRemoveButtons();
    this.updateGradient();
  }

  removeColor(index) {
    const colorStop = document.querySelector(`[data-index="${index}"]`);
    if (colorStop) {
      colorStop.remove();
      this.updateRemoveButtons();
      this.updateGradient();
    }
  }

  updateRemoveButtons() {
    const colorStops = document.querySelectorAll(".color-stop");
    colorStops.forEach((stop) => {
      const removeBtn = stop.querySelector(".remove-color");
      if (colorStops.length <= 2) {
        removeBtn.style.display = "none";
      } else {
        removeBtn.style.display = "flex";
      }
    });
  }

  updateStopValues() {
    document.querySelectorAll(".color-stop").forEach((stop) => {
      const range = stop.querySelector('input[data-type="stop"]');
      const valueSpan = stop.querySelector(".stop-value");
      valueSpan.textContent = range.value + "%";
    });
  }

  updateGradient() {
    const type = document.getElementById("gradientType").value;
    const direction = document.getElementById("gradientDirection").value;

    // Get all color stops
    const colorStops = [];
    document.querySelectorAll(".color-stop").forEach((stop) => {
      const color = stop.querySelector('input[data-type="color"]').value;
      const position = stop.querySelector('input[data-type="stop"]').value;
      colorStops.push({ color, position: parseInt(position) });
    });

    // Sort by position
    colorStops.sort((a, b) => a.position - b.position);

    // Create gradient string
    const colorString = colorStops
      .map((stop) => `${stop.color} ${stop.position}%`)
      .join(", ");

    let gradient;
    if (type === "linear") {
      gradient = `linear-gradient(${direction}deg, ${colorString})`;
    } else {
      gradient = `radial-gradient(circle, ${colorString})`;
    }

    document.getElementById("gradientPreview").style.background = gradient;
    document.getElementById("gradientCSS").value = `background: ${gradient};`;

    // Update direction display
    document.getElementById("directionValue").textContent = direction + "°";
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
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.webTools = new WebTools();
});
