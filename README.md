# Desafio-Fullstack-cadastro-e-login

O objetivo desse desafio é construir uma aplicação semelhante a uma agenda, cadastrando usuários e seus respectivos contatos.

## 🚀 Começando

Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e teste.

Consulte **[Implantação](#-implanta%C3%A7%C3%A3o)** para saber como implantar o projeto.

### 📋 Pré-requisitos

De que coisas você precisa para instalar o software e como instalá-lo?

```
- Editor de texto (IDE) preferencialmente VScode pois foi nele que a aplicação foi desenvolvida
- Uma ferramenta de teste e depuração de APIs para testes (Opicional)
```

### 🔧 Instalação

Uma série de exemplos passo-a-passo que informam o que você deve executar para ter um ambiente de desenvolvimento em execução.

Clonar o Repositório :

```
- Clique no botão (<>code) e copie e chave SSH
```

Salvar uma copia do projeto em sua máquina:

```
- Abra o diretorio onde será salvo o projeto e abra o terminal nesse diretório
- Rode o comando: git clone (chave SSH copiada)
- Após isso você terá uma copia totalmente editavel de todo o projeto em sua maquina
```

## 📦 Implantação

Manipulando o arquivo .env

```
- Crie um arquivo chamado .env na raiz do projeto
- Dentro dele crie as variáveis de ambiente seguindo o padrão do arquivo .env.example
- Configure suas variáveis de ambiente com suas credenciais do PostgreSQL e um novo banco de dados para estar utilizando no projeto.

- ATENÇÃO: Para que o servidor funcione corretamente as credenciais do arquivo .env devem estar exatamente iguais as credenciais do seu banco de dados PostegreSQL e não se esqueça de salvar o arquivo 
```

Instalando as dependências necessárias para executar o servidor local 

```
- Na raiz do projeto abra o terminal
- Em seguida instale as dependências do servidor com o comando: npm install
```

Executando as migrações

```
- Ainda com o terminal aberto, execute as migrações com o comando: npm run typeorm migration:run -- -d src/data-source
```

Executando o servidor localmente 

```
- Ainda com o terminal aberto, execute o servidor localmente com o comando: npm run dev 
```

## 🛠️ Construído com

Ferramentas e tecnologias usadas na criação do projeto

* [Node](https://nodejs.org/pt-br) - O framework Back-end 
* [Typescript](https://www.typescriptlang.org) - Linguagem de programação
* [PostgreSQL](https://www.postgresql.org) - Gerenciador de banco de dados
* [Insomnia](https://insomnia.rest) - Software para debug de requisições HTTP
* [VScode](https://code.visualstudio.com) - Editor de texto (IDE)
* [Dbeaver](https://dbeaver.io) - Vizualizador de banco de dados 

## ✒️ Autor

*  [Samuel Portela](https://github.com/Samuel-3004)

Se você tiver alguma dúvida, sugestão ou feedback sobre a API,
sinta-se à vontade para entrar em contato com o desenvolvedor mencionado acima.

