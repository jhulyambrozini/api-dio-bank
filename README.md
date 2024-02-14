# API DIO BANK
Este projeto foi feito durante o curso de Fullstalk Typescript da DIO.

Ele consiste em uma API para criação e autenticação de usuários, possui rotas de:
- Criar uma usuário (POST: /user): Devolve uma mensagem de sucesso e o id do usuário criado
- Pegar o token do usuário (POST: /login): Gerar o token do usuário com o email e password do usuário
- Buscar por um usuário (GET: user/:uid): Rota protegida por autenticação, é precido enviar o token do usuário no Header da requisição.
- Deletar um usuário (DELETE: user/:uid)

## Tecnologias usadas
- **Node.js**:
Um ambiente de tempo de execução JavaScript que permite aos desenvolvedores executar código JavaScript no lado do servidor. Node.js é conhecido por sua escalabilidade e eficiência, sendo amplamente utilizado para construir aplicativos da web e APIs.

- **TypeScript**:
Uma linguagem de programação de código aberto que é uma superset da linguagem JavaScript. TypeScript adiciona tipagem estática opcional e outros recursos avançados para ajudar os desenvolvedores a escreverem código mais seguro e escalável.

- **Express**:
Um popular framework web para Node.js, projetado para simplificar o desenvolvimento de aplicativos web e APIs. Ele fornece uma estrutura simples e flexível para criar servidores HTTP, gerenciar rotas, lidar com solicitações e respostas, bem como interagir com bancos de dados e outros serviços externos.

- **SQLite**:
Um sistema de gerenciamento de banco de dados relacional leve, amplamente utilizado em aplicativos que necessitam de uma solução de armazenamento de dados local ou de pequeno porte. Ele é autocontido, não requer um servidor separado e é ideal para desenvolvimento rápido de aplicativos e prototipagem.

- **TypeORM**:
Uma biblioteca de ORM (Object-Relational Mapping) para TypeScript e JavaScript que simplifica a interação com bancos de dados relacionais. Ele permite que os desenvolvedores escrevam consultas usando objetos e classes, em vez de SQL direto, o que torna o desenvolvimento de aplicativos baseados em banco de dados mais intuitivo e produtivo.

- **Jest**:
Um framework de testes para JavaScript, especialmente popular entre desenvolvedores que trabalham com o ambiente Node.js. Ele oferece uma ampla gama de recursos para testar código JavaScript de forma eficiente e confiável, incluindo suporte para testes unitários, testes de integração e testes de snapshot.

- **JSON Web Token (JWT)**:
É um padrão aberto (RFC 7519) que define um formato compacto e autossuficiente para transmitir informações com segurança entre partes como um objeto JSON. Eles são comumente usados para autenticação e autorização em aplicativos web e APIs, permitindo que os usuários se identifiquem de forma segura e eficiente, sem a necessidade de manter o estado da sessão no servidor.

- **HTTP (Hypertext Transfer Protocol)**:
Um protocolo de comunicação utilizado para transferir dados pela World Wide Web. HTTP define os métodos de requisição e resposta entre clientes e servidores web, permitindo a transferência de recursos da web.

## Execução
- 1 Dá um fork neste repositório
- 2 Clone ou baixe o seu repositório fork
- 3 Abra seu terminal e navegue até a pasta do projeto
- 4 Rode o commando `npm i` ou `npm install` para baixar as dependências
- 5 Rode o commando `npm run dev` para iniciar a API em modo de desenvolvimmento
