# LearnSnapWeb

LearnSnapWeb é uma aplicação web construída com Next.js e TypeScript onde usuários podem compartilhar e adquirir conhecimento rapidamente. A plataforma permite a criação e participação em quizzes para facilitar o aprendizado em diversos tópicos.
Índice

    Instalação
    Execução do Projeto
    Estrutura de Pastas
    Tecnologias Utilizadas
    Funcionalidades
    Rotas da Aplicação
    Contribuindo
    Licença

## Instalação

Para instalar o projeto localmente, siga os passos abaixo:

1. Clone o repositório:

  `git clone https://github.com/JosiasBatista/LearnSnapWeb.git`

2. Acesse o diretório do projeto:

  `cd LearnSnapWeb`

3. Instale as dependências necessárias usando o npm, yarn, ou pnpm:
```
  npm install
  # ou
  yarn install
  # ou
  pnpm install
```
4. Execução do Projeto

Para rodar o projeto em ambiente de desenvolvimento:
```
  npm run dev
  # ou
  yarn dev
  # ou
  pnpm dev
```

5. Abra http://localhost:3000 no navegador para visualizar a aplicação. A página irá recarregar automaticamente quando você fizer alterações no código.

## Estrutura de Pastas

Aqui está um resumo da estrutura de pastas principal do projeto:
```
LearnSnapWeb/
├── app/                  # Diretório de páginas e componentes principais
│   ├── page.tsx          # Página inicial
│   ├── login/page.tsx    # Página de login
│   └── quiz/[id]/page.tsx# Página de detalhes de quizzes
├── services/             # Serviços de chamadas API
│   └── api.ts            # Lógica de interação com a API
├── public/               # Arquivos públicos (imagens, etc.)
├── styles/               # Estilos globais
├── .eslintrc.json        # Configuração do ESLint
├── tailwind.config.ts    # Configuração do Tailwind CSS
├── tsconfig.json         # Configuração do TypeScript
└── package.json          # Dependências e scripts do projeto
```

## Tecnologias Utilizadas

  Next.js: Framework React para renderização do lado do servidor e cliente, oferecendo uma experiência de desenvolvimento otimizada.
  TypeScript: Superset do JavaScript que adiciona tipagem estática.
  Tailwind CSS: Framework utilitário para criação rápida de layouts responsivos e customizados.
  Axios: Para fazer requisições HTTP à API.
  ESLint: Ferramenta de linting para manter o código limpo e padronizado.
  PostCSS: Processador de CSS.

## Contribuindo

Se você deseja contribuir para o desenvolvimento deste projeto:

  Faça um fork do repositório.
  Crie uma nova branch para suas alterações (git checkout -b feature/MinhaFeature).
  Faça as alterações necessárias e adicione commits (git commit -m 'Adiciona MinhaFeature').
  Envie suas alterações (git push origin feature/MinhaFeature).
  Abra um Pull Request e descreva suas alterações.

Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
