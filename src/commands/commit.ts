import shell from 'shelljs'
import { commitList } from '../commit-list';
import { CommandInterface } from '../dto/commands';

export function Commit({ program }: CommandInterface) {
  program
    .command('commit <message>')
    .description('init project')
    .action(async (message) => {
      if (!shell.which('git')) {
        shell.echo('Sorry, this script requires git');
        shell.exit(1);
      }

      let answers

      const inquirer = (await import('inquirer')).default;
      answers = await inquirer.prompt([
        {
          type: 'list',
          name: 'type',
          choices: commitList,
          message: 'Qual é o tipo do commit?',
        }
      ]);

      const addResult = shell.exec(`git add .`);

      if (addResult.code !== 0) {
        shell.echo('Erro ao executar "git add ."');
        shell.exit(1);
      }

      const commitResult = shell.exec(`git commit -m "${answers.type.icon} ${answers.type.description} ${message}"`);

      if (commitResult.code !== 0) {
        shell.echo('Erro ao executar "git commit"');
        shell.exit(1);
      }

      const pushResult = shell.exec(`git push -u origin main`);

      if (pushResult.code !== 0) {
        shell.echo('Erro ao executar "git push"');
        shell.exit(1);
      }

    });
}