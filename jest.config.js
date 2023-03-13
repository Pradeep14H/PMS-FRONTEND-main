module.exports = {
    transform: {
      "^.+\\.jsx?$": "babel-jest"
    },
    moduleNameMapper: {
      "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js"
    },
    moduleDirectories: ["node_modules", "src"],
    transformIgnorePatterns: ["<rootDir>/node_modules/"]
  };