# FrontEnd

Esse projeto é o front-end de um sistema de manuntenção de equipamentos e foi gerado pelo [Angular CLI](https://github.com/angular/angular-cli) na versão 19+.

O projeto utiliza uma arquitetura baseada em funcionalidades (Feature-based architecture) para garantir escalabilidade e manutenibilidade.

## 🚀 Primeiros Passos

Siga os passos abaixo para configurar e executar o projeto localmente.

### Pré-requisitos

- Node.js: Versão 20.x ou superior. No desenvolvimento foi utilizado a 20.12.2.
- Angular CLI: npm install -g @angular/cli@19

```bash
cd ./front-end/
```

```bash
npm install
```

```bash
ng serve
```

Após executar o comando, acesse http://localhost:4200/ no seu navegador. A aplicação recarregará automaticamente sempre que você alterar os arquivos do projeto.

## ⚙️ Comandos Úteis

Utilize o Angular CLI para agilizar o desenvolvimento e manter a padronização do código. O comando principal é o ng generate, que pode ser abreviado para ng g.

```bash
# Exemplo: Criando uma página no módulo de cliente
ng g c features/client/minha-nova-pagina
```

```bash
# Serviços ficam centralizados na pasta core
ng g s core/services/meu-novo-servico
```

```bash
# Models reutilizáveis ficam na pasta shared
ng g i shared/models/meu-novo-model
```

## 📦 Organização das pastas

A estrutura de pastas foi pensada para organizar o código por funcionalidade de negócio, facilitando a localização de arquivos e a colaboração. 

Link de Referência para definir a estrutura das pastas [Angular Folder Structure Guide](https://www.angular.courses/blog/angular-folder-structure-guide) e [Angular Best Practices](https://www.thinkitive.com/blog/angular-best-practices-tips-for-project-structure-and-organization/)

```
src/
├── app/
│    ├── core/
│    │    ├── auth/
│    │    │   └── pages/    
│    │    │       ├── login-page/           
│    │    │       └── self-registration-page/ 
│    │    │
│    │    ├── interceptors/
│    │    │
│    │    ├── layout/
│    │    │   ├── header/               
│    │    │   ├── footer/               
│    │    │   └── side-bar/          
│    │    │
│    │    └── services/
│    │
│    ├── features/
│    │    ├── client/
│    │    │   ├── client-dashboard-page/    
│    │    │   │
│    │    │   ├── new-request-page/        
│    │    │   │
│    │    │   └── request-detail-page/      
│    │    │
│    │    └── employee/
│    │        ├── employee-dashboard-page/  
│    │        │
│    │        ├── request-management/
│    │        │   ├── all-requests-page/      
│    │        │   ├── budgeting-page/         
│    │        │   └── maintenance-page/      
│    │        │
│    │        ├── admin/
│    │        │   ├── manage-categories-page/ 
│    │        │   └── manage-employees-page/  
│    │        │
│    │        └── reports/
│    │            └── reports-page/           
│    │
│    └── shared/
│        ├── components/
│        │
│        ├── directives/
│        │
│        ├── pipes/
│        │
│        └── utils/
│
├── assets/
│    ├── icons/
│    │
│    ├── illustraions/
│    │
│    └── images/
│
└── styles/
```