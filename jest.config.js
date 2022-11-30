/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    testMatch: ['**/__tests__/**/*.test.tsx'],
    transform: {
        '^.+\\.(j|t)sx?$': 'ts-jest'
    },
    transformIgnorePatterns: ['//node_modules'],
    moduleNameMapper: {
        '\\.(css)$': 'identity-obj-proxy'
    },
    setupFilesAfterEnv: ['jest-expect-message']
};
