module.exports = {
  root: true,
  parserOptions: {
    createDefaultProgram: true
  },
  extends: [require.resolve("react-ts-fabric/dist/eslint")],
  globals: {},
  rules: {
    "no-template-curly-in-string": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-unused-expressions": "off"
  },
};
