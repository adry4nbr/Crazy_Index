````md
# 📖 Crazy Index

> Um grimório interativo de raças fictícias com sistema de administração, filtros dinâmicos e navegação imersiva em formato de livro.

---

## 🚀 Sobre o Projeto

O **Crazy Index** é uma aplicação web construída para funcionar como um grande índice/grimório de raças fictícias, permitindo visualizar informações detalhadas, alianças, fraquezas, regiões e categorias de cada raça através de uma interface totalmente inspirada em livros mágicos.

O projeto foi desenvolvido utilizando **Next.js + Supabase**, com foco em:

- Experiência visual imersiva
- Organização escalável
- Sistema administrativo protegido
- Navegação dinâmica
- Estrutura modular e reutilizável

---

# 🖼️ Preview

## 📚 Interface do Livro

- Navegação estilo grimório
- Efeito de paginação
- Sistema de filtros
- Layout responsivo
- Modo mobile adaptado

---

# ⚙️ Informações Técnicas

## 🛠️ Stack Tecnológica

### Front-end

- Next.js (App Router)
- React
- TypeScript

### Estilização

- Tailwind CSS

### Back-end & Banco de Dados

- Supabase

### Outras Ferramentas

- Middleware de autenticação
- API Routes
- Hooks customizados
- Sistema de áudio

---

# 🔐 Regras de Acesso e Segurança

## 👥 Público Geral

Possui apenas permissão de leitura (`GET`).

Os usuários podem:

- Abrir o livro
- Folhear páginas
- Utilizar filtros
- Pesquisar raças
- Visualizar regiões e informações

---

## 👑 Administrador

Acesso exclusivo através da rota oculta:

```bash
/admin
```
````

O administrador possui permissões de:

- POST
- PUT
- DELETE

Permitindo:

- Adicionar raças
- Editar raças
- Remover raças
- Gerenciar regiões

---

# 🧬 Modelagem do Sistema

# 🌍 Entidade: Região

| Campo       | Tipo            |
| ----------- | --------------- |
| id          | Texto           |
| nome        | Texto           |
| sub_regioes | Lista de textos |

### Exemplos

```json
{
  "nome": "Futurista",
  "sub_regioes": ["Cyberpunk", "Steampunk"]
}
```

---

# 👤 Entidade: Raça

| Campo       | Tipo            |
| ----------- | --------------- |
| id          | Texto           |
| nome        | Texto           |
| origem      | Opção única     |
| idade_media | Texto/Número    |
| imagem      | URL             |
| descricao   | Texto longo     |
| aliancas    | Lista de IDs    |
| inimigos    | Lista de IDs    |
| categoria   | Lista de opções |
| regioes_ids | Lista de IDs    |
| fraquezas   | Objeto dinâmico |

---

## 🧪 Tipos de Origem

- Natural
- Artificial
- Maldição
- Extraterrestre

---

## 🏷️ Categorias

- Terrestre
- Aéreo
- Elemental
- Mágico
- Astral
- Aquático
- Infernal
- Celestial
- Divino
- Extinto
- ???

---

## ☠️ Sistema de Fraquezas

Cada raça pode possuir fraquezas específicas:

- Física
- Mágica
- Astral

O formulário é dinâmico:
ao selecionar o tipo de fraqueza, o campo correspondente é liberado para preenchimento.

---

# 📂 Estrutura de Pastas

```bash
CRAZY-INDEX
├── .next
├── node_modules
├── public
│   └── sounds
│
├── src
│   ├── app
│   │   ├── admin
│   │   │   ├── login
│   │   │   │   └── page.tsx
│   │   │   │
│   │   │   ├── racas
│   │   │   │   ├── [id]
│   │   │   │   │   └── page.tsx
│   │   │   │   └── nova
│   │   │   │       └── page.tsx
│   │   │   │
│   │   │   ├── regioes
│   │   │   │   ├── [id]
│   │   │   │   │   └── page.tsx
│   │   │   │   └── nova
│   │   │   │       └── page.tsx
│   │   │   │
│   │   │   └── page.tsx
│   │   │
│   │   ├── api
│   │   │   ├── racas
│   │   │   │   └── route.ts
│   │   │   └── regioes
│   │   │       └── route.ts
│   │   │
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── components
│   │   ├── admin
│   │   │   └── RacaForm
│   │   │       ├── FormUI.tsx
│   │   │       ├── Fraquezas.tsx
│   │   │       ├── index.tsx
│   │   │       ├── Relacionamentos.tsx
│   │   │       └── RegiaoForm.tsx
│   │   │
│   │   └── livro
│   │       ├── hooks
│   │       │   ├── useFiltros.ts
│   │       │   └── useLivro.ts
│   │       │
│   │       ├── BarraFiltros.tsx
│   │       ├── CapaGrimorio.tsx
│   │       ├── ControlesNavegacao.tsx
│   │       ├── LinhaInfo.tsx
│   │       ├── Livro.tsx
│   │       ├── LivroMobile.tsx
│   │       ├── PaginaRaca.tsx
│   │       ├── PaginaRacaMobile.tsx
│   │       ├── PapelMagico.tsx
│   │       └── SecaoFraquezas.tsx
│   │
│   ├── data
│   │   └── mockData.ts
│   │
│   ├── lib
│   │   ├── auth-guard.ts
│   │   ├── data.ts
│   │   └── supabase.ts
│   │
│   └── utils
│       └── playSound.ts
│
├── .env.local
├── .gitignore
├── eslint.config.mjs
├── LICENSE.txt
├── middleware.ts
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
└── tsconfig.json
```

---

# ✨ Funcionalidades

## 📖 Sistema de Livro Interativo

- Navegação entre páginas
- Renderização dinâmica
- Experiência imersiva

## 🔎 Sistema de Filtros

- Busca por categorias
- Busca por logenvidade
- Busca por regiões
- Busca por origem
- Busca Por aliados e inimigos
- Filtros dinâmicos

## 📱 Responsividade

- Layout adaptado para mobile
- Livro separado para dispositivos móveis

## 🔊 Sistema de Sons

- Reprodução de áudio durante interações

## 🔐 Sistema Administrativo

- Login protegido
- Controle de acesso
- CRUD completo

---

# 🧠 Arquitetura do Projeto

O projeto foi organizado utilizando separação modular baseada em responsabilidades:

- `components/` → Componentes reutilizáveis
- `hooks/` → Regras de negócio e estado
- `lib/` → Integrações e serviços
- `app/` → Rotas da aplicação
- `utils/` → Funções auxiliares
- `data/` → Dados mockados

---

# 🚀 Como Rodar o Projeto

## Clone o repositório

```bash
git clone https://github.com/adry4nbr/Crazy_Index.git
```

---

## Acesse a pasta

```bash
cd Crazy_Index
```

---

## Instale as dependências

```bash
npm install
```

---

## Configure o ambiente

Crie um arquivo:

```bash
.env.local
```

E adicione suas credenciais do Supabase.

---

## Rode o projeto

```bash
npm run dev
```

---

# 🌐 Repositório

🔗 GitHub:
[https://github.com/adry4nbr/Crazy_Index](https://github.com/adry4nbr/Crazy_Index)

---

# 🌍 Deploy

🔗 https://crazyindex.vercel.app/

---

---

# 📌 Futuras Melhorias

- Livro das Regiões
- Livro das Armas
- Livro ...

---

# 📄 Licença

Este projeto está sob a licença presente em:

```bash
LICENSE.txt
```

---

# 👨‍💻 Autor

Desenvolvido por **Adryan Galdino Soares** 🚀

```

```
