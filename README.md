# Gulp Pug SCSS

## Description

Compile PUG to HTML, SCSS to CSS and mirror JS files & images.

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

Pug comes with custom filters. Check them out:

### Math

Allows to easily input TeX math, which will be converted to MathML. Powered by Temml.

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
:code(lang="javascript")
  const productsPrices = [1000, 20, 31]
  const productsTitles = ['cheese', 'juice', 'bread']
```

Currently only JS is supported, but it can be easily changed in the configuration, along with themes.

### SCSS

Insert SCSS right in your PUG file:

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
