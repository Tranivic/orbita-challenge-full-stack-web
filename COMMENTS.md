
# Comentários sobre a Arquitetura do Projeto

  

## Arquitetura do Sistema

  

O backend do sistema foi desenvolvido utilizando **Node.js** com **Express.js**, proporcionando a base da  API RESTful. A arquitetura segue o padrão **MVC (Model-View-Controller)**, mas com uma abordagem mais funcional, focando na modularidade e reutilização de código. A lógica de negócio está organizada em **controllers**, que gerenciam as requisições HTTP, e **models**, que interagem com o banco de dados por meio do **Prisma**.

O frontend do sistema foi desenvolvido utilizando **Nuxt 3** como ferramenta para o SSR

  

### Frontend

  
  

-  **Nuxt 3**: Framework baseado em Vue.js para renderização server-side e geração estática.

-  **Vuetify**: Biblioteca de componentes para interface gráfica.

-  **Maska**: Biblioteca para aplicação de máscaras em inputs.

  

### Backend

  

-  **Express.js**: Framework para criação de APIs RESTful.

-  **Prisma ORM**: Interação com o banco de dados de forma otimizada.

-  **CORS**: Configuração de acessos entre diferentes origens.

-  **Express Rate Limit**: Implementação de limites de requisições para segurança.

-  **Multer**: Middleware para manipulação de uploads de arquivos.

-  **Validator**: Biblioteca para validação de entradas do usuário.

  

## Tecnologias Utilizadas

  

### Frontend

  

#### Dependências:

  

-  `@mdi/font`: Conjunto de ícones Material Design.

-  `maska`: Aplicação de máscaras em inputs.

-  `nuxt`: Framework Vue.js para desenvolvimento SSR e SSG.

-  `vue`: Biblioteca para criação de interfaces reativas.

-  `vue-router`: Gerenciamento de rotas Vue.js.

  

#### Dependências de Desenvolvimento:

  

-  `vite-plugin-vuetify`: Integração do Vuetify com Vite.

-  `vuetify`: Biblioteca de componentes UI.

  

### Backend

  

#### Dependências:

  

-  `@prisma/client`: Cliente do Prisma ORM.

-  `cors`: Controle de acesso entre origens.

-  `express`: Framework para criação de APIs.

-  `express-rate-limit`: Proteção contra ataques DDoS.

-  `multer`: Middleware para upload de arquivos.

-  `validator`: Biblioteca de validação de dados.

  

#### Dependências de Desenvolvimento:

  

-  `nodemon`: Reinicia o servidor automaticamente durante o desenvolvimento.

-  `prisma`: Ferramentas de gerenciamento do ORM Prisma.

-  `vitest`: Framework de testes unitários.

-

 ### O que Eu Melhoraria se Tivesse Mais Tempo

  

Se eu tivesse mais tempo para aprimorar o projeto, faria diversas melhorias tanto no front-end quanto no back-end, focando em qualidade, segurança e experiência do usuário.

  

-  **Testes End-to-End:** Implementaria testes E2E utilizando Cypress para garantir a robustez e confiabilidade das funcionalidades do front-end. Isso permitiria validar fluxos críticos da aplicação, evitando falhas em produção.

-  **Autenticação Segura:** Adicionaria um sistema de autenticação utilizando JWT (JSON Web Token), garantindo um controle de acesso seguro e eficiente. Isso ajudaria a proteger as rotas e os dados dos usuários.

-  **Lista de Alunos Melhorada:** Refatoraria a lista de alunos para que utilizasse paginação e rotas dinâmicas, em vez de ser renderizada apenas no SSR (Server-Side Rendering). Isso tornaria a navegação mais fluida e eficiente.

-  **Segurança do Backend:** Fortaleceria a camada de segurança do backend, implementando melhores práticas para proteção contra vulnerabilidades, como injeção de SQL, CSRF e XSS. Além disso, revisaria o controle de permissões e a criptografia de dados sensíveis.

-  **Documentação e Ambiente de Desenvolvimento Padronizado:** Aprimoraria a documentação do projeto, tornando-a mais clara, detalhada e acessível, facilitando a integração de novos desenvolvedores. Configuraria um ambiente completo e padronizado com Docker Compose e um Dockerfile, permitindo que o projeto fosse inicializado automaticamente com todas as suas dependências, reduzindo o tempo de configuração e minimizando erros de ambiente.

  

### Requisitos Obrigatórios que Não Foram Entregues

  

A **autenticação de usuários administrativo** não foi implementada.