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

##  Getting Started

***Requirements***

Ensure you have the following dependencies installed on your system:

* **TypeScript**
* **Pnpm**
* **Docker Compose**

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
pnpm install
```

###  Setup

1. Run Postgres database using Docker that will listen on port 5432:

```sh
docker-compose up -d
```

1. Run db migration to create the database tables

```sh
pnpm db:migrate:up
```

1. Run the db seed to populate the database with initial data

```sh
pnpm db:seed
```

###  Running `ultima`

Use the following command to run ultima dev server for server and web.

```sh
npm pnpm dev
```

The Nest.js server will run on http://localhost:3000 and Next.js will run on http://localhost:3001.


###  Tests

Use the following command to run tests:

```sh
pnpm test
```

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

This project is protected under the [MIT](https://choosealicense.com/licenses) License. For more details, refer to the [LICENSE](https://choosealicense.com/licenses/) file.

---

##  Acknowledgments

- List any resources, contributors, inspiration, etc. here.

[**Return**](#-quick-links)

---
