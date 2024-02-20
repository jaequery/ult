<p align="center">
  <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" />
</p>
<p align="center">
    <h1 align="center">ULTIMA</h1>
</p>
<p align="center">
    <em>Ultima: Empowering seamless app experiences effortlessly.</em>
</p>
<p align="center">
	<img src="https://img.shields.io/github/license/jaequery/ultima?style=flat&color=0080ff" alt="license">
	<img src="https://img.shields.io/github/last-commit/jaequery/ultima?style=flat&logo=git&logoColor=white&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/jaequery/ultima?style=flat&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/jaequery/ultima?style=flat&color=0080ff" alt="repo-language-count">
<p>
<p align="center">
		<em>Developed with the software and tools below.</em>
</p>
<p align="center">
	<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat&logo=JavaScript&logoColor=black" alt="JavaScript">
	<img src="https://img.shields.io/badge/Prettier-F7B93E.svg?style=flat&logo=Prettier&logoColor=black" alt="Prettier">
	<img src="https://img.shields.io/badge/PostCSS-DD3A0A.svg?style=flat&logo=PostCSS&logoColor=white" alt="PostCSS">
	<img src="https://img.shields.io/badge/Autoprefixer-DD3735.svg?style=flat&logo=Autoprefixer&logoColor=white" alt="Autoprefixer">
	<img src="https://img.shields.io/badge/YAML-CB171E.svg?style=flat&logo=YAML&logoColor=white" alt="YAML">
	<img src="https://img.shields.io/badge/Jest-C21325.svg?style=flat&logo=Jest&logoColor=white" alt="Jest">
	<br>
	<img src="https://img.shields.io/badge/Webpack-8DD6F9.svg?style=flat&logo=Webpack&logoColor=black" alt="Webpack">
	<img src="https://img.shields.io/badge/React-61DAFB.svg?style=flat&logo=React&logoColor=black" alt="React">
	<img src="https://img.shields.io/badge/ESLint-4B32C3.svg?style=flat&logo=ESLint&logoColor=white" alt="ESLint">
	<img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=flat&logo=TypeScript&logoColor=white" alt="TypeScript">
	<img src="https://img.shields.io/badge/tsnode-3178C6.svg?style=flat&logo=ts-node&logoColor=white" alt="tsnode">
	<img src="https://img.shields.io/badge/JSON-000000.svg?style=flat&logo=JSON&logoColor=white" alt="JSON">
</p>
<hr>

##  Quick Links

> - [ Overview](#-overview)
> - [ Features](#-features)
> - [ Repository Structure](#-repository-structure)
> - [ Modules](#-modules)
> - [ Getting Started](#-getting-started)
>   - [ Installation](#-installation)
>   - [Running ultima](#-running-ultima)
>   - [ Tests](#-tests)
> - [ Project Roadmap](#-project-roadmap)
> - [ Contributing](#-contributing)
> - [ License](#-license)
> - [ Acknowledgments](#-acknowledgments)

---

##  Overview

Ultima is a comprehensive project aimed at facilitating seamless server-client communication and enhancing interactivity within its architecture. The project boasts robust server configurations managed through key files like `pnpm-lock.yaml` and `docker-compose.yml`, ensuring smooth app experiences. Ultima leverages technologies like TRPC and Next.js to enable type-safe API calls and client-server interactions. With a focus on managing dependencies and optimizing the workspace structure, Ultima offers a valuable proposition in providing a solid foundation for scalable and interactive web applications.

---

##  Features

|    | Feature          | Description |
|----|-------------------|---------------------------------------------------------------|
| ⚙️  | **Architecture**  | The project architecture utilizes Nest.js for the server-side application and Next.js for the frontend, facilitating a robust and scalable web application. It leverages type-safe communication between server and client using `trpc`. |
| 🔩 | **Code Quality**  | The codebase maintains high quality with TypeScript, ESLint, and Prettier enforcing coding standards. It utilizes linting rules, accurate type definitions, and consistent code formatting, ensuring robust and maintainable code. |
| 📄 | **Documentation** | The project has detailed documentation outlining setup, configurations, and key functionalities. It covers crucial aspects of development, aiding developers in understanding and contributing to the project effectively. |
| 🔌 | **Integrations**  | Key integrations include TypeORM for database management, Next.js for frontend development, Nest.js for server-side logic, and TRPC for type-safe API communication. These integrations enhance functionality and performance. |
| 🧩 | **Modularity**    | The codebase exhibits high modularity, with separate modules for user management, authentication, and API services. Components are structured for reusability and maintainability, promoting efficient code development. |
| 🧪 | **Testing**       | Testing frameworks like Jest and supertest are used for unit and integration testing. End-to-end testing is implemented to ensure the reliability and functionality of the application. |
| ⚡️  | **Performance**   | The project emphasizes performance with optimized code, efficient resource usage, and seamless client-server communication. It ensures fast response times and scalability under increased traffic and load. |
| 🛡️ | **Security**      | Security measures include bcrypt for password encryption, authorization controls, and data validation. SSL usage for secure connections and authentication mechanisms strengthen data protection and access control. |
| 📦 | **Dependencies**  | Key external libraries and dependencies include TypeORM, Next.js, Nest.js, TypeScript, React Query, and TRPC. These libraries enhance functionality, development efficiency, and performance optimization. |


---

##  Repository Structure

```sh
└── ultima/
    ├── apps
    │   ├── server
    │   │   ├── .env.development
    │   │   ├── .eslintrc.js
    │   │   ├── .prettierrc
    │   │   ├── README.md
    │   │   ├── db
    │   │   │   ├── config.ts
    │   │   │   └── migrations
    │   │   │       └── 1708322301807-create-users.ts
    │   │   ├── nest-cli.json
    │   │   ├── package.json
    │   │   ├── scripts
    │   │   │   └── db-seed.ts
    │   │   ├── src
    │   │   │   ├── app.controller.spec.ts
    │   │   │   ├── app.controller.ts
    │   │   │   ├── app.module.ts
    │   │   │   ├── app.service.ts
    │   │   │   ├── auth
    │   │   │   │   ├── auth.controller.spec.ts
    │   │   │   │   ├── auth.controller.ts
    │   │   │   │   ├── auth.module.ts
    │   │   │   │   ├── auth.service.spec.ts
    │   │   │   │   └── auth.service.ts
    │   │   │   ├── main.ts
    │   │   │   ├── trpc
    │   │   │   │   ├── trpc.module.ts
    │   │   │   │   ├── trpc.router.ts
    │   │   │   │   └── trpc.service.ts
    │   │   │   └── user
    │   │   │       ├── dto
    │   │   │       ├── user.controller.spec.ts
    │   │   │       ├── user.controller.ts
    │   │   │       ├── user.entity.ts
    │   │   │       ├── user.module.ts
    │   │   │       ├── user.router.ts
    │   │   │       ├── user.service.spec.ts
    │   │   │       └── user.service.ts
    │   │   ├── test
    │   │   │   ├── app.e2e-spec.ts
    │   │   │   └── jest-e2e.json
    │   │   ├── tsconfig.build.json
    │   │   └── tsconfig.json
    │   └── web
    │       ├── .eslintrc.json
    │       ├── .gitignore
    │       ├── README.md
    │       ├── app
    │       │   ├── favicon.ico
    │       │   ├── globals.css
    │       │   ├── layout.tsx
    │       │   ├── page.tsx
    │       │   ├── trpc.ts
    │       │   └── utils
    │       │       └── trpc-client.ts
    │       ├── components
    │       │   └── Home.tsx
    │       ├── hooks
    │       │   ├── useTrpcMutate.ts
    │       │   └── useTrpcQuery.ts
    │       ├── next.config.mjs
    │       ├── package-lock.json
    │       ├── package.json
    │       ├── postcss.config.js
    │       ├── public
    │       │   ├── next.svg
    │       │   └── vercel.svg
    │       ├── tailwind.config.ts
    │       └── tsconfig.json
    ├── docker-compose.yml
    ├── package.json
    ├── pnpm-lock.yaml
    ├── pnpm-workspace.yaml
    └── tsconfig.json
```

---

##  Modules

<details closed><summary>.</summary>

| File                                                                                      | Summary                                                                                                                                                                                                                                                                                                                          |
| ---                                                                                       | ---                                                                                                                                                                                                                                                                                                                              |
| [pnpm-lock.yaml](https://github.com/jaequery/ultima/blob/master/pnpm-lock.yaml)           | Code snippet summary: Manages server configurations for Ultima app, enforcing linting rules and environment variables, supporting app functionality. A critical component in delivering seamless app experiences.                                                                                                                |
| [package.json](https://github.com/jaequery/ultima/blob/master/package.json)               | Code Summary:**In the `ultima` repository's `package.json`, the code snippet defines dependencies and key scripts for running the development environment in parallel using `pnpm`.---This summary highlights the essential role of managing dependencies and facilitating development processes within the `ultima` repository. |
| [tsconfig.json](https://github.com/jaequery/ultima/blob/master/tsconfig.json)             | Code Summary:** `trpc` module exposes standardized server-client communication behaviors, enabling type-safe API calls between server and web components for seamless interactivity in Ultima's repository architecture.                                                                                                         |
| [docker-compose.yml](https://github.com/jaequery/ultima/blob/master/docker-compose.yml)   | Code snippet in `docker-compose.yml` manages a PostgreSQL container for the `ultima` repository's server app, defining DB settings and networking.                                                                                                                                                                               |
| [pnpm-workspace.yaml](https://github.com/jaequery/ultima/blob/master/pnpm-workspace.yaml) | Code snippet in `pnpm-workspace.yaml` configures workspace to manage all packages within `apps` directory, optimizing dependencies across the Ultima repository architecture.                                                                                                                                                    |

</details>

<details closed><summary>apps.web</summary>

| File                                                                                             | Summary                                                                                                                                                                                                                          |
| ---                                                                                              | ---                                                                                                                                                                                                                              |
| [next.config.mjs](https://github.com/jaequery/ultima/blob/master/apps/web/next.config.mjs)       | Code snippet in `next.config.mjs` in `apps/web` configures Next.js settings. It influences how web app behaves and interacts in the Ultima repository's architecture.                                                            |
| [tailwind.config.ts](https://github.com/jaequery/ultima/blob/master/apps/web/tailwind.config.ts) | Code Summary:**Manages Tailwind CSS config for the web app in ultima repository. Defines content paths and extends theme with radial and conic gradients. Key for styling consistency.                                           |
| [package-lock.json](https://github.com/jaequery/ultima/blob/master/apps/web/package-lock.json)   | Code snippet plays a critical role in ultima/server app within the repo. Manages database configurations and migrations for the server application, enhancing its functionality and maintaining data integrity.                  |
| [package.json](https://github.com/jaequery/ultima/blob/master/apps/web/package.json)             | Summary:**This code snippet in `web` serves as the frontend for Ultima. It uses Next.js and TRPC for client-server communication, with React Query for state management. Key dependencies include TRPC, Next.js, React, and Zod. |
| [tsconfig.json](https://github.com/jaequery/ultima/blob/master/apps/web/tsconfig.json)           | Code snippet in `apps/web/tsconfig.json` configures TypeScript for web app (`apps/web`) in Ultima repository. It sets target to ES5, JSX preservation, strict typing, and Next.js plugin integration.                            |
| [postcss.config.js](https://github.com/jaequery/ultima/blob/master/apps/web/postcss.config.js)   | Code in `apps/web/postcss.config.js` configures Tailwind CSS and Autoprefixer plugins for the web app build process in the Ultima repository. This snippet enhances styling and ensures cross-browser compatibility.             |
| [.eslintrc.json](https://github.com/jaequery/ultima/blob/master/apps/web/.eslintrc.json)         | Code Summary:**The `.eslintrc.json` file in `apps/web` extends `next/core-web-vitals`. It enforces web vital metrics in the frontend web application within the Ultima repository.                                               |

</details>

<details closed><summary>apps.web.app</summary>

| File                                                                                   | Summary                                                                                                                                                                                                                                                                 |
| ---                                                                                    | ---                                                                                                                                                                                                                                                                     |
| [trpc.ts](https://github.com/jaequery/ultima/blob/master/apps/web/app/trpc.ts)         | Code Summary:**`trpc.ts` file in `apps/web` communicates with the server's `trpc.router`. It creates a TRPC proxy client using HTTP requests to `localhost:3000`.                                                                                                       |
| [layout.tsx](https://github.com/jaequery/ultima/blob/master/apps/web/app/layout.tsx)   | Code Summary**:In `/apps/web/app/layout.tsx`, the code sets metadata and defines the RootLayout for the web app using Next.js, applying global styles and font.                                                                                                         |
| [page.tsx](https://github.com/jaequery/ultima/blob/master/apps/web/app/page.tsx)       | Code in _apps/web/app/page.tsx_ leverages _Home_ component from _@web/components_ to render the homepage. This snippet focuses on UI presentation by utilizing modular components within the web application.                                                           |
| [globals.css](https://github.com/jaequery/ultima/blob/master/apps/web/app/globals.css) | Code Summary:** `apps/server/src/trpc/trpc.service.ts`Manages bidirectional tRPC communication. Facilitates client-server interactions using type-safe methods. Enhances codebase modularity and communication reliability within the parent repository's architecture. |

</details>

<details closed><summary>apps.web.app.utils</summary>

| File                                                                                               | Summary                                                                                                                                                                            |
| ---                                                                                                | ---                                                                                                                                                                                |
| [trpc-client.ts](https://github.com/jaequery/ultima/blob/master/apps/web/app/utils/trpc-client.ts) | Summary**: `trpc-client.ts` in `apps/web` utilizes `@trpc/react` hooks with `AppRouter` from `server` to create query hooks for the frontend app, integrating server-side routing. |

</details>

<details closed><summary>apps.web.components</summary>

| File                                                                                    | Summary                                                                                                                                                                                                                |
| ---                                                                                     | ---                                                                                                                                                                                                                    |
| [Home.tsx](https://github.com/jaequery/ultima/blob/master/apps/web/components/Home.tsx) | Code in `Home.tsx` manages user data interactions via `trpc` API calls. Handles user creation and removal. Utilizes custom hooks for data fetching and mutation, ensuring seamless user management within the web app. |

</details>

<details closed><summary>apps.web.hooks</summary>

| File                                                                                               | Summary                                                                                                                                                                                                                                                                     |
| ---                                                                                                | ---                                                                                                                                                                                                                                                                         |
| [useTrpcMutate.ts](https://github.com/jaequery/ultima/blob/master/apps/web/hooks/useTrpcMutate.ts) | Code in `useTrpcMutate.ts` manages mutation logic for async requests in parent repo's web app, handling loading states and error management. It abstracts these operations for reuse across components, enhancing performance and maintainability in the Ultima repository. |
| [useTrpcQuery.ts](https://github.com/jaequery/ultima/blob/master/apps/web/hooks/useTrpcQuery.ts)   | Code Summary:**`useTrpcQuery.ts` facilitates querying with optional parameters, managing loading states and errors for the React app. It enhances flexibility and usability within the app architecture.                                                                    |

</details>

<details closed><summary>apps.server</summary>

| File                                                                                                  | Summary                                                                                                                                                                                                                                                              |
| ---                                                                                                   | ---                                                                                                                                                                                                                                                                  |
| [nest-cli.json](https://github.com/jaequery/ultima/blob/master/apps/server/nest-cli.json)             | Code snippet in `nest-cli.json` configures Nest.js project settings, optimizing source location and compilation options for the server app within the `ultima` repository structure.                                                                                 |
| [package.json](https://github.com/jaequery/ultima/blob/master/apps/server/package.json)               | Code in `apps/server/src/trpc/trpc.service.ts` sets up bi-directional communication between client and server using tRPC. Enhances real-time data flow in the repository's microservice architecture.                                                                |
| [tsconfig.build.json](https://github.com/jaequery/ultima/blob/master/apps/server/tsconfig.build.json) | Code snippet in apps/server/tsconfig.build.json extends base settings and excludes unnecessary directories for building the server application in the ultima repository. This ensures optimized compilation without test and distribution files.                     |
| [.eslintrc.js](https://github.com/jaequery/ultima/blob/master/apps/server/.eslintrc.js)               | Code Summary:**Ensures consistent TypeScript code quality in server app. Configures ESLint with TypeScript parsing, recommended rules, and custom overrides for better maintainability. Manages Node.js environment specifics and ignores certain files for linting. |
| [tsconfig.json](https://github.com/jaequery/ultima/blob/master/apps/server/tsconfig.json)             | Code in apps/server/tsconfig.json extends parent config, compiles TypeScript files to commonjs modules with ES module interop, declarations, and source maps, targeting ES2017 for an outDir at./dist.                                                               |
| [.env.development](https://github.com/jaequery/ultima/blob/master/apps/server/.env.development)       | Code snippet in `.env.development` configures server environment variables for the PostgreSQL database in the `server` app, enabling connection settings like host, port, user, password, and SSL usage.                                                             |

</details>

<details closed><summary>apps.server.test</summary>

| File                                                                                               | Summary                                                                                                                                                                                                                    |
| ---                                                                                                | ---                                                                                                                                                                                                                        |
| [app.e2e-spec.ts](https://github.com/jaequery/ultima/blob/master/apps/server/test/app.e2e-spec.ts) | Code Summary:**📂 `apps/server/test/app.e2e-spec.ts` verifies `AppController` functionality. Imports `@nestjs` test utilities, conducts e2e testing on HTTP GET request / ensuring response Hello World!#nestjs #e2eTesting |
| [jest-e2e.json](https://github.com/jaequery/ultima/blob/master/apps/server/test/jest-e2e.json)     | Code in `jest-e2e.json` sets up end-to-end testing for the server app using TypeScript with Node environment. It defines test file extensions, directory, and transformation rules.                                        |

</details>

<details closed><summary>apps.server.scripts</summary>

| File                                                                                        | Summary                                                                                                                                                                                     |
| ---                                                                                         | ---                                                                                                                                                                                         |
| [db-seed.ts](https://github.com/jaequery/ultima/blob/master/apps/server/scripts/db-seed.ts) | Code in `db-seed.ts` populates DB with a new user, benchmarked for duration, leveraging NestJS, TypeORM in the ultima app repo. It handles errors gracefully and is crucial for data setup. |

</details>

<details closed><summary>apps.server.db</summary>

| File                                                                                 | Summary                                                                                                                                                                            |
| ---                                                                                  | ---                                                                                                                                                                                |
| [config.ts](https://github.com/jaequery/ultima/blob/master/apps/server/db/config.ts) | Code: apps/server/db/config.ts**Configures TypeORM with DB connection and seeding options. Manages data sources for the server app. Enables entity mapping and migration handling. |

</details>

<details closed><summary>apps.server.db.migrations</summary>

| File                                                                                                                                    | Summary                                                                                                                                                                                 |
| ---                                                                                                                                     | ---                                                                                                                                                                                     |
| [1708322301807-create-users.ts](https://github.com/jaequery/ultima/blob/master/apps/server/db/migrations/1708322301807-create-users.ts) | Code snippet: `1708322301807-create-users.ts` in `ultima/apps/server/db/migrations`Creates & drops user table & unique email index using TypeORM migrations. Key for user data storage. |

</details>

<details closed><summary>apps.server.src</summary>

| File                                                                                                            | Summary                                                                                                                                                                                                                             |
| ---                                                                                                             | ---                                                                                                                                                                                                                                 |
| [main.ts](https://github.com/jaequery/ultima/blob/master/apps/server/src/main.ts)                               | Code Summary:**Main Role: Initializes a NestJS server with transaction handling and TRPC middleware. Enables CORS, starts server, logs URLs based on environment. Enhances server functionality within the repository architecture. |
| [app.service.ts](https://github.com/jaequery/ultima/blob/master/apps/server/src/app.service.ts)                 | Code snippet in `app.service.ts` defines an `AppService` with `getHello()` returning Hello World!. It plays a critical role in providing core functionality within the `ultima` repository's server architecture.                   |
| [app.module.ts](https://github.com/jaequery/ultima/blob/master/apps/server/src/app.module.ts)                   | App Module Configuration:**Manages NestJS modules, includes Auth, TypeORM setup, environment config validation, and user services for ultima server architecture.                                                                   |
| [app.controller.spec.ts](https://github.com/jaequery/ultima/blob/master/apps/server/src/app.controller.spec.ts) | Code snippet in `app.controller.spec.ts` tests `AppController` returning Hello World! using `AppService`. Validates core API functionality in the `server` app of the `ultima` repository.                                          |
| [app.controller.ts](https://github.com/jaequery/ultima/blob/master/apps/server/src/app.controller.ts)           | Code Summary:** The `AppController` fetches a greeting message from `AppService` in the NestJS server app. It handles GET requests returning a simple string response in the server's architecture.                                 |

</details>

<details closed><summary>apps.server.src.auth</summary>

| File                                                                                                                   | Summary                                                                                                                                                                                           |
| ---                                                                                                                    | ---                                                                                                                                                                                               |
| [auth.controller.ts](https://github.com/jaequery/ultima/blob/master/apps/server/src/auth/auth.controller.ts)           | Code Summary:**Controller handling authentication requests in `ultima` repository's server app. Utilizes `AuthService` for authentication operations. Maintains `/auth` endpoint functionalities. |
| [auth.service.ts](https://github.com/jaequery/ultima/blob/master/apps/server/src/auth/auth.service.ts)                 | Code Summary:** `auth.service.ts` in `server` app handles authentication logic. The `AuthService` class manages user authentication within the NestJS framework.                                  |
| [auth.service.spec.ts](https://github.com/jaequery/ultima/blob/master/apps/server/src/auth/auth.service.spec.ts)       | Summary: Code in auth.service.spec.ts ensures AuthService is defined in NestJS testing. Verifies service functionality within the ultima repository's server app architecture.                    |
| [auth.controller.spec.ts](https://github.com/jaequery/ultima/blob/master/apps/server/src/auth/auth.controller.spec.ts) | Code snippet in **auth.controller.spec.ts** tests **AuthController**. It ensures controller is defined using **AuthService**. Contributing to quality assurance in the **ultima** repository.     |
| [auth.module.ts](https://github.com/jaequery/ultima/blob/master/apps/server/src/auth/auth.module.ts)                   | Code snippet in `auth.module.ts` defines the Auth module in `ultima` repo, managing authentication logic with AuthService and AuthController linked.                                              |

</details>

<details closed><summary>apps.server.src.trpc</summary>

| File                                                                                                   | Summary                                                                                                                                                                                                             |
| ---                                                                                                    | ---                                                                                                                                                                                                                 |
| [trpc.service.ts](https://github.com/jaequery/ultima/blob/master/apps/server/src/trpc/trpc.service.ts) | The `TrpcService` in ultima/apps/server/src/trpc/trpc.service.ts orchestrates TRPC integration for the parent repository, managing procedures and routing within the architecture.                                  |
| [trpc.module.ts](https://github.com/jaequery/ultima/blob/master/apps/server/src/trpc/trpc.module.ts)   | TrpcModule** in apps/server/src: Integrates **TrpcRouter** & **TrpcService** for **Trpc** functionality, linked with **UserModule**. Facilitates service offering in repository's architecture.                     |
| [trpc.router.ts](https://github.com/jaequery/ultima/blob/master/apps/server/src/trpc/trpc.router.ts)   | Code Summary:**The `TrpcRouter` in **ultima/apps/server** integrates `trpc` features with the main application through `appRouter`. It enhances API functionality in the NestJS architecture via `applyMiddleware`. |

</details>

<details closed><summary>apps.server.src.user</summary>

| File                                                                                                                   | Summary                                                                                                                                                                                                                   |
| ---                                                                                                                    | ---                                                                                                                                                                                                                       |
| [user.router.ts](https://github.com/jaequery/ultima/blob/master/apps/server/src/user/user.router.ts)                   | UserRouter in ultima/apps/server:** Defines Trpc endpoints for user operations like creating, removing, finding by ID, and retrieving all users using UserService.                                                        |
| [user.module.ts](https://github.com/jaequery/ultima/blob/master/apps/server/src/user/user.module.ts)                   | Code Summary:**The `UserModule` in `user/user.module.ts` integrates User entity, service, and router with TypeORM and `TrpcModule` in the server app, enabling user-related functionality.                                |
| [user.controller.ts](https://github.com/jaequery/ultima/blob/master/apps/server/src/user/user.controller.ts)           | Summary:**The `UserController` in `apps/server` manages user-related operations through `UserService` in the Ultima repository's architecture.                                                                            |
| [user.entity.ts](https://github.com/jaequery/ultima/blob/master/apps/server/src/user/user.entity.ts)                   | Code snippet in user.entity.ts defines the User entity with various properties using TypeORM decorators for database interaction in the ultima/apps/server architecture.                                                  |
| [user.service.ts](https://github.com/jaequery/ultima/blob/master/apps/server/src/user/user.service.ts)                 | Code snippet in user.service.ts manages user data in the DB, including creation, retrieval, and encryption of passwords. It ensures unique emails and handles conflicts in the Ultima server app.                         |
| [user.controller.spec.ts](https://github.com/jaequery/ultima/blob/master/apps/server/src/user/user.controller.spec.ts) | Code snippet in user.controller.spec.ts tests UserController functionality within the NestJS server app. Ensures UserController is defined. It validates user-related operations in the parent repository's architecture. |
| [user.service.spec.ts](https://github.com/jaequery/ultima/blob/master/apps/server/src/user/user.service.spec.ts)       | Code snippet in user.service.spec.ts tests the functionality of User Service in the NestJS server app. It ensures UserService is defined within the app's architecture, emphasizing quality and reliability.              |

</details>

<details closed><summary>apps.server.src.user.dto</summary>

| File                                                                                               | Summary                                                                                                                                                                              |
| ---                                                                                                | ---                                                                                                                                                                                  |
| [user.dto.ts](https://github.com/jaequery/ultima/blob/master/apps/server/src/user/dto/user.dto.ts) | Code Summary:**Defines user data transfer objects (DTOs) using Zod schema for user creation, removal, and search. Enhances type safety and validation in user-related API endpoints. |

</details>

---

##  Getting Started

***Requirements***

Ensure you have the following dependencies installed on your system:

* **TypeScript**: `version x.y.z`

###  Installation

1. Clone the ultima repository:

```sh
git clone https://github.com/jaequery/ultima
```

2. Change to the project directory:

```sh
cd ultima
```

3. Install the dependencies:

```sh
npm install
```

###  Running `ultima`

Use the following command to run ultima:

```sh
npm run build && node dist/main.js
```

###  Tests

Use the following command to run tests:

```sh
npm test
```

---

##  Project Roadmap

- [X] `► INSERT-TASK-1`
- [ ] `► INSERT-TASK-2`
- [ ] `► ...`

---

##  Contributing

Contributions are welcome! Here are several ways you can contribute:

- **[Submit Pull Requests](https://github.com/jaequery/ultima/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.
- **[Join the Discussions](https://github.com/jaequery/ultima/discussions)**: Share your insights, provide feedback, or ask questions.
- **[Report Issues](https://github.com/jaequery/ultima/issues)**: Submit bugs found or log feature requests for the `ultima` project.

<details closed>
    <summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your github account.
2. **Clone Locally**: Clone the forked repository to your local machine using a git client.
   ```sh
   git clone https://github.com/jaequery/ultima
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to GitHub**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.

Once your PR is reviewed and approved, it will be merged into the main branch.

</details>

---

##  License

This project is protected under the [SELECT-A-LICENSE](https://choosealicense.com/licenses) License. For more details, refer to the [LICENSE](https://choosealicense.com/licenses/) file.

---

##  Acknowledgments

- List any resources, contributors, inspiration, etc. here.

[**Return**](#-quick-links)

---
