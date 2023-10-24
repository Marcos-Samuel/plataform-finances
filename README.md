# Apresentação do Projeto: Controle de Finanças Pessoais (MoneyFacil)

## Tecnologias Utilizadas

Neste projeto, foram utilizadas as seguintes tecnologias e ferramentas:

- React.js: Biblioteca JavaScript utilizada para construir a interface do usuário.
- React Hook Form: Biblioteca utilizada para lidar com formulários de forma simples e eficiente no React.
- React DOM: Biblioteca que fornece métodos para manipulação do DOM no React.
- CSS: Linguagem de estilização utilizada para criar o layout e o design da aplicação.
- Figma: Ferramenta de design utilizada para criar o layout da aplicação.
- API RESTful: Backend da aplicação desenvolvido utilizando uma API RESTful para a comunicação com o servidor e o banco de dados.
- Git: Sistema de controle de versão utilizado para gerenciar o código-fonte do projeto.
- GitHub: Plataforma de hospedagem de código onde o projeto foi armazenado e versionado.
- Axios: Biblioteca JavaScript utilizada para fazer requisições HTTP para a API.
- Moment.js: Biblioteca JavaScript utilizada para manipulação de datas e formatação de tempo.
- localStorage: Recurso do navegador utilizado para armazenar informações localmente no dispositivo do usuário.

Essas são as tecnologias e bibliotecas adicionais que foram utilizadas no projeto para facilitar o gerenciamento de formulários (React Hook Form) e manipulação do DOM (React DOM) em conjunto com o React.js.

---
Olá, bem-vindo à apresentação do projeto "Controle de Finanças Pessoais" (DinDin 2.0)! Neste projeto, desenvolvemos uma aplicação web que permite aos usuários gerenciar suas finanças pessoais de forma fácil e eficiente.

## Layout e Funcionalidades

### Cadastro e Login de Usuário

O projeto começa com a funcionalidade de cadastro e login de usuário. Na página de cadastro, os usuários podem preencher um formulário com seus dados pessoais, como nome, e-mail e senha. Após o cadastro, eles podem fazer o login na aplicação usando suas credenciais.

![](https://i.imgur.com/BZNNvti.png)

### Página Principal (Main)

Após o login, os usuários são redirecionados para a página principal, onde encontrarão um dashboard completo com informações financeiras importantes. O cabeçalho da aplicação exibe o nome do usuário logado e permite que ele faça o logout da aplicação.

### Resumo das Transações

Na página principal, os usuários podem visualizar um resumo das suas transações, incluindo o total de entradas, o total de saídas e o saldo atual. Essas informações são obtidas através de uma chamada à API que traz o extrato das transações.

![](https://i.imgur.com/vvnluj6.png)

### Listagem de Transações

A tabela de listagem de transações exibe todas as transações registradas pelo usuário. Cada linha da tabela representa uma transação, com detalhes como data, dia da semana, descrição, categoria e valor. Os valores de entrada são exibidos em roxo e os valores de saída em laranja.

![](https://i.imgur.com/SYm8uuY.png)

### Cadastro, Edição e Exclusão de Transações

Os usuários podem adicionar novas transações clicando no botão "Adicionar Registro". Isso abrirá um modal onde eles podem preencher as informações da transação, como data, descrição, categoria e valor. Além disso, eles podem escolher se a transação é uma entrada ou saída de dinheiro.

![](https://i.imgur.com/10q85lh.png)
![](https://i.imgur.com/Ohhk1lhm.png)
Ao clicar no ícone de edição (lápis), os usuários podem editar uma transação existente através de um modal preenchido automaticamente com os dados da transação selecionada. Para excluir uma transação, basta clicar no ícone da lixeira e confirmar a exclusão no popup exibido.

![](https://i.imgur.com/crhos7x.png)
![](https://i.imgur.com/qMegn2n.png)
### Ordenação da Tabela por Data e Filtros 

Implementamos funcionalidades extras para melhorar a experiência do usuário. Os usuários podem ordenar a tabela de transações por data, clicando no cabeçalho da coluna "Data". Além disso, há uma opção para filtrar as transações por categoria, permitindo ao usuário visualizar apenas as transações de uma categoria específica.

### Edição do Perfil do Usuário 

Os usuários também podem editar o perfil, clicando no ícone correspondente no header da aplicação. Isso abrirá um modal onde eles podem atualizar suas informações pessoais, como nome, e-mail e senha.




## Conclusão

O projeto "Controle de Finanças Pessoais" (DinDin 2.0) é uma aplicação completa e intuitiva que permite aos usuários gerenciar suas finanças de forma prática e segura. Com funcionalidades essenciais, como cadastro de usuário, login, cadastro de transações e resumo financeiro, além de funcionalidades extras, como ordenação da tabela e edição do perfil, nossa aplicação oferece uma experiência rica para os usuários.

Esperamos que você tenha gostado de conhecer nosso projeto e que ele possa ser útil para auxiliar as pessoas a organizarem suas finanças de maneira eficiente. Agradecemos pela atenção e estamos à disposição para qualquer dúvida ou esclarecimento adicional. Obrigado!
