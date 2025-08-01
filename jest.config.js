module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,
  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",
  // A path to a module which exports an async function that is triggered once before all test suites
  setupFilesAfterEnv: ["<rootDir>/src/tests/setup.ts"],
};
