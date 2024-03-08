<p align="center">
    <h1 align="center">Ult</h1>
</p>
<p align="center">
    <em>Ult: Uniting Nest.js + Prisma + tRPC, Next.js + Tailwind for the ultimate streamlined web development.</em>
</p>


![Ult logo]([https://raw.githubusercontent.com/Descent098/ezcv/master/.github/logo.png](https://github.com/jaequery/Ult/assets/794507/61f068f3-53a6-4a18-be5d-f7746ecbdd3e))

<p align="center">
	<img src="https://img.shields.io/github/license/jaequery/ultima?style=flat&color=0080ff" alt="license">
	<img src="https://img.shields.io/github/last-commit/jaequery/ultima?style=flat&logo=git&logoColor=white&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/jaequery/ultima?style=flat&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/jaequery/ultima?style=flat&color=0080ff" alt="repo-language-count">
<p>
<p>Dive into the future of web development with Ult, the perfect blend of Nest.js, Prisma, and tRPC on the server side, paired seamlessly with Next.js and Tailwind CSS on the client side. Experience effortless back-end to front-end integration, rapid development cycles, and a modern, stylish UI with minimal code. Ult is your one-stop solution for building scalable, efficient, and visually stunning web applications. Get ready to elevate your projects to the next level with ease and sophistication.</p>

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
