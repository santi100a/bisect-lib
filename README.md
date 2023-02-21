# Santi's Bisect Library

[![Build Status](https://github.com/santi100a/bisect-lib/actions/workflows/main.yml/badge.svg)](https://github.com/santi100a/bisect-lib/actions)
[![GitHub stars](https://img.shields.io/github/stars/santi100a/bisect-lib.svg)](https://github.com/santi100a/bisect-lib)
[![License](https://img.shields.io/github/license/santi100a/bisect-lib.svg)](https://github.com/santi100a/bisect-lib)

- 🚀 Lightweight and fast
- 👴 ES3-compliant*
- 💻 Portable between the browser and Node.js

**Hasn't been tested in an actual ES3 environment. Feel free to open an issue or pull request if you find any non-ES3 thing.*

## Installation
- Via NPM: `npm install @santi100/bisect-lib`
- Via Yarn: `yarn add @santi100/bisect-lib`
- Via PNPM: `pnpm install @santi100/bisect-lib`

## API

- `function bisect<T = unknown>(array: T[], target: T): number;` Searches through `array` with a recursive binary-search algorithm (better for sorted arrays). Returns the index of the first ocurrence of the element, or -1 if it's not present.