// API Configuration for Portfolio Tools
// Note: In a real production environment, API keys should be stored securely on the server
// This is for demonstration purposes only

const API_CONFIG = {
  // Remove.bg API Configuration
  REMOVE_BG_API_KEY: "jfmYvkuPGkNjnkPhzyby1knr", // Replace with your actual API key from remove.bg
  REMOVE_BG_API_URL: "https://api.remove.bg/v1.0/removebg",

  // API Settings
  REMOVE_BG_SIZE: "auto", // Options: 'auto', 'preview', 'full'
  REMOVE_BG_TYPE: "auto", // Options: 'auto', 'person', 'product', 'animal', 'car', 'other'

  // Rate limiting info (for reference)
  REMOVE_BG_FREE_LIMIT: 50, // Free tier: 50 images per month

  // Debug mode
  DEBUG_MODE: false, // Set to false in production
};

// Export for use in other files
window.API_CONFIG = API_CONFIG;

// Console log for developers
// if (API_CONFIG.DEBUG_MODE) {
//   console.log("API Config loaded:", {
//     hasRemoveBgKey:
//       API_CONFIG.REMOVE_BG_API_KEY !== "YOUR_REMOVE_BG_API_KEY_HERE",
//     removeBgUrl: API_CONFIG.REMOVE_BG_API_URL,
//     debugMode: API_CONFIG.DEBUG_MODE,
//   });

//   if (API_CONFIG.REMOVE_BG_API_KEY === "YOUR_REMOVE_BG_API_KEY_HERE") {
//     console.warn("🔑 Remove.bg API key not configured!");
//     console.log("📝 To get started:");
//     console.log("1. Go to https://www.remove.bg/");
//     console.log("2. Sign up for a free account");
//     console.log("3. Get your API key from https://www.remove.bg/api");
//     console.log(
//       "4. Replace YOUR_REMOVE_BG_API_KEY_HERE with your actual key in config.js"
//     );
//   } else {
//     console.log("✅ Remove.bg API key configured successfully!");
//     console.log("🔍 Key info:", {
//       length: API_CONFIG.REMOVE_BG_API_KEY.length,
//       preview:
//         API_CONFIG.REMOVE_BG_API_KEY.substring(0, 8) +
//         "..." +
//         API_CONFIG.REMOVE_BG_API_KEY.substring(
//           API_CONFIG.REMOVE_BG_API_KEY.length - 4
//         ),
//     });
//     console.log("🎯 Ready to process images with real background removal!");

//     // Validate key format
//     if (
//       API_CONFIG.REMOVE_BG_API_KEY.length < 20 ||
//       API_CONFIG.REMOVE_BG_API_KEY.length > 35
//     ) {
//       console.warn(
//         "⚠️ API key length seems unusual. Remove.bg keys are typically 20-35 characters."
//       );
//     }
//   }
// }
