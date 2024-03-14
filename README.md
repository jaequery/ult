<p align="center">
    <h1 align="center">Ult</h1>
</p>
<p align="center">
    <em>Ult: Uniting Nest.js + Prisma + tRPC, Next.js + Tailwind for the ultimate streamlined web development.</em>
</p>

![image](https://github.com/jaequery/ult/assets/794507/280b360d-0b75-4a0a-9325-c7c87358a6cb)


<p align="center">
	<img src="https://img.shields.io/github/license/jaequery/ultima?style=flat&color=0080ff" alt="license">
	<img src="https://img.shields.io/github/last-commit/jaequery/ultima?style=flat&logo=git&logoColor=white&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/jaequery/ultima?style=flat&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/jaequery/ultima?style=flat&color=0080ff" alt="repo-language-count">
</p>

<h3>Ult - the modern tech stack built for speed of development, security, and scalability</h3>
<p>Have you ever wondered how swiftly you could turn your next project or startup idea into reality? This question has often crossed my mind, especially when initiating a new project. The initial phase typically involves rewriting extensive boilerplate code—authentication, registration, admin panels, etc.—which consumes a significant portion of development time. After repeatedly facing this challenge, I was compelled to devise a bootstrap framework for efficient reuse.</p>

<p>Throughout the years, I embarked on a quest to refine this concept, creating numerous versions of these bootstrap frameworks. The tech landscape constantly evolves, yet each solution seemed like forcing a square peg into a round hole. I believed in a streamlined, more efficient approach to system design, aiming for unparalleled speed and precision. Despite the limitations of existing tools, my vision persisted. That was until I discovered tRPC, which revolutionized my workflow. Integrating Nest.js, Next.js, Prisma, and tRPC transformed the development process, making it exceptionally rapid and efficient, suitable for anything from quick projects to enterprise-level applications. Thus, Ult was conceived.</p>

<p>Welcome to the future of web development with Ult—a harmonious combination of Nest.js, Prisma, and tRPC for the server, alongside Next.js and Tailwind CSS for the client. This integration promises seamless backend-to-frontend connectivity, accelerated development cycles, and a modern UI requiring minimal coding. Ult stands as a comprehensive solution for crafting scalable, high-performance, and aesthetically appealing web applications. Prepare to elevate your projects with unparalleled ease and sophistication.</p>

<hr>

##  Getting Started

***Requirements***

Ensure you have the following dependencies installed on your system:

* **TypeScript**
* **Pnpm**
* **Docker Compose**

###  Installation

1. Clone the Ult repository:

```sh
git clone https://github.com/jaequery/ult
```

2. Change to the project directory:

```sh
cd ult
```

3. Install the dependencies:

```sh
pnpm install
```

###  Setup

1. Run Postgres database using Docker that will listen on port 5432:

```sh
docker-compose up -d
```

2. Create ./apps/server/.env.development

```
cd ./apps/server
cp .env.example .env.development
```

Database should work out of the box with the default credentials for local development.
But for email, you will need a valid SMTP account. You can get it free at brevo.com.

1. Run db migration to create the database tables

```sh
pnpm db:migrate
```

4. Run the db seed to populate the database with initial data

```sh
pnpm db:seed
```

###  Running development environment

Use the following command to run both Nest and Next server.

```sh
pnpm dev
```

This will start the Next.js server on http://localhost:3000 and the Nest.js on http://localhost:3001.


###  Tests

Use the following command to run tests:

```sh
pnpm test
```

##  Contributing

Contributions are welcome! Here are several ways you can contribute:

- **[Submit Pull Requests](https://github.com/jaequery/ult/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.
- **[Join the Discussions](https://github.com/jaequery/ult/discussions)**: Share your insights, provide feedback, or ask questions.
- **[Report Issues](https://github.com/jaequery/ult/issues)**: Submit bugs found or log feature requests for the `ultima` project.

<details closed>
    <summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your github account.
2. **Clone Locally**: Clone the forked repository to your local machine using a git client.
   ```sh
   git clone https://github.com/jaequery/ult
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

This project is protected under the [MIT](https://choosealicense.com/licenses) License. For more details, refer to the [LICENSE](https://choosealicense.com/licenses/) file.

---

##  Acknowledgments

- List any resources, contributors, inspiration, etc. here.

[**Return**](#-quick-links)

---
