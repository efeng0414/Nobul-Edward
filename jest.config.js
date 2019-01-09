module.exports = {
  setupFiles: ["<rootDir>/src/tests/setup.js", "<rootDir>/src/tests/shim.js"],
  moduleNameMapper: {
    "^.+\\.(css|scss)$": "<rootDir>/src/tests/mocks/styleMock.js",
    ".*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/src/tests/mocks/fileMock.js"
  },
  testPathIgnorePatterns: [".git"],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  testURL: "http://localhost"
};
