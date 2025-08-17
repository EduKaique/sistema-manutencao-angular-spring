# FrontEnd

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.15.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

src/app/features/
├── auth/
│   ├── login-page/           # RF002: Página de login, que usa o AuthService
│   └── self-registration-page/ # RF001: Página de autocadastro, que usa o AuthService e o ViaCepService
│
├── client/
│   ├── client-dashboard-page/    # RF003: Página principal do cliente, exibe a lista de suas solicitações
│   │   └── components/
│   │       └── request-list/     # Tabela/lista que mostra as solicitações e os botões de ação
│   │
│   ├── new-request-page/         # RF004: Página com o formulário para criar uma nova solicitação
│   │
│   └── request-detail-page/      # RF005-RF010: Página para visualizar, aprovar/rejeitar, pagar uma solicitação
│       └── components/
│           ├── approve-reject-panel/ # RF005: Painel com os dados do orçamento e botões
│           ├── reject-reason-form/   # RF007: Formulário para justificar a rejeição
│           └── payment-panel/        # RF010: Painel para confirmação de pagamento
│
└── employee/
    ├── employee-dashboard-page/  # RF011: Página principal do funcionário (solicitações em ABERTO)
    │
    ├── request-management/
    │   ├── all-requests-page/      # RF013: Página que lista TODAS as solicitações com filtros
    │   ├── budgeting-page/         # RF012: Página para o funcionário efetuar o orçamento
    │   └── maintenance-page/       # RF014, RF015, RF016: Página para efetuar/redirecionar/finalizar a manutenção
    │
    ├── admin/
    │   ├── manage-categories-page/ # RF017: Página com a tabela e formulários para o CRUD de categorias
    │   └── manage-employees-page/  # RF018: Página para o CRUD de funcionários
    │
    └── reports/
        └── reports-page/           # RF019, RF020: Página com filtros para gerar os relatórios em PDF

src/app/shared/
├── components/
│   ├── confirmation-dialog/  # Componente genérico de diálogo para confirmar remoções/ações
│   ├── request-history-timeline/ # RF008: Timeline visual do histórico, pode ser usada pelo cliente e funcionário
│   └── loading-spinner/      # (Recomendado) Indicador de carregamento para usar enquanto espera a API
│
├── directives/
│   └── request-status-color.directive.ts # RF013: (Opcional) Diretiva para aplicar a cor de fundo em um item de lista com base no estado da solicitação
│
├── pipes/
│   ├── brl-date.pipe.ts      # Formata datas para o padrão brasileiro (dd/MM/yyyy HH:mm)
│   └── brl-currency.pipe.ts  # Formata números para o padrão de moeda R$
│
└── utils/
    └── cpf-validator.ts      # (Recomendado) Função com a lógica de validação de CPF para formulários reativos


src/app/core/
├── auth/
│   ├── auth.guard.ts         # RF-Login: Impede acesso a rotas sem login
│   ├── client.guard.ts       # RF-Cliente: Impede que funcionários acessem rotas de clientes
│   └── employee.guard.ts     # RF-Funcionário: Impede que clientes acessem rotas de funcionários
│
├── interceptors/
│   └── auth.interceptor.ts   # Intercepta todas as chamadas HTTP para adicionar o token de autenticação
│
├── layout/
│   ├── header/               # Componente do cabeçalho principal (logo, nome do usuário, botão de logout)
│   ├── footer/               # Componente do rodapé
│   └── main-layout/          # Componente que organiza header, footer e o conteúdo principal (<router-outlet>)
│
└── services/
    ├── auth.service.ts       # RF001, RF002: Lógica de login, logout, autocadastro e gerenciamento do usuário logado
    ├── viacep.service.ts     # RF001: Lógica para consultar a API ViaCEP
    ├── request.service.ts    # Lógica central para todas as operações de solicitações (CRUD, alterar estado, etc.)
    ├── category.service.ts   # RF017: Lógica para o CRUD de Categorias
    ├── employee.service.ts   # RF018: Lógica para o CRUD de Funcionários
    ├── report.service.ts     # RF019, RF020: Lógica para buscar os dados dos relatórios
    └── notification.service.ts # (Recomendado) Serviço para exibir notificações (toasts)