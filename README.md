# Gulp Pug SCSS Bundler

Introducing a Gulp based project bundler, specifically designed for featuring JavaScript home assignments.

## Description

Compile PUG to HTML, SCSS to CSS and mirror JS files along with images.

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Arkanit7/js_homework_2025.git
   ```
2. Navigate to the project directory:
   ```sh
   cd js_homework_2025
   ```
3. Install the dependencies:
   ```sh
   npm install
   ```

## Usage

Pug is combined with custom filters. Check them out:

### Math

Allows to easily input TeX math, which will be converted to MathML. Powered by Temml:

```pug
p Дано масив #[:math x] із #[:math n] елементів. Знайдіть
  |
  |
  :math
    x_1 x_n + x_2 x_{n - 1} + ... + x_n x_1
```

### Code

Code section with variety of themes. Powered by Shiki.

```pug
:code(lang="javascript", theme="material-theme-ocean")
  const productsPrices = [1000, 20, 31]
  const productsTitles = ['cheese', 'juice', 'bread']
```

Currently only JS is supported, but it can be easily changed in the configuration, along with themes.

### SCSS

Insert SCSS right in to your PUG file:

```jade
style
  :scss
    .foo {
      &__bar {
        color: magenta;
      }
    }
```

### Development

To start the development server, run:

```sh
npm run dev
```

It will stare a server on http://localhost:3000/ and open a Firefox browser (if installed).

### Build

To build the project, run:

```sh
npm run build
```

## Scripts

- `dev`: Starts the development server.
- `build`: Builds the project for production.

## Author

Arkanit

## License

ISC

## Certificate

![JavaScript Certificate](https://raw.githubusercontent.com/Arkanit7/certificates/refs/heads/main/fls-certificate-js-en.png)
