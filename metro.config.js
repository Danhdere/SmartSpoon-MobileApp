const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

config.resolver.sourceExts.push("jsx", "js", "ts", "tsx"); // Add custom extensions if necessary

module.exports = config;
