# Sistema de Manutenção - Web 2

Projeto desenvolvido para a disciplina de Desenvolvimento Web 2 do curso de Tecnologia em Análise e Desenvolvimento de Sistemas da Universidade Federal do Paraná (UFPR).

O objetivo é criar um sistema completo para gerenciamento de ordens de serviço de manutenção, utilizando uma arquitetura moderna com frontend desacoplado do backend.

## ✨ Tecnologias Utilizadas

Este projeto foi construído com as seguintes tecnologias:

-   **Frontend:** [Angular 19](https://v19.angular.dev/overview)
-   **Backend:** [Spring Boot 3](https://spring.io/projects/spring-boot)
-   **Banco de Dados:** [MySQL](https://www.mysql.com/)

## 📋 Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
*   [JDK 21 (LTS)](https://www.oracle.com/java/technologies/downloads/)
*   [Node.js 20.+ e npm](https://nodejs.org/en/)
*   [Angular CLI 19](https://angular.io/cli)
*   [MySQL Server](https://dev.mysql.com/downloads/mysql/)
*   Uma IDE de sua preferência (ex: VS Code, IntelliJ IDEA)

## 🚀 Rodando o Projeto

Siga os passos abaixo para executar o projeto localmente.

### 1. Clonar o Repositório
```bash
git clone https://github.com/EduKaique/sistema-manutencao-angular-spring
cd ./sistema-manutencao-angular-spring
```

### 2. Configurar o Backend (Spring Boot)
1.  Abra a pasta do projeto backend (ex: `/api`) na sua IDE.
2.  Configure as credenciais do seu banco de dados no arquivo `src/main/resources/application.properties`.
    ```properties
    spring.datasource.url=jdbc:mysql://localhost:3306/seu_banco_de_dados
    spring.datasource.username=seu_usuario
    spring.datasource.password=sua_senha
    spring.jpa.hibernate.ddl-auto=update
    ```
3.  Execute a aplicação a partir da sua IDE ou via linha de comando.

### 3. Configurar o Frontend (Angular)
1.  Abra um novo terminal e navegue até a pasta do projeto frontend (ex: `/client`).
2.  Instale as dependências do Node.js:
    ```bash
    npm install
    ```
3.  Inicie o servidor de desenvolvimento do Angular:
    ```bash
    ng serve
    ```
4.  Acesse `http://localhost:4200/` no seu navegador para ver a aplicação em funcionamento.

---

Desenvolvido para a disciplina de Desenvolvimento Web 2 - UFPR.
