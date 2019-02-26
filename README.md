# Projeto Base - Node.js [![Build Status](https://travis-ci.com/darlannakamura/sample-app.svg?branch=master)](https://travis-ci.com/darlannakamura/sample-app)


## Sobre
Este é um projeto para ser utilizado como base e exemplo, a fins de aprendizado para quem desejar aprender **Node.js** e **Express**.
O projeto possui as seguintes funcionalidades:
- registro de usuário (com nome, e-mail, cpf e senha)
- recuperação de senha enviando e-mail
- autenticação (com e-mail e senha, retornando um jwt)


Além dessas funcionalidades, busca-se ensinar a realizar o **deploy** no [Heroku](heroku.com) e configurar o [Travis CI](travis-ci.com) para realizar a integração contínua, através dos testes unitários do diretório `test`.

## Demo
Para ver o demo da aplicação, clique neste [link](https://nodejs-exemplo.herokuapp.com).

## Configurações

### Pré-requisitos
Nós assumimos que você já tem o [node.js](https://nodejs.org) e o [npm](https://www.npmjs.com) em sua máquina.
Abra seu terminal e execute os comandos abaixo para realizar a instalação do projeto.

#### Clonando o Projeto
Para obter o projeto, é necessário cloná-lo em sua máquina através do comando:

	git clone https://github.com/darlannakamura/sample-app.git

#### Navegando Para o Diretório
Antes de instalar as dependências, é necessário navegar para o diretório clonado com o comando:

	cd sample-app

#### Instalando as Dependências
Para instalar as dependências, execute o comando:

	npm install

#### Configurando Variáveis de Ambiente
Temos aqui quatro variávies que devem ser setadas para a aplicação funcionar.

##### Salt Key
A primeira delas é a `SALT_KEY`, que será utilizada como dado adicional à senha, para defender de ataques de dicionário. Portanto, gere uma sequência aleatória de letras e números para adicionar à sua `SALT_KEY`.

Exemplo de Salt Key: 

	zKOVGI8ziVpY5eN6S8TO3s33EzeGfSMrTiiaSDWQEucExyNSMrTiiAxndw8Zl7TQABD3oQhCfcF4BsZrObrFEyA5qE

##### Strings de Conexão do MongoDB
A segunda e a terceira, `CONNECTION_STRING_TEST` e `CONNECTION_STRING_PROD`, são variáveis de conexão do MongoDB, onde se segue o formato: 

	mongodb://<usuario>:<senha>@<host>:<porta>/<banco-de-dados>

A `CONNECTION_STRING_TEST` deve conter a conexão para um banco de dados que será utilizado para teste, enquanto a `CONNECTION_STRING_PROD` deve conter a conexão para o banco de dados de produção.

##### SendGrid Key
A última é a `SENDGRID_KEY`, que é a `KEY` fornecida pelo [**SendGrid**](https://sendgrid.com) para utilizar a API em sua aplicação (disponível em Settings/API Keys).

#### Setando variáveis de ambiente

##### Windows
Para setar as variáveis de ambiente no Windows, basta digitar no terminal:

	set NOME_DA_VARIAVEL_DE_AMBIENTE=VALOR

Onde `NOME_DA_VARIAVEL_DE_AMBIENTE` deve ser substituído pelo nome da variável e `VALOR` pelo valor que você deseja que a variável receba.

##### Linux
Para setar as variáveis de ambiente no Linux, basta digitar no terminal:

	export NOME_DA_VARIAVEL_DE_AMBIENTE="VALOR"

Onde `NOME_DA_VARIAVEL_DE_AMBIENTE` deve ser substituído pelo nome da variável e `VALOR` pelo valor que você deseja que a variável receba.

### Iniciando o Projeto
Inicie o projeto com o comando:

	npm start

### Rodando os Testes
Este comando vai rodar os testes unitários do servidor, que estão dentro do diretório `test`:

	npm test

### Deploy
Para realizar o deploy no [Heroku](https://heroku.com), é necessário:
- criar conta
- clicar em `new`->`create app`
- Selecionar [GitHub](https://github.com) como **Deployment Method**
- Escolher a branch para realizar o deploy
- Clicar em **deploy branch**

### Autor
- [Darlan Nakamura](https://github.com/darlannakamura)

### Contribua
Encontrou um erro?
Quer contribuir para o projeto?
Deixe seu **Pull Request**!!
