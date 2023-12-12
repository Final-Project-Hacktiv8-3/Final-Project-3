module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    env: {
      production: {
        plugins: ["react-native-paper/babel"],
      },
    },
    plugins: [
      "nativewind/babel",
      [
        "module-resolver",
        {
          root: ["./"],
          extensions: [
            ".ios.js",
            ".android.js",
            ".js",
            ".ts",
            ".tsx",
            ".json",
            ".jsx",
          ],
          alias: {
            "@Components": "/src/Components/index",
            "@Screens": "/src/Screens/index",
            "@Utils": "/src/utils/index",
            "@Assets": "/src/assets/index",
            "@Redux": "/src/redux/index",
            "@Services": "/src/services/index",
          },
        },
      ],
    ],
  };
};
