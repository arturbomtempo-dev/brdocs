# docsbr

<table>
  <tr>
    <td width="800px">
      <div align="justify">
        <b>docsbr</b> é uma biblioteca <b>TypeScript-first</b> para validação, formatação e geração de documentos brasileiros. Leve, sem dependências externas e com suporte nativo a <b>ESM</b>, disponibiliza uma API mínima e consistente para CPF, CNPJ e outros documentos do ecossistema brasileiro. Compatível com <b>Node.js</b> ≥ 18, bundlers modernos como Vite e esbuild, e com o browser.
      </div>
    </td>
    <td>
      <div align="center">
        <img src="https://arturbomtempo-dev.github.io/arturbomtempo-cdn/assets/images/projects/docsbr/logo.png" alt="docsbr" width="150px"/>
      </div>
    </td>
  </tr>
</table>

<br>

<div align="center">
  <a href="https://www.npmjs.com/package/docsbr"><img src="https://img.shields.io/badge/package-v1.0.0-CB3837?logo=npm&logoColor=white" alt="Package version"></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" alt="TypeScript"></a>
  <a href="https://vitest.dev/"><img src="https://img.shields.io/badge/testes-Vitest-6E9F18?logo=vitest&logoColor=white" alt="Vitest"></a>
  <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-%E2%89%A518-339933?logo=nodedotjs&logoColor=white" alt="Node.js ≥18"></a>
  <a href="./LICENSE.md"><img src="https://img.shields.io/badge/licença-MIT-22c55e" alt="MIT License"></a>
</div>

<br>

> A documentação em inglês está disponível [clicando aqui](./README.en.md).

---

## 📚 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Instalação](#-instalação)
- [Importação](#-importação)
- [Referência da API](#-referência-da-api)
    - [CPF](#cpf)
    - [CNPJ](#cnpj)
- [Exemplos de Uso](#-exemplos-de-uso)
- [Testes](#-testes)
- [Tecnologias](#-tecnologias)
- [Autor](#-autor)
- [Licença](#-licença)

---

## 📝 Sobre o Projeto

Lidar com documentos brasileiros como CPF e CNPJ exige implementar manualmente algoritmos de validação (Mod-11), máscaras de formatação e lógicas de geração. A **docsbr** centraliza todas essas operações em uma API clara, previsível e sem dependências externas.

A biblioteca foi desenvolvida com foco em:

- **Correção**: algoritmos fiéis às especificações oficiais da Receita Federal.
- **Simplicidade**: API mínima e consistente entre todos os módulos.
- **Compatibilidade**: funciona em Node.js ≥ 18, projetos ESM e bundlers modernos (Vite, esbuild, Webpack, etc.).

---

## ✨ Funcionalidades

### Implementadas

- [x] **CPF**: validação, formatação, desformatação e geração
- [x] **CNPJ**: validação, formatação, desformatação e geração

### Roadmap

- [ ] **CEP**: consulta e validação
- [ ] **PIX**: validação de chaves Pix
- [ ] **PIS/PASEP**: validação
- [ ] **CNH**: validação
- [ ] **Título de Eleitor**: validação
- [ ] **RENAVAM**: validação

---

## 📦 Instalação

Instale o docsbr usando o gerenciador de pacotes de sua preferência.

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

## 🔌 Importação

A docsbr exporta os módulos `cpf` e `cnpj` como namespaces. Você pode importar pelo ponto de entrada principal ou diretamente via subpath imports.

### Ponto de entrada principal (recomendado)

```typescript
import { cpf, cnpj } from 'docsbr';
```

### Subpath imports (tree-shaking)

```typescript
import { format, unformat, isValid, generate } from 'docsbr/cpf';
import { format, unformat, isValid, generate } from 'docsbr/cnpj';
```

---

## 📖 Referência da API

### CPF

#### `cpf.format(value: string): string`

Aplica a máscara `###.###.###-##` a um CPF. Aceita o valor com ou sem formatação.

```typescript
import { cpf } from 'docsbr';

cpf.format('52998224725'); // '529.982.247-25'
cpf.format('529.982.247-25'); // '529.982.247-25'
```

---

#### `cpf.unformat(value: string): string`

Remove a formatação e retorna apenas os dígitos.

```typescript
cpf.unformat('529.982.247-25'); // '52998224725'
cpf.unformat('52998224725'); // '52998224725'
```

---

#### `cpf.isValid(value: string): boolean`

Valida um CPF pelo algoritmo Mod-11. Aceita o valor com ou sem formatação.

```typescript
cpf.isValid('529.982.247-25'); // true
cpf.isValid('52998224725'); // true
cpf.isValid('111.111.111-11'); // false (sequência repetida)
cpf.isValid('000.000.000-00'); // false
```

---

#### `cpf.generate(formatted?: boolean): string`

Gera um CPF válido aleatório. Por padrão retorna apenas os dígitos; passe `true` para retornar formatado.

```typescript
cpf.generate(); // ex: '52998224725'
cpf.generate(true); // ex: '529.982.247-25'
```

---

### CNPJ

#### `cnpj.format(value: string): string`

Aplica a máscara `##.###.###/####-##` a um CNPJ. Aceita o valor com ou sem formatação.

```typescript
import { cnpj } from 'docsbr';

cnpj.format('11444777000161'); // '11.444.777/0001-61'
cnpj.format('11.444.777/0001-61'); // '11.444.777/0001-61'
```

---

#### `cnpj.unformat(value: string): string`

Remove a formatação e retorna apenas os dígitos.

```typescript
cnpj.unformat('11.444.777/0001-61'); // '11444777000161'
cnpj.unformat('11444777000161'); // '11444777000161'
```

---

#### `cnpj.isValid(value: string): boolean`

Valida um CNPJ pelo algoritmo Mod-11. Aceita o valor com ou sem formatação.

```typescript
cnpj.isValid('11.444.777/0001-61'); // true
cnpj.isValid('11444777000161'); // true
cnpj.isValid('11.111.111/1111-11'); // false (sequência repetida)
cnpj.isValid('00.000.000/0000-00'); // false
```

---

#### `cnpj.generate(formatted?: boolean): string`

Gera um CNPJ válido aleatório. Por padrão retorna apenas os dígitos; passe `true` para retornar formatado.

```typescript
cnpj.generate(); // ex: '11444777000161'
cnpj.generate(true); // ex: '11.444.777/0001-61'
```

---

## 💻 Exemplos de Uso

O código de exemplo completo pode ser visualizado em [`src/test.ts`](https://github.com/arturbomtempo-dev/docsbr/blob/main/src/test.ts).

### Usando importação por namespace

```typescript
import { cpf, cnpj } from 'docsbr';

// CPF
console.log(cpf.format('52998224725')); // '529.982.247-25'
console.log(cpf.unformat('529.982.247-25')); // '52998224725'
console.log(cpf.isValid('529.982.247-25')); // true
console.log(cpf.isValid('111.111.111-11')); // false
console.log(cpf.generate()); // ex: '52998224725'
console.log(cpf.generate(true)); // ex: '529.982.247-25'

// CNPJ
console.log(cnpj.format('11444777000161')); // '11.444.777/0001-61'
console.log(cnpj.unformat('11.444.777/0001-61')); // '11444777000161'
console.log(cnpj.isValid('11.444.777/0001-61')); // true
console.log(cnpj.isValid('11.111.111/1111-11')); // false
console.log(cnpj.generate()); // ex: '11444777000161'
console.log(cnpj.generate(true)); // ex: '11.444.777/0001-61'
```

### Usando importação por sub-caminho

```typescript
import { format, unformat, isValid, generate } from 'docsbr/cpf';

console.log(format('52998224725')); // '529.982.247-25'
console.log(unformat('529.982.247-25')); // '52998224725'
console.log(isValid('529.982.247-25')); // true
console.log(generate(true)); // ex: '529.982.247-25'
```

---

## 🧪 Testes

Os testes são escritos com **Vitest** e cobrem todos os módulos da biblioteca.

```bash
# Rodar todos os testes
npm run test

# Rodar com relatório de cobertura
npm run coverage

# Modo watch (re-executa ao salvar)
npm run test:watch
```

---

## 🛠 Tecnologias

- **[TypeScript](https://www.typescriptlang.org/)**: linguagem principal
- **[Vitest](https://vitest.dev/)**: framework de testes
- **[ESLint](https://eslint.org/)** + **[Prettier](https://prettier.io/)**: linting e formatação de código

---

## 👨🏻‍💻 Autor

---

| [<img loading="lazy" src="https://avatars.githubusercontent.com/u/96635074?v=4" width=115><br><sub>Artur Bomtempo</sub>](https://arturbomtempo.dev/) |
| :--------------------------------------------------------------------------------------------------------------------------------------------------: |

Desenvolvido por Artur Bomtempo 👋🏻. Entre em contato:

[![Gmail Badge](https://img.shields.io/badge/-arturbcolen@gmail.com-D14836?style=flat-square&logo=Gmail&logoColor=white&link=mailto:arturbcolen@gmail.com)](mailto:arturbcolen@gmail.com)
[![LinkedIn Badge](https://img.shields.io/badge/-Artur%20Bomtempo-0A66C2?style=flat-square&logo=LinkedIn&logoColor=white&link=https://www.linkedin.com/in/artur-bomtempo/)](https://www.linkedin.com/in/artur-bomtempo/)
[![Instagram Badge](https://img.shields.io/badge/-@arturbomtempo.dev-E4405F?style=flat-square&logo=Instagram&logoColor=white&link=https://www.instagram.com/arturbomtempo.dev/)](https://www.instagram.com/arturbomtempo.dev/)

---

## 📄 Licença

Distribuído sob a licença **MIT**. Consulte o arquivo [LICENSE](./LICENSE.md) para mais detalhes.

Copyright (c) 2025 Artur Bomtempo Colen
