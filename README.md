# 📚 Crazy Index

O **Crazy Index** é um indexador interativo e enciclopédia digital voltada para universos de RPG e fantasia. O projeto foi idealizado para funcionar visualmente como um antigo livro mágico de registros, onde o usuário pode abrir a capa, folhear as páginas e navegar pela lore de forma totalmente fluida.

Esta aplicação foi desenvolvida com foco em **escalabilidade**, permitindo que novos livros (Bestiários, Guias de Cidades, Itens Mágicos) sejam adicionados facilmente no futuro através de uma arquitetura de dados fortemente tipada.

---

## 🚀 Funcionalidades Principais

- **📖 Interface Estilo Livro:** Navegação visual imersiva que simula a abertura de capas e o passar de páginas físicas.
- **🧠 Dados Altamente Estruturados:** Arquitetura inteligente que gerencia o cruzamento de dados complexos como Regiões, Sub-regiões e Categorias de raças.
- **🔀 Navegação Cruzada (Wiki Style):** Sistema de links autorreferenciáveis onde clicar em uma Aliança ou Inimigo direciona o leitor imediatamente para a página daquela raça.
- **⚡ Filtros Avançados Dinâmicos:** Filtros do tipo funil lógico (AND) que permitem cruzar categorias e localizações simultaneamente sem quebrar a paginação.
- **🛡️ Seção Administrativa Protegida:** Painel seguro para gerenciamento de conteúdo (CRUD de Raças e Regiões) através da rota restrita `/admin`.

---

## 🛠️ Stack Tecnológica

O projeto utiliza o que há de mais moderno no ecossistema de desenvolvimento web Full-Stack:

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Linguagem:** [TypeScript](https://www.typescript.org/) (Garantindo tipagem estrita e contratos de dados seguros)
- **Estilização:** [Tailwind CSS v4](https://tailwindcss.com/) (Estilização utilitária de alta performance)
- **Banco de Dados & Autenticação (Futuro):** Supabase / Firebase (Backend as a Service)

---

## 📦 Estrutura de Pastas Relevante

```text
crazy-index/
├── src/
│   ├── app/
│   │   ├── globals.css      # Estilos globais (Tailwind v4)
│   │   ├── layout.tsx       # Layout base da aplicação
│   │   └── page.tsx         # Página inicial (Capa do Livro)
│   └── data/
│       └── mockData.ts      # Contratos (Interfaces TS) e dados de teste iniciais
├── README.md
└── package.json

```

---

## 🔧 Como Executar o Projeto Localmente

Para clonar e rodar esta aplicação no seu computador, você precisará do [Git](https://git-scm.com) e do [Node.js](https://nodejs.org/) instalados.

1. **Clone o repositório:**

```bash
git clone [https://github.com/seu-usuario/crazy-index.git](https://github.com/seu-usuario/crazy-index.git)

```

2. **Entre na pasta do projeto:**

```bash
cd crazy-index

```

3. **Instale as dependências:**

```bash
npm install

```

4. **Inicie o servidor de desenvolvimento:**

```bash
npm run dev

```

5. Abra o seu navegador e acesse **`http://localhost:3000`** para ver o projeto rodando.

---

## 🗺️ Roadmap de Desenvolvimento

- [x] Setup do projeto Next.js com TypeScript e Tailwind v4
- [x] Modelagem do contrato de dados (`mockData.ts`)
- [x] Desenvolvimento da interface e efeito de passar páginas (Front-end Estático)
- [ ] Implementação da lógica de filtros avançados
- [ ] Integração com Banco de Dados e Sistema de Autenticação para Administrador
- [ ] Otimização para dispositivos móveis (Responsividade)
- [ ] Expansão para múltiplos livros (Cidades, Itens e Facções)

```

```
