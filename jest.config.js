const config = {
  preset: 'jest-expo',
  haste: {
    defaultPlatform: 'android',
    platforms: ['android', 'ios', 'native'],
    providesModuleNodeModules: ['react-native'],
  },
  transformIgnorePatterns: ['node_modules/(?!react-native|react-navigation)'],
  setupFiles: ['./enzyme.config.js'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.js'],
  coverageReporters: ['text-summary', 'html'],
};

module.exports = config;
