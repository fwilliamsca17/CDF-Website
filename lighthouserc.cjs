const baseUrl = process.env.LIGHTHOUSE_BASE_URL || "http://localhost:3000";

module.exports = {
  ci: {
    collect: {
      startServerCommand: "npm run start -- --port 3000",
      startServerReadyPattern: "Ready",
      url: [
        `${baseUrl}/`,
        `${baseUrl}/trust-deeds`,
        `${baseUrl}/trust-deeds/how-it-works`,
        `${baseUrl}/login`,
        `${baseUrl}/dashboard/pending`,
      ],
      numberOfRuns: 1,
      settings: {
        onlyCategories: ["accessibility"],
        chromeFlags: "--no-sandbox",
      },
    },
    assert: {
      assertions: {
        "categories:accessibility": ["error", { minScore: 0.95 }],
      },
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
