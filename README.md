# 🍎 Ecommerce App

O **Ecommerce App** é uma aplicação móvel focada na gestão inteligente do consumo e stock de produtos naturais. Este projeto está a ser desenvolvido como parte da trajetória académica.

A proposta é oferecer uma interface intuitiva para monitorização de validade, histórico de compras e preferências de consumo, facilitando a organização de quem busca uma compra online.

---

## 🚀 Tecnologias Utilizadas

Este projeto utiliza tecnologias modernas para o desenvolvimento de aplicações multiplataforma:

* **[React Native](https://reactnative.dev/):** Framework para a interface nativa.
* **[Expo](https://expo.dev/):** Plataforma para desenvolvimento e execução da aplicação.
* **[Expo Router](https://expo.github.io/router/):** Navegação baseada em ficheiros (File-based Routing).
* **[TypeScript](https://www.typescriptlang.org/):** Tipagem estática para maior segurança no desenvolvimento.
* **[Ionicons/Feather Icons](https://icons.expo.fyi/):** Bibliotecas de ícones vetoriais.

---

## 🏗️ Estrutura de Pastas

Com base na arquitetura atual do projeto:

```text
├── .expo/                      # Configurações e cache do Expo
├── .vscode/                    # Configurações do VS Code para o projeto
├── assets/                     # Imagens, fontes e mídias estáticas
├── node_modules/               # Dependências do projeto (geradas pelo npm/yarn)
├── scripts/                    # Scripts de automação ou utilitários de build
└── src/                        # Código fonte principal do aplicativo
    ├── app/                    # Roteamento baseado em arquivos (Expo Router)
    │   ├── (tabs)/             # Grupo de rotas com navegação por abas
    │   │   ├── _layout.tsx     # Configuração do layout das abas, define a navegação inferior para usuários comuns e redireciona admin
    │   │   ├── alerts.tsx      # Tela de alertas
    │   │   ├── cart.tsx        # Tela do carrinho
    │   │   ├── history.tsx     # Tela de histórico
    │   │   ├── index.tsx       # Tela inicial (Home) com busca e vitrine de categorias
    │   │   └── profile.tsx     # Tela de perfil do usuário
    │   ├── _layout.tsx         # Layout raiz; envolve o app com providers de auth, catálogo e navegação stack
    │   ├── admin-dashboard.tsx # Dashboard analítico/admin
    │   ├── admin-users.tsx     # Gestão de usuários
    │   ├── admin.tsx           # Painel principal do admin
    │   ├── alert-details.tsx   # Detalhes de alertas
    │   ├── alert-preferences.tsx # Preferências de alertas
    │   ├── categories.tsx      # Catálogo público e edição de categorias/itens pelo admin
    │   ├── login.tsx           # Tela de login/cadastro mock
    │   ├── personal-data.tsx   # Dados pessoais do usuário
    │   ├── purchase-history.tsx # Histórico de compras
    │   ├── settings.tsx         # Configurações do app
    │   └── user-products.tsx   # Tela de produtos/itens do usuário
    ├── components/             # Componentes reutilizáveis de interface (UI)
    │   ├── ui/                 # Componentes base de UI estruturais
    │   ├── animated-icon.module.css # Estilos da animação web
    │   ├── animated-icon.tsx   # Animação do ícone/branding no mobile
    │   ├── animated-icon.web.tsx # Versão web da animação
    │   ├── app-tabs.tsx        # Tabs nativas da web
    │   ├── app-tabs.web.tsx    # Versão web das tabs
    │   ├── auth-context.tsx    # Controls login, logout, conta mock, tema por usuário e persistência
    │   ├── back-home-button.tsx # Botão para voltar para a home
    │   ├── catalog-context.tsx # Guarda categorias e itens do catálogo, com adicionar/editar/excluir e persistência
    │   ├── external-link.tsx   # Link para abrir URL externa
    │   ├── hint-row.tsx        # Linha de dica/instrução
    │   ├── menu.tsx            # Menu lateral
    │   ├── themed-text.tsx     # Texto padronizado com estilos por tipo
    │   ├── themed-view.tsx     # View que já aplica a cor do tema
    │   └── web-badge.tsx       # Selo/branding da web
    ├── constants/              # Valores constantes globais
    │   └── theme.ts            # Configurações de cores e estilização do tema, concentra cores, fontes, espaçamentos e assets em um só lugar
    └── hooks/                  # Custom Hooks do React
        ├── use-color-scheme.ts # Lê o esquema de cores do sistema
        ├── use-color-scheme.web.ts # Versão web do hook de cor
        ├── use-safe-storage.ts # Acesso seguro ao storage, evitando problemas em ambiente Expo
        ├── use-theme-color.ts  # Escolhe a cor correta conforme light/dark
        └── use-theme.ts        # Entrega a paleta ativa e integra o tema do app com o estado do usuário
├── global.css                  # Estilização CSS global
├── .gitignore                  # Arquivos e pastas ignorados pelo Git
├── app.json                    # Configura o app Expo, ícones, splash screen, Android/iOS/web e plugins
├── eas.json                    # Configurações de build do EAS (Expo Application Services)
├── expo-env.d.ts               # Definições de tipos TypeScript para o Expo
├── package-lock.json           # Travamento de versões das dependências
├── package.json                # Define dependências, scripts e a base do projeto
├── README.md                   # Documentação do projeto
└── tsconfig.json               # Configura o TypeScript e os caminhos de importação
````
---

## 📋 Funcionalidades Atuais

[x] Navegação Dinâmica: Sistema de abas (Tabs) e pilhas (Stack) com Expo Router.

[x] Interface Adaptativa: Design moderno com suporte a Light/Dark Mode via constants/theme.

[] Componentização: Uso de componentes reutilizáveis para garantir a consistência visual.

[] Lógica de Acesso: Fluxo de redirecionamento para login ao aceder a áreas restritas.

[ ] Persistência de Dados: Integração com base de dados (Planeado para as próximas etapas).

---

## 🛠️ Como Executar o Projeto

Clonar o repositório:

```text
git clone [https://github.com/Alimenta-ReNova/react-ecommerce-interface.git]
````
Instalar as dependências:
```text
npm install
````
Iniciar o ambiente Expo:
```text
npx expo start -c
````

Utilize o QR Code no app Expo Go para testar no seu dispositivo físico.
