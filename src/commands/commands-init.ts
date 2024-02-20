import { Command } from "commander";
import { Commit } from "./commit";
import { CreateRepository } from "./create-repository";

export function CommandsInit() {
  const program = new Command();

  Commit({ program });
  CreateRepository({ program });

  program.parse(process.argv);

}