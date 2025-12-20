const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

// Use path.resolve to ensure Windows-compatible path handling
const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: './global.css' });
