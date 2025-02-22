/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
export default {
  plugins: ['@prettier/plugin-pug'],
  overrides: [
    {
      files: '*.{js,mjs,cjs,ts,tsx,jsx}',
      options: {
        semi: false,
        singleQuote: true,
        // trailingComma: 'all',
        // tabWidth: 2,
        // printWidth: 80,
        // useTabs: false,
        // bracketSpacing: true,
      },
    },
  ],
}
