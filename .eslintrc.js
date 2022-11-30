module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['plugin:react/recommended', 'standard-with-typescript'],
    overrides: [],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react'],
    rules: {
        'comma-dangle': [
            'error',
            { arrays: 'always-multiline', objects: 'always-multiline' },
        ],
        semi: ['error', 'always'],
        indent: ['error', 4],
    },
};
