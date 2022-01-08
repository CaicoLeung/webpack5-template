module.exports = {
  extends: [require.resolve("@umijs/fabric/dist/eslint")],
  globals: {},
  rules: {
    "no-template-curly-in-string": "off",
    "@typescript-eslint/no-unused-vars": "warn",
  },
};
