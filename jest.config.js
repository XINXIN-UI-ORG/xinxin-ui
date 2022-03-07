let d = new Date();
let date = `${d.getFullYear()}-${('00' + (d.getMonth() + 1)).slice(-2)}-${('00' + d.getDate()).slice(-2)}`;

module.exports = {
    roots: [
      '<rootDir>/packages'
    ],
    testMatch: [
      '<rootDir>/packages/**/__tests__/**/*.{js,jsx,ts,tsx}',
      '<rootDir>/packages/**/*.{spec,test}.{js,jsx,ts,tsx}',
    ],
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.(vue)$': '<rootDir>/node_modules/vue-jest',
      '^.+\\.(js|jsx|mjs|cjs|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
    },
    transformIgnorePatterns: [
      '<rootDir>/node_modules/',
      '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$',
      '^.+\\.module\\.(css|sass|scss|less)$',
    ],
    moduleFileExtensions: [
      'vue',
      'js',
      'jsx',
      'ts',
      'tsx',
      'json',
      'node',
    ],
    resetMocks: true,
    reporters: [
        "default",
        ["./node_modules/jest-html-reporter", {
            "pageTitle": date + " Test Report",
            "outputPath": `./test-reporter/${date}.html`,
            "expand": true
        }]
    ],
    collectCoverage: true,
    collectCoverageFrom: ["**/*.{ts,vue}", "!**/node_modules/**", "!**/packages/**/__tests__/**"],
    coverageReporters: ["html", "text-summary"]
  };
