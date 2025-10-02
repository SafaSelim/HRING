module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  moduleFileExtensions: ['js', 'json'],
  transform: {},
  testMatch: ['**/test/**/*.test.js'],
};
