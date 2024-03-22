module.exports = {
    root: true,
    'env': {
        'node': true,
        'es2021': true,
        'browser': true 
    },
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs', 'vite.config.js'],
    parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    settings: { react: { version: '18.2' } },
    plugins: ['react-refresh'],
    rules: {
      'indent': [
        'error',
        2
    ],
    'linebreak-style': [
        'error',
        'unix'
    ],
    'quotes': [
        'error',
        'single'
    ],
    'semi': [
        'error',
        'never'
    ],
    'eqeqeq': 'error',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': [
      'error', 'always'
    ],
    'arrow-spacing': [
      'error', {'before': true, 'after': true} 
    ],
    'no-console': 0,
    },
    'overrides': [
        {
            'env': {
                'node': true
            },
            'files': [
                '.eslintrc.{js,cjs}'
            ],
            'parserOptions': {
                'sourceType': 'script'
            }
        }
    ],
    'parserOptions': {
        'ecmaVersion': 'latest',
        'sourceType': 'module'
    },
    'plugins': [
        'react'
    ],
}
