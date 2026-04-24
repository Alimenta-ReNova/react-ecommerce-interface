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
RENOVA/
 ├── assets/             # Imagens e fontes do projeto
 ├── src/
 │    ├── app/           # Sistema de Rotas (Expo Router)
 │    │    ├── (tabs)/   # Grupo de Abas (Navegação Inferior)
 │    │    │    ├── alerts.tsx    (Alarmes)
 │    │    │    ├── cart.tsx      (Carrinho)
 │    │    │    ├── history.tsx   (Histórico)
 │    │    │    ├── index.tsx     (Início)
 │    │    │    ├── profile.tsx   (Perfil)
 │    │    │    └── _layout.tsx   (Configuração das Tabs)
 │    │    ├── login.tsx          (Tela de Acesso)
 │    │    ├── personal-data.tsx  (Dados do Usuário)
 │    │    ├── settings.tsx       (Configurações)
 │    │    └── _layout.tsx        (Configuração Raiz/Stack)
 │    ├── components/    # Componentes reutilizáveis (UI, Menu, etc.)
 │    ├── constants/     # Definições de Temas e Cores
 │    └── hooks/         # Lógicas e Hooks personalizados
 ├── package.json        # Dependências e scripts
 └── README.md           # Documentação do projeto

````
---

## 📋 Funcionalidades Atuais

[x] Navegação Dinâmica: Sistema de abas (Tabs) e pilhas (Stack) com Expo Router.

[x] Interface Adaptativa: Design moderno com suporte a Light/Dark Mode via constants/theme.

[x] Componentização: Uso de componentes reutilizáveis para garantir a consistência visual.

[x] Lógica de Acesso: Fluxo de redirecionamento para login ao aceder a áreas restritas.

[ ] Persistência de Dados: Integração com base de dados (Planeado para as próximas etapas).

---

## 🛠️ Como Executar o Projeto

Clonar o repositório:

Bash
git clone [https://github.com/teu-usuario/renova.git](https://github.com/teu-usuario/renova.git)
Instalar as dependências:

Bash
npm install
Iniciar o ambiente Expo:

Bash
npx expo start -c
Utilize o QR Code no app Expo Go para testar no seu dispositivo físico.
