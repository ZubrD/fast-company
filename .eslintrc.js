module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: ["plugin:react/recommended", "standard"],
    overrides: [],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
    },
    plugins: ["react"],
    rules: {
        // indent: ["error", 4],
        indent: ["off"],    // убрал проверку правильности отступов
        semi: [2, "always"],
        "space-before-function-paren": [
            "error",
            { anonymous: "always", named: "never" }
        ],
        "multiline-ternary": ["off"],
        // quotes: ["error", "double", { allowTemplateLiterals: true }]
        quotes: [0, { avoidEscape: true, allowTemplateLiterals: true }],
        "no-unused-vars": [
            0,
            { vars: "all", args: "after-used", ignoreRestSiblings: false }
        ]
    }
};
