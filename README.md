import os

# Define the content of the README.md file
readme_content = """# Customer Management API (Native Node.js)

Esta é uma API RESTful para cadastro de clientes desenvolvida como um exercício de engenharia de software de alto nível. O desafio principal foi construir uma aplicação robusta e escalável **sem o uso de frameworks web** (como Express, Fastify ou NestJS), utilizando apenas os módulos nativos do Node.js.

## 🛠 Tecnologias e Ferramentas

- **Linguagem:** TypeScript
- **Runtime:** Node.js (Módulo `http` nativo)
- **Banco de Dados:** SQLite (3ª Forma Normal - 3NF)
- **Execução:** ts-node

## 🏗 Arquitetura e Padrões (Engineering Specs)

O projeto foi construído seguindo princípios rigorosos de design de software para garantir manutenibilidade e testabilidade:

- **SOLID & Clean Code:** Separação clara de responsabilidades.
- **Object Calisthenics:** - Apenas um nível de indentação por método.
    - Uso zero da palavra reservada `else` (Early Return pattern).
    - Encapsulamento de tipos primitivos (Value Objects).
- **Lei de Demeter:** As entidades possuem comportamento e protegem seu estado interno.
- **Value Objects:** Validação rigorosa de Nome, E-mail e Telefone em objetos especializados, impedindo que a aplicação entre em estado inválido.
- **3rd Normal Form (3NF):** Separação física entre as tabelas de `customers` e `phones` para eliminar redundâncias.

## 📂 Estrutura de Pastas

```text
src/
├── domain/            # Regras de negócio, Entidades e Value Objects
├── infrastructure/    # Conexão com banco de dados, Repositórios e Helpers
├── controllers/       # Orquestração da lógica de entrada/saída
└── server.ts          # Entry point e roteamento nativo