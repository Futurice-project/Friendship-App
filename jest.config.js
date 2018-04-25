const config = {
  preset: 'jest-expo',
  transformIgnorePatterns: ['node_modules/(?!react-native|react-navigation)'],
  setupFiles: ['./enzyme.config.js'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.js'],
  coverageReporters: ['text-summary', 'html'],
  moduleNameMapper: {
    '^image![a-zA-Z0-9$_-]+$': 'GlobalImageStub',
    '^[@./a-zA-Z0-9$_-]+\\.(png|gif)$': 'RelativeImageStub',
  },
};

module.exports = config;
