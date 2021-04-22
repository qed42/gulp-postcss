# Gulp
Modular Gulp tasks using v4 for compiling, linting & image optimization.

## Pre-requisites
Before starting, ensure that you are using at least the latest LTS release of
Node.js, once Node.js has been installed, we recommend to run

To install the required packages use
```
npm install
```

## Working on CSS
  - The project uses [PostCSS](https://postcss.org/) for managing variables and
provide the needed browser support.
  - With extension `.css` we can use SCSS/PostCSS syntax or it's features.
  - Partial files support like SASS.
  - Included RTL feature which convert LTR CSS to RTL for directional css.
  - BEM classes feature available.
  - PX to REM converstion available.
    - Default base for conversion is `1rem = 16px`.
    - Default output unit for `<value>px` is `rem`.
    - More info: https://www.npmjs.com/package/postcss-pixels-to-rem
  - Media query breakpoints for mobile/ipad/desktop devices.
    - `src/css/utils/_breakpoints.css`
    - How to use see: `src/css/components/header.css`
  - Included CleanCSS & Auto-prefixer.
  ```
  gulp build:css
  ```

## Working on Javascript
  -  The project uses [ES6](https://es6.io/) for managing javascript with the `Drupal.behaviors` code standard.
  ```
  gulp build:js
  ```

## Linting JS and CSS
  - Linting Javascript and CSS files along with fix Linting Errors & formatting.
  
  Script to lint JS
  ```
  gulp lint:js
  ```
  Script to Fix javaScript errors & Format JS file.
  ```
  gulp js-fix-prettier
  ```
  Script to lint CSS
  ```
  gulp lint:css
  ```
  Script to Fix CSS linting errors
  ```
  gulp lint:css-fix
  ```

## Image optimization
  - The images designated for your custom theme can be placed in the `images/` folder. We have gulp task to optimized images.
  ```
  gulp images
  ```

## Multiple task
  - Run multiple task at one time. Like build css, js & image.
  ```
  npm run build
  ```
  - File watcher
  ```
  npm run watch
  ```
  OR
  ```
  gulp watch
  ```
