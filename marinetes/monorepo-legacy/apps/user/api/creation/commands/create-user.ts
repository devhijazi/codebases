import 'dotenv-defaults/config';

import { UserRepository } from '@marinetes/database';
import type { GluegunCommand } from 'gluegun';

import { connectToDatabase } from '../../src/core/connectToDatabase';

const command: GluegunCommand = {
  name: 'create-user',
  alias: ['cu'],
  run: async toolbox => {
    const {
      prompt,
      print: { info, error, checkmark },
    } = toolbox;

    const { name, email, password, document } = await prompt.ask([
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
        message: 'Insira o nome',
        initial: 'Usuário',
      },
      {
        type: 'input',
        name: 'document',
        message: 'Insira o CPF',
        initial: '00000000000',
      },
    ]);

    const connection = await connectToDatabase();

    try {
      await UserRepository.save(
        UserRepository.create({
          email,
          password,
          full_name: name,
          document,
          phone: '00000000000',
        }),
      );

      info(`${checkmark} Usuário criado com sucesso!`);
      info(`E-mail: ${email}`);
      info(`Senha: ${password}`);
    } catch (exception) {
      error('Ocorreu um erro na criação do usuário.');
      console.log(exception);
    } finally {
      await connection.close();
    }
  },
};

module.exports = command;
