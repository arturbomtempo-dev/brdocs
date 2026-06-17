# docsbr

<table>
  <tr>
    <td width="800px">
      <div align="justify">
        <b>docsbr</b> is a <b>TypeScript-first</b> library for validating, formatting, and generating Brazilian documents. Lightweight, dependency-free, and with native <b>ESM</b> support, it provides a minimal and consistent API for CPF, CNPJ, and other Brazilian documents. Compatible with <b>Node.js</b> ≥ 18, modern bundlers like Vite and esbuild, and the browser.
      </div>
    </td>
    <td>
      <div align="center">
        <img src="https://arturbomtempo-dev.github.io/arturbomtempo-cdn/assets/images/projects/docsbr/logo-en.png" alt="docsbr" width="150px"/>
      </div>
    </td>
  </tr>
</table>

<br>

<div align="center">
  <a href="https://www.npmjs.com/package/docsbr"><img src="https://img.shields.io/badge/package-v1.0.0-CB3837?logo=npm&logoColor=white" alt="Package version"></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" alt="TypeScript"></a>
  <a href="https://vitest.dev/"><img src="https://img.shields.io/badge/tests-Vitest-6E9F18?logo=vitest&logoColor=white" alt="Vitest"></a>
  <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-%E2%89%A518-339933?logo=nodedotjs&logoColor=white" alt="Node.js ≥18"></a>
  <a href="./LICENSE.md"><img src="https://img.shields.io/badge/license-MIT-22c55e" alt="MIT License"></a>
</div>

<br>

> The Portuguese documentation is available [by clicking here](./README.md).

---

## 📚 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Installation](#-installation)
- [Importing](#-importing)
- [API Reference](#-api-reference)
  - [CPF](#cpf)
  - [CNPJ](#cnpj)
- [Usage Examples](#-usage-examples)
- [Tests](#-tests)
- [Technologies](#-technologies)
- [Author](#-author)
- [License](#-license)

---

## 📝 About

Working with Brazilian documents like CPF and CNPJ usually requires manually implementing Mod-11 validation algorithms, formatting masks, and generation logic. **docsbr** centralizes all these operations into a clean, predictable API with no external dependencies.

Built with a focus on:

- **Correctness**: algorithms faithful to the official specifications of the Brazilian Federal Revenue Service.
- **Simplicity**: minimal and consistent API across all modules.
- **Compatibility**: works on Node.js ≥ 18, ESM projects, and modern bundlers (Vite, esbuild, Webpack, etc.).

---

## ✨ Features

### Implemented

- [x] **CPF**: validation, formatting, unformatting, and generation
- [x] **CNPJ**: validation, formatting, unformatting, and generation

### Roadmap

- [ ] **CEP**: lookup and validation
- [ ] **PIX**: Pix key validation
- [ ] **PIS/PASEP**: validation
- [ ] **CNH**: validation
- [ ] **Título de Eleitor**: validation
- [ ] **RENAVAM**: validation

---

## 📦 Installation

Install docsbr using your preferred package manager.

```bash
npm install docsbr
```

```bash
yarn add docsbr
```

```bash
pnpm add docsbr
```

---

## 🔌 Importing

docsbr exports the `cpf` and `cnpj` modules as namespaces. You can import from the main entry point or directly via subpath imports.

### Main entry point (recommended)

```typescript
import { cpf, cnpj } from 'docsbr';
```

### Subpath imports (tree-shaking)

```typescript
import { format, unformat, isValid, generate } from 'docsbr/cpf';
import { format, unformat, isValid, generate } from 'docsbr/cnpj';
```

---

## 📖 API Reference

### CPF

#### `cpf.format(value: string): string`

Applies the `###.###.###-##` mask to a CPF. Accepts formatted or unformatted input.

```typescript
import { cpf } from 'docsbr';

cpf.format('52998224725');     // '529.982.247-25'
cpf.format('529.982.247-25'); // '529.982.247-25'
```

---

#### `cpf.unformat(value: string): string`

Removes formatting and returns only the digits.

```typescript
cpf.unformat('529.982.247-25'); // '52998224725'
cpf.unformat('52998224725');    // '52998224725'
```

---

#### `cpf.isValid(value: string): boolean`

Validates a CPF using the Mod-11 algorithm. Accepts formatted or unformatted input.

```typescript
cpf.isValid('529.982.247-25'); // true
cpf.isValid('52998224725');    // true
cpf.isValid('111.111.111-11'); // false (repeated digits)
cpf.isValid('000.000.000-00'); // false
```

---

#### `cpf.generate(formatted?: boolean): string`

Generates a random valid CPF. Returns only digits by default; pass `true` to return a formatted value.

```typescript
cpf.generate();      // e.g. '52998224725'
cpf.generate(true);  // e.g. '529.982.247-25'
```

---

### CNPJ

#### `cnpj.format(value: string): string`

Applies the `##.###.###/####-##` mask to a CNPJ. Accepts formatted or unformatted input.

```typescript
import { cnpj } from 'docsbr';

cnpj.format('11444777000161');      // '11.444.777/0001-61'
cnpj.format('11.444.777/0001-61'); // '11.444.777/0001-61'
```

---

#### `cnpj.unformat(value: string): string`

Removes formatting and returns only the digits.

```typescript
cnpj.unformat('11.444.777/0001-61'); // '11444777000161'
cnpj.unformat('11444777000161');      // '11444777000161'
```

---

#### `cnpj.isValid(value: string): boolean`

Validates a CNPJ using the Mod-11 algorithm. Accepts formatted or unformatted input.

```typescript
cnpj.isValid('11.444.777/0001-61'); // true
cnpj.isValid('11444777000161');     // true
cnpj.isValid('11.111.111/1111-11'); // false (repeated digits)
cnpj.isValid('00.000.000/0000-00'); // false
```

---

#### `cnpj.generate(formatted?: boolean): string`

Generates a random valid CNPJ. Returns only digits by default; pass `true` to return a formatted value.

```typescript
cnpj.generate();      // e.g. '11444777000161'
cnpj.generate(true);  // e.g. '11.444.777/0001-61'
```

---

## 💻 Usage Examples

The full example code can be viewed at [`src/test.ts`](https://github.com/arturbomtempo-dev/docsbr/blob/main/src/test.ts).

### Using namespace import

```typescript
import { cpf, cnpj } from 'docsbr';

// CPF
console.log(cpf.format('52998224725'));       // '529.982.247-25'
console.log(cpf.unformat('529.982.247-25')); // '52998224725'
console.log(cpf.isValid('529.982.247-25'));  // true
console.log(cpf.isValid('111.111.111-11'));  // false
console.log(cpf.generate());                 // e.g. '52998224725'
console.log(cpf.generate(true));             // e.g. '529.982.247-25'

// CNPJ
console.log(cnpj.format('11444777000161'));       // '11.444.777/0001-61'
console.log(cnpj.unformat('11.444.777/0001-61')); // '11444777000161'
console.log(cnpj.isValid('11.444.777/0001-61'));  // true
console.log(cnpj.isValid('11.111.111/1111-11'));  // false
console.log(cnpj.generate());                      // e.g. '11444777000161'
console.log(cnpj.generate(true));                  // e.g. '11.444.777/0001-61'
```

### Using sub-path import

```typescript
import { format, unformat, isValid, generate } from 'docsbr/cpf';

console.log(format('52998224725'));       // '529.982.247-25'
console.log(unformat('529.982.247-25')); // '52998224725'
console.log(isValid('529.982.247-25'));  // true
console.log(generate(true));             // e.g. '529.982.247-25'
```

---

## 🧪 Tests

Tests are written with **Vitest** and cover all library modules.

```bash
# Run all tests
npm run test

# Run with coverage report
npm run coverage

# Watch mode (re-runs on save)
npm run test:watch
```

---

## 🛠 Technologies

- **[TypeScript](https://www.typescriptlang.org/)**: primary language
- **[Vitest](https://vitest.dev/)**: testing framework
- **[ESLint](https://eslint.org/)** + **[Prettier](https://prettier.io/)**: linting and code formatting

---

## 👨🏻‍💻 Author

---

| [<img loading="lazy" src="https://avatars.githubusercontent.com/u/96635074?v=4" width=115><br><sub>Artur Bomtempo</sub>](https://arturbomtempo.dev/) |
| :--------------------------------------------------------------------------------------------------------------------------------------------------: |

Developed by Artur Bomtempo 👋🏻. Get in touch:

[![Gmail Badge](https://img.shields.io/badge/-arturbcolen@gmail.com-D14836?style=flat-square&logo=Gmail&logoColor=white&link=mailto:arturbcolen@gmail.com)](mailto:arturbcolen@gmail.com)
[![LinkedIn Badge](https://img.shields.io/badge/-Artur%20Bomtempo-0A66C2?style=flat-square&logo=LinkedIn&logoColor=white&link=https://www.linkedin.com/in/artur-bomtempo/)](https://www.linkedin.com/in/artur-bomtempo/)
[![Instagram Badge](https://img.shields.io/badge/-@arturbomtempo.dev-E4405F?style=flat-square&logo=Instagram&logoColor=white&link=https://www.instagram.com/arturbomtempo.dev/)](https://www.instagram.com/arturbomtempo.dev/)

---

## 📄 License

Distributed under the **MIT License**. See the [LICENSE](./LICENSE.md) file for details.

Copyright (c) 2025 Artur Bomtempo Colen
