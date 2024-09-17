import 'dotenv-defaults/config';

import { EmployeeRepository } from '@marinetes/database';
import type { GluegunCommand } from 'gluegun';

import { connectToDatabase } from '../../src/core/connectToDatabase';

const command: GluegunCommand = {
  name: 'create-employee',
  alias: ['ce'],
  run: async toolbox => {
    const {
      prompt,
      print: { info, error, checkmark },
    } = toolbox;

    const { name, email, password } = await prompt.ask([
      {
        type: 'input',
        name: 'email',
        message: 'Insira o email',
      },
      {
        type: 'input',
        name: 'password',
        message: 'Insira a senha',
      },
      {
        type: 'input',
        name: 'name',
        message: 'Insira o nome da conta',
        initial: 'Funcionário',
      },
    ]);

    const connection = await connectToDatabase();

    try {
      await EmployeeRepository.save(
        EmployeeRepository.create({
          email,
          password,
          full_name: name,
        }),
      );

      info(`${checkmark} Funcionário criado com sucesso!`);
      info(`E-mail: ${email}`);
      info(`Senha: ${password}`);
    } catch (exception) {
      error('Ocorreu um erro na criação do funcionário.');
      console.log(exception);
    } finally {
      await connection.close();
    }
  },
};

module.exports = command;
