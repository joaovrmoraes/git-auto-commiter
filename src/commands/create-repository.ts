import shell from 'shelljs'
import { CommandInterface } from '../dto/commands';

export function CreateRepository({ program }: CommandInterface) {
  program
    .command('repo <repository-name> [description]')
    .description('init project')
    .action(async (repositoryName, description) => {
      if (!shell.which('git')) {
        shell.echo('Sorry, this script requires git');
        shell.exit(1);
      }

      let answers

      const inquirer = (await import('inquirer')).default;
      answers = await inquirer.prompt([
        {
          type: 'list',
          name: 'visibility',
          choices: [{ name: '🔓 Public', value: 'public' }, { name: '🔒 Private', value: 'private' }],
          message: 'Qual a visibilidade do Repositorio?',
        }
      ]);

      let repositoryResult

      if (description) {
        repositoryResult = shell.exec(`gh repo create ${repositoryName} --${answers.visibility} --description "${description}"`);
      } else {
        repositoryResult = shell.exec(`gh repo create ${repositoryName} --${answers.visibility}`);
      }

      if (repositoryResult.code !== 0) {
        console.log('repository result' + repositoryResult)
        shell.echo('❌ Erro ao criar o repositório');
        shell.exit(1);
      }

      const echoReadme = shell.exec(`echo "# ${repositoryName}" >> README.md`);

      if (echoReadme.code !== 0) {
        console.log(echoReadme)
        shell.echo('Erro ao criar o README.md');
        shell.exit(1);
      }

      const initResult = shell.exec(`git init`);

      if (initResult.code !== 0) {
        console.log(initResult)
        shell.echo('Erro ao executar "git init"');
        shell.exit(1);
      }

      const addResult = shell.exec(`git add .`);

      if (addResult.code !== 0) {

        console.log(addResult)
        shell.echo('Erro ao executar "git add ."');
        shell.exit(1);
      }

      const commitResult = shell.exec(`git commit -m "🎉 First commit"`);

      if (commitResult.code !== 0) {

        console.log(commitResult)
        shell.echo('Erro ao executar "git commit"');
        shell.exit(1);
      }

      const branchResult = shell.exec(`git branch -M main`);

      if (branchResult.code !== 0) {

        console.log(branchResult)
        shell.echo('Erro ao executar "git branch -M main"');
        shell.exit(1);
      }

      const result = shell.exec('gh api user --jq .login', { silent: true });

      if (result.code !== 0) {
        console.log(result)
        shell.echo('Erro ao executar "gh api user --jq .login"');
        shell.exit(1);
      }
      const remoteResult = shell.exec(`git remote add origin https://github.com/${result.stdout.trim()}/${repositoryName}.git`);

      if (remoteResult.code !== 0) {

        console.log(remoteResult)
        shell.echo('Erro ao executar "git remote add origin"');
        shell.exit(1);
      }

      const pushResult = shell.exec(`git push -u origin main`);

      if (pushResult.code !== 0) {

        console.log(pushResult)
        shell.echo('Erro ao executar "git push"');
        shell.exit(1);
      }

      console.log('✅ Primeiro commit feito com sucesso!')
    });
}