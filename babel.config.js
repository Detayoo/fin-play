module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "transform-remove-console",
        {
          exclude: ["error", "warn", "info", "log"],
        },
      ],
      [
        "transform-remove-console",
        {
          exclude: ["error", "log"],
        },
        "remove-require-cycle-warnings",
      ],
    ],
  };
};
