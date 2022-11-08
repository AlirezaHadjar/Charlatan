module.exports = {
    root: true,
    extends: ["@react-native-community", "react-native-wcandillon"],
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    rules: {
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-shadow": "off",
        "import/no-default-export": "off",
        curly: "off",
        "@typescript-eslint/consistent-type-imports": "off",
    },
};
