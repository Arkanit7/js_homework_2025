/**
 * @see https://prettier.io/docs/configuration.html
 * @type {import("prettier").Config}
 */
export default {
  plugins: ['@prettier/plugin-pug'],

  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  embeddedLanguageFormatting: 'off',
  semi: false,
  quoteProps: 'as-needed',
  bracketSpacing: false,
  trailingComma: 'all',

  overrides: [
    {
      files: '*.{js,mjs,cjs,ts,tsx,jsx}',
      options: {
        singleQuote: true,
      },
    },
  ],
}
