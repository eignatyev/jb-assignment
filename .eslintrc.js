module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: ['react'],
    rules: {
        'comma-dangle': ['error', 'never'],
        semi: ['error', 'always'],
        indent: ['error', 4],
        'no-unused-vars': [
            'error',
            { vars: 'all', args: 'after-used', ignoreRestSiblings: false }
        ]
    },
    settings: {
        react: {
            version: 'detect'
        }
    }
};
