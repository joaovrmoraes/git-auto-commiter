#!/usr/bin/env node
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/commands/commands-init.ts
var import_commander = require("commander");

// src/commands/commit.ts
var import_shelljs = __toESM(require("shelljs"));

// src/commit-list.ts
var commitList = [
  {
    name: "\u2728   feat: (new feature for the user, not a new feature for build script)",
    value: {
      description: "feat: ",
      icon: ":sparkles:"
    }
  },
  {
    name: "\u{1F484}   feat: (new style feature, not a new feature for build script) ",
    value: {
      description: "feat: ",
      icon: ":lipstick:"
    }
  },
  {
    name: "\u{1F41B}   fix: (bug fix for the user, not a fix to a build script)",
    value: {
      description: "fix: ",
      icon: ":bug:"
    }
  },
  {
    name: "\u{1F4DA}   docs: (changes to the documentation)",
    value: {
      description: "docs: ",
      icon: ":books:"
    }
  },
  {
    name: "\u{1F44C}   style: (formatting, missing semi colons, etc; no production code change)",
    value: {
      description: "style: ",
      icon: ":ok_hand:"
    }
  },
  {
    name: "\u267B\uFE0F   refactor: (refactoring production code, eg. renaming a variable)",
    value: {
      description: "refactor: ",
      icon: ":recycle:"
    }
  },
  {
    name: "\u2705   test: (adding missing tests, refactoring tests; no production code change)",
    value: {
      description: "test: ",
      icon: ":white_check_mark:"
    }
  },
  {
    name: "\u{1F512}   chore: (updating grunt tasks etc; no production code change)",
    value: {
      description: "chore: ",
      icon: ":lock:"
    }
  },
  {
    name: "\u{1F516}   release: (version change)",
    value: {
      description: "release: ",
      icon: ":bookmark:"
    }
  },
  {
    name: "\u{1F680}   deploy: (deploying stuff)",
    value: {
      description: "deploy: ",
      icon: ":rocket:"
    }
  },
  {
    name: "\u{1F525}   remove: (removing code or files)",
    value: {
      description: "remove: ",
      icon: ":fire:"
    }
  },
  {
    name: "\u{1F6A7}   wip: (Work In Progress)",
    value: {
      description: "wip: ",
      icon: ":construction:"
    }
  },
  {
    name: "\u{1F9F1}   ci: (Continuos Integration)",
    value: {
      description: "ci: ",
      icon: ":bricks:"
    }
  }
];

// src/commands/commit.ts
function Commit({ program }) {
  program.command("commit <message>").description("Commit changes").action((message) => __async(this, null, function* () {
    if (!import_shelljs.default.which("git")) {
      import_shelljs.default.echo("Sorry, this script requires git");
      import_shelljs.default.exit(1);
    }
    let answers;
    const inquirer = (yield import("inquirer")).default;
    answers = yield inquirer.prompt([
      {
        type: "list",
        name: "type",
        choices: commitList,
        message: "Qual \xE9 o tipo do commit?"
      }
    ]);
    const addResult = import_shelljs.default.exec(`git add .`);
    if (addResult.code !== 0) {
      import_shelljs.default.echo('Erro ao executar "git add ."');
      import_shelljs.default.exit(1);
    }
    const commitResult = import_shelljs.default.exec(`git commit -m "${answers.type.icon} ${answers.type.description} ${message}"`);
    if (commitResult.code !== 0) {
      import_shelljs.default.echo('Erro ao executar "git commit"');
      import_shelljs.default.exit(1);
    }
    const pushResult = import_shelljs.default.exec(`git push -u origin main`);
    if (pushResult.code !== 0) {
      import_shelljs.default.echo('Erro ao executar "git push"');
      import_shelljs.default.exit(1);
    }
  }));
}

// src/commands/create-repository.ts
var import_shelljs2 = __toESM(require("shelljs"));
function CreateRepository({ program }) {
  program.command("repo <repository-name> [description]").description("Create a new repository on GitHub.com, then push an existing repository from the command line").action((repositoryName, description) => __async(this, null, function* () {
    if (!import_shelljs2.default.which("git")) {
      import_shelljs2.default.echo("Sorry, this script requires git");
      import_shelljs2.default.exit(1);
    }
    let answers;
    const inquirer = (yield import("inquirer")).default;
    answers = yield inquirer.prompt([
      {
        type: "list",
        name: "visibility",
        choices: [{ name: "\u{1F513} Public", value: "public" }, { name: "\u{1F512} Private", value: "private" }],
        message: "Qual a visibilidade do Repositorio?"
      }
    ]);
    let repositoryResult;
    if (description) {
      repositoryResult = import_shelljs2.default.exec(`gh repo create ${repositoryName} --${answers.visibility} --description "${description}"`);
    } else {
      repositoryResult = import_shelljs2.default.exec(`gh repo create ${repositoryName} --${answers.visibility}`);
    }
    if (repositoryResult.code !== 0) {
      console.log("repository result" + repositoryResult);
      import_shelljs2.default.echo("\u274C Erro ao criar o reposit\xF3rio");
      import_shelljs2.default.exit(1);
    }
    const echoReadme = import_shelljs2.default.exec(`echo "# ${repositoryName}" >> README.md`);
    if (echoReadme.code !== 0) {
      console.log(echoReadme);
      import_shelljs2.default.echo("Erro ao criar o README.md");
      import_shelljs2.default.exit(1);
    }
    const initResult = import_shelljs2.default.exec(`git init`);
    if (initResult.code !== 0) {
      console.log(initResult);
      import_shelljs2.default.echo('Erro ao executar "git init"');
      import_shelljs2.default.exit(1);
    }
    const addResult = import_shelljs2.default.exec(`git add .`);
    if (addResult.code !== 0) {
      console.log(addResult);
      import_shelljs2.default.echo('Erro ao executar "git add ."');
      import_shelljs2.default.exit(1);
    }
    const commitResult = import_shelljs2.default.exec(`git commit -m "\u{1F389} First commit"`);
    if (commitResult.code !== 0) {
      console.log(commitResult);
      import_shelljs2.default.echo('Erro ao executar "git commit"');
      import_shelljs2.default.exit(1);
    }
    const branchResult = import_shelljs2.default.exec(`git branch -M main`);
    if (branchResult.code !== 0) {
      console.log(branchResult);
      import_shelljs2.default.echo('Erro ao executar "git branch -M main"');
      import_shelljs2.default.exit(1);
    }
    const result = import_shelljs2.default.exec("gh api user --jq .login", { silent: true });
    if (result.code !== 0) {
      console.log(result);
      import_shelljs2.default.echo('Erro ao executar "gh api user --jq .login"');
      import_shelljs2.default.exit(1);
    }
    const remoteResult = import_shelljs2.default.exec(`git remote add origin https://github.com/${result.stdout.trim()}/${repositoryName}.git`);
    if (remoteResult.code !== 0) {
      console.log(remoteResult);
      import_shelljs2.default.echo('Erro ao executar "git remote add origin"');
      import_shelljs2.default.exit(1);
    }
    const pushResult = import_shelljs2.default.exec(`git push -u origin main`);
    if (pushResult.code !== 0) {
      console.log(pushResult);
      import_shelljs2.default.echo('Erro ao executar "git push"');
      import_shelljs2.default.exit(1);
    }
    console.log("\u2705 Primeiro commit feito com sucesso!");
  }));
}

// src/commands/commands-init.ts
function CommandsInit() {
  const program = new import_commander.Command();
  Commit({ program });
  CreateRepository({ program });
  program.parse(process.argv);
}

// src/index.ts
CommandsInit();
