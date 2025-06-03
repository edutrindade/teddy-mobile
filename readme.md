# Mobile Teddy - App de Gestão de Clientes

---

## 📝 Sobre o Projeto

O **Mobile Teddy** é um aplicativo React Native desenvolvido para gerenciar clientes. O app permite que o usuário insira seu nome na tela inicial, e navegue para uma lista de clientes, onde é possível cadastrar, selecionar, editar e excluir clientes, além de selecionar clientes para uma lista a parte.

Este projeto foi criado como solução para o  **Teste Mobile Teddy** , contemplando os seguintes requisitos:

* Uso de **TypeScript** para maior segurança e qualidade no código.
* Implementação com **React Native** na versão mais recente.
* Persistência de dados utilizando **AsyncStorage** para cache local.
* Cobertura inicial com **testes unitários** e configurações de testes **end-to-end** (E2E) para garantir a qualidade e estabilidade do app.
* Arquitetura baseada em **componentização** e padrões claros de código.
* Gerenciamento de estado simples e eficiente.
* Estrutura de pastas organizada para fácil escalabilidade.
* Histórico de commits limpo e descritivo, seguindo boas práticas.

---

## 📱 Funcionalidades Principais

* Tela inicial com input para o usuário informar seu nome.
* Lista de clientes cadastrados com busca e paginação.
* Cadastro, edição e exclusão de clientes.
* Visualização dos clientes selecionados.
* Dados persistidos localmente via AsyncStorage.
* Navegação fluida entre telas com React Navigation.
* Componentes reutilizáveis e estilizados para experiência consistente e responsiva.

---

## 🛠 Tecnologias e Ferramentas

* **React Native** (última versão)
* **TypeScript**
* **React Navigation** (7.1.10)
* **AsyncStorage** para persistência local
* **Gorhom Bottom Sheet** para criação da Drawer Navigator padronizada e componentes de cadastro/edição
* **Lottie** para lidar com animação
* **Jest** + **React Native Testing Library** para testes unitários
* **Detox** para testes end-to-end (E2E)
* **ESLint** e **Prettier** para padronização do código
* **Git** com commits padronizados

---

## 🏗️ Estrutura do Projeto

```plaintext
/src
  /assets                  # Recursos estáticos como imagens, animações, fontes, etc.
  /infra                   # Infraestrutura de dados, incluindo repositórios, adaptadores e configurações
    /data                  # Dados e armazenamento, como cache, API, etc.
    /external              # Integrações externas ou SDKs
  /main                    # Arquivos principais de configuração do app
  /presentation            # Camada de apresentação (UI)
    /components            # Componentes reutilizáveis de UI (botões, inputs, textos, etc.)
    /screens               # Telas do app (Home, Customers, SelectedCustomers, etc.)
    /routes                # Configuração de navegação
    /styles                # Estilos globais e específicos
  /services                # Serviços de negócio ou API (exemplo: UserService)
  /utils                   # Utilitários e helpers (ex: máscaras, funções auxiliares)
```

---



## 🚀 Como Rodar o Projeto

### Pré-requisitos

* Node.js (>=16)
* npm, yarn (ou outro gerenciador de sua preferência)
* Android Studio (emulador configurado) ou dispositivo físico
* (Opcional) Xcode para iOS (configuração nativa necessária)

### Instalação

```b
git clone https://github.com/edutrindade/teddy-mobile.git
cd teddy-mobile
npm install
```

### Rodando no iOS (necessário MacOS)

```bash
npm start (pressione I quando carregar)
ou npm run ios
```

### Rodando no Android

```bash
npm start (pressione A quando carregar)
ou npm run android
```

---

## 🧪 Testes

* **Unitários:** Cobertura focada nas telas e repositórios.
* **End-to-End:** Automação de fluxo crítico do app via Detox no Android.

Para executar os testes unitários:

```
npm run test:coverage
```

Para rodar os testes e2e (Android), lembrando de configurar seu dispositivo no .detoxrc.js:

```n
npm run detox:build
npm run detox:test
```



---



## ⚙️ Decisões Técnicas

* **Componentização:** Cada tela e componente possui responsabilidade única e clara para facilitar manutenção e reuso.
* **Cache de dados:** Uso do padrão Repository para acesso ao AsyncStorage, abstraindo detalhes de implementação.
* **Gerenciamento de estado:** Uso do React `useState` e `useEffect` para simplicidade neste projeto, garantindo performance e clareza.
* **Estrutura de pastas:** Organização clara entre apresentação e infraestrutura para escalabilidade.
* **Testes:** Investimento em testes para confiabilidade e facilidade de refatoração.
* **Padrão de commits:** Mensagens descritivas e padronizadas para histórico organizado e rastreável.

---

## 🎥 Demonstração

Confira o vídeo demonstrativo da aplicação, onde explico as principais funcionalidades e as decisões técnicas tomadas durante o desenvolvimento:

[![Veja o vídeo](https://img.youtube.com/vi/seu_video_id/maxresdefault.jpg)](https://youtu.be/seu_video_id)

---

Espero que gostem **😁**
